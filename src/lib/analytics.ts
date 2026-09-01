declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const gtag = (...args: unknown[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag(...args);
  }
};

// ── Page Views ─────────────────────────────────────────────
export const trackPageView = (path: string) => {
  gtag("config", "G-61JXTXNN1N", {
    page_path: path,
    page_title: document.title,
  });
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
 * Événement clé de conversion, envoyé une seule fois par navigateur :
 * la garde localStorage évite le double comptage (refresh, StrictMode,
 * retour sur /bienvenue). method n'est pas connaissable depuis le site
 * (l'inscription se fait chez Clerk), on ne l'invente pas.
 */
export const trackBeginTrial = () => {
  // Sans consentement, gtag n'est pas chargé : on ne grille pas la garde,
  // un passage ultérieur avec consentement pourra encore compter l'essai.
  if (typeof window === "undefined" || !window.gtag) return false;
  try {
    if (localStorage.getItem(BEGIN_TRIAL_SENT_KEY)) return false;
  } catch {
    // Stockage indisponible (navigation privée) : on envoie quand même.
  }
  gtag("event", "begin_trial", { plan: "trial_14d" });
  try {
    localStorage.setItem(BEGIN_TRIAL_SENT_KEY, new Date().toISOString());
  } catch {
    // Sans stockage, pas de garde possible : assumé.
  }
  return true;
};
// ── Échange avec le fondateur : porte unique ───────────────
/**
 * LA DURÉE VIT DANS LE SLUG CALENDLY, PAS DANS LA COPY.
 *
 * `30min` est le type d'événement Calendly : c'est LUI qui fait foi. La copy des
 * locales (`booking.title`, `booking.pricingLink`) annonce la même durée, et les
 * deux doivent bouger ensemble. Passer à 15 minutes, c'est donc trois valeurs :
 * l'URL ici, et le titre dans les trois locales. Une page qui promet 15 minutes
 * devant un agenda qui en réserve 30 fait perdre la confiance avant l'appel.
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
  trackCTAClick("reserver_echange", location, BOOKING_URL);
  window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
};
