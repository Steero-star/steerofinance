import { ArrowRight, Shield, Users, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useWaitlist } from "@/contexts/WaitlistContext";

const targetDate = new Date("2026-03-20T12:00:00+01:00");

const CTA = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: t('cta.days') },
    { value: timeLeft.hours, label: t('cta.hours') },
    { value: timeLeft.minutes, label: t('cta.minutes') },
    { value: timeLeft.seconds, label: t('cta.seconds') },
  ];

  const features = [
    { icon: Users, text: t('cta.features.free') },
    { icon: Zap, text: t('cta.features.noCard') },
    { icon: Shield, text: t('cta.features.cancel') },
  ];

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
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
            onClick={openWaitlist}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group mb-12"
          >
            {t('common.joinWaitlist')}
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>

          {/* Countdown intégré */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
          >
            <p className="text-primary-foreground/80 mb-4 text-sm">
              {t('cta.launchDate')}
            </p>
            <div className="flex justify-center gap-3 md:gap-6">
              {timeUnits.map((unit, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-background flex items-center justify-center shadow-lg">
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-primary-foreground/70">{unit.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

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
