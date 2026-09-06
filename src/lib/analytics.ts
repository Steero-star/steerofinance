import { readConsent } from "./consent";

/**
 * Forme du pixel Meta. `fbq` existe dès son installation et empile les appels
 * tant que `fbevents.js` n'est pas arrivé : l'ordre de chargement est donc
 * indifférent aux appelants. L'installation elle-même est dans `lib/consent.ts`,
 * derrière le consentement.
 */
export type FbqFn = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

const gtag = (...args: unknown[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
};

/**
 * Sans consentement, `fbq` n'est pas installé et l'appel est simplement perdu,
 * exactement comme pour `gtag`. Aucun appelant n'a à savoir si la mesure tourne.
 */
const fbq = (...args: unknown[]) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq(...args);
  }
};

// ── Page Views ─────────────────────────────────────────────
/**
 * Le pixel Meta envoie son propre `PageView` au moment où il s'installe. C'est
 * lui qui porte la page d'arrivée, y compris quand le consentement est donné en
 * cours de visite : aucun changement de route ne suivra, et la page d'arrivée
 * est justement celle qui porte l'attribution publicitaire.
 *
 * Le premier appel de route ne doit donc pas la compter une seconde fois. La
 * garde tient dans les deux ordres de montage : consommée avant l'installation
 * du pixel, c'est l'installation qui envoie la page d'arrivée ; consommée
 * après, c'est le doublon qui saute.
 */
let pixelPageViewPending = true;

export const trackPageView = (path: string) => {
  gtag("config", "G-61JXTXNN1N", {
    page_path: path,
    page_title: document.title,
  });

  if (pixelPageViewPending) {
    pixelPageViewPending = false;
    return;
  }
  fbq("track", "PageView");
};

// ── Scroll Depth ───────────────────────────────────────────
export const trackScrollDepth = (
  path: string,
  percent: 25 | 50 | 75 | 90 | 100
) => {
  gtag("event", "scroll_depth", {
    page_path: path,
    scroll_percent: percent,
  });
};

// ── Time on Page ───────────────────────────────────────────
export const trackTimeOnPage = (path: string, seconds: number) => {
  const bucket =
    seconds < 10 ? "0-10s"
    : seconds < 30 ? "10-30s"
    : seconds < 60 ? "30-60s"
    : seconds < 120 ? "1-2min"
    : seconds < 300 ? "2-5min"
    : "5min+";
  gtag("event", "time_on_page", {
    page_path: path,
    seconds: Math.round(seconds),
    time_bucket: bucket,
  });
};

// ── Session Exit ───────────────────────────────────────────
export const trackSessionExit = (
  path: string,
  scrollPercent: number,
  secondsSpent: number,
  converted: boolean
) => {
  gtag("event", "session_exit", {
    page_path: path,
    scroll_at_exit: scrollPercent,
    seconds_at_exit: Math.round(secondsSpent),
    converted,
    exit_type:
      secondsSpent < 5 ? "bounce_immediate"
      : scrollPercent < 25 ? "bounce_top"
      : scrollPercent < 75 ? "drop_mid_page"
      : "read_but_no_convert",
  });
};

// ── CTA Clicks ─────────────────────────────────────────────
export const trackCTAClick = (
  ctaName: string,
  location: string,
  destination?: string
) => {
  gtag("event", "cta_click", {
    cta_name: ctaName,
    cta_location: location,
    destination_url: destination ?? "",
    page_path: window.location.pathname,
  });
  dispatchConversion();
};

// ── Navigation ─────────────────────────────────────────────
export const trackNavClick = (label: string, destination: string) => {
  gtag("event", "nav_click", {
    link_text: label,
    destination_url: destination,
    page_path: window.location.pathname,
  });
};

// ── Outbound Links ─────────────────────────────────────────
export const trackOutboundLink = (url: string, label?: string) => {
  gtag("event", "click", {
    link_url: url,
    link_text: label ?? url,
    outbound: true,
    page_path: window.location.pathname,
  });
};

// ── Language ───────────────────────────────────────────────
export const trackLanguageChange = (lang: string) => {
  gtag("event", "language_change", {
    selected_language: lang,
    page_path: window.location.pathname,
  });
};

// ── Button Click générique ─────────────────────────────────
export const trackButtonClick = (buttonName: string, location?: string) => {
  gtag("event", "button_click", {
    button_name: buttonName,
    click_location: location ?? "unknown",
    page_path: window.location.pathname,
  });
};

