import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

type BillingPeriod = "quarterly" | "annual";

const Pricing = () => {
  const { t } = useTranslation();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("quarterly");

  const isAnnual = billingPeriod === "annual";
  const monthlyPrice = 8.0;
  const annualPrice = 6.0;

  // Tout se déduit des deux prix mensuels. Les totaux et l'économie ont déjà été
  // saisis à la main une fois, et l'annuel affichait 6,00€/mois pour un total de
  // 76€, soit 6,33€ réels : un écart de 4€ que rien ne rattrapait.
  const quarterlyTotal = (monthlyPrice * 3).toFixed(2).replace(".", ",");
  const annualTotal = annualPrice * 12;
  const annualSavings = monthlyPrice * 12 - annualTotal;
  const discountPercent = Math.round(
    ((monthlyPrice - annualPrice) / monthlyPrice) * 100
  );

  const getPrice = () =>
    isAnnual
      ? `${annualPrice.toFixed(2).replace(".", ",")}€`
      : `${monthlyPrice.toFixed(2).replace(".", ",")}€`;

  const getOriginalPrice = () =>
    isAnnual ? `${monthlyPrice.toFixed(2).replace(".", ",")}€` : null;

  const formatEur = (value: number) =>
    `${value.toFixed(2).replace(".", ",")}€`;

  const getTotalBilled = () =>
    isAnnual ? formatEur(annualTotal) : `${quarterlyTotal}€`;

  // `feature4` — « Suivi d'habitudes » — a été retiré de la liste le 30/08.
  // La clé reste en locale, comme les autres chaînes parquées du site : la
  // renuméroter obligerait à décaler feature5 à feature8 dans trois fichiers,
  // pour ne gagner qu'une continuité que personne ne lit.
  const features = [
    t("pricing.feature1"),
    t("pricing.feature2"),
    t("pricing.feature3"),
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
        canonical="/abonnement"
      />
      <Header />

      {/* L'EN-TÊTE EST `fixed` ET MESURE 133 px SUR CETTE PAGE : bandeau d'offre
          + barre de navigation. Il ne pousse donc rien, il recouvre. Toute marge
          haute inférieure à 133 px fait passer « Un prix » DERRIÈRE la barre —
          c'était le cas avec `pt-32` (128 px) comme avec `pt-28` (112 px), de
          justesse, donc sans que ça saute aux yeux. `pt-40` dégage 160 px, soit
          27 px d'air sous le bandeau. À ne pas réduire sans remesurer l'en-tête. */}
      <main className="relative pt-40 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient -z-10" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-6">
          {/* Le discours à gauche, l'offre à droite. La bascule reste COLLÉE à
              la carte et non sous le titre : c'est elle qui change le prix
              affiché juste en dessous, les séparer obligerait le lecteur à
              faire le lien de lui-même.

              LE TITRE EST EN HAUT. Centrer les deux colonnes repoussait « Un
              prix » sous la ligne de flottaison dès qu'un écran fait moins de
              720 px de haut. Plus de `sticky` en revanche : la carte tient
              désormais dans un écran, il n'y a plus de long défilement pendant
              lequel le titre aurait besoin de suivre. */}
          <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 items-start max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1 text-center lg:text-left"
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
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t("pricing.subtitle")}
              </p>
            </motion.div>

            <div className="lg:col-span-2">
          {/* Premium pricing card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div className="relative bg-card border border-border rounded-3xl shadow-card overflow-hidden">
              {/* Le prix à gauche, ce qu'il ouvre à droite : les deux moitiés se
                  répondent au lieu de s'empiler, et la carte tient dans un écran.
                  La grille étire les deux cellules à la même hauteur d'elle-même,
                  le filet vertical entre elles n'est donc jamais tronqué. */}
              <div className="grid md:grid-cols-2">
              <div className="p-7 md:p-8 md:border-r border-border">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                  {t("pricing.planName")}
                </span>

                {/* La bascule est DANS la carte, juste au-dessus du prix qu'elle
                    change. Posée au-dessus de la carte, elle décalait tout le
                    bloc de 82 px vers le bas et la carte ne s'alignait plus sur
                    le titre de gauche. */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="inline-flex items-center gap-1 bg-muted/60 border border-border rounded-full p-1 mb-5"
                >
                  <button
                    onClick={() => setBillingPeriod("quarterly")}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      !isAnnual
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t("pricing.quarterly")}
                  </button>
                  <button
                    onClick={() => setBillingPeriod("annual")}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isAnnual
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t("pricing.annual")}
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                        isAnnual
                          ? "bg-background/15 text-background"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      −{discountPercent}%
                    </span>
                  </button>
                </motion.div>

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
                    className="text-sm text-muted-foreground mb-5"
                  >
                    {isAnnual
                      ? t("pricing.billedAnnually")
                      : t("pricing.billedQuarterly")}{" "}
                    · {t("pricing.totalBilled")} {getTotalBilled()}
                    {isAnnual && (
                      // `block` plutôt qu'un séparateur : l'économie tient sa
                      // propre ligne. En ligne, elle débordait et se coupait
                      // entre « Économie » et « de 24,00€ ».
                      <span className="block text-primary font-medium">
                        {t("pricing.savings")} {formatEur(annualSavings)}
                      </span>
                    )}
                  </motion.p>
                </AnimatePresence>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("pricing.description")}
                </p>
              </div>

              {/* Features */}
              <div className="p-7 md:p-8 border-t md:border-t-0 border-border">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                  {t("pricing.featuresHeading")}
                </span>
                {/* Une seule colonne : la liste vit maintenant dans une demi-carte,
                    deux colonnes y casseraient chaque intitulé sur deux lignes. */}
                <ul className="grid grid-cols-1 gap-y-2.5">
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
              </div>

              {/* La carte s'arrête ici. « Prix fondateur » et l'offre early
                  adopters ont rejoint la bande du dessous : ils expliquent d'où
                  vient le prix, ils n'ont pas à s'intercaler entre les bénéfices
                  et le bouton qui les déclenche. */}

              {/* CTA */}
              <div className="border-t border-border p-7 md:p-8">
                <Button
                  onClick={() => window.open("https://app.steero.fr/", "_blank")}
                  size="lg"
                  className="w-full rounded-full"
                >
                  {t("pricing.cta")}
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  {t("pricing.guarantee")}
                </p>
              </div>
            </div>
          </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Prix fondateur + Plan Impact */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6">
          {/* Deux moitiés : ce que le prix devient, et ce qu'il finance. Les
              cartes s'étirent à la même hauteur (comportement par défaut de la
              grille, aucun `items-start` ici) — deux moitiés annoncées comme
              telles mais de hauteurs différentes se liraient comme un reste de
              mise en page, pas comme un partage.

              L'offre early adopters a suivi « Prix fondateur » en quittant la
              carte du haut : les deux disent la même chose — pourquoi ce prix-là,
              et jusqu'à quand. Elle n'est PAS dupliquée, elle a déménagé : le
              code EARLY25 n'existe qu'ici sur cette page. */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Prix fondateur, sorti de la carte d'abonnement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden flex flex-col"
            >
              <div className="p-8 flex-1">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4 block">
                  {t("pricing.founderTitle")}
                </span>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4 leading-tight">
                  {t("pricing.founderHeadline")}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t("pricing.founderText1")}
                </p>
              </div>

              <div className="border-t border-border bg-muted/40 p-6">
                <div className="inline-flex items-center gap-2 mb-3 bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider">
                    {t("pricing.earlyBadge")}
                  </span>
                </div>
                <p className="text-xs text-foreground/80 leading-relaxed mb-2">
                  {t("pricing.earlyText1")}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                  {t("pricing.earlyDisclaimer")}
                </p>
              </div>
            </motion.div>

            {/* Plan Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card border border-border rounded-2xl shadow-soft overflow-hidden flex flex-col"
            >
              <div className="p-8 flex-1">
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
            </motion.div>
          </div>
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
