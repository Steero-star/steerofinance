import { useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  trackPageView,
  trackScrollDepth,
  trackTimeOnPage,
  trackSessionExit,
} from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 90, 100] as const;

const AnalyticsTracker = () => {
  const location = useLocation();

  // Refs pour ne pas recréer les closures à chaque render
  const startTimeRef = useRef<number>(Date.now());
  const maxScrollRef = useRef<number>(0);
  const firedMilestonesRef = useRef<Set<number>>(new Set());
  const convertedRef = useRef<boolean>(false);
  const currentPathRef = useRef<string>(location.pathname);

  // ── Marquer une conversion (appel externe possible) ──────
  // On expose ça via un événement custom pour que WaitlistForm
  // puisse notifier ce composant
  useEffect(() => {
    const handleConversion = () => {
      convertedRef.current = true;
    };
    window.addEventListener("steero:waitlist_converted", handleConversion);
    return () =>
      window.removeEventListener("steero:waitlist_converted", handleConversion);
  }, []);

  // ── Fonction de nettoyage au changement de page ──────────
  const flushPageData = useCallback(() => {
    const secondsSpent = (Date.now() - startTimeRef.current) / 1000;
    const path = currentPathRef.current;
    const scroll = maxScrollRef.current;

    // Temps passé sur la page
    if (secondsSpent > 2) {
      trackTimeOnPage(path, secondsSpent);
    }

    // Décrochage / exit
    trackSessionExit(path, scroll, secondsSpent, convertedRef.current);
  }, []);

  // ── Reset à chaque changement de route ───────────────────
  useEffect(() => {
    // Flush les données de la page précédente
    if (currentPathRef.current !== location.pathname) {
      flushPageData();
    }

    // Reset pour la nouvelle page
    currentPathRef.current = location.pathname;
    startTimeRef.current = Date.now();
    maxScrollRef.current = 0;
    firedMilestonesRef.current = new Set();
    convertedRef.current = false;

    // Track la page vue
    trackPageView(location.pathname);
  }, [location.pathname, flushPageData]);

  // ── Flush quand l'onglet se ferme ou change ───────────────
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        flushPageData();
      }
    };
    const handleBeforeUnload = () => {
      flushPageData();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [flushPageData]);

  // ── Tracker le scroll ─────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      if (scrollPercent > maxScrollRef.current) {
        maxScrollRef.current = scrollPercent;
      }

      // Envoyer un événement à chaque palier (une seule fois par page)
      for (const milestone of SCROLL_MILESTONES) {
        if (
          scrollPercent >= milestone &&
          !firedMilestonesRef.current.has(milestone)
        ) {
          firedMilestonesRef.current.add(milestone);
          trackScrollDepth(
            currentPathRef.current,
            milestone as 25 | 50 | 75 | 90 | 100
          );
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
};

export default AnalyticsTracker;
