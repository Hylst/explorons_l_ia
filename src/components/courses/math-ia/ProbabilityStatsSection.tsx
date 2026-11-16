// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, Dice6, AlertCircle } from 'lucide-react';
import InteractiveExample from '../InteractiveExample';
import MathematicalFormula from './MathematicalFormula';
import ConceptIllustration from './ConceptIllustration';
import PracticalExercise from './PracticalExercise';

const ProbabilityStatsSection: React.FC = () => {
  const [diceRolls, setDiceRolls] = useState(100);
  const [confidenceLevel, setConfidenceLevel] = useState([95]);
  
  // Simulation simple de lancers de dés
  const simulateDiceRolls = (n: number) => {
    const results = new Array(6).fill(0);
    for (let i = 0; i < n; i++) {
      const roll = Math.floor(Math.random() * 6);
      results[roll]++;
    }
    return results.map(count => (count / n) * 100);
  };

  const [diceResults, setDiceResults] = useState(simulateDiceRolls(100));
  // Nombre de lancers de la dernière simulation : les effectifs affichés ne doivent pas suivre le curseur.
  const [simulatedRolls, setSimulatedRolls] = useState(100);

  const updateSimulation = () => {
    setDiceResults(simulateDiceRolls(diceRolls));
    setSimulatedRolls(diceRolls);
  };

  const exercises = [
    {
      question: "Un email contient 'GRATUIT'. Si 2% des emails sont des spams, 80% des spams contiennent 'GRATUIT', et 5% des emails normaux contiennent 'GRATUIT', quelle est la probabilité que ce soit un spam\u00A0?",
      options: ["95\u00A0%", "80\u00A0%", "25\u00A0%", "2\u00A0%"],
      correctAnswer: 2,
      explanation: "Avec le théorème de Bayes\u00A0: P(Spam|GRATUIT) ≈ 25%. Même si 'GRATUIT' apparaît souvent dans les spams, comme les spams sont rares, la plupart des emails avec 'GRATUIT' restent légitimes."
    },
    {
      question: "Que mesure l'écart-type\u00A0?",
      options: [
        "La moyenne des données",
        "La valeur la plus fréquente",
        "La dispersion des données",
        "La corrélation entre variables"
      ],
      correctAnswer: 2,
      explanation: "L'écart-type mesure à quel point les données sont dispersées autour de la moyenne."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-l-4 border-l-orange-500 bg-linear-to-r from-orange-50/50 to-amber-50/50 dark:from-orange-950/20 dark:to-amber-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="h-5 w-5 text-orange-500" />
            Probabilités et Statistiques : Naviguer dans l'Incertitude
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-4 text-foreground">
            Le monde réel est plein d'incertitude. Les probabilités et statistiques donnent à l'IA 
            les outils pour prendre des décisions intelligentes même quand l'information est incomplète.
          </p>
          
          <div className="bg-orange-100/50 dark:bg-orange-900/30 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">🎲 Analogie du Médecin</h4>
            <p className="text-orange-700 dark:text-orange-300">
              Un médecin doit souvent raisonner en probabilités : un symptôme n'implique pas à lui seul un diagnostic.
              "D'après vos symptômes, il y a 80 % de chances que ce soit une grippe, 15 % un rhume, 5 % autre chose."
              L'IA raisonne de la même façon !
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Formules mathématiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MathematicalFormula
          title="Théorème de Bayes"
          formula="P(A|B) = P(B|A) × P(A) / P(B)"
          explanation="Permet de 'retourner' les probabilités conditionnelles"
          example="P(Spam|'GRATUIT') = P('GRATUIT'|Spam) × P(Spam) / P('GRATUIT')"
          type="primary"
        />
        
        <MathematicalFormula
          title="Espérance et Variance"
          formula="E[X] = Σ xi × P(xi), Var(X) = E[(X-μ)²]"
          explanation="Mesures centrales de tendance et de dispersion"
          example="Pour un dé : E[X] = 3,5 ; Var(X) = 2,92"
          type="secondary"
        />
      </div>

      {/* Concepts fondamentaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConceptIllustration
          icon={Dice6}
          title="Les Probabilités : Quantifier l'Incertain"
          description="Une probabilité est un nombre entre 0 et 1 qui mesure nos chances qu'un événement se produise."
          examples={[
            { label: "Météo", value: "P(Pluie) = 0,7", description: "70 % de chances de pluie" },
            { label: "Email", value: "P(Spam) = 0,95", description: "95 % de chances que ce soit un spam" },
            { label: "Photo", value: "P(Chat) = 0,88", description: "88 % de chances que ce soit un chat" }
          ]}
          bgColor="bg-linear-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20"
        />

        <ConceptIllustration
          icon={BarChart3}
          title="Les Statistiques : Apprendre des Données"
          description="Les statistiques transforment des données brutes en informations utilisables."
          examples={[
            { label: "Moyenne", value: "μ = Σxi/n", description: "La valeur 'typique'" },
            { label: "Médiane", value: "Q2", description: "La valeur du 'milieu'" },
            { label: "Écart-type", value: "σ = √Var(X)", description: "Mesure de dispersion" }
          ]}
          bgColor="bg-linear-to-br from-green-50/50 to-teal-50/50 dark:from-green-950/20 dark:to-teal-950/20"
        />
      </div>

      {/* Simulation interactive */}
      <Card className="bg-card/50 dark:bg-card/50 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg text-foreground">Simulation : Loi des Grands Nombres</CardTitle>
          <p className="text-sm text-muted-foreground">
            Découvrez comment les probabilités convergent avec de nombreux essais
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">Nombre de lancers : {diceRolls}</label>
              <Slider
                aria-label="Nombre de lancers"
                value={[diceRolls]}
                onValueChange={(value) => setDiceRolls(value[0])}
                max={10000}
                min={10}
                step={10}
                className="mt-2"
              />
            </div>
            
            <Button onClick={updateSimulation} className="w-full">
              Lancer les dés !
            </Button>
            
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
              {diceResults.map((percentage, index) => (
                <div key={index} className="bg-muted/30 dark:bg-muted/20 p-2 sm:p-3 rounded text-center border border-border/50">
                  <div className="text-lg font-bold text-foreground">{index + 1}</div>
                  <div className="text-sm text-muted-foreground whitespace-nowrap">{percentage.toFixed(1).replace('.', ',')}{'\u00A0'}%</div>
                  <div className="text-xs text-muted-foreground">({Math.round(percentage * simulatedRolls / 100)})</div>
                </div>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Théorique : 16,67 % pour chaque face
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Exemple interactif */}
      <InteractiveExample 
        title="Simulation : Loi des Grands Nombres"
        description="Découvrez comment les probabilités se comportent avec de nombreux essais"
        steps={[
          {
            title: "Faible nombre d'essais",
            description: "Avec peu de lancers, les résultats sont très aléatoires et éloignés de la théorie"
          },
          {
            title: "Nombre modéré d'essais",
            description: "On commence à voir une tendance vers les valeurs théoriques"
          },
          {
            title: "Grand nombre d'essais",
            description: "Les résultats convergent vers 16,67\u00A0% pour chaque face du dé"
          }
        ]}
        finalMessage="Plus on fait d'essais, plus on se rapproche de la probabilité théorique ! C'est la loi des grands nombres."
      />

      {/* Théorème de Bayes */}
      <Card className="bg-linear-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 dark:text-blue-200">
            🧠 Le Théorème de Bayes : Le Cœur de l'IA Probabiliste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground">
            Le théorème de Bayes permet de "retourner" les probabilités et est au cœur de nombreux algorithmes d'IA.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50">
              <h5 className="font-semibold mb-2 text-foreground">Exemple : Diagnostic Médical</h5>
              <ul className="text-sm space-y-1 text-foreground">
                <li><strong>Question :</strong> "J'ai de la fièvre, quelle est la probabilité que j'aie la grippe ?"</li>
                <li><strong>Bayes dit :</strong> Ça dépend de combien de personnes ont la grippe actuellement !</li>
                <li><strong>Formule :</strong> P(Grippe|Fièvre) = P(Fièvre|Grippe) × P(Grippe) / P(Fièvre)</li>
              </ul>
            </div>
            
            <div className="bg-card/50 dark:bg-card/30 p-4 rounded-lg border border-border/50">
              <h5 className="font-semibold mb-2 text-foreground">En IA :</h5>
              <ul className="text-sm space-y-1 text-foreground">
                <li>🔍 <strong>Classification :</strong> "Cet email est-il un spam ?"</li>
                <li>🤖 <strong>Reconnaissance :</strong> "Cette image contient-elle un chat ?"</li>
                <li>🎯 <strong>Recommandation :</strong> "Cet utilisateur aimera-t-il ce film ?"</li>
                <li>📊 <strong>Prédiction :</strong> "Le cours de cette action va-t-il monter ?"</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercice pratique */}
      <PracticalExercise
        title="Quiz : Probabilités et Statistiques"
        description="Testez votre compréhension avec ces exercices pratiques"
        steps={exercises}
      />

      {/* Applications en IA */}
      <Card className="bg-linear-to-r from-green-50/50 to-yellow-50/50 dark:from-green-950/20 dark:to-yellow-950/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-lg text-green-800 dark:text-green-200">
            Applications en IA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h5 className="font-semibold text-foreground">Classification Bayésienne</h5>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Filtre anti-spam, analyse de sentiment, diagnostic médical
              </p>
              <p className="text-xs bg-red-100/50 dark:bg-red-900/30 p-2 rounded border border-red-200 dark:border-red-800 text-foreground">
                La méthode bayésienne a été popularisée pour filtrer le spam au début des années 2000, notamment par Paul Graham (2002)
              </p>
            </div>
            
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h5 className="font-semibold text-foreground">Réseaux Bayésiens</h5>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Modéliser des relations causales complexes avec incertitude
              </p>
              <p className="text-xs bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded border border-blue-200 dark:border-blue-800 text-foreground">
                Voiture autonome : probabilité d'accident selon météo, trafic, etc.
              </p>
            </div>
            
            <div className="p-4 bg-card/50 dark:bg-card/30 rounded-lg border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="h-5 w-5 text-green-700 dark:text-green-400" />
                <h5 className="font-semibold text-foreground">Apprentissage par Renforcement</h5>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                L'agent apprend dans un environnement incertain
              </p>
              <p className="text-xs bg-green-100/50 dark:bg-green-900/30 p-2 rounded border border-green-200 dark:border-green-800 text-foreground">
                AlphaGo estime, avec des réseaux de neurones, les coups prometteurs et la probabilité de victoire d'une position
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProbabilityStatsSection;
