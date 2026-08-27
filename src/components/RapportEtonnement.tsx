import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
 * Le Grand Pourquoi en panneau compact : trois grands chiffres, le détail
 * (constat sourcé + gain) ne s'affiche qu'au survol, au focus ou au tap.
 * Règle non négociable : chaque chiffre affiché ici est sourcé et lié.
 */
const RapportEtonnement = () => {
  const { t } = useTranslation();
  const constats = t("why.constats", { returnObjects: true }) as Constat[];
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="pourquoi" className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="max-w-3xl mb-8">
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
            className="text-muted-foreground leading-relaxed"
          >
            {t("why.lead")}{" "}
            <span className="text-sm whitespace-nowrap">· {t("why.reportMeta")}</span>
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 items-start">
          {constats.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className={`rounded-2xl border bg-card transition-all duration-300 ${
                active === i ? "border-primary/40 shadow-card" : "border-border/60"
              }`}
            >
              <button
                type="button"
                aria-expanded={active === i}
                onClick={() => setActive(active === i ? null : i)}
                onFocus={() => setActive(i)}
                className="w-full text-left p-6 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase mb-2">
                  {c.num}
                </p>
                <p className="font-serif text-5xl md:text-6xl text-primary leading-none mb-3">
                  {c.fig}
                </p>
                <h3 className="font-semibold text-foreground">{c.title}</h3>
              </button>

              <AnimatePresence initial={false}>
                {active === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                      <a
                        href={c.srcHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-3 text-xs text-primary hover:underline"
                      >
                        {c.srcLabel} ↗
                      </a>
                      <div className="mt-4 border-t border-border/60 pt-4">
                        <p className="text-[11px] font-semibold tracking-widest text-primary uppercase mb-1.5">
                          {t("why.gainLabel")}
                        </p>
                        <p className="text-sm text-foreground leading-relaxed">
                          <span className="font-semibold">{c.gainTitle}</span> {c.gainBody}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <p className="mt-4 text-xs text-muted-foreground">{t("why.hint")}</p>
      </div>
    </section>
  );
};

export default RapportEtonnement;
