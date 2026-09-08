import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TempoLetter } from "@/components/TempoLetter";

/**
 * TEMPO EN ACCORDÉON (07/09/2026). Vit sur Pourquoi Steero, PAS sur l'accueil.
 *
 * L'accueil portait `MethodResults` : un rail collant et cinq panneaux à
 * capture 16/9, cinq écrans de page pour redire les cinq horizons que la
 * section Projection venait de parcourir avec les mêmes écrans. Ronald l'a
 * lu comme « super lourd avec TEMPO juste derrière » : deux fois le même
 * escalier. TEMPO a donc quitté l'accueil, et la méthode se lit désormais sur
 * Pourquoi Steero, où quelqu'un qui veut comprendre le cadre va la chercher.
 *
 * Ce qui devait survivre, demande de Ronald : les tirets. « Tu te
 * reconnectes à tes dépenses · Chaque dépense devient une décision
 * consciente · … » disent ce que chaque rendez-vous CHANGE pour la personne.
 * Ils remplacent, sur Pourquoi Steero, la grille de cinq cartes qui ne
 * portait qu'une phrase de définition et une durée par rituel.
 *
 * LA FORME. Cinq cartes sur une rangée, une seule ouverte à la fois. La carte
 * ouverte grandit vers la droite (44 % de la rangée) et découvre son panneau ;
 * les quatre autres se resserrent à leur lettre, leur nom et leur fréquence.
 * C'est l'idée de Ronald. Le `flex` s'anime par une variable CSS lue par une
 * classe arbitraire `lg:` (voir le commentaire sur la carte). Sous 1024 px les
 * cartes s'empilent et le panneau s'ouvre dessous : à 768, cinq cartes côte à
 * côte feraient 104 px chacune.
 *
 * TRACER EST OUVERTE AU REPOS. Une page dont le premier état est vide ne
 * montre rien à qui ne clique pas, et le prérendu photographie le DOM : les
 * cinq panneaux restent montés, fermés par la largeur et l'opacité, jamais
 * démontés. La méthode reste indexable en entier.
 *
 * AUCUNE DURÉE. « 5 min » et « 60 min » restent dans les locales
 * (`pourquoiSteero.tempo.rows`, Fonctionnalités) ; ici la carte ne dit que
 * la fréquence : Ronald a banni toute durée de rituel en promesse, elle se
 * lit comme un effort avant de se lire comme un cadre.
 *
 * LES TIRETS d'Orienter n'existaient pas (`differentiation.budget` illustrait
 * le rituel avec une capture du budget annuel) : `differentiation.orient` a
 * été écrit le 07/09, validé par Ronald.
 *
 * Le composant ne rend que la rangée : la page qui l'accueille garde son
 * titre, son accroche et ce qui suit. Le clic vit sur la carte entière (un
 * `div`), le clavier sur le bouton de l'en-tête : un lien vers les fondements
 * vit dans le panneau, et un `<a>` dans un `<button>` n'est pas du HTML valide.
 */
const RITUALS = [
  { key: "t", result: "capture", link: "/pourquoi-steero#fondements-comportementaux" },
  { key: "e", result: "ritualize", link: "/pourquoi-steero#fondements-comportementaux" },
  { key: "m", result: "master", link: null },
  { key: "p", result: "position", link: null },
  { key: "o", result: "orient", link: null },
] as const;

const PAIRS = ["ba1", "ba2", "ba3"] as const;

