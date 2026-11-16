// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, Brain, TrendingUp, TreePine, Network } from 'lucide-react';
import SimulationNotice from '@/components/common/SimulationNotice';

interface AlgorithmStep {
  id: string;
  title: string;
  description: string;
  visualization: string;
  complexity: 'Faible' | 'Moyenne' | 'Élevée';
  dataRequirement: 'Peu' | 'Modéré' | 'Beaucoup';
}

const algorithms: Record<string, AlgorithmStep[]> = {
  'regression-lineaire': [
    {
      id: 'step1',
      title: 'Initialisation',
      description: 'Création d\'une ligne aléatoire dans l\'espace des données (principe de la descente de gradient\u00A0; une solution directe par moindres carrés existe aussi)',
      visualization: 'Ligne droite traversant les points de données',
      complexity: 'Faible',
      dataRequirement: 'Peu'
    },
    {
      id: 'step2', 
      title: 'Calcul de l\'erreur',
      description: 'Mesure de la distance entre les points et la ligne',
      visualization: 'Lignes verticales montrant les erreurs',
      complexity: 'Faible',
      dataRequirement: 'Peu'
    },
    {
      id: 'step3',
      title: 'Ajustement',
      description: 'Modification de la pente et de l\'ordonnée pour réduire l\'erreur',
      visualization: 'Animation de la ligne qui se déplace',
      complexity: 'Faible',
      dataRequirement: 'Peu'
    },
    {
      id: 'step4',
      title: 'Convergence',
      description: 'La ligne trouve sa position optimale',
      visualization: 'Ligne stable au meilleur emplacement',
      complexity: 'Faible',
      dataRequirement: 'Peu'
    }
  ],
  'arbre-decision': [
    {
      id: 'step1',
      title: 'Racine',
      description: 'Choix de la première question la plus discriminante',
      visualization: 'Nœud racine avec la meilleure question',
      complexity: 'Moyenne',
      dataRequirement: 'Modéré'
    },
    {
      id: 'step2',
      title: 'Division',
      description: 'Séparation des données selon la réponse',
      visualization: 'Branches gauche et droite avec sous-groupes',
      complexity: 'Moyenne',
      dataRequirement: 'Modéré'
    },
    {
      id: 'step3',
      title: 'Récursion',
      description: 'Répétition du processus sur chaque branche',
      visualization: 'Arbre qui grandit avec nouvelles questions',
      complexity: 'Moyenne',
      dataRequirement: 'Modéré'
    },
    {
      id: 'step4',
      title: 'Élagage',
      description: 'Suppression des branches trop spécifiques',
      visualization: 'Arbre simplifié avec branches essentielles',
      complexity: 'Moyenne',
      dataRequirement: 'Modéré'
    }
  ],
  'reseau-neurones': [
    {
      id: 'step1',
      title: 'Initialisation',
      description: 'Poids aléatoires dans le réseau',
      visualization: 'Réseau avec connexions colorées aléatoirement',
      complexity: 'Élevée',
      dataRequirement: 'Beaucoup'
    },
    {
      id: 'step2',
      title: 'Propagation avant',
      description: 'Les données traversent le réseau',
      visualization: 'Animation des signaux traversant les couches',
      complexity: 'Élevée',
      dataRequirement: 'Beaucoup'
    },
    {
      id: 'step3',
      title: 'Rétropropagation',
      description: 'Calcul de la contribution de chaque poids à l\'erreur, de la sortie vers l\'entrée',
      visualization: 'Signaux d\'erreur remontant le réseau',
      complexity: 'Élevée',
      dataRequirement: 'Beaucoup'
    },
    {
      id: 'step4',
      title: 'Optimisation',
      description: 'Mise à jour des poids dans le sens qui réduit l\'erreur, puis nouvelle itération',
      visualization: 'Poids ajustés un peu à chaque itération',
      complexity: 'Élevée',
      dataRequirement: 'Beaucoup'
    }
  ]
};

