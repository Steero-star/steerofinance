import { useEffect, useState } from "react";

/**
 * Vrai au-dessus de 1024 px, et tenu à jour.
 *
 * Extrait de `MethodResults` le 30/08, quand le hero en a eu besoin lui aussi.
 * Ce n'est pas qu'une question de mise en page : le hero ne MONTE la vidéo que
 * sur grand écran, et un `hidden` en CSS ne suffirait pas — l'élément
 * existerait, et le navigateur téléchargerait deux mégaoctets et demi pour ne
 * rien afficher.
 *
 * L'état initial est lu de façon synchrone : le calculer dans un effet ferait
 * rendre une première frame en version mobile sur tous les postes.
 */
export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isDesktop;
}
