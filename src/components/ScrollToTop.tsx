import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remonter en haut à chaque changement de page — SAUF quand l'URL vise une
 * ancre.
 *
 * Le `#` était purement et simplement ignoré : un lien vers
 * `/pourquoi-steero#fondements-comportementaux` déposait le visiteur sur le
 * titre de la page, et les deux liens de la section méthode promettaient une
 * destination qu'ils n'atteignaient pas. Constaté le 30/08 en branchant le CTA
 * « Voir une démo » sur `/fonctionnalites#demo`.
 *
 * L'élément visé n'existe PAS quand l'effet tourne, et une frame d'attente n'y
 * change rien : les routes sont paresseuses (`lazy` + `Suspense` dans
 * `App.tsx`), donc au moment de la navigation la page affiche encore son repli.
 * Il faut attendre qu'elle se monte. On observe donc le DOM jusqu'à voir la
 * cible, avec une limite de deux secondes — sans elle, une ancre qui n'existe
 * pas ferait sauter la page bien après que le visiteur a commencé à lire.
 *
 * `scroll-mt-*` sur la section visée garde la place de l'en-tête : c'est à la
 * destination de savoir de combien elle doit se décaler, pas à ce composant.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    const hautDePage = () =>
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    if (!hash) {
      hautDePage();
      return;
    }

    const viser = () => {
      const cible = document.getElementById(hash.slice(1));
      if (!cible) return false;
      cible.scrollIntoView({ block: "start", behavior: "instant" });
      return true;
    };

    if (viser()) return;

    // La page se monte : on la pose en haut, puis on saute dès que la cible
    // apparaît. Sans le premier geste, on hériterait du défilement de la page
    // précédente pendant le chargement.
    hautDePage();
    let fini = false;
    const arreter = () => {
      fini = true;
      observateur.disconnect();
      clearTimeout(limite);
    };
    const observateur = new MutationObserver(() => {
      if (!fini && viser()) arreter();
    });
    const limite = setTimeout(arreter, 2000);
    observateur.observe(document.body, { childList: true, subtree: true });
    return arreter;
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
