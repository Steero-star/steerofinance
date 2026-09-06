import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";
import { startTrial } from "@/lib/analytics";
import steeroBanner from "@/assets/steero-banner-3.png";
import steeroBannerWebP from "@/assets/steero-banner-3.webp";

type Source = { label: string; sub: string; href: string };
type Quote = { text: string; name: string; role: string };

/**
 * Échelle de preuve (doc Pipe 27/09) : mécanisme sourcé, témoignages validés
 * mot pour mot avec accord écrit, projection concrète. La preuve est une bande
 * pleine largeur teintée, dimensionnée pour tenir dans un écran, puis le CTA
 * ferme la page.
 *
 * La projection a quitté ce fichier le 06/09 pour `Projection.tsx`, qui la
 * remonte juste après le hero. Ses clés ont suivi le même jour : elles vivent
 * désormais sous `projection.*`, plus sous `preuve.week*`.
 *
 * Le quatrième barreau de l'échelle — la ligne d'honnêteté « Steero est jeune,
 * et on te le dit. » — a quitté l'accueil le 30/08 au profit du CTA de Pourquoi
 * Steero. Ses clés `preuve.honest*` restent en locale, prêtes à revenir : c'est
 * la seule surface qui disait le stade du produit et l'absence d'engagement.
 */
const Preuve = () => {
  const { t } = useTranslation();
  const sources = t("preuve.sources", { returnObjects: true }) as Source[];
  const quotes = t("preuve.quotes", { returnObjects: true }) as Quote[];

  return (
    <>
      {/* Bande preuve : mécanisme + sources + témoignages, un écran max */}
      <section className="py-12 bg-primary/5 border-y border-border/40" id="preuve">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[7fr_5fr] items-start">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold tracking-widest text-muted-foreground mb-3 uppercase"
              >
                {t("preuve.label")}
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-2xl md:text-3xl font-normal leading-[1.2] tracking-tight text-foreground mb-4"
              >
                {t("preuve.mechTitle")}
                <br />
                <em className="italic text-primary">{t("preuve.mechTitleEm")}</em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground text-[15px] leading-relaxed max-w-2xl"
              >
                {t("preuve.mechBody")}
              </motion.p>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border border-border/60 bg-card p-5"
            >
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-3">
                {t("preuve.sourcesTitle")}
              </p>
              <ul className="space-y-3">
                {sources.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {s.label} ↗
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {quotes.map((q, i) => (
              <motion.figure
                key={q.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                className="flex flex-col rounded-2xl border border-border/60 bg-card p-5"
              >
                <blockquote className="text-sm text-foreground leading-relaxed flex-1">
                  <span className="font-serif text-2xl leading-none text-primary mr-1" aria-hidden="true">
                    “
                  </span>
                  {q.text}
                </blockquote>
                <figcaption className="mt-4">
                  <p className="text-sm font-semibold text-foreground">{q.name}</p>
                  <p className="text-xs text-muted-foreground">{q.role}</p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final : le bloc « Installe un système. » de Pourquoi Steero, repris
          ici mot pour mot ET clé pour clé. Le partage de `pourquoiSteero.cta.*`
          est VOULU — les deux surfaces doivent dire la même chose, donc éditer
          l'une doit se voir sur l'autre. Les séparer un jour se fera en
          dupliquant les clés, jamais en réécrivant celles-ci pour une seule des
          deux pages.

          Une seule différence assumée avec la page d'origine : le bouton passe
          par `startTrial`, qui mesure avant d'ouvrir. Le `window.open` brut de
          Pourquoi Steero rendrait muet le dernier CTA de l'accueil. */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <picture>
            <source srcSet={steeroBannerWebP} type="image/webp" />
            <img src={steeroBanner} alt="" loading="lazy" className="w-full h-full object-cover opacity-35" />
          </picture>
          <div className="absolute inset-0 bg-primary/50" />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-primary-foreground mb-4">
              {t("pourquoiSteero.cta.title")}<br />
              <span className="italic opacity-80">{t("pourquoiSteero.cta.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              {t("pourquoiSteero.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => startTrial("preuve")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t("pourquoiSteero.cta.primary")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                {/* Le second CTA de la home mène au FILM, pas au haut de la
                    page : depuis qu'une démo existe, promettre « voir une
                    démo » et déposer le visiteur sur un titre serait une
                    promesse en l'air. Clé propre, dans `common` — la page
                    Pourquoi Steero garde son « Découvrir les fonctionnalités ».
                    Voir aussi `ScrollToTop`, qui ignorait les ancres. */}
                <Link
                  to="/fonctionnalites#demo"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  <PlayCircle className="w-5 h-5" />
                  {t("common.watchDemo")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Preuve;
