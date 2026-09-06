import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "react-i18next";

type Step = { when: string; title: string; body: string };

/** Durée d'un palier avant passage au suivant, en millisecondes. */
const DUREE_PALIER = 4600;

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
 * La projection : ce que tu fais dans Steero, et ce que ça change.
 *
 * POURQUOI LE TITRE NE NOMME PLUS D'HORIZON (06/09). Il disait « à quoi
 * ressemble ta première année », et le libellé disait « la projection ».
 * Les deux annonçaient de l'attente : Ronald l'a lu comme « je n'aurai de
 * résultats que dans un an », soit un frein posé juste avant le fil censé le
 * lever. Le titre parle donc de l'expérience et de son effet, la note dit
 * explicitement qu'il n'y a rien à attendre, et l'horizon ne vit plus que
 * sur les repères, où il se lit comme une montée et non comme un délai.
 * Ne pas remettre de durée dans le titre.
 *
 * POURQUOI ELLE A QUITTÉ `Preuve` LE 06/09. Elle en était la deuxième section,
 * donc tout en bas de l'accueil, après trois études et un acronyme à apprendre.
 * Or c'est le seul endroit de la page qui montre l'outil en situation, avec des
 * chiffres. La semaine de calibrage Google Ads a montré que 93 % des clics
 * viennent de « gérer son budget » : quelqu'un qui tape ça sait déjà qu'il a un
 * problème et cherche un outil, pas une démonstration du problème. La
 * projection remonte donc juste après le hero, et le rapport d'étonnement
 * descend.
 *
 * LES CLÉS ONT DÉMÉNAGÉ DE `preuve.week*` VERS `projection.*` (06/09).
 * J'avais refusé ce renommage le matin même, à raison : seule la POSITION
 * de la section avait changé. Il est devenu juste quand l'horizon (semaine
 * puis année), le titre et le libellé ont tous changé : `weekTitle` ne
 * décrivait plus rien, et `preuve.` désignait un composant qui ne lisait
 * plus ces clés. Un nom qui ment coûte plus cher qu'un renommage mécanique.
 *
 * POURQUOI ELLE VA JUSQU'À L'ANNÉE (06/09, demande de Ronald). J'avais plaidé
 * l'arrêt au trimestre : l'année est le seul horizon dont on ne peut rien
 * montrer de concret à quelqu'un qui n'a pas installé le produit. Ronald a
 * tranché pour « Année 1 », et le fil parcourt désormais les CINQ horizons de
 * TEMPO — quotidien, hebdomadaire, mensuel, trimestriel, annuel — ce qui fait
 * de la section suivante le nom de ce qu'on vient de voir, au lieu d'une
 * rupture.
 *
 * Ma réserve reste vraie sur un point, et elle se paie dans la copie, pas dans
 * la structure : le palier annuel ne promet AUCUN résultat. Il décrit ce que la
 * donnée donne (« douze mois mesurés, pas estimés »), jamais une économie
 * chiffrée qu'on ne peut pas garantir. Un taux annuel sur une première année
 * partielle mentirait de toute façon. Ne pas y remettre de gain chiffré.
 *
 * POURQUOI UN FIL ET NON UNE LISTE (06/09, demande de Ronald). Les cinq paliers
 * empilés faisaient 767 px de section. Ici les six repères restent tous
 * lisibles d'un coup d'oeil, car c'est l'arc « Jour 1 vers Année 1 » qui porte le
 * récit, pas le détail ; seul le corps tourne. La barre qui se remplit n'est pas
 * un ornement : elle dit que ça avance tout seul, ce qui est précisément le
 * sujet de la section.
 *
 * POURQUOI « JOUR 2 » ET NON « CHAQUE JOUR ». Le repère récurrent lisait comme
 * une obligation, et c'est le seul frein qu'un prospect rencontre avant d'avoir
 * essayé. Le fil est un arc de dates qui grandit (Jour 1, Jour 2, Jour 7, Mois 1,
 * Mois 3, Année 1) : la nature quotidienne se dit dans le titre (« Le geste du
 * jour ») et dans le corps, pas dans le repère. On ne la cache pas, on arrête
 * juste de l'annoncer comme une contrainte. La largeur des pastilles n'est plus
 * une contrainte depuis le passage au fil : elles sont sur une ligne et ne
 * décalent plus l'alignement des titres.
 *
 * POURQUOI UNE BANDE TEINTÉE. Sur fond `bg-background`, la projection et TEMPO
 * partageaient le même fond : rien ne disait où l'une finissait. `bg-primary/5`
 * avec `border-y` reprend le vocabulaire de la bande Preuve et fait de cette
 * section la rupture entre le bloc d'arrivée et la méthode.
 *
 * LES SIX PANNEAUX RESTENT DANS LE DOM. Ils sont empilés dans la même cellule
 * de grille (`col-start-1 row-start-1`), pas montés à la demande. Deux raisons,
 * et la première est la plus coûteuse à découvrir trop tard : le prérendu
 * capture le DOM, donc un panneau monté à la demande ferait disparaître quatre
 * paliers sur six du HTML indexable. La seconde : la cellule partagée prend la
 * hauteur du plus grand panneau, donc la mise en page ne saute pas au changement
 * de palier, sans hauteur magique à maintenir par langue.
 *
 * La rotation s'arrête au survol, au focus, hors écran, et sous
 * `prefers-reduced-motion`, où les repères restent cliquables : rien n'est
 * inatteignable.
 */
