import { cn } from "@/lib/utils";

/**
 * Mapping unique des couleurs TEMPO partagé sur tout le site.
 * Gradient thermique validé (chaud/opérationnel → froid/stratégique) — steero_brand_guidelines.html.
 * Doit rester l'unique source de vérité.
 */
export const tempoLetterColors: Record<string, string> = {
  T: "bg-[#F43F5E] text-white",
  E: "bg-[#F59E0B] text-white",
  M: "bg-[#00C896] text-white",
  P: "bg-[#8B5CF6] text-white",
  O: "bg-[#356FFD] text-white",
};

type TempoLetterSize = "sm" | "lg";

interface TempoLetterProps {
  letter: string;
  /**
   * "sm" = pastille inline (badges de cartes, en-têtes de groupe, tableaux compacts)
   * "lg" = pastille circulaire mise en avant (hero rituels, tableau TEMPO)
   */
  size?: TempoLetterSize;
  className?: string;
}

const sizeClasses: Record<TempoLetterSize, string> = {
  sm: "w-7 h-7 rounded-md text-xs",
  lg: "w-11 h-11 rounded-full text-lg ring-4 ring-background",
};

export const TempoLetter = ({ letter, size = "sm", className }: TempoLetterProps) => {
  const color = tempoLetterColors[letter] ?? "bg-primary text-primary-foreground";
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-bold shrink-0",
        sizeClasses[size],
        color,
        className,
      )}
    >
      {letter}
    </span>
  );
};

export default TempoLetter;
