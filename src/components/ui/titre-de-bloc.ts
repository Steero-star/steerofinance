import { cn } from "@/lib/utils";

/**
 * LE SURTITRE — le titre de bloc de Steero, la même recette que dans l'app (bible :
 * `steero_design_system.html`, onglet Typographie). DM Mono 11 px, graisse 500,
 * majuscules, approche 0,07em, couleur atténuée. Il coiffe une section, une carte,
 * une étiquette.
 *
 * Une page n'écrit jamais `uppercase`, ni une approche, ni `font-mono` pour ce rôle :
 * elle pose `TITRE_DE_BLOC`, ou `titreDeBloc(…)` quand le lieu ajoute quelque chose.
 * Seules la couleur (`text-primary`, `text-inherit`) et la mise en page se surchargent.
 */
export const TITRE_DE_BLOC =
  "font-mono text-[11px] font-medium uppercase tracking-[0.07em] text-muted-foreground";

/** La classe du surtitre, avec ce que le lieu ajoute (couleur, marges). */
export function titreDeBloc(...classes: Array<string | undefined | false | null>) {
  return cn(TITRE_DE_BLOC, ...classes);
}