const Projection = () => {
  const { t } = useTranslation();
  const steps = t("projection.steps", { returnObjects: true }) as Step[];
  const [actif, setActif] = useState(0);
  const [enPause, setEnPause] = useState(false);
  const mouvementReduit = useMouvementReduit();
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const dansEcran = useInView(sectionRef, { amount: 0.35 });

  const tourne = !mouvementReduit && !enPause && dansEcran && steps.length > 1;

  useEffect(() => {
    if (!tourne) return;
    const id = window.setInterval(
      () => setActif((i) => (i + 1) % steps.length),
      DUREE_PALIER
    );
    return () => window.clearInterval(id);
  }, [tourne, steps.length, actif]);

  /** Flèches gauche et droite sur le fil, comme un jeu d'onglets. */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const pas =
        event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
      if (pas === 0) return;
      event.preventDefault();
      const suivant = (actif + pas + steps.length) % steps.length;
      setActif(suivant);
      railRef.current
        ?.querySelectorAll<HTMLButtonElement>("button")[suivant]
        ?.focus();
    },
    [actif, steps.length]
  );

  return (
    <section
      ref={sectionRef}
      className="border-y border-border/40 bg-primary/5 py-14"
    >
      <div className="container mx-auto max-w-6xl px-6">
        {/*
          En-tete au-dessus du fil, sur demande de Ronald. Le titre et la note
          restent cote a cote a partir de `lg` : empiles en pleine largeur, ils
          ajoutaient leur hauteur a celle du fil au lieu de la partager, et un
          titre serif en 4xl etale sur 1152 px ne se lit plus. `items-end` cale
          la note sur la derniere ligne du titre.
        */}
        <div className="mb-8 grid gap-x-10 gap-y-4 lg:grid-cols-[7fr_5fr] lg:items-end">
          <div>
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
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif text-lg italic text-muted-foreground"
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
            {steps.map((s, i) => (
              <button
                key={s.when}
                type="button"
                role="tab"
                id={`projection-repere-${i}`}
                aria-selected={actif === i}
                aria-controls={`projection-palier-${i}`}
                tabIndex={actif === i ? 0 : -1}
                onClick={() => setActif(i)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  actif === i
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                {s.when}
              </button>
            ))}
          </div>

          {/*
            Le fil du temps. Il avance D'UN PALIER AU SUIVANT, il ne repart pas
            de zero a chaque fois : remis a zero six fois, il reculait alors que
            la section raconte une montee de Jour 1 a Annee 1. Il vaut donc la
            position dans l'arc, pas le temps restant avant la bascule.

            Hors rotation (survol, focus, `prefers-reduced-motion`, hors ecran)
            il se cale sur la position du palier actif : la barre dit ou on en
            est, jamais une attente qui n'aura pas lieu.
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

          {/* `max-w-3xl` sur le texte et non sur la carte : la carte tient la
              largeur pour s'aligner sur l'en-tete, le corps garde une longueur
              de ligne lisible. */}
          <div className="mt-5 grid">
            {steps.map((s, i) => (
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
                className={`col-start-1 row-start-1 max-w-3xl ${
                  actif === i ? "" : "pointer-events-none"
                }`}
              >
                <h3 className="mb-1.5 text-base font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-5 border-t border-border/60 pt-4 text-xs italic text-muted-foreground">
            {t("projection.exNote")}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projection;
