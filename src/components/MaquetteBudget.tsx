import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import {
  Car,
  ChevronRight,
  Heart,
  House,
  Landmark,
  MousePointerClick,
  PiggyBank,
  ShoppingCart,
  Utensils,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { trackMaquetteBudget } from "@/lib/analytics";

/*
 * LA PAGE « MES BUDGETS » DE L'APP, QU'ON MANIPULE DANS LE PREMIER ÉCRAN (15/11/2026).
 *
 * Elle remplace la capture du 07/09 (Reste à vivre et « Dans les clous »), qui
 * montrait un écran que l'app n'a plus depuis l'Accueil v2. Le visiteur ouvre
 * une catégorie et voit les budgets qu'elle contient ; au survol d'une
 * dépense, la bulle de l'app lui montre ses charges fixes. C'est la promesse
 * de la bande bleue (« Tu fais ton budget, à ta façon ») rendue tangible.
 *
 * ## C'est une COPIE de l'app, volontairement petite
 *
 * Le site ne peut pas importer les composants de l'app (deux dépôts). Ce
 * fichier reproduit donc les trois sections de `budget/-mes-budgets/index.tsx`
 * (`Section`, `LigneGroupe`, `LigneBudget`, `SectionEpargne`) et la bulle
 * d'une catégorie (`ApercuCategorie` dans `infos.tsx`) : mêmes couleurs, même
 * dépliement, même contenu. Les trois sections y sont parce qu'elles disent
 * ensemble ce que fait la page : le revenu, ce qui en part, et ce qui reste
 * pour l'épargne et les projets (retour de Ronald du 15/11). Les tailles sont
 * RÉDUITES (même retour : « trop gros ») : la maquette illustre, elle ne doit
 * pas peser plus que le titre. Rien d'autre : ni étalon, ni frise, ni
 * recherche, ni saisie, ni description de catégorie. Toute refonte de la page
 * Budget de l'app oblige à revoir ce fichier (règle notée dans le MEMORY SEO
 * du vault).
 *
 * ## Des chiffres ronds, tirés du compte de démonstration
 *
 * La structure est celle de Lucas Vidal (`convex/demo` dans l'app) : mêmes
 * catégories, mêmes budgets, mêmes récurrents, mêmes projets. Les montants,
 * eux, sont ARRONDIS (retour de Ronald du 15/11 : « pour faciliter la
 * lecture ») et tout est réparti : rien ne reste « non orienté », la capacité
 * va entière aux projets et à l'investissement, ce qui économise aussi une
 * ligne. Ce ne sont donc plus les chiffres exacts du compte, mais un budget
 * qui tombe juste, et c'est vérifiable ici même :
 *   - chaque catégorie vaut la somme de ses budgets ;
 *   - Dépenses + Épargne et investissement = Revenus (2 200 + 1 100 = 3 300) ;
 *   - une bulle somme ses charges fixes et ses variables au total de la
 *     catégorie, ses récurrents à ses charges fixes ;
 *   - les projets du mois somment la ligne Projets ;
 *   - chaque pourcentage est la part des revenus (la part de la catégorie
 *     dans la bulle), arrondie à l'unité.
 * Qui retouche un montant retouche les autres avec lui. « Transports
 * ponctuels » est rangé en Ponctuel, la décision du 14/11.
 *
 * ## Fermée d'entrée, et rien ne bouge tout seul
 *
 * Toutes les catégories sont repliées au départ (retour de Ronald du 15/11) :
 * la maquette montre d'abord les trois sections d'un coup d'œil, et c'est le
 * clic qui l'agrandit. Le prérendu (`scripts/prerender.mjs`) fige le DOM d'un
 * vrai navigateur après avoir fait défiler la page : une ouverture déclenchée
 * par une minuterie ou par le défilement serait photographiée en plein
 * mouvement et partirait dans le HTML statique (l'incident du 06/09). L'état
 * de départ est donc fixe, et la bulle n'existe qu'au survol réel : ni l'une
 * ni l'autre n'entre dans le HTML statique.
 *
 * ## Un seul groupe ouvert à la fois, et la hauteur suit
 *
 * La maquette grandit au clic et se replie au clic suivant. Le hero aligne ses
 * colonnes EN HAUT (`lg:items-start`), pour que le titre et le bouton ne
 * bougent pas quand elle grandit : seul ce qui est dessous descend. Un groupe
 * à la fois, toutes sections confondues, pour qu'elle ne dépasse jamais la
 * hauteur de son plus long dépliement (Vie quotidienne, cinq budgets).
 *
 * ## Les chevrons au survol, ou quand le groupe est ouvert
 *
 * Comme dans l'app : un chevron permanent sur chaque ligne charge la table.
 * Il paraît au survol ou au focus clavier, et reste quand le groupe est
 * ouvert, pour dire comment le refermer.
 *
 * ## La bulle : souris et clavier, jamais au doigt
 *
 * Comme dans l'app (`use-apercu.ts`) : elle paraît après 350 ms, sinon
 * traverser la liste fait clignoter, et seulement sur les dépenses (l'app n'en
 * a ni pour les revenus ni pour l'épargne). Sur un écran tactile, un tap émule
 * un survol : la bulle s'ouvrirait par-dessus les budgets que le tap vient de
 * déplier. Elle est donc réservée aux pointeurs qui survolent
 * (`(hover: hover)`) et au focus clavier. Un clic la referme, pour laisser
 * voir ce qu'il vient d'ouvrir.
 *
 * `data-nosnippet` : Google ne doit pas reprendre « Foyer 1 000 € » dans
 * l'extrait de la page d'accueil.
 */

type Famille = "socle" | "plaisir" | "ponctuel";
type Part = number | "<1";

interface BudgetDemo {
  id: string;
  /** Moyenne mensuelle en euros ; `null` = budget créé, pas encore rempli. */
  montant: number | null;
  /** Part des revenus, en points, telle que l'app l'affiche. */
  part: Part;
  famille?: Famille;
  /** Nombre de récurrents rattachés : la pastille brique des charges fixes. */
  recurrents?: number;
  varie?: boolean;
}

/** Ce que dit la bulle d'une catégorie (`ApercuCategorie` dans l'app). */
interface BulleDemo {
  fixe: number;
  /** Part des charges fixes dans la catégorie, en points. */
  partFixe: number;
  nbRecurrents: number;
  /** Les quatre premiers récurrents, comme l'app ; le reste se compte. */
  recurrents: { id: string; montant: number }[];
  variables: number;
}

interface CategorieDemo {
  id: string;
  icone: LucideIcon;
  montant: number;
  part: number;
  budgets: BudgetDemo[];
  bulle: BulleDemo;
}

const REVENUS = {
  montant: 3300,
  groupe: { id: "revenusSalaries", sources: [{ id: "salaire", montant: 3300, part: 100, recurrents: 1 }] },
};

const DEPENSES = { montant: 2200, part: 67 };

const CATEGORIES: CategorieDemo[] = [
  {
    id: "foyer",
    icone: House,
    montant: 1000,
    part: 30,
    budgets: [
      { id: "foyerLoyer", montant: 950, part: 29, recurrents: 2 },
      { id: "energie", montant: 50, part: 2, famille: "socle" },
      { id: "ameublement", montant: null, part: 0, famille: "ponctuel" },
    ],
    bulle: {
      fixe: 950,
      partFixe: 95,
      nbRecurrents: 2,
      recurrents: [
        { id: "loyer", montant: 930 },
        { id: "assuranceHabitation", montant: 20 },
      ],
      variables: 50,
    },
  },
  {
    id: "deplacements",
    icone: Car,
    montant: 250,
    part: 8,
    budgets: [
      { id: "assuranceAuto", montant: 50, part: 2, recurrents: 1 },
      { id: "carburant", montant: 100, part: 3, famille: "socle", varie: true },
      { id: "transports", montant: 50, part: 2, famille: "ponctuel", varie: true },
      { id: "entretienAuto", montant: 50, part: 2, famille: "ponctuel" },
    ],
    bulle: {
      fixe: 50,
      partFixe: 20,
      nbRecurrents: 1,
      recurrents: [{ id: "assuranceAutoRecurrent", montant: 50 }],
      variables: 200,
    },
  },
  {
    id: "sante",
    icone: Heart,
    montant: 100,
    part: 3,
    budgets: [
      { id: "adhesions", montant: 70, part: 2, recurrents: 2 },
      { id: "soins", montant: 30, part: 1, famille: "ponctuel" },
    ],
    bulle: {
      fixe: 70,
      partFixe: 70,
      nbRecurrents: 2,
      recurrents: [
        { id: "mutuelle", montant: 40 },
        { id: "salleDeSport", montant: 30 },
      ],
      variables: 30,
    },
  },
  {
    id: "vieQuotidienne",
    icone: ShoppingCart,
    montant: 550,
    part: 17,
    budgets: [
      { id: "communication", montant: 60, part: 2, recurrents: 4 },
      { id: "alimentation", montant: 350, part: 11, famille: "socle" },
      { id: "menager", montant: 40, part: 1, famille: "socle" },
      { id: "habillement", montant: 90, part: 3, famille: "ponctuel" },
      { id: "abonnements", montant: 10, part: "<1", recurrents: 1, varie: true },
    ],
    bulle: {
      fixe: 70,
      partFixe: 13,
      nbRecurrents: 5,
      recurrents: [
        { id: "internet", montant: 20 },
        { id: "mobile", montant: 20 },
        { id: "netflix", montant: 10 },
        { id: "spotify", montant: 10 },
      ],
      variables: 480,
    },
  },
  {
    id: "activites",
    icone: Utensils,
    montant: 250,
    part: 8,
    budgets: [
      { id: "restauration", montant: 150, part: 5, famille: "plaisir" },
      { id: "culture", montant: 100, part: 3, famille: "plaisir" },
      { id: "divertissement", montant: null, part: 0, famille: "plaisir" },
      { id: "cadeaux", montant: null, part: 0, famille: "ponctuel" },
    ],
    bulle: { fixe: 0, partFixe: 0, nbRecurrents: 0, recurrents: [], variables: 250 },
  },
  {
    id: "credits",
    icone: Landmark,
    montant: 50,
    part: 2,
    budgets: [{ id: "impots", montant: 50, part: 2, famille: "ponctuel" }],
    bulle: { fixe: 0, partFixe: 0, nbRecurrents: 0, recurrents: [], variables: 50 },
  },
];

/** Projets + Investissement = la capacité : tout est réparti, rien ne reste « non orienté ». */
const EPARGNE = {
  montant: 1100,
  part: 33,
  projets: {
    id: "projets",
    montant: 800,
    part: 24,
    liste: [
      { id: "fondsUrgence", montant: 100 },
      { id: "japon", montant: 150 },
      { id: "apport", montant: 400 },
      { id: "velo", montant: 150 },
    ],
  },
  investissement: { id: "investissement", montant: 300, part: 9 },
};

/** Tout est replié au départ : c'est le clic qui agrandit la maquette. */
const OUVERT_AU_DEPART: string | null = null;
const DELAI_OUVERTURE = 350;
const DELAI_FERMETURE = 120;
const LARGEUR_BULLE = 268;

/*
 * Les couleurs de l'app, pas celles du site : le site est chaud (beige), l'app
 * est froide (gris bleuté). Relevées au navigateur sur la page de l'app le
 * 15/11/2026. Portées par des variables locales pour que les classes restent
 * des chaînes fixes (une classe Tailwind fabriquée n'est jamais générée).
 */
const PALETTE = {
  "--m-bg": "oklch(0.98 0.01 240)",
  "--m-border": "oklch(0.91 0.02 250)",
  "--m-muted": "oklch(0.96 0.01 240)",
  "--m-muted-fg": "oklch(0.55 0.02 250)",
  "--m-fg": "oklch(0.141 0.005 285.823)",
  "--m-fg-70": "color-mix(in oklab, oklch(0.141 0.005 285.823) 70%, transparent)",
  "--m-piste": "color-mix(in oklab, oklch(0.141 0.005 285.823) 10%, transparent)",
  "--m-depense": "oklch(0.637 0.237 25.331)",
  "--m-revenu": "oklch(0.704 0.14 182.503)",
  "--m-projets": "oklch(0.585 0.233 277.117)",
  "--m-investissement": "oklch(0.623 0.214 259.815)",
  "--m-section-revenus": "rgb(26 122 82)",
  "--m-section-depenses": "rgb(192 55 79)",
  "--m-section-epargne": "rgb(59 82 212)",
  "--m-fixe": "#B0503C",
  "--m-fixe-texte": "rgb(147 65 47)",
  "--m-fixe-fond": "oklab(0.549 0.109 0.071 / 0.15)",
} as CSSProperties;

const FAMILLE: Record<Famille, { texte: string; point: string }> = {
  socle: { texte: "rgb(92 63 51)", point: "#5C3F33" },
  plaisir: { texte: "rgb(138 95 36)", point: "#C08A3E" },
  ponctuel: { texte: "rgb(138 82 56)", point: "#AE7150" },
};

const ANNEAU = 16;
const EPAISSEUR = 3;
const ESPACE_INSECABLE = String.fromCharCode(160);

/*
 * Les classes des lignes, partagées par les trois sections.
 *   au doigt   : groupe 36 px, budget 28 px
 *   à la souris : groupe 30 px, budget 24 px
 * `group` sur une ligne qu'on ouvre : son chevron paraît à son survol.
 */
const LIGNE =
  "relative flex h-9 w-full items-center gap-2 rounded-t-md pl-1 pr-1 text-left sm:h-[30px]";
const LIGNE_ACTIVE =
  "group transition-colors hover:bg-[var(--m-muted)] focus-visible:bg-[var(--m-muted)] focus-visible:outline-none";
const SOUS_LIGNE =
  "ml-[26px] flex h-7 items-center gap-2 border-b border-[color:color-mix(in_oklab,var(--m-border)_60%,transparent)] pl-2 pr-1 sm:h-6 sm:pl-3.5";
const NOM_GROUPE =
  "line-clamp-2 min-w-0 text-[13px] leading-[1.15] text-[color:var(--m-fg-70)] sm:line-clamp-none sm:truncate sm:leading-normal";
const NOM_SOUS =
  "line-clamp-2 min-w-0 text-xs leading-[1.15] text-[color:var(--m-muted-fg)] sm:line-clamp-none sm:truncate sm:leading-normal";
const MONTANT = "whitespace-nowrap pr-1 text-right tabular-nums sm:min-w-[64px] sm:pr-1.5";
const PASTILLE =
  "inline-flex h-[18px] min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[var(--m-muted)] px-1.5 text-[11px] font-medium tabular-nums text-[color:var(--m-muted-fg)]";

/** Le petit anneau neutre d'une ligne : sa part des revenus. */
const Anneau = ({ part }: { part: number }) => {
  const r = (ANNEAU - EPAISSEUR) / 2;
  const c = ANNEAU / 2;
  return (
    <svg width={ANNEAU} height={ANNEAU} viewBox={`0 0 ${ANNEAU} ${ANNEAU}`} aria-hidden="true" className="block shrink-0 opacity-75">
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--m-piste)" strokeWidth={EPAISSEUR} />
      <circle
        cx={c}
        cy={c}
        r={r}
        fill="none"
        stroke="var(--m-muted-fg)"
        strokeWidth={EPAISSEUR}
        pathLength={100}
        strokeDasharray={`${part} ${100 - part}`}
        transform={`rotate(-90 ${c} ${c})`}
      />
    </svg>
  );
};

