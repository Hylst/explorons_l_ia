// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Code, Terminal, Database, BarChart, Boxes, PenTool, PlayCircle, PackageOpen, ArrowRightCircle } from 'lucide-react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import ZoomOn from '@/components/courses/ZoomOn';
import Illustration from '@/components/courses/Illustration';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import CourseSources from '@/components/courses/CourseSources';
import { asset } from '@/lib/paths';

const pythonSources = [
  { label: 'Python\u00A0: tutoriel officiel', href: 'https://docs.python.org/3/tutorial/' },
  { label: 'Python\u00A0: environnements virtuels (venv)', href: 'https://docs.python.org/3/library/venv.html' },
  { label: 'NumPy\u00A0: guide de démarrage', href: 'https://numpy.org/doc/stable/user/quickstart.html' },
  { label: 'pandas\u00A0: introduction en 10 minutes', href: 'https://pandas.pydata.org/docs/user_guide/10min.html' },
  { label: 'pandas\u00A0: données manquantes', href: 'https://pandas.pydata.org/docs/user_guide/missing_data.html' },
  { label: 'Matplotlib\u00A0: tutoriel Pyplot', href: 'https://matplotlib.org/stable/tutorials/pyplot.html' },
  { label: 'Seaborn\u00A0: tutoriels', href: 'https://seaborn.pydata.org/tutorial.html' },
  { label: 'scikit-learn\u00A0: prise en main', href: 'https://scikit-learn.org/stable/getting_started.html' },
  { label: 'scikit-learn\u00A0: validation croisée', href: 'https://scikit-learn.org/stable/modules/cross_validation.html' },
  { label: 'UCI\u00A0: jeu de données Iris', href: 'https://archive.ics.uci.edu/dataset/53/iris' },
];

const quizQuestions: QuizQuestion[] = [
  {
    question: "Quelle est la syntaxe correcte pour créer une liste en Python ?",
    options: [
      "array(1, 2, 3)",
      "[1, 2, 3]",
      "{1, 2, 3}",
      "(1, 2, 3)"
    ],
    correctAnswer: 1,
    explanation: "En Python, une liste est définie à l'aide de crochets [ ]. Les accolades { } sont utilisées pour les ensembles ou les dictionnaires, et les parenthèses ( ) pour les tuples."
  },
  {
    question: "Quelle bibliothèque Python est principalement utilisée pour la manipulation de tableaux numériques en IA\u00A0?",
    options: [
      "pandas",
      "Matplotlib",
      "NumPy",
      "scikit-learn"
    ],
    correctAnswer: 2,
    explanation: "NumPy est la bibliothèque fondamentale pour le calcul scientifique en Python, fournissant des structures de données efficaces pour les tableaux multidimensionnels essentiels au traitement des données en IA."
  },
  {
    question: "Comment importer correctement la bibliothèque pandas avec son alias conventionnel\u00A0?",
    options: [
      "import pandas",
      "import pandas as pd",
      "from pandas import *",
      "require pandas"
    ],
    correctAnswer: 1,
    explanation: "La convention en Python est d'importer pandas avec l'alias 'pd' pour faciliter l'écriture du code tout en indiquant clairement l'origine des fonctions."
  },
  {
    question: "Quelle instruction Python suivante est correcte pour créer une fonction\u00A0?",
    options: [
      "function maFonction():",
      "def maFonction():",
      "create maFonction():",
      "func maFonction():"
    ],
    correctAnswer: 1,
    explanation: "En Python, le mot-clé 'def' est utilisé pour définir une fonction, suivi du nom de la fonction et de parenthèses pour les paramètres."
  },
  {
    question: "Quelle bibliothèque Python est utilisée pour créer des visualisations de données\u00A0?",
    options: [
      "NumPy",
      "scikit-learn",
      "pandas",
      "Matplotlib"
    ],
    correctAnswer: 3,
    explanation: "Matplotlib est la bibliothèque de visualisation standard en Python, utilisée pour créer des graphiques statiques, interactifs et informatifs."
  },
  {
    question: "Comment gérer les valeurs manquantes dans un DataFrame pandas\u00A0?",
    options: [
      "df.remove_missing()",
      "df.clean()",
      "df.dropna()",
      "df.fill(0)"
    ],
    correctAnswer: 2,
    explanation: "La méthode dropna() permet de supprimer les lignes ou colonnes contenant des valeurs manquantes dans un DataFrame pandas."
  },
  {
    question: "Quelle structure de contrôle est utilisée pour répéter un bloc de code tant qu'une condition est vraie\u00A0?",
    options: [
      "if-else",
      "for loop",
      "while loop",
      "switch case"
    ],
    correctAnswer: 2,
    explanation: "La boucle while permet d'exécuter un bloc de code répétitivement tant que la condition spécifiée reste vraie."
  },
  {
    question: "Dans la convention de scikit-learn, que fait la méthode fit(X, y) d'un modèle\u00A0?",
    options: [
      "Elle prédit les étiquettes de nouvelles données",
      "Elle entraîne le modèle à partir des données X et des étiquettes y",
      "Elle mesure la performance du modèle",
      "Elle sauvegarde le modèle sur le disque"
    ],
    correctAnswer: 1,
    explanation: "fit(X, y) entraîne le modèle, predict(X) produit des prédictions et score(X, y) mesure la performance. Cette convention commune permet de remplacer un algorithme par un autre en changeant une seule ligne."
  },
  {
    question: "Pourquoi choisit-on l'hyperparamètre K d'un modèle KNN par validation croisée plutôt qu'avec le jeu de test\u00A0?",
    options: [
      "Parce que la validation croisée est plus rapide",
      "Pour que le jeu de test reste une évaluation honnête, jamais utilisée pour faire des choix",
      "Parce que le jeu de test est trop petit pour être utilisé",
      "Parce que scikit-learn interdit d'utiliser le jeu de test"
    ],
    correctAnswer: 1,
    explanation: "Si l'on retient la valeur de K qui donne le meilleur score sur le jeu de test, ce score est optimiste\u00A0: le test a servi à choisir le modèle. Les choix se font sur l'entraînement (par validation croisée), et le test n'est utilisé qu'une fois, à la fin."
  }
];

