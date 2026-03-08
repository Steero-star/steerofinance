import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEO from "@/components/SEO";
import { useWaitlist } from "@/contexts/WaitlistContext";

type BillingPeriod = "quarterly" | "annual";

const Pricing = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("quarterly");

  const isAnnual = billingPeriod === "annual";
  const monthlyPrice = 8.00;
  const annualPrice = 6.00;
  const discountPercent = 25;

  // Total amounts
  const quarterlyTotal = (monthlyPrice * 3).toFixed(2).replace('.', ',');
  const annualTotal = 72;
  const annualSavings = 24;

  const getPrice = () => {
    if (isAnnual) {
      return `${annualPrice.toFixed(2).replace('.', ',')}€`;
    }
    return `${monthlyPrice.toFixed(2).replace('.', ',')}€`;
  };

  const getOriginalPrice = () => {
    if (!isAnnual) return null;
    return `${monthlyPrice.toFixed(2).replace('.', ',')}€`;
  };

  const getTotalBilled = () => {
    return isAnnual ? `${annualTotal},00€` : `${quarterlyTotal}€`;
  };


  return (
    <div className="min-h-screen">
      <SEO
        title={t("pricing.seoTitle")}
        description={t("pricing.seoDescription")}
      />
      <Header />

      {/* Hero Section - Harmonized with other pages */}
      <main className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {t("pricing.titlePart1")} <span className="text-primary">{t("pricing.titleHighlight")}</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-10">
                {t("pricing.subtitle")}
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-2 bg-muted rounded-full p-1 mb-12">
                <button
                  onClick={() => setBillingPeriod("quarterly")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    !isAnnual
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("pricing.quarterly")}
                </button>
                <button
                  onClick={() => setBillingPeriod("annual")}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    isAnnual
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t("pricing.annual")}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    isAnnual 
                      ? "bg-white/20 text-primary-foreground" 
                      : "bg-accent text-accent-foreground"
                  }`}>
                    -{discountPercent}%
                  </span>
                </button>
              </div>

              {/* Single Pricing Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-10 shadow-2xl max-w-md mx-auto"
              >
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  {t("pricing.planName")}
                </h3>

                <div className="mb-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={billingPeriod}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-baseline justify-center gap-2"
                    >
                      <span className="text-5xl font-bold text-primary-foreground">
                        {getPrice()}
                      </span>
                      {getOriginalPrice() && (
                        <span className="text-lg line-through text-primary-foreground/50">
                          {getOriginalPrice()}
                        </span>
                      )}
                      <span className="text-sm text-primary-foreground/80">
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
                      className="text-xs mt-2 text-primary-foreground/70"
                    >
                      {isAnnual ? t("pricing.billedAnnually") : t("pricing.billedQuarterly")}
                    </motion.p>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`total-${billingPeriod}`}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col items-center gap-2 mt-3"
                    >
                      <p className="text-sm font-medium text-primary-foreground/90 bg-white/10 rounded-full px-4 py-1.5">
                        {t("pricing.totalBilled")} {getTotalBilled()}
                      </p>
                      {isAnnual && (
                        <p className="text-sm font-semibold text-white bg-white/20 rounded-full px-4 py-1">
                          🎉 {t("pricing.savings")} {annualSavings},00€
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <p className="text-sm mb-6 text-primary-foreground/80">
                  {t("pricing.description")}
                </p>

                {/* Prix fondateur */}
                <div className="mb-6 bg-white/10 rounded-xl p-4 text-left space-y-2">
                  <h4 className="text-sm font-bold text-primary-foreground">{t("pricing.founderTitle")}</h4>
                  <p className="text-xs text-primary-foreground/80 leading-relaxed">
                    {t("pricing.founderText1")}
                  </p>
                  <p className="text-xs text-primary-foreground/80 leading-relaxed">
                    {t("pricing.founderText2")}
                  </p>
                </div>

                {/* Early Adopters */}
                <div className="mb-6 bg-orange-500/20 border border-orange-400/40 rounded-xl p-4 text-left space-y-2">
                  <span className="inline-block bg-orange-500 text-white text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-full">
                    {t("pricing.earlyBadge")}
                  </span>
                  <p className="text-xs text-primary-foreground/90 leading-relaxed">
                    {t("pricing.earlyText1")}
                  </p>
                  <p className="text-xs text-primary-foreground font-medium leading-relaxed">
                    {t("pricing.earlyText2")}
                  </p>
                  <p className="text-[10px] text-primary-foreground/60 leading-relaxed">
                    *{t("pricing.earlyDisclaimer")}
                  </p>
                </div>

                <Button
                  onClick={openWaitlist}
                  className="w-full rounded-full bg-white text-primary hover:bg-white/90"
                >
                  {t("pricing.cta")}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Plan Impact */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center">
              {t("pricing.impactTitle")}
            </h2>
            <div className="bg-card border border-border rounded-2xl p-8 space-y-4 text-muted-foreground text-sm leading-relaxed">
              <p>
                {t("pricing.impactIntro")} <span className="font-semibold text-foreground">{t("pricing.impactName")}</span>.
              </p>
              <p>{t("pricing.impactLimited")}</p>
              <p>
                {t("pricing.impactEligibility")} <span className="font-semibold text-foreground">{t("pricing.impactDiscount")}</span> {t("pricing.impactDuration")}
              </p>
              <p>{t("pricing.impactReview")}</p>
              <p className="font-medium text-foreground">
                {t("pricing.impactGoal")}
              </p>
              <div className="pt-2 text-center">
                <a
                  href="https://www.notion.so/68ab0233fa764fee9a8845d05af589e7?v=319020d992408096af72000cb7be3444&source=copy_link"
                  target="_blank"
                  rel="noopener noreferrer"
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
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {t("pricing.faqTitle")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("pricing.faqDescription")}
            </p>
            <Link to="/faq">
              <Button variant="outline" className="rounded-full">
                {t("pricing.faqCta")}
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
