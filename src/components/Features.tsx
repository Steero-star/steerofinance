import { Circle, Settings, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Circle,
      title: t('features.budget.title'),
      description: t('features.budget.description'),
    },
    {
      icon: Settings,
      title: t('features.capture.title'),
      description: t('features.capture.description'),
    },
    {
      icon: TrendingUp,
      title: t('features.ritualize.title'),
      description: t('features.ritualize.description'),
    },
  ];

  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('features.description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-feature text-center text-primary-foreground bg-slate-50"
            >
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-left text-primary">{feature.title}</h3>
              <p className="leading-relaxed text-left text-base text-[#65758b] font-light font-[serif]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