/** Des arcs à la suite sur un cercle (`enchainer` dans l'app). */
function enchainer<T extends { pct: number }>(arcs: T[], ecart: number) {
  let cumul = 0;
  return arcs.map((a) => {
    const arc = { ...a, longueur: Math.max(a.pct * 0.4, a.pct - ecart), decalage: -cumul };
    cumul += a.pct;
    return arc;
  });
}

/**
 * L'anneau d'une section : un arc par ligne, d'une seule teinte. L'arc de la
 * ligne survolée reste plein, les autres pâlissent, comme dans l'app.
 */
const AnneauSection = ({ arcs, couleur, actif }: { arcs: { id: string; pct: number }[]; couleur: string; actif: string | null }) => {
  const r = (ANNEAU - EPAISSEUR) / 2;
  const c = ANNEAU / 2;
  const traces = enchainer(arcs.filter((a) => a.pct > 0), 1.5);
  const allume = actif !== null && traces.some((a) => a.id === actif);
  return (
    <svg width={ANNEAU} height={ANNEAU} viewBox={`0 0 ${ANNEAU} ${ANNEAU}`} aria-hidden="true" className="block shrink-0">
      <circle cx={c} cy={c} r={r} fill="none" stroke="var(--m-piste)" strokeWidth={EPAISSEUR} />
      {traces.map((a) => (
        <circle
          key={a.id}
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={couleur}
          strokeWidth={EPAISSEUR}
          pathLength={100}
          strokeDasharray={`${a.longueur} ${100 - a.longueur}`}
          strokeDashoffset={a.decalage}
          transform={`rotate(-90 ${c} ${c})`}
          opacity={allume && actif !== a.id ? 0.3 : 1}
          style={{ transition: "opacity .15s" }}
        />
      ))}
    </svg>
  );
};

