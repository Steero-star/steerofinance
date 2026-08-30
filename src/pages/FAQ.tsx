import Header from "@/components/Header";
import steeroBanner from "@/assets/steero-banner-3.png";
import steeroBannerWebP from "@/assets/steero-banner-3.webp";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "react-i18next";
import { trackFAQOpen } from "@/lib/analytics";

interface FAQItem {
  question: string;
  answer: string;
  highlighted?: boolean;
}

interface FAQSection {
  num: string;
  title: string;
  items: FAQItem[];
}

const SECTION_DEFS: { key: string; questions: number; highlighted?: number[] }[] = [
  { key: "understand", questions: 3, highlighted: [2] },
  { key: "howItWorks", questions: 3, highlighted: [1] },
  { key: "security", questions: 2, highlighted: [1] },
  { key: "access", questions: 4 },
];

const FAQ = () => {
  const { t } = useTranslation();

  const faqSections: FAQSection[] = SECTION_DEFS.map((def, index) => ({
    num: String(index + 1).padStart(2, "0"),
    title: t(`faq.sections.${def.key}.title`),
    items: Array.from({ length: def.questions }, (_, i) => ({
      question: t(`faq.sections.${def.key}.q${i + 1}.question`),
      answer: t(`faq.sections.${def.key}.q${i + 1}.answer`),
      highlighted: def.highlighted?.includes(i + 1),
    })),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqSections.flatMap((section) =>
      section.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      }))
    ),
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="FAQ - Questions sur la gestion de budget"
        description="Toutes les réponses à vos questions sur Steero. Comment bien gérer son argent ? Pourquoi Steero est mieux qu'Excel pour votre budget ? Découvrez notre approche comportementale unique."
        keywords="faq gestion budget, questions finances personnelles, comment gérer son argent, steero faq, application budget questions"
        canonical="/faq"
        jsonLd={jsonLd}
      />
      <Header />

      {/* Hero */}
      <main className="bg-hero-gradient pt-36 pb-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-foreground mb-4"
          >
            {t("faq.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-2xl"
          >
            {t("faq.subtitle")}
          </motion.p>
        </div>
      </main>

      {/* Sections */}
      {faqSections.map((section) => (
        <section key={section.num} className="py-16 bg-background border-t border-border/40">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[5fr_7fr] items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:sticky lg:top-32 flex items-baseline gap-4"
              >
                <span className="font-serif text-4xl md:text-5xl text-primary leading-none">
                  {section.num}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl font-normal leading-[1.15] tracking-tight text-foreground">
                  {section.title}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Accordion
                  type="single"
                  collapsible
                  onValueChange={(value) => {
                    if (value) {
                      const item = section.items[parseInt(value.split("-item-")[1])];
                      if (item) trackFAQOpen(section.title, item.question);
                    }
                  }}
                >
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`section-${section.num}-item-${itemIndex}`}
                      className="border-b border-border/60"
                    >
                      <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline hover:text-primary transition-colors py-5 text-base gap-4">
                        <span className="flex flex-wrap items-center gap-2.5">
                          {item.question}
                          {item.highlighted && (
                            <span className="px-2 py-0.5 text-[11px] font-semibold rounded-full bg-primary/10 text-primary whitespace-nowrap">
                              {t("faq.essential")}
                            </span>
                          )}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="text-[15px] leading-relaxed text-foreground/75 whitespace-pre-line pb-6 pt-0 max-w-[65ch]">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Pas trouvé ta réponse */}
      <section className="py-16 bg-muted/40 border-t border-border/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm font-semibold tracking-widest text-primary mb-3 uppercase">
              {t("faq.noAnswer")}
            </p>
            <p className="text-lg text-foreground mb-6 max-w-2xl">{t("faq.discoverHow")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/pourquoi-steero"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 group"
              >
                {t("faq.discoverApproach")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                onClick={() => window.open("https://app.steero.fr/", "_blank")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-card text-foreground font-medium transition-all hover:bg-muted"
              >
                {t("faq.startFree")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source srcSet={steeroBannerWebP} type="image/webp" />
            <img src={steeroBanner} alt="" loading="lazy" className="w-full h-full object-cover opacity-35" />
          </picture>
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-primary-foreground mb-4">
              {t("faq.ctaTitle")}
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">{t("faq.ctaDescription")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open("https://app.steero.fr/", "_blank")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t("common.startFree")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/pourquoi-steero"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t("common.discoverApproach")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FAQ;
