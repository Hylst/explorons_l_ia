// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Brain, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrainingControls from './simulator/TrainingControls';
import TrainingMetrics from './simulator/TrainingMetrics';
import DecisionBoundary from './simulator/DecisionBoundary';
import { diagnose, type EpochMetrics } from './simulator/diagnostics';
import {
  EARLY_STOPPING_PATIENCE,
  L2_STRENGTH,
  LEARNING_RATES,
  MiniNetwork,
  createRng,
  splitDataset,
  type DataPoint
} from './simulator/miniNetwork';

/** Délai entre deux époques : assez lent pour suivre l'évolution, assez rapide pour ne pas s'ennuyer. */
const TICK_MS = 60;
const VALIDATION_SHARE = 0.2;

const DEFAULTS = { maxEpochs: 150, learningRateIndex: 5, batchSize: 32, hiddenUnits: 8 };

interface TrainingSimulatorProps {
  dataset: DataPoint[];
  seed: number;
  /** Libellé du type de jeu de données, pour l'en-tête et l'export. */
  datasetLabel: string;
}

const downloadJson = (filename: string, payload: unknown) => {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

const TrainingSimulator: React.FC<TrainingSimulatorProps> = ({ dataset, seed, datasetLabel }) => {
  const [maxEpochs, setMaxEpochs] = useState<number[]>([DEFAULTS.maxEpochs]);
  const [learningRateIndex, setLearningRateIndex] = useState<number[]>([DEFAULTS.learningRateIndex]);
  const [batchSize, setBatchSize] = useState<number[]>([DEFAULTS.batchSize]);
  const [hiddenUnits, setHiddenUnits] = useState<number[]>([DEFAULTS.hiddenUnits]);
  const [enableEarlyStopping, setEnableEarlyStopping] = useState(false);
  const [enableRegularization, setEnableRegularization] = useState(false);

  const [isTraining, setIsTraining] = useState(false);
  const [stoppedEarly, setStoppedEarly] = useState(false);
  const [history, setHistory] = useState<EpochMetrics[]>([]);
  // Incrémenté à chaque époque ou réinitialisation pour que la frontière de décision se redessine.
  const [version, setVersion] = useState(0);

  const split = useMemo(() => splitDataset(dataset, VALIDATION_SHARE, seed), [dataset, seed]);
  const learningRate = LEARNING_RATES[learningRateIndex[0]];

  // L'état mutable de l'entraînement vit dans des refs : il change à chaque époque sans relancer les effets.
  const networkRef = useRef<MiniNetwork | null>(null);
  if (networkRef.current === null) networkRef.current = new MiniNetwork(hiddenUnits[0], seed);
  const rngRef = useRef(createRng(seed + 7));
  const epochRef = useRef(0);
  const bestValLossRef = useRef(Infinity);
  const sinceBestRef = useRef(0);
  const accumulatedMsRef = useRef(0);
  const sessionStartRef = useRef(0);

  const predict = useCallback((x: number, y: number) => networkRef.current!.predict(x, y), []);

  const resetTraining = useCallback(() => {
    networkRef.current = new MiniNetwork(hiddenUnits[0], seed);
    rngRef.current = createRng(seed + 7);
    epochRef.current = 0;
    bestValLossRef.current = Infinity;
    sinceBestRef.current = 0;
    accumulatedMsRef.current = 0;
    setHistory([]);
    setStoppedEarly(false);
    setIsTraining(false);
    setVersion((v) => v + 1);
  }, [hiddenUnits, seed]);

  // Une nouvelle architecture (ou de nouvelles données) repart d'un réseau neuf.
  useEffect(() => {
    resetTraining();
  }, [resetTraining]);

  const pauseTraining = useCallback(() => {
    accumulatedMsRef.current += performance.now() - sessionStartRef.current;
    setIsTraining(false);
  }, []);

  useEffect(() => {
    if (!isTraining) return;

    const timer = window.setInterval(() => {
      const network = networkRef.current!;
      network.trainEpoch(
        split.train,
        { learningRate, batchSize: batchSize[0], l2: enableRegularization ? L2_STRENGTH : 0 },
        rngRef.current
      );
      const train = network.evaluate(split.train);
      const validation = network.evaluate(split.validation);
      epochRef.current += 1;

      const row: EpochMetrics = {
        epoch: epochRef.current,
        trainLoss: train.loss,
        valLoss: validation.loss,
        trainAccuracy: train.accuracy,
        valAccuracy: validation.accuracy,
        timeElapsed: accumulatedMsRef.current + (performance.now() - sessionStartRef.current)
      };
      setHistory((previous) => [...previous, row]);
      setVersion((v) => v + 1);

      if (validation.loss < bestValLossRef.current - 1e-4) {
        bestValLossRef.current = validation.loss;
        sinceBestRef.current = 0;
      } else {
        sinceBestRef.current += 1;
      }

      if (enableEarlyStopping && sinceBestRef.current >= EARLY_STOPPING_PATIENCE) {
        setStoppedEarly(true);
        pauseTraining();
      } else if (epochRef.current >= maxEpochs[0]) {
        pauseTraining();
      }
    }, TICK_MS);

    return () => window.clearInterval(timer);
  }, [isTraining, split, learningRate, batchSize, enableRegularization, enableEarlyStopping, maxEpochs, pauseTraining]);

  const currentEpoch = history.length;
  const isFinished = stoppedEarly || (currentEpoch > 0 && currentEpoch >= maxEpochs[0]);

  const handleStartPause = () => {
    if (isTraining) {
      pauseTraining();
      return;
    }
    if (isFinished) return;
    sessionStartRef.current = performance.now();
    setIsTraining(true);
  };

  const diagnostics = useMemo(
    () => diagnose(history, { maxEpochs: maxEpochs[0], learningRate, stoppedEarly }),
    [history, maxEpochs, learningRate, stoppedEarly]
  );

  const configuration = () => ({
    dataset: {
      type: datasetLabel,
      points: dataset.length,
      train: split.train.length,
      validation: split.validation.length,
      seed
    },
    network: { input: 2, hiddenUnits: hiddenUnits[0], hiddenActivation: 'tanh', output: 'sigmoïde' },
    hyperparameters: {
      epochs: maxEpochs[0],
      learningRate,
      batchSize: batchSize[0],
      l2: enableRegularization ? L2_STRENGTH : 0,
      earlyStopping: enableEarlyStopping ? { patience: EARLY_STOPPING_PATIENCE } : false
    }
  });

  const handleExportConfig = () => downloadJson('configuration-entrainement.json', configuration());
  const handleSaveProgress = () =>
    downloadJson('metriques-entrainement.json', { ...configuration(), stoppedEarly, metrics: history });

  return (
    <div className="space-y-6">
      <Alert>
        <Info className="h-4 w-4" aria-hidden="true" />
        <AlertTitle>Un vrai petit réseau, sur des données synthétiques</AlertTitle>
        <AlertDescription>
          Le réseau est réellement entraîné dans votre navigateur (descente de gradient par mini-lots), sur un jeu de
          données synthétique à deux dimensions. Il illustre des principes, comme l'effet du taux d'apprentissage, de la
          capacité ou du surapprentissage, mais ne permet pas de prévoir le comportement de modèles réels, bien plus
          grands. Rien n'est envoyé hors de votre navigateur.
        </AlertDescription>
      </Alert>

      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex flex-wrap items-center gap-2">
            <Brain className="h-5 w-5" aria-hidden="true" />
            Réseau de neurones à {hiddenUnits[0]} neurone{hiddenUnits[0] > 1 ? 's' : ''} caché{hiddenUnits[0] > 1 ? 's' : ''}
            <Badge variant="secondary" className="sm:ml-auto">
              {datasetLabel} : {dataset.length} points ({split.train.length} entraînement, {split.validation.length} validation)
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <TrainingControls
          isTraining={isTraining}
          isFinished={isFinished}
          currentEpoch={currentEpoch}
          maxEpochs={maxEpochs}
          learningRateIndex={learningRateIndex}
          batchSize={batchSize}
          hiddenUnits={hiddenUnits}
          enableEarlyStopping={enableEarlyStopping}
          enableRegularization={enableRegularization}
          onStartPause={handleStartPause}
          onReset={resetTraining}
          onMaxEpochsChange={setMaxEpochs}
          onLearningRateChange={setLearningRateIndex}
          onBatchSizeChange={setBatchSize}
          onHiddenUnitsChange={setHiddenUnits}
          onEarlyStoppingToggle={setEnableEarlyStopping}
          onRegularizationToggle={setEnableRegularization}
          onExportConfig={handleExportConfig}
          onSaveProgress={handleSaveProgress}
        />

        <Card>
          <CardHeader>
            <CardTitle>Frontière de décision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <DecisionBoundary predict={predict} train={split.train} validation={split.validation} version={version} />
            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <li className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-blue-500" aria-hidden="true" /> Classe 0</li>
              <li className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full bg-orange-500" aria-hidden="true" /> Classe 1</li>
              <li className="flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-full border border-muted-foreground" aria-hidden="true" /> Entraînement (cercles)</li>
              <li className="flex items-center gap-1"><span className="inline-block h-3 w-3 border-2 border-foreground" aria-hidden="true" /> Validation (carrés)</li>
            </ul>
            <p className="text-xs text-muted-foreground">
              Le fond indique la classe que prédit le réseau en chaque point (plus la couleur est intense, plus il est
              sûr de lui). Lancez l'entraînement et observez la frontière se former.
            </p>
          </CardContent>
        </Card>
      </div>

      <TrainingMetrics
        history={history}
        maxEpochs={maxEpochs[0]}
        isTraining={isTraining}
        learningRate={learningRate}
        diagnostics={diagnostics}
      />

      {history.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution de la perte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" type="number" domain={[1, Math.max(maxEpochs[0], 2)]} allowDecimals={false} />
                    <YAxis domain={[0, 'auto']} tickFormatter={(value: number) => value.toFixed(2)} />
                    <Tooltip formatter={(value: number) => value.toFixed(3)} labelFormatter={(label) => `Époque ${label}`} />
                    <Legend formatter={(value: string) => <span className="text-foreground">{value}</span>} />
                    <Line type="monotone" dataKey="trainLoss" stroke="#3b82f6" name="Entraînement" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="valLoss" stroke="#f97316" name="Validation" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Évolution de l'exactitude</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="epoch" type="number" domain={[1, Math.max(maxEpochs[0], 2)]} allowDecimals={false} />
                    <YAxis domain={[0, 100]} unit={'\u00A0%'} />
                    <Tooltip formatter={(value: number) => `${value.toFixed(1)}\u00A0%`} labelFormatter={(label) => `Époque ${label}`} />
                    <Legend formatter={(value: string) => <span className="text-foreground">{value}</span>} />
                    <Line type="monotone" dataKey="trainAccuracy" stroke="#22c55e" name="Entraînement" strokeWidth={2} dot={false} isAnimationActive={false} />
                    <Line type="monotone" dataKey="valAccuracy" stroke="#a855f7" name="Validation" strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TrainingSimulator;
