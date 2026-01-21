import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Lightbulb, AlertCircle, Share2, Check, List, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useWaitlist } from "@/contexts/WaitlistContext";

interface Article {
  id: number;
  titleKey: string;
  hookKey: string;
  content: string;
  tagsKey: string;
}

// Article content is kept in French as the main content - titles/hooks are translated
const getArticles = (t: (key: string, options?: Record<string, unknown>) => string): Article[] => [
  {
    id: 1,
    titleKey: "blog.articles.1.title",
    hookKey: "blog.articles.1.hook",
    tagsKey: "blog.articles.1.tags",
    content: `Pourquoi la gestion des finances personnelles n'est pas innée

Contrairement aux idées reçues, être à l'aise avec l'argent n'est pas une question de talent ou de chance.

La gestion financière personnelle est une compétence acquise, qui repose sur :
• la compréhension de ses revenus et dépenses,
• la capacité à structurer un budget,
• et la prise de décisions conscientes dans le temps.

Sans méthode claire, beaucoup fonctionnent au ressenti, à l'urgence, ou en évitant le sujet financier. Ce flou est la principale source de stress financier.

Comprendre son argent pour reprendre le contrôle financier

Un mythe également très répandu consiste à penser que le problème vient uniquement du niveau de revenu, bien souvent gagner plus d'argent ne suffit pas à mieux gérer ses finances car en réalité :
• plus de revenus = plus de décisions financières,
• plus de flux = plus de complexité,
• plus de comptes = plus de confusion… sans cadre adapté.

Sans compréhension financière :
• les dépenses augmentent avec les revenus,
• l'épargne reste irrégulière,
• les objectifs financiers sont repoussés.

Ce n'est pas le montant gagné qui sécurise, mais la capacité à piloter ses finances personnelles.

Comprendre ses finances personnelles, ce n'est pas devenir expert en finance.

C'est savoir :
• combien on gagne réellement,
• combien on dépense,
• et comment ces choix impactent le futur.

Une bonne compréhension financière permet :
• de réduire le stress lié à l'argent,
• de prendre de meilleures décisions budgétaires,
• d'aligner ses dépenses avec ses priorités de vie.

La clarté financière est le premier pas vers la liberté financière.

La finance personnelle est une compétence qui se développe avec le temps

Apprendre à gérer son argent ne se fait pas en un jour. La montée en compétences financières suit généralement plusieurs étapes :

1. Observer ses finances sans jugement
2. Structurer ses budgets et catégories
3. Analyser les écarts entre prévu et réel
4. Décider en fonction de ses objectifs

L'essentiel n'est pas d'être parfait, mais d'avoir un cadre simple et évolutif alors comment Steero t'aide à mieux comprendre tes finances personnelles ?

Steero a été conçu pour répondre à un besoin simple : rendre la gestion financière compréhensible, structurée et accessible.

Contrairement aux outils complexes ou trop techniques, Steero permet :
• une vision claire de ses finances globales,
• une structuration budgétaire flexible,
• un suivi ritualisé, rapide et durable,
• une montée en compétences progressive.

L'objectif n'est pas seulement de suivre des chiffres, mais de comprendre pour mieux décider.

Conclusion : apprendre à gérer son argent change durablement la relation à l'argent

La gestion des finances personnelles n'est pas réservée aux experts. C'est une compétence accessible à tous, à condition d'avoir :
• un cadre clair,
• un outil adapté,
• et un rituel simple.

Avant d'optimiser, d'investir ou de chercher plus de rendement, il faut d'abord comprendre ses finances.

Tu souhaites mieux comprendre et gérer tes finances personnelles ?

Steero t'aide à :
• clarifier ton budget,
• structurer tes finances,
• et monter en compétences à ton rythme.

Commence par poser des bases solides pour ton avenir financier.`
  },
  {
    id: 2,
    titleKey: "blog.articles.2.title",
    hookKey: "blog.articles.2.hook",
    tagsKey: "blog.articles.2.tags",
    content: `De la gestion subie au pilotage financier

On peut schématiser la relation à l'argent en deux grandes situations :

Subir ses finances
Argent flou, décisions réactives, stress latent.

Piloter ses finances
Vision claire, arbitrages conscients, décisions alignées avec ses objectifs.

La différence entre les deux n'est pas le revenu, mais le niveau de compétence financière.

Étape 1 : Observer ses finances sans jugement

La première étape n'est ni le budget, ni l'épargne, ni l'investissement. C'est l'observation.

Observer, c'est :
• voir ses revenus et ses dépenses,
• identifier les grandes catégories,
• comprendre ses habitudes financières.

Sans jugement, sans culpabilité.

Tant que l'argent reste flou, aucune décision solide n'est possible.

Étape 2 : Structurer pour donner du sens aux chiffres

Une fois les flux visibles, vient la structuration.

Structurer ses finances, c'est :
• organiser ses dépenses par catégories,
• poser des budgets simples,
• distinguer l'essentiel du variable.

Cette étape transforme des chiffres isolés en information exploitable.

Étape 3 : Comprendre les écarts pour mieux décider

Un budget parfait n'existe pas.

Les écarts sont normaux :
• un mois plus cher que prévu,
• une dépense imprévue,
• une priorité qui change.

Le problème n'est pas l'écart, mais le fait de ne pas le voir.

Comprendre ses écarts permet :
• d'ajuster ses décisions,
• d'éviter les mauvaises surprises,
• de reprendre le contrôle sans se restreindre.

Étape 4 : Décider en fonction de ses objectifs

C'est ici que la gestion financière devient réellement utile. Quand la vision est claire, on peut :
• arbitrer sans stress,
• aligner ses dépenses avec ses objectifs,
• donner un rôle précis à chaque euro.

L'argent cesse d'être une source d'anxiété pour devenir un outil au service de ses projets.

Pourquoi la montée en compétences financières échoue souvent

Beaucoup abandonnent à cette étape pour trois raisons principales :

1. Des outils trop complexes
Pensés pour des experts, pas pour progresser.

2. Un suivi trop lourd
Trop chronophage pour durer.

3. Aucun cadre évolutif
Tout ou rien, sans progression naturelle.

Résultat : motivation au départ, abandon quelques semaines plus tard.

Comment Steero accompagne la montée en compétences financières

Steero a été conçu comme un parcours, pas comme un simple outil de suivi te permettant :
• d'observer ses finances simplement,
• de structurer progressivement ses budgets,
• de visualiser les écarts sans culpabilité,
• de ritualiser le suivi pour durer dans le temps.

L'objectif n'est pas de devenir expert en finance, mais de monter en compétences à son rythme, avec un cadre clair.

Conclusion : piloter ses finances est une compétence accessible

Personne ne naît en sachant gérer son argent. Mais tout le monde peut apprendre à le piloter.

La montée en compétences financières repose sur :
• la clarté,
• la régularité,
• et des outils pensés pour accompagner, pas pour complexifier.

Passer du flou au pilotage, c'est reprendre le contrôle de son avenir financier.

Tu souhaites passer du flou au pilotage de tes finances ?

Steero t'aide à :
• comprendre tes finances,
• structurer ton budget,
• et progresser étape par étape.

Commence par voir clair. Le reste suivra.`
  },
  {
    id: 3,
    titleKey: "blog.articles.3.title",
    hookKey: "blog.articles.3.hook",
    tagsKey: "blog.articles.3.tags",
    content: `Le vrai problème des outils financiers modernes

La majorité des outils de gestion financière échouent pour une raison simple : ils supposent que l'utilisateur va s'adapter à l'outil.

Dans la réalité :
• les interfaces peuvent être complexes,
• les actions et/ou connaissances demandées peuvent être nombreuses,
• le suivi prend trop de temps.

Résultat :
• enthousiasme au début,
• effort perçu comme trop important,
• abandon progressif.

Ce n'est pas un problème de discipline, mais de conception.

Rituel financier : de quoi parle-t-on vraiment ?

Un rituel financier n'est pas :
• un long bilan mensuel,
• une session Excel de deux heures,
• une contrainte rigide.

Un rituel, c'est :
• une action simple,
• répétée régulièrement,
• intégrée naturellement dans le quotidien.

Le rituel transforme la gestion financière en habitude, pas en corvée c'est pourquoi la régularité vaut mieux que la perfection sans nécessairement tout suivre, tout comprendre ou tout optimiser.

En réalité, la régularité est bien plus importante que la précision : quelques minutes par semaine permettent d'identifier les dérives, d'anticiper les problèmes et de garder le contrôle.

À l'inverse, un suivi parfait mais rare ne crée aucune maîtrise durable et trop souvent il est anxiogène car sans rituel :
• on regarde ses comptes en retard,
• souvent après une mauvaise surprise,
• avec une charge émotionnelle forte.

L'argent devient alors :
• source de stress,
• de culpabilité,
• voire d'évitement.

Le rituel agit comme un tampon émotionnel : il neutralise la surprise et redonne de la sérénité.

Le rituel comme pilier de la montée en compétences financières

La montée en compétences financières repose sur une chose : la répétition consciente.

Le rituel permet :
• d'observer régulièrement,
• de comprendre progressivement,
• d'ajuster sans brutalité.

Sans rituel, aucune compétence ne se développe. Avec un rituel, la progression devient naturelle mais alors pourquoi la plupart des rituels financiers échouent ?

Trois raisons principales expliquent l'échec des rituels financiers :

1. Ils prennent trop de temps → incompatibles avec la vie réelle.
2. Ils demandent trop d'efforts cognitifs → fatigue mentale.
3. Ils ne donnent pas de feedback immédiat → perte de motivation.

Un bon rituel doit être : rapide, clair et utile dès la première utilisation.

Comment Steero a été pensé autour du rituel, pas de l'outil

Steero n'a pas été conçu comme une application "à consulter quand on a le temps" mais pour :
• s'intégrer dans une routine courte,
• donner une information claire en quelques secondes,
• montrer immédiatement où l'on en est.

Le cœur de Steero, ce n'est pas la donnée brute, c'est la ritualisation de la compréhension financière parce que ce qui est simple se répète et ce qui se répète transforme durablement.

Conclusion : sans rituel, il n'y a pas de contrôle financier

Aucun outil, aussi puissant soit-il, ne fonctionne sans rituel. La maîtrise financière ne vient pas de l'intensité, mais de la constance.

Un rituel simple réduit le stress, améliore les décisions et renforce la confiance. C'est le socle invisible de toute gestion financière réussie.

Et si ta gestion financière devenait un rituel simple, et non une contrainte ?

Steero t'aide à :
• créer un rituel financier durable,
• suivre tes finances sans friction,
• progresser sans surcharge mentale.

Commence petit. Répète souvent. Les résultats suivront.`
  },
  {
    id: 4,
    titleKey: "blog.articles.4.title",
    hookKey: "blog.articles.4.hook",
    tagsKey: "blog.articles.4.tags",
    content: `Pourquoi la gestion financière paraît toujours trop lourde

Le problème n'est pas la finance. Le problème, c'est l'absence de structure.

Beaucoup essaient de :
• tout suivre en même temps,
• tout comprendre au même moment,
• tout décider d'un seul coup.

Résultat :
• surcharge mentale,
• confusion,
• abandon.

Sans séparation claire des rôles, la gestion financière devient pesante.

Le principe clé : un rituel = une vocation

Un rituel financier efficace n'essaie jamais de tout faire.

Chaque rituel a :
• un horizon temporel,
• un objectif précis,
• une vocation claire.

C'est cette répartition qui rend la gestion financière fluide et durable.

Les rituels financiers : une architecture, pas une contrainte

Dans l'approche Steero, la gestion financière repose sur plusieurs rituels, chacun jouant un rôle spécifique dans le pilotage global.

Le rituel court terme pour rester connecté
Son rôle est simple : maintenir le lien avec tes finances. Il évite l'évitement, la surprise et la perte de contrôle. Ce rituel n'est pas là pour décider, mais pour voir.

Le rituel de pilotage pour garder le cap
Il permet de vérifier que la trajectoire est cohérente avec ce qui a été prévu. C'est un moment d'ajustement léger, sans remise en question profonde. On ne refait pas le plan, on corrige la trajectoire.

Le rituel d'analyse pour comprendre
Ici, on cherche à donner du sens : comprendre les écarts, observer les habitudes, améliorer la structure existante. Ce rituel transforme les chiffres en apprentissages.

Le rituel de recul pour prendre de la hauteur
Il permet d'observer les tendances, les évolutions et la cohérence globale. On sort du quotidien pour regarder le système dans son ensemble. C'est le rituel de la lucidité stratégique.

Le rituel d'alignement pour donner du sens
Le plus rare, mais le plus structurant. Il permet de réaligner les finances avec :
• les objectifs de vie,
• les priorités personnelles,
• la direction souhaitée.

Pourquoi le rituel en 2 minutes est non seulement possible, mais essentiel

Le rituel en 2 minutes n'est pas censé remplacer les autres, il est plus régulier et est le point d'entrée du système.

Son rôle :
• maintenir la conscience financière,
• éviter la déconnexion,
• rendre les autres rituels naturels et non subis.

Ce sont ces micro-rituels qui rendent :
• le pilotage fluide,
• l'analyse pertinente,
• et la vision long terme sereine.

Ce que change une approche structurée par rituels

Quand chaque rituel a une vocation claire :
• la charge mentale diminue,
• la gestion devient plus régulière,
• les décisions sont prises au bon moment.

La finance cesse d'être une tâche lourde. Elle devient un système de pilotage simple et progressif.

Conclusion : ce n'est pas le temps qui manque, c'est la structure

Un rituel financier en 2 minutes n'est pas un mythe. Ce qui est irréaliste, c'est de vouloir tout gérer au même moment.

La clé d'une gestion financière durable, ce n'est pas l'intensité, mais une architecture de rituels, chacun avec un objectif clair.

C'est cette structure qui transforme la contrainte en sérénité.

Et si ta gestion financière reposait enfin sur les bons rituels, au bon moment ?

Steero t'aide à :
• structurer ton approche financière,
• clarifier chaque temps de décision,
• et garder le contrôle sans surcharge mentale.

Moins d'effort. Plus de clarté. Une vision durable.`
  },
  {
    id: 5,
    titleKey: "blog.articles.5.title",
    hookKey: "blog.articles.5.hook",
    tagsKey: "blog.articles.5.tags",
    content: `Pourquoi regarder ses finances est souvent vécu comme une punition

Dans l'imaginaire collectif, suivre son argent signifie souvent :
• pointer ce qui ne va pas,
• repérer les excès,
• chercher ce qu'il aurait fallu mieux faire.

Résultat :
• on repousse le moment de regarder,
• on évite quand on doute,
• on consulte uniquement en cas de problème.

Le problème n'est pas l'information, mais la manière dont on l'interprète.

Un tableau de bord n'est pas là pour juger, mais pour informer

Dans un avion ou une voiture, le tableau de bord ne te juge pas. Il t'indique simplement ta vitesse, ton niveau de carburant et d'éventuelles alertes.

Il ne dit jamais : « tu es nul ».
Il dit : « voilà où tu en es ».

Tes finances devraient fonctionner exactement de la même manière, mais alors que change une vision "tableau de bord" ?

Quand tu regardes tes finances comme un tableau de bord :
• tu observes au lieu de culpabiliser,
• tu ajustes au lieu de te restreindre,
• tu décides au lieu de subir.

Les chiffres deviennent neutres, utiles et actionnables. Ils ne racontent pas qui tu es mais t'aident simplement à savoir où tu vas.

Pourquoi la visualisation est un levier si puissant

Le cerveau humain comprend mieux ce qu'il peut voir clairement.

Une bonne visualisation permet :
• d'identifier rapidement une dérive,
• de confirmer que tout est sous contrôle,
• de prendre une décision sans surcharge mentale.

À l'inverse, quand tout est dispersé ou peu lisible :
• l'information fatigue,
• la décision est repoussée,
• le stress augmente.

Voir clair, c'est déjà décider mieux.

De la sanction au pilotage : un changement de posture

La différence entre une gestion punitive et une gestion pilotée ne tient pas aux chiffres. Elle tient à la posture.

Posture punitive :
"J'ai mal fait."

Posture de pilotage :
"Voilà où j'en suis. Que fais-je maintenant ?"

Ce simple changement transforme complètement la relation à l'argent.

Comment Steero t'aide à adopter cette logique de tableau de bord

Steero a été pensé pour que tu ne craignes pas de regarder.

L'objectif n'est pas de tout analyser, optimiser ou contrôler mais de te donner une vision claire, lisible et rassurante de ta situation.

Tu viens prendre l'information dont tu as besoin pour avancer.

Conclusion : regarder tes finances ne devrait jamais faire peur

Tes finances ne sont pas un bulletin de notes mais un système vivant, qui évolue avec toi.

Quand tu les regardes avec des indicateurs pertinents :
• tu enlèves la charge émotionnelle,
• tu simplifies les décisions,
• tu reprends le contrôle.

La clarté remplace la culpabilité et c'est là que tout change.

Et si regarder tes finances devenait un réflexe simple, pas une source de stress ?

Steero t'aide à visualiser clairement ta situation, piloter sans te juger et décider avec sérénité.

Moins de pression. Plus de clarté. Plus de maîtrise.`
  },
  {
    id: 6,
    titleKey: "blog.articles.6.title",
    hookKey: "blog.articles.6.hook",
    tagsKey: "blog.articles.6.tags",
    content: `Pourquoi la règle des 50 / 30 / 20 est si populaire

Cette règle a un énorme avantage : elle simplifie. Elle permet de donner un cadre clair, éviter de partir de zéro et de comprendre qu'un budget doit être équilibré.

Pour quelqu'un qui débute, c'est souvent la première fois que l'argent est structuré autrement que "ce qu'il reste à la fin du mois".

En ce sens, la règle joue parfaitement son rôle pédagogique toutefois cette règle simple appliquée à des vies complexes n'est pas toujours évident parce que dans la vraie vie :
• les loyers ne font pas 50 % partout,
• les revenus varient,
• les situations personnelles sont très différentes.

Famille, célibat, ville chère, projets personnels, phases de vie…

Vouloir faire entrer toutes les réalités dans une seule règle rigide peut créer plus de frustration que de clarté.

Pourquoi la règle peut devenir culpabilisante

Quand la règle est présentée comme une norme, elle peut devenir un piège. Si tu n'es pas à 20 % d'épargne tu as l'impression de mal faire, tu te compares et tu culpabilises.

Mais une règle n'a jamais été faite pour juger mais pour aider à réfléchir.

Le problème n'est pas l'écart, mais l'absence de compréhension derrière cet écart.

La vraie question à se poser (et que la règle ne pose pas)

La règle des 50 / 30 / 20 ne répond pas à la question la plus importante : Pourquoi dépenses-tu comme tu dépenses ?

Un bon budget ne cherche pas à faire rentrer la réalité dans des pourcentages ou d'atteindre un chiffre "idéal", il cherche à refléter ta vie, respecter tes contraintes et surtout soutenir tes objectifs.

La règle comme repère, pas comme objectif

Utilisée intelligemment, la règle des 50 / 30 / 20 peut être très utile, non pas comme une obligation, mais comme un point de comparaison, un outil de lecture et un déclencheur de questions. Par exemple :
• Pourquoi mes besoins sont-ils si élevés ?
• Est-ce temporaire ou structurel ?
• Quelle part de mes dépenses reflète vraiment mes priorités ?

C'est là que la règle devient intéressante.

Adapter plutôt qu'appliquer : la clé d'un budget durable

Un budget qui fonctionne est un budget : adaptable, évolutif, et aligné avec ta réalité.

Tu peux très bien :
• épargner moins aujourd'hui pour un projet précis,
• dépenser plus sur certaines envies sans culpabilité,
• ajuster tes ratios selon les périodes de ta vie.

La cohérence compte plus que le pourcentage.

Comment Steero t'aide à dépasser la règle sans la jeter

Steero ne te demande pas de rentrer dans une règle toute faite mais t'aide à structurer ton budget, visualiser tes répartitions, et comprendre ce qui est choisi et ce qui est subi.

La règle des 50 / 30 / 20 peut devenir un point de départ, un repère visuel et un outil de réflexion mais jamais une injonction.

Conclusion : une bonne règle ne remplace jamais la compréhension

La règle des 50 / 30 / 20 n'est ni bonne ni mauvaise. Elle est incomplète si elle est utilisée seule.

Ce qui fait la différence, ce n'est pas le respect parfait d'un ratio, mais la capacité à comprendre, ajuster et décider en conscience.

Un bon budget ne te dit pas ce que tu dois faire. Il t'aide à faire des choix alignés avec ta vie.

Et si ton budget s'adaptait enfin à ta réalité, plutôt que l'inverse ?

Steero t'aide à :
• structurer ton budget sans rigidité,
• comprendre tes arbitrages,
• et piloter ton argent sans culpabilité.

Des repères clairs. Des choix conscients. Une gestion qui te ressemble.`
  }
];