/** Le donut de la bulle : les charges fixes en brique d'abord, puis chaque budget variable à la couleur de son type. */
const DonutCategorie = ({ budgets }: { budgets: BudgetDemo[] }) => {
  const taille = 64;
  const epaisseur = 9;
  const ordre = [...budgets.filter((b) => b.recurrents !== undefined), ...budgets.filter((b) => b.recurrents === undefined)];
  const portes = ordre.filter((b) => (b.montant ?? 0) > 0);
  const total = portes.reduce((s, b) => s + (b.montant ?? 0), 0) || 1;
  const arcs = enchainer(
    portes.map((b) => ({
      id: b.id,
      pct: ((b.montant ?? 0) / total) * 100,
      couleur: b.recurrents !== undefined ? "var(--m-fixe)" : FAMILLE[b.famille ?? "socle"].point,
    })),
    1.2,
  );
  const r = (taille - epaisseur) / 2;
  const c = taille / 2;
  return (
    <svg width={taille} height={taille} viewBox={`0 0 ${taille} ${taille}`} aria-hidden="true" className="block">
      {arcs.map((a) => (
        <circle
          key={a.id}
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke={a.couleur}
          strokeWidth={epaisseur}
          pathLength={100}
          strokeDasharray={`${a.longueur} ${100 - a.longueur}`}
          strokeDashoffset={a.decalage}
          transform={`rotate(-90 ${c} ${c})`}
        />
      ))}
    </svg>
  );
};