const TempoAccordion = () => {
  const { t } = useTranslation();
  const [ouvert, setOuvert] = useState(0);
  const idBase = useId();

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {RITUALS.map((ritual, i) => {
        const open = i === ouvert;
        const panelId = `${idBase}-panel-${ritual.key}`;
        return (
          <div
            key={ritual.key}
            onClick={() => setOuvert(i)}
            /*
              Le `flex` ne vit qu'à partir de `lg`. Posé en inline sans media
              query, il s'appliquait aussi à la colonne mobile, où
              `flex-basis: 0` gouverne la HAUTEUR : cinq cartes de 42 px, la
              lettre coupée. La part de croissance passe par une variable CSS,
              seule chose qu'un style inline sache poser sous condition d'écran.

              4.5 et non 3 : `flex-basis: 0` en border-box ne descend pas sous
              le padding, donc la carte ouverte reçoit 4,5/8,5 de l'espace
              restant APRÈS les cinq paddings, soit ~490 px sur 1280. En
              dessous, le panneau se replie sur 230 px et chaque tiret prend
              trois lignes.
            */
            style={{ "--grow": open ? 4.5 : 1 } as React.CSSProperties}
            className={`group flex min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl border bg-card p-5 lg:flex-row lg:gap-6 lg:min-h-[230px] lg:flex-[var(--grow)_1_0%] lg:transition-[flex,border-color,box-shadow] lg:duration-500 lg:ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none ${
              open ? "border-primary/25 shadow-card" : "border-border/60 hover:border-border"
            }`}
          >
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={(e) => {
                e.stopPropagation();
                setOuvert(i);
              }}
              className={`flex shrink-0 flex-row items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg lg:flex-col lg:items-start lg:gap-0 ${
                open ? "lg:w-[128px]" : "lg:w-full"
              }`}
            >
              <TempoLetter letter={t(`tempo.rituals.${ritual.key}.letter`)} size="lg" className="ring-0 rounded-xl lg:mb-3" />
              <span className="min-w-0">
                <span className="block font-semibold text-foreground text-base leading-tight">
                  {t(`tempo.rituals.${ritual.key}.name`)}
                </span>
                <span className="block text-xs text-muted-foreground mt-0.5">
                  {t(`tempo.rituals.${ritual.key}.freq`)}
                </span>
              </span>
              <span
                className={`hidden lg:block mt-auto pt-4 text-[13px] leading-snug text-muted-foreground transition-opacity duration-300 ${
                  open ? "opacity-100 delay-200" : "opacity-0"
                }`}
              >
                {t(`tempo.rituals.${ritual.key}.desc`)}
              </span>
            </button>

            <div
              id={panelId}
              aria-hidden={!open}
              /*
                Sous `lg`, la hauteur s'anime (max-height) : c'est l'accordéon
                vertical. À partir de `lg`, elle ne s'anime PAS : mesuré le
                07/09, la largeur du panneau qui se ferme tombe à zéro d'un
                coup pendant que sa hauteur descend en 300 ms, le texte
                s'empile mot par mot sur 420 px et toute la rangée saute de
                260 à 460 px le temps de la transition. En desktop, seuls
                l'opacité et le glissement s'animent ; la hauteur est coupée
                net, et `overflow-hidden` retient le texte empilé.
              */
              className={`flex min-w-0 flex-col justify-center overflow-hidden transition-[opacity,transform,max-height] duration-300 lg:transition-[opacity,transform] lg:border-l lg:border-border/60 lg:pl-6 ${
                open
                  ? "max-h-[420px] lg:max-h-none opacity-100 translate-x-0 delay-200 lg:flex-1"
                  : "max-h-0 lg:max-h-none opacity-0 lg:translate-x-3 pointer-events-none lg:w-0 lg:pl-0 lg:border-0"
              }`}
            >
              {/*
                LE CONTENU A UNE LARGEUR À LUI, PAS CELLE DU PANNEAU. Vu par
                Ronald le 08/09 dans son Chrome : pendant les 500 ms où la
                carte cliquée grandit, son panneau est déjà « ouvert » mais
                encore large de quelques pixels, le texte s'y empile mot par
                mot sur 740 px et toute la rangée saute, deux cartes larges et
                vides. Avec une largeur propre, le texte se met en page une
                fois pour toutes ; la carte, en `overflow-hidden`, le découvre
                en grandissant. Effet second et bienvenu : les cinq panneaux
                ayant la même largeur, la rangée garde la même hauteur quelle
                que soit la carte ouverte.

                LA LARGEUR SE CALCULE, ELLE NE SE DEVINE PAS. Première valeur
                posée à 290 px : le panneau mesure 298, mais 24 px de `pl-6`
                sont dedans, le contenu n'a que 274, et « d'œil » comme
                « seule » perdaient leurs dernières lettres derrière
                `overflow-hidden` (capture de Ronald, 08/09). La carte ouverte
                reçoit 4,5/8,5 de (conteneur − 4 écarts − 5 paddings) plus son
                padding ; on lui retire 40 de padding, 128 de colonne gauche,
                24 d'écart et 24 de `pl-6` :
                  1024 → carte 414, contenu 195 → 190
                  1088 → carte 448, contenu 229 → 226
                  1152+ → carte 490, contenu 271 → 270
                Valeurs MESURÉES dans le navigateur, pas calculées : la
                première estimation (230 à 1088) dépassait le contenu d'un
                pixel. Toujours quelques pixels sous la mesure, un arrondi de
                sous-pixel suffit à couper une lettre.
              */}
              <div className="lg:w-[190px] min-[1088px]:w-[226px] min-[1152px]:w-[270px]">
              <h3 className="font-serif text-xl md:text-2xl font-normal text-foreground mb-3">
                {t(`differentiation.${ritual.result}.title`)}
              </h3>
              <ul className="space-y-2">
                {PAIRS.map((ba) => (
                  <li key={ba} className="flex items-start gap-2.5">
                    <span className="shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center text-[10px] text-primary font-medium">
                      ✓
                    </span>
                    <p className="text-foreground text-sm leading-snug font-medium">
                      {t(`differentiation.${ritual.result}.${ba}.after`)}
                    </p>
                  </li>
                ))}
              </ul>
              {ritual.link && (
                <Link
                  to={ritual.link}
                  tabIndex={open ? 0 : -1}
                  onClick={(e) => e.stopPropagation()}
                  className="group/link inline-flex items-center mt-4 text-sm text-primary font-medium transition-transform duration-300 hover:translate-x-1"
                >
                  {t(`differentiation.${ritual.result}.link`)}
                  <span className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                </Link>
              )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TempoAccordion;
