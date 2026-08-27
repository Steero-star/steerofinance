import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { APP_URL, trackBeginTrial } from "@/lib/analytics";

/**
 * Étape de confirmation d'inscription (checklist GA4 « begin_trial »).
 *
 * Clerk redirige ici après la création du compte : c'est le seul endroit où
 * le site voit une inscription CONFIRMÉE, sur le même domaine que la session
 * GA d'origine — l'essai reste donc attribuable à sa campagne. La page envoie
 * begin_trial une seule fois puis emmène l'utilisateur vers l'app.
 */
const REDIRECT_DELAY_MS = 2000;

const Bienvenue = () => {
  const { t } = useTranslation();

  useEffect(() => {
    trackBeginTrial();
    const id = window.setTimeout(() => window.location.replace(APP_URL), REDIRECT_DELAY_MS);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-6">
      <SEO title={t("bienvenue.title")} description={t("bienvenue.body")} noIndex />
      <div className="max-w-md w-full text-center rounded-3xl border border-border/60 bg-card shadow-card px-8 py-12">
        <div className="mx-auto mb-6 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary text-xl" aria-hidden="true">
            ✓
          </span>
        </div>
        <h1 className="font-serif text-3xl font-normal text-foreground mb-3">
          {t("bienvenue.title")}
        </h1>
        <p className="text-muted-foreground mb-8">{t("bienvenue.body")}</p>
        <a
          href={APP_URL}
          className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold group"
        >
          {t("bienvenue.cta")}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default Bienvenue;
