/**
 * LE GUIDE D'UTILISATION — UN CHEMIN CHEZ NOUS, UNE DESTINATION AILLEURS.
 *
 * Le guide est une page Notion publiée sur le web, donc lisible sans compte. Le
 * site la propose depuis le footer : quelqu'un qui veut comprendre le modèle
 * avant de payer doit pouvoir le faire, et jusqu'au 02/09/2026 il ne le pouvait
 * pas — le guide n'était atteignable que depuis l'app, après connexion.
 *
 * ## Pourquoi un chemin relatif et pas l'adresse Notion
 *
 * Ce qu'on publie est `steero.fr/guide`. La vraie destination vit dans
 * **`vercel.json`**, en redirection 302. Deux raisons :
 *
 * 1. **C'est l'adresse qu'on partage**, dans le footer comme dans un message.
 *    Une URL `notion.so` avec un identifiant de 32 caractères ne se dicte pas.
 * 2. **Elle survit au déménagement.** Le jour où le guide passe sous
 *    `aide.steero.fr` (option domaine custom de Notion), c'est une ligne de
 *    `vercel.json` à changer, et rien d'autre sur le site.
 *
 * Le 302 est délibéré, pas un oubli : un 301 se met en cache dans le navigateur
 * pour toujours, et le déménagement ci-dessus deviendrait invisible aux
 * visiteurs déjà passés.
 *
 * ⚠️ **En développement, ce lien ne redirige pas.** `vercel.json` n'est lu qu'en
 * production : sur `npm run dev`, `/guide` tombe dans le catch-all du SPA. Ce
 * n'est pas une régression, c'est la contrepartie assumée d'une jolie adresse.
 *
 * ## Le contenu ne se corrige pas ici
 *
 * Le maître est `Cowork OS/Product/Product Resources/base-de-connaissance.md`,
 * dans le vault. Le guide Notion en est la surface publiée : ce qui est VRAI y
 * descend depuis le maître, ce à quoi ça RESSEMBLE vit dans Notion. Changer
 * cette constante ne change pas une ligne du guide.
 *
 * ## L'app a sa propre porte
 *
 * `steero/src/lib/aide.ts` porte l'**adresse Notion en dur**, parce que l'app
 * n'est pas derrière ce domaine et ne bénéficie pas de cette redirection. Deux
 * dépôts, pas de paquet partagé : si la destination change, elle change dans
 * `vercel.json` ici **et** dans le fichier de l'app là-bas.
 */
export const GUIDE_URL = "/guide";