// Calculate reading time (average 200 words per minute)
const calculateReadingTime = (text: string): number => {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
};

// Key idea block component
const KeyIdeaBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-5 bg-primary/10 border-l-4 border-primary rounded-r-xl">
    <div className="flex items-start gap-3">
      <Lightbulb className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
      <div>
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">À retenir</span>
        <p className="mt-1 text-foreground font-medium">{children}</p>
      </div>
    </div>
  </div>
);

// Myth block component
const MythBlock = ({ children }: { children: React.ReactNode }) => (
  <div className="my-6 p-5 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
    <div className="flex items-start gap-3">
      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
      <div>
        <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">Idée reçue</span>
        <p className="mt-1 text-foreground font-medium">{children}</p>
      </div>
    </div>
  </div>
);

// Define explicit section titles for each article (matching the document)
const articleSections: Record<number, string[]> = {
  1: [
    "Pourquoi la gestion des finances personnelles n'est pas innée",
    "Comprendre son argent pour reprendre le contrôle financier",
    "La finance personnelle est une compétence qui se développe avec le temps",
    "Conclusion : apprendre à gérer son argent change durablement la relation à l'argent"
  ],
  2: [
    "De la gestion subie au pilotage financier",
    "Étape 1 : Observer ses finances sans jugement",
    "Étape 2 : Structurer pour donner du sens aux chiffres",
    "Étape 3 : Comprendre les écarts pour mieux décider",
    "Étape 4 : Décider en fonction de ses objectifs",
    "Pourquoi la montée en compétences financières échoue souvent",
    "Comment Steero accompagne la montée en compétences financières",
    "Conclusion : piloter ses finances est une compétence accessible"
  ],
  3: [
    "Le vrai problème des outils financiers modernes",
    "Rituel financier : de quoi parle-t-on vraiment ?",
    "Le rituel comme pilier de la montée en compétences financières",
    "Comment Steero a été pensé autour du rituel, pas de l'outil",
    "Conclusion : sans rituel, il n'y a pas de contrôle financier"
  ],
  4: [
    "Pourquoi la gestion financière paraît toujours trop lourde",
    "Le principe clé : un rituel = une vocation",
    "Les rituels financiers : une architecture, pas une contrainte",
    "Pourquoi le rituel en 2 minutes est non seulement possible, mais essentiel",
    "Ce que change une approche structurée par rituels",
    "Conclusion : ce n'est pas le temps qui manque, c'est la structure"
  ],
  5: [
    "Pourquoi regarder ses finances est souvent vécu comme une punition",
    "Un tableau de bord n'est pas là pour juger, mais pour informer",
    "Pourquoi la visualisation est un levier si puissant",
    "De la sanction au pilotage : un changement de posture",
    "Comment Steero t'aide à adopter cette logique de tableau de bord",
    "Conclusion : regarder tes finances ne devrait jamais faire peur"
  ],
  6: [
    "Pourquoi la règle des 50 / 30 / 20 est si populaire",
    "Pourquoi la règle peut devenir culpabilisante",
    "La vraie question à se poser (et que la règle ne pose pas)",
    "La règle comme repère, pas comme objectif",
    "Adapter plutôt qu'appliquer : la clé d'un budget durable",
    "Comment Steero t'aide à dépasser la règle sans la jeter",
    "Conclusion : une bonne règle ne remplace jamais la compréhension"
  ]
};

