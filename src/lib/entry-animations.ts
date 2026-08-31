import { useEffect } from "react";
import { MotionGlobalConfig } from "framer-motion";

/**
 * Animations d'entrée sur une page prerendue.
 *
 * Le contenu est déjà peint quand React démarre (voir `scripts/prerender.mjs`).
 * Sans précaution, le montage rejoue les animations d'entrée : le texte visible
 * repasse à `opacity: 0` avant de réapparaître. Mesuré sur l'accueil avant
 * correctif, 379 ms après le chargement, le `h1` était revenu à zéro et décalé
 * de 30 px.
 *
 * On neutralise donc les animations du PREMIER rendu, et seulement celles-là.
 *
 * Le relâchement ne peut pas être un simple `requestAnimationFrame` : les pages
 * sont chargées en `lazy()`, leur contenu monte plusieurs frames après
 * `render()`, et un compte à rebours du chargement rendrait tout garde-fou par
 * minuterie arbitraire. Il est donc posé par un effet monté à côté des routes,
 * qui ne s'exécute qu'une fois la page réellement affichée.
 */

/** Appelé avant `render()`, quand le `#root` servi contient déjà la page. */
export const holdEntryAnimations = (container: HTMLElement) => {
  if (container.hasChildNodes()) MotionGlobalConfig.skipAnimations = true;
};

/** Monté à côté des routes : rend la main aux animations après le premier écran. */
export const useReleaseEntryAnimations = () => {
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      MotionGlobalConfig.skipAnimations = false;
    });
    return () => cancelAnimationFrame(frame);
  }, []);
};
