import { useState, useRef, useEffect } from "react";
import steeroBanner from "@/assets/steero-banner-3.png";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ArrowRight, Lightbulb, AlertCircle, Share2, Check, List, Search, X, Download, FileSpreadsheet, CheckCircle2, ArrowUpRight } from "lucide-react";
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
    id: 3,
    titleKey: "blog.articles.3.title",
    hookKey: "blog.articles.3.hook",
    tagsKey: "blog.articles.3.tags",
    content: `La majorité des apps de finance personnelle sont des rétroviseurs

Finary, Bankin, Linxo, ces outils font une chose très bien : te montrer où est allé ton argent. Ils agrègent, catégorisent, affichent. Automatiquement, proprement, joliment.

Le problème : un rétroviseur te montre la route que tu viens de parcourir. Pas celle devant toi.

Conduire en regardant uniquement le rétroviseur, ça finit dans le fossé. Et c'est exactement ce qui se passe avec ces outils. Tu consultes ton bilan en fin de mois, quand la dérive est déjà installée depuis trois semaines, quand il est trop tard pour corriger quoi que ce soit. Résultat : Tu subis l'information au lieu de piloter avec.

Ce n'est pas un défaut de l'outil. C'est une erreur de paradigme. Ces apps ont été conçues pour observer le passé, pas pour piloter l'avenir.

Un rituel n'est pas un bilan mensuel

Quand on parle de rituel financier, la plupart imaginent une session Excel de deux heures, un dimanche soir, avec une calculatrice et un café froid. C'est exactement ce qu'un rituel n'est pas.

Un rituel, c'est une action courte, répétée à fréquence fixe, qui donne un feedback immédiat. Pas une corvée mais un geste. La différence entre les deux n'est pas la durée. C'est la régularité et la clarté de ce qu'on cherche à voir.

Un suivi parfait mais rare ne crée aucune maîtrise durable, c'est même pire, c'est anxiogène. Sans rituel régulier, on regarde ses comptes après une mauvaise surprise, sous charge émotionnelle, en mode pompier. L'argent devient une source de stress, pas un levier. Et plus le stress monte, plus l'évitement s'installe. C'est un cercle fermé.

La régularité, elle, agit comme un tampon. Elle neutralise la surprise. Elle transforme la gestion financière d'une épreuve à une compétence.

Pourquoi les rituels financiers échouent avant de commencer

Trois raisons expliquent l'abandon systématique :
• Ils prennent trop de temps : incompatibles avec une semaine chargée
• Ils demandent un effort cognitif trop important : trop de décisions, trop de données à interpréter
• Et ils ne donnent pas de feedback immédiat : sans résultat visible, la motivation s'évapore en dix jours.

Un bon rituel doit satisfaire trois critères non négociables : être rapide, être clair, et être utile dès la première utilisation.

Si l'un des trois manque, l'abandon est inévitable. Pas parce que tu manques de sérieux, mais parce que le cerveau humain abandonne tout comportement qui consomme plus qu'il ne produit.

Le système TEMPO : cinq rituels, cinq fréquences, un seul cap

Piloter ses finances, c'est exactement comme piloter une équipe. Tu ne gères pas une équipe avec une réunion annuelle. Tu as des points quotidiens, des bilans hebdomadaires, des revues mensuelles, des comités trimestriels, et une direction annuelle. Chaque fréquence répond à une question différente. Ensemble, elles forment un système.

C'est ce que le système TEMPO structure pour tes finances personnelles.

Tracer — quotidien, 5 minutes. Enregistrer ses opérations récentes, vérifier le classement, observer l'impact sur la trésorerie. Aucune analyse attendue juste le geste de saisir. Et ce geste compte : noter une dépense, c'est déjà en prendre conscience. C'est là que le comportement change, en amont, avant que la décision soit prise.

Examiner — hebdomadaire, 10 minutes. Comparer ce qu'on avait prévu à ce qui s'est passé. Identifier les écarts avant qu'ils s'installent. Ajuster une catégorie si nécessaire. Ce rituel est le pont entre l'opérationnel et la décision mensuelle, il t'évite l'effet "je verrai en fin de mois" qui est systématiquement trop tard.

Maîtriser — mensuel, 15 minutes. Analyser revenus vs dépenses, budget prévu vs réel, évolution de la trésorerie. Décider consciemment où va l'argent le mois suivant. Ce n'est pas un bilan subi mais bien un acte de pilotage. La question n'est pas "où est passé mon argent ?" mais "est-ce que je choisis où il va ?"

Positionner — trimestriel, 30 minutes. Prendre de la hauteur. Ne plus regarder les dépenses mais regarder la direction. Est-ce que ma trésorerie évolue dans le bon sens ? Est-ce que mes finances soutiennent ce que je veux construire ? Ce rituel sort du transactionnel pour entrer dans le stratégique.

Orienter — annuel, 60 minutes. Bilan global. Évolution du patrimoine, discipline installée, habitudes ancrées ou abandonnées. Et surtout : définir les grandes orientations. Ce rituel ne gère pas — il décide de la direction. C'est lui qui donne du sens à tous les autres.

Ce que ça change concrètement

Le premier effet visible arrive en 7 à 10 jours. Pas un gain financier spectaculaire, une clarté mentale. Tu sais où tu en es. Tu sais quoi faire. Tu ne devines plus.

Après un mois, les décisions changent naturellement. Pas parce que tu te forces mais parce que tu vois. Et voir change le comportement en amont, avant la dépense, pas après.

Après trois mois, le pilotage est installé. Les rituels ne sont plus un effort mais un réflexe. Et la charge mentale liée à l'argent a significativement diminué.

Le seul outil qui fonctionne est celui qu'on utilise régulièrement

C'est la règle la plus simple et la plus ignorée.

L'outil parfait qu'on n'ouvre plus au bout de deux semaines ne vaut rien. Un rituel imparfait mais tenu vaut tout.

C'est pour ça que Steero est construit autour de la méthode TEMPO. Les cinq niveaux de rituels sont intégrés directement dans l'outil. La saisie quotidienne se fait en quelques secondes avec des modèles préremplis, sans supprimer le geste conscient d'enregistrer. Et chaque niveau du système s'ouvre naturellement quand le précédent est ancré.

Ce n'est pas un outil de plus. C'est le premier outil construit pour que tu l'utilises vraiment.

Installe le rituel. L'outil suit.`
  },
  {
    id: 2,
    titleKey: "blog.articles.2.title",
    hookKey: "blog.articles.2.hook",
    tagsKey: "blog.articles.2.tags",
    content: `Subir ou piloter : la seule distinction qui compte

Regarder son solde de temps en temps, payer ses factures, épargner quand il reste quelque chose en fin de mois c'est subir ses finances. Pas les gérer mal. Les subir. La différence est subtile mais elle change tout.

Subir, c'est réagir. Une mauvaise surprise en fin de mois, une dépense imprévue qui déséquilibre tout, une décision prise sous pression faute de vision claire. L'argent est une source de stress latent, pas parce qu'il manque mais parce qu'il reste flou.

Piloter, c'est anticiper. Avoir une vision claire de sa situation en temps réel, identifier une dérive avant qu'elle s'installe, décider consciemment où va chaque euro. Un pilote ne regarde pas ses instruments une fois par mois, il les consulte en continu et à des fréquences différentes, pour des questions différentes.

La différence entre les deux n'est pas le revenu. C'est le niveau de compétence financière. Et ce niveau se développe par étapes.

Étape 1 : Observer sans juger (niveau Tracer)

Avant le budget, avant l'épargne, avant n'importe quelle optimisation : l'observation.

Voir ses revenus et ses dépenses tels qu'ils sont. Identifier ses grandes catégories. Comprendre ses habitudes réelles et non celles qu'on croit avoir.

Sans jugement. Sans culpabilité. Juste les faits.

Tant que l'argent reste flou, aucune décision solide n'est possible. On ne peut pas corriger ce qu'on ne voit pas. Et on ne peut pas voir clairement ce qu'on ne regarde que rarement.

C'est le niveau T du système TEMPO : Tracer. Cinq minutes par jour pour rester connecté à sa situation réelle. Pas pour analyser. Juste pour voir.

Étape 2 : Structurer pour transformer des chiffres en information (niveau Examiner)

Une fois les flux visibles, la structuration devient possible. Organiser ses dépenses par catégories, poser des budgets simples par poste, distinguer ce qui est fixe de ce qui est variable. Cette étape transforme des chiffres isolés en information exploitable.

C'est ici qu'on commence à comparer ce qu'on avait prévu face à ce qui s'est passé. Et c'est là que les premières décisions conscientes apparaissent.

C'est le niveau E pour Examiner. Dix minutes par semaine pour regarder la semaine écoulée et corriger la trajectoire avant qu'il soit trop tard. Pas un bilan global : une vérification de cap.

Étape 3 : Comprendre les écarts pour reprendre la main (niveau Maîtriser)

Un budget parfait n'existe pas. Les écarts sont normaux avec parfois un mois plus chargé que prévu, une priorité qui change, une dépense imprévue. Le problème n'est pas l'écart. C'est de ne pas le voir.

Comprendre ses écarts, c'est passer de la réaction à la décision. Au lieu de subir le bilan en fin de mois, on l'analyse consciemment : où a-t-on dépassé et pourquoi ? est-ce que c'était un choix ou une dérive ? Cette lecture régulière développe progressivement un instinct financier et la capacité à anticiper ses propres comportements.

C'est le niveau M pour Maîtriser. Quinze minutes par mois pour décider où va l'argent le mois suivant. Pas subir son budget mais pour le construire.

Étape 4 : Aligner finances et objectifs (niveaux Positionner et Orienter)

C'est ici que la gestion financière devient réellement utile. Quand elle cesse d'être une contrainte pour devenir un levier. Quand la vision est suffisamment claire pour arbitrer sans stress, aligner ses dépenses avec ses projets, donner un rôle précis à chaque euro.

À ce niveau, l'argent n'est plus une source d'anxiété. C'est un outil au service de ce qu'on veut construire. Un apport immobilier, une transition professionnelle, une liberté financière à horizon cinq ans : ces objectifs deviennent pilotables parce qu'on a installé les niveaux précédents.

C'est le niveau P puis O du système TEMPO pour Positionner trimestriellement et Orienter annuellement. Prendre de la hauteur pour vérifier que la direction est juste, pas seulement que les chiffres sont bons.

Pourquoi la montée en compétences échoue avant d'avoir commencé

La majorité des gens abandonnent dans les premières semaines. Pas par manque de sérieux mais par manque de cadre adapté. Les outils disponibles sont pensés pour des gens qui savent déjà piloter, pas pour ceux qui apprennent. Le suivi demande trop de temps. L'effort cognitif est trop important. Et surtout : le feedback n'est pas immédiat et sans résultat visible rapidement, la motivation s'effondre.

Un bon système de montée en compétences doit être progressif, pas tout ou rien. On n'installe pas les cinq niveaux TEMPO en même temps. On commence par Tracer quotidiennement, ça prend cinq minutes maximum. On installe l'habitude avant d'installer la méthode. Et on monte d'un niveau quand le précédent est ancré.

La tendance prime sur la perfection. Un rituel imparfait mais tenu vaut infiniment plus qu'un système parfait abandonné.

Le pilotage s'apprend. Comme n'importe quelle compétence.

Personne ne naît en sachant piloter ses finances. C'est une compétence qui s'apprend par exposition régulière, par répétition consciente, par feedback progressif. Exactement comme piloter un projet, manager une équipe ou maîtriser un outil professionnel.

La différence entre quelqu'un qui subit ses finances et quelqu'un qui les pilote n'est pas le revenu, ni la discipline, ni l'intelligence financière. C'est l'existence d'un système. Un cadre clair, des fréquences définies, des questions simples auxquelles répondre régulièrement.

Steero est construit autour de cette logique de progression. Les cinq niveaux TEMPO sont intégrés dans l'outil, pas comme des fonctionnalités à découvrir, mais comme une structure de pilotage à installer progressivement. Tu commences par Tracer. Le reste suit naturellement.`
  },
  {
    id: 1,
    titleKey: "blog.articles.1.title",
    hookKey: "blog.articles.1.hook",
    tagsKey: "blog.articles.1.tags",
    content: `Ce n'est pas que tu dépenses trop. C'est que tu regardes trop rarement.

La dérive financière ne se construit pas en un jour. Elle s'installe progressivement puis se découvre en fin de mois quand il est trop tard pour corriger.

Les études comportementales sur la perception des dépenses le confirment : la plupart des gens sous-estiment leurs dépenses mensuelles de 20 à 30 %. Pas parce qu'ils se mentent mais parce que la mémoire financière est sélective : on retient les bons mois et on oublie les mauvais. On mémorise les gros postes, on oublie les petits débits qui s'accumulent.

Le résultat : une vision déformée de sa situation réelle, et des décisions prises sur des bases fausses.

Le problème n'est pas l'argent que tu gagnes. C'est la fréquence à laquelle tu regardes où il va.

Les 4 fuites invisibles qui plombent un budget cadre

Avant de construire un système, il faut nommer ce qu'on cherche à corriger.

Les abonnements zombies. Ils sont débités entre J+10 et J+20, jamais au même moment, souvent pour des services qu'on n'utilise plus. Invisibles parce que le montant unitaire est faible. Dévastateurs parce qu'ils s'accumulent.

Les dépenses sociales non budgétées. Le dîner de dernière minute, le week-end improvisé, le cadeau oublié. Chaque occurrence semble exceptionnelle. Ensemble, elles représentent souvent 15 à 20 % des dépenses réelles d'un cadre actif en grande métropole.

Le lissage mental. Ce mécanisme cognitif te fait inconsciemment moyenner tes dépenses sur les "bons mois" pour justifier les mauvais. "En janvier j'avais bien géré, donc février c'est rattrapable." Ce raisonnement est faux et coûteux.

La catégorie "divers". C'est la poubelle budgétaire. Tout ce qu'on ne veut pas regarder de trop près atterrit là. Une catégorie "divers" qui grossit est toujours le signe d'un pilotage qui s'effondre.

Pourquoi les bonnes résolutions ne fonctionnent pas

"Je vais faire plus attention ce mois-ci." Cette phrase a une durée de vie moyenne de 11 jours. Pas parce que tu manques de volonté mais parce qu'une intention sans structure est condamnée au premier imprévu.

Une résolution n'a pas de fréquence. Pas de moment dédié. Pas de feedback régulier. Elle repose entièrement sur ta motivation du moment, soit la ressource la plus volatile qui soit.

Ce qui fonctionne, ce n'est pas une règle. C'est un système. Et un système se compose de rituels, pas de bonnes intentions.

La vraie solution : un système de pilotage à 5 niveaux

C'est ici que la plupart des conseils financiers s'arrêtent à mi-chemin. Ils te disent de "faire un budget". Mais un budget sans cadence de révision est un document mort.

Le pilotage financier efficace fonctionne exactement comme le pilotage professionnel : des niveaux d'analyse différents, des fréquences différentes, des questions différentes. Du quotidien opérationnel au stratégique annuel.

C'est ce qu'on appelle le système TEMPO.

Tracer (quotidien, 5 minutes)

Objectif : garder le lien. Éviter la dérive invisible.

Chaque jour ou trois fois par semaine au minimum tu enregistres tes opérations récentes, tu vérifies le classement de chaque dépense, et tu observes l'impact sur ta trésorerie.

Aucune analyse n'est attendue ici. Il s'agit de saisir, observer, valider.

La clé : la saisie est manuelle et intentionnelle. Pas par contrainte technique, mais par choix comportemental. Enregistrer une dépense, c'est déjà en prendre conscience. C'est l'acte de pilotage le plus simple et le plus puissant. C'est là que la discipline s'installe, pas dans les grandes décisions de fin de mois.

Steero est construit sur ce principe : des modèles de saisie préremplis réduisent la friction à quelques secondes, sans supprimer le geste conscient d'enregistrer. Tu saisis vite et tu restes acteur.

La règle d'or : si tu n'as pas envie d'y passer 5 minutes par jour, commence par 3 fois par semaine. La régularité prime sur la fréquence parfaite.

Examiner (hebdomadaire, 10 minutes)

Objectif : corriger la trajectoire avant qu'il soit trop tard.

Chaque semaine, tu passes en revue les dépenses de la semaine écoulée. Tu identifies les écarts, les dépenses inhabituelles, et tu ajustes les catégories si nécessaire.

Trois questions suffisent : Ai-je dépensé comme prévu ? Qu'est-ce qui mérite d'être ajusté ? Que puis-je anticiper la semaine prochaine ?

Ce rituel est le pont entre le quotidien opérationnel et la décision mensuelle. Il t'évite l'effet "je verrai en fin de mois" qui est systématiquement trop tard. Il transforme un spectateur passif en pilote actif.

Maîtriser (mensuel, 15 minutes)

Objectif : reprendre la main sur tes choix financiers.

Une fois par mois, tu analyses : revenus vs dépenses, budget prévu vs réel, évolution de ta trésorerie. Tu ajustes les catégories et les montants budgétés. Et surtout, tu décides consciemment où va ton argent le mois suivant.

Ce n'est pas un bilan subi. C'est une décision active.

La question centrale n'est pas "où est passé mon argent ?" mais "est-ce que je choisis consciemment où il va ?" Ce déplacement de perspective change tout.

Steero structure ce moment avec une vue consolidée budget prévu / réel par catégorie pour que la décision soit basée sur des données, pas sur une impression.

Un mois imparfait n'est pas un problème. Un mois non regardé, oui.

Positionner (trimestriel, 30 minutes)

Objectif : aligner finances et objectifs de vie.

Tous les trois mois, tu prends de la hauteur. Tu ne regardes plus les dépenses mais regardes la direction. Est-ce que ma trésorerie évolue dans le bon sens ? Est-ce que mes finances soutiennent ce que je veux construire ? Qu'est-ce qui doit changer dans mes grandes catégories ?

Ce rituel évite la gestion automatique sans sens. Il renforce ton attachement à tes finances non pas comme une contrainte, mais comme un levier. C'est le niveau où tu passes du pilotage tactique à la stratégie personnelle.

Orienter (annuel, 60 minutes)

Objectif : choisir l'avenir, pas juste gérer le présent.

Une fois par an, tu fais le bilan global. Évolution du patrimoine, discipline installée, habitudes ancrées ou abandonnées. Et surtout : tu définis les grandes orientations : épargne, investissements, projets de vie.

Trois questions fondamentales : Qu'est-ce que je veux vraiment construire avec mon argent ? Quelle vie est-ce que je soutiens par mes décisions financières ? Qu'est-ce qui mérite mon énergie cette année et qu'est-ce qui n'en mérite plus ?

Une direction claire vaut mieux qu'un plan parfait.

Par où commencer quand on part de zéro

Ne commence pas par les cinq niveaux en même temps. C'est le meilleur moyen d'abandonner au bout de dix jours.

L'ordre logique : installe d'abord le T. Tracer, idéalement de manière quotidienne et à minima trois fois par semaine (Exemple : mardis, jeudis, samedis). Juste ça. Pendant trois semaines, sans ajouter autre chose.

Une fois que le geste est ancré, ajoute le E. Un quart d'heure le week-end.

Puis le M en fin de premier mois complet.

Le système TEMPO n'est pas un outil qu'on configure une fois, c'est une cadence qu'on installe progressivement. La tendance prime sur la perfection. Rater un rituel n'est pas un échec. Ne jamais le faire est le seul vrai problème.

Ce que tu vas changer cette semaine

Tu ne dépenses pas trop. Tu pilotes trop rarement.

Cinq minutes par jour et quinze minutes par mois changent plus une situation financière que n'importe quelle règle d'austérité. Pas parce qu'ils révèlent des fuites magiques — mais parce qu'ils installent une conscience active de là où va ton argent. Et cette conscience change les décisions, en amont, avant que la dépense soit faite.

Le système TEMPO est la méthode. Steero est l'outil construit pour l'implémenter — avec la friction juste, les rituels structurés, et la vision dont tu as besoin pour piloter, pas juste suivre.`
  },
  {
    id: 4,
    titleKey: "blog.articles.4.title",
    hookKey: "blog.articles.4.hook",
    tagsKey: "blog.articles.4.tags",
    content: `Le vrai problème : on essaie de tout faire d'un coup

La gestion financière paraît lourde parce qu'elle est pensée comme un bloc monolithique. Un bilan mensuel de deux heures, ou rien. Un tableau Excel complet, ou abandon. Tout comprendre, tout analyser, tout décider en une seule session.

Ce mode de fonctionnement génère trois problèmes qui se renforcent mutuellement. La surcharge mentale d'abord avec trop de décisions à prendre en même temps qui épuise. La confusion ensuite, quand tout est mélangé, rien n'est clair. L'abandon enfin, un système trop lourd ne tient jamais.

La solution n'est pas de réduire le temps. C'est de séparer les rôles.

Un rituel, une question. Pas plus.

Un rituel financier efficace ne cherche jamais à tout faire. Il répond à une seule question, à une fréquence précise, en un temps défini. C'est cette séparation qui rend le système tenable et durable.

C'est exactement la logique d'un pilote. Il ne fait pas le bilan de vol, la vérification des instruments, la planification de la prochaine destination et la communication avec la tour de contrôle en même temps. Chaque action a son moment, sa fréquence, son objectif. Ensemble, elles forment un système de pilotage cohérent.

Pour les finances personnelles, c'est identique. Le système TEMPO structure cinq niveaux de rituels : chacun avec une vocation précise, une durée adaptée, une question centrale.

Les 5 niveaux du système TEMPO

Tracer — quotidien, 5 minutes. La question : est-ce que je vois ce qui se passe en ce moment ? Le rôle : maintenir le lien avec sa situation réelle. Enregistrer les opérations récentes, vérifier le classement, observer l'impact sur la trésorerie. Pas d'analyse — juste la conscience. C'est ce rituel qui évite la déconnexion progressive, les mauvaises surprises et l'évitement émotionnel. Il ne décide pas. Il voit.

Examiner — hebdomadaire, 10 minutes. La question : est-ce que je suis sur la trajectoire prévue ? Le rôle : corriger avant que l'écart devienne une dérive. Comparer la semaine réelle à la semaine prévue, identifier ce qui a dérapé, ajuster une catégorie si nécessaire. Ce rituel est le pont entre le quotidien et la décision mensuelle — il t'évite d'arriver en fin de mois sans avoir rien vu venir.

Maîtriser — mensuel, 15 minutes. La question : est-ce que je décide consciemment où va mon argent ? Le rôle : passer de la réaction à la décision. Analyser revenus vs dépenses, comprendre les écarts, construire le budget du mois suivant. Ce n'est pas un bilan subi — c'est un acte de pilotage. La nuance change tout.

Positionner — trimestriel, 30 minutes. La question : est-ce que mes finances avancent dans la bonne direction ? Le rôle : sortir du transactionnel pour entrer dans le stratégique. Observer les tendances sur trois mois, évaluer la cohérence globale, identifier ce qui doit évoluer. Ce rituel donne du recul là où les trois premiers donnent de la précision.

Orienter — annuel, 60 minutes. La question : quelle vie est-ce que je soutiens par mes décisions financières ? Le rôle : aligner finances et objectifs de vie. Bilan global de l'année, grandes orientations pour la suivante, arbitrages stratégiques. C'est le rituel de sens — celui qui donne de la valeur à tous les autres.

Alors, 2 minutes : mythe ou réalité ?

Ni l'un ni l'autre. Le rituel quotidien de Tracer peut tenir en moins 5 minutes quand le système est en place et la saisie fluide. Mais cette rapidité n'est pas une promesse de facilité, c'est le résultat d'une structure installée.

Ce qui est un mythe : croire qu'on peut gérer ses finances sérieusement avec 2 minutes par semaine sans cadre. Ce qui est réel : un rituel quotidien de 5 minutes, ancré dans une architecture cohérente, change durablement le rapport à l'argent pas parce qu'il prend peu de temps, mais parce qu'il est régulier.

La régularité bat l'intensité. Toujours.

Ce que change une architecture de rituels

Quand chaque rituel a une vocation claire et une fréquence définie, trois choses se produisent. La charge mentale diminue et on ne cherche plus à tout traiter en même temps. La régularité s'installe puisque chaque rituel est adapté pour ne pas être repoussé. Et les décisions sont prises au bon moment avec la bonne information et pas sous pression.

La gestion financière cesse d'être une tâche redoutée. Elle devient un système de pilotage discret, régulier et efficace.

Steero est structuré autour de cette architecture. Les cinq niveaux TEMPO sont intégrés directement dans l'outil. La saisie quotidienne se fait en quelques secondes avec des modèles préremplis sans supprimer le geste conscient d'enregistrer. Et chaque niveau du système s'ouvre naturellement quand le précédent est ancré.

Ce n'est pas le temps qui manque pour gérer ses finances. C'est la structure.`
  },
  {
    id: 5,
    titleKey: "blog.articles.5.title",
    hookKey: "blog.articles.5.hook",
    tagsKey: "blog.articles.5.tags",
    content: `Si regarder tes finances te met mal à l'aise, ce n'est probablement pas à cause des chiffres. C'est à cause de ce qu'ils semblent dire sur toi.

Pour beaucoup, ouvrir son application bancaire en fin de mois ressemble à recevoir un bulletin scolaire. On cherche instinctivement les erreurs, les excès, ce qu'on aurait dû mieux faire. Et quand on en trouve, ce qui arrive toujours, la réaction est prévisible : culpabilité, puis évitement, puis déconnexion progressive. Jusqu'au mois suivant, où le cycle recommence.

Ce n'est pas un problème de discipline. C'est un problème de posture.

Le rétroviseur ne te juge pas. Ton cerveau, si.

Quand un pilote regarde ses instruments de bord, il ne se demande pas s'il est un bon ou un mauvais pilote. Il lit une information : altitude, vitesse, cap; et prend une décision en conséquence. L'instrument est neutre. La lecture est factuelle. La réponse est immédiate.

Tes finances devraient fonctionner exactement comme ça. Un tableau de bord ne dit pas "tu as mal fait". Il dit "voilà où tu en es". La distinction est simple à formuler et radicalement difficile à intérioriser quand on a passé des années à lire ses relevés bancaires avec une charge émotionnelle.

Le problème n'est pas l'information. C'est le cadre interprétatif dans lequel on la reçoit.

Pourquoi l'évitement financier s'installe

L'évitement n'est pas une faiblesse de caractère. C'est une réponse rationnelle du cerveau à une source de stress récurrente. Si chaque fois que tu regardes tes finances tu te sens mal, ton cerveau finit par associer le geste au malaise et il évite le geste.

Le mécanisme est précis : on repousse le moment de regarder, on consulte uniquement en cas de problème, on arrive en fin de mois sans avoir rien vu venir. Et là, sous pression émotionnelle, on prend de mauvaises décisions pas parce qu'on manque d'intelligence financière, mais parce qu'on réagit au lieu de piloter.

L'évitement crée exactement la situation qu'il cherche à éviter. C'est le paradoxe central de la mauvaise relation à l'argent.

La posture de pilotage : observer sans juger

Changer de posture ne demande pas de changer de personnalité. Ça demande de changer la question qu'on pose en ouvrant ses finances.

La question punitive : "Qu'est-ce que j'ai mal fait ce mois-ci ?" La question de pilotage : "Où en suis-je ? Qu'est-ce que je décide maintenant ?"

Ce déplacement est minimal en apparence. Il est massif dans ses effets. La première question cherche une faute, spoiler : elle en trouve toujours une; et elle génère de la culpabilité qui mène à l'évitement. La seconde cherche une information, elle en trouve aussi, et elle génère une décision qui maintient le contrôle.

Un pilote qui voit son niveau de carburant descendre ne se reproche pas d'avoir consommé de l'essence. Il cherche la prochaine station.

Voir clair, c'est déjà décider mieux

Le cerveau humain prend de meilleures décisions face à une information claire et organisée que face à une masse de données floues et émotionnellement chargées. Ce n'est pas une question d'intelligence mais de la neurologie basique.

Une bonne visualisation financière permet trois choses distinctes. Identifier rapidement une dérive avant qu'elle s'installe. Confirmer que la trajectoire est cohérente, ce qui réduit l'anxiété de fond. Et prendre une décision sans surcharge mentale parce que l'information est là, lisible, disponible.

À l'inverse, quand les données sont dispersées sur trois banques, un compte joint, un broker ou de l'espèce quand rien n'est catégorisé, quand le dernier regard remonte à trois semaines : l'information fatigue avant d'informer. La décision est repoussée. Le stress monte.

Ce n'est pas un manque de sérieux. C'est l'absence d'un tableau de bord lisible.

De l'observation à la décision : le rôle des rituels

Changer de posture ne suffit pas si on ne change pas la fréquence à laquelle on regarde. Un tableau de bord consulté une fois par mois n'est pas un tableau de bord, c'est un bilan. Et un bilan, par définition, arrive trop tard pour piloter.

Le niveau T du système TEMPO — Tracer, cinq minutes par jour — existe précisément pour ça. Pas pour analyser. Pas pour décider. Juste pour maintenir un contact régulier avec sa situation réelle. Ce contact régulier neutralise progressivement la charge émotionnelle : quand on regarde souvent, chaque regard est petit. Quand on évite, chaque regard devient une confrontation.

C'est là que Steero intervient, pas pour te montrer où tu as failli, mais pour que regarder devienne un réflexe neutre. La saisie est manuelle et intentionnelle : enregistrer une dépense, c'est simplement noter un fait. Pas le juger. Le voir.

Et le niveau M — Maîtriser, quinze minutes par mois — est le moment où l'observation devient décision. Pas un bilan subi. Un choix actif sur où va l'argent le mois suivant.

Ce que change une lecture factuelle de ses finances

Quand les chiffres cessent d'être un jugement pour devenir une information, trois choses se produisent progressivement. La charge émotionnelle diminue — regarder ses finances devient aussi neutre que vérifier la météo avant de sortir. Les décisions s'améliorent — prises à froid, avec de l'information claire, elles sont structurellement meilleures. Et la régularité s'installe — parce qu'on n'évite plus ce qui ne fait plus peur.

Tes finances ne sont pas un bulletin de notes. Elles ne disent rien sur ta valeur, ta discipline ou ton intelligence. Elles indiquent simplement où tu en es, et dans quelle direction tu vas.

La clarté remplace la culpabilité. C'est là que tout change.`
  },
  {
    id: 6,
    titleKey: "blog.articles.6.title",
    hookKey: "blog.articles.6.hook",
    tagsKey: "blog.articles.6.tags",
     content: `50% pour les besoins. 30% pour les envies. 20% pour l'épargne. Simple, clair, rassurant. Et pratiquement inutile si on s'arrête là.

Ce n'est pas que la règle soit fausse. C'est qu'elle répond à la mauvaise question.

Pourquoi cette règle est si populaire et pourquoi c'est un problème

La règle des 50/30/20 a un avantage massif : elle simplifie. Pour quelqu'un qui n'a jamais structuré son budget, elle offre un cadre immédiat, trois catégories claires, l'impression rassurante d'avoir un système. C'est pédagogiquement utile comme pour les petites roues d'un vélo d'apprentissage.

Le problème, c'est qu'on ne garde pas les petites roues d'apprentissage toute sa vie. Et beaucoup de gens restent bloqués là, convaincus d'avoir un système parce qu'ils ont une règle.

Une règle n'est pas un système. C'est un repère statique. Et un repère statique ne s'adapte pas à une vie qui change.

Le problème réel : la règle te dit où aller, pas comment y arriver

Prenons la réalité d'un cadre parisien à 70k brut. Son loyer représente probablement 35 à 40% de son salaire net, soit les deux tiers de ce que la règle alloue aux "besoins". Avant d'avoir payé ses charges, ses transports et son alimentation, il a déjà explosé le ratio. Il n'a pas mal géré. Il vit dans une grande métropole avec des prix immobiliers qui rendent la règle structurellement inapplicable.

Même chose pour un entrepreneur en phase de lancement qui réinvestit l'essentiel de ses revenus dans son activité. Ou un cadre qui traverse une période de transition professionnelle. Ou n'importe qui dont la vie ne rentre pas dans trois cases préformatées.

La règle des 50/30/20 a été pensée pour une vie médiane américaine des années 2000. Elle ne connaît pas ta ville, ton projet, tes priorités, ta phase de vie. Elle te donne des pourcentages et non une direction.

La règle comme rétroviseur

C'est là que l'analogie est exacte. La règle des 50/30/20 fonctionne comme un rétroviseur puisqu'elle te montre où ton argent aurait dû aller selon une norme externe. Et comme tous les rétroviseurs, elle est utile pour un regard rapide, inutile pour piloter.

Piloter, ce n'est pas vérifier si tes dépenses correspondent à un ratio théorique. C'est savoir où tu en es maintenant, décider consciemment où va ton argent le mois prochain, et vérifier régulièrement que ta trajectoire financière soutient ce que tu veux construire. Pas ce qu'une règle dit que tu devrais construire.

La question pertinente n'est pas "est-ce que je respecte le 50/30/20 ?" Elle est "est-ce que mes dépenses reflètent mes vraies priorités ?"

Pourquoi la règle devient culpabilisante sans le vouloir

Quand un outil de gestion est présenté comme une norme, il devient automatiquement un instrument de jugement. Si tu n'épargnes pas 20%, tu as l'impression de mal faire et ce, même si tu traverses une phase de dépenses exceptionnelles parfaitement justifiées, même si tu rembourses un crédit à taux élevé qui vaut mieux que toute épargne, même si tu investis dans une formation qui va doubler tes revenus dans deux ans.

Le problème n'est pas l'écart avec la règle. Le problème, c'est d'avoir une règle rigide à la place d'une compréhension de sa propre situation.

Un écart compris est une décision. Un écart subi est une dérive. La règle ne fait pas cette distinction. Un système de pilotage, si.

Ce qu'il faut à la place : un système adaptatif

Un budget qui fonctionne durablement n'est pas un budget qui respecte des ratios fixes. C'est un budget qui évolue avec toi, qui reflète tes priorités actuelles, et qui te permet de décider consciemment où va chaque euro, pas de vérifier si tu colles à une norme externe.

C'est ce que structure le niveau M du système TEMPO — Maîtriser, quinze minutes par mois. Pas pour vérifier si tu es à 20% d'épargne. Pour répondre à trois questions : où est allé mon argent ce mois-ci ? Est-ce que c'était choisi ou subi ? Où est-ce que je veux qu'il aille le mois prochain ?

Et le niveau P — Positionner, trimestriellement — pour une question plus large : est-ce que ma trajectoire financière globale soutient ce que je veux construire ? Pas un ratio. Une direction.

Utilise la règle comme point de départ, pas comme destination

La règle des 50/30/20 a une vraie utilité : elle force une première structuration. Si tu n'as jamais catégorisé tes dépenses, elle te donne un cadre pour commencer. C'est un déclencheur de questions tel que : pourquoi mes besoins dépassent-ils 50% ? Est-ce structurel ou temporaire ? Quelle part de mes dépenses reflète vraiment mes priorités ?

Ces questions sont bonnes. La règle comme réponse définitive ne l'est pas.

Steero ne te demande pas de rentrer dans des cases préformatées. Il structure tes catégories selon ta réalité, te montre l'écart entre ce que tu avais prévu et ce qui s'est passé, et te donne le cadre pour décider pas pour te conformer.

La règle des 50/30/20 peut être ton point de départ. Le système TEMPO est ce qui fait que tu n'en as plus besoin.`
  },
  {
    id: 7,
    titleKey: "blog.articles.7.title",
    hookKey: "blog.articles.7.hook",
    tagsKey: "blog.articles.7.tags",
    content: `Excel n'est pas le coupable

Soyons clairs : Excel est un excellent outil de gestion budgétaire. Flexible, personnalisable, gratuit, accessible. Des milliers de personnes pilotent leurs finances avec une feuille de calcul et elles le font efficacement depuis des années.

Ce n'est pas l'outil qui échoue. C'est ce qu'on fait ou ne fait pas autour de l'outil.

Chercher un meilleur tableau, un template plus complet, une formule plus élaborée, c'est répondre à la mauvaise question. C'est comme chercher un meilleur agenda quand le problème c'est qu'on ne l'ouvre jamais. L'outil n'est pas en cause. Le rituel autour de l'outil l'est.

La mécanique d'abandon en 3 semaines

Elle est prévisible et elle se déroule toujours de la même façon.

Semaine 1 — l'enthousiasme. Tu télécharges le tableau, tu le personnalises, tu saisis tes premières dépenses avec une rigueur exemplaire. La motivation est haute, l'effort est faible, le résultat semble prometteur.

Semaine 2 — la friction. Une journée chargée, tu oublies de saisir deux dépenses. Puis trois. Le tableau commence à avoir des trous. Rattraper le retard demande plus d'effort que la saisie quotidienne — tu repousses.

Semaine 3 — le découragement. Le tableau est incomplet. Tu ne sais plus si les chiffres sont fiables. L'information partielle est pire qu'inutile et elle donne une fausse impression de contrôle. Tu fermes l'onglet. Pour de bon.

Ce cycle n'a rien à voir avec ta motivation initiale. Il est structurel. Sans rituel défini autour de l'outil, l'abandon est inévitable. Pas parce que tu manques de sérieux, mais parce que le cerveau humain abandonne systématiquement tout comportement sans fréquence fixe et sans feedback immédiat.

Ce qui manque dans tous les tableaux Excel budget

Un tableau Excel, même parfaitement conçu, ne te dit pas quand l'ouvrir. Il ne te rappelle pas que tu as oublié de saisir hier. Il ne te donne pas de signal quand tu dérapes. Il ne te pose pas les bonnes questions au bon moment.

Il attend. Passivement. Que tu penses à lui.

C'est là le problème fondamental de tous les outils sans rituel intégré, ils supposent que l'utilisateur va s'organiser lui-même autour de l'outil. Dans la réalité, une semaine chargée suffit à briser l'habitude. Et une habitude brisée à la semaine 2 ne se reconstruit presque jamais.

Ce qu'il manque dans ton tableau Excel, ce n'est pas une colonne supplémentaire. C'est une cadence. Un moment défini, une fréquence fixe, une question précise à laquelle répondre à chaque ouverture.

Le rituel qui fait vivre n'importe quel outil

La solution n'est pas de changer d'outil. C'est d'installer un rituel autour de l'outil que tu as déjà.

Et ce rituel a une structure précise. Le niveau T du système TEMPO : Tracer; Te donne le cadre minimal pour qu'un outil budgétaire survive au-delà de trois semaines.

Cinq minutes, tous les jours et à minima trois fois par semaine (Exemple : les mardis, jeudis, samedis) juste assez pour que les trous ne s'accumulent pas au point de rendre le rattrapage décourageant. À chaque session, une seule question : qu'est-ce qui s'est passé depuis la dernière fois ? Tu saisis, tu vérifies le classement, tu observes l'impact sur ta trésorerie. Rien de plus.

Ce geste simple, régulier, court, sans ambition d'analyse est ce qui fait la différence entre un tableau vivant et un onglet oublié.

Puis le niveau E — Examiner — dix minutes dans le week-end. Comparer ce qui était prévu à ce qui s'est passé. Identifier les écarts avant qu'ils s'installent. Ce rituel hebdomadaire transforme la saisie quotidienne en information exploitable.

Avec ces deux niveaux en place, n'importe quel outil, Excel inclus, devient fonctionnel durablement.

Alors pourquoi ne pas rester sur Excel ?

Tu peux. Sérieusement. Si tu installes le rituel, Excel fait le travail.

Mais Excel a trois limites structurelles qu'aucun template ne résout. Il n'a pas de mémoire de tes catégories habituelles, chaque saisie part de zéro. Il ne te propose pas de comparaison automatique prévu/réel, tu dois la construire toi-même à chaque mois. Et il n'a aucune logique de fréquence intégrée : il ne sait pas que tu aurais dû l'ouvrir hier.

Ces limites ne sont pas rédhibitoires si tu es rigoureux. Elles deviennent des points de friction qui s'accumulent et les points de friction, sur la durée, tuent les rituels.

Un outil pensé autour du rituel réduit ces frictions sans supprimer le geste conscient de saisir. Des modèles de saisie préremplis pour tes dépenses récurrentes. Une structure prévu/réel intégrée par défaut. Une architecture qui correspond aux cinq niveaux TEMPO : du quotidien à l'annuel.

C'est ce que Steero a été construit pour faire. Pas pour remplacer ta rigueur mais pour que ta rigueur ne s'épuise pas sur des frictions techniques.

Le bon diagnostic change tout

Si ton tableau Excel budget n'a pas tenu, ne cherche pas un meilleur tableau. Cherche le rituel qui manquait autour.

Définis quand tu l'ouvres. Définis ce que tu y fais à chaque ouverture. Définis la question à laquelle tu dois répondre. Pas "comment optimiser mes finances" mais simplement "qu'est-ce qui s'est passé depuis hier ?"

Commence petit. Trois fois par semaine à minima. Cinq minutes. Sans ambition d'exhaustivité au début.

L'outil suit le rituel. Jamais l'inverse.`
  },
  {
    id: 8,
    titleKey: "blog.articles.8.title",
    hookKey: "blog.articles.8.hook",
    tagsKey: "blog.articles.8.tags",
    content: `Les 500€ sont probablement déjà là

Voilà ce que les articles de conseil financier ne te disent jamais : pour la grande majorité des cadres et actifs urbains qui gagnent correctement leur vie, les 500€ d'économies potentielles existent déjà dans leurs dépenses actuelles. Ils ne sont pas cachés dans un sacrifice futur mais sont dispersés dans des dépenses présentes qu'on ne voit pas parce qu'on ne les regarde pas avec suffisamment de granularité.

Les études comportementales sur la perception des dépenses sont sans appel : la plupart des gens sous-estiment leurs dépenses mensuelles réelles de 20 à 30%. Pas parce qu'ils se mentent à eux mêmes mais parce que la mémoire financière est sélective : on retient les gros postes, on oublie les petits débits qui s'accumulent silencieusement entre le 5 et le 25 du mois.

Avant de couper quoi que ce soit, il faut savoir précisément ce qu'on dépense. Pas approximativement. Précisément.

Pourquoi les coupes budgétaires ne fonctionnent pas seules

La logique de la coupe est séduisante : identifie une dépense, supprime la, économise le montant. Propre, simple, immédiat.

Le problème : cette logique traite les symptômes, pas la cause. Si tu ne comprends pas pourquoi une dépense existe, si elle est choisie ou subie, récurrente ou exceptionnelle, compressible ou structurelle, tu risques de couper au hasard. Parfois tu élimines quelque chose qui comptait vraiment. Souvent tu laisses intact ce qui draine silencieusement.

Et surtout : sans système de suivi en place, la dépense supprimée revient sous une autre forme trois semaines plus tard. Le comportement financier ne change pas par décision ponctuelle. Il change par compréhension progressive de ses propres habitudes.

La coupe sans diagnostic est une rustine. Elle tient un mois. Rarement deux.

Le vrai travail : cartographier avant de couper

Économiser 500€ durablement commence par une seule action : regarder précisément où part l'argent sur les 60 à 90 derniers jours. Pas le solde de fin de mois. Les dépenses réelles, catégorisées, dans le détail.

Cet exercice révèle systématiquement quatre types de fuites que personne ne voit venir.

Les abonnements zombies. Ils sont débités entre J+10 et J+20, rarement au même moment, souvent pour des services qu'on n'utilise plus ou qu'on a oubliés. Chaque montant unitaire est faible : 9,99€, 14,99€, 4,99€. Ensemble, ils représentent fréquemment 60 à 120€ par mois chez un actif urbain abonné à une dizaine de services numériques ou autres.

Les dépenses sociales non budgétées. Le dîner de dernière minute, le weekend improvisé, le cadeau oublié, le verre après le bureau. Chaque occurrence semble exceptionnelle. Sur trois mois, elles forment une catégorie à part entière.

Le lissage mental. Le cerveau mémorise les bons mois et efface les mauvais. Résultat : on croit dépenser en moyenne 1 800€ par mois alors qu'on dépense 2 100€. Cet écart de 300€ est invisible jusqu'à ce qu'on le mesure sur trois mois consécutifs.

Les dépenses de confort invisibles. Pas les grandes décisions, les petites frictions quotidiennes qu'on ne conscientise jamais. Le taxi au lieu du métro parce qu'on est en retard. La livraison parce qu'on n'a pas anticipé le repas. Le parking parce qu'on est arrivé trop tard pour trouver gratuit. Individuellement anodines. Collectivement significatives.

Le niveau M de TEMPO : l'endroit où les 500€ apparaissent

C'est précisément pour ça qu'existe le niveau M du système TEMPO — Maîtriser, quinze minutes par mois.

Ce rituel mensuel n'est pas un bilan comptable. C'est un moment de décision consciente. Tu analyses les revenus vs les dépenses, le budget prévu vs le réel, l'évolution de ta trésorerie. Et tu poses trois questions précises : où est allé mon argent ce mois-ci ? Est-ce que c'était choisi ou subi ? Où est-ce que je veux qu'il aille le mois prochain ?

C'est dans ce moment et seulement dans ce moment précis que les 500€ deviennent visibles. Pas avant. Pas en cherchant quoi couper abstraitement. En regardant ce qui s'est réellement passé, catégorie par catégorie, et en décidant consciemment ce qui change.

Mais le niveau M ne fonctionne que si les niveaux T et E sont en place. Sans saisie régulière des dépenses, le niveau T (Tracer) cinq minutes plusieurs fois par semaine, le bilan mensuel repose sur des données incomplètes. Sans revue hebdomadaire, le niveau E (Examiner) dix minutes dans le week-end, les écarts ont eu trois semaines pour s'installer avant d'être vus.

Les 500€ d'économies ne se trouvent pas dans une liste de conseils. Ils se trouvent dans tes propres données financières à condition de les avoir collectées.

Ce que tu peux faire dès cette semaine

Ne commence pas par chercher quoi couper. Commence par regarder.

Trois actions concrètes dans cet ordre :

1. Saisir toutes tes dépenses des deux dernières semaines en les catégorisant précisément, pas en les regroupant dans un "divers" qui ne dit rien.

2. Identifier tes abonnements actifs : tous, y compris ceux débités sur une carte secondaire ou un compte joint.

3. Noter les trois postes de dépenses qui te surprennent le plus : ceux dont le total réel est supérieur à ce que tu aurais estimé spontanément.

Ces trois postes surprenants sont presque toujours là où se trouvent tes 500€.

Steero structure ce travail avec la capture de tous tes abonnements, une vue prévu/réel par catégorie qui rend les écarts immédiatement lisibles sans avoir à construire toi-même les formules ni à maintenir un tableau à jour. La saisie est manuelle et intentionnelle : noter une dépense, c'est déjà commencer à la questionner.

Et le niveau M est intégré directement dans l'outil comme moment de décision mensuelle, pas comme bilan subi.

500€ d'économies ou 500€ de choix ?

La vraie question derrière "comment économiser 500€" n'est pas financière. Elle est comportementale. Est-ce que tu veux économiser 500€ par restriction en te privant de quelque chose ou par lucidité en arrêtant de financer des choses que tu n'as pas vraiment choisies ?

La restriction demande de la discipline. Elle s'épuise. La lucidité demande de l'information. Elle se construit.

Un mois de regard précis sur tes dépenses réelles change plus ta situation financière que six mois de bonnes intentions. Pas parce que tu vas trouver des coupes magiques mais parce que comprendre où part son argent change les décisions en amont, avant que la dépense soit faite.

Les 500€ sont probablement déjà là. Il manque juste le regard pour les voir.`
  },
  {
    id: 9,
    titleKey: "blog.articles.9.title",
    hookKey: "blog.articles.9.hook",
    tagsKey: "blog.articles.9.tags",
    content: `Le marché des apps finance personnelle a un problème structurel

Le secteur des applications de gestion financière repose sur une promesse implicite : plus l'app fait de choses à ta place, mieux elle est. Agrégation automatique des comptes, catégorisation intelligente, alertes en temps réel, prédictions basées sur tes habitudes. Moins tu fais mieux c'est.

C'est une logique de confort. Elle est commercialement efficace car les fonctionnalités se comptent, se comparent, se vendent. Et elle est comportementalement problématique.

Parce qu'une app qui fait tout à ta place ne te rend pas plus compétent financièrement. Elle te rend plus confortable dans ton incompétence actuelle. La différence entre les deux est exactement la différence entre regarder quelqu'un d'autre conduire et apprendre à conduire soi-même.

Ce que les comparatifs ne mesurent jamais

Ouvre n'importe quel comparatif d'applications de gestion financière. Tu vas trouver des critères précis : nombre de banques connectées, qualité de la catégorisation automatique, lisibilité des graphiques, existence d'une version gratuite, note moyenne sur les stores.

Ce que tu ne vas pas trouver : est-ce que les utilisateurs de cette app ont amélioré leur situation financière après six mois d'utilisation ? Est-ce qu'ils comprennent mieux leurs habitudes de dépenses ? Est-ce qu'ils prennent de meilleures décisions financières ?

Ces questions ne sont jamais posées parce qu'elles sont difficiles à mesurer et parce que les réponses seraient inconfortables pour beaucoup d'acteurs du marché.

La vérité que personne ne dit : la majorité des utilisateurs d'apps d'agrégation automatique consultent leurs données une à deux fois par mois et souvent moins. Ils ont une vision de leur situation. Ils n'ont pas développé une compétence de pilotage.

Le rétroviseur automatique vs le pare-brise conscient

Les apps d'agrégation tel que Finary, Bankin, Linxo et leurs équivalents font une chose très bien : te montrer où est allé ton argent. Automatiquement, proprement, sans effort de ta part. C'est utile. C'est aussi fondamentalement limité.

Un rétroviseur automatique te montre la route déjà parcourue. Il ne te demande rien. Il ne t'apprend rien. Et surtout, il ne te prépare pas à prendre de meilleures décisions la prochaine fois, parce que tu n'as jamais eu à te confronter activement à tes propres comportements financiers.

La question pertinente n'est pas "quelle app me donne la meilleure vision de mon passé financier ?" Elle est "quelle app m'aide à mieux piloter mon avenir financier ?"

Ce sont deux produits différents. Ils répondent à deux besoins différents.

Ce qu'une app doit vraiment faire pour changer ta situation

Changer durablement sa situation financière ne vient pas d'une meilleure visualisation du passé. Ça vient de trois choses précises.

Développer une conscience financière régulière. Pas une notification quotidienne qu'on ignore. Un geste actif, court et répété qui maintient un contact conscient avec sa situation réelle. La conscience financière se construit par exposition régulière, pas par consultation passive d'un dashboard.

Installer une fréquence de regard adaptée à chaque niveau de décision. Les décisions quotidiennes ne demandent pas le même regard que les décisions mensuelles ou les orientations annuelles. Une app qui traite tout au même niveau en affichant tout en permanence crée de la confusion, pas de la clarté.

Créer de la friction intentionnelle aux bons endroits. C'est contre-intuitif dans un marché qui vend de la fluidité mais la friction légère est un outil comportemental puissant. Enregistrer manuellement une dépense prend dix secondes. Ces dix secondes sont le moment où tu conscientises la dépense où tu te demandes si elle était prévue, si elle était nécessaire, si elle correspond à tes priorités. Automatiser ce geste, c'est supprimer ce moment de conscience. Et c'est exactement ce moment qui change les décisions futures.

Pourquoi l'automatisation totale ne tient pas sa promesse

L'argument de l'agrégation automatique est séduisant : moins de friction, plus d'utilisation, meilleure vision. En théorie. En pratique, le taux d'abandon des apps d'agrégation après 90 jours est massif — précisément parce que l'automatisation supprime l'engagement actif de l'utilisateur.

Un outil qu'on consulte passivement finit par ne plus être consulté du tout. La notification devient un bruit de fond. Le dashboard devient un onglet qu'on n'ouvre plus. Et six mois après le téléchargement, la situation financière est exactement la même : mieux documentée certes mais pas mieux pilotée.

L'automatisation résout le problème de l'effort de saisie. Elle ne résout pas le problème de l'absence de rituel. Et c'est le rituel qui fait toute la différence.

Les critères qui comptent vraiment pour choisir une app

Avant de comparer des features, pose-toi quatre questions.

Est-ce que cette app m'engage activement ou me laisse passif ? Un outil qui fait tout à ta place ne développe aucune compétence. Un outil qui structure ton engagement développe une discipline durable.

Est-ce que cette app a une logique de fréquence intégrée ? Pas des notifications push mais une architecture qui distingue ce qu'on fait quotidiennement, hebdomadairement, mensuellement, trimestriellement, annuellement. Sans cette architecture, tout se mélange et rien n'est actionnable au bon moment.

Est-ce que cette app distingue l'observation de la décision ? Voir où est allé son argent et décider où il va sont deux actes différents. Une app qui les confond dans le même dashboard ne t'aide pas à décider : elle t'aide à constater.

Est-ce que cette app me rend dépendant d'elle ou progressivement plus autonome ? La meilleure app de gestion financière est celle dont tu n'as plus besoin dans cinq ans parce qu'elle t'a aidé à développer une vraie compétence de pilotage. Pas celle dont tu es plus dépendant chaque mois parce qu'elle gère à ta place.

Le paradoxe de la meilleure app

La meilleure app pour gérer son argent n'est pas la plus automatisée. Ce n'est pas celle qui connecte le plus de banques. Ce n'est pas celle qui a les graphiques les plus beaux ni la catégorisation la plus précise.

C'est celle qui change ton comportement financier durablement. Celle qui te fait regarder plus souvent, comprendre plus clairement, décider plus consciemment. Celle qui installe un système pas un dashboard.

Steero a été construit à rebours de la tendance du marché. La saisie y est manuelle et intentionnelle parce que ce geste est un acte de conscience, pas une friction inutile. Des modèles préremplis réduisent ce geste à quelques secondes sans le supprimer et l'architecture entière repose sur le système TEMPO qui sont cinq niveaux de rituels, du quotidien à l'annuel, chacun avec une question précise et un temps défini.

Pas une app de plus à consulter passivement. Un système de pilotage à installer activement.

La différence n'est pas dans les features. Elle est dans ce que tu deviens après six mois d'utilisation.`
  },
  {
    id: 10,
    titleKey: "blog.articles.10.title",
    hookKey: "blog.articles.10.hook",
    tagsKey: "blog.articles.10.tags",
    content: `Payer fait, ou ne fait plus mal : ce que la recherche dit vraiment

L'expérience qui a tout changé

En 2001, deux chercheurs du MIT, Drazen Prelec et Duncan Simester, publient une étude qui va devenir une référence en économie comportementale. Leur question est simple : est-ce qu'on dépense différemment selon qu'on paie en cash ou par carte ?

Leur protocole : une enchère pour des billets de matchs très demandés. Une moitié des participants paie en cash. L'autre par carte de crédit. Résultat : les participants payant par carte étaient prêts à dépenser près du double de ceux qui payaient en liquide. À valeur perçue identique, le mode de paiement avait quasiment doublé le consentement à payer.

Ce n'est pas une question de pouvoir d'achat. C'est une question de câblage cognitif.

Pourquoi la carte découple l'achat de la douleur

Prelec et Simester introduisent un concept précis : le pain of paying, la douleur de payer. Quand tu sors un billet de 50€ de ton portefeuille, ton cerveau enregistre une perte immédiate. Tu la vois. Tu la tiens. Tu la lâches. Cette friction sensorielle active les mêmes zones neurologiques que la douleur physique et c'est documenté par imagerie cérébrale.

Quand tu paies par carte, ce mécanisme est court-circuité. Le geste est identique qu'il s'agisse de 12€ ou de 1 200€. Il n'y a pas de perte visible. Pas de friction. L'achat et le paiement sont découplés, séparés dans le temps et dans la perception. Ton cerveau traite une transaction, pas une perte.

Et ça change tout ce qui suit.

La comptabilité mentale : comment ton cerveau classe et déforme l'argent

L'argent du casino et l'argent du salaire ne sont pas le même argent

Richard Thaler, prix Nobel d'économie, a formalisé un concept que tu vis sans le nommer : la comptabilité mentale. Ton cerveau ne traite pas l'argent comme une masse homogène. Il le classe dans des comptes séparés selon sa source, sa destination, son format.

L'argent gagné à un jeu est dépensé plus facilement que l'argent du salaire. Un remboursement inattendu part plus vite qu'une prime attendue. Et le solde affiché sur ton écran de banque semble moins réel que les billets dans ton portefeuille même si le montant est identique.

Ce n'est pas de l'irresponsabilité. C'est de la cognition.

Ce que ça change concrètement dans tes fins de mois

L'effet est direct : quand l'argent n'a pas de forme physique, il perd de son poids mental. Les micro-dépenses s'accumulent sans que ton cerveau les comptabilise vraiment. Un abonnement prélevé automatiquement ? Invisible.

Un paiement sans contact à 8h du matin ? Inexistant dans ta mémoire de la journée. Un achat sur app, un clic, une livraison : zéro friction, zéro trace cognitive.

Ce n'est pas que tu dépenses trop. C'est que tu dépenses sans le ressentir. Et ce que tu ne ressens pas, tu ne le pilotes pas.

L'anesthésie de l'argent numérique : ce que les apps automatiques aggravent

Quand tout est agrégé, rien ne compte

Les apps d'agrégation bancaire celles qui connectent tes comptes et catégorisent tout automatiquement ont résolu un problème réel : la visibilité. Tu peux voir où est allé ton argent le mois dernier. C'est utile.

Mais elles ont introduit un problème plus silencieux : elles ont supprimé le dernier moment de conscience qui restait dans le parcours de dépense. Tu n'as pas eu à noter. Pas eu à te souvenir. Pas eu à faire face. L'app a tout absorbé à ta place.

Le résultat : tu observes le passé sans jamais avoir vécu le présent. Tu regardes un rapport de dépenses comme tu regardes un relevé météo d'une semaine que tu n'as pas vécue. C'est de l'information. Pas de la conscience. C'est exactement ce que Steero a choisi de ne pas reproduire.

Le rétroviseur ne fait pas mal : c'est son problème

Un agrégateur automatique, c'est un rétroviseur parfaitement net. Il te montre tout ce qui s'est passé derrière toi, avec précision. Mais regarder un rétroviseur ne change pas la trajectoire. Ça ne fait pas mal. Et ce qui ne fait pas mal ne modifie pas le comportement.

La douleur de payer même atténuée, même symbolique, est une information. C'est ton cerveau qui te dit : quelque chose a changé dans ta situation. Quand cette information disparaît, le comportement dérive. Pas d'un coup. Progressivement. Imperceptiblement. Jusqu'à la fin de mois que tu n'arrives pas à expliquer.

La saisie manuelle comme acte de conscience : pourquoi c'est un choix de design

Enregistrer une dépense, c'est la ressentir

Quand tu saisis manuellement une dépense : 34€ au restaurant, 12€ d'abonnement, 80€ de courses; Tu fais exactement ce que le cash forçait à faire : tu reconnectes l'achat à la perte. Pas de façon dramatique. Pas douloureusement. Mais consciemment.

Ce geste simple réintroduit la friction que la carte a supprimée. Il force un micro-moment d'attention : tu as dépensé ça. Maintenant tu le sais. Maintenant ça compte.

C'est neuro scientifiquement cohérent avec ce que Prelec et Simester ont documenté : la saillance du paiement avec sa visibilité, sa présence dans la conscience qui modifie directement le comportement de dépense. Pas après. Pendant. Et surtout : avant la prochaine fois.

C'est exactement ce que Steero a choisi de ne pas automatiser

Steero ne connecte pas tes comptes pour agréger à ta place. C'est une décision de design, pas une limitation technique. La saisie manuelle est le mécanisme. C'est elle qui réinstalle la douleur de payer dans un monde où tout a été fait pour la supprimer.

Et parce que la vie financière ne se résume pas à un compte courant : espèces, Ticket Restaurant, solde Vinted, compte commun, cagnotte; Steero permet de tout tracer dans un seul endroit, quel que soit le portefeuille. Pas pour automatiser. Pour centraliser la conscience. C'est exactement ce que permet Steero : tenir un registre de tout ce qui sort, quelle qu'en soit la forme, pour que rien ne disparaisse dans l'angle mort cognitif.

Comment installer ce mécanisme dans ta vie : le rituel T de TEMPO

5 minutes par jour : Pas pour noter, pour ressentir

Le premier niveau du système TEMPO, c'est Tracer. Quotidien. 5 minutes. L'idée n'est pas de tenir une comptabilité à la virgule près. C'est de maintenir le lien entre toi et ta situation financière réelle.

Concrètement : chaque soir, ou dans le moment, tu saisis ce qui est sorti. Ce que tu as mangé, payé, abonné, transféré. Pas pour te juger. Pour ne pas laisser la carte faire ce qu'elle fait par défaut rendre la dépense invisible.

Ce rituel ne demande pas de discipline extraordinaire. Il demande 5 minutes et la décision de ne pas déléguer ta conscience financière à un algorithme.

Ce que ça change au bout de 3 semaines

La plupart des gens qui passent à la saisie manuelle régulière rapportent la même chose : ce n'est pas qu'ils dépensent moins mais ils savent pourquoi ils dépensent. La décision devient consciente. Le glissement invisible s'arrête. Pas parce qu'ils se sont imposé des règles strictes. Parce qu'ils ont réintroduit la friction que le système financier moderne avait soigneusement effacée.

C'est ça, piloter. Pas observer le passé. Ressentir le présent pour choisir l'avenir.

Ton cerveau a été conçu pour ressentir la dépense. La carte lui a volé ce signal. La saisie manuelle le lui rend.

C'est exactement pour ça que Steero ne t'agrège rien automatiquement. Essaie 14 jours et remarque ce que tu ressens la première fois que tu saisis une dépense.`
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
    "Ce n'est pas que tu dépenses trop. C'est que tu regardes trop rarement.",
    "Les 4 fuites invisibles qui plombent un budget cadre",
    "Pourquoi les bonnes résolutions ne fonctionnent pas",
    "La vraie solution : un système de pilotage à 5 niveaux",
    "Par où commencer quand on part de zéro",
    "Ce que tu vas changer cette semaine"
  ],
  2: [
    "Subir ou piloter : la seule distinction qui compte",
    "Étape 1 : Observer sans juger (niveau Tracer)",
    "Étape 2 : Structurer pour transformer des chiffres en information (niveau Examiner)",
    "Étape 3 : Comprendre les écarts pour reprendre la main (niveau Maîtriser)",
    "Étape 4 : Aligner finances et objectifs (niveaux Positionner et Orienter)",
    "Pourquoi la montée en compétences échoue avant d'avoir commencé",
    "Le pilotage s'apprend. Comme n'importe quelle compétence."
  ],
  3: [
    "La majorité des apps de finance personnelle sont des rétroviseurs",
    "Un rituel n'est pas un bilan mensuel",
    "Pourquoi les rituels financiers échouent avant de commencer",
    "Le système TEMPO : cinq rituels, cinq fréquences, un seul cap",
    "Ce que ça change concrètement",
    "Le seul outil qui fonctionne est celui qu'on utilise régulièrement"
  ],
  4: [
    "Le vrai problème : on essaie de tout faire d'un coup",
    "Un rituel, une question. Pas plus.",
    "Les 5 niveaux du système TEMPO",
    "Alors, 2 minutes : mythe ou réalité ?",
    "Ce que change une architecture de rituels"
  ],
  5: [
    "Le rétroviseur ne te juge pas. Ton cerveau, si.",
    "Pourquoi l'évitement financier s'installe",
    "La posture de pilotage : observer sans juger",
    "Voir clair, c'est déjà décider mieux",
    "De l'observation à la décision : le rôle des rituels",
    "Ce que change une lecture factuelle de ses finances"
  ],
  6: [
    "Pourquoi cette règle est si populaire et pourquoi c'est un problème",
    "Le problème réel : la règle te dit où aller, pas comment y arriver",
    "La règle comme rétroviseur",
    "Pourquoi la règle devient culpabilisante sans le vouloir",
    "Ce qu'il faut à la place : un système adaptatif",
    "Utilise la règle comme point de départ, pas comme destination"
  ],
  7: [
    "Excel n'est pas le coupable",
    "La mécanique d'abandon en 3 semaines",
    "Ce qui manque dans tous les tableaux Excel budget",
    "Le rituel qui fait vivre n'importe quel outil",
    "Alors pourquoi ne pas rester sur Excel ?",
    "Le bon diagnostic change tout"
  ],
  8: [
    "Les 500€ sont probablement déjà là",
    "Pourquoi les coupes budgétaires ne fonctionnent pas seules",
    "Le vrai travail : cartographier avant de couper",
    "Le niveau M de TEMPO : l'endroit où les 500€ apparaissent",
    "Ce que tu peux faire dès cette semaine",
    "500€ d'économies ou 500€ de choix ?"
  ],
  9: [
    "Le marché des apps finance personnelle a un problème structurel",
    "Ce que les comparatifs ne mesurent jamais",
    "Le rétroviseur automatique vs le pare-brise conscient",
    "Ce qu'une app doit vraiment faire pour changer ta situation",
    "Pourquoi l'automatisation totale ne tient pas sa promesse",
    "Les critères qui comptent vraiment pour choisir une app",
    "Le paradoxe de la meilleure app"
  ],
  10: [
    "Payer fait, ou ne fait plus mal : ce que la recherche dit vraiment",
    "Pourquoi la carte découple l'achat de la douleur",
    "La comptabilité mentale : comment ton cerveau classe et déforme l'argent",
    "Ce que ça change concrètement dans tes fins de mois",
    "L'anesthésie de l'argent numérique : ce que les apps automatiques aggravent",
    "Le rétroviseur ne fait pas mal : c'est son problème",
    "La saisie manuelle comme acte de conscience : pourquoi c'est un choix de design",
    "C'est exactement ce que Steero a choisi de ne pas automatiser",
    "Comment installer ce mécanisme dans ta vie : le rituel T de TEMPO",
    "Ce que ça change au bout de 3 semaines"
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
  onOpenArticle?: (id: number) => void;
}

