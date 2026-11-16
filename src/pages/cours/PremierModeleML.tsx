// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Database, BarChart, Settings, LineChart, Wrench } from 'lucide-react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import LessonSection from '@/components/courses/LessonSection';
import CodeExample from '@/components/courses/CodeExample';
import ZoomOn from '@/components/courses/ZoomOn';
import Illustration from '@/components/courses/Illustration';
import CourseQuiz, { QuizQuestion } from '@/components/courses/CourseQuiz';
import CourseSources from '@/components/courses/CourseSources';
import { asset } from '@/lib/paths';

const mlSources = [
  { label: 'scikit-learn 1.2\u00A0: notes de version (retrait de load_boston)', href: 'https://scikit-learn.org/stable/whats_new/v1.2.html' },
  { label: 'scikit-learn 1.0\u00A0: documentation de load_boston (avertissement éthique)', href: 'https://scikit-learn.org/1.0/modules/generated/sklearn.datasets.load_boston.html' },
  { label: 'scikit-learn\u00A0: jeux de données réels et cibles', href: 'https://scikit-learn.org/stable/datasets/real_world.html' },
  { label: 'scikit-learn\u00A0: jeu de données Iris', href: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_iris.html' },
  { label: 'scikit-learn\u00A0: jeu de données California housing', href: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.fetch_california_housing.html' },
  { label: 'scikit-learn\u00A0: Pipeline', href: 'https://scikit-learn.org/stable/modules/compose.html' },
  { label: 'scikit-learn\u00A0: validation croisée', href: 'https://scikit-learn.org/stable/modules/cross_validation.html' },
  { label: "scikit-learn\u00A0: recherche d'hyperparamètres", href: 'https://scikit-learn.org/stable/modules/grid_search.html' },
  { label: 'scikit-learn\u00A0: persistance des modèles et sécurité de pickle', href: 'https://scikit-learn.org/stable/model_persistence.html' },
  { label: 'scikit-learn\u00A0: jeu de données Wine', href: 'https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_wine.html' },
  { label: 'Flask\u00A0: mode debug et sécurité', href: 'https://flask.palletsprojects.com/en/stable/debugging/' },
];

const quizQuestions: QuizQuestion[] = [
  {
    question: "Quelle est la différence principale entre l'apprentissage supervisé et non supervisé ?",
    options: [
      "L'apprentissage supervisé utilise plus de données",
      "L'apprentissage supervisé utilise des données étiquetées, l'apprentissage non supervisé utilise des données non étiquetées",
      "L'apprentissage supervisé est plus rapide que l'apprentissage non supervisé",
      "L'apprentissage non supervisé est toujours plus précis"
    ],
    correctAnswer: 1,
    explanation: "L'apprentissage supervisé utilise des données où la réponse correcte (étiquette) est fournie, permettant au modèle d'apprendre à prédire ces étiquettes. L'apprentissage non supervisé n'a pas d'étiquettes et cherche à découvrir des structures cachées dans les données."
  },
  {
    question: "Quelle technique devrait être utilisée pour évaluer correctement la performance d'un modèle de ML\u00A0?",
    options: [
      "Utiliser tout le jeu de données pour l'entraînement et l'évaluation",
      "Validation croisée (cross-validation)",
      "Évaluer uniquement sur les données d'entraînement",
      "Évaluer uniquement sur les dernières données collectées"
    ],
    correctAnswer: 1,
    explanation: "La validation croisée divise les données en plusieurs sous-ensembles pour entraîner et évaluer le modèle sur différentes parties des données, offrant une évaluation plus robuste de sa capacité de généralisation."
  },
  {
    question: "Qu'est-ce que le surapprentissage (overfitting) en machine learning\u00A0?",
    options: [
      "Quand le modèle est trop simple pour capturer les tendances des données",
      "Quand le modèle s'adapte trop bien aux données d'entraînement et généralise mal",
      "Quand le modèle est entraîné sur trop d'époques",
      "Quand le modèle a trop de paramètres à optimiser"
    ],
    correctAnswer: 1,
    explanation: "Le surapprentissage se produit lorsqu'un modèle capture le bruit dans les données d'entraînement plutôt que les véritables relations sous-jacentes, ce qui nuit à sa performance sur de nouvelles données."
  },
  {
    question: "Quel algorithme parmi les suivants n'est pas un algorithme de classification\u00A0?",
    options: [
      "Random Forest",
      "Régression logistique",
      "Régression linéaire",
      "Support Vector Machine (SVM)"
    ],
    correctAnswer: 2,
    explanation: "La régression linéaire est un algorithme de régression qui prédit une valeur continue. La régression logistique, la forêt aléatoire et le SVM servent à classer en catégories discrètes (les deux derniers existent aussi en version régression)."
  },
  {
    question: "Quelle étape est essentielle avant d'entraîner un modèle de machine learning\u00A0?",
    options: [
      "Normaliser toutes les données",
      "Explorer et comprendre les données",
      "Choisir le modèle le plus complexe possible",
      "Maximiser le nombre de caractéristiques (features)"
    ],
    correctAnswer: 1,
    explanation: "Explorer et comprendre les données est crucial pour identifier les problèmes potentiels (valeurs manquantes, valeurs aberrantes), comprendre les relations et guider le choix des techniques de prétraitement et des modèles appropriés."
  },
  {
    question: "Pourquoi faut-il ajuster (fit) un StandardScaler uniquement sur les données d'entraînement\u00A0?",
    options: [
      "Pour que l'entraînement soit plus rapide",
      "Pour éviter que des informations du jeu de test influencent l'entraînement (fuite de données)",
      "Parce que scikit-learn refuse de normaliser deux fois",
      "Pour réduire le nombre de variables"
    ],
    correctAnswer: 1,
    explanation: "Si la moyenne et l'écart-type sont calculés avec les données de test, le modèle «\u00A0voit\u00A0» indirectement une partie du test\u00A0: l'évaluation devient trop optimiste. On ajuste donc le préprocesseur sur l'entraînement, puis on l'applique tel quel au test. Un Pipeline scikit-learn garantit cette discipline, y compris pendant la validation croisée."
  },
  {
    question: "Que faut-il éviter quand on choisit les hyperparamètres d'un modèle\u00A0?",
    options: [
      "Utiliser la validation croisée",
      "Comparer les essais sur le jeu de test final, qui doit rester intact jusqu'à l'évaluation finale",
      "Tester plusieurs valeurs",
      "Fixer random_state pour rendre les résultats reproductibles"
    ],
    correctAnswer: 1,
    explanation: "Si l'on choisit les réglages qui donnent le meilleur score sur le jeu de test, ce score n'est plus une estimation honnête de la performance sur de nouvelles données. Les réglages se choisissent par validation croisée sur l'entraînement\u00A0; le test ne sert qu'une fois, à la fin."
  }
];

const plan: CoursePlanItem[] = [
  {
    icon: <Database className="h-5 w-5 text-primary" />,
    title: 'Définir le problème et collecter les données',
    description: "Formuler le problème, choisir les sources de données, prévoir la collecte et ses enjeux éthiques.",
  },
  {
    icon: <BarChart className="h-5 w-5 text-primary" />,
    title: 'Explorer et visualiser les données',
    description: "Statistiques descriptives, visualisations, valeurs manquantes, corrélations et valeurs aberrantes.",
  },
  {
    icon: <Wrench className="h-5 w-5 text-primary" />,
    title: 'Préparer les données et créer des variables',
    description: "Valeurs manquantes, encodage des catégories, normalisation, sélection et création de variables, avec un Pipeline.",
  },
  {
    icon: <LineChart className="h-5 w-5 text-primary" />,
    title: 'Construire et entraîner le modèle',
    description: "Séparer entraînement et test, comparer plusieurs algorithmes par validation croisée, évaluer le meilleur.",
  },
  {
    icon: <Settings className="h-5 w-5 text-primary" />,
    title: 'Optimiser, sauvegarder et déployer',
    description: "Recherche d'hyperparamètres, métriques, sauvegarde du modèle, API simple et surveillance après la mise en service.",
  },
];

/**
 * Cours pratique : un projet de machine learning de bout en bout avec scikit-learn.
 */
const PremierModeleML = () => (
  <CourseGuideLayout
    title="Construire son premier modèle de machine learning, pas à pas"
    subtitle="Un projet complet avec Python et scikit-learn, de la définition du problème à la mise à disposition du modèle"
    about={[
      "Ce cours pratique suit les étapes d'un projet de machine learning de bout en bout\u00A0: définir le problème, explorer et préparer les données, comparer des modèles, régler leurs paramètres, puis sauvegarder et servir le meilleur d'entre eux.",
      "Chaque leçon s'appuie sur un exemple de code complet, à exécuter sur votre machine. Les jeux de données viennent de scikit-learn\u00A0; les scores affichés dépendent des versions des bibliothèques et ne sont pas donnés ici.",
    ]}
    learn={[
      "Les étapes clés d'un projet de machine learning, et pourquoi le problème se définit avant le modèle",
      "L'exploration, la préparation et le prétraitement des données avec pandas et scikit-learn",
      "La comparaison de modèles par validation croisée, sans fuite de données",
      "Le réglage des hyperparamètres et l'évaluation honnête sur un jeu de test intact",
      "La sauvegarde d'un modèle, un exemple d'API et les points de vigilance après le déploiement",
    ]}
    plan={plan}
    info={{
      level: 'Intermédiaire',
      duration: 'Environ 4 à 5 heures de lecture et de pratique',
      prerequisites:
        "Bases de Python (fonctions, listes) et notions de statistiques descriptives. Les exemples utilisent pandas, scikit-learn, matplotlib et seaborn.",
      contents: ['5 leçons', 'Exemples de code complets avec scikit-learn', 'Quiz de 7 questions'],
    }}
    related={[
      {
        to: '/cours/python-ia',
        title: 'Initiation à Python pour l’IA',
        description: 'Les bases de Python, NumPy, pandas et Matplotlib, si vous débutez.',
      },
      {
        to: '/cours/apprentissage-supervise',
        title: 'Apprentissage supervisé',
        description: 'Classification et régression expliquées avec des visualisations interactives.',
      },
      {
        to: '/simulateur-ia',
        title: "Simulateur d'entraînement IA",
        description: 'Entraîner un modèle dans le navigateur et voir l’effet des paramètres.',
      },
      {
        to: '/cours/ia-ethique',
        title: 'IA éthique et responsable',
        description: 'Biais des données, transparence et responsabilité.',
      },
      {
        to: '/analyseur-donnees',
        title: 'Analyseur de jeu de données',
        description: 'Repérer valeurs manquantes, doublons, déséquilibres et fuites de données dans un CSV.',
      },
      {
        to: '/generateur-donnees',
        title: 'Générateur de données synthétiques',
        description: "Fabriquer un tableau fictif pour s'exercer sans données personnelles.",
      },
    ]}
  >
    <LessonSection title="Définition du problème et collecte des données" icon={<Database size={24} />} delay={1}>
      <p>
        Tout projet de machine learning commence par une définition claire du problème à résoudre et par la collecte de données pertinentes. Cette étape fondamentale détermine en grande partie le succès ou l'échec de votre projet.
      </p>

      <ZoomOn title="Types de problèmes en machine learning">
        <p>Il est essentiel d'identifier la nature de votre problème pour choisir les bons outils et approches :</p>
        <div className="mt-2 space-y-2">
          <p>
            <strong>Classification :</strong> Prédire une catégorie (ex : spam/non-spam, fraude/légitime)
          </p>
          <p>
            <strong>Régression :</strong> Prédire une valeur numérique (ex : prix, température, ventes)
          </p>
          <p>
            <strong>Clustering :</strong> Regrouper des données similaires sans étiquettes prédéfinies
          </p>
          <p>
            <strong>Détection d'anomalies :</strong> Identifier des observations inhabituelles
          </p>
          <p>
            <strong>Système de recommandation :</strong> Suggérer des éléments pertinents aux utilisateurs
          </p>
        </div>
      </ZoomOn>

      <p className="mt-4">
        La collecte de données peut impliquer diverses sources : bases de données existantes, API, web scraping, capteurs, ou création de données spécifiques via des enquêtes. Il est crucial de s'assurer que les données collectées sont représentatives du problème réel.
      </p>

      <CodeExample 
        title="Chargement de jeux de données avec scikit-learn"
        language="python"
        code={`import numpy as np
import pandas as pd
from sklearn import datasets
import matplotlib.pyplot as plt
import seaborn as sns

# Charger des jeux de données intégrés
iris = datasets.load_iris()
cancer = datasets.load_breast_cancer()

# Créer un DataFrame pandas à partir du jeu de données Iris
iris_df = pd.DataFrame(data=iris.data, columns=iris.feature_names)
iris_df['target'] = iris.target
iris_df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)

# Afficher les premières lignes
print("Aperçu du jeu de données Iris:")
print(iris_df.head())

# Informations sur le jeu de données
print("\\nInformations sur le jeu de données:")
print(f"Nombre d'échantillons: {len(iris_df)}")
print(f"Nombre de caractéristiques: {len(iris.feature_names)}")
print(f"Classes cibles: {iris.target_names}")
print(f"Distribution des classes: {np.bincount(iris.target)}")

# Statistiques descriptives
print("\\nStatistiques descriptives:")
print(iris_df.describe())

# Visualisation simple
plt.figure(figsize=(10, 6))
sns.scatterplot(x='sepal length (cm)', y='sepal width (cm)', 
                hue='species', data=iris_df, palette='viridis')
plt.title('Distribution des espèces d\\'iris par dimensions des sépales')
plt.show()`}
        explanation="Ce code montre comment charger des jeux de données intégrés dans scikit-learn et effectuer une analyse exploratoire initiale avec pandas et des visualisations."
      />

      <ZoomOn title="Pourquoi load_boston a disparu de scikit-learn">
        <p>
          Très présent dans les anciens tutoriels, le jeu « Boston housing » a été retiré de scikit-learn en version 1.2
          (décembre 2022) : l'une de ses variables repose sur l'idée discutable que la ségrégation raciale ferait monter
          les prix de l'immobilier.
          Si vous le croisez dans un tutoriel, remplacez-le par <code>fetch_california_housing</code> ou{' '}
          <code>load_diabetes</code>. C'est aussi un rappel utile : les données portent les choix, et parfois les
          préjugés, de ceux qui les ont construites.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Exploration et visualisation des données" icon={<BarChart size={24} />} delay={2}>
      <p>
        L'exploration des données (EDA - Exploratory Data Analysis) est une étape cruciale qui vous permet de comprendre la structure, les distributions et les relations dans vos données avant de construire un modèle.
      </p>

      <CodeExample 
        title="Analyse exploratoire avec pandas et seaborn"
        language="python"
        code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Charger un jeu de données réel
from sklearn.datasets import fetch_california_housing
housing = fetch_california_housing()   # téléchargé au premier appel, puis mis en cache
df = pd.DataFrame(housing.data, columns=housing.feature_names)
df['target'] = housing.target

# Afficher la forme et les informations du DataFrame
print(f"Forme du DataFrame: {df.shape}")
print("\\nAperçu des données:")
print(df.head())

# Vérifier les valeurs manquantes
print("\\nVérification des valeurs manquantes:")
print(df.isnull().sum())

# Statistiques descriptives
print("\\nStatistiques descriptives:")
print(df.describe())

# Visualiser la distribution de la variable cible
plt.figure(figsize=(10, 6))
sns.histplot(df['target'], kde=True)
plt.title('Distribution des prix des logements')
plt.xlabel('Prix médian (en 100 000$)')
plt.show()

# Corrélation entre les variables
plt.figure(figsize=(12, 8))
correlation_matrix = df.corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f")
plt.title('Matrice de corrélation')
plt.show()

# Visualiser quelques relations bivariées
plt.figure(figsize=(16, 10))
plt.subplot(2, 3, 1)
sns.scatterplot(x='MedInc', y='target', data=df, alpha=0.5)
plt.title('Prix vs Revenu médian')

plt.subplot(2, 3, 2)
sns.scatterplot(x='HouseAge', y='target', data=df, alpha=0.5)
plt.title('Prix vs Âge des maisons')

plt.subplot(2, 3, 3)
sns.scatterplot(x='AveRooms', y='target', data=df, alpha=0.5)
plt.title('Prix vs Nombre moyen de pièces')

plt.subplot(2, 3, 4)
sns.boxplot(x=pd.qcut(df['MedInc'], 5), y='target', data=df)
plt.title('Distribution des prix par quintile de revenu')
plt.xlabel('Quintile de revenu médian')

plt.subplot(2, 3, 5)
sns.boxplot(x=pd.qcut(df['Population'], 5), y='target', data=df)
plt.title('Distribution des prix par quintile de population')
plt.xlabel('Quintile de population')

plt.tight_layout()
plt.show()

# Identifier les valeurs aberrantes
plt.figure(figsize=(15, 10))
for i, feature in enumerate(housing.feature_names):
    plt.subplot(3, 3, i+1)
    sns.boxplot(y=df[feature])
    plt.title(f'Boxplot de {feature}')

plt.tight_layout()
plt.show()`}
        explanation="Ce code illustre diverses techniques d'analyse exploratoire : statistiques descriptives, visualisation des distributions, analyse de corrélation et identification de valeurs aberrantes."
      />

      <ZoomOn title="Importance de la visualisation des données">
        <p>
          « Une image vaut mille mots » est particulièrement vrai en data science. La visualisation permet de :
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-2">
          <li>Identifier rapidement des tendances et des régularités que les statistiques pourraient masquer</li>
          <li>Détecter des anomalies ou valeurs aberrantes</li>
          <li>Comprendre les relations entre variables</li>
          <li>Communiquer efficacement les observations découvertes</li>
          <li>Guider les décisions sur le prétraitement des données et la sélection de modèles</li>
        </ul>
      </ZoomOn>

      <Illustration
        src={asset('pics/graphiques-donnees.jpg')}
        alt="Écran d'ordinateur portable affichant des histogrammes et des courbes de données"
        caption="Une bonne visualisation révèle des tendances et des anomalies avant même d'entraîner un modèle"
        width="2/3"
      />
    </LessonSection>

    <LessonSection title="Préparation des données et création de variables" icon={<Wrench size={24} />} delay={3}>
      <p>
        Les données brutes sont rarement utilisables telles quelles : valeurs manquantes, catégories écrites en texte,
        échelles très différentes d'une colonne à l'autre. La préparation les transforme en nombres exploitables par un
        algorithme. C'est souvent la plus grande partie du travail d'un projet.
      </p>

      <ZoomOn title="Les opérations de préparation courantes">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>Valeurs manquantes :</strong> les supprimer si elles sont rares, ou les remplacer par la médiane, la
            moyenne ou la valeur la plus fréquente.
          </li>
          <li>
            <strong>Variables catégorielles :</strong> les convertir en nombres, par exemple avec un encodage « one-hot »
            (une colonne par catégorie).
          </li>
          <li>
            <strong>Échelles :</strong> standardiser ou normaliser les variables numériques, surtout pour les modèles
            sensibles aux distances ou aux ordres de grandeur.
          </li>
          <li>
            <strong>Sélection de variables :</strong> retirer les colonnes inutiles ou redondantes (par exemple avec{' '}
            <code>SelectKBest</code> ou en s'appuyant sur les corrélations).
          </li>
          <li>
            <strong>Création de variables :</strong> en fabriquer de nouvelles à partir des existantes (un ratio, une date
            décomposée en mois et jour de la semaine...).
          </li>
        </ul>
      </ZoomOn>

      <CodeExample
        title="Un Pipeline de préparation avec scikit-learn"
        language="python"
        code={`import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import RandomForestClassifier
from sklearn.impute import SimpleImputer
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

# Jeu de données fictif minuscule : valeurs manquantes et une variable catégorielle.
# Il ne sert qu'à montrer l'enchaînement des étapes, pas à évaluer un modèle.
df = pd.DataFrame({
    "age":    [25, 32, np.nan, 47, 51, 38, 29, np.nan],
    "revenu": [1800, 2500, 2200, np.nan, 4100, 3000, 2100, 2700],
    "ville":  ["Paris", "Lyon", "Lyon", "Lille", "Paris", np.nan, "Lille", "Paris"],
    "achete": [0, 1, 0, 1, 1, 1, 0, 0],
})
X = df.drop(columns="achete")
y = df["achete"]

# Création d'une variable à partir de deux autres (à titre d'exemple)
X["revenu_par_age"] = X["revenu"] / X["age"]

colonnes_numeriques = ["age", "revenu", "revenu_par_age"]
colonnes_categorielles = ["ville"]

preparation = ColumnTransformer([
    ("numeriques", Pipeline([
        ("valeurs_manquantes", SimpleImputer(strategy="median")),
        ("echelle", StandardScaler()),
    ]), colonnes_numeriques),
    ("categories", Pipeline([
        ("valeurs_manquantes", SimpleImputer(strategy="most_frequent")),
        ("one_hot", OneHotEncoder(handle_unknown="ignore")),
    ]), colonnes_categorielles),
])

modele = Pipeline([
    ("preparation", preparation),
    ("classifieur", RandomForestClassifier(n_estimators=100, random_state=42)),
])

# Chaque étape de préparation est ajustée uniquement sur les données d'entraînement de chaque pli
scores = cross_val_score(modele, X, y, cv=4)
print("Scores de validation croisée :", scores.round(2))`}
        explanation="Le Pipeline regroupe préparation et modèle en un seul objet : il évite la fuite de données pendant la validation croisée, se sauvegarde d'un bloc et s'applique tel quel à de nouvelles données. Le jeu ci-dessus est minuscule : les scores n'ont aucune signification, seule la structure du code compte."
      />

      <ZoomOn title="La fuite de données (data leakage)">
        <p>
          Il y a fuite de données quand des informations du jeu de test (ou du futur) influencent l'entraînement. Exemple
          classique : calculer la moyenne qui remplace les valeurs manquantes sur tout le jeu de données avant de le
          séparer. Le modèle profite alors d'informations qu'il n'aura pas en production, et le score obtenu est trop
          optimiste. Le remède : séparer d'abord, puis ajuster chaque étape de préparation uniquement sur
          l'entraînement, ce que fait automatiquement un Pipeline.
        </p>
      </ZoomOn>
    </LessonSection>

    <LessonSection title="Construction et entraînement du modèle" icon={<LineChart size={24} />} delay={4}>
      <p>
        La construction et l'entraînement d'un modèle sont au cœur de tout projet de machine learning. Cette étape implique de sélectionner un algorithme approprié, de préparer les données pour l'entraînement et de configurer le processus d'apprentissage.
      </p>

      <CodeExample 
        title="Entraînement et évaluation d'un modèle avec scikit-learn"
        language="python"
        code={`import numpy as np
import pandas as pd
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.pipeline import make_pipeline
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt

# Charger les données
diabetes = load_diabetes()
X = diabetes.data
y = diabetes.target

# Diviser en ensemble d'entraînement et de test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Définir plusieurs modèles à comparer. Chacun est placé dans un pipeline avec son standardiseur :
# pendant la validation croisée, le standardiseur est ajusté uniquement sur les données
# d'entraînement de chaque pli, ce qui évite toute fuite d'information vers le pli de validation.
models = {
    'Régression Linéaire': make_pipeline(StandardScaler(), LinearRegression()),
    'Ridge': make_pipeline(StandardScaler(), Ridge(alpha=1.0)),
    'Lasso': make_pipeline(StandardScaler(), Lasso(alpha=0.1)),
    'Random Forest': make_pipeline(StandardScaler(), RandomForestRegressor(n_estimators=100, random_state=42)),
    'Gradient Boosting': make_pipeline(StandardScaler(), GradientBoostingRegressor(n_estimators=100, random_state=42))
}

# Comparer les modèles avec validation croisée, sur l'ensemble d'entraînement uniquement
cv_results = {}
for name, model in models.items():
    scores = cross_val_score(model, X_train, y_train,
                             cv=5, scoring='neg_mean_squared_error')
    cv_results[name] = -scores.mean()
    print(f"{name} - MSE CV: {-scores.mean():.2f} (±{scores.std():.2f})")

# Sélectionner le meilleur modèle et l'entraîner sur tout l'ensemble d'entraînement
best_model_name = min(cv_results, key=cv_results.get)
best_model = models[best_model_name]
print(f"\\nMeilleur modèle: {best_model_name}")
best_model.fit(X_train, y_train)

# Évaluer une seule fois sur l'ensemble de test, resté intact jusqu'ici
y_pred = best_model.predict(X_test)
mse = mean_squared_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)
print(f"Performance sur l'ensemble de test:")
print(f"MSE: {mse:.2f}")
print(f"RMSE: {np.sqrt(mse):.2f}")
print(f"R²: {r2:.2f}")

# Visualiser les prédictions vs réalité
plt.figure(figsize=(10, 6))
plt.scatter(y_test, y_pred, alpha=0.7)
plt.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
plt.xlabel('Valeurs réelles')
plt.ylabel('Prédictions')
plt.title(f'Prédictions vs Réalité - {best_model_name}')
plt.show()

# Importance des caractéristiques, pour les modèles qui la fournissent
# (on la lit sur la dernière étape du pipeline)
estimateur = best_model[-1]
if hasattr(estimateur, 'feature_importances_'):
    importances = estimateur.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    plt.figure(figsize=(12, 6))
    plt.bar(range(X.shape[1]), importances[indices])
    plt.xticks(range(X.shape[1]), [diabetes.feature_names[i] for i in indices], rotation=90)
    plt.title('Importance des caractéristiques')
    plt.tight_layout()
    plt.show()`}
        explanation="Ce code illustre le processus d'entraînement et d'évaluation : division des données, comparaison de plusieurs algorithmes par validation croisée (avec la standardisation dans le pipeline), puis une seule évaluation finale du meilleur modèle sur le jeu de test."
      />

      <ZoomOn title="Comparaison des algorithmes courants">
        <div className="space-y-3">
          <p>
            <strong>Régression linéaire/logistique :</strong> 
            {' '}Simples, interprétables, rapides, mais limités aux relations linéaires.
          </p>
          <p>
            <strong>Arbres de décision :</strong> 
            {' '}Faciles à comprendre, gèrent bien les données hétérogènes, mais peuvent surapprendre.
          </p>
          <p>
            <strong>Random Forest et Gradient Boosting :</strong> 
            {' '}Souvent efficaces sur des données tabulaires. La forêt aléatoire surapprend moins qu'un arbre seul ; le gradient boosting demande un réglage soigné pour éviter le surapprentissage. Dans les deux cas, moins interprétables.
          </p>
          <p>
            <strong>Support Vector Machines :</strong> 
            {' '}Efficaces en haute dimension avec séparation claire, mais peuvent être lents sur de grands jeux de données.
          </p>
          <p>
            <strong>K-Nearest Neighbors :</strong> 
            {' '}Simple et intuitif, mais peut être coûteux en calcul pour de grands ensembles.
          </p>
        </div>
        <p className="mt-3">
          Le choix de l'algorithme dépend de la taille et de la nature des données, de la complexité du problème, de l'interprétabilité requise et des contraintes de ressources.
        </p>
      </ZoomOn>

      <Illustration
        src={asset('pics/bureau-code-python.jpg')}
        alt="Illustration : ordinateur portable affichant du code et un nuage de points"
        caption="Un modèle de machine learning, c'est du code et des données : la rigueur de la méthode compte plus que la complexité de l'algorithme"
        width="2/3"
      />
    </LessonSection>

    <LessonSection title="Optimisation, sauvegarde et déploiement du modèle" icon={<Settings size={24} />} delay={5}>
      <p>
        Une fois le modèle de base construit, on cherche ses meilleurs réglages (les hyperparamètres), on vérifie sa
        performance une dernière fois sur le jeu de test, puis on le sauvegarde pour pouvoir l'utiliser ailleurs.
      </p>

      <CodeExample
        title="Recherche d'hyperparamètres, évaluation finale et sauvegarde"
        language="python"
        code={`import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import joblib
from sklearn.datasets import load_wine
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.model_selection import train_test_split, GridSearchCV

# Charger les données
wine = load_wine()
X, y = wine.data, wine.target
feature_names = wine.feature_names
target_names = wine.target_names

# Le jeu de test est mis de côté : il ne servira qu'une seule fois, à la fin
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Espace de recherche des hyperparamètres.
# Une forêt aléatoire n'a pas besoin de standardisation ; avec un autre modèle, utilisez un Pipeline.
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [None, 10, 20],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}

# Recherche par grille avec validation croisée, sur l'ensemble d'entraînement uniquement
grid_search = GridSearchCV(
    estimator=RandomForestClassifier(random_state=42),
    param_grid=param_grid,
    cv=5,
    n_jobs=-1,
    scoring='accuracy',
    verbose=1
)
grid_search.fit(X_train, y_train)

print(f"\\nMeilleurs hyperparamètres: {grid_search.best_params_}")
print(f"Meilleur score de validation croisée: {grid_search.best_score_:.4f}")

# Évaluation finale, une seule fois, sur l'ensemble de test
best_model = grid_search.best_estimator_
y_pred = best_model.predict(X_test)

print("\\nRapport de classification sur l'ensemble de test:")
print(classification_report(y_test, y_pred, target_names=target_names))

# Matrice de confusion
plt.figure(figsize=(8, 6))
cm = confusion_matrix(y_test, y_pred)
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=target_names, yticklabels=target_names)
plt.xlabel('Prédictions')
plt.ylabel('Valeurs réelles')
plt.title('Matrice de confusion')
plt.show()

