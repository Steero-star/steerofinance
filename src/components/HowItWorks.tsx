import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { TempoLetter } from "@/components/TempoLetter";


const HowItWorks = () => {
  const { t } = useTranslation();

  const rituals = ["t", "e", "m", "p", "o"] as const;

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest text-muted-foreground mb-4"
        >
          {t("tempo.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4"
        >
          {t("tempo.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground mb-12 max-w-2xl whitespace-pre-line"
        >
          {t("tempo.description")}
        </motion.p>

        <div className="relative">
          {/* Vertical progress line */}
          <div className="absolute left-[1.65rem] top-5 bottom-5 w-0.5 bg-border/40 z-0" />
          <motion.div
            className="absolute left-[1.65rem] top-5 bottom-5 w-0.5 bg-primary/50 origin-top z-0"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          />

          <div className="space-y-4 relative z-10">
            {rituals.map((key, i) => {
              const letter = t(`tempo.rituals.${key}.letter`);

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-5 rounded-2xl border border-border/60 bg-card p-5 hover:border-primary/20 transition-colors"
                >
                  <TempoLetter letter={letter} size="lg" />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground text-base">
                      {t(`tempo.rituals.${key}.name`)}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(`tempo.rituals.${key}.desc`)}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="block text-sm text-muted-foreground">
                      {t(`tempo.rituals.${key}.freq`)}
                    </span>
                    <span className="block text-sm font-semibold text-foreground">
                      {t(`tempo.rituals.${key}.time`)}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