// Extract section titles for TOC based on predefined sections
const extractSectionTitles = (content: string, articleId: number): { title: string; id: string }[] => {
  const sections = articleSections[articleId] || [];
  return sections.map((title, index) => ({
    title,
    id: `section-${articleId}-${index}`
  }));
};

// Format content with improved visual hierarchy
const formatContent = (content: string, articleId: number = 0) => {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let sectionIndex = 0;
  const sections = articleSections[articleId] || [];
  
  while (i < lines.length) {
    const trimmedLine = lines[i].trim();
    
    // Skip empty lines - add spacing
    if (!trimmedLine) {
      elements.push(<div key={i} className="h-2" />);
      i++;
      continue;
    }
    
    // Check if it's a predefined section title
    const matchingSectionIndex = sections.findIndex(s => 
      trimmedLine === s || trimmedLine.startsWith(s.split(':')[0])
    );
    
    if (matchingSectionIndex !== -1 && sections.includes(trimmedLine)) {
      const sectionId = `section-${articleId}-${matchingSectionIndex}`;
      elements.push(
        <div key={i} id={sectionId} className="mt-10 mb-4 flex items-center gap-3 scroll-mt-24">
          <div className="w-1 h-6 bg-primary rounded-full" />
          <h3 className="text-lg md:text-xl font-bold text-foreground">
            {trimmedLine}
          </h3>
        </div>
      );
      sectionIndex++;
      i++;
      continue;
    }
    
    // Regular text with bullet points styling
    if (trimmedLine.startsWith('•')) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-1.5 pl-4">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
          <span className="text-muted-foreground">{trimmedLine.substring(1).trim()}</span>
        </div>
      );
    } else if (trimmedLine.startsWith('→')) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-1.5 pl-4 text-primary/80">
          <span className="flex-shrink-0">→</span>
          <span>{trimmedLine.substring(1).trim()}</span>
        </div>
      );
    } else if (trimmedLine.match(/^\d+\./)) {
      elements.push(
        <div key={i} className="flex items-start gap-3 py-2 pl-4">
          <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-sm font-semibold flex items-center justify-center flex-shrink-0">
            {trimmedLine.match(/^(\d+)/)?.[1]}
          </span>
          <span className="text-muted-foreground pt-0.5">{trimmedLine.replace(/^\d+\.\s*/, '')}</span>
        </div>
      );
    } else {
      elements.push(
        <p key={i} className="text-muted-foreground leading-relaxed py-1">
          {trimmedLine}
        </p>
      );
    }
    
    i++;
  }
  
  return elements;
};