# Importance des caractéristiques
importances = best_model.feature_importances_
indices = np.argsort(importances)[::-1]

plt.figure(figsize=(12, 6))
plt.title('Importance des caractéristiques')
plt.bar(range(X.shape[1]), importances[indices])
plt.xticks(range(X.shape[1]), [feature_names[i] for i in indices], rotation=90)
plt.tight_layout()
plt.show()

# Sauvegarde du modèle (GridSearchCV l'a ré-entraîné sur tout l'ensemble d'entraînement)
joblib.dump(best_model, 'wine_classifier_model.joblib')

# Rechargement et utilisation sur un nouvel échantillon
loaded_model = joblib.load('wine_classifier_model.joblib')
nouvel_echantillon = X_test[0].reshape(1, -1)
prediction = loaded_model.predict(nouvel_echantillon)
probabilites = loaded_model.predict_proba(nouvel_echantillon)

print(f"Catégorie prédite: {target_names[prediction[0]]}")
for i, proba in enumerate(probabilites[0]):
    print(f"Probabilité {target_names[i]}: {proba:.4f}")`}
        explanation="GridSearchCV essaie toutes les combinaisons de réglages par validation croisée sur l'ensemble d'entraînement. Le jeu de test n'intervient qu'une fois, à la fin, pour une estimation honnête de la performance. Le modèle est ensuite sauvegardé avec joblib afin d'être rechargé ailleurs : une API, un script planifié."
      />

      <ZoomOn title="Choisir les bonnes métriques">
        <ul className="list-disc pl-6 space-y-1">
          <li>
            <strong>L'exactitude (accuracy)</strong> trompe quand les classes sont déséquilibrées : un modèle qui répond
            toujours « pas de fraude » peut afficher une exactitude très élevée sans rien détecter.
          </li>
          <li>
            <strong>Précision et rappel :</strong> parmi les alertes émises, combien sont justes (précision) ; parmi les cas
            réels, combien sont détectés (rappel). Le score F1 en est un compromis.
          </li>
          <li>
            <strong>La matrice de confusion</strong> montre quelles classes sont confondues entre elles.
          </li>
          <li>
            <strong>Le coût des erreurs</strong> n'est pas symétrique : manquer une maladie n'a pas les mêmes conséquences
            qu'une fausse alerte. La métrique doit refléter ce coût.
          </li>
        </ul>
      </ZoomOn>

      <ZoomOn title="Considérations pour la mise en production">
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Reproductibilité :</strong> fixer toutes les sources d'aléa (random_state) et noter les versions des bibliothèques</li>
          <li><strong>Pipeline complet :</strong> sauvegarder non seulement le modèle, mais aussi tous les préprocesseurs (un Pipeline s'en charge)</li>
          <li><strong>Surveillance :</strong> suivre la performance du modèle une fois en service</li>
          <li><strong>Dérive des données :</strong> détecter quand les données réelles s'éloignent de celles de l'entraînement</li>
          <li><strong>Mise à jour :</strong> prévoir un processus pour réentraîner et redéployer le modèle</li>
          <li><strong>Documentation :</strong> décrire ses entrées, ses sorties, ses limites et les données d'entraînement</li>
          <li>
            <strong>Sécurité :</strong> ne chargez jamais un fichier joblib ou pickle dont vous ne maîtrisez pas l'origine :
            son chargement peut exécuter du code arbitraire
          </li>
        </ul>
      </ZoomOn>

      <CodeExample
        title="Servir le modèle avec une API Flask"
        language="python"
        code={`from flask import Flask, request, jsonify
