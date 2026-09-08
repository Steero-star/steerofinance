import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TempoLetter } from "@/components/TempoLetter";
import ZoomableShot from "@/components/ZoomableShot";
import jour2WebP from "@/assets/experience-jour2.webp";
import jour2Png from "@/assets/experience-jour2.png";
import jour7WebP from "@/assets/experience-jour7.webp";
import jour7Png from "@/assets/experience-jour7.png";

type Step = { when: string; title: string; body: string; imageAlt?: string };

/**
 * Durée d'un palier avant passage au suivant, en millisecondes.
 *
 * 8 s et non 4,6 (08/09) : avec un écran à côté du texte, un lecteur a besoin
 * de sept à huit secondes par repère. À 4,6 s la carte changeait avant la fin
 * de la deuxième phrase, ce que Ronald a lu comme une section « molle ».
 */
const DUREE_PALIER = 8000;

/**
 * La lettre TEMPO de chaque repère, dans l'ordre des paliers. Jour 1 est la
 * mise en place, pas un rituel : pas de lettre. Les cinq suivantes épellent
 * l'acronyme le long du fil, et c'est ainsi que la méthode se découvre sur
 * l'accueil depuis que la section TEMPO l'a quitté (07/09) : en avançant,
 * pas dans un bloc à apprendre. La clé sert à lire `tempo.rituals.*`.
 */
const LETTRES: ReadonlyArray<{ letter: string; key: string } | null> = [
  null,
  { letter: "T", key: "t" },
  { letter: "E", key: "e" },
  { letter: "M", key: "m" },
  { letter: "P", key: "p" },
  { letter: "O", key: "o" },
];

/**
 * L'écran de l'app pour chaque repère, quand il existe.
 *
 * Jour 2 et Jour 7 sont découpés dans la capture du cockpit du 15/08 (Tracer,
 * Examiner). Jour 1 (Mes budgets, le Plan), Mois 1 et Mois 3 (Mon pilotage,
 * Le mois et Le trimestre) et Année 1 attendent une session photo du jeu de
 * démonstration resemé au 07/09 : l'état de session Playwright a expiré et
 * seul Ronald peut le refaire (`node scripts/shots.mjs --login`). Tant
 * qu'un repère n'a pas d'écran, son texte prend la largeur ; la cellule
 * partagée garde de toute façon la hauteur du plus grand panneau.
 */
const ECRANS: ReadonlyArray<{ src: string; fallback: string } | null> = [
  null,
  { src: jour2WebP, fallback: jour2Png },
  { src: jour7WebP, fallback: jour7Png },
  null,
  null,
  null,
];

/**
 * `prefers-reduced-motion` lu à chaud. Une lecture unique au montage suffirait
 * presque, mais le réglage système change sans rechargement de page, et une
 * rotation automatique qui survit au réglage est exactement ce que la
 * préférence demande de supprimer.
 */
const useMouvementReduit = () => {
  const [reduit, setReduit] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduit(mq.matches);
    const onChange = () => setReduit(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduit;
};

/**
 * L'expérience : ce que tu fais dans Steero, et ce que ça change.
 *
 * POURQUOI ELLE EST JUSTE APRÈS LE HERO (06/09). La semaine de calibrage
 * Google Ads a montré que 93 % des clics viennent de « gérer son budget » :
 * quelqu'un qui tape ça sait déjà qu'il a un problème et cherche un outil,
 * pas une démonstration du problème. On montre donc d'abord ce que ça donne
 * chez lui, et le rapport d'étonnement vient après.
 *
 * POURQUOI LE TITRE NE NOMME PAS D'HORIZON. « À quoi ressemble ta première
 * année » se lisait comme « des résultats dans un an », un frein posé juste
 * avant le fil censé le lever. Ne pas remettre de durée dans le titre.
 *
 * CE QUI A CHANGÉ LE 08/09, après la revue de Ronald (« la section fait
 * mou ») :
 *
 *   - Chaque repère montre l'écran de l'app qui lui correspond, texte à
 *     gauche sur 5/12, capture à droite sur 7/12, découpée à échelle réelle
 *     comme le hero. Voir `ECRANS` pour ce qui manque encore.
 *   - Jour 1 parle du budget, quatre natures posées d'avance, épargne et
 *     investissement compris : c'est le différenciant, dit sans durée
 *     (« 10 minutes, une fois » a sauté, Ronald a banni toute durée en
 *     promesse). Mois 3 ne parle plus de « ce qui ne part pas en dépense »,
 *     modèle du reliquat que la bande bleue du hero contredit, mais de la
 *     ligne épargne tenue comme les autres.
 *   - Les repères portent la lettre TEMPO (voir `LETTRES`) et la carte se
 *     referme sur « c'est la méthode TEMPO », avec le lien vers Pourquoi
 *     Steero. La section TEMPO de l'accueil a été retirée le 07/09 : elle
 *     redisait les cinq horizons juste derrière. La méthode est nommée ici,
 *     une fois, quand elle a un sens, et le rapport d'étonnement arrive
 *     après une méthode nommée, pas après un fil anonyme.
 *   - La rotation passe à 8 s et S'ARRÊTE DÉFINITIVEMENT au premier clic sur
 *     un repère : quelqu'un qui choisit un palier veut le lire, pas le voir
 *     partir. Le survol et le focus ne font que la suspendre, comme avant.
 *
 * LES SIX PANNEAUX RESTENT DANS LE DOM, empilés dans la même cellule de
 * grille (`col-start-1 row-start-1`), pas montés à la demande. Le prérendu
 * capture le DOM : un panneau monté à la demande ferait disparaître cinq
 * paliers sur six du HTML indexable. Et la cellule partagée prend la hauteur
 * du plus grand panneau, donc la mise en page ne saute pas au changement de
 * palier, sans hauteur magique à maintenir par langue.
 *
 * POURQUOI UNE BANDE TEINTÉE. `bg-primary/5` avec `border-y` reprend le
 * vocabulaire de la bande Preuve et fait de cette section la rupture entre le
 * bloc d'arrivée et la suite.
 */
const Projection = () => {
  const { t } = useTranslation();
  const steps = t("projection.steps", { returnObjects: true }) as Step[];
  const [actif, setActif] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const [figee, setFigee] = useState(false);
  const mouvementReduit = useMouvementReduit();
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dansEcran = useInView(sectionRef, { amount: 0.35 });

  const tourne =
    !mouvementReduit && !enPause && !figee && dansEcran && steps.length > 1;

  useEffect(() => {
    if (!tourne) return;
    const id = window.setInterval(
      () => setActif((i) => (i + 1) % steps.length),
      DUREE_PALIER
    );
    return () => window.clearInterval(id);
  }, [tourne, steps.length, actif]);

  const choisir = useCallback((i: number) => {
    setFigee(true);
    setActif(i);
  }, []);

  /** Flèches gauche et droite sur le fil, comme un jeu d'onglets. */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const pas =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (pas === 0) return;
      event.preventDefault();
      const suivant = (actif + pas + steps.length) % steps.length;
      choisir(suivant);
      railRef.current
        ?.querySelectorAll<HTMLButtonElement>("button")[suivant]
        ?.focus();
    },
    [actif, steps.length, choisir]
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-border/40 bg-primary/5 py-14"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/*
          En-tête au-dessus du fil : libellé, titre, puis la note sous le titre,
          comme les autres sections de la page. La note a vécu à droite du
          titre, en serif italique calée sur sa dernière ligne (06/09) ;
          Ronald l'a trouvée inharmonieuse le 08/09, et il a raison : elle se
          lisait comme un second titre en concurrence avec le premier. Sous le
          titre, en texte courant borné à `max-w-3xl`, elle redevient ce
          qu'elle est, une précision.
        */}
        <div className="mb-8 max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground"
          >
            {t("projection.label")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl font-normal leading-[1.15] tracking-tight text-foreground md:text-4xl"
          >
            {t("projection.title")}{" "}
            <em className="italic text-primary">{t("projection.titleEm")}</em>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg leading-relaxed text-muted-foreground"
          >
            {t("projection.note")}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-2xl border border-border/60 bg-card px-6 py-6 md:px-8"
          onMouseEnter={() => setEnPause(true)}
          onMouseLeave={() => setEnPause(false)}
          onFocusCapture={() => setEnPause(true)}
          onBlurCapture={() => setEnPause(false)}
        >
          <div
            ref={railRef}
            role="tablist"
            aria-label={t("projection.label")}
            onKeyDown={onKeyDown}
            className="flex flex-wrap gap-2"
          >
            {steps.map((s, i) => {
              const lettre = LETTRES[i];
              return (
                <button
                  key={s.when}
                  type="button"
                  role="tab"
                  id={`projection-repere-${i}`}
                  aria-selected={actif === i}
                  aria-controls={`projection-palier-${i}`}
                  tabIndex={actif === i ? 0 : -1}
                  onClick={() => choisir(i)}
                  className={`inline-flex items-center gap-1.5 rounded-full py-1 pl-1.5 pr-3 text-[11px] font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                    actif === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  {/* Sans lettre (Jour 1), une pastille vide tient la place :
                      les six repères gardent la même hauteur et la même
                      marge, et l'absence se lit comme « avant la méthode ». */}
                  {lettre ? (
                    <TempoLetter
                      letter={lettre.letter}
                      size="sm"
                      className="h-4 w-4 rounded text-[9px]"
                    />
                  ) : (
                    <span aria-hidden="true" className="inline-block h-4 w-4 rounded border border-current opacity-40" />
                  )}
                  {s.when}
                </button>
              );
            })}
          </div>

          {/*
            Le fil du temps. Il avance D'UN PALIER AU SUIVANT, il ne repart pas
            de zéro à chaque fois : remis à zéro six fois, il reculait alors
            que la section raconte une montée de Jour 1 à Année 1. Il vaut donc
            la position dans l'arc, pas le temps restant avant la bascule.

            Hors rotation (survol, focus, clic, `prefers-reduced-motion`, hors
            écran) il se cale sur la position du palier actif : la barre dit
            où on en est, jamais une attente qui n'aura pas lieu.
          */}
          <div className="mt-4 h-px w-full overflow-hidden bg-border">
            <motion.div
              key={tourne ? actif : "fixe"}
              initial={{ scaleX: (actif + (tourne ? 0 : 1)) / steps.length }}
              animate={{ scaleX: (actif + 1) / steps.length }}
              transition={{
                duration: tourne ? DUREE_PALIER / 1000 : 0.4,
                ease: "linear",
              }}
              style={{ originX: 0 }}
              className="h-px w-full bg-primary"
            />
          </div>

          <div className="mt-6 grid">
            {steps.map((s, i) => {
              const lettre = LETTRES[i];
              const ecran = ECRANS[i];
              return (
                <motion.div
                  key={s.when}
                  role="tabpanel"
                  id={`projection-palier-${i}`}
                  aria-labelledby={`projection-repere-${i}`}
                  aria-hidden={actif !== i}
                  animate={{
                    opacity: actif === i ? 1 : 0,
                    y: actif === i ? 0 : 8,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`col-start-1 row-start-1 grid items-center gap-6 lg:gap-10 ${
                    ecran ? "lg:grid-cols-[5fr_7fr]" : ""
                  } ${actif === i ? "" : "pointer-events-none"}`}
                >
                  <div className={ecran ? "" : "max-w-3xl"}>
                    {lettre && (
                      <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                        <TempoLetter
                          letter={lettre.letter}
                          size="sm"
                          className="h-5 w-5 rounded text-[10px]"
                        />
                        <span>
                          {t(`tempo.rituals.${lettre.key}.name`)} ·{" "}
                          {t(`tempo.rituals.${lettre.key}.freq`)}
                        </span>
                      </p>
                    )}
                    <h3 className="mb-1.5 text-base font-semibold text-foreground md:text-lg">
                      {s.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                      {s.body}
                    </p>
                  </div>
                  {ecran && (
                    <ZoomableShot
                      src={ecran.src}
                      fallback={ecran.fallback}
                      alt={s.imageAlt ?? s.title}
                      className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-image"
                      /*
                        `eager` : les panneaux fermés sont à opacité zéro dans
                        la même cellule, et une image paresseuse qui n'a pas
                        encore chargé donne un panneau de 111 px au lieu de
                        190 ; la cellule partagée prend alors la hauteur du
                        texte seul et saute au premier palier illustré. Les
                        deux fichiers pèsent 10 et 25 Ko.
                      */
                      loading="eager"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/*
            Le pied de carte : l'exemple illustratif à gauche, la méthode
            nommée à droite. C'est ici, et une seule fois, que l'accueil dit
            « TEMPO » : après qu'on a vu les cinq rendez-vous, pas avant.
          */}
          <div className="mt-6 flex flex-col gap-3 border-t border-border/60 pt-4 text-xs md:flex-row md:items-center md:justify-between">
            <p className="italic text-muted-foreground">{t("projection.exNote")}</p>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-foreground">
              <span>{t("projection.method")}</span>
              <Link
                to="/pourquoi-steero#methode"
                className="group inline-flex items-center font-medium text-primary transition-transform duration-300 hover:translate-x-1"
              >
                {t("projection.methodLink")}
                <span className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projection;
