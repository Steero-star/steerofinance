import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useTranslation } from "react-i18next";

const PolitiqueConfidentialite = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Politique de confidentialité"
        description="Politique de confidentialité de Steero. Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée."
        canonical="/politique-confidentialite"
        noIndex={true}
      />
      <Header />
      
      <main className="flex-grow pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {t('legal.privacy.title')}
          </h1>
          <p className="text-muted-foreground mb-4">
            {t('legal.privacy.subtitle')}
          </p>
          <p className="text-sm text-muted-foreground mb-12">
            {t('legal.privacy.lastUpdate')}
          </p>

          <div className="space-y-10 text-foreground">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s1.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s1.intro')}</p>
              <p className="mb-4">{t('legal.privacy.sections.s1.explains')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s1.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('legal.privacy.sections.s1.outro')}</p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s2.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s2.intro')}</p>
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-muted-foreground">
                <p><strong className="text-foreground">{t('legal.privacy.sections.s2.company')}</strong></p>
                <p>{t('legal.privacy.sections.s2.legalForm')}</p>
                <p>{t('legal.privacy.sections.s2.address')}</p>
                <p>{t('legal.privacy.sections.s2.contact')}</p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s3.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s3.intro')}</p>
              
              <h3 className="text-lg font-medium mb-3">{t('legal.privacy.sections.s3.voluntary')}</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {(t('legal.privacy.sections.s3.voluntaryItems', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>

              <p className="mb-3">{t('legal.privacy.sections.s3.financial')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                {(t('legal.privacy.sections.s3.financialItems', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground mb-6">{t('legal.privacy.sections.s3.note')}</p>

              <h3 className="text-lg font-medium mb-3">{t('legal.privacy.sections.s3.technical')}</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s3.technicalItems', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            {/* Section 4-15 - simplified pattern */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s4.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s4.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s4.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4 font-medium">{t('legal.privacy.sections.s4.noProfiling')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s5.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s5.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s5.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s6.title')}</h2>
              <p className="mb-4 font-medium">{t('legal.privacy.sections.s6.noSell')}</p>
              <p className="mb-4">{t('legal.privacy.sections.s6.shared')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s6.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('legal.privacy.sections.s6.outro')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s7.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s7.location')}</p>
              <p>{t('legal.privacy.sections.s7.scc')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s8.title')}</h2>
              <p className="text-muted-foreground">{t('legal.privacy.sections.s8.content')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s9.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s9.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s9.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('legal.privacy.sections.s9.outro')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s10.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s10.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s10.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">
                {t('legal.privacy.sections.s10.exercise')} <a href="mailto:steerofinance@gmail.com" className="text-primary hover:underline">steerofinance@gmail.com</a>
              </p>
              <p className="mt-2 text-muted-foreground">{t('legal.privacy.sections.s10.response')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s11.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s11.intro')}</p>
              <p className="mb-2">{t('legal.privacy.sections.s11.result')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s11.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s12.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s12.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s12.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('legal.privacy.sections.s12.outro')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s13.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s13.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s13.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{t('legal.privacy.sections.s13.outro')}</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s14.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s14.intro')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {(t('legal.privacy.sections.s14.items', { returnObjects: true }) as string[]).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">{t('legal.privacy.sections.s15.title')}</h2>
              <p className="mb-4">{t('legal.privacy.sections.s15.question')}</p>
              <p>
                📧 <a href="mailto:steerofinance@gmail.com" className="text-primary hover:underline">steerofinance@gmail.com</a> {t('legal.privacy.sections.s15.tempEmail')}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PolitiqueConfidentialite;