/**
 * Consentement à la mesure d'audience (CNIL / ePrivacy).
 *
 * Règle tenue ici : aucun script Google Analytics n'est chargé tant que le
 * visiteur n'a pas accepté. Refuser ne dépose rien, et le choix est redemandé
 * au bout de 6 mois (recommandation CNIL).
 */

const STORAGE_KEY = "steero_consent";
const CONSENT_VERSION = 1;
const SIX_MONTHS_MS = 182 * 24 * 60 * 60 * 1000;
const GA_MEASUREMENT_ID = "G-61JXTXNN1N";

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

  window.dataLayer = window.dataLayer || [];
  // Snippet officiel : gtag pousse son objet arguments dans le dataLayer.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { anonymize_ip: true });
};

/** Supprime les cookies déposés par une session consentie précédemment. */
const clearAnalyticsCookies = () => {
  const domain = window.location.hostname.replace(/^www\./, "");
  document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name.startsWith("_gid"))
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
    loadAnalytics();
  } else {
    clearAnalyticsCookies();
  }

  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: choice }));
};

/** Appelé au démarrage : recharge la mesure d'audience si elle a déjà été acceptée. */
export const initConsent = () => {
  if (readConsent() === "granted") loadAnalytics();
};

/** Rouvre le panneau de préférences (lien du footer, documents légaux). */
export const openConsentPreferences = () => {
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
};
