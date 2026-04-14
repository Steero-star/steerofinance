import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const RealProblem = () => {
  const { t } = useTranslation();

  const cards = [
    { num: "01", text: t("realProblem.card1") },
    { num: "02", text: t("realProblem.card2") },
    { num: "03", text: t("realProblem.card3") },
  ];

  return (
    <section className="py-20 bg-[hsl(222,47%,11%)] text-[hsl(210,40%,98%)]">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest mb-4 uppercase text-orange-400"
        >
          {t("realProblem.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight mb-6 max-w-none text-primary-foreground"
        >
          {t("realProblem.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg mb-14 max-w-none leading-relaxed whitespace-pre-line text-secondary"
        >
          {t("realProblem.description")}
        </motion.p>

        <div className="grid sm:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="rounded-2xl bg-[hsl(222,40%,16%)] border border-[hsl(217,33%,24%)] p-7"
            >
              <span className="text-2xl font-bold mb-4 block text-primary-foreground">
                {card.num}
              </span>
              <p className="text-[hsl(210,30%,88%)] text-[15px] leading-relaxed">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RealProblem;
