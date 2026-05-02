import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import { useWaitlist } from "@/contexts/WaitlistContext";

type BillingPeriod = "quarterly" | "annual";

const Pricing = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("quarterly");

  const isAnnual = billingPeriod === "annual";
  const monthlyPrice = 8.0;
  const annualPrice = 6.0;
  const discountPercent = 25;

  const quarterlyTotal = (monthlyPrice * 3).toFixed(2).replace(".", ",");
  const annualTotal = 72;
  const annualSavings = 24;

  const getPrice = () =>
    isAnnual
      ? `${annualPrice.toFixed(2).replace(".", ",")}€`
      : `${monthlyPrice.toFixed(2).replace(".", ",")}€`;

  const getOriginalPrice = () =>
    isAnnual ? `${monthlyPrice.toFixed(2).replace(".", ",")}€` : null;

  const getTotalBilled = () =>
    isAnnual ? `${annualTotal},00€` : `${quarterlyTotal}€`;

  const features = [
    t("pricing.feature1"),
    t("pricing.feature2"),
    t("pricing.feature3"),
    t("pricing.feature4"),
    t("pricing.feature5"),
    t("pricing.feature6"),
    t("pricing.feature7"),
    t("pricing.feature8"),
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("pricing.seoTitle")}
        description={t("pricing.seoDescription")}
        keywords="tarifs steero, prix application budget, abonnement gestion budget, app finances personnelles prix"
        canonical="/pricing"
      />
      <Header />

      {/* Hero épuré + carte premium */}
      <main className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient -z-10" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center mb-12"
          >
            <h1
              className="font-serif text-5xl md:text-6xl font-normal text-foreground mb-6 leading-[1.1] tracking-tight"
            >
              {t("pricing.titlePart1")}
              <br />
              <span className="italic text-primary">
                {t("pricing.titleHighlight")}
              </span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              {t("pricing.subtitle")}
            </p>
          </motion.div>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-1 bg-card border border-border rounded-full p-1 shadow-soft">
              <button
                onClick={() => setBillingPeriod("quarterly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  !isAnnual
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.quarterly")}
              </button>
              <button
                onClick={() => setBillingPeriod("annual")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                  isAnnual
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t("pricing.annual")}
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isAnnual
                      ? "bg-background/15 text-background"
                      : "bg-primary/10 text-primary"
                  }`}
                >
                  −{discountPercent}%
                </span>
              </button>
            </div>
          </motion.div>

          {/* Premium pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-xl mx-auto"
          >
            <div className="relative bg-card border border-border rounded-3xl shadow-card overflow-hidden">
              {/* Top section : plan + price + description */}
              <div className="p-8 md:p-10">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-6 block">
                  {t("pricing.planName")}
                </span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={billingPeriod}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-2 mb-3"
                  >
                    <span
                      className="font-serif text-6xl md:text-7xl text-foreground tracking-tight"
                    >
                      {getPrice()}
                    </span>
                    {getOriginalPrice() && (
                      <span className="text-xl line-through text-muted-foreground/60">
                        {getOriginalPrice()}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground ml-1">
                      /{t("pricing.perMonth")}
                    </span>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`billing-${billingPeriod}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-muted-foreground mb-6"
                  >
                    {isAnnual
                      ? t("pricing.billedAnnually")
                      : t("pricing.billedQuarterly")}{" "}
                    · {t("pricing.totalBilled")} {getTotalBilled()}
                    {isAnnual && (
                      <span className="text-primary font-medium">
                        {" "}
                        — {t("pricing.savings")} {annualSavings},00€
                      </span>
                    )}
                  </motion.p>
                </AnimatePresence>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("pricing.description")}
                </p>
              </div>

              {/* Features */}
              <div className="border-t border-border px-8 md:px-10 py-7">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-5 block">
                  {t("pricing.featuresHeading")}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {features.map((feat, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                      className="flex items-start gap-2.5 text-sm text-foreground"
                    >
                      <span className="flex-shrink-0 w-4 h-4 rounded-sm bg-primary flex items-center justify-center mt-0.5">
                        <Check
                          className="w-2.5 h-2.5 text-primary-foreground"
                          strokeWidth={3.5}
                        />
                      </span>
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Prix fondateur */}
              <div className="border-t border-border px-8 md:px-10 py-7">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-3 block">
                  {t("pricing.founderTitle")}
                </span>
                <p className="text-sm font-medium text-foreground mb-2">
                  {t("pricing.founderHeadline")}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("pricing.founderText1")}
                </p>
              </div>

              {/* Early Adopters */}
              <div className="px-8 md:px-10 pb-8">
                <div className="rounded-2xl border border-primary/15 bg-primary/5 p-5">
                  <div className="inline-flex items-center gap-2 mb-3 bg-primary text-primary-foreground px-3 py-1 rounded-full">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider">
                      {t("pricing.earlyBadge")}
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 leading-relaxed mb-3">
                    {t("pricing.earlyText1")}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                    {t("pricing.earlyDisclaimer")}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="px-8 md:px-10 pb-8">
                <Button
                  onClick={openWaitlist}
                  size="lg"
                  className="w-full rounded-full group"
                >
                  {t("pricing.cta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {t("pricing.guarantee")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Plan Impact */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden">
              <div className="p-8">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                  {t("pricing.impactSection")}
                </span>
                <h2
                  className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight"
                >
                  {t("pricing.impactTitle")}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("pricing.impactIntro")}
                </p>
              </div>

              <div className="border-t border-border bg-muted/40 p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-foreground mb-1.5">
                    {t("pricing.impactConditionsTitle")}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("pricing.impactConditionsText")}
                  </p>
                </div>
                <a
                  href="https://www.notion.so/68ab0233fa764fee9a8845d05af589e7?v=319020d992408096af72000cb7be3444&source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  <Button variant="outline" className="rounded-full">
                    {t("pricing.impactCta")}
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-xl mx-auto"
          >
            <h2
              className="font-serif text-3xl md:text-4xl text-foreground mb-3"
            >
              {t("pricing.faqTitle")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("pricing.faqDescription")}
            </p>
            <Link to="/faq">
              <Button variant="outline" className="rounded-full group">
                {t("pricing.faqCta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
