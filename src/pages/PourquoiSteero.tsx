import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useState } from "react";
import { CalendarDays, Info, Sparkles, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TempoLetter } from "@/components/TempoLetter";
import IndiceDepli from "@/components/IndiceDepli";
import steeroBanner from "@/assets/steero-banner-3.png";
import steeroBannerWebP from "@/assets/steero-banner-3.webp";
import illustrationPng from "@/assets/illustration-bureau.png";
import illustrationWebP from "@/assets/illustration-bureau.webp";
import illustrationWebP2x from "@/assets/illustration-bureau@2x.webp";
import { useTranslation } from "react-i18next";

type Principle = { num: string; title: string; desc: string; ref: string; refHref: string };
type TempoRow = { letter: string; name: string; desc: string; freq: string; time: string };

const PourquoiSteero = () => {
  const { t } = useTranslation();
  /** Principe déplié, sur le modèle des constats de l'accueil : un seul à la fois. */
  const [principeOuvert, setPrincipeOuvert] = useState<number | null>(null);

  const retroItems = t("pourquoiSteero.realProblem.retroItems", { returnObjects: true }) as string[];
  const pareItems = t("pourquoiSteero.realProblem.pareItems", { returnObjects: true }) as string[];
  const principles = t("pourquoiSteero.behavioral.principles", { returnObjects: true }) as Principle[];
  const tempo = t("pourquoiSteero.tempo.rows", { returnObjects: true }) as TempoRow[];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={t("pourquoiSteero.seo.title")}
        description={t("pourquoiSteero.seo.description")}
        keywords={t("pourquoiSteero.seo.keywords")}
        canonical="/pourquoi-steero"
      />
      <Header />

      {/* HERO */}
      <section className="relative bg-hero-gradient pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -left-20 top-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Deux colonnes, l'illustration à GAUCHE : la home place sa capture à
              droite, ce miroir donne à chaque page sa silhouette propre.

              L'ordre est inversé sous `lg` — le titre passe devant l'image. Une
              page de positionnement doit ouvrir sur sa thèse ; sur mobile, une
              image en tête repousserait « Tu as besoin d'un pare-brise » sous la
              ligne de flottaison. */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="order-2 lg:order-1"
            >
              {/* Toujours pas de `ZoomableShot`, mais la raison a changé le
                  30/08 : le moniteur n'est plus blanc, il porte « Mon
                  avancement » (montage produit par `shots.mjs`). Il reste
                  minuscule dans la source — 350 px de large sur 1536 — donc
                  agrandir ne rendrait pas l'interface lisible, ça ne ferait que
                  la flouter. Le curseur « zoom » promettrait une lecture qu'on
                  ne peut pas tenir. `width`/`height` réservent le rapport 3/2
                  avant chargement, pour que le titre ne saute pas.

                  `fetchpriority` est en MINUSCULES et passé par un spread :
                  React 18 ne connaît pas `fetchPriority` en camelCase, il le
                  refuse et écrit un avertissement dans la console de chaque
                  visiteur de cette page (relevé le 30/08). En minuscules il le
                  laisse passer au DOM, ce qui est le comportement voulu ; le
                  spread évite l'erreur de typage, les types React 18 ne
                  connaissant pas davantage l'attribut. À simplifier au passage
                  à React 19. */}
              <picture>
                <source srcSet={`${illustrationWebP} 1x, ${illustrationWebP2x} 2x`} type="image/webp" />
                <img
                  src={illustrationPng}
                  alt={t("pourquoiSteero.hero.imageAlt")}
                  width={1536}
                  height={1024}
                  {...{ fetchpriority: "high" }}
                  decoding="async"
                  className="w-full h-auto rounded-3xl border border-border/40 shadow-card"
                />
              </picture>
            </motion.div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center lg:justify-start mb-8"
              >
                <span className="badge-sparkle">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>{t("pourquoiSteero.hero.badge")}</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
              >
                {t("pourquoiSteero.hero.title")}<br />
                <span className="italic text-primary">{t("pourquoiSteero.hero.titleHighlight")}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0"
              >
                {t("pourquoiSteero.hero.description")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-block"
              >
                <Button
                  size="lg"
                  onClick={() => window.open("https://app.steero.fr/", "_blank")}
                  className="rounded-full px-8 group"
                >
                  {t("pourquoiSteero.hero.cta")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              <p className="text-xs text-muted-foreground mt-4">
                {t("pourquoiSteero.hero.subtext")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CE QU'ON FAIT DIFFÉREMMENT */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Un tiers pour l'argument, deux tiers pour la démonstration, sur la
              même bande : le texte annonce et le tableau prouve, côte à côte
              plutôt que l'un sous l'autre. Le conteneur passe donc de `4xl` à
              `6xl`, sans quoi les deux colonnes du tableau seraient étranglées.

              LE TABLEAU S'ALIGNE SUR LE TITRE, PAS SUR LE LABEL. D'où deux
              rangées plutôt qu'une : le label occupe seul la première, la case
              de droite y reste vide, et le tableau démarre donc exactement à la
              hauteur du titre. Un `mt` calculé sur la hauteur du label ferait la
              même chose en apparence, mais se décalerait en silence le jour où
              le label passe sur deux lignes — dans une autre langue, par
              exemple. Ici la grille le tient toute seule.

              Les espacements passent par les marges des blocs, pas par `gap-y` :
              une gouttière verticale s'appliquerait AUSSI entre le label et le
              titre, et les décollerait l'un de l'autre. */}
          <div className="grid lg:grid-cols-3 lg:gap-x-14 items-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
            >
              {t("pourquoiSteero.realProblem.label")}
            </motion.p>
            <div className="hidden lg:block lg:col-span-2" aria-hidden="true" />

            <div className="lg:col-span-1 mb-10 lg:mb-0">
              {/* `text-3xl` sans palier `md:text-4xl` : ailleurs le titre occupe
                  toute la largeur, ici il vit dans un tiers de colonne où le
                  cran au-dessus hacherait la phrase en mots isolés. */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
              >
                {t("pourquoiSteero.realProblem.title")} <span className="italic text-primary">{t("pourquoiSteero.realProblem.titleHighlight")}</span>
              </motion.h2>
              {/* `whitespace-pre-line` : la description est en deux paragraphes,
                  séparés par un `\n\n` dans les locales. Sans cette classe, le
                  saut de ligne serait replié en simple espace. */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground leading-relaxed whitespace-pre-line"
              >
                {t("pourquoiSteero.realProblem.description")}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-border/60 h-fit"
            >
              {/* Rétroviseur */}
              <div className="bg-muted/40 p-6 md:border-r border-border/60">
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-4">
                  {t("pourquoiSteero.realProblem.retroLabel")}
                </p>
                <p className="font-semibold text-foreground mb-5">{t("pourquoiSteero.realProblem.retroCompany")}</p>
                <ul className="space-y-0">
                  {retroItems.map((item, i) => (
                    <li
                      key={i}
                      className={`py-3 text-sm text-foreground flex gap-2 ${i !== 0 ? "border-t border-border/60" : ""}`}
                    >
                      <span className="text-muted-foreground">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Pare-brise */}
              <div className="bg-card p-6 border-t md:border-t-0 border-border/60">
                <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-4">
                  {t("pourquoiSteero.realProblem.pareLabel")}
                </p>
                <p className="font-semibold text-foreground mb-5">{t("pourquoiSteero.realProblem.pareCompany")}</p>
                <ul className="space-y-0">
                  {pareItems.map((item, i) => (
                    <li
                      key={i}
                      className={`py-3 text-sm text-foreground flex gap-2 ${i !== 0 ? "border-t border-border/60" : ""}`}
                    >
                      <span className="text-primary font-semibold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* APPROCHE COMPORTEMENTALE */}
      <section className="py-24 bg-secondary/30" id="fondements-comportementaux">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Même partition que la bande précédente : un tiers d'argument, deux
              tiers de démonstration, et les cartes alignées sur le titre via la
              rangée vide. Deux bandes voisines qui s'aligneraient différemment,
              l'une sur son label et l'autre sur son titre, donneraient un
              décrochage que l'œil lit comme un défaut. */}
          <div className="grid lg:grid-cols-3 lg:gap-x-14 items-start">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1 text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
            >
              {t("pourquoiSteero.behavioral.label")}
            </motion.p>
            <div className="hidden lg:block lg:col-span-2" aria-hidden="true" />

            <div className="lg:col-span-1 mb-10 lg:mb-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
              >
                {t("pourquoiSteero.behavioral.titlePre")} <span className="italic text-primary">{t("pourquoiSteero.behavioral.titleHighlight")}</span> {t("pourquoiSteero.behavioral.titlePost")}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-muted-foreground leading-relaxed"
              >
                {t("pourquoiSteero.behavioral.description")}
              </motion.p>
            </div>

            {/* Les constats de l'accueil, à l'identique : trois cartes de même
                hauteur au repos, gros chiffre en serif au-dessus du titre, et le
                détail qui se déplie DANS la carte au clic.

                `items-start` : sans lui la grille étire les trois cartes à la
                hauteur de la plus grande, et ouvrir l'une gonflerait les deux
                autres de vide.

                `min-h-20` sur le titre : les trois titres ne font pas le même
                nombre de lignes, et sans hauteur réservée les chiffres du haut
                se retrouveraient alignés mais pas les cartes. C'est le même
                procédé que le `min-h-12` de l'accueil, à un cran au-dessus parce
                que la colonne est ici plus étroite.

                LE CLIC EST LA SEULE PORTE. Pas de `onMouseEnter`, pas de
                `onFocus` : ouvrir aussi au focus referme la carte au clic
                suivant, le focus précédant le mousedown. */}
            <div className="lg:col-span-2 grid sm:grid-cols-3 gap-4 items-start">
              {principles.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * i }}
                  className={`rounded-2xl border bg-card transition-all duration-300 ${
                    principeOuvert === i ? "border-primary/30 shadow-card" : "border-border/60 hover:border-primary/30"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={principeOuvert === i}
                    onClick={() => setPrincipeOuvert(principeOuvert === i ? null : i)}
                    className="group w-full text-left p-5 cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="font-serif text-4xl text-primary leading-none mb-3">{p.num}</p>
                    <h3 className="font-semibold text-foreground text-sm leading-snug min-h-20">
                      {p.title}
                    </h3>
                    <IndiceDepli label={t("pourquoiSteero.behavioral.expandLabel")} ouvert={principeOuvert === i} />
                  </button>

                  <AnimatePresence initial={false}>
                    {principeOuvert === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                          {/* Même contrat que les sources de l'accueil : la
                              référence affichée EST le lien, et il s'ouvre dans un
                              onglet neuf pour ne pas éjecter le lecteur de la page. */}
                          <a
                            href={p.refHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-xs text-primary hover:underline"
                          >
                            {p.ref} ↗
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEMPO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-muted-foreground mb-4 uppercase"
          >
            {t("pourquoiSteero.tempo.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl font-normal leading-[1.1] tracking-tight text-foreground mb-6"
          >
            {t("pourquoiSteero.tempo.titlePre")} <span className="italic text-primary">{t("pourquoiSteero.tempo.titleHighlight")}</span>{t("pourquoiSteero.tempo.titlePost")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed mb-12 max-w-3xl"
          >
            {t("pourquoiSteero.tempo.description")}
          </motion.p>

          {/* Cinq cases sur toute la largeur, une par rituel. Le tableau d'avant
              rangeait TEMPO en lignes empilées, ce qui le faisait lire comme une
              liste de tâches ; côte à côte, les cinq temps se lisent comme UNE
              progression, du quotidien au stratégique, de gauche à droite.

              Sous `md` la rangée se casse en deux puis une colonne : cinq cases
              sur un téléphone donneraient 60 px de large chacune.

              La pastille devient un carré planté dans le coin, hors du flux :
              seul son angle haut-gauche est arrondi, pour épouser celui de la
              carte au lieu de dépasser dessus. Le contenu réserve donc sa place
              en haut (`pt-16`), sinon le titre passerait dessous. */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {tempo.map((row, i) => (
              <motion.div
                key={row.letter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className="relative overflow-hidden rounded-2xl border border-border/60 bg-card transition-colors hover:border-primary/30"
              >
                <TempoLetter
                  letter={row.letter}
                  className="absolute top-0 left-0 w-12 h-12 rounded-none rounded-tl-2xl text-lg"
                />
                <div className="pt-16 px-5 pb-5">
                  <p className="font-semibold text-foreground mb-1">{row.name}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed mb-4">{row.desc}</p>
                  <p className="text-xs text-muted-foreground border-t border-border/60 pt-3">
                    {row.freq} · <span className="font-semibold text-foreground">{row.time}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DEUX NOTES SUR UNE LIGNE, ET DEUX HABILLAGES DIFFERENTS.
              Le calendrier est livre, la banque est promise. Les habiller
              pareil ferait lire le calendrier comme « a venir » lui aussi, et
              une fonctionnalite en production passerait pour une annonce : la
              note livree prend donc le fond des cartes de rituels au-dessus,
              la note a venir garde sa teinte d'annonce. Les titres portent la
              meme opposition, « deja la » face a « a venir ».

              `items-start` volontairement absent : les deux notes s'etirent a
              la meme hauteur, deux encadres annonces cote a cote mais de
              hauteurs differentes se liraient comme un reste de mise en page. */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="p-4 rounded-xl bg-card border border-border/60 flex gap-3"
            >
              <CalendarDays className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{t("pourquoiSteero.tempo.calendarNoteTitle")}</span>{" "}
                {t("pourquoiSteero.tempo.calendarNoteDesc")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex gap-3"
            >
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">{t("pourquoiSteero.tempo.bankingNoteTitle")}</span>{" "}
                {t("pourquoiSteero.tempo.bankingNoteDesc")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
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
              {t("pourquoiSteero.cta.title")}<br /><span className="italic opacity-80">{t("pourquoiSteero.cta.titleHighlight")}</span>
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              {t("pourquoiSteero.cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => window.open("https://app.steero.fr/", "_blank")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t("pourquoiSteero.cta.primary")}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/fonctionnalites"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t("pourquoiSteero.cta.secondary")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PourquoiSteero;
