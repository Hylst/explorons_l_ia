// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { TrendingUp, TrendingDown, Target, Zap } from 'lucide-react';
import InteractiveExample from '../InteractiveExample';
import DidYouKnow from '../DidYouKnow';
import MathematicalFormula from './MathematicalFormula';
import ConceptIllustration from './ConceptIllustration';
import PracticalExercise from './PracticalExercise';

const CalculusSection: React.FC = () => {
  const [xValue, setXValue] = useState([2]);
  
  // Fonction exemple : f(x) = x² - 4x + 3
  const f = (x: number) => x * x - 4 * x + 3;
  const derivative = (x: number) => 2 * x - 4;
  
  const currentY = f(xValue[0]);
  const currentSlope = derivative(xValue[0]);

  const exercises = [
    {
      question: "Si f(x) = x², que vaut f'(x)\u00A0?",
      options: ["x", "2x", "x²", "2"],
      correctAnswer: 1,
      explanation: "La dérivée de x² est 2x. C'est une règle fondamentale du calcul différentiel."
    },
    {
      question: "Que signifie une dérivée négative\u00A0?",
      options: [
        "La fonction est croissante",
        "La fonction est décroissante", 
        "La fonction est constante",
        "La fonction est nulle"
      ],
      correctAnswer: 1,
      explanation: "Une dérivée négative indique que la fonction diminue en ce point."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-l-4 border-l-green-500 bg-linear-to-r from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <TrendingUp className="h-5 w-5 text-green-500" />
            Le Calcul Différentiel : Le Moteur de l'Apprentissage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-4 text-foreground">
            Si l'algèbre linéaire est le langage de l'IA, le calcul différentiel est son moteur d'apprentissage. 
            Il permet à l'IA de s'améliorer progressivement en "sentant" dans quelle direction aller.
          </p>
          
          <div className="bg-green-100/50 dark:bg-green-900/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">🎯 Analogie du GPS</h4>
            <p className="text-green-700 dark:text-green-300">
              Imaginez que vous conduisez dans le brouillard. Vous ne voyez que quelques mètres devant vous, 
              mais votre GPS vous dit "tournez légèrement à droite" ou "continuez tout droit". 
              C'est exactement ce que fait la dérivée : elle indique la direction à suivre pour s'améliorer !
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Formules mathématiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MathematicalFormula
          title="Dérivée d'une Fonction"
          formula="f'(x) = lim[h→0] (f(x+h) - f(x))/h"
          explanation="La dérivée mesure le taux de variation instantané"
          example="Si f(x) = x², alors f'(x) = 2x"
          type="primary"
        />
        
        <MathematicalFormula
          title="Règle de Dérivation en Chaîne"
          formula="(f∘g)'(x) = f'(g(x)) × g'(x)"
          explanation="Pour dériver une fonction composée"
          example="Si h(x) = (x²+1)³, alors h'(x) = 3(x²+1)² × 2x"
          type="secondary"
        />
      </div>

      {/* Concepts fondamentaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptIllustration
          icon={TrendingUp}
          title="La Dérivée : La Direction du Changement"
          description="La dérivée nous dit si une fonction monte, descend, et à quelle vitesse."
          examples={[
            { label: "f'(x) > 0", value: "↗", description: "Fonction croissante" },
            { label: "f'(x) < 0", value: "↘", description: "Fonction décroissante" },
            { label: "f'(x) = 0", value: "→", description: "Point critique" }
          ]}
          bgColor="bg-linear-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20"
        />

        <ConceptIllustration
          icon={Zap}
          title="La Descente de Gradient"
          description="L'algorithme qu'utilise l'IA pour apprendre en suivant la pente."
          examples={[
            { label: "Étape 1", value: "Calculer l'erreur", description: "Mesurer la performance" },
            { label: "Étape 2", value: "Calculer ∇f", description: "Trouver la direction" },
            { label: "Étape 3", value: "x := x - α∇f", description: "Faire un pas" }
          ]}
          bgColor="bg-linear-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20"
        />
      </div>

      {/* Visualisation interactive */}
      <Card className="bg-card/50 dark:bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Explorateur interactif de fonction</CardTitle>
          <p className="text-sm text-muted-foreground">
            Fonction : f(x) = x² - 4x + 3 | Dérivée : f'(x) = 2x - 4
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Valeur de x : {xValue[0]}</label>
              <Slider
                aria-label="Valeur de x"
                value={xValue}
                onValueChange={setXValue}
                max={5}
                min={-1}
                step={0.1}
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-100/50 dark:bg-blue-900/30 p-3 rounded border border-blue-200 dark:border-blue-800">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">f({xValue[0]}) =</h5>
                <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{currentY.toFixed(2)}</p>
              </div>
              
              <div className="bg-green-100/50 dark:bg-green-900/30 p-3 rounded border border-green-200 dark:border-green-800">
                <h5 className="font-medium text-green-800 dark:text-green-200">f'({xValue[0]}) =</h5>
                <p className="text-lg font-bold text-green-900 dark:text-green-100">{currentSlope.toFixed(2)}</p>
              </div>
              
              <div className="bg-purple-100/50 dark:bg-purple-900/30 p-3 rounded border border-purple-200 dark:border-purple-800">
                <h5 className="font-medium text-purple-800 dark:text-purple-200">Tendance</h5>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">
                  {currentSlope > 0.1 ? "↗ Croissant" : currentSlope < -0.1 ? "↘ Décroissant" : "→ Stable"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exemple interactif */}
      <InteractiveExample 
        title="Explorer une Fonction et sa Dérivée"
        description="Manipulez les paramètres pour voir comment la dérivée indique la direction du changement"
        steps={[
          {
            title: "Observer la fonction",
            description: "f(x) = x² - 4x + 3 est une parabole avec un minimum en x = 2"
          },
          {
            title: "Calculer la dérivée",
            description: "f'(x) = 2x - 4 nous donne la pente en chaque point"
          },
          {
            title: "Identifier les points critiques",
            description: "Quand f'(x) = 0, on a x = 2 (le minimum de la fonction)"
          }
        ]}
        finalMessage="La dérivée est l'outil fondamental qui permet à l'IA d'apprendre : elle indique comment l'erreur varie, et on ajuste les paramètres dans le sens qui la fait baisser."
      />

      {/* Le saviez-vous */}
      <DidYouKnow
        items={[
          {
            title: "Réseaux de neurones modernes",
            content: "Un réseau de neurones moderne peut avoir des milliards de paramètres à optimiser\u00A0!"
          },
          {
            title: "Rétropropagation",
            content: "La rétropropagation utilise la règle de dérivation en chaîne pour calculer tous les gradients"
          },
          {
            title: "Optimiseur Adam",
            content: "Adam, un optimiseur très utilisé, combine gradient, momentum et taux d'apprentissage adaptatif pour accélérer l'apprentissage"
          }
        ]}
      />

      {/* Exercice pratique */}
      <PracticalExercise
        title="Quiz : les dérivées"
        description="Testez votre compréhension du calcul différentiel"
        steps={exercises}
      />

      {/* Applications pratiques */}
      <Card className="bg-linear-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800 dark:text-purple-200">
            🚀 Applications Concrètes en IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <h5 className="font-semibold mb-2 text-foreground">Reconnaissance d'Images</h5>
              <p className="text-sm text-muted-foreground mb-2">
                Un réseau voit une photo de chat et prédit "chien". La dérivée lui montre comment ajuster 
                ses millions de paramètres pour mieux reconnaître les chats.
              </p>
              <div className="text-xs bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded border border-blue-200 dark:border-blue-800 text-foreground">
                Gradient → Ajustement → Amélioration
              </div>
            </div>
            
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <h5 className="font-semibold mb-2 text-foreground">Traduction Automatique</h5>
              <p className="text-sm text-muted-foreground mb-2">
                Le modèle traduit mal une phrase. La descente de gradient optimise les poids pour 
                produire de meilleures traductions.
              </p>
              <div className="text-xs bg-green-100/50 dark:bg-green-900/30 p-2 rounded border border-green-200 dark:border-green-800 text-foreground">
                Erreur → Gradient → Correction
              </div>
            </div>
            
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <h5 className="font-semibold mb-2 text-foreground">Jeux de stratégie (IA)</h5>
              <p className="text-sm text-muted-foreground mb-2">
                Une IA apprend à jouer aux échecs. Chaque partie, gagnée ou perdue, peut produire des gradients qui 
                améliorent sa stratégie.
              </p>
              <div className="text-xs bg-purple-100/50 dark:bg-purple-900/30 p-2 rounded border border-purple-200 dark:border-purple-800 text-foreground">
                Partie → Analyse → Progression
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalculusSection;
