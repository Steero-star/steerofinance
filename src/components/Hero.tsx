import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import heroImageWebP from "@/assets/hero-dashboard.webp";
import heroImagePng from "@/assets/hero-dashboard.png";
import { trackCTAClick } from "@/lib/analytics";

const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const decorScale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const decorScale2 = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-hero-gradient pt-20 pb-2 overflow-hidden">
      {/* Decorative elements with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ y: decorY1, scale: decorScale1 }}
          className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          style={{ y: decorY2, scale: decorScale2 }}
          className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 80]) }}
          className="absolute left-1/3 top-1/3 w-64 h-64 rounded-full bg-primary/3 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[35fr_65fr] gap-10 items-center min-h-[calc(100vh-8rem)]">
          {/* Left content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge-sparkle"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{t('hero.badge')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground lg:text-5xl"
            >
              {t('hero.title')}<br />
              <span className="italic text-primary">{t('hero.titleHighlight')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-muted-foreground max-w-md"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-start gap-3"
            >
              <button
                onClick={() => {
                  trackCTAClick("commencer_maintenant", "hero");
                  window.open("https://accounts.steero.fr/sign-up?redirect_url=https%3A%2F%2Fapp.steero.fr%2F", "_blank");
                }}
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold group"
              >
                {t('common.startFree')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-xs text-muted-foreground">{t('hero.microcopy')}</span>
            </motion.div>
          </div>

          {/* Right image with parallax */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ y: imageY }}
            className="relative"
          >
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={t("showcase.zoomLabel", { name: t("hero.title") })}
                  className="group block w-full cursor-zoom-in rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <picture>
                    <source srcSet={heroImageWebP} type="image/webp" />
                    <img
                      src={heroImagePng}
                      alt="Tableau de bord budgétaire de Steero"
                      fetchPriority="high"
                      loading="eager"
                      decoding="async"
                      className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                  </picture>
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl w-[95vw] border-none bg-transparent p-0 shadow-none">
                <DialogTitle className="sr-only">
                  {t("hero.title")}
                </DialogTitle>
                <picture>
                  <source srcSet={heroImageWebP} type="image/webp" />
                  <img
                    src={heroImagePng}
                    alt="Tableau de bord budgétaire de Steero"
                    className="w-full h-auto block rounded-lg"
                  />
                </picture>
              </DialogContent>
            </Dialog>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
