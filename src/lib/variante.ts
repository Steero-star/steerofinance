/**
 * TEST A/B DU PREMIER ÉCRAN — la variante vient de l'URL, jamais d'un tirage.
 *
 * Le 09/09/2026, la home « budget » v3.5 (H1 + trois puces + prix) avait
 * produit 2 inscriptions froides sur ~22 clics payants, le hero v4 (une ligne,
 * bande bleue) 0 sur 38. Deux évènements contre zéro : rien de mesurable, et
 * revenir en arrière aurait tué la seule mesure en cours. D'où un vrai test :
 * deux premiers écrans EN MÊME TEMPS sur le même trafic.
 *
 * QUI TIRE AU SORT : Google Ads. Un « Test » de campagne coupe le trafic en
 * deux bras 50/50 et donne à chacun son URL finale : `/?v=a` (hero v4) et
 * `/?v=b` (hero v3.5). Le site ne tire donc rien lui-même : pas d'écran qui
 * clignote entre deux variantes, pas de biais de navigateur, et le
 * dénominateur exact (clics par bras) se lit dans Ads.
 *
 * QUI COMPTE : Vercel Analytics, sur 100 % des visiteurs et sans consentement,
 * parce qu'il compte des CHEMINS. L'inscription Clerk revient donc sur
 * `/bienvenue/a` ou `/bienvenue/b` selon le bras, et non sur `/bienvenue`
 * seul. Un paramètre de requête ne suffirait pas : Vercel le retire avant de
 * compter.
 *
 * SANS PARAMÈTRE (organique, direct, lien interne), il n'y a pas de variante :
 * le hero v4 s'affiche et le retour reste `/bienvenue`. Ainsi `/bienvenue/a`
 * et `/bienvenue/b` ne comptent QUE le trafic du test, et se comparent aux
 * clics par bras sans rien retrancher.
 *
 * LA MÉMOIRE DE SESSION : le clic payé arrive sur `/?v=b`, mais le visiteur
 * peut passer par Fonctionnalités avant de cliquer « Commencer maintenant ».
 * La variante est donc gardée en `sessionStorage`, portée d'un onglet, morte
 * à sa fermeture. Le bouton ouvre Clerk dans un nouvel onglet avec l'URL de
 * retour déjà calculée : ce nouvel onglet n'a rien à retenir.
 *
 * Le HTML prérendu ne connaît pas l'URL : il porte toujours la variante A, et
 * le bras B ne voit son hero qu'après l'hydratation. Quelques dizaines de
 * millisecondes, assumées.
 */
export type Variante = "a" | "b";

export const PARAMETRE_VARIANTE = "v";
const CLE_SESSION = "steero_hero_variante";

const estVariante = (valeur: string | null): valeur is Variante =>
  valeur === "a" || valeur === "b";

/**
 * Lit la variante une fois, au chargement du module, donc avant le premier
 * rendu : le hero n'est jamais peint dans une variante puis repeint dans
 * l'autre. L'URL prime sur la session, la session prime sur rien.
 */
const lireVariante = (): Variante | null => {
  if (typeof window === "undefined") return null;
  const depuisUrl = new URLSearchParams(window.location.search).get(PARAMETRE_VARIANTE);
  if (estVariante(depuisUrl)) {
    try {
      sessionStorage.setItem(CLE_SESSION, depuisUrl);
    } catch {
      // Stockage indisponible : la variante vaut pour cette page seulement.
    }
    return depuisUrl;
  }
  try {
    const depuisSession = sessionStorage.getItem(CLE_SESSION);
    if (estVariante(depuisSession)) return depuisSession;
  } catch {
    // Idem : sans stockage, pas de mémoire entre les pages.
  }
  return null;
};

/** `null` hors test : le site se comporte comme avant. */
export const VARIANTE: Variante | null = lireVariante();

/**
 * Chemin de retour après l'inscription Clerk. Une seule porte : c'est cette
 * fonction, et elle seule, qui décide si l'inscription est comptée dans un
 * bras du test ou dans le tout-venant.
 */
export const cheminBienvenue = (variante: Variante | null = VARIANTE): string =>
  variante ? `/bienvenue/${variante}` : "/bienvenue";
