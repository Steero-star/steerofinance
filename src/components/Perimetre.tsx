import {
  ArrowRight,
  Banknote,
  CalendarCheck,
  CalendarClock,
  Coins,
  Gauge,
  HandCoins,
  Landmark,
  Target,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

/**
 * LA LIGNE DE PÉRIMÈTRE (08/09/2026).
 *
 * La home vendait le pilotage et ne disait jamais le périmètre. Quelqu'un qui
 * cherche un outil de budget a une liste de contrôle en tête avant d'avoir
 * une méthode : mes comptes, mes espèces, mes tickets resto, ce que je dois à
 * un ami, mes abonnements, mes objectifs. Les termes de recherche de la
 * semaine Ads le disent avec leurs mots : « appli pour faire ses comptes »,
 * « logiciel compte et budget ». Faire ses comptes, pas piloter.
 *
 * Huit pastilles, une neuvième « à venir », un titre, une ligne, aucun
 * paragraphe : une liste de contrôle se scanne, elle ne se lit pas. Pas de
 * deuxième bande bleue (idée écartée avec Ronald) : la bande du hero porte
 * une promesse, ici c'est de la réassurance, sur fond neutre.
 *
 * Elle vit juste sous la bande bleue, avant L'expérience (Ronald, 08/09) :
 * la bande promet, la ligne dit avec quoi, L'expérience montre ce qu'on
 * fait. Le visiteur vérifie sa liste avant de regarder une démonstration.
 *
 * Chaque pastille correspond à quelque chose que l'app fait aujourd'hui :
 * les comptes sont nommés librement (l'app dit « Espèces », on garde son
 * mot), Tiers porte les dettes et créances entre personnes, Récurrents les
 * charges fixes, Projets les objectifs, Mon avancement le suivi du budget,
 * Mes rituels les rendez-vous guidés. La seule promesse est signalée comme
 * telle : le patrimoine, en pastille pointillée avec son étiquette « à
 * venir », la même position que sur Fonctionnalités (« Ça arrive »). Rien
 * ne se lit comme livré s'il ne l'est pas.
 */
const ICONES = [
  Landmark,
  Banknote,
  Coins,
  HandCoins,
  CalendarClock,
  Gauge,
  CalendarCheck,
  Target,
] as const;

const Perimetre = () => {
  const { t } = useTranslation();
  const items = t("perimetre.items", { returnObjects: true }) as string[];

  return (
    <section className="bg-background py-12" aria-labelledby="perimetre-titre">
      <div className="container mx-auto max-w-6xl px-6">
        {/*
          3/12 pour le titre, 9/12 pour les pastilles. À 4/12, six pastilles
          se rangeaient déjà sur quatre lignes dans 690 px. Les libellés
          restent courts pour la même raison : Fonctionnalités détaille, ici
          on énumère.
        */}
        <div className="grid gap-6 lg:grid-cols-[3fr_9fr] lg:items-center lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2
              id="perimetre-titre"
              className="font-serif text-2xl font-normal leading-tight tracking-tight text-foreground md:text-3xl"
            >
              {t("perimetre.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("perimetre.lead")}</p>
            <Link
              to="/fonctionnalites"
              className="group mt-3 inline-flex items-center text-sm font-medium text-primary transition-transform duration-300 hover:translate-x-1"
            >
              {t("perimetre.link")}
              <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/*
            `ul` et non une grille de cartes : ce sont des pastilles, pas des
            blocs, et `flex-wrap` les laisse se ranger selon la largeur sans
            qu'une colonne reste orpheline. Le survol ne fait rien : rien
            n'est cliquable ici, le lien est à gauche.
          */}
          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2.5"
          >
            {items.map((item, i) => {
              const Icone = ICONES[i] ?? Coins;
              return (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-3.5 py-2 text-sm text-foreground"
                >
                  <Icone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              );
            })}
            {/*
              La pastille « à venir » : pointillés, fond teinté, texte
              atténué, étiquette. Elle dit la même chose que les autres (« ça
              fait partie du périmètre ») avec une réserve visible, comme le
              bloc « Ça arrive » de Fonctionnalités.
            */}
            <li className="inline-flex items-center gap-2 rounded-full border border-dashed border-primary/40 bg-primary/5 px-3.5 py-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4 shrink-0 text-primary/70" aria-hidden="true" />
              <span>{t("perimetre.soon")}</span>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                {t("perimetre.soonTag")}
              </span>
            </li>
          </motion.ul>
        </div>
      </div>
    </section>
  );
};

export default Perimetre;
