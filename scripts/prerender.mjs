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
 * ── Le navigateur, et l'échec du 31/08 ────────────────────────────────────────
 *
 * La première version embarquait `puppeteer`, qui télécharge son propre Chromium.
 * Le build Vercel a échoué : ce Chromium n'y est pas disponible, et le prerendu a
 * retenu en otage un correctif d'attribution publicitaire qui devait partir le
 * soir même. Il a été sorti du build (commit `fff6b2d`).
 *
 * Cette version ne télécharge plus rien. Elle utilise `puppeteer-core` et prend le
 * binaire là où il est :
 * • `PUPPETEER_EXECUTABLE_PATH` si la variable est posée, elle gagne toujours ;
 * • sur Vercel et sous Linux, le Chromium de `@sparticuz/chromium`, compilé pour
 *   Amazon Linux 2023, que le paquet décompresse dans `/tmp` ;
 * • sinon le Chrome du poste de développement.
 *
 * ── La sortie de secours ──────────────────────────────────────────────────────
 *
 * `SKIP_PRERENDER=1` saute le rendu, et seulement lui : `spa.html` est écrit avant
 * toute chose, donc le site reste servi exactement comme avant le prerendu. C'est
 * la variable à poser dans Vercel le jour où un correctif urgent doit passer et
 * que le prerendu bloque. Elle est bruyante, et c'est un geste conscient : hors
 * de ce cas, le script échoue le build. Un prerendu à moitié cassé qui laisse
 * passer le build donnerait un site qu'on croit lisible et qui ne l'est pas.
 */
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile, copyFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { preview } from "vite";
import puppeteer from "puppeteer-core";

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

/** Emplacements usuels d'un Chrome de poste de travail. */
const LOCAL_CHROME = [
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
];

const BASE_ARGS = ["--no-sandbox", "--disable-dev-shm-usage", "--lang=fr-FR"];

const resolveBrowser = async () => {
  const override = process.env.PUPPETEER_EXECUTABLE_PATH;
  if (override) {
    return { executablePath: override, args: BASE_ARGS, headless: true, source: override };
  }

  if (process.env.VERCEL || process.platform === "linux") {
    const chromium = (await import("@sparticuz/chromium")).default;
    // Le site ne rend aucun WebGL : désactiver la pile graphique évite de
    // décompresser swiftshader pour rien.
    chromium.setGraphicsMode = false;
    return {
      executablePath: await chromium.executablePath(),
      args: [...chromium.args, ...BASE_ARGS],
      // Les arguments du paquet posent déjà `--headless='shell'`.
      headless: "shell",
      source: "@sparticuz/chromium",
    };
  }

  const local = LOCAL_CHROME.find((candidate) => existsSync(candidate));
  if (!local) {
    throw new Error(
      "Aucun Chrome trouvé sur ce poste. Pose PUPPETEER_EXECUTABLE_PATH sur ton binaire, " +
        "ou lance le build avec SKIP_PRERENDER=1 si tu n'as pas besoin du prerendu.",
    );
  }
  return { executablePath: local, args: BASE_ARGS, headless: true, source: local };
};

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
  // Le repli SPA de `vercel.json` doit toujours trouver une coquille, prerendu ou
  // non. Cette copie se fait donc AVANT tout le reste : si le rendu est sauté ou
  // s'il échoue, `spa.html` existe déjà et vaut le HTML d'origine, c'est-à-dire
  // le comportement d'avant le prerendu. Une fois `index.html` prerendu, il ne
  // peut plus servir de repli : il porterait le titre et le contenu de l'accueil
  // sur n'importe quelle URL inconnue.
  const shellPath = join(DIST, "spa.html");
  // `vite build` vide `dist`, donc la coquille n'existe qu'une fois par build.
  // Ne pas la réécrire si elle est là : au deuxième `npm run prerender` sans
  // rebuild, `index.html` porte déjà l'accueil prerendu, et la recopier ferait
  // du repli une page d'accueil servie sur toutes les URL inconnues.
  if (!existsSync(shellPath)) await copyFile(join(DIST, "index.html"), shellPath);

  const shell = await readFile(shellPath, "utf-8");
  if (!/<div id="root">\s*<\/div>/.test(shell)) {
    throw new Error(
      "spa.html n'est pas une coquille vide. Le repli servirait une page complète " +
        "sur toute URL inconnue. Relancer un `vite build` avant le prerendu.",
    );
  }

  if (process.env.SKIP_PRERENDER === "1") {
    console.warn(
      "\n" +
        "  SKIP_PRERENDER=1 : le rendu est sauté.\n" +
        "  Le site part en coquille SPA. Les aperçus de lien et les robots qui\n" +
        "  n'exécutent pas de JavaScript ne verront rien. À retirer dès que le\n" +
        "  déploiement urgent est passé.\n",
    );
    return;
  }

  const routes = [...(await routesFromSitemap()), ...EXTRA_ROUTES];
  const browserConfig = await resolveBrowser();
  console.log(`\nPrerender de ${routes.length} routes — navigateur : ${browserConfig.source}\n`);

  const server = await preview({
    root: ROOT,
    preview: { port: PORT, strictPort: true, open: false },
  });

  const browser = await puppeteer.launch({
    executablePath: browserConfig.executablePath,
    headless: browserConfig.headless,
    args: browserConfig.args,
  });

  const captured = [];
  const failures = [];

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1280, height: 900 });
      await page.setExtraHTTPHeaders({ "Accept-Language": "fr-FR,fr;q=0.9" });
      // La détection de langue lit `localStorage` avant `navigator`. Sans cette
      // ligne, le prerendu parlerait la langue de la machine de build : français
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