type Formats = { euros: (n: number) => string; part: (p: Part) => string };

/**
 * Où poser la bulle, en pixels depuis le haut de la maquette. Les limites sont
 * ce qu'on voit vraiment : l'écran sous l'en-tête fixe, et le hero, qui coupe
 * ce qui dépasse (`overflow-hidden`).
 */
type Place = { haut: number; bas: number; gauche: number; limiteHaute: number; limiteBasse: number };

const Bulle = ({ cat, formats, id, place }: { cat: CategorieDemo; formats: Formats; id: string; place: Place }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(place.bas + 4);
  const Icone = cat.icone;
  const { bulle } = cat;
  const familles = [...new Set(cat.budgets.filter((b) => b.recurrents === undefined).map((b) => b.famille ?? "socle"))];

  // Sous la ligne, ou au-dessus quand elle n'y tient pas (même règle que
  // `Apercu` dans l'app). La hauteur n'existe qu'une fois peinte. Jamais
  // par-dessus sa propre ligne : faute de place des deux côtés, elle prend le
  // côté le plus large et se laisse couper.
  useLayoutEffect(() => {
    const h = ref.current?.offsetHeight ?? 0;
    const dessous = place.bas + 4;
    const dessus = place.haut - 4 - h;
    if (dessous + h <= place.limiteBasse) setTop(dessous);
    else if (dessus >= place.limiteHaute) setTop(dessus);
    else setTop(place.limiteBasse - place.bas >= place.haut - place.limiteHaute ? dessous : dessus);
  }, [place]);

  return (
    <div
      ref={ref}
      id={id}
      role="tooltip"
      style={{ top, left: place.gauche, width: LARGEUR_BULLE }}
      className="pointer-events-none absolute z-30 rounded-xl border border-[color:var(--m-border)] bg-white px-3.5 pb-3 pt-3 text-[12px] leading-[1.45] text-[color:var(--m-fg)] shadow-xl animate-in fade-in-0 slide-in-from-bottom-1"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[13px] font-semibold leading-snug">{t(`hero.maquette.noms.${cat.id}`)}</span>
        <b className="whitespace-nowrap text-sm font-semibold tabular-nums">
          {formats.euros(cat.montant)}
          <small className="text-[11px] font-normal text-[color:var(--m-muted-fg)]"> {t("hero.maquette.bulle.parMois")}</small>
        </b>
      </div>
      <div className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-[color:var(--m-muted-fg)]">
        <Icone className="h-3.5 w-3.5 text-[color:var(--m-depense)]" strokeWidth={1.75} aria-hidden="true" />
        {t("hero.maquette.nBudgets", { count: cat.budgets.length })}
        <span>·</span>
        {t("hero.maquette.bulle.desRevenus", { part: formats.part(cat.part) })}
      </div>
      <div className="mt-2.5 grid grid-cols-[minmax(0,1fr)_64px] items-center gap-3.5 border-t border-[color:var(--m-border)] pt-2.5">
        <div className="grid gap-2">
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-[7px]">
            <i className="block h-[7px] w-[7px] rounded-full bg-[var(--m-fixe)]" />
            <span>{t("hero.maquette.bulle.chargesFixes")}</span>
            <b className="font-semibold tabular-nums">{formats.euros(bulle.fixe)}</b>
            <small className="col-span-2 col-start-2 text-[11px] text-[color:var(--m-muted-fg)]">
              {formats.part(bulle.partFixe)}
              {bulle.nbRecurrents > 0 && ` · ${t("hero.maquette.bulle.nRecurrents", { count: bulle.nbRecurrents })}`}
            </small>
            {bulle.recurrents.length > 0 && (
              <div className="col-span-2 col-start-2 mt-1 grid gap-px">
                {bulle.recurrents.map((r) => (
                  <div key={r.id} className="flex justify-between gap-2.5 text-[11px] text-[color:var(--m-muted-fg)]">
                    <span className="truncate">{t(`hero.maquette.bulle.recurrents.${r.id}`)}</span>
                    <span className="tabular-nums text-[color:var(--m-fg)]">{formats.euros(r.montant)}</span>
                  </div>
                ))}
                {bulle.nbRecurrents > bulle.recurrents.length && (
                  <div className="text-[11px] text-[color:var(--m-muted-fg)]">
                    {t("hero.maquette.bulle.etNAutres", { count: bulle.nbRecurrents - bulle.recurrents.length })}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-baseline gap-x-[7px]">
            <span className="inline-flex gap-0.5">
              {familles.map((f) => (
                <i key={f} className="block h-[7px] w-[7px] rounded-full" style={{ background: FAMILLE[f].point }} />
              ))}
            </span>
            <span>{t("hero.maquette.bulle.variables")}</span>
            <b className="font-semibold tabular-nums">{formats.euros(bulle.variables)}</b>
            <small className="col-span-2 col-start-2 text-[11px] text-[color:var(--m-muted-fg)]">
              {formats.part(100 - bulle.partFixe)}
            </small>
          </div>
        </div>
        <div className="relative h-16 w-16">
          <DonutCategorie budgets={cat.budgets} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <b className="text-[11px] font-semibold leading-tight tabular-nums">{formats.part(bulle.partFixe)}</b>
            <small className="text-[9px] text-[color:var(--m-muted-fg)]">{t("hero.maquette.bulle.fixes")}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

/** L'en-tête d'une section (`Section` dans l'app), à hauteur fixe. */
const EnteteSection = ({
  libelle,
  couleur,
  total,
  part,
  className = "",
}: {
  libelle: string;
  couleur: string;
  total: string;
  part?: { texte: string; anneau: ReactNode };
  className?: string;
}) => (
  <div
    className={`flex h-7 items-center gap-2 border-b pl-1 pr-1 ${className}`}
    style={{ borderBottomColor: `color-mix(in oklab, ${couleur} 50%, transparent)` }}
  >
    <span className="shrink-0 whitespace-nowrap font-mono text-[10.5px] font-medium uppercase tracking-[0.06em]" style={{ color: couleur }}>
      {libelle}
    </span>
    <span className="min-w-2 flex-1" />
    {part && (
      <span className="hidden items-center gap-1.5 whitespace-nowrap text-[color:var(--m-muted-fg)] sm:inline-flex">
        {part.anneau}
        <span className="min-w-7 text-right text-[11px]">{part.texte}</span>
      </span>
    )}
    <span className={`${MONTANT} font-mono text-[13px] font-medium`} style={{ color: couleur }}>
      {total}
    </span>
    <span className="w-3.5 shrink-0" />
  </div>
);

/** La part d'une ligne : anneau et pourcentage, cachés au doigt faute de place. */
const PartLigne = ({ pct, texte, anneau = true }: { pct: number; texte: string; anneau?: boolean }) => (
  <span className="hidden items-center gap-1.5 whitespace-nowrap sm:inline-flex">
    {anneau && <Anneau part={pct} />}
    <span className="min-w-7 text-right text-[11px] text-[color:var(--m-muted-fg)]">{texte}</span>
  </span>
);

/** Le chevron d'un groupe : au survol de sa ligne, au focus clavier, ou quand il est ouvert. */
const Chevron = ({ ouvert }: { ouvert: boolean }) => (
  <ChevronRight
    aria-hidden="true"
    className={`h-3.5 w-3.5 shrink-0 text-[color:var(--m-muted-fg)] transition-[opacity,transform] duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 ${ouvert ? "rotate-90 opacity-100" : "opacity-0"}`}
  />
);

const Filet = () => <span className="absolute inset-x-0 bottom-0 h-px bg-[var(--m-border)]" />;

/** Le nombre de budgets d'un groupe : une pastille, et sa lecture pour un lecteur d'écran. */
const Compte = ({ n }: { n: number }) => {
  const { t } = useTranslation();
  return (
    <>
      <span aria-hidden="true" className={PASTILLE}>
        {n}
      </span>
      <span className="sr-only">{t("hero.maquette.nBudgets", { count: n })}</span>
    </>
  );
};

/** « varie » : le montant change d'un mois à l'autre, la ligne en montre la moyenne. */
const Varie = () => {
  const { t } = useTranslation();
  return (
    <span className="hidden shrink-0 rounded-full border border-[color:var(--m-border)] px-1.5 text-[10.5px] leading-[15px] text-[color:var(--m-muted-fg)] sm:inline">
      {t("hero.maquette.varie")}
    </span>
  );
};

/** Le corps dépliable d'un groupe : il reste monté, sa hauteur s'anime (`Depliable` dans l'app). */
const Corps = ({ id, ouvert, children }: { id: string; ouvert: boolean; children: ReactNode }) => (
  <div id={id} className="grid transition-[grid-template-rows] duration-200 ease-out" style={{ gridTemplateRows: ouvert ? "1fr" : "0fr" }}>
    <div className={`min-h-0 overflow-hidden transition-[visibility] duration-200 ${ouvert ? "visible" : "invisible"}`}>
      <ul className="pb-1">{children}</ul>
    </div>
  </div>
);

const MaquetteBudget = () => {
  const { t, i18n } = useTranslation();
  const idBase = useId();
  const cadre = useRef<HTMLDivElement>(null);
  const tOuvrir = useRef<number | undefined>(undefined);
  const tFermer = useRef<number | undefined>(undefined);
  const [ouvert, setOuvert] = useState<string | null>(OUVERT_AU_DEPART);
  const [survol, setSurvol] = useState<string | null>(null);
  const [bulle, setBulle] = useState<{ id: string; place: Place } | null>(null);

  useEffect(
    () => () => {
      window.clearTimeout(tOuvrir.current);
      window.clearTimeout(tFermer.current);
    },
    [],
  );

  const eurosFmt = new Intl.NumberFormat(i18n.language, { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
  const pourcent = new Intl.NumberFormat(i18n.language, { style: "percent", maximumFractionDigits: 0 });
  const formats: Formats = {
    euros: (n) => eurosFmt.format(n),
    part: (p) => (p === "<1" ? `<${ESPACE_INSECABLE}${pourcent.format(0.01)}` : pourcent.format(p / 100)),
  };

  const fermerBulle = () => {
    window.clearTimeout(tOuvrir.current);
    window.clearTimeout(tFermer.current);
    setBulle(null);
  };

  const programmerBulle = (id: string, ligne: HTMLElement) => {
    window.clearTimeout(tFermer.current);
    window.clearTimeout(tOuvrir.current);
    tOuvrir.current = window.setTimeout(() => {
      const boite = cadre.current?.getBoundingClientRect();
      if (!boite) return;
      const r = ligne.getBoundingClientRect();
      const hero = cadre.current?.closest("section")?.getBoundingClientRect();
      const entete = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0;
      setBulle({
        id,
        place: {
          haut: r.top - boite.top,
          bas: r.bottom - boite.top,
          gauche: Math.min(Math.max(0, r.left - boite.left + 34), Math.max(0, boite.width - LARGEUR_BULLE)),
          limiteHaute: Math.max(entete, hero?.top ?? 0) + 8 - boite.top,
          limiteBasse: Math.min(window.innerHeight, hero?.bottom ?? window.innerHeight) - 8 - boite.top,
        },
      });
    }, DELAI_OUVERTURE);
  };

  const sortir = () => {
    setSurvol(null);
    window.clearTimeout(tOuvrir.current);
    tFermer.current = window.setTimeout(() => setBulle(null), DELAI_FERMETURE);
  };

  const basculer = (id: string) => {
    fermerBulle();
    const ouvrir = ouvert !== id;
    setOuvert(ouvrir ? id : null);
    if (ouvrir) trackMaquetteBudget(id);
  };

  /** Les gestes d'un groupe dépliable ; `avecBulle` pour les dépenses seulement. */
  const gestes = (id: string, avecBulle: boolean) => ({
    "aria-expanded": ouvert === id,
    "aria-controls": `${idBase}-${id}`,
    "aria-describedby": bulle?.id === id ? `${idBase}-bulle-${id}` : undefined,
    onClick: () => basculer(id),
    onMouseEnter: (e: MouseEvent<HTMLButtonElement>) => {
      setSurvol(id);
      if (avecBulle && window.matchMedia("(hover: hover)").matches) programmerBulle(id, e.currentTarget);
    },
    onMouseLeave: sortir,
    onFocus: (e: FocusEvent<HTMLButtonElement>) => {
      if (!e.currentTarget.matches(":focus-visible")) return;
      setSurvol(id);
      if (avecBulle) programmerBulle(id, e.currentTarget);
    },
    onBlur: sortir,
  });

  const catBulle = bulle ? CATEGORIES.find((c) => c.id === bulle.id) : undefined;
  const { projets, investissement } = EPARGNE;
  const sourceRevenu = REVENUS.groupe.sources[0];

  return (
    <div ref={cadre} style={PALETTE} className="relative mx-auto w-full max-w-[460px]">
      <div
        data-nosnippet=""
        role="group"
        aria-label={t("hero.maquette.aria")}
        className="rounded-2xl border border-[color:var(--m-border)] bg-[var(--m-bg)] px-3 pb-2 pt-3 text-[color:var(--m-fg)] shadow-image sm:px-4"
      >
        <div>
          {/* ── Revenus ─────────────────────────────────────────── */}
          <EnteteSection
            libelle={t("hero.maquette.sections.revenus")}
            couleur="var(--m-section-revenus)"
            total={formats.euros(REVENUS.montant)}
          />
          <button type="button" {...gestes(REVENUS.groupe.id, false)} className={`${LIGNE} ${LIGNE_ACTIVE}`}>
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center text-[color:var(--m-revenu)]">
              <Wallet className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className={NOM_GROUPE}>{t(`hero.maquette.noms.${REVENUS.groupe.id}`)}</span>
            <Compte n={REVENUS.groupe.sources.length} />
            <span className="min-w-2 flex-1" />
            <span className={`${MONTANT} text-[13px] text-[color:var(--m-section-revenus)]`}>{formats.euros(REVENUS.montant)}</span>
            <Chevron ouvert={ouvert === REVENUS.groupe.id} />
            <Filet />
          </button>
          <Corps id={`${idBase}-${REVENUS.groupe.id}`} ouvert={ouvert === REVENUS.groupe.id}>
            <li className={SOUS_LIGNE}>
              <span className={NOM_SOUS}>{t(`hero.maquette.noms.${sourceRevenu.id}`)}</span>
              <span className={PASTILLE}>{sourceRevenu.recurrents}</span>
              <span className="min-w-2 flex-1" />
              <PartLigne pct={sourceRevenu.part} texte={formats.part(sourceRevenu.part)} anneau={false} />
              <span className={`${MONTANT} text-xs text-[color:var(--m-muted-fg)]`}>{formats.euros(sourceRevenu.montant)}</span>
              <span className="w-3.5 shrink-0" />
            </li>
          </Corps>

          {/* ── Dépenses ────────────────────────────────────────── */}
          <EnteteSection
            className="mt-3.5"
            libelle={t("hero.maquette.sections.depenses")}
            couleur="var(--m-section-depenses)"
            total={formats.euros(DEPENSES.montant)}
            part={{
              texte: formats.part(DEPENSES.part),
              anneau: (
                <AnneauSection
                  arcs={CATEGORIES.map((c) => ({ id: c.id, pct: c.part }))}
                  couleur="var(--m-section-depenses)"
                  actif={survol}
                />
              ),
            }}
          />
          {CATEGORIES.map((cat) => {
            const Icone = cat.icone;
            return (
              <div key={cat.id}>
                <button type="button" {...gestes(cat.id, true)} className={`${LIGNE} ${LIGNE_ACTIVE}`}>
                  <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center text-[color:var(--m-depense)]">
                    <Icone className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className={NOM_GROUPE}>{t(`hero.maquette.noms.${cat.id}`)}</span>
                  <Compte n={cat.budgets.length} />
                  <span className="min-w-2 flex-1" />
                  <PartLigne pct={cat.part} texte={formats.part(cat.part)} />
                  <span className={`${MONTANT} text-[13px] text-[color:var(--m-fg-70)]`}>{formats.euros(cat.montant)}</span>
                  <Chevron ouvert={ouvert === cat.id} />
                  <Filet />
                </button>
                <Corps id={`${idBase}-${cat.id}`} ouvert={ouvert === cat.id}>
                  {cat.budgets.map((b) => (
                    <li key={b.id} className={SOUS_LIGNE}>
                      <span className={NOM_SOUS}>{t(`hero.maquette.noms.${b.id}`)}</span>
                      {b.famille && (
                        <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium" style={{ color: FAMILLE[b.famille].texte }}>
                          <i className="block h-1.5 w-1.5 rounded-full" style={{ background: FAMILLE[b.famille].point }} />
                          {t(`hero.maquette.familles.${b.famille}`)}
                        </span>
                      )}
                      {b.recurrents !== undefined && (
                        <span className="inline-flex min-w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--m-fixe-fond)] px-1.5 text-[11px] font-medium leading-[16px] tabular-nums text-[color:var(--m-fixe-texte)]">
                          {b.recurrents}
                        </span>
                      )}
                      {b.varie && <Varie />}
                      <span className="min-w-2 flex-1" />
                      <span className="hidden min-w-7 whitespace-nowrap text-right text-[11px] text-[color:var(--m-muted-fg)] opacity-80 sm:inline">
                        {formats.part(b.part)}
                      </span>
                      <span className={`${MONTANT} text-xs text-[color:var(--m-muted-fg)]`}>{formats.euros(b.montant ?? 0)}</span>
                      <span className="w-3.5 shrink-0" />
                    </li>
                  ))}
                </Corps>
              </div>
            );
          })}

          {/* ── Épargne et investissement ───────────────────────── */}
          <EnteteSection
            className="mt-3.5"
            libelle={t("hero.maquette.sections.epargne")}
            couleur="var(--m-section-epargne)"
            total={formats.euros(EPARGNE.montant)}
            part={{
              texte: formats.part(EPARGNE.part),
              anneau: (
                <AnneauSection
                  arcs={[projets, investissement].map((l) => ({ id: l.id, pct: l.part }))}
                  couleur="var(--m-section-epargne)"
                  actif={survol}
                />
              ),
            }}
          />
          <button type="button" {...gestes(projets.id, false)} className={`${LIGNE} ${LIGNE_ACTIVE}`}>
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center text-[color:var(--m-projets)]">
              <PiggyBank className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className={NOM_GROUPE}>{t("hero.maquette.noms.projets")}</span>
            <Compte n={projets.liste.length} />
            <Varie />
            <span className="min-w-2 flex-1" />
            <PartLigne pct={projets.part} texte={formats.part(projets.part)} />
            <span className={`${MONTANT} text-[13px] text-[color:var(--m-fg-70)]`}>{formats.euros(projets.montant)}</span>
            <Chevron ouvert={ouvert === projets.id} />
            <Filet />
          </button>
          <Corps id={`${idBase}-${projets.id}`} ouvert={ouvert === projets.id}>
            {projets.liste.map((p) => (
              <li key={p.id} className={SOUS_LIGNE}>
                <span className={NOM_SOUS}>{t(`hero.maquette.noms.${p.id}`)}</span>
                <span className="shrink-0 text-[11px] text-[color:var(--m-muted-fg)]">{t("hero.maquette.calcule")}</span>
                <span className="min-w-2 flex-1" />
                <span className={`${MONTANT} text-xs text-[color:var(--m-muted-fg)]`}>{formats.euros(p.montant)}</span>
                <span className="w-3.5 shrink-0" />
              </li>
            ))}
          </Corps>
          <div
            className={LIGNE}
            onMouseEnter={() => setSurvol(investissement.id)}
            onMouseLeave={() => setSurvol(null)}
          >
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center text-[color:var(--m-investissement)]">
              <Landmark className="h-[15px] w-[15px]" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className={NOM_GROUPE}>{t("hero.maquette.noms.investissement")}</span>
            <span className="min-w-2 flex-1" />
            <PartLigne pct={investissement.part} texte={formats.part(investissement.part)} />
            <span className={`${MONTANT} text-[13px] text-[color:var(--m-fg-70)]`}>{formats.euros(investissement.montant)}</span>
            <span className="w-3.5 shrink-0" />
          </div>
        </div>
      </div>

      {catBulle && bulle && <Bulle cat={catBulle} formats={formats} id={`${idBase}-bulle-${catBulle.id}`} place={bulle.place} />}

      <p className="mt-2.5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <MousePointerClick className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="[@media(hover:none)]:hidden">{t("hero.maquette.indiceSurvol")}</span>
        <span className="hidden [@media(hover:none)]:inline">{t("hero.maquette.indice")}</span>
      </p>
    </div>
  );
};

export default MaquetteBudget;