// ── Blog ───────────────────────────────────────────────────
export const trackArticleOpen = (articleId: number, title: string) => {
  gtag("event", "article_open", {
    article_id: articleId,
    article_title: title,
    page_path: window.location.pathname,
  });
};

export const trackArticleClose = (articleId: number, timeSpentSeconds: number) => {
  gtag("event", "article_close", {
    article_id: articleId,
    time_spent_seconds: Math.round(timeSpentSeconds),
    page_path: window.location.pathname,
  });
};

export const trackArticleShare = (articleId: number, title: string) => {
  gtag("event", "article_share", {
    article_id: articleId,
    article_title: title,
    page_path: window.location.pathname,
  });
};

export const trackBlogSearch = (query: string, resultsCount: number) => {
  gtag("event", "blog_search", {
    search_term: query,
    results_count: resultsCount,
    page_path: window.location.pathname,
  });
};

export const trackBlogTagFilter = (tag: string) => {
  gtag("event", "blog_tag_filter", {
    tag,
    page_path: window.location.pathname,
  });
};

// ── Features ───────────────────────────────────────────────
export const trackFeatureCardOpen = (groupLabel: string, featureTitle: string) => {
  gtag("event", "feature_card_open", {
    group: groupLabel,
    feature: featureTitle,
    page_path: window.location.pathname,
  });
};

// ── FAQ ────────────────────────────────────────────────────
export const trackFAQOpen = (section: string, question: string) => {
  gtag("event", "faq_open", {
    section,
    question: question.substring(0, 100),
    page_path: window.location.pathname,
  });
};

// ── Pricing ────────────────────────────────────────────────
export const trackPricingToggle = (period: "quarterly" | "annual") => {
  gtag("event", "pricing_toggle", {
    billing_period: period,
    page_path: window.location.pathname,
  });
};

// ── Social ─────────────────────────────────────────────────
export const trackSocialClick = (platform: string) => {
  gtag("event", "social_click", {
    platform,
    page_path: window.location.pathname,
  });
};

// ── Pourquoi Steero ────────────────────────────────────────
export const trackBehavioralCardOpen = (index: number, title: string) => {
  gtag("event", "behavioral_card_open", {
    principle_index: index,
    principle_title: title,
    page_path: window.location.pathname,
  });
};

// ── 404 ────────────────────────────────────────────────────
export const trackNotFound = (path: string) => {
  gtag("event", "page_not_found", {
    page_path: path,
    referrer: document.referrer,
  });
};

// ── Conversion dispatch (pour AnalyticsTracker) ────────────
export const dispatchConversion = () => {
  window.dispatchEvent(new CustomEvent("steero:converted"));
};

// ── Essai gratuit : porte unique (checklist GA4 begin_trial) ──
export const APP_URL = "https://app.steero.fr/";

/**
 * L'inscription Clerk revient sur /bienvenue : c'est cette page qui envoie
 * begin_trial (la confirmation), jamais le clic sur un bouton.
 */
export const SIGNUP_URL =
  "https://accounts.steero.fr/sign-up?redirect_url=" +
  encodeURIComponent("https://www.steero.fr/bienvenue");

/** Tout CTA d'essai passe par ici : événement secondaire + ouverture Clerk. */
export const startTrial = (location: string) => {
  gtag("event", "cta_start_trial_click", {
    cta_location: location,
    page_path: window.location.pathname,
  });
  trackCTAClick("commencer_maintenant", location, SIGNUP_URL);
  window.open(SIGNUP_URL, "_blank");
};

const BEGIN_TRIAL_SENT_KEY = "steero_begin_trial_sent";

/**
 * Étiquette de la conversion « Inscription » côté Google Ads, de la forme
 * `AW-XXXXXXXXX/aBcDeFgHiJkLmNoPqR`. À relever dans le compte : Objectifs →
 * Conversions → Inscription → « Configuration de la balise » → « Installer la
 * balise vous-même », dans le bloc `send_to`.
 *
 * L'identifiant `AW-…` qui la précède est aussi à reporter dans
 * `ADS_CONVERSION_ID` (`lib/consent.ts`) : sans le `config`, le `send_to` ne
 * trouve pas sa destination.
 */
const ADS_SIGNUP_CONVERSION = "";