const ArticleCard = ({ article, t, isOpen, onToggle, cardRef, openWaitlist, onOpenArticle }: ArticleCardProps) => {
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const hook = t(article.hookKey);
  const title = t(article.titleKey);
  const rawTags = t(article.tagsKey, { returnObjects: true });
  const tags = Array.isArray(rawTags) ? rawTags as string[] : [];
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

              {/* Related links section - Article 3 */}
              {article.id === 3 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenArticle?.(1);
                      }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Tu dépenses trop chaque mois : voici pourquoi</span>
                    </button>
                    <a
                      href="https://medium.com/essentiels/bj-fogg-cr%C3%A9ez-un-changement-durable-avec-de-petites-habitudes-5086dc9d9d37"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Étude sur la formation des habitudes (BJ Fogg, Tiny Habits)</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 2 (La montée en compétences) */}
              {article.id === 2 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(1); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Tu dépenses trop chaque mois : voici pourquoi (et comment l'arrêter)</span>
                    </button>
                    <a
                      href="https://www.youtube.com/watch?v=Ss8yEyijZ8k"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>James Clear, Atomic Habits — sur la formation des habitudes par étapes</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 1 (Tu dépenses trop) */}
              {article.id === 1 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel, aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(10); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Ta carte bancaire t'a rendu financièrement anesthésié</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Related links section - Article 4 (5 minutes par jour) */}
              {article.id === 4 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(1); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Tu dépenses trop chaque mois</span>
                    </button>
                    <a
                      href="https://des-livres-pour-changer-de-vie.com/changer-vie-methode-petites-habitudes/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>BJ Fogg, Tiny Habits — sur l'ancrage des micro-comportements</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 6 (Règle 50/30/20) */}
              {article.id === 6 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(1); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Tu dépenses trop chaque mois</span>
                    </button>
                    <a
                      href="https://www.youtube.com/watch?v=DmMSG7Lzopk"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Elizabeth Warren, All Your Worth — origine de la règle 50/30/20 et son contexte d'origine</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 7 (Tableau Excel budget) */}
              {article.id === 7 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(4); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>5 minutes par jour pour ne plus jamais subir sa fin de mois</span>
                    </button>
                    <a
                      href="https://medium.com/essentiels/bj-fogg-cr%C3%A9ez-un-changement-durable-avec-de-petites-habitudes-5086dc9d9d37"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>BJ Fogg, Tiny Habits — sur la construction des habitudes par ancrage comportemental</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 8 (Économiser 500€) */}
              {article.id === 8 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(1); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Tu dépenses trop chaque mois</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(10); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Ta carte bancaire t'a rendu financièrement anesthésié</span>
                    </button>
                    <a
                      href="https://thedecisionlab.com/fr/insights/consumer-insights/this-is-your-brain-on-money"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Étude comportementale sur la sous-estimation des dépenses — Journal of Consumer Research</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 9 (Meilleure app) */}
              {article.id === 9 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(2); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>La montée en compétences financières</span>
                    </button>
                    <a
                      href="https://des-livres-pour-changer-de-vie.com/hooked/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Nir Eyal, Hooked — sur les mécanismes d'engagement des produits numériques</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 10 (Carte bancaire douleur de payer) */}
              {article.id === 10 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(5); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Tes finances ne sont pas un bulletin de notes. Arrête de les lire comme tel.</span>
                    </button>
                    <a
                      href="https://cdn1.nyt.com/packages/pdf/Alwaysleavehome-2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Prelec, D. & Simester, D. (2001). Always leaving home without it. Marketing Letters</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Related links section - Article 5 (Finances vs bulletin de notes) */}
              {article.id === 5 && (
                <div className="mt-8 p-5 bg-muted/50 rounded-xl border border-primary/10">
                  <h4 className="text-sm font-semibold text-foreground mb-4">Ces articles pourraient t'intéresser :</h4>
                  <div className="space-y-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(3); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>Pourquoi sans rituel aucun outil financier ne fonctionne</span>
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenArticle?.(4); }}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      <span>5 minutes par jour pour ne plus jamais subir sa fin de mois</span>
                    </button>
                    <a
                      href="https://thedecisionlab.com/fr/thinkers/economics/daniel-kahneman"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Daniel Kahneman, Thinking Fast and Slow — sur les biais émotionnels dans la prise de décision</span>
                    </a>
                  </div>
                </div>
              )}
              
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
  const allTags = Array.from(new Set(articles.flatMap(article => {
    const raw = t(article.tagsKey, { returnObjects: true });
    return Array.isArray(raw) ? raw as string[] : [];
  })));

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

  const openSpecificArticle = (id: number) => {
    setOpenArticles(prev => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
    setTimeout(() => {
      const el = articleRefs.current.get(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
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
    const rawTags = t(article.tagsKey, { returnObjects: true });
    const tags = Array.isArray(rawTags) ? rawTags as string[] : [];
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
                          onOpenArticle={openSpecificArticle}
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
        {/* Background banner image */}
        <div className="absolute inset-0">
          <img src={steeroBanner} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-primary/50" />
        </div>
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
