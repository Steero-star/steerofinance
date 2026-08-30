// Contenu éditorial du blog. Le corps des articles est en français (langue de référence) ;
// titres, accroches et tags sont traduits via i18n (blog.articles.<id>.*).
// Les titres de section servent à la fois de sommaire et de détection des intertitres dans le contenu.

export interface ArticleReference {
  label: string;
  href: string;
}

export interface Article {
  id: number;
  slug: string;
  /** Date de première publication (ISO, sans heure) */
  date: string;
  /** Ids des articles à lire ensuite, dans l'ordre d'affichage */
  related: number[];
  reference?: ArticleReference;
  /** Intertitres, dans l'ordre du contenu */
  sections: string[];
  content: string;
}

/** Articles dans l'ordre éditorial de la une (le premier est l'article de tête). */
export const articles: Article[] = [
  {
    id: 3,
    slug: "pourquoi-sans-rituel-aucun-outil-financier-ne-fonctionne",
    date: "2026-05-03",
    related: [1, 10],
    reference: {
      label: "BJ Fogg, Tiny Habits — sur la formation des habitudes",
      href: "https://medium.com/essentiels/bj-fogg-cr%C3%A9ez-un-changement-durable-avec-de-petites-habitudes-5086dc9d9d37",
    },
    sections: [
      "La majorité des apps de finance personnelle sont des rétroviseurs",
      "Un rituel n'est pas un bilan mensuel",
      "Pourquoi les rituels financiers échouent avant de commencer",
      "Le système TEMPO : cinq rituels, cinq fréquences, un seul cap",
      "Ce que ça change concrètement",
      "Le seul outil qui fonctionne est celui qu'on utilise régulièrement",
    ],
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

Tracer : quotidien, 5 minutes. Enregistrer ses opérations récentes, vérifier le classement, observer l'impact sur la trésorerie. Aucune analyse attendue juste le geste de saisir. Et ce geste compte : noter une dépense, c'est déjà en prendre conscience. C'est là que le comportement change, en amont, avant que la décision soit prise.

Examiner : hebdomadaire, 10 minutes. Comparer ce qu'on avait prévu à ce qui s'est passé. Identifier les écarts avant qu'ils s'installent. Ajuster une catégorie si nécessaire. Ce rituel est le pont entre l'opérationnel et la décision mensuelle, il t'évite l'effet "je verrai en fin de mois" qui est systématiquement trop tard.

Maîtriser : mensuel, 15 minutes. Analyser revenus vs dépenses, budget prévu vs réel, évolution de la trésorerie. Décider consciemment où va l'argent le mois suivant. Ce n'est pas un bilan subi mais bien un acte de pilotage. La question n'est pas "où est passé mon argent ?" mais "est-ce que je choisis où il va ?"

Positionner : trimestriel, 30 minutes. Prendre de la hauteur. Ne plus regarder les dépenses mais regarder la direction. Est-ce que ma trésorerie évolue dans le bon sens ? Est-ce que mes finances soutiennent ce que je veux construire ? Ce rituel sort du transactionnel pour entrer dans le stratégique.

Orienter : annuel, 60 minutes. Bilan global. Évolution du patrimoine, discipline installée, habitudes ancrées ou abandonnées. Et surtout : définir les grandes orientations. Ce rituel ne gère pas, il décide de la direction. C'est lui qui donne du sens à tous les autres.

Ce que ça change concrètement

Le premier effet visible arrive en 7 à 10 jours. Pas un gain financier spectaculaire, une clarté mentale. Tu sais où tu en es. Tu sais quoi faire. Tu ne devines plus.

Après un mois, les décisions changent naturellement. Pas parce que tu te forces mais parce que tu vois. Et voir change le comportement en amont, avant la dépense, pas après.

Après trois mois, le pilotage est installé. Les rituels ne sont plus un effort mais un réflexe. Et la charge mentale liée à l'argent a significativement diminué.

Le seul outil qui fonctionne est celui qu'on utilise régulièrement

C'est la règle la plus simple et la plus ignorée.

L'outil parfait qu'on n'ouvre plus au bout de deux semaines ne vaut rien. Un rituel imparfait mais tenu vaut tout.

C'est pour ça que Steero est construit autour de la méthode TEMPO. Les cinq niveaux de rituels sont intégrés directement dans l'outil. La saisie quotidienne se fait en quelques secondes avec des modèles préremplis, sans supprimer le geste conscient d'enregistrer. Et chaque niveau du système s'ouvre naturellement quand le précédent est ancré.

Ce n'est pas un outil de plus. C'est le premier outil construit pour que tu l'utilises vraiment.

Installe le rituel. L'outil suit.`,
  },
  {
    id: 2,
    slug: "montee-en-competences-financieres-du-flou-au-pilotage",
    date: "2026-05-03",
    related: [3, 1],
    reference: {
      label: "James Clear, Atomic Habits — sur la formation des habitudes par étapes",
      href: "https://www.youtube.com/watch?v=Ss8yEyijZ8k",
    },
    sections: [
      "Subir ou piloter : la seule distinction qui compte",
      "Étape 1 : Observer sans juger (niveau Tracer)",
      "Étape 2 : Structurer pour transformer des chiffres en information (niveau Examiner)",
      "Étape 3 : Comprendre les écarts pour reprendre la main (niveau Maîtriser)",
      "Étape 4 : Aligner finances et objectifs (niveaux Positionner et Orienter)",
      "Pourquoi la montée en compétences échoue avant d'avoir commencé",
      "Le pilotage s'apprend. Comme n'importe quelle compétence.",
    ],
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

Steero est construit autour de cette logique de progression. Les cinq niveaux TEMPO sont intégrés dans l'outil, pas comme des fonctionnalités à découvrir, mais comme une structure de pilotage à installer progressivement. Tu commences par Tracer. Le reste suit naturellement.`,
  },
  {
    id: 1,
    slug: "tu-depenses-trop-chaque-mois-voici-pourquoi",
    date: "2026-05-03",
    related: [3, 10],
    sections: [
      "Ce n'est pas que tu dépenses trop. C'est que tu regardes trop rarement.",
      "Les 4 fuites invisibles qui plombent un budget cadre",
      "Pourquoi les bonnes résolutions ne fonctionnent pas",
      "La vraie solution : un système de pilotage à 5 niveaux",
      "Par où commencer quand on part de zéro",
      "Ce que tu vas changer cette semaine",
    ],
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

Cinq minutes par jour et quinze minutes par mois changent plus une situation financière que n'importe quelle règle d'austérité. Pas parce qu'ils révèlent des fuites magiques, mais parce qu'ils installent une conscience active de là où va ton argent. Et cette conscience change les décisions, en amont, avant que la dépense soit faite.

Le système TEMPO est la méthode. Steero est l'outil construit pour l'implémenter, avec la friction juste, les rituels structurés, et la vision dont tu as besoin pour piloter, pas juste suivre.`,
  },
  {
    id: 4,
    slug: "5-minutes-par-jour-pour-ne-plus-subir-sa-fin-de-mois",
    date: "2026-05-03",
    related: [3, 1],
    reference: {
      label: "BJ Fogg, Tiny Habits — sur l'ancrage des micro-comportements",
      href: "https://des-livres-pour-changer-de-vie.com/changer-vie-methode-petites-habitudes/",
    },
    sections: [
      "Le vrai problème : on essaie de tout faire d'un coup",
      "Un rituel, une question. Pas plus.",
      "Les 5 niveaux du système TEMPO",
      "Alors, 2 minutes : mythe ou réalité ?",
      "Ce que change une architecture de rituels",
    ],
    content: `Le vrai problème : on essaie de tout faire d'un coup

La gestion financière paraît lourde parce qu'elle est pensée comme un bloc monolithique. Un bilan mensuel de deux heures, ou rien. Un tableau Excel complet, ou abandon. Tout comprendre, tout analyser, tout décider en une seule session.

Ce mode de fonctionnement génère trois problèmes qui se renforcent mutuellement. La surcharge mentale d'abord avec trop de décisions à prendre en même temps qui épuise. La confusion ensuite, quand tout est mélangé, rien n'est clair. L'abandon enfin, un système trop lourd ne tient jamais.

La solution n'est pas de réduire le temps. C'est de séparer les rôles.

Un rituel, une question. Pas plus.

Un rituel financier efficace ne cherche jamais à tout faire. Il répond à une seule question, à une fréquence précise, en un temps défini. C'est cette séparation qui rend le système tenable et durable.

C'est exactement la logique d'un pilote. Il ne fait pas le bilan de vol, la vérification des instruments, la planification de la prochaine destination et la communication avec la tour de contrôle en même temps. Chaque action a son moment, sa fréquence, son objectif. Ensemble, elles forment un système de pilotage cohérent.

Pour les finances personnelles, c'est identique. Le système TEMPO structure cinq niveaux de rituels : chacun avec une vocation précise, une durée adaptée, une question centrale.

Les 5 niveaux du système TEMPO

Tracer : quotidien, 5 minutes. La question : est-ce que je vois ce qui se passe en ce moment ? Le rôle : maintenir le lien avec sa situation réelle. Enregistrer les opérations récentes, vérifier le classement, observer l'impact sur la trésorerie. Pas d'analyse, juste la conscience. C'est ce rituel qui évite la déconnexion progressive, les mauvaises surprises et l'évitement émotionnel. Il ne décide pas. Il voit.

Examiner : hebdomadaire, 10 minutes. La question : est-ce que je suis sur la trajectoire prévue ? Le rôle : corriger avant que l'écart devienne une dérive. Comparer la semaine réelle à la semaine prévue, identifier ce qui a dérapé, ajuster une catégorie si nécessaire. Ce rituel est le pont entre le quotidien et la décision mensuelle, il t'évite d'arriver en fin de mois sans avoir rien vu venir.

Maîtriser : mensuel, 15 minutes. La question : est-ce que je décide consciemment où va mon argent ? Le rôle : passer de la réaction à la décision. Analyser revenus vs dépenses, comprendre les écarts, construire le budget du mois suivant. Ce n'est pas un bilan subi, c'est un acte de pilotage. La nuance change tout.

Positionner : trimestriel, 30 minutes. La question : est-ce que mes finances avancent dans la bonne direction ? Le rôle : sortir du transactionnel pour entrer dans le stratégique. Observer les tendances sur trois mois, évaluer la cohérence globale, identifier ce qui doit évoluer. Ce rituel donne du recul là où les trois premiers donnent de la précision.

Orienter : annuel, 60 minutes. La question : quelle vie est-ce que je soutiens par mes décisions financières ? Le rôle : aligner finances et objectifs de vie. Bilan global de l'année, grandes orientations pour la suivante, arbitrages stratégiques. C'est le rituel de sens, celui qui donne de la valeur à tous les autres.

Alors, 2 minutes : mythe ou réalité ?

Ni l'un ni l'autre. Le rituel quotidien de Tracer peut tenir en moins 5 minutes quand le système est en place et la saisie fluide. Mais cette rapidité n'est pas une promesse de facilité, c'est le résultat d'une structure installée.

Ce qui est un mythe : croire qu'on peut gérer ses finances sérieusement avec 2 minutes par semaine sans cadre. Ce qui est réel : un rituel quotidien de 5 minutes, ancré dans une architecture cohérente, change durablement le rapport à l'argent pas parce qu'il prend peu de temps, mais parce qu'il est régulier.

La régularité bat l'intensité. Toujours.

Ce que change une architecture de rituels

Quand chaque rituel a une vocation claire et une fréquence définie, trois choses se produisent. La charge mentale diminue et on ne cherche plus à tout traiter en même temps. La régularité s'installe puisque chaque rituel est adapté pour ne pas être repoussé. Et les décisions sont prises au bon moment avec la bonne information et pas sous pression.

La gestion financière cesse d'être une tâche redoutée. Elle devient un système de pilotage discret, régulier et efficace.

Steero est structuré autour de cette architecture. Les cinq niveaux TEMPO sont intégrés directement dans l'outil. La saisie quotidienne se fait en quelques secondes avec des modèles préremplis sans supprimer le geste conscient d'enregistrer. Et chaque niveau du système s'ouvre naturellement quand le précédent est ancré.

Ce n'est pas le temps qui manque pour gérer ses finances. C'est la structure.`,
  },
  {
    id: 5,
    slug: "tes-finances-ne-sont-pas-un-bulletin-de-notes",
    date: "2026-05-03",
    related: [3, 4],
    reference: {
      label: "Daniel Kahneman, Thinking Fast and Slow — sur les biais émotionnels dans la prise de décision",
      href: "https://thedecisionlab.com/fr/thinkers/economics/daniel-kahneman",
    },
    sections: [
      "Le rétroviseur ne te juge pas. Ton cerveau, si.",
      "Pourquoi l'évitement financier s'installe",
      "La posture de pilotage : observer sans juger",
      "Voir clair, c'est déjà décider mieux",
      "De l'observation à la décision : le rôle des rituels",
      "Ce que change une lecture factuelle de ses finances",
    ],
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

Le niveau T du système TEMPO (Tracer, cinq minutes par jour) existe précisément pour ça. Pas pour analyser. Pas pour décider. Juste pour maintenir un contact régulier avec sa situation réelle. Ce contact régulier neutralise progressivement la charge émotionnelle : quand on regarde souvent, chaque regard est petit. Quand on évite, chaque regard devient une confrontation.

C'est là que Steero intervient, pas pour te montrer où tu as failli, mais pour que regarder devienne un réflexe neutre. La saisie est manuelle et intentionnelle : enregistrer une dépense, c'est simplement noter un fait. Pas le juger. Le voir.

Et le niveau M (Maîtriser, quinze minutes par mois) est le moment où l'observation devient décision. Pas un bilan subi. Un choix actif sur où va l'argent le mois suivant.

Ce que change une lecture factuelle de ses finances

Quand les chiffres cessent d'être un jugement pour devenir une information, trois choses se produisent progressivement. La charge émotionnelle diminue : regarder ses finances devient aussi neutre que vérifier la météo avant de sortir. Les décisions s'améliorent : prises à froid, avec de l'information claire, elles sont structurellement meilleures. Et la régularité s'installe, parce qu'on n'évite plus ce qui ne fait plus peur.

Tes finances ne sont pas un bulletin de notes. Elles ne disent rien sur ta valeur, ta discipline ou ton intelligence. Elles indiquent simplement où tu en es, et dans quelle direction tu vas.

La clarté remplace la culpabilité. C'est là que tout change.`,
  },
  {
    id: 6,
    slug: "regle-50-30-20-limites-alternative",
    date: "2026-05-03",
    related: [3, 1],
    reference: {
      label: "Elizabeth Warren, All Your Worth — origine de la règle 50/30/20 et son contexte",
      href: "https://www.youtube.com/watch?v=DmMSG7Lzopk",
    },
    sections: [
      "Pourquoi cette règle est si populaire et pourquoi c'est un problème",
      "Le problème réel : la règle te dit où aller, pas comment y arriver",
      "La règle comme rétroviseur",
      "Pourquoi la règle devient culpabilisante sans le vouloir",
      "Ce qu'il faut à la place : un système adaptatif",
      "Utilise la règle comme point de départ, pas comme destination",
    ],
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

C'est ce que structure le niveau M du système TEMPO (Maîtriser, quinze minutes par mois). Pas pour vérifier si tu es à 20% d'épargne. Pour répondre à trois questions : où est allé mon argent ce mois-ci ? Est-ce que c'était choisi ou subi ? Où est-ce que je veux qu'il aille le mois prochain ?

Et le niveau P (Positionner, trimestriellement) pour une question plus large : est-ce que ma trajectoire financière globale soutient ce que je veux construire ? Pas un ratio. Une direction.

Utilise la règle comme point de départ, pas comme destination

La règle des 50/30/20 a une vraie utilité : elle force une première structuration. Si tu n'as jamais catégorisé tes dépenses, elle te donne un cadre pour commencer. C'est un déclencheur de questions tel que : pourquoi mes besoins dépassent-ils 50% ? Est-ce structurel ou temporaire ? Quelle part de mes dépenses reflète vraiment mes priorités ?

Ces questions sont bonnes. La règle comme réponse définitive ne l'est pas.

Steero ne te demande pas de rentrer dans des cases préformatées. Il structure tes catégories selon ta réalité, te montre l'écart entre ce que tu avais prévu et ce qui s'est passé, et te donne le cadre pour décider pas pour te conformer.

La règle des 50/30/20 peut être ton point de départ. Le système TEMPO est ce qui fait que tu n'en as plus besoin.`,
  },
  {
    id: 7,
    slug: "pourquoi-tableau-excel-budget-ne-tient-pas",
    date: "2026-05-03",
    related: [3, 4],
    reference: {
      label: "BJ Fogg, Tiny Habits — sur la construction des habitudes par ancrage comportemental",
      href: "https://medium.com/essentiels/bj-fogg-cr%C3%A9ez-un-changement-durable-avec-de-petites-habitudes-5086dc9d9d37",
    },
    sections: [
      "Excel n'est pas le coupable",
      "La mécanique d'abandon en 3 semaines",
      "Ce qui manque dans tous les tableaux Excel budget",
      "Le rituel qui fait vivre n'importe quel outil",
      "Alors pourquoi ne pas rester sur Excel ?",
      "Le bon diagnostic change tout",
    ],
    content: `Excel n'est pas le coupable

Soyons clairs : Excel est un excellent outil de gestion budgétaire. Flexible, personnalisable, gratuit, accessible. Des milliers de personnes pilotent leurs finances avec une feuille de calcul et elles le font efficacement depuis des années.

Ce n'est pas l'outil qui échoue. C'est ce qu'on fait ou ne fait pas autour de l'outil.

Chercher un meilleur tableau, un template plus complet, une formule plus élaborée, c'est répondre à la mauvaise question. C'est comme chercher un meilleur agenda quand le problème c'est qu'on ne l'ouvre jamais. L'outil n'est pas en cause. Le rituel autour de l'outil l'est.

La mécanique d'abandon en 3 semaines

Elle est prévisible et elle se déroule toujours de la même façon.

Semaine 1 : l'enthousiasme. Tu télécharges le tableau, tu le personnalises, tu saisis tes premières dépenses avec une rigueur exemplaire. La motivation est haute, l'effort est faible, le résultat semble prometteur.

Semaine 2 : la friction. Une journée chargée, tu oublies de saisir deux dépenses. Puis trois. Le tableau commence à avoir des trous. Rattraper le retard demande plus d'effort que la saisie quotidienne, tu repousses.

Semaine 3 : le découragement. Le tableau est incomplet. Tu ne sais plus si les chiffres sont fiables. L'information partielle est pire qu'inutile et elle donne une fausse impression de contrôle. Tu fermes l'onglet. Pour de bon.

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

Puis le niveau E (Examiner), dix minutes dans le week-end. Comparer ce qui était prévu à ce qui s'est passé. Identifier les écarts avant qu'ils s'installent. Ce rituel hebdomadaire transforme la saisie quotidienne en information exploitable.

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

L'outil suit le rituel. Jamais l'inverse.`,
  },
  {
    id: 8,
    slug: "economiser-500-euros-ce-mois-ci",
    date: "2026-05-03",
    related: [1, 3, 10],
    reference: {
      label: "Étude comportementale sur la sous-estimation des dépenses — Journal of Consumer Research",
      href: "https://thedecisionlab.com/fr/insights/consumer-insights/this-is-your-brain-on-money",
    },
    sections: [
      "Les 500€ sont probablement déjà là",
      "Pourquoi les coupes budgétaires ne fonctionnent pas seules",
      "Le vrai travail : cartographier avant de couper",
      "Le niveau M de TEMPO : l'endroit où les 500€ apparaissent",
      "Ce que tu peux faire dès cette semaine",
      "500€ d'économies ou 500€ de choix ?",
    ],
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

C'est précisément pour ça qu'existe le niveau M du système TEMPO (Maîtriser, quinze minutes par mois).

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

Les 500€ sont probablement déjà là. Il manque juste le regard pour les voir.`,
  },
  {
    id: 9,
    slug: "meilleure-app-pour-gerer-son-argent",
    date: "2026-05-03",
    related: [3, 2],
    reference: {
      label: "Nir Eyal, Hooked — sur les mécanismes d'engagement des produits numériques",
      href: "https://des-livres-pour-changer-de-vie.com/hooked/",
    },
    sections: [
      "Le marché des apps finance personnelle a un problème structurel",
      "Ce que les comparatifs ne mesurent jamais",
      "Le rétroviseur automatique vs le pare-brise conscient",
      "Ce qu'une app doit vraiment faire pour changer ta situation",
      "Pourquoi l'automatisation totale ne tient pas sa promesse",
      "Les critères qui comptent vraiment pour choisir une app",
      "Le paradoxe de la meilleure app",
    ],
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

L'argument de l'agrégation automatique est séduisant : moins de friction, plus d'utilisation, meilleure vision. En théorie. En pratique, le taux d'abandon des apps d'agrégation après 90 jours est massif, précisément parce que l'automatisation supprime l'engagement actif de l'utilisateur.

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

La différence n'est pas dans les features. Elle est dans ce que tu deviens après six mois d'utilisation.`,
  },
  {
    id: 10,
    slug: "carte-bancaire-douleur-de-payer-saisie-manuelle",
    date: "2026-05-03",
    related: [3, 5],
    reference: {
      label: "Prelec, D. & Simester, D. (2001). Always leaving home without it. Marketing Letters",
      href: "https://cdn1.nyt.com/packages/pdf/Alwaysleavehome-2.pdf",
    },
    sections: [
      "Payer fait, ou ne fait plus mal : ce que la recherche dit vraiment",
      "Pourquoi la carte découple l'achat de la douleur",
      "La comptabilité mentale : comment ton cerveau classe et déforme l'argent",
      "Ce que ça change concrètement dans tes fins de mois",
      "L'anesthésie de l'argent numérique : ce que les apps automatiques aggravent",
      "Le rétroviseur ne fait pas mal : c'est son problème",
      "La saisie manuelle comme acte de conscience : pourquoi c'est un choix de design",
      "C'est exactement ce que Steero a choisi de ne pas automatiser",
      "Comment installer ce mécanisme dans ta vie : le rituel T de TEMPO",
      "Ce que ça change au bout de 3 semaines",
    ],
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

C'est exactement pour ça que Steero ne t'agrège rien automatiquement. Essaie 14 jours et remarque ce que tu ressens la première fois que tu saisis une dépense.`,
  },
  {
    id: 11,
    slug: "creer-une-routine-fondement-change",
    date: "2026-05-10",
    related: [3, 4],
    sections: [
      "Pourquoi les routines échouent (et pourquoi les tiennes ont échoué)",
      "Les trois éléments d'une routine qui tient",
      "Comment créer ta première routine (et la tenir)",
      "La routine est l'accès à tout le reste",
      "Commence maintenant",
    ],
    content: `Tu essaies depuis des années. Des apps, des calendriers, des résolutions et rien ne tient. Au bout de trois semaines, tu as abandonné.

Pas parce que tu manques de discipline. Parce que tu n'as pas de routine.

Une routine n'est pas une promesse. C'est une structure. Et cette structure est le seul levier qui transforme durablement ta vie.

Pourquoi les routines échouent (et pourquoi les tiennes ont échoué)

La plupart des gens cible une routine trop compliquée. Méditation 20 min, gym 1h, journal 15 min, lecture 30 min et le jour 4, c'est fini.

Pourquoi ? Parce qu'une routine doit être si simple qu'elle fonctionne même quand tu as zéro motivation.

Ta routine n'a pas échoué parce que tu es faible. Elle a échoué parce qu'elle n'était pas actionnable.

La vraie question n'est pas "que devrais-je faire ?" mais "que ferai-je même si je n'ai pas envie ?"

Les trois éléments d'une routine qui tient

L'ancre

Une ancre, c'est un moment existant de ta journée. Pas "je vais créer un nouveau moment". Non. Tu accroches ta routine à un moment qui existe déjà.

Exemples d'ancres solides :
• Après ton café du matin
• Après ta douche
• Juste avant de te coucher
• Au réveil, avant de vérifier ton téléphone

L'ancre crée l'automaticité. Tu n'as pas à te demander "est-ce que je fais ma routine ?" L'habitude s'attache à un moment qui existe déjà.

La friction minimale

Plus ta routine demande d'effort d'accès, plus elle meurt vite.

Si ta routine exige que tu ouvres une app, attendes 3 secondes de chargement, navigues dans 4 menus, elle sera morte dans la semaine parce que tu trouveras une excuse le jour 3.

La meilleure routine c'est celle que tu peux commencer en 10 secondes. Pas 10 minutes. 10 secondes.

Pas besoin de rendre ça joli. Juste accessible.

La fréquence avant l'intensité

C'est l'erreur numéro un : "Je vais faire 1h de gym tous les jours" ou "Je vais lire 100 pages par jour".

Les routines qui tiennent c'est la fréquence. Pas l'intensité.

5 min chaque jour > 1h une fois par semaine.

Pourquoi ? Parce que la fréquence crée le lien automatique avec l'ancre. Et c'est ce lien qui tue la routine : le moment où elle demande de la volonté consciente, et plus de l'habitude.

Comment créer ta première routine (et la tenir)

Étape 1 : Choisis ton ancre

Pense à 3 moments de ta journée qui sont non-négociables. Des moments que tu fais même quand tu es malade, en voyage, stressé.

Prends celui qui correspond le mieux à ce que tu veux faire.

Étape 2 : Définir l'action en 5 minutes

Pas 20 minutes. Pas 15. Cinq minutes maximum.

Et c'est important : c'est la durée que ça prend réellement, pas celle que tu aimerais faire. Si tu veux lire, ne dis pas "je vais lire 30 min". Dis "je vais lire 5 pages".

Si tu veux bouger, ce n'est pas gym intensif. C'est 10 pas dehors.

Le truc contre-intuitif ? Les petites routines deviennent plus grandes naturellement. Une fois que tu as l'habitude, tu resteras souvent 10 min au lieu de 5. Mais jamais si tu commences à 20 et que tu démissionnes à la semaine 3.

Étape 3 : Supprime la friction d'accès

Tout doit être prêt. Pas de setup. Pas d'attente. Pas de choix.

• Livre sur ta table de nuit (pas en bibliothèque)
• Tapis de yoga déjà déroulé (pas dans un placard)
• Cahier et stylo prêts (pas à chercher)

Étape 4 : Les trois premières semaines

Les trois premières semaines, la routine n'est PAS optionnelle. Elle est aussi non-négociable que te brosser les dents.

Les trois premières semaines, c'est dur. Pas parce que tu n'as pas la capacité. Parce que ta structure neurologique n'a pas encore fait la liaison automatique.

Après trois semaines, ça devient facile. Pas parce que tu es motivé. Parce que tu n'as plus à penser : tu le fais simplement.

La routine est l'accès à tout le reste

C'est la chose que personne ne te dit : une routine n'est pas une fin en soi.

Une routine est l'accès à tout ce que tu veux vraiment faire.

Pourquoi ? Parce qu'une routine t'enseigne que tu peux tenir un engagement envers toi-même. Et une fois que tu sais ça (vraiment, pas intellectuellement mais en le vivant), tout le reste devient possible.

C'est exactement ce que permet une routine bien fichée : créer le lien entre "j'ai une intention" et "j'agis". Pas une fois. Régulièrement. Consciemment.

Et c'est ce lien qui change le jeu.

Steero c'est exactement ça : une routine pour installer une discipline de pilotage. Cinq minutes chaque jour pour enregistrer, observer, rester conscient de ta situation. Pas une app qui remplace ta réflexion. Un système qui la construit.

Commence maintenant

Choisis ton ancre. Choisis une action que tu peux faire en 5 min. Élimine la friction. Et pendant les trois premières semaines, fais le. Point.

Pas de "je vais commencer lundi" car lundi c'est l'excuse des gens qui n'y arrivent pas. Commence maintenant. Après ton prochain café. Ou ta prochaine douche.

C'est tout ce qu'il faut pour que tout change.

Tu veux construire une routine de pilotage financier ? Steero offre des modèles préremplis qui réduisent la friction : tout est déjà structuré, tu as juste à taper 5 min chaque jour. Essaie gratuitement.`,
  },
];

export const articleBySlug = (slug: string): Article | undefined =>
  articles.find((a) => a.slug === slug);

export const articleById = (id: number): Article | undefined =>
  articles.find((a) => a.id === id);

/** Temps de lecture en minutes (~200 mots/min) */
export const readingTime = (article: Article): number =>
  Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200));
