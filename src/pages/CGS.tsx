import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CGS = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Conditions Générales de Service"
        description="Conditions générales d'utilisation de Steero. Découvrez les règles d'utilisation de notre application de gestion de budget et finances personnelles."
        canonical="/cgs"
        noIndex={true}
      />
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {t('legal.cgs.title')}
          </h1>
          <p className="text-muted-foreground mb-4">
            {t('legal.cgs.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            {t('legal.cgs.lastUpdate')}
          </p>

          <div className="space-y-10 text-foreground">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s1.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s1.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s1.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('legal.cgs.sections.s1.outro')}</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s2.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s2.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6">
                {(t('legal.cgs.sections.s2.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s2.notes', { returnObjects: true }) as string[]).map((note, i) => (
                  <p key={i}>{note}</p>
                ))}
              </div>
              <p className="mt-4">{t('legal.cgs.sections.s2.outro')}</p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s3.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s3.intro')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s3.confirm')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s3.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s4.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s4.intro')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s4.responsible')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s4.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('legal.cgs.sections.s4.outro')}</p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s5.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s5.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {(t('legal.cgs.sections.s5.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mb-4">{t('legal.cgs.sections.s5.evolution')}</p>
              <p>{t('legal.cgs.sections.s5.outro')}</p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s6.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s6.intro')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s6.conditions')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s6.renewal')}</p>
              <p>{t('legal.cgs.sections.s6.outro')}</p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s7.title')}</h2>
              <p className="mb-4 font-medium">{t('legal.cgs.sections.s7.important')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s7.noAdvice')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s7.informative')}</p>
              <p className="mb-4 font-medium">{t('legal.cgs.sections.s7.responsible')}</p>
              <p>{t('legal.cgs.sections.s7.outro')}</p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s8.title')}</h2>
              <p className="mb-4 font-medium">{t('legal.cgs.sections.s8.ownership')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s8.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s8.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">
                {t('legal.cgs.sections.s8.details')}{" "}
                <Link to="/politique-confidentialite" className="text-primary hover:underline">
                  {t('legal.cgs.sections.s8.privacyLink')}
                </Link>{" "}
                {t('legal.cgs.sections.s8.gdpr')}
              </p>
            </section>

            {/* Section 9-14 - simplified */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s9.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s9.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s9.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s10.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s10.intro')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s10.noLiability')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s10.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 font-medium">{t('legal.cgs.sections.s10.outro')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s11.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s11.intro')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s11.usage')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s11.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s12.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s12.userDelete')}</p>
              <p className="mb-4">{t('legal.cgs.sections.s12.ourSide')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.cgs.sections.s12.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s13.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s13.law')}</p>
              <p>{t('legal.cgs.sections.s13.dispute')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.cgs.sections.s14.title')}</h2>
              <p className="mb-4">{t('legal.cgs.sections.s14.question')}</p>
              <p>
                {t('legal.cgs.sections.s14.email')}{" "}
                <a href="mailto:steerofinance@gmail.com" className="text-primary hover:underline">
                  steerofinance@gmail.com
                </a>{" "}
                {t('legal.cgs.sections.s14.tempEmail')}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CGS;