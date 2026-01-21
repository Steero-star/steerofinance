import { Sparkles, Timer, Eye, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-dashboard.webp";

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const decorScale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const decorScale2 = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const valueProps = [
    {
      icon: Timer,
      title: t('hero.features.time'),
      desc: t('hero.features.timeDesc')
    },
    {
      icon: Eye,
      title: t('hero.features.clarity'),
      desc: t('hero.features.clarityDesc')
    },
    {
      icon: ShieldCheck,
      title: t('hero.features.security'),
      desc: t('hero.features.securityDesc')
    }
  ];

  return <section ref={sectionRef} className="relative min-h-screen bg-hero-gradient pt-24 pb-16 overflow-hidden">
      {/* Decorative elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 1.2,
        ease: "easeOut"
      }} style={{
        y: decorY1,
        scale: decorScale1
      }} className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <motion.div initial={{
        opacity: 0,
        scale: 0.8
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        duration: 1.2,
        delay: 0.3,
        ease: "easeOut"
      }} style={{
        y: decorY2,
        scale: decorScale2
      }} className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        {/* Additional subtle floating element */}
        <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 0.5
      }} transition={{
        duration: 1.5,
        delay: 0.5
      }} style={{
        y: useTransform(scrollYProgress, [0, 1], [0, 80])
      }} className="absolute left-1/3 top-1/3 w-64 h-64 rounded-full bg-primary/3 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }} className="badge-sparkle">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            <motion.h1 initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.1
          }} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              {t('hero.title')} <span className="text-primary">{t('hero.titleHighlight')}</span>
            </motion.h1>

            <motion.p initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7,
            delay: 0.2
          }} className="text-lg text-muted-foreground max-w-xl">{t('hero.description')}</motion.p>

            {/* Value props - Modern triptych */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {valueProps.map((item, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 30
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.5,
                delay: 0.4 + index * 0.1
              }} className="group relative p-5 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-primary font-semibold text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>)}
            </div>
          </div>

          {/* Right image with parallax */}
          <motion.div initial={{
          opacity: 0,
          x: 50,
          rotate: 6
        }} animate={{
          opacity: 1,
          x: 0,
          rotate: 3
        }} transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeOut"
        }} style={{
          y: imageY
        }} className="relative lg:pl-8">
            <div className="relative transform hover:rotate-0 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-6 scale-105" />
              <img src={heroImage} alt="Finances calmes et claires" className="relative rounded-3xl shadow-image w-full object-cover aspect-[4/3]" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;
