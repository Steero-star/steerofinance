import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

type Constat = {
  num: string;
  fig: string;
  title: string;
  body: string;
  srcLabel: string;
  srcHref: string;
  gainTitle: string;
  gainBody: string;
};

/**
 * Le Grand Pourquoi : trois constats de recherche présentés comme le rapport
 * d'étonnement qui a fait naître Steero, chacun refermé sur le gain visiteur.
 * Règle non négociable : chaque chiffre affiché ici est sourcé et lié.
 */
const RapportEtonnement = () => {
  const { t } = useTranslation();
  const constats = t("why.constats", { returnObjects: true }) as Constat[];
  const foot = t("why.foot", { returnObjects: true }) as string[];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-3xl mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            {t("why.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground mb-4"
          >
            {t("why.title")} <em className="italic text-primary">{t("why.titleEm")}</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            {t("why.lead")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl border border-border/60 bg-card shadow-card overflow-hidden"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3 px-6 md:px-9 py-5 border-b border-border/60 bg-muted/40">
            <h3 className="font-serif text-xl md:text-2xl font-normal text-foreground">
              {t("why.reportTitle")}
            </h3>
            <span className="text-xs text-muted-foreground tracking-wide">{t("why.reportMeta")}</span>
          </div>

          {constats.map((c, i) => (
            <div
              key={c.num}
              className={`grid gap-6 md:gap-8 md:grid-cols-[160px_1fr_1fr] px-6 md:px-9 py-8 ${
                i !== 0 ? "border-t border-border/60" : ""
              }`}
            >
              <div>
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                  {c.num}
                </p>
                <p className="font-serif text-5xl md:text-6xl text-primary leading-none mt-2">{c.fig}</p>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">{c.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                <a
                  href={c.srcHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 text-xs text-primary hover:underline"
                >
                  {c.srcLabel} ↗
                </a>
              </div>
              <div className="border-t md:border-t-0 md:border-l border-primary/20 pt-4 md:pt-0 md:pl-8">
                <p className="text-[11px] font-semibold tracking-widest text-primary uppercase mb-2">
                  {t("why.gainLabel")}
                </p>
                <p className="text-sm text-foreground leading-relaxed">
                  <span className="font-semibold">{c.gainTitle}</span> {c.gainBody}
                </p>
              </div>
            </div>
          ))}

          <div className="flex flex-wrap items-center justify-between gap-4 px-6 md:px-9 py-6 border-t border-border/60 bg-muted/40">
            <p className="font-serif text-lg md:text-xl italic text-foreground">
              {foot.map((word, i) => (
                <span key={i}>
                  {i > 0 && " "}
                  {word}
                </span>
              ))}
            </p>
            <a href="#methode" className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
              {t("why.footCta")} ↓
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RapportEtonnement;
