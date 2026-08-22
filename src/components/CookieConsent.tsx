import { useEffect, useState } from "react";
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
 * Bandeau de consentement à la mesure d'audience.
 *
 * Animation en CSS et non en JS : un bandeau de consentement doit être visible
 * et cliquable même quand les animations JS ne tournent pas (onglet en arrière-plan,
 * rAF gelé). Le bandeau est démonté sèchement au choix de l'utilisateur.
 */
const CookieConsent = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initConsent();
    if (readConsent() === null) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t("cookies.title")}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 duration-300 animate-in fade-in slide-in-from-bottom-4 sm:px-6 sm:pb-6"
    >
      <div className="container mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 p-5 shadow-soft backdrop-blur sm:p-6">
        <h2 className="mb-2 text-base font-semibold text-foreground">{t("cookies.title")}</h2>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {t("cookies.body")}{" "}
          <Link to="/politique-confidentialite" className="text-primary hover:underline">
            {t("cookies.policyLink")}
          </Link>
          .
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          {/* Refuser doit être aussi accessible qu'accepter (CNIL). */}
          <Button
            variant="outline"
            className="w-full rounded-full sm:w-auto"
            onClick={() => choose("denied")}
          >
            {t("cookies.decline")}
          </Button>
          <Button
            className="btn-primary w-full rounded-full sm:w-auto"
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
