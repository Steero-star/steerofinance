import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import featureBudgetiser from "@/assets/feature-budgetiser.webp";
import featureSaisir from "@/assets/feature-saisir.webp";
import featureRitualiser from "@/assets/feature-ritualiser.webp";

const Differentiation = () => {
  const { t } = useTranslation();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useState(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  });

  // Re-register listener when emblaApi changes
  const callbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!emblaApi) return;
      emblaApi.on("select", onSelect);
      onSelect();
    },
    [emblaApi, onSelect]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const advantages = [
    {
      titleKey: "differentiation.budget.title",
      image: featureBudgetiser,
      beforeAfterKeys: [
        { before: "differentiation.budget.ba1.before", after: "differentiation.budget.ba1.after" },
        { before: "differentiation.budget.ba2.before", after: "differentiation.budget.ba2.after" },
        { before: "differentiation.budget.ba3.before", after: "differentiation.budget.ba3.after" },
        { before: "differentiation.budget.ba4.before", after: "differentiation.budget.ba4.after" },
      ],
      link: null,
    },
    {
      titleKey: "differentiation.capture.title",
      image: featureSaisir,
      beforeAfterKeys: [
        { before: "differentiation.capture.ba1.before", after: "differentiation.capture.ba1.after" },
        { before: "differentiation.capture.ba2.before", after: "differentiation.capture.ba2.after" },
        { before: "differentiation.capture.ba3.before", after: "differentiation.capture.ba3.after" },
        { before: "differentiation.capture.ba4.before", after: "differentiation.capture.ba4.after" },
      ],
      link: {
        labelKey: "differentiation.capture.link",
        url: "/pourquoi-steero#fondements-comportementaux",
      },
    },
    {
      titleKey: "differentiation.ritualize.title",
      image: featureRitualiser,
      beforeAfterKeys: [
        { before: "differentiation.ritualize.ba1.before", after: "differentiation.ritualize.ba1.after" },
        { before: "differentiation.ritualize.ba2.before", after: "differentiation.ritualize.ba2.after" },
        { before: "differentiation.ritualize.ba3.before", after: "differentiation.ritualize.ba3.after" },
        { before: "differentiation.ritualize.ba4.before", after: "differentiation.ritualize.ba4.after" },
      ],
      link: {
        labelKey: "differentiation.ritualize.link",
        url: "/pourquoi-steero#fondements-comportementaux",
      },
    },
  ];

  return (
    <section className="py-20 bg-hero-gradient bg-secondary-foreground relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t("differentiation.title")}
          </h2>
          <p className="text-muted-foreground text-lg">
            Modèles, favoris et raccourcis éliminent la friction. Tu te concentres sur ce qui compte : <span className="font-bold text-primary">comprendre tes décisions</span>.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 md:-left-14 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 md:-right-14 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Embla viewport */}
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex" ref={callbackRef}>
              {advantages.map((adv, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] min-w-0 px-4"
                >
                  <div className="bg-card/60 backdrop-blur-sm border border-border/40 rounded-3xl overflow-hidden shadow-xl">
                    {/* Image */}
                    <div className="w-full aspect-[16/9] overflow-hidden">
                      <img
                        src={adv.image}
                        alt={t(adv.titleKey)}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">
                        {t(adv.titleKey)}
                      </h3>
                      <div className="space-y-4">
                        {adv.beforeAfterKeys.map((ba, i) => (
                          <div key={i} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                            <div className="flex items-start gap-2 flex-1">
                              <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center text-xs text-muted-foreground font-medium">✗</span>
                              <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-through decoration-muted-foreground/40">{t(ba.before)}</p>
                            </div>
                            <div className="flex items-start gap-2 flex-1">
                              <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">✓</span>
                              <p className="text-foreground text-sm md:text-base leading-relaxed font-medium">{t(ba.after)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {adv.link && (
                        <Link
                          to={adv.link.url}
                          className="group inline-flex items-center mt-6 text-primary font-medium transition-all duration-300 hover:translate-x-1"
                        >
                          <span className="relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-left after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                            {t(adv.link.labelKey)}
                          </span>
                          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {advantages.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "bg-primary scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
