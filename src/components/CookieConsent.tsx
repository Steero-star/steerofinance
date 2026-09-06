import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import {
  CONSENT_OPEN_EVENT,
  initConsent,
  readConsent,
  setConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Recueil du consentement, en écran bloquant.
 *
 * POURQUOI BLOQUANT. Le bandeau discret produisait un troisième état qui n'en
 * est pas un : ni accepté, ni refusé, simplement ignoré. Sur la semaine du
 * 30 août, Google Ads facturait 115 clics et GA4 voyait 9 sessions. Ces 92 %
 * ne sont pas des refus, ce sont des non-réponses — parce qu'ignorer était le
 * geste le moins coûteux pour le visiteur. Forcer la réponse transforme
 * l'ignorance en oui ou en non, et même un partage moitié-moitié multiplie la
 * mesure par six.
 *
 * POURQUOI DEUX BOUTONS STRICTEMENT ÉGAUX. Même taille, même forme, même
 * typographie, un clic chacun, aucun présélectionné. Refuser doit être aussi
 * facile qu'accepter : c'est le point sur lequel la CNIL a sanctionné Google
 * (150 M€) et Meta (60 M€) en décembre 2021. Un « Tout accepter » dominant
 * n'invaliderait pas seulement le consentement recueilli, il serait
 * sanctionnable en lui-même. **Ne pas rétablir de hiérarchie visuelle ici, quel
 * que soit le gain espéré.**
 *
 * POURQUOI REFERMABLE À LA RÉOUVERTURE. Bloquer n'a de sens que tant qu'aucun
 * choix n'existe. Quelqu'un qui rouvre le panneau depuis le pied de page a déjà
 * répondu : l'enfermer serait gratuit, et transformerait un geste de
 * transparence en punition.
 */
const CookieConsent = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [blocking, setBlocking] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initConsent();
    if (readConsent() === null) {
      setOpen(true);
      setBlocking(true);
    }

    const reopen = () => {
      setOpen(true);
      // Réouverture volontaire : jamais bloquante, même si le choix stocké a
      // expiré entre-temps. C'est la visite suivante qui rebloquera.
      setBlocking(false);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  /**
   * Verrou de défilement. Sans lui, l'écran couvre la page mais la molette
   * continue de la parcourir derrière : le blocage serait décoratif. On restaure
   * la valeur précédente plutôt que de forcer une chaîne vide, pour ne pas
   * écraser un verrou posé par un autre composant.
   */
  useEffect(() => {
    if (!blocking) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [blocking]);

  /**
   * Piège de focus, actif seulement en mode bloquant. Sans lui, la tabulation
   * emmène derrière l'écran : le visiteur atteindrait les liens du site au
   * clavier sans avoir répondu, et un lecteur d'écran annoncerait une page
   * navigable qui ne l'est pas.
   */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!blocking) return;
      // Aucune sortie par Échap tant qu'il n'y a pas de choix : la fermeture
      // sans réponse est exactement l'état qu'on supprime.
      if (event.key === "Escape") {
        event.preventDefault();
        return;
      }
      if (event.key !== "Tab") return;

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [blocking]
  );

  useEffect(() => {
    if (!open || !blocking) return;
    // Le focus part sur le dialogue, pas sur un bouton : le poser sur
    // « Tout accepter » serait une présélection déguisée.
    dialogRef.current?.focus();
  }, [open, blocking]);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setOpen(false);
    setBlocking(false);
  };

  return (
    <div
      className={
        blocking
          ? // `z-[90]` et non `z-50` : l'en-tête est `fixed z-50` et gagnait le
            // point de clic. L'écran s'affichait bien, mais la navigation et
            // « Commencer maintenant » restaient cliquables par-dessus — le
            // blocage était décoratif. On reste sous les toasts (`z-[100]`),
            // qui doivent pouvoir signaler une erreur même ici.
            "fixed inset-0 z-[90] flex items-end justify-center bg-foreground/60 p-4 backdrop-blur-sm duration-300 animate-in fade-in sm:items-center sm:p-6"
          : "fixed inset-x-0 bottom-0 z-50 px-4 pb-4 duration-300 animate-in fade-in slide-in-from-bottom-4 sm:px-6 sm:pb-6"
      }
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal={blocking}
        aria-label={t("cookies.title")}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="container mx-auto max-w-3xl rounded-2xl border border-border bg-background p-5 shadow-soft outline-none sm:p-6"
      >
        <h2 className="mb-2 text-base font-semibold text-foreground">{t("cookies.title")}</h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {t("cookies.body")}{" "}
          <Link to="/politique-confidentialite" className="text-primary hover:underline">
            {t("cookies.policyLink")}
          </Link>
          .
        </p>
        {/*
          Deux boutons de dimensions identiques. `flex-1 basis-0` est ce qui
          garantit l'égalité : sans eux, la longueur du libellé ferait la
          hiérarchie visuelle à notre place, et « Continuer sans accepter » est
          plus long que « Tout accepter ».
        */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            variant="outline"
            className="w-full flex-1 basis-0 rounded-full"
            onClick={() => choose("denied")}
          >
            {t("cookies.decline")}
          </Button>
          <Button
            // `border-transparent` n'est pas décoratif : le variant `outline`
            // du bouton de refus porte une bordure d'1px, donc 2px de plus en
            // largeur et en hauteur. Sans bordure équivalente ici, « Tout
            // accepter » serait mesurablement plus petit — l'inverse du
            // reproche habituel, mais une inégalité quand même.
            className="btn-primary w-full flex-1 basis-0 rounded-full border border-transparent"
            onClick={() => choose("granted")}
          >
            {t("cookies.accept")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
