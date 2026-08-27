import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const RealProblem = () => {
  const { t } = useTranslation();

  const retroItems = t("realProblem.retroItems", { returnObjects: true }) as string[];
  const pareItems = t("realProblem.pareItems", { returnObjects: true }) as string[];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
        >
          {t("realProblem.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
        >
          {t("realProblem.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-3xl"
        >
          {t("realProblem.description")}
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
              {t("realProblem.retroLabel")}
            </p>
            <p className="font-semibold text-foreground mb-5">{t("realProblem.retroCompany")}</p>
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
              {t("realProblem.pareLabel")}
            </p>
            <p className="font-semibold text-foreground mb-5">{t("realProblem.pareCompany")}</p>
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 rounded-2xl border border-border/60 border-l-4 border-l-primary bg-card p-5 text-foreground leading-relaxed"
        >
          {t("realProblem.verdict")}
        </motion.p>
      </div>
    </section>
  );
};

export default RealProblem;
