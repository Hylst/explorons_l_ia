// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Brain, Play, Pause, RotateCcw, Activity, Layers } from 'lucide-react';
import SimulationNotice from '@/components/common/SimulationNotice';
import ScrollHint from '@/components/common/ScrollHint';

/** Nombre d'itérations de l'animation avant qu'elle s'arrête d'elle-même. */
const MAX_STEPS = 60;

interface Neuron {
  id: string;
  layer: number;
  activation: number;
  isActive: boolean;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  isActive: boolean;
}

interface NetworkArchitecture {
  inputLayer: number;
  hiddenLayers: number[];
  outputLayer: number;
}

const NeuralNetworkVisualization: React.FC = () => {
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [epoch, setEpoch] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);
  const stepRef = useRef<number>(0);
  const [architecture, setArchitecture] = useState<NetworkArchitecture>({
    inputLayer: 4,
    hiddenLayers: [6, 4],
    outputLayer: 2
  });
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'forward' | 'backward' | 'update'>('forward');

  const inputFeatures = ['Âge', 'Salaire', 'Expérience', 'Dette'];
  const outputClasses = ['Rejeté', 'Approuvé'];

  const sampleInput = [0.7, 0.6, 0.8, 0.3]; // Valeurs normalisées

  const initializeNetwork = () => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];
    
    // Input layer
    for (let i = 0; i < architecture.inputLayer; i++) {
      newNeurons.push({
        id: `input-${i}`,
        layer: 0,
        activation: sampleInput[i] || Math.random(),
        isActive: false
      });
    }

    // Hidden layers
    architecture.hiddenLayers.forEach((size, layerIndex) => {
      for (let i = 0; i < size; i++) {
        newNeurons.push({
          id: `hidden-${layerIndex}-${i}`,
          layer: layerIndex + 1,
          activation: Math.random() * 0.5,
          isActive: false
        });
      }
    });

    // Output layer
    for (let i = 0; i < architecture.outputLayer; i++) {
      newNeurons.push({
        id: `output-${i}`,
        layer: architecture.hiddenLayers.length + 1,
        activation: Math.random() * 0.3,
        isActive: false
      });
    }

    // Create connections
    const layers = [architecture.inputLayer, ...architecture.hiddenLayers, architecture.outputLayer];
    
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerNeurons = newNeurons.filter(n => n.layer === l);
      const nextLayerNeurons = newNeurons.filter(n => n.layer === l + 1);
      
      currentLayerNeurons.forEach(from => {
        nextLayerNeurons.forEach(to => {
          newConnections.push({
            from: from.id,
            to: to.id,
            weight: (Math.random() - 0.5) * 2,
            isActive: false
          });
        });
      });
    }

    setNeurons(newNeurons);
    setConnections(newConnections);
  };

  const stopAnimation = () => {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsTraining(false);
  };

  const animateNetwork = (phase: 'forward' | 'backward' | 'update', step: number) => {
    const lastLayer = architecture.hiddenLayers.length + 1;
    const reach = step % (lastLayer + 1);
    setNeurons(prev => prev.map(neuron => ({
      ...neuron,
      isActive: phase === 'forward' ? neuron.layer <= reach : phase === 'backward' ? neuron.layer >= lastLayer - reach : false,
      activation: phase === 'update' ? Math.random() * 0.8 + 0.1 : neuron.activation
    })));

    setConnections(prev => prev.map(conn => ({
      ...conn,
      isActive: phase !== 'update' && Math.random() > 0.7,
      weight: phase === 'update' ? Math.max(-1, Math.min(1, conn.weight + (Math.random() - 0.5) * 0.3)) : conn.weight
    })));
  };

  const startTraining = () => {
    if (isTraining) {
      stopAnimation();
      return;
    }

    setIsTraining(true);
    setEpoch(0);
    stepRef.current = 0;

    intervalRef.current = window.setInterval(() => {
      stepRef.current += 1;
      const step = stepRef.current;
      setEpoch(step);

      // Les trois phases se répètent : propagation avant, rétropropagation, mise à jour.
      const phase = step % 3 === 1 ? 'forward' : step % 3 === 2 ? 'backward' : 'update';
      setCurrentPhase(phase);
      animateNetwork(phase, step);

      if (step >= MAX_STEPS) stopAnimation();
    }, 150);
  };

  const resetNetwork = () => {
    stopAnimation();
    setEpoch(0);
    setCurrentPhase('forward');
    initializeNetwork();
  };

  useEffect(() => {
    initializeNetwork();
  }, [architecture]);

  // Ne laisse pas tourner l'animation après avoir quitté la page.
  useEffect(() => () => {
    if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
  }, []);

  const getNeuronPosition = (neuron: Neuron, layerIndex: number, neuronIndex: number, totalInLayer: number) => {
    const x = 100 + layerIndex * 150;
    const startY = 50 + (300 - totalInLayer * 40) / 2;
    const y = startY + neuronIndex * 50;
    return { x, y };
  };

  const renderNetwork = () => {
    const layers = [architecture.inputLayer, ...architecture.hiddenLayers, architecture.outputLayer];
    
    return (
      <svg viewBox="0 0 700 400" className="h-auto w-full min-w-[700px] border rounded-lg bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        {/* Render connections */}
        {connections.map((conn, index) => {
          const fromNeuron = neurons.find(n => n.id === conn.from);
          const toNeuron = neurons.find(n => n.id === conn.to);
          
          if (!fromNeuron || !toNeuron) return null;

          const fromLayerNeurons = neurons.filter(n => n.layer === fromNeuron.layer);
          const toLayerNeurons = neurons.filter(n => n.layer === toNeuron.layer);
          
          const fromIndex = fromLayerNeurons.findIndex(n => n.id === fromNeuron.id);
          const toIndex = toLayerNeurons.findIndex(n => n.id === toNeuron.id);
          
          const fromPos = getNeuronPosition(fromNeuron, fromNeuron.layer, fromIndex, fromLayerNeurons.length);
          const toPos = getNeuronPosition(toNeuron, toNeuron.layer, toIndex, toLayerNeurons.length);

          return (
            <line
              key={index}
              x1={fromPos.x + 20}
              y1={fromPos.y + 15}
              x2={toPos.x}
              y2={toPos.y + 15}
              stroke={conn.isActive ? '#3B82F6' : '#E5E7EB'}
              strokeWidth={conn.isActive ? 3 : 1}
              opacity={Math.abs(conn.weight) * 0.5 + 0.3}
              className="transition-all duration-300"
            />
          );
        })}

        {/* Render neurons */}
        {layers.map((layerSize, layerIndex) => {
          const layerNeurons = neurons.filter(n => n.layer === layerIndex);
          
          return layerNeurons.map((neuron, neuronIndex) => {
            const pos = getNeuronPosition(neuron, layerIndex, neuronIndex, layerSize);
            const isInputLayer = layerIndex === 0;
            const isOutputLayer = layerIndex === layers.length - 1;
            
            return (
              <g key={neuron.id}>
                <circle
                  cx={pos.x + 10}
                  cy={pos.y + 15}
                  r="15"
                  fill={
                    neuron.isActive 
                      ? '#3B82F6' 
                      : isInputLayer 
                        ? '#10B981' 
                        : isOutputLayer 
                          ? '#F59E0B' 
                          : '#6B7280'
                  }
                  className="transition-all duration-300"
                  opacity={0.7 + neuron.activation * 0.3}
                />
                <text
                  x={pos.x + 10}
                  y={pos.y + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                >
                  {Math.round(neuron.activation * 100) / 100}
                </text>
                
                {/* Labels */}
                {isInputLayer && (
                  <text
                    x={pos.x - 10}
                    y={pos.y + 20}
                    textAnchor="end"
                    fontSize="12"
                    fill="#374151"
                    className="dark:fill-gray-300"
                  >
                    {inputFeatures[neuronIndex]}
                  </text>
                )}
                
                {isOutputLayer && (
                  <text
                    x={pos.x + 35}
                    y={pos.y + 20}
                    fontSize="12"
                    fill="#374151"
                    className="dark:fill-gray-300"
                  >
                    {outputClasses[neuronIndex]}
                  </text>
                )}
              </g>
            );
          });
        })}

        {/* Layer labels */}
        <text x="50" y="30" fontSize="14" fontWeight="bold" fill="#374151" className="dark:fill-gray-300">
          Entrée
        </text>
        <text x="200" y="30" fontSize="14" fontWeight="bold" fill="#374151" className="dark:fill-gray-300">
          Couches Cachées
        </text>
        <text x={100 + (layers.length - 1) * 150 - 20} y="30" fontSize="14" fontWeight="bold" fill="#374151" className="dark:fill-gray-300">
          Sortie
        </text>
      </svg>
    );
  };

  return (
    <Card className="border-primary/20">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl leading-snug sm:text-2xl">
          <Brain className="h-6 w-6 text-purple-600" aria-hidden="true" />
          Réseau de neurones : les étapes d'un entraînement
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Animation schématique des trois phases que répète un entraînement : propagation avant, rétropropagation et
          mise à jour des poids
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
        <SimulationNotice>
          Les valeurs affichées dans les neurones sont tirées au hasard pour illustrer le principe : aucun apprentissage
          réel n'a lieu ici. Pour de vraies courbes de perte et d'exactitude, utilisez le{' '}
          <Link to="/simulateur-ia" className="underline underline-offset-4">simulateur d'entraînement</Link>.
        </SimulationNotice>

        {/* Contrôles */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button
              onClick={startTraining}
              size="sm"
              className="flex items-center gap-2"
            >
              {isTraining ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              {isTraining ? "Arrêter l'animation" : "Lancer l'animation"}
            </Button>
            <Button
              onClick={resetNetwork}
              size="sm"
              variant="outline"
              disabled={isTraining}
            >
              <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
              Réinitialiser
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-sm font-medium">Neurones par couche cachée :</span>
              <span className="text-sm whitespace-nowrap">{architecture.hiddenLayers.join('-')}</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="space-y-1">
                <label className="text-xs" id="nn-layer-1">Couche 1 :</label>
                <Slider
                  aria-labelledby="nn-layer-1"
                  value={[architecture.hiddenLayers[0]]}
                  onValueChange={(value) => setArchitecture(prev => ({
                    ...prev,
                    hiddenLayers: [value[0], prev.hiddenLayers[1]]
                  }))}
                  max={8}
                  min={3}
                  step={1}
                  className="w-24"
                  disabled={isTraining}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs" id="nn-layer-2">Couche 2 :</label>
                <Slider
                  aria-labelledby="nn-layer-2"
                  value={[architecture.hiddenLayers[1]]}
                  onValueChange={(value) => setArchitecture(prev => ({
                    ...prev,
                    hiddenLayers: [prev.hiddenLayers[0], value[0]]
                  }))}
                  max={6}
                  min={2}
                  step={1}
                  className="w-24"
                  disabled={isTraining}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Étape en cours */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-medium">Étape</span>
            </div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{epoch}</div>
            <div className="text-xs text-muted-foreground">sur {MAX_STEPS}</div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="h-4 w-4 text-purple-600" aria-hidden="true" />
              <span className="text-sm font-medium">Phase</span>
            </div>
            <div className="text-lg font-bold text-purple-700 dark:text-purple-300">
              {currentPhase === 'forward' ? 'Propagation avant' :
               currentPhase === 'backward' ? 'Rétropropagation' :
               'Mise à jour'}
            </div>
          </div>
        </div>

        {/* Phase actuelle */}
        <div className="bg-linear-to-r from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <Badge variant="secondary">
              {currentPhase === 'forward' ? 'Propagation avant' :
               currentPhase === 'backward' ? 'Rétropropagation' :
               'Mise à jour'}
            </Badge>
            <h3 className="font-semibold text-purple-800 dark:text-purple-200">
              {currentPhase === 'forward' && 'Les données traversent le réseau'}
              {currentPhase === 'backward' && "Calcul des erreurs, de la sortie vers l'entrée"}
              {currentPhase === 'update' && 'Ajustement des poids'}
            </h3>
          </div>
          <p className="text-sm text-purple-700 dark:text-purple-300">
            {currentPhase === 'forward' && 'Chaque neurone calcule sa sortie à partir de ses entrées pondérées.'}
            {currentPhase === 'backward' && "L'erreur remonte depuis la sortie vers l'entrée pour savoir quels poids ajuster."}
            {currentPhase === 'update' && 'Les poids sont modifiés un peu, dans le sens qui réduit l\'erreur.'}
          </p>
        </div>

        {/* Visualisation du réseau */}
        <div>
          <h4 className="font-semibold mb-4 text-center">Architecture du réseau de neurones</h4>
          <div tabIndex={0} role="region" aria-label="Architecture du réseau" className="relative overflow-x-auto">
            {renderNetwork()}
          </div>
          <ScrollHint>Faites défiler horizontalement pour voir tout le réseau.</ScrollHint>
        </div>

        {/* Explications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-50 dark:bg-indigo-950/30 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
            <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-3">
              Comment ça marche
            </h4>
            <ul className="text-sm space-y-2 text-indigo-700 dark:text-indigo-300">
              <li>• <strong>Couche d'entrée :</strong> reçoit les données (âge, salaire, etc.)</li>
              <li>• <strong>Couches cachées :</strong> détectent des motifs de plus en plus abstraits</li>
              <li>• <strong>Couche de sortie :</strong> produit la décision finale</li>
              <li>• <strong>Connexions :</strong> chaque lien a un poids ajustable</li>
            </ul>
          </div>

          <div className="bg-pink-50 dark:bg-pink-950/30 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
            <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-3">
              Processus d'apprentissage
            </h4>
            <ul className="text-sm space-y-2 text-pink-700 dark:text-pink-300">
              <li>• <strong>1. Propagation avant :</strong> données, puis prédiction</li>
              <li>• <strong>2. Erreur :</strong> comparaison avec la vraie réponse</li>
              <li>• <strong>3. Rétropropagation :</strong> calcul des corrections</li>
              <li>• <strong>4. Mise à jour :</strong> ajustement des poids</li>
            </ul>
          </div>
        </div>

        {/* Données d'exemple */}
        <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
          <h4 className="font-semibold mb-3">Exemple d'entrée (valeurs fictives)</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            {inputFeatures.map((feature, index) => (
              <div key={feature} className="text-center">
                <div className="font-medium">{feature}</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {(sampleInput[index] * 100).toFixed(0)} %
                </div>
                <div className="text-xs text-muted-foreground">Valeur normalisée</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NeuralNetworkVisualization;
