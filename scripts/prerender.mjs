/**
 * Prerender : écrit un vrai HTML par route, après le build.
 *
 * Pourquoi. Le HTML servi par Vite fait 4,5 ko et son body vaut `<div id="root">`.
 * Google exécute le JavaScript, donc il finit par voir la page. Personne d'autre :
 * ni les aperçus de lien (LinkedIn, X, WhatsApp, Slack), qui lisent les balises
 * Open Graph du HTML brut et affichaient donc l'accueil pour n'importe quel
 * article, ni les robots des moteurs de réponse (GPTBot, ClaudeBot, PerplexityBot),
 * qui ne rendent pas non plus.
 *
 * Comment. On ouvre chaque route dans un vrai navigateur, on attend l'hydratation,
 * on déroule la page pour déclencher les animations au défilement (sinon la moitié
 * du contenu est capturée à `opacity: 0`), et on sérialise le DOM obtenu. Les
 * balises `<head>` posées par `SEO.tsx` dans un `useEffect` sont donc capturées
 * elles aussi : c'est ce qu'un rendu serveur classique (`renderToString`) ne sait
 * PAS faire, puisqu'il n'exécute aucun effet.
 *
 * La liste des routes vient de `dist/sitemap.xml`, lui-même généré depuis
 * `src/data/articles.ts`. Ce qu'on déclare à Google est donc exactement ce qu'on
 * prerendre, sans troisième liste à tenir à jour.
 *
 * Le script échoue bruyamment. Un prerender à moitié cassé qui laisse passer le
 * build donnerait un site qu'on croit lisible et qui ne l'est pas.
 */
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import puppeteer from "puppeteer";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const PORT = 4183;

/**
 * Les pages légales sont hors sitemap (robots.txt les interdit au crawl) mais
 * elles se partagent par lien, donc elles ont besoin de leurs balises OG.
 * `/bienvenue` est volontairement absente : elle redirige vers l'app au bout de
 * deux secondes, on capturerait une page en fuite. Elle reste servie par le
 * repli SPA, comme aujourd'hui.
 */
const EXTRA_ROUTES = ["/mentions-legales", "/cgs", "/politique-confidentialite"];

/** Sous ce nombre de caractères visibles, la page n'a pas fini de se rendre. */
const MIN_TEXT_LENGTH = 400;

const routesFromSitemap = async () => {
  const xml = await readFile(join(DIST, "sitemap.xml"), "utf-8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (locs.length === 0) throw new Error("sitemap.xml ne déclare aucune URL");
  return locs.map((loc) => new URL(loc).pathname);
};

/** Déroule la page pour déclencher les animations liées au défilement. */
const revealAll = async (page) => {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 250));
  });
};

const capture = (page) =>
  page.evaluate(() => {
    // La feuille de styles des polices est chargée en `media="print"` puis
    // basculée en `all` par le navigateur. Sérialisée telle quelle, elle
    // redeviendrait bloquante au premier rendu. On la remet dans son état
    // de départ avant de figer le DOM.
    document
      .querySelectorAll('link[rel="stylesheet"][onload]')
      .forEach((link) => link.setAttribute("media", "print"));

    const doctype = "<!doctype html>\n";
    return {
      html: doctype + document.documentElement.outerHTML,
      title: document.title,
      canonical:
        document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? "",
      description:
        document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "",
      ogTitle:
        document.querySelector('meta[property="og:title"]')?.getAttribute("content") ?? "",
      textLength: (document.getElementById("root")?.innerText ?? "").trim().length,
      lang: document.documentElement.lang,
    };
  });

const outputPath = (route) =>
  route === "/" ? join(DIST, "index.html") : join(DIST, route, "index.html");

const run = async () => {
  const routes = [...(await routesFromSitemap()), ...EXTRA_ROUTES];
  console.log(`\nPrerender de ${routes.length} routes.\n`);

  // Le repli SPA de `vercel.json` doit continuer à servir une coquille neutre :
  // s'il pointait sur `index.html` une fois celui-ci prerendu, une URL inconnue
  // répondrait avec le HTML de l'accueil, titre compris.
  await copyFile(join(DIST, "index.html"), join(DIST, "spa.html"));

  const server = await preview({
    root: ROOT,
    preview: { port: PORT, strictPort: true, open: false },
  });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage", "--lang=fr-FR"],
  });

  const captured = [];
  const failures = [];

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.setExtraHTTPHeaders({ "Accept-Language": "fr-FR,fr;q=0.9" });
      // La détection de langue lit `localStorage` avant `navigator`. Sans cette
      // ligne, le prerender parlerait la langue de la machine de build : français
      // ici, anglais sur le conteneur Vercel.
      await page.evaluateOnNewDocument(() => {
        try {
          localStorage.setItem("i18nextLng", "fr");
        } catch {
          /* stockage indisponible : le repli i18n reste le français */
        }
      });

      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: "networkidle0",
          timeout: 60_000,
        });
        await page.waitForFunction(
          (min) => {
            const root = document.getElementById("root");
            return (
              !!root &&
              root.children.length > 0 &&
              (root.innerText ?? "").trim().length > min
            );
          },
          { timeout: 30_000 },
          MIN_TEXT_LENGTH,
        );
        await revealAll(page);

        const result = await capture(page);
        const problems = [];
        if (result.textLength < MIN_TEXT_LENGTH)
          problems.push(`corps trop court (${result.textLength} caractères)`);
        if (!result.title) problems.push("titre absent");
        if (!result.description) problems.push("description absente");
        if (!result.ogTitle) problems.push("og:title absent");
        if (new URL(result.canonical || "https://x.invalid/").pathname !== route)
          problems.push(`canonical ${result.canonical || "absent"} au lieu de ${route}`);
        if (result.lang !== "fr") problems.push(`langue ${result.lang || "absente"}`);

        if (problems.length) failures.push(`${route} → ${problems.join(", ")}`);
        else captured.push({ route, html: result.html, title: result.title });

        console.log(
          `${problems.length ? "✗" : "✓"} ${route.padEnd(58)} ${result.textLength} car.  ${result.title.slice(0, 60)}`,
        );
      } catch (error) {
        failures.push(`${route} → ${error.message.split("\n")[0]}`);
        console.log(`✗ ${route.padEnd(58)} ${error.message.split("\n")[0]}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
    await server.close();
  }

  if (failures.length) {
    console.error(`\n${failures.length} route(s) non prerendues :`);
    failures.forEach((f) => console.error(`  - ${f}`));
    throw new Error(
      "Prerender incomplet. Le build s'arrête : un site à moitié prerendu se croit lisible et ne l'est pas.",
    );
  }

  // Écriture seulement une fois tout capturé, pour ne jamais laisser `dist`
  // dans un état mi-prerendu si une route casse en cours de route.
  for (const { route, html } of captured) {
    const file = outputPath(route);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, html, "utf-8");
  }

  console.log(`\n${captured.length} routes prerendues dans dist/.\n`);
};

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
