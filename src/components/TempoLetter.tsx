import { cn } from "@/lib/utils";

/**
 * Mapping unique des couleurs TEMPO partagé sur tout le site.
 * Doit rester l'unique source de vérité (cf. test src/test/tempo-letter-colors.test.ts).
 */
export const tempoLetterColors: Record<string, string> = {
  T: "bg-green-600 text-white",
  E: "bg-yellow-600 text-white",
  M: "bg-emerald-700 text-white",
  P: "bg-primary text-primary-foreground",
  O: "bg-amber-700 text-white",
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
