import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { startTrial } from "@/lib/analytics";

type Source = { label: string; sub: string; href: string };
type Quote = { text: string; name: string; role: string };
type Step = { when: string; title: string; body: string };

/**
 * Échelle de preuve (doc Pipe 27/09) : mécanisme sourcé, témoignages validés
 * mot pour mot avec accord écrit, projection concrète, ligne d'honnêteté.
 * Les chiffres de la première semaine sont un exemple illustratif, dit tel quel.
 */
const Preuve = () => {
  const { t } = useTranslation();
  const sources = t("preuve.sources", { returnObjects: true }) as Source[];
  const quotes = t("preuve.quotes", { returnObjects: true }) as Quote[];
  const steps = t("preuve.steps", { returnObjects: true }) as Step[];

  return (
    <section className="py-16 bg-primary/5 border-y border-border/40" id="preuve">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Mécanisme : volonté vs attention, sourcé */}
        <div className="grid gap-10 lg:grid-cols-[7fr_5fr] items-start">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
            >
              {t("preuve.label")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl font-normal leading-[1.15] tracking-tight text-foreground mb-5"
            >
              {t("preuve.mechTitle")}
              <br />
              <em className="italic text-primary">{t("preuve.mechTitleEm")}</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground leading-relaxed max-w-2xl"
            >
              {t("preuve.mechBody")}
            </motion.p>
          </div>

          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="rounded-2xl border border-border/60 bg-card p-6"
          >
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
              {t("preuve.sourcesTitle")}
            </p>
            <ul className="space-y-4">
              {sources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {s.label} ↗
                  </a>
                  <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        {/* Témoignages : citations validées, accord écrit */}
        <div className="grid sm:grid-cols-3 gap-4 mt-14">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="flex flex-col rounded-2xl border border-border/60 bg-card p-6"
            >
              <span className="font-serif text-4xl leading-none text-primary" aria-hidden="true">
                “
              </span>
              <blockquote className="text-sm text-foreground leading-relaxed mt-2 flex-1">
                {q.text}
              </blockquote>
              <figcaption className="mt-5">
                <p className="text-sm font-semibold text-foreground">{q.name}</p>
                <p className="text-xs text-muted-foreground">{q.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Première semaine : la projection concrète, exemple illustratif */}
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] items-start mt-20">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
            >
              {t("preuve.weekLabel")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl font-normal leading-[1.15] tracking-tight text-foreground mb-5"
            >
              {t("preuve.weekTitle")}{" "}
              <em className="italic text-primary">{t("preuve.weekTitleEm")}</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-serif italic text-lg text-muted-foreground"
            >
              {t("preuve.weekNote")}
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-border/60 bg-card px-6 md:px-8 py-2"
          >
            {steps.map((s, i) => (
              <div
                key={s.when}
                className={`flex gap-5 py-5 ${i !== 0 ? "border-t border-border/60" : ""}`}
              >
                <span className="shrink-0 h-fit whitespace-nowrap rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
                  {s.when}
                </span>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{s.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
            <p className="text-xs italic text-muted-foreground border-t border-border/60 py-4">
              {t("preuve.exNote")}
            </p>
          </motion.div>
        </div>

        {/* Ligne d'honnêteté : transparence sur le stade + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 rounded-3xl bg-primary px-7 md:px-10 py-9 flex flex-col md:flex-row items-start md:items-center gap-7 shadow-card"
        >
          <div className="flex-1">
            <h3 className="font-serif text-2xl font-normal text-primary-foreground mb-2">
              {t("preuve.honestTitle")}
            </h3>
            <p className="text-primary-foreground/85 text-sm leading-relaxed max-w-xl">
              {t("preuve.honestBody")}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center gap-2">
            <button
              onClick={() => startTrial("preuve")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-primary font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 group"
            >
              {t("common.startFree")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-xs text-primary-foreground/75">{t("preuve.honestMicro")}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Preuve;