const plan: CoursePlanItem[] = [
  {
    icon: <Terminal className="h-5 w-5 text-primary" />,
    title: "Introduction à Python et à son écosystème",
    description: "Installation, premier script, variables, types, conditions, boucles et fonctions.",
  },
  {
    icon: <Database className="h-5 w-5 text-primary" />,
    title: 'Structures de données et NumPy',
    description: "Listes, dictionnaires, tuples, ensembles, compréhensions, puis tableaux NumPy et calcul vectorisé.",
  },
  {
    icon: <Boxes className="h-5 w-5 text-primary" />,
    title: 'Programmation orientée objet',
    description: "Classes, méthodes et héritage\u00A0: la logique des modèles fit/predict de scikit-learn.",
  },
  {
    icon: <BarChart className="h-5 w-5 text-primary" />,
    title: 'Visualisation, pandas et scikit-learn',
    description: "Matplotlib et Seaborn, DataFrames pandas et premiers pas avec scikit-learn.",
  },
  {
    icon: <PenTool className="h-5 w-5 text-primary" />,
    title: 'Projet pratique',
    description: "Un projet complet sur le jeu Iris, avec un choix du paramètre K qui respecte le jeu de test.",
  },
];

/**
 * Cours d'initiation à Python orienté IA : bases du langage, NumPy, pandas, Matplotlib, scikit-learn.
 */
