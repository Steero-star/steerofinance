import { UserPlus, Users, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const NextSteps = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: UserPlus,
      titleKey: "nextSteps.step1.title",
      descriptionKey: "nextSteps.step1.description",
      dateKey: "nextSteps.step1.date",
    },
    {
      icon: Users,
      titleKey: "nextSteps.step2.title",
      descriptionKey: "nextSteps.step2.description",
      dateKey: "nextSteps.step2.date",
    },
    {
      icon: Rocket,
      titleKey: "nextSteps.step3.title",
      descriptionKey: "nextSteps.step3.description",
      dateKey: "nextSteps.step3.date",
    },
  ];

  return (
    <section id="prochaines-etapes" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('nextSteps.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('nextSteps.description')}
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">
                  {t('nextSteps.step')} {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t(step.titleKey)}
              </h3>

              <p className="text-muted-foreground mb-4 leading-relaxed">
                {t(step.descriptionKey)}
              </p>

              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                {t(step.dateKey)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NextSteps;