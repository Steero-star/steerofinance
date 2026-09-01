import { ChevronDown } from "lucide-react";

/**
 * LE CHEVRON QUI PIVOTE — la seule chose que les trois surfaces partagent.
 *
 * On mutualise la RÈGLE (fermé pointe vers le bas, ouvert pointe vers le haut,
 * 300 ms entre les deux), pas la mise en page : les constats l'affichent au bout
 * d'une ligne pleine largeur, les fonctionnalités au bout d'une rangée. Forcer
 * un composant à porter les deux cadres aurait produit une abstraction à
 * rallonge de props pour économiser six lignes.
 *
 * `aria-hidden` : le bouton porte déjà `aria-expanded`, un lecteur d'écran
 * annonce donc l'état sans avoir besoin du dessin.
 */
export const ChevronDepli = ({ ouvert, className = "" }: { ouvert: boolean; className?: string }) => (
  <ChevronDown
    aria-hidden="true"
    className={`shrink-0 transition-transform duration-300 ${ouvert ? "rotate-180" : ""} ${className}`}
  />
);

/**
 * LE SIGNAL QU'UNE CARTE S'OUVRE, ET CE QU'ELLE CACHE.
 *
 * ## Deux causes, pas une
 *
 * Les constats de l'accueil et les principes de « Pourquoi Steero » se déplient
 * au clic depuis leur création, et personne ne les déplie.
 *
 * 1. **La carte a l'air finie.** Un grand chiffre et une phrase complète, sans
 *    troncature ni « … » : le lecteur la marque comme lue et passe. Le seul
 *    retour existant était un survol, invisible avant de survoler et absent au
 *    tactile, là où arrive la majorité du trafic payant.
 * 2. **Rien ne dit ce qu'il y a derrière.** Un chevron seul répond « ça
 *    s'ouvre », jamais « pourquoi l'ouvrir ». C'est la seconde question qui
 *    décide du clic.
 *
 * D'où une ligne qui répond aux deux d'un coup : le libellé nomme le contenu
 * caché, le chevron dit que c'est une commande, et il pivote pour confirmer le
 * geste — le même signal sert d'invitation puis d'accusé de réception.
 *
 * ## Ce que cette ligne ne doit jamais devenir
 *
 * Un filet suivi d'un texte gris en bas de carte, c'est la forme d'une note de
 * bas de page, donc d'une FIN. C'est exactement la lecture qu'on combat. Deux
 * choses l'empêchent, et aucune n'est décorative : le chevron collé au bord
 * droit, qui relève de la grammaire des commandes et pas de celle des
 * citations, et un libellé écrit comme une PROMESSE (« ce que ça change »)
 * plutôt que comme une source. Y mettre la référence de l'étude refermerait la
 * carte au lieu de l'ouvrir, en plus de déborder : ces références font jusqu'à
 * soixante-dix caractères.
 *
 * ## Pourquoi 10,5 px et pas 11
 *
 * Mesure faite au point de rupture `md`, le cas le plus etroit : les cartes
 * de l'accueil y font 222 px, soit 152 px utiles une fois le chevron pose.
 * « The study and what it changes » en occupait 153. Un demi-point plus bas,
 * les six libelles des trois langues passent, et le signal y gagne : on
 * cherchait de toute facon le murmure, pas la mention legale.
 *
 * ## Porte unique
 *
 * Les deux surfaces importent le même signal, pour qu'apprendre le geste sur
 * l'accueil le rende lisible sur « Pourquoi Steero ». Un jour où il faudra le
 * remplacer, il n'y aura qu'un endroit à toucher.
 */
const IndiceDepli = ({ label, ouvert }: { label: string; ouvert: boolean }) => (
  <span className="mt-4 flex items-center justify-between gap-2 border-t border-border/50 pt-3 text-[10.5px] leading-none text-muted-foreground/70 transition-colors duration-300 group-hover:text-primary">
    {label}
    <ChevronDepli ouvert={ouvert} className="w-3.5 h-3.5" />
  </span>
);

export default IndiceDepli;