import numpy as np
import joblib

# Charger le modèle sauvegardé (uniquement un fichier dont vous maîtrisez l'origine)
model = joblib.load('wine_classifier_model.joblib')
NOMS_CLASSES = ['class_0', 'class_1', 'class_2']   # classes du jeu de données Wine
NB_VARIABLES = 13                                   # le jeu Wine compte 13 variables

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    donnees = request.get_json(silent=True) or {}
    variables = donnees.get('features')

    # Valider l'entrée avant de l'utiliser
    if not isinstance(variables, list) or len(variables) != NB_VARIABLES:
        return jsonify({'error': f'"features" doit être une liste de {NB_VARIABLES} nombres'}), 400
    try:
        x = np.array(variables, dtype=float).reshape(1, -1)
    except (TypeError, ValueError):
        return jsonify({'error': '"features" ne doit contenir que des nombres'}), 400

    classe = int(model.predict(x)[0])
    probabilites = model.predict_proba(x)[0].tolist()
    return jsonify({
        'prediction': classe,
        'predicted_class': NOMS_CLASSES[classe],
        'probabilities': {NOMS_CLASSES[i]: p for i, p in enumerate(probabilites)},
    })

if __name__ == '__main__':
    # Pour le développement uniquement. Ne jamais activer debug=True en production :
    # le débogueur de Flask permet d'exécuter du code sur le serveur.
    app.run(host='127.0.0.1', port=5000)

# Pour interroger cette API depuis un autre script Python :
#   import requests
#   reponse = requests.post(
#       'http://127.0.0.1:5000/predict',
#       json={'features': [12.0, 3.6, 2.5, 6.2, 1.2, 2.3, 3.4, 1.6, 2.9, 3.8, 1.2, 2.8, 3.0]},
#   )
#   print(reponse.json())`}
        explanation="Cet exemple minimal expose le modèle sur une route POST /predict. Il valide l'entrée, renvoie une erreur 400 si elle est incorrecte et n'active pas le mode debug. En production, on place l'application derrière un serveur WSGI (gunicorn, waitress) et un reverse proxy en HTTPS, et l'on limite les accès."
      />
    </LessonSection>

    <CourseSources sources={mlSources} />

    <CourseQuiz title="Quiz : construction d'un modèle de machine learning" questions={quizQuestions} />
  </CourseGuideLayout>
);

export default PremierModeleML;