const PythonIA = () => (
  <CourseGuideLayout
    title="Initiation à Python pour l'intelligence artificielle"
    subtitle="Les bases du langage, orientées vers les bibliothèques et les usages de l'IA"
    about={[
      "Python est largement utilisé pour développer des applications d'intelligence artificielle\u00A0: sa syntaxe est lisible et son écosystème de bibliothèques (NumPy, pandas, scikit-learn, PyTorch, TensorFlow) couvre la préparation des données comme l'entraînement des modèles.",
      "Ce cours s'adresse aux débutants en programmation comme à ceux qui veulent orienter leurs bases de Python vers l'IA. Chaque leçon s'appuie sur du code à exécuter et à modifier vous-même.",
    ]}
    learn={[
      'La syntaxe de base de Python et les structures de données essentielles',
      'La programmation orientée objet, avec la convention fit/predict de scikit-learn',
      'La manipulation de données avec NumPy et pandas',
      'La visualisation de données avec Matplotlib et Seaborn',
      'Un premier projet complet avec scikit-learn, évalué sans tricher sur le jeu de test',
    ]}
    plan={plan}
    info={{
      level: 'Débutant à intermédiaire',
      duration: 'Environ 5 à 6 heures de lecture et de pratique',
      prerequisites: "Aucune expérience en programmation requise. Il faut pouvoir installer Python sur son ordinateur.",
      contents: ['5 leçons', 'Exemples de code à copier et adapter', 'Un mini-projet complet et 4 exercices', 'Quiz de 9 questions'],
    }}
    related={[
      {
        to: '/cours/premier-modele-ml',
        title: 'Construire son premier modèle de machine learning',
        description: 'La suite logique\u00A0: un projet complet avec scikit-learn.',
      },
      {
        to: '/cours/bases-mathematiques-ia',
        title: "Les bases mathématiques de l'IA",
        description: 'Algèbre linéaire, probabilités et calcul derrière NumPy.',
      },
      {
        to: '/cours/coder-avec-ia',
        title: "Coder avec l'IA",
        description: "Utiliser des assistants de code pour apprendre et progresser, sans perdre la main.",
      },
      {
        to: '/glossaire',
        title: 'Glossaire',
        description: "Les termes de l'IA et du machine learning en quelques lignes.",
      },
    ]}
  >
    <LessonSection title="Introduction à Python et à son écosystème" icon={<Terminal size={24} />} delay={1}>
      <p>
        Python est aujourd'hui l'un des langages les plus utilisés dans le domaine de l'intelligence artificielle en raison de sa syntaxe claire, de sa facilité d'apprentissage et de son vaste écosystème de bibliothèques spécialisées.
      </p>
      
      <ZoomOn title="Pourquoi Python pour l'IA ?">
        <ul className="list-disc pl-6 space-y-2">
          <li>Syntaxe lisible qui facilite la mise en œuvre rapide d'une idée</li>
          <li>Écosystème riche de bibliothèques dédiées à l'IA (NumPy, pandas, scikit-learn, TensorFlow, PyTorch)</li>
          <li>Grande communauté qui développe et maintient des outils open-source</li>
          <li>Intégration facile avec d'autres technologies et systèmes</li>
          <li>Calculs scientifiques souvent délégués à des bibliothèques compilées en C/C++</li>
          <li>Possibilité d'extension avec du code C/C++ pour les parties critiques en performance</li>
        </ul>
      </ZoomOn>

      <h4 className="font-medium mt-6">Les bibliothèques que vous rencontrerez le plus souvent</h4>
      <div className="my-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'NumPy', role: 'Tableaux et calcul numérique vectorisé' },
          { name: 'pandas', role: 'Données tabulaires\u00A0: lecture, filtrage, agrégation' },
          { name: 'Matplotlib et Seaborn', role: 'Graphiques et visualisations statistiques' },
          { name: 'scikit-learn', role: 'Apprentissage automatique classique\u00A0: classification, régression, clustering' },
          { name: 'PyTorch et TensorFlow', role: 'Réseaux de neurones et apprentissage profond' },
        ].map((lib) => (
          <div key={lib.name} className="bg-muted rounded-lg p-4">
            <h5 className="font-medium mb-1">{lib.name}</h5>
            <p className="text-sm text-muted-foreground">{lib.role}</p>
          </div>
        ))}
      </div>

      <CodeExample 
        title="Votre premier script Python"
        language="python"
        code={`# Un simple programme pour illustrer la syntaxe Python
print("Bienvenue dans le cours Python pour l'IA !")

# Variables et types de données
nom = "Python"       # chaîne de caractères (string)
version = 3.12       # nombre à virgule flottante (float)
est_puissant = True  # booléen (bool)
liste_libs = ["NumPy", "pandas", "scikit-learn", "TensorFlow"]  # liste

# Affichage formaté avec f-string (disponible depuis Python 3.6+)
print(f"{nom} version {version} est un langage puissant : {est_puissant}")

# Une simple fonction
def saluer(nom):
    """Cette fonction retourne un message de salutation personnalisé"""
    return f"Bonjour, {nom} !"

# Appel de la fonction
message = saluer("développeur IA")
print(message)

# Parcours d'une liste avec une boucle for
print("Bibliothèques Python populaires pour l'IA:")
for i, lib in enumerate(liste_libs, 1):
    print(f"{i}. {lib}")`}
        explanation="Ce script simple illustre la syntaxe de base de Python, y compris les variables, types de données, f-strings, fonctions, documentation et boucles. La simplicité et la lisibilité du code Python sont des atouts majeurs pour le développement en IA."
      />

      <CodeExample
        title="Conditions et boucles"
        language="python"
        code={`# Condition : if / elif / else
note = 14
if note >= 16:
    mention = "très bien"
elif note >= 10:
    mention = "admis"
else:
    mention = "à retravailler"
print(mention)

# Boucle for : parcourir une séquence
for chiffre in range(3):
    print("chiffre :", chiffre)      # affiche 0, puis 1, puis 2

# Boucle while : répéter tant qu'une condition est vraie
essais = 0
while essais < 3:
    essais += 1
print("essais effectués :", essais)`}
        explanation="L'indentation (quatre espaces par convention) délimite les blocs : c'est elle qui indique ce qui se trouve « dans » le if, le for ou le while. Une boucle while dont la condition ne devient jamais fausse ne s'arrête pas."
      />

      <Illustration
        src={asset('pics/python-post-it.webp')}
        alt="Une main tient un papier adhésif sur lequel est écrit « PYTHON », devant des écrans flous"
        caption="Python est accessible aux débutants et sert aussi dans de nombreux projets d'IA"
        width="2/3"
      />

      <ZoomOn title="Installation et environnement de développement">
        <p>
          Pour commencer avec Python pour l'IA, voici une démarche simple :
        </p>
        <ol className="list-decimal pl-6 mt-2 mb-2">
          <li><strong>Installer Python 3</strong> depuis python.org ou avec le gestionnaire de paquets de votre système. Une distribution scientifique comme Miniforge (conda) est une alternative qui installe aussi les bibliothèques de calcul.</li>
          <li><strong>Créer un environnement virtuel par projet</strong> (<code>python -m venv .venv</code>, ou conda) pour isoler les dépendances de chaque projet.</li>
          <li><strong>Installer les bibliothèques</strong> avec pip, par exemple <code>pip install numpy pandas matplotlib seaborn scikit-learn</code>.</li>
          <li><strong>Choisir un éditeur</strong> : Jupyter Notebook ou JupyterLab pour explorer les données pas à pas, VS Code ou PyCharm pour des projets plus structurés.</li>
        </ol>
        <p className="mt-2">
          Les notebooks hébergés en ligne évitent toute installation, mais vos données passent alors par un service tiers : à éviter pour des données personnelles ou confidentielles.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Structures de données et introduction à NumPy" icon={<Database size={24} />} delay={2}>
      <p>
        Les structures de données sont fondamentales en Python, particulièrement pour l'IA où la manipulation efficace des données est essentielle. Python offre plusieurs types de structures de données intégrées qui sont couramment utilisées dans les applications d'IA.
      </p>

      <div className="my-6 bg-muted p-5 rounded-lg">
        <h4 className="font-medium mb-4">Structures de données fondamentales en Python</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium mb-2 flex items-center gap-2">
              <PackageOpen className="h-4 w-4 text-primary" />
              Séquences (accès par position)
            </h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRightCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-medium">Liste</span> (mutable)
                  <p className="text-xs text-muted-foreground mt-1">
                    <code>[1, 2, 3]</code> : séquence ordonnée et modifiable, parfaite pour des données qui évoluent
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRightCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-medium">Tuple</span> (immutable)
                  <p className="text-xs text-muted-foreground mt-1">
                    <code>(1, 2, 3)</code> : séquence ordonnée non modifiable, utile pour des valeurs fixes (les dimensions d'une image, par exemple)
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2 flex items-center gap-2">
              <PackageOpen className="h-4 w-4 text-primary" />
              Collections (accès par clé ou test d'appartenance)
            </h5>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <ArrowRightCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-medium">Dictionnaire</span>
                  <p className="text-xs text-muted-foreground mt-1">
                    <code>{'{"a": 1, "b": 2}'}</code> : paires clé-valeur ; l'ordre d'insertion est conservé depuis Python 3.7
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <ArrowRightCircle className="h-4 w-4 text-primary shrink-0 mt-1" />
                <div>
                  <span className="font-medium">Ensemble</span> (Set)
                  <p className="text-xs text-muted-foreground mt-1">
                    <code>{'{1, 2, 3}'}</code> : éléments uniques, sans ordre garanti, parfait pour éliminer les doublons
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <CodeExample 
        title="Structures de données essentielles"
        language="python"
        code={`# Listes - collection ordonnée et modifiable
features = ["taille", "poids", "âge", "revenu"]
print(f"Première caractéristique : {features[0]}")

# Ajout et suppression d'éléments
features.append("éducation")  # Ajout à la fin
features.insert(1, "genre")   # Ajout à une position spécifique
features.remove("revenu")     # Suppression par valeur
print(f"Features après modifications : {features}")

# Dictionnaires - collection de paires clé-valeur
modele = {
    "nom": "Random Forest",
    "exactitude": 0.92,
    "hyperparamètres": {
        "n_estimators": 100,
        "max_depth": 10
    }
}
print(f"Exactitude du modèle : {modele['exactitude']}")

# Accès et modification
modele["exactitude"] = 0.94
print(f"Nouvelle exactitude : {modele['exactitude']}")

# Parcours d'un dictionnaire
print("Paramètres du modèle :")
for cle, valeur in modele.items():
    print(f"  - {cle}: {valeur}")

# Tuples - collection ordonnée et non modifiable
dimensions = (1920, 1080)  # Résolution d'image
print(f"Largeur de l'image : {dimensions[0]}px")
# dimensions[0] = 2560  # Erreur! Les tuples sont immutables

# Sets - collection non ordonnée sans doublons
categories = {"sport", "politique", "technologie", "santé", "sport"}
print(f"Nombre de catégories uniques : {len(categories)}")
print(f"Catégories : {categories}")  # Notez que "sport" n'apparaît qu'une fois

# Opérations sur les ensembles
tech_categories = {"technologie", "science", "innovation"}
print(f"Union : {categories | tech_categories}")  # Union des ensembles
print(f"Intersection : {categories & tech_categories}")  # Intersection

# Compréhension de liste - création de liste concise
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
squares = [x**2 for x in numbers if x % 2 == 0]
print(f"Carrés des nombres pairs : {squares}")`}
        explanation="Ce code illustre les principales structures de données en Python : listes, dictionnaires, tuples et ensembles. La compréhension de liste à la fin est une fonctionnalité puissante de Python qui permet de créer des listes de manière concise et expressive."
      />

      <ZoomOn title="NumPy : la fondation des bibliothèques de calcul scientifique">
        <p>
          NumPy est la bibliothèque fondamentale pour le calcul scientifique en Python. Elle fournit :
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Des tableaux N-dimensionnels efficaces (ndarray)</li>
          <li>Des fonctions mathématiques sophistiquées pour opérer sur ces tableaux</li>
          <li>Des outils pour intégrer du code C/C++ et Fortran</li>
          <li>Des modules d'algèbre linéaire, de transformée de Fourier et de génération de nombres aléatoires</li>
        </ul>
        <p className="mt-2">
          NumPy sert de base à pandas et à scikit-learn ; TensorFlow et PyTorch ont leur propre type de tenseur, mais échangent facilement leurs données avec les tableaux NumPy.
        </p>
      </ZoomOn>

      <CodeExample 
        title="Manipulation de données avec NumPy"
        language="python"
        code={`import numpy as np

# Création d'un tableau NumPy à partir d'une liste
arr = np.array([1, 2, 3, 4, 5])
print("Tableau NumPy:", arr)
print("Type:", type(arr))
print("Dimensions:", arr.shape)

# Opérations vectorisées (rapides et efficaces)
print("Tableau multiplié par 2:", arr * 2)
print("Carré de chaque élément:", arr ** 2)
print("Somme des éléments:", np.sum(arr))
print("Moyenne des éléments:", np.mean(arr))

# Création d'une matrice 2D
matrice = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print("Matrice:\\n", matrice)
print("Forme de la matrice:", matrice.shape)
print("Dimension de la matrice:", matrice.ndim)

# Sélection d'éléments
print("Première ligne:", matrice[0])
print("Élément (1,2):", matrice[1, 2])  # Ligne 1, colonne 2
print("Sous-matrice:\\n", matrice[0:2, 1:3])  # Lignes 0-1, colonnes 1-2

# Opérations matricielles
print("Transposée de la matrice:\\n", matrice.T)
print("Somme par colonne:", np.sum(matrice, axis=0))
print("Somme par ligne:", np.sum(matrice, axis=1))

# Algèbre linéaire
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print("Produit matriciel A @ B:\\n", np.dot(A, B))
print("Déterminant de A:", np.linalg.det(A))
print("Inverse de A:\\n", np.linalg.inv(A))

# Génération de données aléatoires (utile pour l'initialisation en IA)
donnees_uniformes = np.random.rand(3, 3)  # Distribution uniforme [0, 1]
print("Données aléatoires uniformes:\\n", donnees_uniformes)

donnees_normales = np.random.randn(3, 3)  # Distribution normale μ=0, σ=1
print("Données aléatoires normales:\\n", donnees_normales)

# Création de tableaux spéciaux
print("Tableau de zéros:", np.zeros(5))
print("Matrice identité 3x3:\\n", np.eye(3))
print("Valeurs espacées linéairement:", np.linspace(0, 10, 5))  # 5 points de 0 à 10`}
        explanation="NumPy permet de manipuler efficacement des tableaux multidimensionnels, ce qui est essentiel pour les applications d'IA. Ses opérations vectorisées sont beaucoup plus rapides que les listes Python standards car elles sont implémentées en C."
      />

    </LessonSection>

    <LessonSection title="Programmation orientée objet" icon={<Boxes size={24} />} delay={3}>
      <p>
        La programmation orientée objet (POO) regroupe des données et les fonctions qui les manipulent dans un même
        objet. Elle est omniprésente en IA : chaque modèle de scikit-learn, chaque couche d'un réseau de neurones PyTorch
        et chaque jeu de données manipulé par une bibliothèque est un objet.
      </p>

      <ZoomOn title="Le vocabulaire de la POO">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Classe :</strong> le plan de construction (par exemple « modèle de prédiction »).</li>
          <li><strong>Objet (instance) :</strong> un exemplaire construit à partir de la classe, avec ses propres données.</li>
          <li><strong>Attribut :</strong> une donnée stockée dans l'objet (<code>self.moyenne_</code>).</li>
          <li><strong>Méthode :</strong> une fonction rattachée à l'objet (<code>fit</code>, <code>predict</code>).</li>
          <li><strong>Héritage :</strong> une classe reprend et étend le comportement d'une autre.</li>
        </ul>
      </ZoomOn>

      <CodeExample
        title="Un modèle minimal avec l'interface fit/predict"
        language="python"
        code={`class ModeleMoyenne:
    """Modèle très simple : prédit toujours la moyenne des valeurs vues à l'entraînement."""

    def __init__(self):
        self.moyenne_ = None          # sera calculée par fit()

    def fit(self, X, y):
        self.moyenne_ = sum(y) / len(y)
        return self                   # permet d'enchaîner les appels, comme dans scikit-learn

    def predict(self, X):
        return [self.moyenne_ for _ in X]


class ModeleSeuil(ModeleMoyenne):
    """Hérite de ModeleMoyenne, mais prédit 1 si la première variable dépasse un seuil, 0 sinon."""

    def __init__(self, seuil):
        super().__init__()            # réutilise l'initialisation de la classe parente
        self.seuil = seuil

    def predict(self, X):
        return [1 if ligne[0] > self.seuil else 0 for ligne in X]


modele = ModeleMoyenne().fit([[1], [2], [3]], [10, 20, 30])
print(modele.predict([[4], [5]]))       # [20.0, 20.0]

classifieur = ModeleSeuil(seuil=2.5)
print(classifieur.predict([[1], [3]]))  # [0, 1]`}
        explanation="Ces deux classes reproduisent la convention de scikit-learn : fit() apprend à partir des données et predict() produit des prédictions. C'est ce qui permet de remplacer un algorithme par un autre en changeant une seule ligne. Par convention, un attribut terminé par un tiret bas (moyenne_) désigne une valeur apprise pendant fit()."
      />
    </LessonSection>

    <LessonSection title="Visualisation, pandas et scikit-learn" icon={<BarChart size={24} />} delay={4}>
      <p>
        La visualisation des données est une étape cruciale dans le développement de solutions d'IA. Python offre d'excellentes bibliothèques comme Matplotlib et Seaborn pour créer des visualisations informatives et esthétiques, essentielles pour comprendre les données et communiquer les résultats.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-card p-4 rounded-lg border">
          <h4 className="font-medium mb-2">Matplotlib</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Bibliothèque fondamentale pour la création de graphiques (statiques, animés ou interactifs) en Python. Elle offre un contrôle granulaire sur chaque aspect des visualisations.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
            <li>Graphiques linéaires, histogrammes, nuages de points</li>
            <li>Personnalisation complète des graphiques</li>
            <li>Création de subplots et figures complexes</li>
            <li>Base de Seaborn et du tracé intégré à pandas</li>
          </ul>
        </div>
        <div className="bg-card p-4 rounded-lg border">
          <h4 className="font-medium mb-2">Seaborn</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Construit sur Matplotlib, Seaborn simplifie la création de visualisations statistiques complexes avec une esthétique moderne.
          </p>
          <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
            <li>Palettes de couleurs et thèmes prédéfinis</li>
            <li>Visualisations statistiques avancées</li>
            <li>Intégration avec pandas</li>
            <li>Représentation élégante des distributions</li>
          </ul>
        </div>
      </div>

      <CodeExample 
        title="Visualisation avec Matplotlib"
        language="python"
        code={`import matplotlib.pyplot as plt
import numpy as np

# Générer des données
x = np.linspace(0, 10, 100)
y1 = np.sin(x)
y2 = np.cos(x)

# Créer une figure avec deux sous-graphiques
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 8))

# Premier graphique - courbe sinusoïdale
ax1.plot(x, y1, 'b-', linewidth=2, label='sin(x)')
ax1.set_title('Fonction Sinus')
ax1.set_xlabel('x')
ax1.set_ylabel('sin(x)')
ax1.grid(True)
ax1.legend()

# Deuxième graphique - courbe cosinus
ax2.plot(x, y2, 'r-', linewidth=2, label='cos(x)')
ax2.set_title('Fonction Cosinus')
ax2.set_xlabel('x')
ax2.set_ylabel('cos(x)')
ax2.grid(True)
ax2.legend()

# Ajuster l'espacement
plt.tight_layout()

# Afficher le graphique
plt.show()

# Exemple de graphique plus complexe - nuage de points
plt.figure(figsize=(10, 6))

# Générer des données pour trois groupes
np.random.seed(42)
group1_x = np.random.normal(0, 1, 100)
group1_y = np.random.normal(0, 1, 100)
group2_x = np.random.normal(3, 1, 100)
group2_y = np.random.normal(3, 1, 100)
group3_x = np.random.normal(6, 1, 100)
group3_y = np.random.normal(0, 1, 100)

# Créer le nuage de points avec trois groupes
plt.scatter(group1_x, group1_y, c='blue', alpha=0.6, label='Groupe 1')
plt.scatter(group2_x, group2_y, c='red', alpha=0.6, label='Groupe 2')
plt.scatter(group3_x, group3_y, c='green', alpha=0.6, label='Groupe 3')

plt.title('Nuage de Points avec Trois Groupes')
plt.xlabel('Axe X')
plt.ylabel('Axe Y')
plt.legend()
plt.grid(True, linestyle='--', alpha=0.7)

plt.tight_layout()
plt.show()

# Histogramme avec distribution normale
plt.figure(figsize=(10, 6))

# Générer des données selon une distribution normale
data = np.random.normal(0, 1, 1000)

# Créer l'histogramme
plt.hist(data, bins=30, alpha=0.7, color='purple', edgecolor='black')

# Ajouter des informations statistiques
plt.axvline(data.mean(), color='red', linestyle='dashed', linewidth=2, label=f'Moyenne: {data.mean():.2f}')
plt.axvline(data.mean() + data.std(), color='green', linestyle='dotted', linewidth=2, label=f'Écart-type: {data.std():.2f}')
plt.axvline(data.mean() - data.std(), color='green', linestyle='dotted', linewidth=2)

plt.title('Histogramme d\\'une Distribution Normale')
plt.xlabel('Valeur')
plt.ylabel('Fréquence')
plt.legend()
plt.grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`}
        explanation="Matplotlib permet de créer des visualisations personnalisables pour analyser et présenter des données. Cet exemple montre comment créer plusieurs types de graphiques : des courbes, un nuage de points avec plusieurs groupes, et un histogramme avec des lignes de référence statistiques."
      />

      <ZoomOn title="pandas pour l'analyse de données">
        <p>
          pandas est une bibliothèque Python courante pour la manipulation et l'analyse de données. Ses DataFrames sont adaptés aux données tabulaires.
        </p>
        <p className="mt-2">
          Fonctions courantes de pandas :
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-2">
          <li>Manipulation de données tabulaires avec les DataFrames</li>
          <li>Fusion, filtrage et transformation de données</li>
          <li>Gestion des valeurs manquantes</li>
          <li>Outils intégrés pour la lecture et l'écriture de divers formats de fichiers (CSV, Excel, SQL, etc.)</li>
          <li>Interopérabilité avec d'autres bibliothèques d'analyse de données et d'apprentissage automatique</li>
        </ul>
      </ZoomOn>

      <CodeExample 
        title="Analyse de données avec pandas"
        language="python"
        code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Créer un DataFrame
donnees = {
    'nom': ['Alice', 'Bob', 'Charlie', 'David', 'Emma'],
    'age': [25, 30, 35, 40, 45],
    'ville': ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille'],
    'score_test': [85, 92, 78, 95, 88]
}
df = pd.DataFrame(donnees)

# Afficher les premières lignes
print("Aperçu des données:")
print(df.head())

# Informations sur le DataFrame
print("\\nInformation sur le DataFrame:")
df.info()   # affiche lui-même le résumé (inutile de l'entourer de print)

# Statistiques descriptives
print("\\nStatistiques descriptives:")
print(df.describe())

# Filtrage des données
print("\\nPersonnes de plus de 30 ans:")
print(df[df['age'] > 30])

# Ajout d'une colonne calculée
df['score_normalise'] = (df['score_test'] - df['score_test'].mean()) / df['score_test'].std()
print("\\nAvec scores normalisés:")
print(df)

# Groupement et agrégation
print("\\nScore moyen par ville:")
print(df.groupby('ville')['score_test'].mean())

print("\\nStatistiques par ville:")
print(df.groupby('ville').agg({
    'age': ['mean', 'min', 'max'],
    'score_test': ['mean', 'min', 'max']
}))

# Lecture de données depuis un fichier CSV (exemple commenté)
# df_from_csv = pd.read_csv('data.csv')

# Écriture de données vers un fichier CSV (exemple commenté)
# df.to_csv('resultats.csv', index=False)

# Gestion des valeurs manquantes (exemple avec données simulées)
df_with_na = df.copy()
df_with_na.loc[2, 'score_test'] = np.nan
print("\\nDataFrame avec valeur manquante:")
print(df_with_na)

print("\\nRemplissage des valeurs manquantes:")
print(df_with_na.fillna(df_with_na['score_test'].mean()))

# Visualisation avec pandas (qui utilise Matplotlib)
plt.figure(figsize=(12, 5))

# Graphique à barres des scores
plt.subplot(1, 2, 1)
df.plot(kind='bar', x='nom', y='score_test', title='Scores par personne', ax=plt.gca())
plt.ylabel('Score')
plt.xticks(rotation=45)

# Graphique à secteurs pour la distribution des villes
plt.subplot(1, 2, 2)
df['ville'].value_counts().plot(kind='pie', autopct='%1.1f%%', title='Distribution des villes')
plt.ylabel('')

plt.tight_layout()
plt.show()

# Utilisation de seaborn avec pandas pour des visualisations plus avancées
plt.figure(figsize=(12, 5))

# Graphique de distribution avec relation entre âge et score
plt.subplot(1, 2, 1)
sns.scatterplot(data=df, x='age', y='score_test', hue='ville', s=100)
plt.title('Relation entre Âge et Score')

# Distribution des scores
plt.subplot(1, 2, 2)
sns.histplot(df['score_test'], kde=True)
plt.axvline(df['score_test'].mean(), color='red', linestyle='dashed')
plt.title('Distribution des Scores')

plt.tight_layout()
plt.show()`}
        explanation="pandas est une bibliothèque courante pour préparer et analyser des données avant de les utiliser dans des modèles d'IA. Ce code illustre la création de DataFrames, les opérations de base comme le filtrage et l'agrégation, ainsi que l'intégration avec les bibliothèques de visualisation pour explorer vos données."
      />

      <Illustration
        src={asset('pics/graphiques-donnees.jpg')}
        alt="Écran d'ordinateur portable affichant des histogrammes et des courbes de données"
        caption="La visualisation aide à repérer les tendances et les anomalies avant toute modélisation"
        width="2/3"
      />

      <ZoomOn title="Introduction à scikit-learn pour le machine learning">
        <p>
          scikit-learn est une bibliothèque de référence pour l'apprentissage automatique en Python. Elle propose des outils cohérents pour l'analyse prédictive, avec une API commune à ses modèles.
        </p>
        <ul className="list-disc pl-6 mt-2 mb-2">
          <li><strong>Prétraitement</strong> : normalisation, encodage des variables catégorielles, gestion des valeurs manquantes</li>
          <li><strong>Sélection de modèles</strong> : validation croisée, recherche de paramètres</li>
          <li><strong>Algorithmes</strong> : classification, régression, clustering, réduction de dimension</li>
          <li><strong>Évaluation</strong> : métriques de performance, matrices de confusion, courbes ROC</li>
        </ul>
        <p className="mt-2">
          scikit-learn suit une convention simple pour tous ses modèles :
          <code className="ml-2">fit(X, y)</code> pour entraîner,
          <code className="ml-2">predict(X)</code> pour prédire,
          <code className="ml-2">score(X, y)</code> pour évaluer.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="À vos claviers : projet pratique Python pour l'IA" icon={<PenTool size={24} />} delay={5}>
      <p>
        Une bonne façon d'apprendre Python pour l'IA est de travailler sur un projet concret. Voici un mini-projet qui utilise les bibliothèques que nous avons vues pour analyser un jeu de données et construire un modèle simple de prédiction.
      </p>

      <CodeExample 
        title="Mini-projet : analyse et prédiction avec le jeu de données Iris"
        language="python"
        code={`import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

# 1. CHARGEMENT ET EXPLORATION DES DONNÉES
# ----------------------------------------

# Charger le jeu de données Iris
iris = load_iris()
X = iris.data
y = iris.target
feature_names = iris.feature_names
target_names = iris.target_names

# Créer un DataFrame pour faciliter l'exploration
df = pd.DataFrame(X, columns=feature_names)
df['species'] = [target_names[i] for i in y]  # Ajouter les noms d'espèces

print("Aperçu du jeu de données Iris:")
print(df.head())

print("\\nDimensions:", df.shape)
print("\\nStatistiques descriptives:")
print(df.describe())

print("\\nDistribution des espèces:")
print(df['species'].value_counts())

# 2. VISUALISATION DES DONNÉES
# ----------------------------

# Paires de nuages de points pour voir les relations entre les variables
sns.pairplot(df, hue='species', markers=['o', 's', 'D'])
plt.suptitle('Relations entre les caractéristiques par espèce', y=1.02)
plt.show()

# Distribution des caractéristiques par espèce
plt.figure(figsize=(15, 10))
for i, feature in enumerate(feature_names):
    plt.subplot(2, 2, i+1)
    for species in target_names:
        sns.kdeplot(df[df['species'] == species][feature], label=species)
    plt.title(f'Distribution de {feature}')
    plt.xlabel(feature)
    plt.legend()
plt.tight_layout()
plt.show()

# 3. PRÉTRAITEMENT DES DONNÉES
# ---------------------------

# Division en ensemble d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42, stratify=y)

print(f"\\nTaille de l'ensemble d'entraînement: {X_train.shape[0]} échantillons")
print(f"Taille de l'ensemble de test: {X_test.shape[0]} échantillons")

# Normalisation des données
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\\nAperçu des données normalisées:")
print(pd.DataFrame(X_train_scaled, columns=feature_names).head())

# 4. CONSTRUCTION ET ÉVALUATION DU MODÈLE
# --------------------------------------

# Entraînement d'un modèle KNN (k-plus proches voisins)
k = 5
knn = KNeighborsClassifier(n_neighbors=k)
knn.fit(X_train_scaled, y_train)

# Prédictions sur l'ensemble de test
y_pred = knn.predict(X_test_scaled)

# Évaluation du modèle
accuracy = accuracy_score(y_test, y_pred)
conf_matrix = confusion_matrix(y_test, y_pred)
class_report = classification_report(y_test, y_pred, target_names=target_names)

print(f"\\nExactitude (accuracy) du modèle KNN (k={k}): {accuracy:.4f}")
print("\\nMatrice de confusion:")
print(conf_matrix)
print("\\nRapport de classification:")
print(class_report)

# Visualisation de la matrice de confusion
plt.figure(figsize=(8, 6))
sns.heatmap(conf_matrix, annot=True, fmt='d', cmap='Blues',
           xticklabels=target_names, yticklabels=target_names)
plt.xlabel('Prédiction')
plt.ylabel('Réalité')
plt.title('Matrice de confusion')
plt.show()

# 5. CHOIX DU PARAMÈTRE K PAR VALIDATION CROISÉE
# ----------------------------------------------
# K se choisit avec l'ensemble d'entraînement uniquement : le jeu de test doit rester une
# évaluation honnête, jamais utilisée pour faire un choix. Remarque : X_train_scaled est standardisé sur tout l'entraînement ; pour une validation croisée sans aucune fuite, on placerait le StandardScaler dans un Pipeline (voir le cours suivant).

k_range = range(1, 31)
scores = []

for k in k_range:
    knn = KNeighborsClassifier(n_neighbors=k)
    scores.append(cross_val_score(knn, X_train_scaled, y_train, cv=5).mean())

# Visualiser l'impact de K sur l'exactitude (validation croisée)
plt.figure(figsize=(10, 6))
plt.plot(k_range, scores, marker='o')
plt.xlabel('Valeur de K')
plt.ylabel('Exactitude (validation croisée)')
plt.title('Exactitude du modèle KNN en fonction de K')
plt.grid(True)
plt.show()

# Retenir le meilleur K, réentraîner le modèle final et l'évaluer sur le jeu de test
best_k = k_range[np.argmax(scores)]
print(f"\\nMeilleure valeur de K (validation croisée): {best_k}")

knn = KNeighborsClassifier(n_neighbors=best_k)
knn.fit(X_train_scaled, y_train)
print(f"Exactitude finale sur le jeu de test: {knn.score(X_test_scaled, y_test):.4f}")

# 6. UTILISATION DU MODÈLE POUR PRÉDIRE DE NOUVELLES OBSERVATIONS
# ------------------------------------------------------------

# Créer quelques observations de test
new_flowers = np.array([
    [5.1, 3.5, 1.4, 0.2],  # Probablement une setosa
    [6.3, 3.3, 4.7, 1.6],  # Probablement une versicolor
    [6.9, 3.1, 5.4, 2.1]   # Probablement une virginica
])

# Normaliser les nouvelles observations
new_flowers_scaled = scaler.transform(new_flowers)

# Faire les prédictions
predictions = knn.predict(new_flowers_scaled)
pred_species = [target_names[pred] for pred in predictions]

print("\\nPrédictions pour de nouvelles fleurs:")
for i, (flower, species) in enumerate(zip(new_flowers, pred_species)):
    print(f"Fleur {i+1} {flower}: {species}")

# Visualiser les nouvelles fleurs dans l'espace des caractéristiques (sepal length et width)
plt.figure(figsize=(10, 6))

# Tracer les points d'entraînement
for i, species in enumerate(target_names):
    indices = y_train == i
    plt.scatter(X_train[indices, 0], X_train[indices, 1], 
               label=f'Entraînement - {species}', alpha=0.5)

# Tracer les nouvelles fleurs
for i, (flower, species) in enumerate(zip(new_flowers, pred_species)):
    plt.scatter(flower[0], flower[1], marker='*', s=200, 
               label=f'Nouvelle fleur {i+1} - {species}')

plt.xlabel(feature_names[0])
plt.ylabel(feature_names[1])
plt.title('Nouvelles fleurs dans l\\'espace des caractéristiques')
plt.legend()
plt.grid(True)
plt.show()

print("\\nFélicitations! Vous avez complété votre premier projet de machine learning avec Python!")`}
        explanation="Ce mini-projet illustre comment utiliser Python et ses bibliothèques pour analyser des données et construire un modèle de classification : exploration, visualisation, prétraitement, modélisation, choix de K par validation croisée, puis évaluation finale sur un jeu de test resté intact. Le jeu Iris est petit et facile : les scores obtenus ne disent rien de ce qu'on obtiendrait sur un problème réel."
      />

      <div className="my-8 p-5 border border-primary/30 rounded-lg bg-primary/5">
        <h4 className="text-lg font-medium mb-4 flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-primary" />
          Exercices complémentaires
        </h4>
        <p className="mb-4">
          Pour approfondir vos connaissances, essayez ces exercices qui étendent le projet ci-dessus :
        </p>
        <ol className="list-decimal ml-5 space-y-2">
          <li>
            <strong>Testez d'autres algorithmes</strong> : Remplacez KNN par un autre algorithme de classification comme RandomForest, SVM ou LogisticRegression de scikit-learn.
          </li>
          <li>
            <strong>Comparez des algorithmes par validation croisée</strong> : Utilisez cross_val_score sur le jeu d'entraînement pour comparer plusieurs algorithmes, sans toucher au jeu de test.
          </li>
          <li>
            <strong>Créez un pipeline de prétraitement</strong> : Utilisez la classe Pipeline de scikit-learn pour combiner prétraitement et modélisation.
          </li>
          <li>
            <strong>Explorez d'autres jeux de données</strong> : Appliquez cette même démarche à un autre jeu de données comme Wine, Breast Cancer ou Digits, également disponibles dans scikit-learn.
          </li>
        </ol>
      </div>
    </LessonSection>

    <CourseSources sources={pythonSources} />

    <CourseQuiz title="Quiz : Python pour l'intelligence artificielle" questions={quizQuestions} />
  </CourseGuideLayout>
);

export default PythonIA;