/**
 * Événement clé de conversion, envoyé une seule fois par navigateur :
 * la garde localStorage évite le double comptage (refresh, StrictMode,
 * retour sur /bienvenue). method n'est pas connaissable depuis le site
 * (l'inscription se fait chez Clerk), on ne l'invente pas.
 */
export const trackBeginTrial = () => {
  // On lit le consentement au lieu de le deviner. Avant Consent Mode v2,
  // l'absence de `window.gtag` valait refus, et ce test suffisait. Depuis, le
  // shim existe dès le démarrage avec un refus par défaut : le deviner ferait
  // griller la garde ci-dessous pour un visiteur qui a refusé, et l'essai ne
  // serait plus jamais comptable s'il acceptait plus tard.
  if (typeof window === "undefined" || readConsent() !== "granted") return false;
  try {
    if (localStorage.getItem(BEGIN_TRIAL_SENT_KEY)) return false;
  } catch {
    // Stockage indisponible (navigation privée) : on envoie quand même.
  }
  gtag("event", "begin_trial", { plan: "trial_14d" });
  // La conversion Google Ads part d'ici, sous la même garde : c'est le même
  // fait, il ne peut pas être compté deux fois. Tant que l'étiquette n'est pas
  // renseignée, la ligne ne fait rien et GA4 continue seul.
  if (ADS_SIGNUP_CONVERSION) {
    gtag("event", "conversion", { send_to: ADS_SIGNUP_CONVERSION });
  }
  // Même conversion, donc même garde : un essai ne peut pas être compté deux
  // fois côté Meta pour une seule inscription.
  fbq("track", "StartTrial");
  try {
    localStorage.setItem(BEGIN_TRIAL_SENT_KEY, new Date().toISOString());
  } catch {
    // Sans stockage, pas de garde possible : assumé.
  }
  return true;
};
// ── Échange avec le fondateur : porte unique ───────────────
/**
 * ⚠️ LE SLUG DIT `30min`, L'ÉCHANGE DURE 15 MINUTES. NE PAS « CORRIGER ».
 *
 * L'offre est passée de 30 à 15 minutes le 02/09/2026. Le type d'événement
 * Calendly a été raccourci sur place, donc son slug est resté celui de sa
 * création. L'incohérence est assumée : changer le slug fait mourir l'ancienne
 * URL À L'INSTANT, or c'est elle que la production sert. Il y aurait une
 * fenêtre, même courte, où « Réserver un créneau » mène à un 404 de Calendly.
 *
 * Le slug n'est donc plus une source de vérité, juste une adresse. **La durée
 * qui fait foi est celle qu'annonce la page Calendly elle-même**, et la copy des
 * locales (`booking.title`, `booking.pricingLink`) doit la répéter à
 * l'identique. Le contrôle qui ne ment pas, avant toute mise en production de ce
 * bloc :
 *
 *     curl -s https://calendly.com/steerofinance/30min | grep -o '<title>[^<]*'
 *
 * Une page qui promet une durée devant un agenda qui en réserve une autre fait
 * perdre la confiance à l'endroit exact de la conversion.
 *
 * Changer la durée à nouveau, c'est quatre valeurs, et Calendly EN PREMIER :
 * l'event type, puis `booking.title` et `booking.pricingLink` dans les trois
 * locales.
 */
export const BOOKING_URL = "https://calendly.com/steerofinance/30min";

/**
 * Tout CTA de réservation passe par ici.
 *
 * `trackCTAClick` déclenche `dispatchConversion()` : une réservation compte donc
 * comme session convertie dans `session_exit`, au même titre qu'un essai. C'est
 * voulu — le visiteur a bien fait le pas qu'on lui demandait — mais ça déplace
 * mécaniquement une part de `read_but_no_convert`. L'événement propre à suivre
 * reste `cta_book_call_click`, jamais le taux de conversion global.
 *
 * Ce que ce clic n'est PAS : la conversion Google Ads. Elle reste `begin_trial`.
 * Une réservation est trop rare pour qu'un algorithme d'enchères apprenne
 * dessus.
 */
export const bookCall = (location: string) => {
  gtag("event", "cta_book_call_click", {
    cta_location: location,
    page_path: window.location.pathname,
  });
  // `Lead` chez Meta, et pas `StartTrial` : une demande d'échange n'est pas un
  // essai. Les deux ne se mélangent pas, pour la même raison qu'au-dessus.
  fbq("track", "Lead");
  trackCTAClick("reserver_echange", location, BOOKING_URL);
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
};
