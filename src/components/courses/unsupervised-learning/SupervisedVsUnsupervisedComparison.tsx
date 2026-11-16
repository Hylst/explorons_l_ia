// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

const SupervisedVsUnsupervisedComparison: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'supervised' | 'unsupervised'>('supervised');

  const comparisons = {
    supervised: {
      title: "Apprentissage supervisé",
      icon: <Eye className="h-5 w-5" />,
      color: "bg-blue-100 border-blue-300 text-blue-800 dark:text-blue-200 dark:bg-blue-900/40 dark:border-blue-700",
      description: "Apprend à partir d'exemples étiquetés",
      examples: [
        { input: "Photo d'un chat", output: "Label: 'Chat'" },
        { input: "Email spam", output: "Label: 'Spam'" },
        { input: "Prix maison", output: "Étiquette\u00A0: '250\u00A0000\u00A0€'" }
      ],
      advantages: [
        "Résultats mesurables avec des métriques claires",
        "Facile à évaluer la performance",
        "Prédictions évaluables sur des données nouvelles"
      ],
      challenges: [
        "Nécessite beaucoup de données étiquetées",
        "Coût élevé de préparation des données",
        "Biais possible dans les étiquettes"
      ]
    },
    unsupervised: {
      title: "Apprentissage Non Supervisé",
      icon: <EyeOff className="h-5 w-5" />,
      color: "bg-green-100 border-green-300 text-green-800 dark:text-green-200 dark:bg-green-900/40 dark:border-green-700",
      description: "Répère des groupes et des régularités sans étiquettes",
      examples: [
        { input: "Données clients", output: "Groupes: 'Jeunes urbains', 'Familles'" },
        { input: "Comportements web", output: "Régularités : 'Navigation matinale'" },
        { input: "Données marketing", output: "Associations: 'Pain → Lait'" }
      ],
      advantages: [
        "Pas besoin de données étiquetées",
        "Découverte de régularités inattendues",
        "Exploration libre des données"
      ],
      challenges: [
        "Difficile d'évaluer les résultats",
        "Interprétation subjective",
        "Pas de 'vérité terrain'"
      ]
    }
  };

  const currentComparison = comparisons[activeTab];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 justify-center mb-6">
        <Button
          variant={activeTab === 'supervised' ? 'default' : 'outline'}
          onClick={() => setActiveTab('supervised')}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          Supervisé
        </Button>
        <Button
          variant={activeTab === 'unsupervised' ? 'default' : 'outline'}
          onClick={() => setActiveTab('unsupervised')}
          className="flex items-center gap-2"
        >
          <EyeOff className="h-4 w-4" />
          Non Supervisé
        </Button>
      </div>

      <Card className="transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge className={currentComparison.color}>
              {currentComparison.icon}
              {currentComparison.title}
            </Badge>
          </CardTitle>
          <p className="text-muted-foreground">{currentComparison.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Exemples */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              Exemples concrets
            </h4>
            <div className="grid gap-3">
              {currentComparison.examples.map((example, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium">{example.input}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <span className="text-sm">{example.output}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Avantages et Défis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-700 dark:text-green-400">
                <CheckCircle className="h-4 w-4" />
                Avantages
              </h4>
              <ul className="space-y-2">
                {currentComparison.advantages.map((advantage, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 shrink-0" />
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <XCircle className="h-4 w-4" />
                Défis
              </h4>
              <ul className="space-y-2">
                {currentComparison.challenges.map((challenge, index) => (
                  <li key={index} className="text-sm flex items-start gap-2">
                    <XCircle className="h-3 w-3 text-orange-500 mt-0.5 shrink-0" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
          💡 Conseil pratique
        </h4>
        <p className="text-blue-700 dark:text-blue-300 text-sm">
          {activeTab === 'supervised' 
            ? "L'apprentissage supervisé convient quand vous avez un objectif précis et des données étiquetées. Utilisez-le pour la classification, la régression et la prédiction."
            : "L'apprentissage non supervisé sert surtout à l'exploration de données. Utilisez-le pour découvrir des segments de clients, réduire la complexité des données, ou identifier des comportements inhabituels."
          }
        </p>
      </div>
    </div>
  );
};

export default SupervisedVsUnsupervisedComparison;
