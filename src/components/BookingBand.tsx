import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowUpRight } from "lucide-react";
import { bookCall } from "@/lib/analytics";

/**
 * L'ÉCHANGE DE 30 MINUTES AVEC LE FONDATEUR.
 *
 * ## Pourquoi ce bloc est volontairement plus calme que le CTA d'essai
 *
 * Le produit est self-serve : quelqu'un qui allait créer son compte en quarante
 * secondes ne doit pas trouver ici une raison de reporter à J+4. La réservation
 * est donc un RATTRAPAGE, pas une offre concurrente — carte bordée là où l'essai
 * est un aplat de couleur, verbe `Réserver` là où l'essai dit `Commencer`.
 *
 * Corollaire de placement, à tenir : **jamais dans un héros, jamais dans la
 * nav.** Il vit en bas de page, après que le visiteur a lu et n'a pas décidé.
 *
 * ## Ce que la copy ne doit pas devenir
 *
 * Le mot « démo » est absent, et ce n'est pas une préférence de style : il met
 * le visiteur en posture de prospect et laisse entendre que le produit a besoin
 * d'être expliqué. Surtout, l'appel montre un PRODUIT sur un cas, il ne délivre
 * pas de conseil financier — Steero est édité en entreprise individuelle, pas
 * par un conseiller en investissements financiers. Cette frontière tient dans
 * les verbes de `booking.body` : « je te montre », jamais « je te conseille ».
 */
const BookingBand = ({ location }: { location: string }) => {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-border/60 bg-card px-7 md:px-10 py-9 flex flex-col md:flex-row items-start md:items-center gap-7 shadow-soft"
        >
          <div className="flex-1">
            <p className="text-sm font-semibold tracking-widest text-primary mb-3 uppercase">
              {t("booking.label")}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl font-normal leading-[1.15] tracking-tight text-foreground mb-3">
              {t("booking.title")}{" "}
              <em className="italic text-primary">{t("booking.titleEm")}</em>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              {t("booking.body")}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-center gap-2 shrink-0">
            <button
              onClick={() => bookCall(location)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-primary text-primary font-semibold transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 group"
            >
              {t("booking.cta")}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <p className="text-xs text-muted-foreground md:text-center max-w-[22rem]">
              {t("booking.micro")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingBand;
