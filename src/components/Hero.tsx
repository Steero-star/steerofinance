import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ZoomableShot from "@/components/ZoomableShot";
import heroImageWebP from "@/assets/hero-dashboard.webp";
import heroImagePng from "@/assets/hero-dashboard.png";
import { startTrial } from "@/lib/analytics";


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


  /*
   * `pt-28` et non `pt-20` : l'en-tête est `fixed` et mesure 97 px sous 768,
   * contre 80 px de marge haute. Le badge passait dessous de 17 px. Le défaut
   * préexistait au 06/09, mais il ne se voyait qu'en 375, là où le contenu
   * dépasse `min-h-[calc(100vh-8rem)]` et cesse d'être centré ; les trois
   * lignes de différenciants l'ont étendu à plus de largeurs. Vérifié à 375,
   * 768 et 1280. Mesuré après coup : le hero fait exactement 860 px pour un
   * viewport de 860 en 1280, et 868 pour 812 en 375, où le contenu dépasse.
   * Ce débordement de 56 px est celui du hero, pas de la page : le bouton et
   * le prix restent dans le premier écran (bas de microcopie à 624 sur 812).
   */
  return (
    <section ref={sectionRef} className="relative min-h-screen bg-hero-gradient pt-28 pb-2 overflow-hidden">
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

            {/*
              Trois différenciants produit, entre la promesse et le bouton.

              POURQUOI ICI. La semaine de calibrage Ads a montré que 93 % des
              clics viennent de « gérer son budget ». Quelqu'un qui tape ça sait
              déjà qu'il a un problème : il cherche un outil, et il cherche deux
              choses en particulier, la personnalisation et la visualisation.
              C'est le premier endroit de la page où on lui montre ce que
              l'outil FAIT plutôt que pourquoi il devrait s'en soucier.

              POURQUOI TROIS ET PAS QUATRE. La colonne de gauche fait 35 % de la
              grille : au-delà de trois lignes courtes, le bouton sort du premier
              écran en 1280 et l'accroche se paie en clic perdu.
            */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="max-w-md space-y-2"
            >
              {(t("hero.proofs", { returnObjects: true }) as string[]).map((proof) => (
                <li key={proof} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{proof}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-start gap-3"
            >
              <button
                onClick={() => startTrial("hero")}
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
            <ZoomableShot
              src={heroImageWebP}
              fallback={heroImagePng}
              alt={t("hero.title")}
              loading="eager"
            />
          </motion.div>
        </div>

      </div>

      {/* Invitation au scroll : trois bandes qui s'éclairent l'une après l'autre */}
      <button
        type="button"
        aria-label={t("hero.scrollHint")}
        onClick={() =>
          document.getElementById("pourquoi")?.scrollIntoView({ behavior: "smooth" })
        }
        className="scroll-hint absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-12 h-12 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <ChevronDown className="w-5 h-5 -mb-3" />
        <ChevronDown className="w-5 h-5 -mb-3" />
        <ChevronDown className="w-5 h-5" />
      </button>
    </section>
  );
};
export default Hero;
