import type { QuizQuestion } from './CourseQuiz';

export interface ClassicQuiz {
  title: string;
  questions: QuizQuestion[];
}

export const classicQuizzes: Record<string, ClassicQuiz> = {
  'apprentissage-non-supervise': {
    title: 'Quiz\u00A0: apprentissage non supervisé',
    questions: [
      {
        question: "Qu'est-ce qui distingue l'apprentissage non supervisé\u00A0?",
        options: [
          'Il utilise des étiquettes pour chaque exemple',
          'Il cherche des structures sans variable cible étiquetée',
          'Il ne utilise jamais de données',
          'Il garantit des groupes toujours pertinents',
        ],
        correctAnswer: 1,
        explanation: "Sans étiquette, l'algorithme cherche des groupes, des axes de variation ou des associations. La pertinence des groupes doit être interprétée et validée.",
      },
      {
        question: 'Que fait le clustering de type k-means\u00A0?',
        options: [
          'Il prédit une classe à partir d\'exemples étiquetés',
          'Il réduit toujours un jeu de données à deux dimensions',
          'Il regroupe des points proches autour de centres',
          'Il supprime les valeurs manquantes',
        ],
        correctAnswer: 2,
        explanation: "K-means cherche des centres et affecte chaque point au centre le plus proche. Le nombre de groupes et la distance choisie influencent le résultat.",
      },
      {
        question: 'À quoi sert une réduction de dimension comme l\'ACP\u00A0?',
        options: [
          'À étiqueter automatiquement les données',
          'À supprimer le besoin de validation',
          'À garantir que les groupes sont vrais',
          'À projeter les données dans un espace plus compact en conservant une partie de la variance',
        ],
        correctAnswer: 3,
        explanation: "L'ACP projette les données sur des axes qui résument une partie de la variance. Elle facilite la visualisation et l'exploration, mais ne prouve pas que les groupes ont un sens métier.",
      },
    ],
  },
  'chain-of-prompts': {
    title: 'Quiz\u00A0: chaînes de prompts',
    questions: [
      {
        question: 'Pourquoi découper une tâche complexe en plusieurs prompts\u00A0?',
        options: [
          'Pour vérifier et corriger les résultats à chaque étape',
          'Pour supprimer toute vérification humaine',
          'Pour garantir une réponse exacte',
          'Pour éviter d\'écrire une consigne précise',
        ],
        correctAnswer: 0,
        explanation: "Le découpage permet de contrôler les étapes intermédiaires. Il ne garantit pas l'exactitude : chaque sortie doit être vérifiée.",
      },
      {
        question: 'Que faut-il faire entre deux étapes d\'une chaîne\u00A0?',
        options: [
          'Tout oublier et repartir de zéro',
          'Vérifier la sortie intermédiaire et décider si elle est utilisable',
          'Publier la sortie sans relecture',
          'Changer de modèle à chaque étape',
        ],
        correctAnswer: 1,
        explanation: "La chaîne est utile si les sorties intermédiaires sont relues. Une erreur non détectée se propage aux étapes suivantes.",
      },
      {
        question: 'Quand une chaîne de prompts est-elle moins adaptée qu\'un seul prompt\u00A0?',
        options: [
          'Quand la tâche est courte et tient dans une consigne claire',
          'Quand la tâche est longue',
          'Quand il faut vérifier des étapes',
          'Quand plusieurs sources doivent être comparées',
        ],
        correctAnswer: 0,
        explanation: "Pour une tâche simple, multiplier les étapes ajoute du coût et des occasions d'erreur. La solution la plus simple qui suffit est souvent préférable.",
      },
    ],
  },
  'coder-avec-ia': {
    title: 'Quiz\u00A0: coder avec l\'IA',
    questions: [
      {
        question: 'Que faire du code généré avant de l\'exécuter en production\u00A0?',
        options: [
          'Le considérer comme sûr parce qu\'il compile',
          'Le relire, le tester et vérifier les dépendances',
          'Le publier sans test',
          'Supprimer les tests pour aller plus vite',
        ],
        correctAnswer: 1,
        explanation: "Un code qui compile n'est pas forcément correct ou sûr. La relecture, les tests et la vérification des dépendances restent nécessaires.",
      },
      {
        question: 'Quel risque faut-il surveiller dans un assistant de code\u00A0?',
        options: [
          'Il peut inventer une API ou une fonction qui n\'existe pas',
          'Il connaît toujours la version exacte de vos dépendances',
          'Il ne propose jamais de code incorrect',
          'Il supprime automatiquement les secrets',
        ],
        correctAnswer: 0,
        explanation: "Les assistants peuvent produire des appels plausibles mais inexistants. Il faut vérifier la documentation et faire tourner les tests.",
      },
      {
        question: 'Que faire des secrets et des données sensibles dans un prompt de code\u00A0?',
        options: [
          'Les coller pour obtenir un meilleur résultat',
          'Les envoyer dans un fichier public',
          'Les retirer ou les remplacer par des valeurs fictives',
          'Les stocker dans le code source',
        ],
        correctAnswer: 2,
        explanation: "Un service en ligne ne doit pas recevoir de secrets inutiles. On travaille avec des valeurs fictives et on garde les secrets dans un gestionnaire prévu pour cela.",
      },
    ],
  },
  'ia-entreprise': {
    title: 'Quiz\u00A0: IA en entreprise',
    questions: [
      {
        question: 'Par quoi commencer un projet d\'IA en entreprise\u00A0?',
        options: [
          'Par le choix du modèle le plus récent',
          'Par le problème métier, les utilisateurs et le processus concerné',
          'Par l\'achat de GPU',
          'Par la rédaction d\'une promesse de gains',
        ],
        correctAnswer: 1,
        explanation: "Le modèle est un moyen. Le problème, le processus et les personnes qui prennent la décision déterminent le projet.",
      },
      {
        question: 'Comment présenter un retour sur investissement\u00A0?',
        options: [
          'Comme un chiffre unique et garanti',
          'Sans hypothèses, pour simplifier',
          'Avec des hypothèses datées et une fourchette',
          'En cachant les coûts de relecture',
        ],
        correctAnswer: 2,
        explanation: "Un retour sur investissement dépend de coûts et de volumes. Les hypothèses doivent être explicites et le résultat présenté comme une estimation.",
      },
      {
        question: 'Pourquoi prévoir une supervision humaine\u00A0?',
        options: [
          'Pour remplacer les tests',
          'Parce que le modèle est toujours faux',
          'Pour éviter toute mesure',
          'Parce que certaines décisions ont des conséquences juridiques ou humaines',
        ],
        correctAnswer: 3,
        explanation: "La supervision est nécessaire quand une erreur peut affecter une personne, un contrat ou un droit. Elle ne remplace pas les tests, elle les complète.",
      },
    ],
  },
  'ia-ethique': {
    title: 'Quiz\u00A0: éthique de l\'IA',
    questions: [
      {
        question: 'Qu\'est-ce qu\'un biais dans un système d\'IA\u00A0?',
        options: [
          'Une erreur de couleur dans l\'interface',
          'Un écart systématique de traitement entre des groupes ou des situations',
          'Un modèle qui refuse toutes les demandes',
          'Une panne réseau',
        ],
        correctAnswer: 1,
        explanation: "Un biais est un écart systématique, pas une erreur isolée. Il peut venir des données, de la définition de la cible ou de l'usage du système.",
      },
      {
        question: 'Que signifie «\u00A0transparence\u00A0» pour un système d\'IA\u00A0?',
        options: [
          'Publier tous les secrets du modèle',
          'Expliquer suffisamment le fonctionnement, les limites et les usages pour permettre un contrôle',
          'Cacher les sources',
          'Supprimer les journaux',
        ],
        correctAnswer: 1,
        explanation: "La transparence ne signifie pas tout publier. Elle demande une information compréhensible sur le système, ses limites et les responsabilités.",
      },
      {
        question: 'Pourquoi une décision automatisée peut-elle nécessiter une révision humaine\u00A0?',
        options: [
          'Parce qu\'elle peut produire des effets importants sur une personne',
          'Parce qu\'elle est toujours illégale',
          'Parce qu\'un humain ne se trompe jamais',
          'Parce que cela supprime le besoin de données',
        ],
        correctAnswer: 0,
        explanation: "Une décision qui affecte un droit, un accès ou une situation personnelle peut exiger un recours et une révision humaine.",
      },
    ],
  },
  'ia-marketing-vente': {
    title: 'Quiz\u00A0: IA, marketing et vente',
    questions: [
      {
        question: 'Que faut-il vérifier avant de personnaliser une campagne avec des données clients\u00A0?',
        options: [
          'Uniquement la couleur du bouton',
          'La base légale, la finalité et les droits des personnes',
          'Le nombre de followers',
          'Le prix du GPU',
        ],
        correctAnswer: 1,
        explanation: "La personnalisation repose sur des données. Il faut vérifier la base légale, la finalité, la minimisation et les droits d'accès et de rectification.",
      },
      {
        question: 'Pourquoi une promesse commerciale générée par IA doit-elle être relue\u00A0?',
        options: [
          'Parce qu\'elle peut être fausse, exagérée ou non conforme',
          'Parce qu\'elle est toujours exacte',
          'Parce qu\'elle ne peut pas être publiée',
          'Parce qu\'elle supprime le besoin de preuve',
        ],
        correctAnswer: 0,
        explanation: "Un modèle peut produire une formulation plausible mais fausse. Les promesses, chiffres et mentions légales doivent être vérifiés.",
      },
      {
        question: 'Quel indicateur est le plus utile pour juger une campagne assistée par IA\u00A0?',
        options: [
          'Le nombre de mots générés',
          'La longueur du prompt',
          'Le nombre de modèles testés',
          'Un indicateur métier défini à l\'avance, comparé à une base de référence',
        ],
        correctAnswer: 3,
        explanation: "Sans critère métier et sans comparaison, un résultat ne dit pas si la campagne fonctionne. L'indicateur doit être défini avant le test.",
      },
    ],
  },
  'nlp-comprehension': {
    title: 'Quiz\u00A0: NLP et LLM',
    questions: [
      {
        question: 'Qu\'est-ce qu\'un token\u00A0?',
        options: [
          'Un mot toujours complet',
          'Une unité de texte traitée par le modèle, qui peut être un mot, un morceau de mot ou un signe',
          'Un paramètre du modèle',
          'Une phrase entière',
        ],
        correctAnswer: 1,
        explanation: "La tokenisation découpe le texte en unités. Un token ne correspond pas toujours à un mot, surtout dans les langues et les mots rares.",
      },
      {
        question: 'À quoi sert l\'attention dans un Transformer\u00A0?',
        options: [
          'À stocker les données en base',
          'À compresser l\'image',
          'À pondérer les relations entre les unités de la séquence',
          'À supprimer les tokens',
        ],
        correctAnswer: 2,
        explanation: "L'attention calcule des poids entre les unités. Elle permet au modèle de relier des éléments proches ou éloignés dans la séquence.",
      },
      {
        question: 'Que ne garantit pas un modèle de langage\u00A0?',
        options: [
          'La production de texte fluide',
          'La vérité des affirmations qu\'il génère',
          'L\'utilisation de tokens',
          'La prédiction du token suivant',
        ],
        correctAnswer: 1,
        explanation: "Un modèle produit une suite probable de tokens. Il peut générer une phrase fluide et fausse. La vérification des faits reste nécessaire.",
      },
    ],
  },
  'organiser-services-ia': {
    title: 'Quiz\u00A0: organiser ses services d\'IA',
    questions: [
      {
        question: 'Pourquoi tenir un inventaire des services d\'IA utilisés\u00A0?',
        options: [
          'Pour savoir qui a accès à quoi et quelles données circulent',
          'Pour augmenter le nombre d\'outils',
          'Pour éviter de documenter les usages',
          'Pour supprimer les comptes',
        ],
        correctAnswer: 0,
        explanation: "L'inventaire permet de repérer les comptes, les données, les responsables et les accès. Sans inventaire, un service oublié reste un risque.",
      },
      {
        question: 'Quel principe appliquer aux accès\u00A0?',
        options: [
          'Donner tous les droits à tout le monde',
          'Partager un compte unique',
          'Donner le minimum de droits nécessaires',
          'Désactiver l\'authentification',
        ],
        correctAnswer: 2,
        explanation: "Le moindre privilège limite les dégâts en cas d'erreur ou de compromission. Les comptes partagés rendent les responsabilités floues.",
      },
      {
        question: 'Que faire d\'un service qui n\'est plus utilisé\u00A0?',
        options: [
          'Le laisser ouvert pour plus tard',
          'Le documenter sans jamais le fermer',
          'Le partager avec plus de personnes',
          'Fermer le compte et supprimer les données selon la politique prévue',
        ],
        correctAnswer: 3,
        explanation: "Un service inutilisé reste une surface d'attaque et une donnée conservée sans nécessité. La fermeture doit suivre une procédure documentée.",
      },
    ],
  },
  'utiliser-ia-travail': {
    title: 'Quiz\u00A0: utiliser l\'IA au travail',
    questions: [
      {
        question: 'Que faire avant d\'envoyer un document interne à un assistant en ligne\u00A0?',
        options: [
          'Vérifier la politique de l\'organisation et retirer les données inutiles',
          'L\'envoyer en entier pour gagner du temps',
          'Le publier sur un forum',
          'Désactiver les contrôles d\'accès',
        ],
        correctAnswer: 0,
        explanation: "Les données de l'organisation peuvent être confidentielles. La politique interne, la finalité et la minimisation doivent être vérifiées avant l'envoi.",
      },
      {
        question: 'Une réponse d\'IA est claire et détaillée. Que faut-il faire\u00A0?',
        options: [
          'La considérer comme validée',
          'La vérifier sur les sources et les faits importants',
          'La publier sans relire',
          'Supprimer les sources',
        ],
        correctAnswer: 1,
        explanation: "La clarté n'est pas une preuve. Les affirmations importantes doivent être vérifiées, surtout dans un cadre professionnel.",
      },
      {
        question: 'Pourquoi documenter un usage d\'IA dans l\'organisation\u00A0?',
        options: [
          'Pour empêcher toute utilisation',
          'Pour éviter de former les équipes',
          'Pour connaître la finalité, les données, les risques et le responsable',
          'Pour augmenter le nombre d\'outils',
        ],
        correctAnswer: 2,
        explanation: "La documentation permet de gouverner l'usage, de répondre aux obligations et de corriger un problème. Elle ne bloque pas l'usage par principe.",
      },
    ],
  },
};
