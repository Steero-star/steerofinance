import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/**
 * UNE CAPTURE D'ÉCRAN QU'ON PEUT VRAIMENT AGRANDIR.
 *
 * ## Le zoom d'avant n'agrandissait rien
 *
 * Les images étaient ouvertes dans un `DialogContent max-w-6xl`, soit 1152 px de
 * large, alors que les fichiers font 1920 px. Cliquer sur « agrandir » affichait
 * donc l'image PLUS PETITE que sa taille réelle : le seul effet visible était
 * l'assombrissement du fond. Deux des cinq emplacements du site n'avaient même
 * aucun zoom.
 *
 * ## Ce que celui-ci fait
 *
 * Il ouvre la capture en plein écran à sa taille native, avec trois gestes qui
 * n'ont pas besoin d'être expliqués : la molette zoome au pointeur, le glissé
 * déplace, le clic bascule entre « tout voir » et « taille réelle ». Échap et le
 * clic sur le fond referment.
 *
 * ## Le zoom se fait AU POINTEUR, pas au centre
 *
 * C'est la seule subtilité du fichier, et elle décide de tout le confort. Zoomer
 * vers le centre oblige à repositionner l'image après chaque cran de molette,
 * parce que le détail visé s'échappe. On garde donc fixe le point survolé :
 *
 *   offset' = p − (p − offset) × (échelle' / échelle)
 *
 * ## Deux sources, deux usages
 *
 * `src` est la version d'affichage, `src2x` la source native. Envoyer 2880 px à
 * une vignette de 700 px coûte du chargement pour rien ; ne servir que 1440 px à
 * la visionneuse la priverait de ce qu'elle a à montrer. Le `srcSet` tranche
 * pour la vignette, la visionneuse prend toujours la plus grande.
 */

interface ZoomableShotProps {
  /** Version d'affichage (webp, largeur ~1440). */
  src: string;
  /** Source native (webp, largeur ~2880). Sans elle, `src` sert aux deux. */
  src2x?: string;
  /** Repli pour les navigateurs sans webp. */
  fallback?: string;
  alt: string;
  /** Classes de la vignette, pour que chaque section garde sa mise en page. */
  className?: string;
  /**
   * Classes de l'image ELLE-MÊME. Par défaut la capture prend sa hauteur
   * naturelle. `MethodResults` la veut en fond recadré derrière son panneau de
   * texte : sans ce crochet, il faudrait soit renoncer au zoom, soit renoncer à
   * sa mise en page. La transition de survol est ajoutée par le composant, elle
   * n'a pas à être redite ici.
   */
  imgClassName?: string;
  loading?: "lazy" | "eager";
}

const ECHELLE_MIN = 1;
const ECHELLE_MAX = 6;

const ZoomableShot = ({
  src,
  src2x,
  fallback,
  alt,
  className = "",
  imgClassName = "w-full h-auto block",
  loading = "lazy",
}: ZoomableShotProps) => {
  const { t } = useTranslation();
  const [ouvert, setOuvert] = useState(false);
  const [echelle, setEchelle] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const glisse = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const zone = useRef<HTMLDivElement>(null);

  const grande = src2x ?? src;
  const jeuDeSources = src2x ? `${src} 1x, ${src2x} 2x` : undefined;

  const reinitialiser = useCallback(() => {
    setEchelle(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  // Rouvrir sur l'état où l'on avait laissé la visionneuse serait déroutant :
  // on retrouve une image déjà zoomée sur un détail sans savoir pourquoi.
  useEffect(() => {
    if (!ouvert) reinitialiser();
  }, [ouvert, reinitialiser]);

  const zoomerVers = useCallback(
    (nouvelle: number, px: number, py: number) => {
      const bornee = Math.min(ECHELLE_MAX, Math.max(ECHELLE_MIN, nouvelle));
      setOffset((prec) => {
        if (bornee === ECHELLE_MIN) return { x: 0, y: 0 };
        const ratio = bornee / echelle;
        return { x: px - (px - prec.x) * ratio, y: py - (py - prec.y) * ratio };
      });
      setEchelle(bornee);
    },
    [echelle],
  );

  const surMolette = (e: React.WheelEvent) => {
    e.preventDefault();
    const rect = zone.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    // Un facteur multiplicatif plutôt qu'additif : le zoom avance du même pas
    // visuel qu'on soit à 1× ou à 5×.
    zoomerVers(echelle * (e.deltaY < 0 ? 1.25 : 0.8), px, py);
  };

  const surClic = (e: React.MouseEvent) => {
    // Un clic qui termine un déplacement ne doit pas rebasculer le zoom.
    if (glisse.current) return;
    const rect = zone.current?.getBoundingClientRect();
    if (!rect) return;
    const px = e.clientX - rect.left - rect.width / 2;
    const py = e.clientY - rect.top - rect.height / 2;
    zoomerVers(echelle > 1.05 ? 1 : 2.5, px, py);
  };

  const debutGlisse = (e: React.PointerEvent) => {
    if (echelle <= 1) return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    glisse.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
  };

  const pendantGlisse = (e: React.PointerEvent) => {
    const g = glisse.current;
    if (!g) return;
    setOffset({ x: g.ox + (e.clientX - g.x), y: g.oy + (e.clientY - g.y) });
  };

  const finGlisse = () => {
    // Différé d'un tour de boucle : sinon le `click` qui suit le relâchement
    // passe avant, voit `glisse` à null et rebascule le zoom sous les doigts.
    setTimeout(() => {
      glisse.current = null;
    }, 0);
  };

  return (
    <Dialog open={ouvert} onOpenChange={setOuvert}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label={t("showcase.zoomLabel", { name: alt })}
          className={`group block w-full cursor-zoom-in rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className}`}
        >
          <picture>
            <source srcSet={jeuDeSources ?? src} type="image/webp" />
            <img
              src={fallback ?? src}
              alt={alt}
              loading={loading}
              decoding="async"
              className={`${imgClassName} transition-transform duration-500 ease-out group-hover:scale-[1.02]`}
            />
          </picture>
        </button>
      </DialogTrigger>

      {/* `DialogContent` rend deja sa propre croix de fermeture : en ajouter une
          seconde donnerait deux cibles pour le meme geste, dont une non reliee au
          focus trap. */}
      <DialogContent className="max-w-none w-screen h-screen border-none bg-background/95 p-0 shadow-none rounded-none sm:rounded-none">
        <DialogTitle className="sr-only">{alt}</DialogTitle>

        <div
          ref={zone}
          className="relative w-full h-full overflow-hidden flex items-center justify-center touch-none select-none"
          onWheel={surMolette}
          onClick={surClic}
          onPointerDown={debutGlisse}
          onPointerMove={pendantGlisse}
          onPointerUp={finGlisse}
          onPointerCancel={finGlisse}
          style={{ cursor: echelle > 1.05 ? "grab" : "zoom-in" }}
        >
          <img
            src={grande}
            alt={alt}
            draggable={false}
            className="max-w-[96vw] max-h-[92vh] w-auto h-auto"
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${echelle})`,
              // Pas de transition pendant un glissé : l'image traînerait derrière
              // le doigt d'un dixième de seconde, ce qui se sent immédiatement.
              transition: glisse.current ? "none" : "transform 120ms ease-out",
              transformOrigin: "center center",
            }}
          />


          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground bg-background/80 rounded-full px-3 py-1.5 pointer-events-none">
            {t("showcase.zoomHint", {
              defaultValue: "Molette pour zoomer · glisser pour déplacer · Échap pour fermer",
            })}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ZoomableShot;
