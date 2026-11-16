// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calculator, Brain, Lightbulb, Target } from 'lucide-react';
import AnalogiePedagogique from '../AnalogiePedagogique';
import DidYouKnow from '../DidYouKnow';
import ConceptIllustration from './ConceptIllustration';

const MathIntroductionSection: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Introduction principale */}
      <Card className="border-l-4 border-l-primary bg-linear-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Brain className="h-6 w-6 text-primary" />
            Pourquoi les Mathématiques sont Essentielles en IA ?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg leading-relaxed text-foreground">
            L'intelligence artificielle peut sembler magique, mais elle repose entièrement sur des 
            fondements mathématiques solides. Chaque algorithme, chaque prédiction, chaque décision 
            d'une IA découle de calculs mathématiques précis.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-100/50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Sans les Maths</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                L'IA serait comme une recette de cuisine sans ingrédients : impossible à réaliser !
              </p>
            </div>
            <div className="bg-green-100/50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Avec les Maths</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                L'IA peut apprendre à partir de données, faire des prédictions et traiter des problèmes complexes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analogie pédagogique */}
      <AnalogiePedagogique
        title="L'IA comme un chef cuisinier"
        description="Imaginez l'IA comme un chef cuisinier qui doit préparer des plats parfaits pour des milliers de clients aux goûts différents..."
        elements={[
          {
            aspect: "Les Ingrédients",
            explanation: "Ce sont les données d'entrée",
            mathConcept: "Représentées par des vecteurs et matrices"
          },
          {
            aspect: "La Recette",
            explanation: "C'est l'algorithme d'apprentissage",
            mathConcept: "Basée sur des fonctions mathématiques"
          },
          {
            aspect: "L'Ajustement du Goût",
            explanation: "C'est l'optimisation des paramètres",
            mathConcept: "Utilise le calcul différentiel et la dérivée"
          },
          {
            aspect: "La Satisfaction Client",
            explanation: "C'est la fonction de coût à minimiser",
            mathConcept: "Mesurée par des métriques statistiques"
          }
        ]}
      />

      {/* Les 4 piliers mathématiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ConceptIllustration
          icon={Calculator}
          title="Algèbre Linéaire"
          description="Le langage pour manipuler les données"
          examples={[
            { label: "Vecteurs", value: "[a, b, c]", description: "Listes de nombres" },
            { label: "Matrices", value: "A × B", description: "Transformations" },
            { label: "Produits", value: "u · v", description: "Relations entre données" }
          ]}
          bgColor="bg-linear-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
        />

        <ConceptIllustration
          icon={Target}
          title="Calcul Différentiel"
          description="Comment l'IA apprend et s'améliore"
          examples={[
            { label: "Dérivées", value: "f'(x)", description: "Taux de changement" },
            { label: "Gradients", value: "∇f", description: "Sens de la plus forte hausse de f" },
            { label: "Optimisation", value: "min f(x)", description: "Chercher un optimum" }
          ]}
          bgColor="bg-linear-to-br from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20"
        />

        <ConceptIllustration
          icon={Lightbulb}
          title="Probabilités"
          description="Gérer l'incertitude et faire des prédictions"
          examples={[
            { label: "P(A)", value: "0.7", description: "Chance d'occurrence" },
            { label: "Bayes", value: "P(A|B)", description: "Probabilité conditionnelle" },
            { label: "Distributions", value: "N(μ,σ²)", description: "Modèles de données" }
          ]}
          bgColor="bg-linear-to-br from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20"
        />

        <ConceptIllustration
          icon={Brain}
          title="Statistiques"
          description="Analyser et comprendre les données"
          examples={[
            { label: "Moyenne", value: "μ = Σx/n", description: "Tendance centrale" },
            { label: "Variance", value: "σ²", description: "Dispersion" },
            { label: "Corrélation", value: "r(X,Y)", description: "Relations" }
          ]}
          bgColor="bg-linear-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
        />
      </div>

      {/* Le saviez-vous */}
      <DidYouKnow
        items={[
          {
            title: "Histoire des mathématiques",
            content: "Une méthode de résolution de systèmes d'équations linéaires équivalente à l'élimination de Gauss figure dans les Neuf Chapitres sur l'art mathématique, texte chinois ancien (rédigé jusqu'au 1er siècle de notre ère, commenté par Liu Hui en 263)"
          },
          {
            title: "Calcul différentiel",
            content: "Le calcul différentiel a été développé par Newton et Leibniz au XVIIe siècle"
          },
          {
            title: "Probabilités",
            content: "La théorie des probabilités est née au XVIIe siècle de l'étude des jeux de hasard, notamment de la correspondance entre Pascal et Fermat en 1654 (Cardano avait déjà écrit sur les dés au XVIe siècle)"
          }
        ]}
      />

      {/* Approche pédagogique */}
      <Card className="bg-linear-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Lightbulb className="h-5 w-5 text-primary" />
            Approche pédagogique
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100/50 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-blue-200 dark:border-blue-800">
                <span className="text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Intuition d'abord</h4>
              <p className="text-sm text-muted-foreground">
                Comprendre le "pourquoi" avant le "comment"
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100/50 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-200 dark:border-green-800">
                <span className="text-xl font-bold text-green-700 dark:text-green-400">2</span>
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Visualisation</h4>
              <p className="text-sm text-muted-foreground">
                Des graphiques et animations pour "voir" les maths
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100/50 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3 border border-purple-200 dark:border-purple-800">
                <span className="text-xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h4 className="font-semibold mb-2 text-foreground">Applications concrètes</h4>
              <p className="text-sm text-muted-foreground">
                Voir comment ces maths sont utilisées en pratique
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MathIntroductionSection;
