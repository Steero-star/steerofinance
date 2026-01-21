import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import featureBudgetiser from "@/assets/feature-budgetiser.webp";
import featureSaisir from "@/assets/feature-saisir.webp";
import featureRitualiser from "@/assets/feature-ritualiser.webp";

const Differentiation = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const decorY1 = useTransform(scrollYProgress, [0, 1], [-30, 80]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const advantages = [{
    titleKey: "differentiation.budget.title",
    descriptionKey: "differentiation.budget.description",
    image: featureBudgetiser,
    link: null
  }, {
    titleKey: "differentiation.capture.title",
    descriptionKey: "differentiation.capture.description",
    image: featureSaisir,
    link: { labelKey: "differentiation.capture.link", url: "/pourquoi-steero#fondements-comportementaux" }
  }, {
    titleKey: "differentiation.ritualize.title",
    descriptionKey: "differentiation.ritualize.description",
    image: featureRitualiser,
    link: { labelKey: "differentiation.ritualize.link", url: "/pourquoi-steero#fondements-comportementaux" }
  }];

  return (
    <section ref={sectionRef} className="py-20 bg-hero-gradient bg-secondary-foreground relative overflow-hidden">
      {/* Decorative parallax elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          style={{ y: decorY1 }}
          className="absolute -left-32 top-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl" 
        />
        <motion.div 
          style={{ y: decorY2 }}
          className="absolute -right-32 bottom-1/3 w-96 h-96 bg-primary/3 rounded-full blur-3xl" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('differentiation.title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('differentiation.description')}
          </p>
        </motion.div>
        <div className="max-w-6xl mx-auto space-y-20">
          {advantages.map((adv, index) => {
            const isReversed = index % 2 === 1;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-16 items-center`}
              >
                {/* Image */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full md:w-1/2"
                >
                  <div className="rounded-2xl overflow-hidden shadow-lg bg-muted/30">
                    <img src={adv.image} alt={t(adv.titleKey)} className="w-full h-auto object-cover" />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="w-full md:w-1/2">
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl md:text-3xl font-bold text-primary mb-4"
                  >
                    {t(adv.titleKey)}
                  </motion.h3>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-muted-foreground text-lg leading-relaxed"
                  >
                    {t(adv.descriptionKey)}
                  </motion.p>
                  {adv.link && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 }}
                    >
                      <Link 
                        to={adv.link.url}
                        className="group inline-flex items-center mt-4 text-primary font-medium transition-all duration-300 hover:translate-x-1"
                      >
                        <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                          {t(adv.link.labelKey)}
                        </span>
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Differentiation;