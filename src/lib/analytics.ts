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
};

// ── Waitlist Funnel ────────────────────────────────────────
export const trackWaitlistOpen = (source: string) => {
  gtag("event", "waitlist_open", {
    trigger_location: source,
    page_path: window.location.pathname,
  });
};

export const trackWaitlistStep = (
  step:
    | "form_seen"
    | "form_focused"
    | "form_submitted"
    | "form_success"
    | "form_error"
    | "email_duplicate",
  extra?: Record<string, unknown>
) => {
  gtag("event", "waitlist_funnel", {
    step,
    page_path: window.location.pathname,
    ...extra,
  });
};

// Compat avec l'ancien code
export const trackWaitlistSubmit = (success: boolean) => {
  trackWaitlistStep(success ? "form_success" : "form_error");
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
export const dispatchWaitlistConversion = () => {
  window.dispatchEvent(new CustomEvent("steero:waitlist_converted"));
};