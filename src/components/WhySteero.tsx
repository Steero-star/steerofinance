import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { PenLine, Target, ArrowUpRight } from "lucide-react";

const WhySteero = () => {
  const { t } = useTranslation();

  const cards = [
    {
      icon: PenLine,
      iconColor: "text-amber-500",
      title: t("whySteeroSection.card1.title"),
      desc: t("whySteeroSection.card1.desc"),
    },
    {
      icon: Target,
      iconColor: "text-emerald-600",
      title: t("whySteeroSection.card2.title"),
      desc: t("whySteeroSection.card2.desc"),
    },
    {
      icon: ArrowUpRight,
      iconColor: "text-foreground",
      title: t("whySteeroSection.card3.title"),
      desc: t("whySteeroSection.card3.desc"),
    },
  ];

  return (
    <section className="py-2 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold tracking-widest text-muted-foreground mb-4"
        >
          {t("whySteeroSection.label")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold leading-tight text-foreground mb-4"
        >
          {t("whySteeroSection.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-12 max-w-2xl"
        >
          {t("whySteeroSection.description")}
        </motion.p>

        {/* 3 cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-20">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="rounded-2xl border border-border/60 bg-card p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mb-4">
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <h3 className="font-semibold text-foreground text-base mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Separator */}
        <hr className="border-border/60" />

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="border-l-4 border-primary pl-6">
            <blockquote className="text-xl md:text-2xl font-bold italic text-foreground mb-2">
              {t("whySteeroSection.quote")}
            </blockquote>
            <p className="text-muted-foreground text-sm">
              {t("whySteeroSection.quoteCaption")}
            </p>
          </div>
        </motion.div>

        {/* Separator */}
        <hr className="border-border/40" />
      </div>
    </section>
  );
};

export default WhySteero;
