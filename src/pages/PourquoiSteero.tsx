import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Info, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TempoLetter } from "@/components/TempoLetter";
import steeroBanner from "@/assets/steero-banner-3.png";
import steeroBannerWebP from "@/assets/steero-banner-3.webp";
import { useTranslation } from "react-i18next";

type Principle = { num: string; title: string; desc: string; ref: string };
type TempoRow = { letter: string; name: string; desc: string; freq: string; time: string };

const PourquoiSteero = () => {
  const { t } = useTranslation();

  const retroItems = t("pourquoiSteero.realProblem.retroItems", { returnObjects: true }) as string[];
  const pareItems = t("pourquoiSteero.realProblem.pareItems", { returnObjects: true }) as string[];
  const principles = t("pourquoiSteero.behavioral.principles", { returnObjects: true }) as Principle[];
  const tempo = t("pourquoiSteero.tempo.rows", { returnObjects: true }) as TempoRow[];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("pourquoiSteero.seo.title")}
        description={t("pourquoiSteero.seo.description")}
        keywords={t("pourquoiSteero.seo.keywords")}
        canonical="/pourquoi-steero"
      />
      <Header />

      {/* HERO */}
      <section className="relative bg-hero-gradient pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge-sparkle mb-8"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{t("pourquoiSteero.hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
            >
              {t("pourquoiSteero.hero.title")}<br />
              <span className="italic text-primary">{t("pourquoiSteero.hero.titleHighlight")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              {t("pourquoiSteero.hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-block"
            >
              <Button
                size="lg"
                onClick={() => window.open("https://app.steero.fr/", "_blank")}
                className="rounded-full px-8 group"
              >
                {t("pourquoiSteero.hero.cta")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-4">
              {t("pourquoiSteero.hero.subtext")}
            </p>
          </div>
        </div>
      </section>

      {/* LE VRAI PROBLÈME */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            {t("pourquoiSteero.realProblem.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
          >
            {t("pourquoiSteero.realProblem.title")} <span className="italic text-primary">{t("pourquoiSteero.realProblem.titleHighlight")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl"
          >
            {t("pourquoiSteero.realProblem.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border/60"
          >
            {/* Rétroviseur */}
            <div className="bg-muted/40 p-6 md:border-r border-border/60">
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                {t("pourquoiSteero.realProblem.retroLabel")}
              </p>
              <p className="font-semibold text-foreground mb-5">{t("pourquoiSteero.realProblem.retroCompany")}</p>
              <ul className="space-y-0">
                {retroItems.map((item, i) => (
                  <li
                    key={i}
                    className={`py-3 text-sm text-foreground flex gap-2 ${i !== 0 ? "border-t border-border/60" : ""}`}
                  >
                    <span className="text-muted-foreground">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Pare-brise */}
            <div className="bg-card p-6 border-t md:border-t-0 border-border/60">
              <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
                {t("pourquoiSteero.realProblem.pareLabel")}
              </p>
              <p className="font-semibold text-foreground mb-5">{t("pourquoiSteero.realProblem.pareCompany")}</p>
              <ul className="space-y-0">
                {pareItems.map((item, i) => (
                  <li
                    key={i}
                    className={`py-3 text-sm text-foreground flex gap-2 ${i !== 0 ? "border-t border-border/60" : ""}`}
                  >
                    <span className="text-primary font-semibold">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* APPROCHE COMPORTEMENTALE */}
      <section className="py-24 bg-secondary/30" id="fondements-comportementaux">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            {t("pourquoiSteero.behavioral.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
          >
            {t("pourquoiSteero.behavioral.titlePre")} <span className="italic text-primary">{t("pourquoiSteero.behavioral.titleHighlight")}</span> {t("pourquoiSteero.behavioral.titlePost")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12"
          >
            {t("pourquoiSteero.behavioral.description")}
          </motion.p>

          <div className="space-y-4">
            {principles.map((p, i) => (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="rounded-2xl border border-border/60 bg-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex gap-5">
                  <span className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                    {p.num}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground leading-snug mb-2">
                      {p.title}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {p.desc}
                    </p>
                    <hr className="border-border/60 my-3" />
                    <p className="text-xs text-muted-foreground italic">
                      {p.ref}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TEMPO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            {t("pourquoiSteero.tempo.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
          >
            {t("pourquoiSteero.tempo.titlePre")} <span className="italic text-primary">{t("pourquoiSteero.tempo.titleHighlight")}</span>{t("pourquoiSteero.tempo.titlePost")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12"
          >
            {t("pourquoiSteero.tempo.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="overflow-x-auto rounded-2xl border border-border/60 bg-card"
          >
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="bg-muted/40">
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 w-20 border-b border-border/60" />
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 border-b border-border/60">
                    {t("pourquoiSteero.tempo.colRitual")}
                  </th>
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 border-b border-border/60">
                    {t("pourquoiSteero.tempo.colFrequency")}
                  </th>
                  <th className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-left p-4 border-b border-border/60">
                    {t("pourquoiSteero.tempo.colDuration")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tempo.map((row, i) => (
                  <tr key={row.letter} className={i !== 0 ? "border-t border-border/60" : ""}>
                    <td className="p-4 align-top">
                      <TempoLetter letter={row.letter} size="lg" />
                    </td>
                    <td className="p-4 align-top">
                      <p className="font-semibold text-foreground text-sm mb-1">{row.name}</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{row.desc}</p>
                    </td>
                    <td className="p-4 align-top text-sm text-muted-foreground">{row.freq}</td>
                    <td className="p-4 align-top text-sm font-semibold text-foreground">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3"
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">{t("pourquoiSteero.tempo.bankingNoteTitle")}</span>{" "}
              {t("pourquoiSteero.tempo.bankingNoteDesc")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
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
              {t("pourquoiSteero.cta.title")}<br /><span className="italic opacity-80">{t("pourquoiSteero.cta.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              {t("pourquoiSteero.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open("https://app.steero.fr/", "_blank")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t("pourquoiSteero.cta.primary")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/fonctionnalites"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t("pourquoiSteero.cta.secondary")}
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

export default PourquoiSteero;
