import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const lineVariants = {
  hidden: {
    scaleX: 0
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut" as const
    }
  }
};

const HowItWorks = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const decorY1 = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const steps = [{
    number: "01",
    title: t('howItWorks.step1.title'),
    description: t('howItWorks.step1.description')
  }, {
    number: "02",
    title: t('howItWorks.step2.title'),
    description: t('howItWorks.step2.description')
  }, {
    number: "03",
    title: t('howItWorks.step3.title'),
    description: t('howItWorks.step3.description')
  }];

  return (
    <section ref={sectionRef} className="py-24 bg-primary/5 relative overflow-hidden">
      {/* Decorative background elements with parallax */}
      <div className="absolute inset-0 overflow-hidden bg-primary-foreground">
        <motion.div 
          style={{ y: decorY1 }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: decorY2 }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" 
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }} 
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{t('howItWorks.title')}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('howItWorks.description')}
          </p>
        </motion.div>

        {/* Progress line for desktop */}
        <div className="hidden md:block max-w-4xl mx-auto mb-8">
          <motion.div 
            className="h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full origin-left" 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-100px" }} 
            variants={lineVariants} 
          />
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8" 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, margin: "-100px" }} 
          variants={containerVariants}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants} 
              className="relative p-8 rounded-2xl shadow-card hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/20 group bg-secondary"
            >
              {/* Step indicator dot */}
              <div className="absolute -top-3 left-8 w-6 h-6 rounded-full flex items-center justify-center bg-primary">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
              
              <span className="text-5xl font-bold transition-colors text-right text-primary">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold mb-3 mt-2 text-primary">{step.title}</h3>
              <p className="leading-relaxed text-sidebar-foreground">{step.description}</p>
              
              {/* Connecting line to next card (mobile) */}
              {index < steps.length - 1 && (
                <div className="md:hidden absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
