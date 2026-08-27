import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import { TempoLetter } from "@/components/TempoLetter";
import featureBudgetiser from "@/assets/feature-budgetiser.webp";
import featureSaisir from "@/assets/feature-saisir.webp";
import featureRitualiser from "@/assets/feature-ritualiser.webp";

const RITUAL_KEYS = ["t", "e", "m", "p", "o"] as const;

const RESULTS = [
  {
    key: "budget",
    image: featureBudgetiser,
    rituals: ["m", "p"],
    link: null as string | null,
  },
  {
    key: "capture",
    image: featureSaisir,
    rituals: ["t"],
    link: "/pourquoi-steero#fondements-comportementaux",
  },
  {
    key: "ritualize",
    image: featureRitualiser,
    rituals: ["e", "o"],
    link: "/pourquoi-steero#fondements-comportementaux",
  },
] as const;

const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
};

/** Panneau résultat : capture + titre + paires ✓/✗ */
const ResultPanel = ({
  result,
  reduceMotion,
}: {
  result: (typeof RESULTS)[number];
  reduceMotion: boolean;
}) => {
  const { t } = useTranslation();
  const pairs = ["ba1", "ba2", "ba3"] as const;

  return (
    <div className="relative bg-card border border-border/60 rounded-3xl overflow-hidden shadow-xl">
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <motion.img
          src={result.image}
          alt={t(`differentiation.${result.key}.title`)}
          loading="lazy"
          decoding="async"
          initial={reduceMotion ? undefined : { scale: 1.04 }}
          whileInView={reduceMotion ? undefined : { scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full h-full object-cover"
        />
        {/* Dégradé de contraste sous le panneau texte (desktop) */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-[45%] bg-gradient-to-l from-card/60 via-card/15 to-transparent" />
      </div>

      <div className="relative p-5 md:p-6 flex flex-col justify-center lg:absolute lg:inset-y-0 lg:right-0 lg:w-[30%] lg:p-6 lg:bg-card/60 lg:backdrop-blur-md">
        <div className="flex items-center gap-2 mb-3">
          {result.rituals.map((r) => (
            <span key={r} className="inline-flex items-center gap-1.5 rounded-full bg-muted pl-1 pr-2.5 py-1">
              <TempoLetter letter={t(`tempo.rituals.${r}.letter`)} size="sm" className="w-5 h-5 text-[10px] rounded" />
              <span className="text-xs font-medium text-muted-foreground">
                {t(`tempo.rituals.${r}.name`)}
              </span>
            </span>
          ))}
        </div>

        <h3 className="font-serif text-xl font-normal text-foreground mb-4">
          {t(`differentiation.${result.key}.title`)}
        </h3>

        <div className="space-y-2.5">
          {pairs.map((ba) => (
            <div key={ba} className="flex items-start gap-2">
              <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-medium">✓</span>
              <p className="text-foreground text-[13px] leading-snug font-medium">
                {t(`differentiation.${result.key}.${ba}.after`)}
              </p>
            </div>
          ))}
        </div>

        {result.link && (
          <Link
            to={result.link}
            className="group inline-flex items-center mt-5 text-primary font-medium transition-all duration-300 hover:translate-x-1"
          >
            <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
              {t(`differentiation.${result.key}.link`)}
            </span>
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        )}
      </div>
    </div>
  );
};

/** Rail TEMPO : un rituel, actif ou non */
const RitualRailItem = ({
  ritualKey,
  active,
  onSelect,
}: {
  ritualKey: (typeof RITUAL_KEYS)[number];
  active: boolean;
  onSelect: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border p-3 transition-all duration-300 cursor-pointer hover:opacity-100 ${
        active ? "border-primary/30 bg-card shadow-md" : "border-border/50 bg-transparent opacity-55"
      }`}
    >
      <div className="flex items-center gap-3">
        <TempoLetter letter={t(`tempo.rituals.${ritualKey}.letter`)} size="lg" />
        <div className="min-w-0">
          <p className="font-semibold text-foreground text-sm">
            {t(`tempo.rituals.${ritualKey}.name`)}
          </p>
          <p className="text-xs text-muted-foreground">
            {t(`tempo.rituals.${ritualKey}.freq`)} · {t(`tempo.rituals.${ritualKey}.time`)}
          </p>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {active && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-xs text-muted-foreground leading-relaxed overflow-hidden pt-2"
          >
            {t(`tempo.rituals.${ritualKey}.desc`)}
          </motion.p>
        )}
      </AnimatePresence>
    </button>
  );
};

/** Premier panneau resultat illustrant un rituel donne. */
const panelIndexFor = (ritualKey: string) =>
  RESULTS.findIndex((r) => (r.rituals as readonly string[]).includes(ritualKey));

const MethodResults = () => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion() ?? false;
  const [activeIndex, setActiveIndex] = useState(0);

  // Carrousel mobile (swipe conservé)
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center" });
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);
  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const activeRituals: readonly string[] = RESULTS[activeIndex]?.rituals ?? [];

  return (
    <section id="methode" className="py-16 bg-background">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header de section, aligné à droite pour casser le rythme */}
        <div className="max-w-3xl ml-auto text-right mb-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4"
          >
            {t("tempo.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-normal leading-tight text-foreground mb-4"
          >
            {t("tempo.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground whitespace-pre-line"
          >
            {t("tempo.description")}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground mt-4"
          >
            {t("differentiation.description")}
          </motion.p>
        </div>

        {isDesktop ? (
          /* Desktop : rail TEMPO sticky (1/4) + panneaux résultats (3/4) */
          <div className="grid grid-cols-4 gap-10 items-start">
            <div className="col-span-1 sticky top-36 space-y-2">
              {RITUAL_KEYS.map((k) => (
                <RitualRailItem
                  key={k}
                  ritualKey={k}
                  active={activeRituals.includes(k)}
                  onSelect={() => {
                    const idx = panelIndexFor(k);
                    if (idx >= 0) {
                      document
                        .getElementById(`methode-panel-${idx}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                />
              ))}
            </div>

            <div className="col-span-3 space-y-12">
              {RESULTS.map((result, i) => (
                <motion.div
                  key={result.key}
                  id={`methode-panel-${i}`}
                  onViewportEnter={() => setActiveIndex(i)}
                  viewport={{ margin: "-40% 0px -40% 0px" }}
                >
                  <ResultPanel result={result} reduceMotion={reduceMotion} />
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Mobile : pastilles TEMPO + carrousel swipeable */
          <div>
            <div className="flex flex-wrap gap-2 mb-8">
              {RITUAL_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => {
                    const idx = panelIndexFor(k);
                    if (idx >= 0) emblaApi?.scrollTo(idx);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border pl-1 pr-2.5 py-1 transition-all duration-300 ${
                    activeRituals.includes(k)
                      ? "border-primary/30 bg-card shadow-sm"
                      : "border-border/50 opacity-50"
                  }`}
                >
                  <TempoLetter letter={t(`tempo.rituals.${k}.letter`)} size="sm" className="w-5 h-5 text-[10px] rounded" />
                  <span className="text-xs font-medium text-foreground">
                    {t(`tempo.rituals.${k}.name`)}
                  </span>
                </button>
              ))}
            </div>

            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {RESULTS.map((result) => (
                  <div key={result.key} className="flex-[0_0_100%] min-w-0 pr-4">
                    <ResultPanel result={result} reduceMotion={reduceMotion} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              {RESULTS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MethodResults;
