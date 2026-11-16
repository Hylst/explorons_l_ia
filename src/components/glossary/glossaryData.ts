// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Termes du glossaire : source unique pour la page Glossaire (TermsGlossary) et pour le nombre affiché à l'accueil
// (StatsSection). Ajouter ou retirer un terme ici met les deux à jour.

export type GlossaryCategory = 'general' | 'technical' | 'ethical' | 'memory' | 'advanced';

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: GlossaryCategory;
}

export const aiTerms: GlossaryTerm[] = [
  // GENERAL TERMS
  {
    term: "Intelligence artificielle",
    definition: "Ensemble de technologies permettant à des machines de simuler des fonctions cognitives humaines comme l'apprentissage, la résolution de problèmes et la prise de décision.",
    category: "general"
  },
  {
    term: "Machine Learning (apprentissage automatique)",
    definition: "Branche de l'IA qui permet aux systèmes d'apprendre et de s'améliorer à partir de l'expérience sans être explicitement programmés.",
    category: "general"
  },
  {
    term: "IA étroite (ou faible)",
    definition: "IA conçue et entraînée pour une tâche spécifique, comme la reconnaissance d'images ou la traduction automatique.",
    category: "general"
  },
  {
    term: "IA générale (ou forte)",
    definition: "IA hypothétique possédant des capacités cognitives comparables à celles des humains, capable d'accomplir n'importe quelle tâche intellectuelle qu'un être humain peut accomplir.",
    category: "general"
  },
  {
    term: "Agents intelligents",
    definition: "Entités autonomes qui perçoivent leur environnement via des capteurs, interprètent les données et agissent en conséquence pour atteindre des objectifs spécifiques.",
    category: "general"
  },
  {
    term: "Singularité technologique",
    definition: "Point hypothétique où l'IA dépasserait l'intelligence humaine, entraînant des changements imprévisibles dans la civilisation et l'évolution technologique.",
    category: "general"
  },
  {
    term: "IA multimodale",
    definition: "Système capable de traiter plusieurs types de données, ou modalités (texte, image, son, vidéo), en entrée, en sortie ou les deux, au sein d'un même modèle. Exemple\u00A0: répondre à une question posée à partir d'une photo.",
    category: "general"
  },
  {
    term: "Interface cerveau-machine",
    definition: "Technologie permettant une communication directe entre le cerveau et un dispositif externe, souvent assistée par des algorithmes d'IA pour interpréter les signaux neurologiques.",
    category: "general"
  },
  {
    term: "Effet de vallée dérangeante (uncanny valley)",
    definition: "Hypothèse selon laquelle une apparence ou une voix artificielle presque (mais pas tout à fait) humaine provoque un sentiment de malaise ou de rejet, plus marqué que ne le ferait un aspect nettement artificiel. Aussi appelée «\u00A0vallée de l'étrange\u00A0».",
    category: "general"
  },
  {
    term: "Système expert",
    definition: "Système informatique qui émule la capacité de prise de décision d'un expert humain dans un domaine spécifique, en utilisant une base de connaissances et des règles d'inférence.",
    category: "general"
  },
  
  {
    term: "Modèle (d'IA)",
    definition: "Fonction mathématique, définie par un ensemble de paramètres appris pendant l'entraînement, qui transforme une entrée (texte, image, données chiffrées) en sortie (prédiction, classement, texte, image). L'algorithme d'apprentissage est la méthode qui ajuste ces paramètres à partir des données\u00A0; le modèle est le résultat que l'on utilise ensuite.",
    category: "general"
  },
  {
    term: "Chatbot (agent conversationnel)",
    definition: "Programme qui dialogue avec un utilisateur en langage naturel, par écrit ou à l'oral. Certains suivent des scénarios et des règles écrites à l'avance\u00A0; d'autres s'appuient sur un modèle de langage, ce qui les rend plus souples mais ne supprime pas le risque d'erreur.",
    category: "general"
  },

  // TECHNICAL TERMS
  {
    term: "Deep Learning (apprentissage profond)",
    definition: "Sous-ensemble du machine learning basé sur des réseaux de neurones artificiels avec plusieurs couches (réseaux profonds) pour modéliser des abstractions de haut niveau.",
    category: "technical"
  },
  {
    term: "Réseau de neurones",
    definition: "Modèle de calcul inspiré du fonctionnement des neurones biologiques, constitué de nœuds interconnectés organisés en couches qui transmettent et traitent des signaux.",
    category: "technical"
  },
  {
    term: "NLP (Natural Language Processing, traitement du langage naturel)",
    definition: "Domaine de l'IA qui se concentre sur l'interaction entre les ordinateurs et le langage humain, permettant aux machines de comprendre, interpréter et générer du texte.",
    category: "technical"
  },
  {
    term: "Apprentissage supervisé",
    definition: "Technique d'apprentissage où l'algorithme est entraîné sur des données étiquetées, avec des entrées et sorties connues.",
    category: "technical"
  },
  {
    term: "Apprentissage non supervisé",
    definition: "Technique d'apprentissage où l'algorithme trouve des structures ou des motifs dans des données non étiquetées.",
    category: "technical"
  },
  {
    term: "Apprentissage par renforcement",
    definition: "Technique d'apprentissage où un agent apprend à prendre des décisions en effectuant des actions dans un environnement pour maximiser une récompense.",
    category: "technical"
  },
  {
    term: "IA générative",
    definition: "Systèmes d'IA capables de produire du contenu nouveau (texte, images, musique, vidéo, code), le plus souvent en réponse à une consigne, à partir de ce qu'ils ont appris sur leurs données d'entraînement.",
    category: "technical"
  },
  {
    term: "Data mining (fouille de données)",
    definition: "Processus d'extraction de connaissances et de motifs à partir de grandes quantités de données.",
    category: "technical"
  },
  {
    term: "API (Application Programming Interface)",
    definition: "Interface permettant à différents logiciels de communiquer entre eux, souvent utilisée pour accéder à des services d'IA.",
    category: "technical"
  },
  {
    term: "Computer vision (vision par ordinateur)",
    definition: "Domaine de l'IA qui permet aux ordinateurs d'extraire des informations d'images et de vidéos\u00A0: reconnaître des objets, des visages ou du texte, par exemple.",
    category: "technical"
  },
  {
    term: "Transformer",
    definition: "Architecture de réseau neuronal qui utilise des mécanismes d'attention pour traiter les séquences de données, permettant de capturer les dépendances à long terme dans les textes.",
    category: "technical"
  },
  {
    term: "Attention (mécanisme d')",
    definition: "Technique utilisée dans les réseaux de neurones qui permet au modèle d'accorder plus ou moins d'importance à chaque partie des données d'entrée (par exemple à chaque mot d'une phrase) selon ce qu'il est en train de traiter.",
    category: "technical"
  },
  {
    term: "Embeddings (plongements)",
    definition: "Représentations de mots, de phrases, d'images ou d'autres éléments sous forme de listes de nombres (vecteurs) placées dans un espace de grande dimension, de sorte que des éléments de sens proche aient des vecteurs proches.",
    category: "technical"
  },
  {
    term: "Transfer learning (apprentissage par transfert)",
    definition: "Technique qui permet de réutiliser un modèle préentraîné sur une tâche pour améliorer l'apprentissage sur une tâche différente mais connexe.",
    category: "technical"
  },
  {
    term: "Fine-tuning (affinage)",
    definition: "Adaptation d'un modèle préentraîné à une tâche ou à un domaine précis, en poursuivant son entraînement sur un jeu de données plus petit et spécialisé.",
    category: "technical"
  },
  {
    term: "CNN (Convolutional Neural Network)",
    definition: "Type de réseau neuronal profond spécialement conçu pour traiter des données structurées en grille, comme les images, en utilisant des opérations de convolution.",
    category: "technical"
  },
  {
    term: "RNN (Recurrent Neural Network)",
    definition: "Type de réseau neuronal avec des connexions en boucle permettant de mémoriser des informations séquentielles, particulièrement adapté au traitement de séquences temporelles.",
    category: "technical"
  },
  {
    term: "LSTM (Long Short-Term Memory)",
    definition: "Variante avancée de RNN conçue pour atténuer le problème de la disparition du gradient, capable de retenir des informations sur de longues périodes.",
    category: "technical"
  },
  {
    term: "GAN (Generative Adversarial Network)",
    definition: "Architecture composée de deux réseaux en compétition (générateur et discriminateur) qui s'entraînent mutuellement pour produire des données synthétiques aussi proches que possible des données réelles.",
    category: "technical"
  },
  {
    term: "RAG (Retrieval-Augmented Generation, génération augmentée par récupération)",
    definition: "Technique qui consiste à rechercher d'abord des passages pertinents dans une base de documents, puis à les fournir au modèle de langage pour qu'il rédige sa réponse à partir d'eux, en pouvant citer ses sources. Elle permet d'utiliser des informations récentes ou privées, mais ne supprime pas le risque d'erreur.",
    category: "technical"
  },
  {
    term: "Modèles de diffusion (diffusion models)",
    definition: "Classe de modèles génératifs qui créent des données en apprenant à inverser un processus de diffusion (bruit ajouté progressivement), largement utilisés pour la génération d'images.",
    category: "technical"
  },
  {
    term: "Overfitting (surapprentissage)",
    definition: "Situation où un modèle s'ajuste trop étroitement aux données d'entraînement (y compris à leur bruit), au point de mal généraliser à de nouvelles données.",
    category: "technical"
  },
  {
    term: "Underfitting (sous-apprentissage)",
    definition: "Situation où un modèle est trop simpliste pour capturer la complexité des données, entraînant de mauvaises performances tant sur les données d'entraînement que sur les nouvelles données.",
    category: "technical"
  },
  {
    term: "Batch normalization",
    definition: "Technique qui normalise les activations d'une couche précédente pour chaque mini-batch, accélérant l'entraînement et améliorant la stabilité des réseaux profonds.",
    category: "technical"
  },
  {
    term: "Exactitude (accuracy)",
    definition: "Part des réponses justes d'un modèle de classification sur un ensemble d'exemples (bonnes réponses divisées par le nombre total). Elle peut être trompeuse quand une classe est très rare\u00A0: un modèle qui répond toujours «\u00A0non\u00A0» a une bonne exactitude si 99\u00A0% des cas sont négatifs. Les démonstrations du site emploient ce terme.",
    category: "technical"
  },
  {
    term: "Précision et rappel",
    definition: "Deux mesures d'un classifieur pour une classe donnée. La précision est la part de vrais positifs parmi les cas annoncés positifs\u00A0; le rappel est la part de cas réellement positifs que le modèle retrouve. Le F1-score les combine en une seule valeur (moyenne harmonique). À ne pas confondre avec l'exactitude.",
    category: "technical"
  },
  {
    term: "Faux positif et faux négatif",
    definition: "Les deux sortes d'erreur d'un classifieur binaire. Un faux positif est un cas annoncé positif alors qu'il est réellement négatif (une fausse alerte)\u00A0; un faux négatif est un cas réellement positif que le modèle laisse passer. Leur gravité dépend de l'usage, et déplacer le seuil de décision réduit en général l'un en augmentant l'autre. Ils servent à calculer la précision, le rappel et le taux de faux positifs.",
    category: "technical"
  },
  {
    term: "Epoch (époque)",
    definition: "Un passage complet de l'algorithme d'apprentissage sur l'ensemble des données d'entraînement. Un entraînement comporte généralement plusieurs époques.",
    category: "technical"
  },
  
  {
    term: "Token (jeton) et tokenisation",
    definition: "Un token est l'unité de texte que manipule un modèle de langage\u00A0: un mot entier, un morceau de mot, un signe de ponctuation ou un caractère, selon le découpage propre à chaque modèle. La tokenisation est ce découpage du texte en tokens. La longueur d'un texte (fenêtre de contexte) et, souvent, le tarif d'une API s'expriment en tokens.",
    category: "technical"
  },
  {
    term: "Prompt (consigne) et prompt engineering",
    definition: "Le prompt est le texte (parfois accompagné d'images ou de fichiers) que l'on donne à un modèle génératif pour lui indiquer ce que l'on attend\u00A0: question, contexte, exemples, format de réponse. Sa formulation influence la réponse obtenue\u00A0; l'art de bien le rédiger s'appelle le prompt engineering (ingénierie de prompt).",
    category: "technical"
  },
  {
    term: "Inférence",
    definition: "Phase d'utilisation d'un modèle déjà entraîné\u00A0: on lui fournit une nouvelle entrée et il calcule un résultat (réponse, prédiction, image), sans modifier ses paramètres. Elle s'oppose à l'entraînement, qui sert à ajuster ces paramètres. En IA symbolique, «\u00A0inférence\u00A0» désigne aussi la déduction de conclusions à partir de règles.",
    category: "technical"
  },
  {
    term: "Température (paramètre de génération)",
    definition: "Réglage d'un modèle de langage qui contrôle la part d'aléa dans le choix du mot suivant. Une valeur basse favorise les mots les plus probables (réponses plus stables et prévisibles)\u00A0; une valeur haute rend le choix plus varié, au prix de plus d'erreurs. Une température basse réduit la variabilité mais n'empêche pas les erreurs.",
    category: "technical"
  },
  {
    term: "Paramètres et hyperparamètres",
    definition: "Les paramètres (ou poids) sont les valeurs numériques internes d'un modèle, ajustées pendant l'entraînement\u00A0: elles déterminent son comportement, et leur nombre sert souvent d'indication de sa taille. Les hyperparamètres sont des réglages choisis par les concepteurs, avant l'entraînement (taux d'apprentissage, nombre de couches, taille des lots) ou lors de l'utilisation (température)\u00A0; le modèle ne les apprend pas lui-même.",
    category: "technical"
  },
  {
    term: "Jeux d'entraînement, de validation et de test",
    definition: "Découpage habituel des données en apprentissage automatique\u00A0: le jeu d'entraînement sert à ajuster le modèle, le jeu de validation à choisir ses réglages et à repérer un surapprentissage, et le jeu de test, laissé de côté jusqu'à la fin, à estimer ses résultats sur des données qu'il n'a jamais vues.",
    category: "technical"
  },
  {
    term: "Fuite de données (data leakage)",
    definition: "Situation où le modèle reçoit à l'entraînement une information qu'il n'aura pas au moment de prédire, par exemple une colonne calculée à partir de la cible, ou des exemples du jeu de test mêlés à ceux de l'entraînement. Les résultats mesurés paraissent alors meilleurs que ceux obtenus en situation réelle. À ne pas confondre avec la fuite de données au sens de la sécurité, c'est-à-dire la divulgation de données personnelles.",
    category: "technical"
  },
  {
    term: "Données synthétiques",
    definition: "Données fabriquées par un programme ou un modèle plutôt que recueillies dans le monde réel, par exemple en tirant des valeurs de lois statistiques décrites à l'avance. Elles servent à s'exercer, à tester un outil ou à compléter un jeu d'entraînement. Elles ne valent que par les hypothèses qui les ont produites et ne prouvent rien sur le monde réel\u00A0; selon la méthode, celles qui sont générées à partir de données personnelles peuvent encore révéler des informations sur les personnes d'origine.",
    category: "technical"
  },
  {
    term: "Fonction de perte (loss)",
    definition: "Mesure de l'écart entre ce que prédit un modèle et la réponse attendue, calculée sur les exemples d'entraînement. L'entraînement consiste à ajuster les paramètres pour la faire baisser. Une perte faible sur les données d'entraînement ne garantit pas de bons résultats sur de nouvelles données.",
    category: "technical"
  },
  {
    term: "Descente de gradient et rétropropagation",
    definition: "La descente de gradient ajuste pas à pas les paramètres d'un modèle dans la direction qui fait baisser la fonction de perte, en répétant le calcul sur les données d'entraînement\u00A0; le taux d'apprentissage règle la taille des pas. La rétropropagation est le calcul qui, dans un réseau de neurones, détermine de la sortie vers l'entrée l'effet de chaque paramètre sur la perte (le gradient) utilisé par cette méthode.",
    category: "technical"
  },
  {
    term: "Chain-of-Thought (chaîne de pensée)",
    definition: "Technique de prompt, décrite par Wei et al. en 2022, qui demande au modèle de détailler son raisonnement étape par étape avant de répondre. Elle peut améliorer les résultats sur des problèmes de logique ou de calcul, mais le gain dépend du modèle et de la tâche, et le raisonnement affiché peut contenir des erreurs. Certains modèles dits «\u00A0de raisonnement\u00A0» le font déjà en interne.",
    category: "technical"
  },
  {
    term: "Classification et régression",
    definition: "Les deux grandes familles de tâches de l'apprentissage supervisé. La classification attribue une catégorie à chaque exemple (message indésirable ou non, espèce d'une fleur)\u00A0; la régression prédit une valeur numérique (un prix, une température).",
    category: "technical"
  },
  {
    term: "Appel d'outils (function calling)",
    definition: "Mécanisme par lequel un modèle de langage, instruit par un catalogue de schémas JSON, émet une requête structurée (nom de fonction et arguments) pour demander l'exécution d'une action externe (calcul, recherche, lecture de fichier). L'application exécute l'opération puis renvoie le résultat dans la conversation.",
    category: "technical"
  },
  {
    term: "MCP (Model Context Protocol)",
    definition: "Protocole ouvert initié par Anthropic fin 2024, standardisant la connexion sécurisée entre les applications d'IA et des sources de données ou des outils externes (serveurs MCP). Il sépare le modèle de l'implémentation des outils via une architecture client-serveur commune.",
    category: "technical"
  },
  {
    term: "Cache de prompt (prompt caching)",
    definition: "Mécanisme d'optimisation de l'inférence des modèles de langage qui conserve en mémoire les états d'attention calculés (clés et valeurs du KV cache) pour les préfixes de requêtes identiques (consignes système, catalogue d'outils, historique). Il réduit le coût de facturation et la latence lors des tours successifs.",
    category: "technical"
  },

  // ETHICAL TERMS
  {
    term: "Biais algorithmique",
    definition: "Erreur systématique dans un système d'IA qui conduit à des résultats injustes ou discriminatoires, souvent le reflet de préjugés sociaux présents dans les données d'entraînement, mais qui peut aussi venir de la conception du système ou de son usage.",
    category: "ethical"
  },
  {
    term: "Parité démographique et égalité des chances",
    definition: "Deux critères d'équité pour comparer les groupes d'un classifieur binaire. La parité démographique demande le même taux de sélection (la même part de prédictions positives) dans chaque groupe, sans tenir compte de la vérité. L'égalité des chances (Hardt, Price et Srebro, 2016) demande le même taux de vrais positifs\u00A0: parmi les personnes réellement positives, chaque groupe a la même chance d'être reconnu. Quand les taux de base diffèrent entre groupes, plusieurs critères d'équité usuels ne peuvent pas être satisfaits ensemble (Chouldechova, 2017\u00A0; Kleinberg, Mullainathan et Raghavan, 2016).",
    category: "ethical"
  },
  {
    term: "Transparence algorithmique",
    definition: "Principe selon lequel les processus, caractéristiques et décisions d'un algorithme doivent être visibles et compréhensibles pour les utilisateurs et pour les parties prenantes.",
    category: "ethical"
  },
  {
    term: "Explicabilité",
    definition: "Capacité d'un système d'IA à expliquer ses décisions ou prédictions d'une manière compréhensible par les humains.",
    category: "ethical"
  },
  {
    term: "Boîte noire",
    definition: "Système d'IA dont le fonctionnement interne n'est pas visible ou compréhensible pour les utilisateurs ou même les développeurs.",
    category: "ethical"
  },
  {
    term: "RGPD",
    definition: "Règlement général sur la protection des données, cadre juridique de l'UE qui définit les règles relatives à la protection des données personnelles.",
    category: "ethical"
  },
  {
    term: "AI Act",
    definition: "Règlement européen sur l'IA (règlement (UE) 2024/1689), en vigueur depuis le 1er août 2024 et applicable par étapes jusqu'en 2028 (le règlement (UE) 2026/1744, en vigueur depuis le 27 juillet 2026, a reporté les obligations des systèmes à haut risque au 2 décembre 2027 pour l'annexe III et au 2 août 2028 pour l'annexe I). Il classe les systèmes d'IA selon le niveau de risque et fixe des obligations en conséquence.",
    category: "ethical"
  },
  {
    term: "IA responsable",
    definition: "Approche du développement et de l'utilisation de l'IA qui prend en compte les implications éthiques, sociales et environnementales des systèmes d'IA.",
    category: "ethical"
  },
  {
    term: "IA éthique",
    definition: "Conception, développement et déploiement de systèmes d'IA conformes aux principes éthiques comme la transparence, l'équité, la non-malfaisance et le respect de l'autonomie humaine.",
    category: "ethical"
  },
  {
    term: "Consentement éclairé",
    definition: "Principe exigeant que les individus soient pleinement informés sur la façon dont leurs données seront utilisées par les systèmes d'IA avant de donner leur autorisation.",
    category: "ethical"
  },
  {
    term: "Droit à l'oubli",
    definition: "Droit d'obtenir, sous conditions, l'effacement de ses données personnelles (article 17 du RGPD, dit «\u00A0droit à l'effacement\u00A0»). Il ne s'applique pas dans tous les cas, et son application aux modèles déjà entraînés reste une question ouverte.",
    category: "ethical"
  },
  {
    term: "Privacy by Design (protection de la vie privée dès la conception)",
    definition: "Approche qui intègre la protection de la vie privée dès la conception des systèmes d'IA, plutôt que de l'ajouter après coup.",
    category: "ethical"
  },
  {
    term: "Fracture numérique",
    definition: "Inégalités d'accès et d'usage des technologies numériques (internet, ordinateurs, outils d'IA) entre groupes sociaux, régions ou pays.",
    category: "ethical"
  },
  {
    term: "Gouvernance de l'IA",
    definition: "Ensemble des processus, règles et institutions qui régissent le développement, le déploiement et l'utilisation des systèmes d'IA à différents niveaux.",
    category: "ethical"
  },
  
  // MEMORY TERMS
  {
    term: "Mémoire à court terme",
    definition: "Composante de la mémoire d'un système d'IA qui stocke temporairement les informations nécessaires au traitement d'une tâche en cours, similaire à la RAM d'un ordinateur.",
    category: "memory"
  },
  {
    term: "Mémoire à long terme",
    definition: "Stockage persistant des connaissances et expériences acquises par un système d'IA au cours de son apprentissage, permettant leur réutilisation future.",
    category: "memory"
  },
  {
    term: "Mémoire épisodique",
    definition: "Type de mémoire à long terme qui permet à un système d'IA de se souvenir d'événements spécifiques ou d'expériences passées dans leur contexte temporel.",
    category: "memory"
  },
  {
    term: "Mémoire sémantique",
    definition: "Type de mémoire à long terme qui stocke des connaissances générales, des faits et des concepts indépendamment de l'expérience personnelle.",
    category: "memory"
  },
  {
    term: "Mémoire procédurale",
    definition: "Stockage des séquences d'actions ou de procédures permettant à un système d'IA d'effectuer des tâches sans avoir à réapprendre les étapes.",
    category: "memory"
  },
  {
    term: "Mémoire de travail",
    definition: "Système cognitif permettant le stockage temporaire et la manipulation des informations nécessaires à l'exécution de tâches complexes.",
    category: "memory"
  },
  {
    term: "Mémoire de contexte",
    definition: "Capacité d'un modèle d'IA à tenir compte des informations des interactions ou séquences précédentes dans une conversation ou un traitement de données. Pour un modèle de langage, elle se limite à ce qui figure dans sa fenêtre de contexte (historique de la conversation, documents fournis).",
    category: "memory"
  },
  {
    term: "Mémoire associative",
    definition: "Système de stockage qui permet de récupérer des informations à partir d'un contenu partiel, en établissant des liens entre différentes données.",
    category: "memory"
  },
  {
    term: "Mémoire perceptive",
    definition: "Analogie propre à ce site, par référence à la mémoire sensorielle humaine\u00A0: capacité d'un système d'IA à stocker et à traiter des informations sensorielles comme les images, les sons ou les données tactiles. Ce n'est pas une catégorie établie.",
    category: "memory"
  },
  {
    term: "Context window (fenêtre de contexte)",
    definition: "Quantité maximale d'information, mesurée en tokens, qu'un modèle peut prendre en compte en une seule fois\u00A0: consigne, historique de la conversation, documents fournis et réponse en cours. Au-delà de cette limite, il faut raccourcir ou résumer le contenu.",
    category: "memory"
  },
  {
    term: "Raisonnement multi-sauts (multi-hop reasoning)",
    definition: "Capacité d'un système d'IA à enchaîner plusieurs étapes de raisonnement en combinant des informations issues de sources différentes (documents, mémoire du système), pour répondre à une question dont la réponse ne figure dans aucune source prise isolément.",
    category: "memory"
  },
  {
    term: "In-context learning (apprentissage en contexte)",
    definition: "Capacité d'un modèle d'IA à apprendre de nouvelles tâches à partir d'exemples fournis dans le contexte d'entrée, sans modification de ses paramètres.",
    category: "memory"
  },
  
  // ADVANCED TERMS
  {
    term: "XAI (Explainable AI, IA explicable)",
    definition: "Domaine de l'IA visant à rendre les systèmes d'IA plus transparents et explicables, permettant aux utilisateurs de comprendre pourquoi certaines décisions ont été prises.",
    category: "advanced"
  },
  {
    term: "Federated Learning (apprentissage fédéré)",
    definition: "Technique d'apprentissage où le modèle est entraîné sur plusieurs appareils ou sites sans centraliser les données brutes\u00A0: seules les mises à jour du modèle sont envoyées. Cela limite l'exposition des données mais ne garantit pas la confidentialité\u00A0; on y ajoute en général de l'agrégation sécurisée ou de la confidentialité différentielle.",
    category: "advanced"
  },
  {
    term: "Zero-shot learning",
    definition: "Capacité d'un modèle d'IA à effectuer une tâche pour laquelle il n'a pas été explicitement entraîné, en s'appuyant sur ses connaissances générales. Avec un modèle de langage, on parle surtout de zero-shot lorsque la consigne ne contient aucun exemple.",
    category: "advanced"
  },
  {
    term: "Few-shot learning",
    definition: "Capacité d'un modèle d'IA à apprendre une nouvelle tâche à partir d'un très petit nombre d'exemples, contrairement aux approches traditionnelles nécessitant de grandes quantités de données. Avec un modèle de langage, les exemples sont souvent placés dans la consigne, sans réentraînement du modèle.",
    category: "advanced"
  },
  {
    term: "IA neurosymbolique (neurosymbolic AI)",
    definition: "Approche hybride combinant l'apprentissage profond (connexionniste) avec le raisonnement symbolique pour bénéficier des avantages des deux paradigmes.",
    category: "advanced"
  },
  {
    term: "Knowledge Graph (graphe de connaissances)",
    definition: "Représentation des connaissances sous forme de graphe, avec des entités et leurs relations, permettant aux systèmes d'IA d'organiser et d'interroger des informations complexes.",
    category: "advanced"
  },
  {
    term: "Reinforcement Learning from Human Feedback (RLHF)",
    definition: "Méthode d'entraînement visant à aligner un modèle sur les préférences humaines (apprentissage par renforcement à partir de retours humains). Dans sa version classique, des personnes comparent ou classent des réponses du modèle\u00A0; ces préférences servent à entraîner un modèle de récompense, puis le modèle de langage est ajusté pour produire les réponses les mieux notées.",
    category: "advanced"
  },
  {
    term: "Foundation Model (modèle de fondation)",
    definition: "Modèle entraîné à grande échelle sur des données larges et variées, le plus souvent par apprentissage auto-supervisé, puis adapté (par fine-tuning, par consigne, etc.) à de nombreuses tâches.",
    category: "advanced"
  },
  {
    term: "Self-supervised learning (apprentissage auto-supervisé)",
    definition: "Approche d'apprentissage où le modèle génère ses propres signaux de supervision à partir des données non étiquetées, en prédisant certaines parties des données à partir d'autres parties.",
    category: "advanced"
  },
  {
    term: "Apprentissage automatique quantique (quantum machine learning)",
    definition: "Domaine émergent qui explore l'utilisation de l'informatique quantique pour améliorer ou accélérer les algorithmes d'apprentissage automatique traditionnels.",
    category: "advanced"
  },
  {
    term: "Digital Twin (jumeau numérique)",
    definition: "Réplique virtuelle d'un objet, processus ou système physique, souvent enrichie par l'IA pour simuler, analyser et optimiser le comportement de son homologue réel.",
    category: "advanced"
  },
  {
    term: "Edge AI (IA en périphérie)",
    definition: "Déploiement d'algorithmes d'IA directement sur des appareils en périphérie du réseau (téléphone, caméra, capteur, véhicule) plutôt que dans le cloud, ce qui peut réduire la latence et limiter les données envoyées vers des serveurs distants, au prix de ressources de calcul plus limitées.",
    category: "advanced"
  },
  {
    term: "GPT (Generative Pre-trained Transformer)",
    definition: "Famille de modèles de langage introduite par OpenAI, basés sur l'architecture Transformer et préentraînés sur de très grands corpus de texte, capables de générer du texte cohérent.",
    category: "advanced"
  },
  {
    term: "LLM (Large Language Model, grand modèle de langage)",
    definition: "Modèle de langage de très grande taille (nombreux paramètres), entraîné sur de très grandes quantités de texte, le plus souvent pour prédire la suite d'un texte. Il peut ainsi rédiger, reformuler, résumer ou traduire, mais il peut aussi produire des erreurs (hallucinations).",
    category: "advanced"
  },
  {
    term: "Hallucination (en IA)",
    definition: "Phénomène où un modèle génératif produit des informations qui semblent plausibles mais sont fausses, inventées ou déformées (références, citations, chiffres), sans signaler son incertitude.",
    category: "advanced"
  },
  {
    term: "Alignment (alignement)",
    definition: "Ensemble de recherches et de méthodes visant à ce que les systèmes d'IA agissent conformément aux intentions et aux valeurs humaines, en limitant les comportements non désirés ou dangereux (par exemple par RLHF).",
    category: "advanced"
  },
  
  // NEW TERMS
  {
    term: "Apprentissage continu",
    definition: "Capacité d'un système d'IA à continuer d'apprendre et d'améliorer ses performances au fil du temps, en intégrant de nouvelles données et expériences sans nécessiter de réentraînement complet. Cela reste un défi de recherche\u00A0: apprendre du nouveau peut faire oublier l'ancien (oubli catastrophique).",
    category: "general"
  },
  {
    term: "Intelligence augmentée",
    definition: "Approche qui vise à utiliser l'IA comme complément à l'intelligence humaine plutôt que comme remplacement, créant une synergie entre capacités humaines et technologiques.",
    category: "general"
  },
  {
    term: "Intelligence collective",
    definition: "Forme d'intelligence qui émerge de la collaboration entre plusieurs agents intelligents, qu'ils soient humains ou artificiels, permettant de résoudre des problèmes complexes.",
    category: "general"
  },
  
  {
    term: "Pruning (Élagage)",
    definition: "Technique qui consiste à réduire la taille d'un modèle d'IA en supprimant les connexions ou paramètres les moins importants. La perte de qualité, souvent limitée, dépend de la tâche et du taux d'élagage\u00A0: elle doit être vérifiée.",
    category: "technical"
  },
  {
    term: "Quantization (Quantification)",
    definition: "Processus de réduction du nombre de bits utilisés pour stocker les paramètres d'un modèle d'IA (par exemple de 16 à 8 ou 4 bits), qui diminue sa taille et accélère souvent l'inférence, avec une perte de qualité variable selon le niveau de quantification et la tâche.",
    category: "technical"
  },
  {
    term: "Distillation de modèle",
    definition: "Technique où un modèle plus petit (étudiant) est entraîné pour reproduire le comportement d'un modèle plus grand et plus performant (enseignant), permettant des déploiements plus efficaces.",
    category: "technical"
  },
  {
    term: "Mixture of Experts (MoE, mélange d'experts)",
    definition: "Architecture de réseau neuronal où plusieurs sous-réseaux spécialisés (experts) sont combinés avec un mécanisme de routage qui sélectionne les experts les plus appropriés pour chaque entrée.",
    category: "technical"
  },
  {
    term: "Parameter-Efficient Fine-Tuning (PEFT)",
    definition: "Ensemble de techniques permettant d'adapter un grand modèle préentraîné à une tâche spécifique en n'entraînant qu'une petite fraction de paramètres (existants ou ajoutés), ce qui économise des ressources et du temps.",
    category: "technical"
  },
  {
    term: "LoRA (Low-Rank Adaptation)",
    definition: "Méthode de fine-tuning efficace qui ajoute des matrices de faible rang aux poids existants d'un grand modèle, permettant de l'adapter à de nouvelles tâches avec beaucoup moins de paramètres à entraîner.",
    category: "technical"
  },
  {
    term: "QLoRA",
    definition: "Extension de LoRA qui combine quantification (4 bits) et adaptation de rang faible\u00A0: l'article d'origine (Dettmers et al., 2023) annonce le fine-tuning d'un modèle de 65 milliards de paramètres sur un seul GPU de 48 Go, et celui de modèles plus petits sur du matériel plus modeste.",
    category: "technical"
  },
  
  {
    term: "Souveraineté numérique",
    definition: "Capacité d'un État, d'une organisation ou d'un individu à garder le contrôle de ses données, de ses infrastructures et de ses compétences numériques, y compris en matière d'IA, afin de réduire sa dépendance à des acteurs extérieurs.",
    category: "ethical"
  },
  {
    term: "Empreinte carbone de l'IA",
    definition: "Émissions de gaz à effet de serre (en équivalent CO2) liées à l'entraînement, à l'utilisation et à l'hébergement des modèles d'IA, ainsi qu'à la fabrication du matériel. Elles dépendent notamment de la taille du modèle, du matériel et de l'origine de l'électricité. L'impact environnemental de l'IA est plus large\u00A0: électricité, eau, matières premières.",
    category: "ethical"
  },
  {
    term: "Principe de précaution en IA",
    definition: "Principe selon lequel l'absence de certitude sur un risque grave ne doit pas retarder l'adoption de mesures proportionnées pour le prévenir. Appliqué à l'IA, il conduit à évaluer les risques avant le déploiement, surtout pour les systèmes susceptibles d'avoir un impact sociétal important.",
    category: "ethical"
  },
  
  {
    term: "Mémoire externe",
    definition: "Système permettant à un modèle d'IA d'accéder à des informations stockées séparément de ses paramètres, comme des bases de données ou des vecteurs d'embeddings, ce qui élargit ce qu'il peut utiliser et peut améliorer l'exactitude factuelle de ses réponses.",
    category: "memory"
  },
  {
    term: "Système de mémoire hiérarchique",
    definition: "Architecture inspirée de la cognition humaine où différents types de mémoire (court terme, long terme, de travail) sont organisés en niveaux d'accessibilité et de permanence pour optimiser le traitement de l'information.",
    category: "memory"
  },
  {
    term: "Cognitive architecture (architecture cognitive)",
    definition: "Cadre théorique qui modélise les structures et processus mentaux, y compris les systèmes de mémoire, permettant aux systèmes d'IA d'imiter plus fidèlement le fonctionnement cognitif humain.",
    category: "memory"
  },
  
  {
    term: "Sûreté de l'IA (AI safety)",
    definition: "Domaine de recherche qui vise à réduire les risques liés aux systèmes d'IA avancés (comportements non voulus, mauvais usages, perte de contrôle), notamment en les alignant sur les intentions humaines\u00A0; certains travaux portent aussi sur des scénarios plus spéculatifs.",
    category: "advanced"
  },
  {
    term: "Mechanistic Interpretability (interprétabilité mécaniste)",
    definition: "Approche d'explicabilité qui cherche à comprendre les mécanismes internes par lesquels un modèle traite l'information, en identifiant des circuits et des «\u00A0traits\u00A0» (features) internes plutôt que des neurones pris isolément, souvent polysémantiques.",
    category: "advanced"
  },
  {
    term: "Agentic AI (IA agentique)",
    definition: "Systèmes d'IA qui planifient et enchaînent des actions (appel d'outils, navigation, écriture de code) pour atteindre un objectif donné par un utilisateur, avec une supervision humaine plus ou moins légère selon le cas.",
    category: "advanced"
  },
  {
    term: "Constitutional AI",
    definition: "Méthode d'entraînement proposée par Anthropic (Bai et al., 2022) où le modèle critique et révise ses propres réponses à partir d'une liste de principes écrits (une «\u00A0constitution\u00A0»), ce qui réduit le besoin d'annotations humaines sur les contenus nuisibles.",
    category: "advanced"
  },
  {
    term: "Multimodal Chain-of-Thought",
    definition: "Extension du raisonnement étape par étape aux modèles multimodaux, permettant de décomposer le traitement d'informations visuelles et textuelles en étapes intermédiaires explicites pour améliorer le raisonnement.",
    category: "advanced"
  },
  {
    term: "Système 1 et Système 2",
    definition: "Cadre issu de la psychologie cognitive, popularisé par Daniel Kahneman (2011), qui distingue la pensée rapide, intuitive et automatique (Système 1) de la pensée lente, délibérée et analytique (Système 2). Certains travaux en IA s'en inspirent pour combiner des réponses rapides et un raisonnement plus délibéré.",
    category: "advanced"
  },
  {
    term: "Scaffolded LLM",
    definition: "Terme employé dans la littérature récente, peu standardisé, pour une architecture où un grand modèle de langage est augmenté par des composants spécialisés (bases de connaissances, outils externes, modules de raisonnement) formant un «\u00A0échafaudage\u00A0» qui étend ses capacités au-delà du texte seul.",
    category: "advanced"
  },
  {
    term: "Deepfake (hypertrucage)",
    definition: "Image, son ou vidéo fabriqué ou modifié par une IA de façon à paraître authentique, par exemple en faisant dire ou faire à une personne ce qu'elle n'a jamais dit ni fait. Le règlement européen sur l'IA en donne une définition et prévoit des obligations de transparence pour ces contenus (article 50) ; les principaux risques sont l'usurpation d'identité, la désinformation et les contenus intimes non consentis.",
    category: "ethical"
  },
  {
    term: "Poids ouverts (open weights)",
    definition: "Se dit d'un modèle dont les paramètres (poids) sont publiés et téléchargeables, ce qui permet de l'exécuter soi-même et de l'adapter. Ce n'est pas l'équivalent de l'open source au sens strict : les données et le code d'entraînement ne sont pas forcément publiés, et la licence peut limiter certains usages.",
    category: "technical"
  },
  {
    term: "Cybernétique",
    definition: "Science du contrôle et de la communication chez l'animal et la machine (Wiener, 1948). Elle a contribué à populariser la notion de boucle de rétroaction, utilisée en IA et en robotique.",
    category: "advanced"
  }
];
