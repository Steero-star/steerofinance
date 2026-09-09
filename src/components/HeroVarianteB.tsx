import { ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import ZoomableShot from "@/components/ZoomableShot";
import heroImageWebP from "@/assets/hero-dashboard.webp";
import heroImagePng from "@/assets/hero-dashboard.png";
import { startTrial } from "@/lib/analytics";

/*
 * BRAS B DU TEST A/B : le premier écran du 06/09 (« v3.5 »), tel qu'il a
 * tourné du 06/09 au soir au 08/09 au matin. Voir `lib/variante.ts` pour le
 * test lui-même et `Hero.tsx` pour le bras A.
 *
 * C'est une COPIE FIGÉE, à dessein. Elle reprend le commit `d4992e5` sans
 * partager de code avec le hero courant : un test compare deux objets qui ne
 * bougent pas, et une refonte du hero A ne doit pas pouvoir déformer le B en
 * passant. Ses textes propres vivent sous `heroB.*` ; le badge, le titre et
 * la microcopie sont ceux du hero A, parce qu'ils étaient identiques dans
 * les deux versions et que les changer changerait deux choses à la fois.
 *
 * Ce qu'il a de plus que le bras A : trois puces produit entre la promesse
 * et le bouton (« Crée ton propre budget… »), un paragraphe plus long, la
 * capture avec cadre d'ordinateur, `min-h-screen` et le chevron de
 * défilement. Ce qu'il n'a pas : la bande bleue des trois bénéfices.
 *
 * À SUPPRIMER avec `heroB.*` et la route `/bienvenue/:variante` quand le
 * test aura tranché.
 */
const HeroVarianteB = () => {
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

  const proofs = t("heroB.proofs", { returnObjects: true }) as string[];

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-hero-gradient pt-28 pb-2 overflow-hidden">
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

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[35fr_65fr] gap-10 items-center min-h-[calc(100vh-8rem)]">
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="badge-sparkle"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground lg:text-5xl"
            >
              {t("hero.title")}<br />
              <span className="italic text-primary">{t("hero.titleHighlight")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base text-muted-foreground max-w-md"
            >
              {t("heroB.description")}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="max-w-md space-y-2"
            >
              {proofs.map((proof) => (
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
                {t("common.startFree")}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <span className="text-xs text-muted-foreground">{t("hero.microcopy")}</span>
            </motion.div>
          </div>

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

      <button
        type="button"
        aria-label={t("heroB.scrollHint")}
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
export default HeroVarianteB;