const AlgorithmInteractiveSchema: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('regression-lineaire');
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const stopPlaying = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  };

  // Ne laisse pas tourner le défilement après avoir quitté la page.
  useEffect(() => () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  }, []);

  const currentAlgorithmSteps = algorithms[selectedAlgorithm];
  const currentStepData = currentAlgorithmSteps[currentStep];
  const progress = Math.round(((currentStep + 1) / currentAlgorithmSteps.length) * 100);

  const algorithmIcons: Record<string, React.ReactNode> = {
    'regression-lineaire': <TrendingUp className="h-5 w-5" />,
    'arbre-decision': <TreePine className="h-5 w-5" />,
    'reseau-neurones': <Network className="h-5 w-5" />
  };

  const algorithmNames: Record<string, string> = {
    'regression-lineaire': 'Régression Linéaire',
    'arbre-decision': 'Arbre de Décision',
    'reseau-neurones': 'Réseau de Neurones'
  };

  const handlePlay = () => {
    if (isPlaying) {
      stopPlaying();
      return;
    }

    setIsPlaying(true);
    const lastStep = currentAlgorithmSteps.length - 1;
    intervalRef.current = window.setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= lastStep) {
          stopPlaying();
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const handleReset = () => {
    setCurrentStep(0);
    stopPlaying();
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Faible': return 'bg-green-500';
      case 'Moyenne': return 'bg-yellow-500';
      case 'Élevée': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getDataColor = (data: string) => {
    switch (data) {
      case 'Peu': return 'bg-green-500';
      case 'Modéré': return 'bg-yellow-500';
      case 'Beaucoup': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl leading-snug sm:text-2xl">
          <Brain className="h-6 w-6 text-primary" />
          Trois algorithmes clés, étape par étape
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Découvrez comment fonctionnent les algorithmes d'apprentissage supervisé étape par étape
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
        <SimulationNotice>
          Ce schéma décrit le principe de chaque algorithme : aucun calcul réel n'est exécuté ici. Les niveaux de
          complexité et de données requises sont indicatifs.
        </SimulationNotice>

        {/* Sélecteur d'algorithme */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(algorithmNames).map(([key, name]) => (
            <Button
              key={key}
              variant={selectedAlgorithm === key ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedAlgorithm(key);
                setCurrentStep(0);
                stopPlaying();
              }}
              className="flex items-center gap-2"
            >
              {algorithmIcons[key]}
              {name}
            </Button>
          ))}
        </div>

        {/* Contrôles */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4">
          <Button
            onClick={handlePlay}
            size="sm"
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Démarrer'}
          </Button>
          <Button onClick={handleReset} size="sm" variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Réinitialiser
          </Button>
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            Étape {currentStep + 1} / {currentAlgorithmSteps.length}
          </div>
        </div>

        {/* Progression */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Avancement dans le processus</span>
            <span className="text-sm text-muted-foreground">{progress} %</span>
          </div>
          <Progress value={progress} className="h-2" aria-label="Avancement dans le processus" />
        </div>

        {/* Étape actuelle */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 sm:p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="shrink-0 whitespace-nowrap">Étape {currentStep + 1}</Badge>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                {currentStepData.title}
              </h3>
            </div>
            
            <p className="text-blue-700 dark:text-blue-300">
              {currentStepData.description}
            </p>
            
            <div className="bg-white dark:bg-blue-900/50 p-4 rounded border border-blue-200 dark:border-blue-700">
              <div className="flex items-start gap-2 text-sm text-blue-600 dark:text-blue-400">
                <div className="w-3 h-3 mt-1 shrink-0 bg-blue-500 rounded-full"></div>
                <span><strong>Visualisation :</strong> {currentStepData.visualization}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Caractéristiques de l'algorithme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Complexité</span>
              <div className={`w-3 h-3 rounded-full ${getComplexityColor(currentStepData.complexity)}`}></div>
            </div>
            <div className="text-lg font-semibold">{currentStepData.complexity}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Données Requises</span>
              <div className={`w-3 h-3 rounded-full ${getDataColor(currentStepData.dataRequirement)}`}></div>
            </div>
            <div className="text-lg font-semibold">{currentStepData.dataRequirement}</div>
          </div>
          
          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Avancement</span>
              <div className="w-3 h-3 bg-primary rounded-full"></div>
            </div>
            <div className="text-lg font-semibold">Étape {currentStep + 1} sur {currentAlgorithmSteps.length}</div>
          </div>
        </div>

        {/* Timeline des étapes */}
        <div className="space-y-2">
          <h4 className="font-medium">Timeline du processus :</h4>
          <div role="group" aria-label="Étapes du processus" className="flex flex-wrap items-center gap-2">
            {currentAlgorithmSteps.map((step, index) => (
              <div
                key={step.id}
                className={`max-w-full flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-colors ${
                  index === currentStep 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : index < currentStep 
                      ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800' 
                      : 'bg-gray-50 border-gray-200 dark:bg-gray-900/50 dark:border-gray-700'
                }`}
                onClick={() => setCurrentStep(index)}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  index === currentStep 
                    ? 'bg-primary-foreground text-primary' 
                    : index < currentStep 
                      ? 'bg-green-700 text-white' 
                      : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm font-medium">{step.title}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlgorithmInteractiveSchema;
