/**
 * Consentement à la mesure d'audience (CNIL / ePrivacy).
 *
 * Règle tenue ici : aucun script de mesure n'est chargé tant que le visiteur
 * n'a pas accepté, ni Google Analytics ni le pixel Meta. Refuser ne dépose
 * rien, et le choix est redemandé au bout de 6 mois (recommandation CNIL).
 */

import type { FbqFn } from "./analytics";

const STORAGE_KEY = "steero_consent";
const CONSENT_VERSION = 1;
const SIX_MONTHS_MS = 182 * 24 * 60 * 60 * 1000;
const GA_MEASUREMENT_ID = "G-61JXTXNN1N";

/**
 * Identifiant de conversion Google Ads (`AW-…`), à récupérer dans le compte :
 * Objectifs → Conversions → une action → « Configuration de la balise » →
 * « Installer la balise vous-même ».
 *
 * Il est vide tant qu'il n'a pas été relevé, et le code s'en accommode : la
 * mesure GA4 fonctionne sans lui. Ce qui ne fonctionne pas sans lui, c'est la
 * remontée des conversions vers Ads — c'est précisément le trou constaté le
 * 6 septembre, où une action « Page vue » comptant TOUTES les pages affichait
 * zéro après 115 clics payants.
 *
 * Le label de l'action `Inscription` va avec, dans `analytics.ts`.
 */
const ADS_CONVERSION_ID = "";

/**
 * Pixel Meta.
 *
 * L'identifiant existe, mais le compte publicitaire et le portefeuille business
 * qui le portent sont restreints depuis juin 2020. Les évènements partent et
 * Meta les ignore : le pixel est posé pour être prêt, pas parce qu'il mesure
 * quoi que ce soit aujourd'hui. C'est aussi pour ça que le Gestionnaire
 * d'évènements affichera « aucune activité » sans que le site soit en cause.
 *
 * Le jour où l'accès publicitaire revient, ce sera très probablement un pixel
 * neuf dans un portefeuille neuf, donc un autre identifiant. Cette ligne est le
 * seul endroit à changer.
 */
const META_PIXEL_ID = "261947908196157";

export const CONSENT_CHANGED_EVENT = "steero:consent-changed";
export const CONSENT_OPEN_EVENT = "steero:consent-open";

export type ConsentChoice = "granted" | "denied";

type StoredConsent = {
  version: number;
  choice: ConsentChoice;
  ts: number;
};

/**
 * Identifiant de clic publicitaire (`gclid`, et ses variantes iOS `gbraid` et
 * `wbraid`).
 *
 * La balise Google le lit dans l'URL **au moment où elle démarre**. Or elle ne
 * démarre qu'après le consentement : si le visiteur navigue avant d'accepter,
 * l'URL a perdu le paramètre, le clic payant devient inattribuable, et GA4 le
 * recompte même en organique puisqu'il ne voit plus que le référent Google.
 *
 * On met donc l'identifiant de côté dès le premier rendu — une valeur d'URL,
 * aucun cookie, aucune donnée personnelle — et on le remet dans l'URL le temps
 * que la balise s'initialise.
 */
const CLICK_ID_KEYS = ["gclid", "gbraid", "wbraid"] as const;
const CLICK_ID_KEY = "steero_click_id";

const captureClickId = () => {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of CLICK_ID_KEYS) {
      const value = params.get(key);
      if (value) {
        window.sessionStorage.setItem(CLICK_ID_KEY, `${key}=${encodeURIComponent(value)}`);
        return;
      }
    }
  } catch {
    /* stockage indisponible : on perd l'attribution, jamais la mesure */
  }
};

// Au chargement du module, donc avant le premier rendu React : c'est le seul
// moment où l'URL d'arrivée est encore intacte.
captureClickId();

const readClickId = (): string | null => {
  try {
    return window.sessionStorage.getItem(CLICK_ID_KEY);
  } catch {
    return null;
  }
};

const urlHasClickId = () =>
  CLICK_ID_KEYS.some((key) => new URLSearchParams(window.location.search).has(key));

export const readConsent = (): ConsentChoice | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    if (Date.now() - parsed.ts > SIX_MONTHS_MS) return null;
    return parsed.choice === "granted" ? "granted" : "denied";
  } catch {
    return null;
  }
};

/**
 * Consent Mode v2 : déclarer l'état, pas seulement le respecter.
 *
 * Depuis mars 2024, Google exige un signal de consentement explicite pour
 * exploiter les données publicitaires de l'EEE. **Ne rien déclarer n'équivaut
 * pas à déclarer un refus : ça fait écarter les données, y compris celles des
 * visiteurs qui ont accepté.** C'est le geste qui manquait pour que les
 * conversions consenties remontent, et il n'élargit rien : la porte du
 * chargement reste exactement où elle était.
 *
 * L'ordre compte. `dataLayer` et le shim `gtag` sont installés dès le
 * démarrage, et les commandes s'y empilent sans qu'aucun script tiers ne soit
 * chargé ni qu'aucun octet ne parte. Quand le script arrive — s'il arrive — il
 * rejoue la file dans l'ordre, donc il lit le refus par défaut AVANT toute
 * commande de mesure. Un `default` déclaré après le `config` ne serait pas
 * respecté.
 */
const CONSENT_SIGNALS = [
  "ad_storage",
  "ad_user_data",
  "ad_personalization",
  "analytics_storage",
] as const;

const consentSignals = (value: ConsentChoice) =>
  Object.fromEntries(CONSENT_SIGNALS.map((signal) => [signal, value]));

let gtagBootstrapped = false;

/**
 * Installe la file de commandes et pose le refus par défaut. Aucun réseau,
 * aucun cookie, aucun stockage : appelable sans consentement.
 */
const bootstrapGtag = () => {
  if (gtagBootstrapped || typeof window === "undefined") return;
  gtagBootstrapped = true;

  window.dataLayer = window.dataLayer || [];
  // Snippet officiel : gtag pousse son objet arguments dans le dataLayer.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };

  window.gtag("consent", "default", {
    ...consentSignals("denied"),
    // Tant que le refus tient, aucun identifiant publicitaire ne part avec les
    // requêtes. C'est ce qui rendrait un pré-chargement inoffensif si on
    // décidait un jour de l'ouvrir : la décision reste entière, la plomberie
    // est prête.
    ads_data_redaction: true,
    wait_for_update: 500,
  });
};

let analyticsLoaded = false;

const loadAnalytics = () => {
  if (analyticsLoaded || typeof window === "undefined") return;
  if (document.getElementById("ga-script")) return;
  analyticsLoaded = true;

  // La balise lit l'identifiant de clic dans l'URL courante, et elle le lit au
  // moment où le script est exécuté, pas au moment où la commande est empilée.
  // On réinjecte donc l'identifiant avant de charger le script, et on rend
  // l'URL intacte une fois le script exécuté.
  const clickId = readClickId();
  const cleanUrl = window.location.href;
  const restoreClickId = Boolean(clickId) && !urlHasClickId();

  if (restoreClickId) {
    const separator = window.location.search ? "&" : "?";
    window.history.replaceState(null, "", `${cleanUrl}${separator}${clickId}`);
  }

  const restoreUrl = () => {
    if (!restoreClickId) return;
    if (window.location.href === cleanUrl) return;
    window.history.replaceState(null, "", cleanUrl);
  };

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  script.addEventListener("load", restoreUrl);
  // Filet : si le script est bloqué, l'URL ne doit pas rester salie.
  window.setTimeout(restoreUrl, 4000);
  document.head.appendChild(script);

  // La file et le refus par défaut sont normalement déjà posés par
  // `initConsent`. L'appel est idempotent, et il est ici pour que l'ordre
  // tienne même si on entre par cette porte : le `default` doit précéder les
  // `config`, sinon il est ignoré.
  bootstrapGtag();
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
  // Même balise, seconde destination : Google Ads reçoit les conversions par le
  // script déjà chargé pour GA4, sans second appel réseau. Sans cette ligne,
  // aucune conversion n'atteint Ads — même consentie, même déclarée.
  if (ADS_CONVERSION_ID) {
    window.gtag("config", ADS_CONVERSION_ID);
  }
};

let pixelLoaded = false;

const loadMetaPixel = () => {
  if (pixelLoaded || typeof window === "undefined") return;
  if (document.getElementById("fb-pixel-script")) return;
  pixelLoaded = true;

  // Stub officiel : `fbq` empile les appels tant que `fbevents.js` n'est pas
  // exécuté, puis les rejoue. Un évènement envoyé dans la seconde qui suit le
  // clic « Tout accepter » n'est donc pas perdu.
  const pixel: FbqFn = Object.assign(
    (...args: unknown[]) => {
      // Appel en tant que méthode : `this` reste le stub, comme dans le
      // snippet officiel qui passe par `.apply`.
      if (pixel.callMethod) pixel.callMethod(...args);
      else pixel.queue.push(args);
    },
    { queue: [] as unknown[][], loaded: true, version: "2.0" }
  );
  window.fbq = pixel;
  window._fbq = pixel;

  const script = document.createElement("script");
  script.id = "fb-pixel-script";
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  pixel("init", META_PIXEL_ID);
  // La page d'arrivée est envoyée ici, pas par AnalyticsTracker : le
  // consentement peut être donné en cours de visite, et aucun changement de
  // route ne suivrait. `trackPageView` saute donc son premier appel.
  pixel("track", "PageView");
};

/**
 * Porte unique du consentement. Les deux mesures se chargent ensemble ou pas du
 * tout : c'est ce qui permet aux appelants de `lib/analytics.ts` de ne jamais
 * avoir à tester laquelle est active.
 */
const loadTrackers = () => {
  loadAnalytics();
  loadMetaPixel();
};

/** Supprime les cookies déposés par une session consentie précédemment. */
const clearTrackingCookies = () => {
  const domain = window.location.hostname.replace(/^www\./, "");
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter(
      (name) =>
        name === "_ga" ||
        name.startsWith("_ga_") ||
        name.startsWith("_gid") ||
        // Déposés par le pixel Meta : `_fbp` identifie le navigateur, `_fbc`
        // porte l'identifiant de clic publicitaire (`fbclid`).
        name === "_fbp" ||
        name === "_fbc"
    )
    .forEach((name) => {
      for (const d of ["", `; domain=.${domain}`, `; domain=${domain}`]) {
        document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`;
      }
    });
};

export const setConsent = (choice: ConsentChoice) => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: CONSENT_VERSION, choice, ts: Date.now() } satisfies StoredConsent)
    );
  } catch {
    /* navigation privée : le choix vaut pour la session */
  }

  if (choice === "granted") {
    loadTrackers();
    // Après `loadTrackers`, donc après le `default` : c'est cette mise à jour
    // qui autorise réellement la mesure. Sans elle, la balise chargerait en
    // lisant un refus et n'enverrait rien d'exploitable.
    window.gtag("consent", "update", consentSignals("granted"));
  } else {
    // Un refus explicite vaut mieux qu'un silence : si la balise tourne déjà
    // (consentement donné puis retiré dans la même visite), elle doit
    // l'apprendre avant que les cookies ne soient effacés sous elle.
    if (gtagBootstrapped) {
      window.gtag("consent", "update", consentSignals("denied"));
    }
    clearTrackingCookies();
  }

  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: choice }));
};

/**
 * Appelé au démarrage. Pose toujours le refus par défaut — c'est gratuit et
 * c'est ce qui donne un sens au consentement ultérieur — puis recharge la
 * mesure si elle a déjà été acceptée.
 */
export const initConsent = () => {
  bootstrapGtag();
  if (readConsent() === "granted") {
    loadTrackers();
    window.gtag("consent", "update", consentSignals("granted"));
  }
};

/** Rouvre le panneau de préférences (lien du footer, documents légaux). */
export const openConsentPreferences = () => {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
};
