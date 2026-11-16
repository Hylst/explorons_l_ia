// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Target, Zap, TrendingDown, RotateCcw } from 'lucide-react';
import InteractiveExample from '../InteractiveExample';
import DidYouKnow from '../DidYouKnow';
import MathematicalFormula from './MathematicalFormula';
import ConceptIllustration from './ConceptIllustration';
import PracticalExercise from './PracticalExercise';

const OptimizationSection: React.FC = () => {
  const [learningRate, setLearningRate] = useState([0.1]);
  const [currentPosition, setCurrentPosition] = useState(4);
  const [iteration, setIteration] = useState(0);
  const [history, setHistory] = useState<Array<{x: number, y: number}>>([]);
  
  // Fonction à optimiser : f(x) = (x-2)² + 1
  const f = (x: number) => Math.pow(x - 2, 2) + 1;
  const derivative = (x: number) => 2 * (x - 2);
  
  const step = () => {
    const grad = derivative(currentPosition);
    const newPosition = currentPosition - learningRate[0] * grad;
    const newY = f(newPosition);
    
    setHistory(prev => [...prev, {x: currentPosition, y: f(currentPosition)}]);
    setCurrentPosition(newPosition);
    setIteration(prev => prev + 1);
  };

  const reset = () => {
    setCurrentPosition(4);
    setIteration(0);
    setHistory([]);
  };

  const exercises = [
    {
      question: "Que se passe-t-il si le learning rate est trop grand\u00A0?",
      options: [
        "L'algorithme converge plus vite",
        "L'algorithme oscille ou diverge",
        "L'algorithme s'arrête",
        "Rien de particulier"
      ],
      correctAnswer: 1,
      explanation: "Un learning rate trop grand fait que l'algorithme 'saute' par-dessus le minimum et peut diverger ou osciller."
    },
    {
      question: "Qu'est-ce qu'un minimum local\u00A0?",
      options: [
        "Le point le plus bas de toute la fonction",
        "Un point plus bas que ses voisins mais pas forcément le plus bas global",
        "Un point où la dérivée est positive", 
        "Le point de départ de l'algorithme"
      ],
      correctAnswer: 1,
      explanation: "Un minimum local est un point plus bas que ses voisins immédiats, mais il peut exister des points encore plus bas ailleurs dans la fonction."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-l-4 border-l-purple-500 bg-linear-to-r from-purple-50/50 to-indigo-50/50 dark:from-purple-950/20 dark:to-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Target className="h-5 w-5 text-purple-500" />
            Optimisation : trouver un optimum
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-4 text-foreground">
            L'optimisation consiste à chercher une valeur extrême d'une fonction, souvent un minimum d'erreur ou un maximum de performance.
            En IA, on cherche constamment à minimiser les erreurs ou maximiser les performances.
          </p>
          
          <div className="bg-purple-100/50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">🏔️ Analogie de l'Alpiniste</h4>
            <p className="text-purple-700 dark:text-purple-300">
              Imaginez un alpiniste dans le brouillard qui cherche le point le plus bas d'une vallée. 
              Il ne voit que ses pieds, mais il sent la pente. En suivant toujours la descente la plus raide, 
              il finira par atteindre un point bas, pas forcément le plus bas de la vallée ! C'est le principe de la descente de gradient.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Formules mathématiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MathematicalFormula
          title="Descente de Gradient"
          formula="x(n+1) = x(n) - α ∇f(x(n))"
          explanation="Mise à jour itérative vers le minimum"
          example="Si f(x) = x², x_{n+1} = x_n - α(2x_n)"
          type="primary"
        />
        
        <MathematicalFormula
          title="Taux d'apprentissage adaptatif (Adam)"
          formula="x_t = x_{t-1} - α m_t / (√v_t + ε)"
          explanation="Combine momentum et adaptation du learning rate (version simplifiée, sans la correction de biais de m_t et v_t)"
          example="m_t = β₁m_{t-1} + (1-β₁)g_t, v_t = β₂v_{t-1} + (1-β₂)g_t²"
          type="secondary"
        />
      </div>

      {/* Types d'optimisation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptIllustration
          icon={TrendingDown}
          title="Optimisation Locale vs Globale"
          description="Comprendre les différents types de minima"
          examples={[
            { label: "Minimum Global", value: "🎯", description: "Le point le plus bas de la fonction, rarement garanti en grande dimension" },
            { label: "Minimum Local", value: "⚠️", description: "Solution localement optimale" },
            { label: "Point Selle", value: "🏔️", description: "Ni minimum ni maximum" }
          ]}
          bgColor="bg-linear-to-br from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20"
        />

        <ConceptIllustration
          icon={Zap}
          title="Hyperparamètres d'Optimisation"
          description="Les réglages qui contrôlent l'apprentissage"
          examples={[
            { label: "Learning Rate", value: "α = 0.001", description: "Taille des pas" },
            { label: "Momentum", value: "β = 0.9", description: "Inertie du mouvement" },
            { label: "Batch Size", value: "B = 32", description: "Taille des lots de données" }
          ]}
          bgColor="bg-linear-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20"
        />
      </div>

      {/* Simulation interactive */}
      <Card className="bg-card/50 dark:bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Simulateur de Descente de Gradient</CardTitle>
          <p className="text-sm text-muted-foreground">
            Fonction : f(x) = (x-2)² + 1 | Minimum en x = 2
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Learning Rate : {learningRate[0]}</label>
              <Slider
                aria-label="Taux d'apprentissage"
                value={learningRate}
                onValueChange={setLearningRate}
                max={0.5}
                min={0.01}
                step={0.01}
                className="mt-2"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-100/50 dark:bg-blue-900/30 p-3 rounded border border-blue-200 dark:border-blue-800">
                <h5 className="font-medium text-blue-800 dark:text-blue-200">Position</h5>
                <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{currentPosition.toFixed(3)}</p>
              </div>
              
              <div className="bg-green-100/50 dark:bg-green-900/30 p-3 rounded border border-green-200 dark:border-green-800">
                <h5 className="font-medium text-green-800 dark:text-green-200">Valeur f(x)</h5>
                <p className="text-lg font-bold text-green-900 dark:text-green-100">{f(currentPosition).toFixed(3)}</p>
              </div>
              
              <div className="bg-purple-100/50 dark:bg-purple-900/30 p-3 rounded border border-purple-200 dark:border-purple-800">
                <h5 className="font-medium text-purple-800 dark:text-purple-200">Gradient</h5>
                <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{derivative(currentPosition).toFixed(3)}</p>
              </div>
              
              <div className="bg-orange-100/50 dark:bg-orange-900/30 p-3 rounded border border-orange-200 dark:border-orange-800">
                <h5 className="font-medium text-orange-800 dark:text-orange-200">Itération</h5>
                <p className="text-lg font-bold text-orange-900 dark:text-orange-100">{iteration}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={step} disabled={Math.abs(derivative(currentPosition)) < 0.001}>
                Un pas
              </Button>
              <Button onClick={reset} variant="outline">
                <RotateCcw className="h-4 w-4 mr-2" />
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exemple interactif */}
      <InteractiveExample 
        title="Simulation : Descente de Gradient en Action"
        description="Observez comment l'algorithme trouve le minimum d'une fonction"
        steps={[
          {
            title: "Position initiale",
            description: "On démarre loin du minimum optimal (x = 4 au lieu de x = 2)"
          },
          {
            title: "Calcul du gradient",
            description: "La dérivée nous indique dans quelle direction descendre"
          },
          {
            title: "Pas d'optimisation",
            description: "On fait un pas proportionnel au learning rate dans la direction opposée au gradient"
          },
          {
            title: "Convergence",
            description: "On répète jusqu'à atteindre le minimum (gradient ≈ 0)"
          }
        ]}
        finalMessage="Dans ce cas simple, l'algorithme converge vers le minimum global ; sur une fonction non convexe, il peut rester bloqué dans un minimum local."
      />

      {/* Le saviez-vous */}
      <DidYouKnow
        items={[
          {
            title: "GPT-3 et l'optimisation",
            content: "GPT-3 compte 175 milliards de paramètres (OpenAI, 2020)\u00A0: les ajuster revient à minimiser une fonction de coût dans un espace à 175 milliards de dimensions."
          },
          {
            title: "Descente de gradient stochastique",
            content: "La descente de gradient stochastique traite les données par petits lots pour accélérer l'apprentissage"
          },
          {
            title: "Réseaux antagonistes (GAN)",
            content: "Les GAN font s'optimiser deux réseaux l'un contre l'autre"
          }
        ]}
      />

      {/* Exercice pratique */}
      <PracticalExercise
        title="Quiz : l'optimisation"
        description="Testez votre compréhension des algorithmes d'optimisation"
        steps={exercises}
      />

      {/* Problèmes courants */}
      <Card className="bg-linear-to-r from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-lg text-red-800 dark:text-red-200">
            ⚠️ Problèmes Courants et Solutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-semibold text-foreground">🚨 Problèmes Fréquents</h5>
              
              <div className="bg-card/50 dark:bg-card/30 p-3 rounded-lg border border-border/50">
                <h6 className="font-medium text-red-700 dark:text-red-400">Explosion du Gradient</h6>
                <p className="text-sm text-muted-foreground">
                  Les gradients deviennent énormes, l'apprentissage diverge
                </p>
              </div>
              
              <div className="bg-card/50 dark:bg-card/30 p-3 rounded-lg border border-border/50">
                <h6 className="font-medium text-yellow-600 dark:text-yellow-400">Disparition du Gradient</h6>
                <p className="text-sm text-muted-foreground">
                  Les gradients deviennent minuscules, l'apprentissage s'arrête
                </p>
              </div>
              
              <div className="bg-card/50 dark:bg-card/30 p-3 rounded-lg border border-border/50">
                <h6 className="font-medium text-blue-600 dark:text-blue-400">Plateaux</h6>
                <p className="text-sm text-muted-foreground">
                  Zones plates où le gradient est presque nul
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-semibold text-foreground">✅ Solutions Modernes</h5>
              
              <div className="bg-card/50 dark:bg-card/30 p-3 rounded-lg border border-border/50">
                <h6 className="font-medium text-green-700 dark:text-green-400">Gradient Clipping</h6>
                <p className="text-sm text-muted-foreground">
                  Limiter la taille maximale des gradients
                </p>
              </div>
              
              <div className="bg-card/50 dark:bg-card/30 p-3 rounded-lg border border-border/50">
                <h6 className="font-medium text-green-700 dark:text-green-400">Normalisation</h6>
                <p className="text-sm text-muted-foreground">
                  Batch norm, layer norm pour stabiliser l'apprentissage
                </p>
              </div>
              
              <div className="bg-card/50 dark:bg-card/30 p-3 rounded-lg border border-border/50">
                <h6 className="font-medium text-green-700 dark:text-green-400">Architectures Modernes</h6>
                <p className="text-sm text-muted-foreground">
                  ResNet, Transformers avec connexions résiduelles
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptimizationSection;
