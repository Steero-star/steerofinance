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
        {/* 3 cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-5 transition-colors duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="w-10 h-10 rounded-xl bg-muted group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors duration-300">
                  <card.icon className={`w-5 h-5 ${card.iconColor} transition-transform duration-300 group-hover:scale-110`} />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
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
      </div>
    </section>
  );
};

export default WhySteero;
