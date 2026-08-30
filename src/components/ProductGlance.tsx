import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import ZoomableShot from "@/components/ZoomableShot";
import showcaseFlux from "@/assets/showcase-flux.webp";
import showcaseFlux2x from "@/assets/showcase-flux@2x.webp";
import showcaseAccueil from "@/assets/showcase-accueil.webp";
import showcaseAccueil2x from "@/assets/showcase-accueil@2x.webp";

// Deux tailles par capture : la vignette prend la petite, la visionneuse la
// grande. C'est ce qui fait qu'agrandir agrandit vraiment.
const ITEMS = [
  { key: "flux", image: showcaseFlux, image2x: showcaseFlux2x },
  { key: "accueil", image: showcaseAccueil, image2x: showcaseAccueil2x },
] as const;

const ProductGlance = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY1 = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], [80, -100]);
  const imageParallax = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} className="relative py-24 bg-background overflow-hidden">
      {/* Décor parallax */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ y: blobY1 }}
          className="absolute -left-24 top-16 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          style={{ y: blobY2 }}
          className="absolute -right-24 bottom-16 w-[26rem] h-[26rem] rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="max-w-3xl mb-14">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            {t("showcase.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground"
          >
            {t("showcase.title")}
          </motion.h2>
        </div>

        <div className="space-y-16 lg:space-y-28">
          {ITEMS.map((item, i) => {
            const imageLeft = i % 2 === 1;
            const title = t(`showcase.${item.key}.title`);

            return (
              <div
                key={item.key}
                className={`grid gap-8 lg:gap-12 lg:items-center ${
                  imageLeft ? "lg:grid-cols-[75fr_25fr]" : "lg:grid-cols-[25fr_75fr]"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className={imageLeft ? "lg:order-2" : "lg:order-1"}
                >
                  <h3 className="font-serif text-2xl md:text-3xl font-normal text-foreground mb-4">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    {t(`showcase.${item.key}.desc`)}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  style={{ y: imageParallax }}
                  className={imageLeft ? "lg:order-1" : "lg:order-2"}
                >
                  <ZoomableShot src={item.image} src2x={item.image2x} alt={title} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductGlance;
