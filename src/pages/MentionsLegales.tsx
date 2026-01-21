import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

const MentionsLegales = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <SEO
        title="Mentions légales"
        description="Mentions légales de Steero, application de gestion de budget et finances personnelles. Informations sur l'éditeur, l'hébergement et la propriété intellectuelle."
        canonical="/mentions-legales"
        noIndex={true}
      />
      <Header />
      <main className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-8">{t('legal.mentions.title')}</h1>
            
            <div className="space-y-8 text-muted-foreground">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.sections.s1.title')}</h2>
                <p>{t('legal.mentions.sections.s1.intro')}</p>
                <ul className="mt-4 space-y-2">
                  <li><strong className="text-foreground">{t('legal.mentions.sections.s1.address')}</strong> {t('legal.mentions.sections.s1.tbc')}</li>
                  <li><strong className="text-foreground">{t('legal.mentions.sections.s1.director')}</strong> {t('legal.mentions.sections.s1.tbc')}</li>
                  <li><strong className="text-foreground">{t('legal.mentions.sections.s1.email')}</strong> contact@steero.fr</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.sections.s2.title')}</h2>
                <p>{t('legal.mentions.sections.s2.intro')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.sections.s3.title')}</h2>
                <p>{t('legal.mentions.sections.s3.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.sections.s4.title')}</h2>
                <p>{t('legal.mentions.sections.s4.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.sections.s5.title')}</h2>
                <p>{t('legal.mentions.sections.s5.content')}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">{t('legal.mentions.sections.s6.title')}</h2>
                <p>{t('legal.mentions.sections.s6.content')}</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MentionsLegales;