import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useWaitlist } from "@/contexts/WaitlistContext";
import steeroBanner from "@/assets/steero-banner-3.png";

const CTA = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();

  const features = [
    { icon: Users, text: t('cta.features.free') },
    { icon: Zap, text: t('cta.features.noCard') },
    { icon: Shield, text: t('cta.features.cancel') },
  ];

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background banner image */}
      <div className="absolute inset-0">
        <img src={steeroBanner} alt="" className="w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-primary/50" />
      </div>
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -left-20 top-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground"
          >
            {t('cta.title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg mb-8 max-w-xl mx-auto text-primary-foreground/90"
          >
            {t('cta.description')}
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.open("https://accounts.steero.fr/sign-up?redirect_url=https%3A%2F%2Fapp.steero.fr%2F", "_blank")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group mb-12"
          >
            {t('common.joinWaitlist')}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>




          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-6 text-sm"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <feature.icon className="w-5 h-5 text-primary-foreground/70" />
                <span className="text-primary-foreground">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
