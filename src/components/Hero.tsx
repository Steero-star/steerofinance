import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ZoomableShot from "@/components/ZoomableShot";
import heroImageWebP from "@/assets/hero-budget.webp";
import heroImagePng from "@/assets/hero-budget.png";
import heroImageMobileWebP from "@/assets/hero-budget-mobile.webp";
import { startTrial } from "@/lib/analytics";

/*
 * LE PREMIER ÉCRAN PARLE À QUI A TAPÉ « GÉRER SON BUDGET » (07/09/2026).
 *
 * La semaine de calibrage Ads a livré 93 % des clics sur cette requête, avec
 * une annonce qui promet « Vois ton mois d'un coup d'œil » et « Décide où va
 * ton argent ». Le hero du 06/09 tenait « budget » et le prix, mais il avait
 * grossi jusqu'à douze lignes avant le bouton : un paragraphe de 26 mots et
 * trois puces de deux lignes, qui redisaient la section Projection juste
 * dessous. La force du site était le peu de texte. On y revient.
 *
 * CE QUI RESTE : badge, titre, UNE ligne reprise de l'annonce, bouton, prix.
 * Cinq lignes. Aucune durée quotidienne : Ronald a banni « 5 minutes par
 * jour » de toute promesse, ça effraie sur l'effort.
 *
 * LES TROIS BÉNÉFICES ne disparaissent pas : ils ferment le hero dans une
 * bande fine bleu Steero, une ligne chacun, en langage simple. Ils ouvrent
 * sur Projection, qui les détaille avec des chiffres.
 *
 * L'IMAGE. Le fichier de 4096 px n'était pas en cause : le cadre d'ordinateur
 * mangeait un tiers de sa colonne et un écran de 1440 px s'affichait en 900,
 * soit 7 px de texte. Le visiteur voyait une densité, pas une valeur. La
 * capture est recadrée à échelle réelle sur Reste à vivre et quatre
 * enveloppes DANS LES CLOUS, à des niveaux différents. Pas de dépassement en
 * premier écran, décision de Ronald : le rouge fait projeter un échec, et
 * l'écart se raconte à Jour 7 dans Projection. Le 2 × 3 a été écarté : il
 * demande la pleine largeur du cockpit et retombe à 7 px. Sous 768 px, une
 * découpe portrait de deux enveloppes remplace la découpe large, sinon la
 * même image à 335 px retombe à 6 px de texte pour 43 % du trafic payant.
 *
 * LA HAUTEUR. Plus de `min-h-screen` : le hero prend la hauteur de son
 * contenu, la bande et le haut de Projection passent sous le pli, et c'est
 * la page elle-même qui invite à défiler. Le chevron animé n'a plus de
 * raison d'être. `pt-28` reste : l'en-tête est `fixed` et mesure 97 px sous
 * 768, `pt-20` le faisait passer sur le badge.
 */
const Hero = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const decorY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const decorY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const decorY3 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const decorScale1 = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const decorScale2 = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const benefits = t("hero.band", { returnObjects: true }) as string[];

  return (
    <section ref={sectionRef} className="relative bg-hero-gradient pt-28 overflow-hidden">
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
          style={{ y: decorY3 }}
          className="absolute left-1/3 top-1/3 w-64 h-64 rounded-full bg-primary/3 blur-3xl"
        />
      </div>

      {/*
        `pt-8 lg:pt-16` sous le `pt-28` de la section : sans ce coussin, le
        hero mesure 545 px pour 860 de viewport et Projection occupe un tiers
        du premier écran. On veut qu'elle dépasse sous le pli, pas qu'elle
        le partage.
      */}
      <div className="container mx-auto px-6 pt-8 pb-14 lg:pt-16 lg:pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
              className="text-base md:text-lg text-muted-foreground max-w-md"
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
              srcMobile={heroImageMobileWebP}
              fallback={heroImagePng}
              alt={t("hero.imageAlt")}
              className="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-image"
              loading="eager"
            />
          </motion.div>
        </div>
      </div>

      {/*
        La bande des trois bénéfices. Sous 640 px les trois lignes s'empilent,
        séparées par un filet ; au-dessus elles tiennent sur une ligne de 46 px.
        `relative z-10` : sans lui, les halos décoratifs en `absolute inset-0`
        passeraient par-dessus et délaveraient le bleu.
      */}
      <ul className="relative z-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center bg-primary text-primary-foreground text-sm font-medium divide-y divide-primary-foreground/25 sm:divide-y-0 sm:divide-x">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-center gap-2.5 px-6 py-2.5 sm:py-3">
            <Check className="h-4 w-4 shrink-0" strokeWidth={2.5} aria-hidden="true" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Hero;
