import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  BarChart3,
  CalendarCheck,
  Crosshair,
  FolderKanban,
  Gauge,
  LayoutGrid,
  Receipt,
  RefreshCcw,
  Users,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { startTrial, trackFeatureCardOpen } from "@/lib/analytics";
import featureBudgetiser from "@/assets/feature-budgetiser.webp";
import featureSaisir from "@/assets/feature-saisir.webp";
import showcaseFlux from "@/assets/showcase-flux.webp";

type Feature = { key: string; title: string; promise: string; details: string; isNew?: boolean };
type Group = { num: string; title: string; titleEm?: string; sub: string; features: Feature[] };
type SoonCard = { title: string; body: string; strong?: string };

const ICONS: Record<string, LucideIcon> = {
  onboarding: Crosshair,
  budget: LayoutGrid,
  fixed: RefreshCcw,
  daily: Receipt,
  level: Gauge,
  rituals: CalendarCheck,
  indicators: BarChart3,
  projects: FolderKanban,
  tiers: Users,
};

/* Une capture réelle par groupe ; celle des projets/tiers reste à produire. */
const GROUP_IMAGES = [featureBudgetiser, featureSaisir, showcaseFlux];

/**
 * Page Fonctionnalités v2 : trois groupes qui suivent le parcours réel
 * (poser le cadre, tenir le quotidien, décider), détail des cartes au
 * survol, captures produit à la place des démos animées.
 * Projets et tiers sont livrés ; l'intégration bancaire est annoncée sans
 * date, la qualification restant le geste conscient.
 */
const Fonctionnalites = () => {
  const { t } = useTranslation();
  const groups = t("fonctionnalites.groups", { returnObjects: true }) as Group[];
  const soon = t("fonctionnalites.soon", { returnObjects: true }) as SoonCard[];
  const [active, setActive] = useState<string | null>(null);

  const open = (f: Feature, groupTitle: string) => {
    if (active !== f.key) trackFeatureCardOpen(groupTitle, f.title);
    setActive(active === f.key ? null : f.key);
  };

  return (
    <div className="min-h-screen">
      <SEO
        title="Fonctionnalités - Tout pour piloter tes finances | Steero"
        description="Pose ton cadre en 10 minutes, tiens ton quotidien en 5 minutes par jour, décide avec de la hauteur : budget, saisie rapide, rituels TEMPO, projets, tiers et indicateurs."
        canonical="/fonctionnalites"
      />
      <Header />

      {/* Hero */}
      <section className="bg-hero-gradient pt-36 pb-14">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-primary mb-4 uppercase"
          >
            {t("fonctionnalites.heroLabel")}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-foreground mb-4"
          >
            {t("fonctionnalites.heroTitle")}
            <br />
            <em className="italic text-primary">{t("fonctionnalites.heroTitleEm")}</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed max-w-2xl mb-8"
          >
            {t("fonctionnalites.heroLead")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-start gap-3"
          >
            <button
              onClick={() => startTrial("fonctionnalites_hero")}
              className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold group"
            >
              {t("common.startFree")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-xs text-muted-foreground">{t("hero.microcopy")}</span>
          </motion.div>
        </div>
      </section>

      {/* Trois groupes */}
      {groups.map((g, gi) => (
        <section key={g.num} className="py-16 bg-background border-t border-border/40">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-baseline gap-4 mb-2"
            >
              <span className="font-serif text-4xl md:text-5xl text-primary leading-none">{g.num}</span>
              <h2 className="font-serif text-2xl md:text-4xl font-normal leading-[1.15] tracking-tight text-foreground">
                {g.title}{" "}
                {g.titleEm && <em className="italic text-primary">{g.titleEm}</em>}
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mb-8"
            >
              {g.sub}
            </motion.p>

            <div className="grid gap-8 lg:grid-cols-[7fr_5fr] items-start">
              <div className={`grid gap-3 ${gi % 2 === 1 ? "lg:order-2" : ""}`}>
                {g.features.map((f) => {
                  const Icon = ICONS[f.key] ?? LayoutGrid;
                  const isOpen = active === f.key;
                  return (
                    <motion.div
                      key={f.key}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4 }}
                      onMouseEnter={() => setActive(f.key)}
                      onMouseLeave={() => setActive(null)}
                      className={`rounded-2xl border border-border/60 bg-card transition-shadow duration-300 ${
                        isOpen ? "shadow-card" : ""
                      }`}
                    >
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => open(f, g.title)}
                        onFocus={() => setActive(f.key)}
                        className="w-full text-left px-5 py-4 cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="flex items-center gap-4">
                          <span className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-semibold text-foreground text-[15px]">{f.title}</span>
                            <span className="block text-sm text-muted-foreground">{f.promise}</span>
                          </span>
                          {f.isNew && (
                            <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide text-primary uppercase">
                              {t("fonctionnalites.newBadge")}
                            </span>
                          )}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <p className="px-5 pb-5 lg:pl-[4.75rem] text-sm text-muted-foreground leading-relaxed">
                              {f.details}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={gi % 2 === 1 ? "lg:order-1" : ""}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      aria-label={t("showcase.zoomLabel", { name: g.title })}
                      className="group block w-full cursor-zoom-in rounded-2xl overflow-hidden border border-border/60 shadow-image focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <img
                        src={GROUP_IMAGES[gi]}
                        alt={g.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                      />
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-6xl w-[95vw] border-none bg-transparent p-0 shadow-none">
                    <DialogTitle className="sr-only">{g.title}</DialogTitle>
                    <img src={GROUP_IMAGES[gi]} alt={g.title} className="w-full h-auto block rounded-lg" />
                  </DialogContent>
                </Dialog>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* Ça arrive */}
      <section className="py-16 bg-muted/40 border-t border-border/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-serif text-2xl md:text-4xl font-normal leading-[1.15] tracking-tight text-foreground mb-2"
          >
            {t("fonctionnalites.soonTitle")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mb-8"
          >
            {t("fonctionnalites.soonSub")}
          </motion.p>
          <div className="grid md:grid-cols-2 gap-4">
            {soon.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="rounded-2xl border border-dashed border-border bg-background/70 p-6"
              >
                <span className="inline-block rounded-full border border-border px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide text-muted-foreground uppercase mb-3">
                  {t("fonctionnalites.soonBadge")}
                </span>
                <h3 className="font-semibold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                  {s.strong && (
                    <>
                      {" "}
                      <span className="font-semibold text-foreground">{s.strong}</span>
                    </>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-primary px-7 md:px-10 py-9 flex flex-col md:flex-row items-start md:items-center gap-7 shadow-card"
          >
            <div className="flex-1">
              <h2 className="font-serif text-2xl md:text-3xl font-normal text-primary-foreground mb-2">
                {t("fonctionnalites.ctaTitle")}
              </h2>
              <p className="text-primary-foreground/85 text-sm leading-relaxed max-w-xl">
                {t("fonctionnalites.ctaBody")}
              </p>
            </div>
            <div className="flex flex-col items-start md:items-center gap-2">
              <button
                onClick={() => startTrial("fonctionnalites_cta")}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group"
              >
                {t("common.startFree")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-xs text-primary-foreground/75">{t("fonctionnalites.ctaMicro")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fonctionnalites;