// Table of contents component with active section tracking - sticky on desktop
const TableOfContents = ({ sections, isSticky = false }: { sections: { title: string; id: string }[], isSticky?: boolean }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (sections.length < 2) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`p-5 bg-muted/50 rounded-xl border border-primary/10 ${
        isSticky ? "" : "mb-8"
      }`}
    >
      <div className="flex items-center gap-2 mb-4">
        <List className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">{t('blog.tableOfContents')}</span>
      </div>
      <nav className="space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              onClick={(e) => handleClick(e, section.id)}
              className={`w-full text-left flex items-start gap-3 py-2 px-3 rounded-lg text-sm transition-all duration-200 group ${
                isActive 
                  ? "bg-primary/10 text-primary font-medium" 
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <span className={`font-medium transition-colors flex-shrink-0 ${
                isActive ? "text-primary" : "text-primary/50 group-hover:text-primary"
              }`}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={`flex-1 ${isSticky ? "line-clamp-2" : "line-clamp-1"}`}>{section.title}</span>
              {isActive && (
                <motion.div
                  layoutId={`activeIndicator-${isSticky ? 'sticky' : 'inline'}`}
                  className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </motion.div>
  );
};

// Reading progress bar component
const ReadingProgressBar = ({ contentRef }: { contentRef: React.RefObject<HTMLDivElement> }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    
    const handleScroll = () => {
      const rect = content.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const contentHeight = content.scrollHeight;
      
      // Calculate how much of the content has been scrolled past
      const scrolled = Math.max(0, windowHeight - rect.top);
      const totalScrollable = contentHeight;
      const progressPercent = Math.min(100, Math.max(0, (scrolled / totalScrollable) * 100));
      
      setProgress(progressPercent);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [contentRef]);
  
  return (
    <div className="h-1 bg-primary/10 rounded-full overflow-hidden mb-4">
      <motion.div 
        className="h-full bg-primary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  );
};

interface ArticleCardProps {
  article: Article;
  t: (key: string, options?: Record<string, unknown>) => string;
  isOpen: boolean;
  onToggle: () => void;
  cardRef?: React.RefObject<HTMLDivElement>;
  openWaitlist: () => void;
}

const ArticleCard = ({ article, t, isOpen, onToggle, cardRef, openWaitlist }: ArticleCardProps) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hook = t(article.hookKey);
  const title = t(article.titleKey);
  const tags = t(article.tagsKey, { returnObjects: true }) as unknown as string[];
  const readingTime = calculateReadingTime(hook + article.content);

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/blog#article-${article.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      data-article-id={article.id}
      className={`rounded-xl border transition-all duration-300 ${
        isOpen 
          ? "border-primary/30 bg-card shadow-md" 
          : "border-border bg-card hover:border-primary/30 hover:shadow-sm cursor-pointer"
      }`}
    >
      {/* Header - sticky when open */}
      <div 
        onClick={() => !isOpen && onToggle()}
        className={`p-4 ${isOpen ? 'sticky top-16 z-20 bg-card rounded-t-xl border-b border-border/30' : 'cursor-pointer'}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            {/* Tags and reading time inline */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-primary/10 text-primary"
                >
                  {tag}
                </span>
              ))}
              <span className="flex items-center gap-1 text-muted-foreground text-xs ml-auto">
                <Clock className="w-3 h-3" />
                {readingTime} {t('blog.min')}
              </span>
            </div>
            <h2 className="text-base font-semibold text-foreground leading-tight line-clamp-2">
              {title}
            </h2>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-muted-foreground flex-shrink-0 mt-1 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            <svg width="16" height="16" viewBox="0 0 12 12" fill="none">
              <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </div>
        
        {/* Progress bar - only when open */}
        {isOpen && (
          <div className="mt-3">
            <ReadingProgressBar contentRef={contentRef} />
          </div>
        )}
        
        {/* Hook - truncated when closed */}
        {!isOpen && (
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {hook.split('\n')[0]}
          </p>
        )}
      </div>

      {/* Expanded content */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div ref={contentRef} className="px-4 pb-4">
              {/* Hook full text */}
              <div className="py-3 border-b border-border/50">
                <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {hook}
                </p>
              </div>

              <div className="pt-3">
                {/* Mobile: TOC inline at top */}
                <div className="lg:hidden mb-6">
                  <TableOfContents sections={extractSectionTitles(article.content, article.id)} />
                </div>
                
                {/* Main content - full width on desktop (TOC is in sidebar) */}
                <div className="text-sm">
                  {formatContent(article.content, article.id)}
                </div>
              </div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10"
              >
                <p className="text-sm text-foreground font-medium mb-3">
                  {t('blog.readyToTransform')}
                </p>
                <Button size="sm" className="group" onClick={openWaitlist}>
                    {t('blog.joinWaitlist')}
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Button>
              </motion.div>
              
              {/* Actions row */}
              <div className="mt-4 flex items-center gap-3">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handleShare}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    copied 
                      ? "bg-green-500/10 border-green-500/30 text-green-600" 
                      : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      {t('blog.linkCopied')}
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      {t('blog.share')}
                    </>
                  )}
                </motion.button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle();
                  }}
                  className="text-muted-foreground text-xs font-medium flex items-center gap-1.5 hover:text-foreground transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="rotate-180">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {t('blog.collapseArticle')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Blog = () => {
  const { t } = useTranslation();
  const { openWaitlist } = useWaitlist();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openArticles, setOpenArticles] = useState<Set<number>>(new Set());
  const [visibleArticleId, setVisibleArticleId] = useState<number | null>(null);
  const articleRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  
  const articles = getArticles(t);
  const allTags = Array.from(new Set(articles.flatMap(article => t(article.tagsKey, { returnObjects: true }) as string[])));

  // Track which open article is most visible
  useEffect(() => {
    const openArticleIds = Array.from(openArticles);
    if (openArticleIds.length === 0) {
      setVisibleArticleId(null);
      return;
    }

    const handleScroll = () => {
      let maxVisibleArea = 0;
      let mostVisibleId: number | null = null;

      openArticleIds.forEach(id => {
        const element = articleRefs.current.get(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Calculate visible area
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > maxVisibleArea) {
            maxVisibleArea = visibleHeight;
            mostVisibleId = id;
          }
        }
      });

      setVisibleArticleId(mostVisibleId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [openArticles]);

  const toggleArticle = (id: number) => {
    setOpenArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const setArticleRef = (id: number, element: HTMLDivElement | null) => {
    if (element) {
      articleRefs.current.set(id, element);
    } else {
      articleRefs.current.delete(id);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(tg => tg !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery("");
  };

  const filteredArticles = articles.filter(article => {
    const tags = t(article.tagsKey, { returnObjects: true }) as string[];
    const title = t(article.titleKey) as string;
    const hook = t(article.hookKey) as string;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => tags.includes(tag));
    const matchesSearch = searchQuery === "" || 
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hook.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTags && matchesSearch;
  });

  const hasActiveFilters = selectedTags.length > 0 || searchQuery !== "";

  // Get sections for the most visible article
  const visibleArticle = visibleArticleId ? articles.find(a => a.id === visibleArticleId) : null;
  const visibleSections = visibleArticle ? extractSectionTitles(visibleArticle.content, visibleArticle.id) : [];

  return (
    <div className="min-h-screen">
      <SEO
        title="Blog - Conseils pour bien gérer son argent"
        description="Articles et conseils pour apprendre à gérer son argent. Comment mieux gérer son budget sans Excel ? Découvrez nos guides pratiques sur les finances personnelles et les rituels financiers."
        keywords="blog finances personnelles, comment gérer son argent, conseils budget, mieux gérer son argent, gestion budget personnel, alternative excel finances"
        canonical="/blog"
        ogType="blog"
      />
      <Header />
      
      <main className="pt-32 pb-16 bg-hero-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
              {/* Left side - Sticky */}
              <div className="lg:w-1/3">
                <div className="lg:sticky lg:top-24">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      <span className="text-gradient">Steero</span> Blog
                    </h1>
                    <p className="text-muted-foreground mb-6">
                      {t('blog.subtitle')}
                    </p>

                    {/* Search bar */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder={t('blog.searchPlaceholder')}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-border bg-card focus:border-primary/50 focus:outline-none transition-colors text-foreground placeholder:text-muted-foreground text-sm"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    {/* Tags filter */}
                    <div className="space-y-2">
                      <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{t('blog.filterBy')}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {allTags.map((tag) => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              onClick={() => toggleTag(tag)}
                              className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
                                isSelected
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                              }`}
                            >
                              {tag}
                            </button>
                          );
                        })}
                      </div>
                      {hasActiveFilters && (
                        <button
                          onClick={clearFilters}
                          className="mt-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                        >
                          <X className="w-3 h-3" />
                          {t('blog.clear')}
                        </button>
                      )}
                    </div>

                    {/* Results count */}
                    {hasActiveFilters && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 text-sm text-muted-foreground"
                      >
                        {filteredArticles.length} {t('blog.articlesFound')}
                      </motion.p>
                    )}

                    {/* Dynamic TOC - appears when an article is open */}
                    <AnimatePresence>
                      {visibleSections.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3 }}
                          className="mt-6 hidden lg:block"
                        >
                          <TableOfContents sections={visibleSections} isSticky={true} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

              {/* Right side - Scrollable articles */}
              <div className="lg:w-2/3">
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredArticles.map((article, index) => (
                      <motion.div
                        key={article.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        ref={(el) => setArticleRef(article.id, el)}
                      >
                        <ArticleCard 
                          article={article} 
                          t={t}
                          isOpen={openArticles.has(article.id)}
                          onToggle={() => toggleArticle(article.id)}
                          openWaitlist={openWaitlist}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {filteredArticles.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 bg-card rounded-xl border border-border"
                    >
                      <p className="text-muted-foreground mb-4">
                        {t('blog.noResults')}
                      </p>
                      <button
                        onClick={clearFilters}
                        className="text-primary font-medium hover:underline text-sm"
                      >
                        {t('blog.clearFilters')}
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t('blog.ctaTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              {t('blog.ctaDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={openWaitlist}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-primary font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t('common.joinWaitlist')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/pourquoi-steero"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  {t('common.discoverApproach')}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
