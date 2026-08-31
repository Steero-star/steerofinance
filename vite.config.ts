import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import Sitemap from "vite-plugin-sitemap";
import { articles } from "./src/data/articles";

/**
 * Le sitemap est généré à partir des données, jamais recopié à la main : une liste
 * tenue en double finit toujours par diverger. Les 11 articles du journal étaient
 * absents du sitemap servi en production, et `/pricing` y figurait encore alors
 * qu'elle redirige en 308 vers `/abonnement`.
 *
 * Les pages légales sont volontairement absentes : `public/robots.txt` les interdit
 * au crawl, les déclarer ici reviendrait à demander leur indexation et l'interdire
 * dans le même souffle.
 */
const ARTICLE_ROUTES = articles.map((article) => `/blog/${article.slug}`);

const ROUTES = [
  "/",
  "/pourquoi-steero",
  "/fonctionnalites",
  "/abonnement",
  "/blog",
  "/faq",
  ...ARTICLE_ROUTES,
];

const byArticle = <T,>(value: T) =>
  Object.fromEntries(ARTICLE_ROUTES.map((route) => [route, value]));

/** Un article est daté de sa publication, pas de la dernière mise en production. */
const ARTICLE_LASTMOD = Object.fromEntries(
  articles.map((article) => [`/blog/${article.slug}`, new Date(article.date)]),
);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: "https://www.steero.fr",
      dynamicRoutes: ROUTES,
      outDir: "dist",
      // Pas de `readable: true` : l'indentation se retrouve DANS la valeur des
      // balises <loc>, et une URL entourée de retours à la ligne dépend du bon
      // vouloir du parseur d'en face.
      // Le plugin scanne aussi les .html de `dist` et n'élimine pas les doublons :
      // l'accueil sortait deux fois, une fois par le scan, une fois par la liste.
      // La liste ci-dessus est la seule source.
      extensions: [],
      // `public/robots.txt` fait foi. Laisser le plugin le générer l'écrasait au
      // build par une version de quatre lignes, sans les pages légales exclues.
      generateRobotsTxt: false,
      priority: {
        "/": 1.0,
        "/pourquoi-steero": 0.9,
        "/fonctionnalites": 0.9,
        "/abonnement": 0.8,
        "/blog": 0.8,
        "/faq": 0.7,
        ...byArticle(0.6),
        "*": 0.5,
      },
      changefreq: {
        "/": "weekly",
        "/blog": "weekly",
        "/pourquoi-steero": "monthly",
        "/fonctionnalites": "monthly",
        "/abonnement": "monthly",
        "/faq": "monthly",
        ...byArticle("monthly"),
        "*": "monthly",
      },
      lastmod: ARTICLE_LASTMOD,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Nom stable pour le hero (permet le preload statique dans index.html)
          if (
            assetInfo.name === "hero-dashboard.webp" ||
            assetInfo.name === "hero-dashboard.png"
          ) {
            return "assets/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
}));
