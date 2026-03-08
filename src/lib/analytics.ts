declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// ── Utilitaire de base ──────────────────────────────────────
export const trackEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};


// ── Pages vues (déjà géré par AnalyticsTracker) ────────────
export const trackPageView = (path: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", "G-61JXTXNN1N", {
      page_path: path,
      page_title: document.title,
    });
  }
};

export const trackTimeOnPage = (path: string, seconds: number) => {
  trackEvent("time_on_page", {
    page_path: path,
    seconds_spent: Math.round(seconds),
    // GA4 range pour segmenter facilement :
    time_range:
      seconds < 10 ? "0-10s"
      : seconds < 30 ? "10-30s"
      : seconds < 60 ? "30-60s"
      : seconds < 180 ? "1-3min"
      : "3min+",
  });
};

export const trackScrollDepth = (
  path: string,
  percent: 25 | 50 | 75 | 90 | 100
) => {
  trackEvent("scroll_depth", {
    page_path: path,
    scroll_percent: percent,
  });
};

export const trackButtonClick = (
  buttonName: string,
  location?: string
) => {
  trackEvent("button_click", {
    button_name: buttonName,
    click_location: location ?? "unknown",
  });
};

// ── Ouverture de la liste d'attente ────────────────────────
export const trackWaitlistOpen = (source: string) => {
  trackEvent("waitlist_open", {
    trigger_location: source,
  });
};

// ── Soumission du formulaire liste d'attente ───────────────
export const trackWaitlistSubmit = (success: boolean) => {
  trackEvent("waitlist_submit", {
    success,
  });
};

export const trackSessionExit = (
  path: string,
  scrollPercent: number,
  secondsSpent: number,
  convertedToWaitlist: boolean
) => {
  trackEvent("session_exit", {
    page_path: path,
    scroll_at_exit: scrollPercent,
    seconds_at_exit: Math.round(secondsSpent),
    converted: convertedToWaitlist,
    // Segmentation automatique du type de décrochage :
    exit_type:
      secondsSpent < 5 ? "bounce_immediate"
      : scrollPercent < 25 ? "bounce_top"
      : scrollPercent < 75 ? "drop_mid_page"
      : "read_but_no_convert",
  });
};

// ── Changement de langue ────────────────────────────────────
export const trackLanguageChange = (lang: string) => {
  trackEvent("language_change", { selected_language: lang });
};

// ── Navigation entre pages ──────────────────────────────────
export const trackNavClick = (destination: string) => {
  trackEvent("nav_click", { destination });
};
