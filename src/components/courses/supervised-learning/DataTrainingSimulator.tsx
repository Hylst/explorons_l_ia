// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, Database, Target, AlertTriangle } from 'lucide-react';

/** label 1 = classe A (rouge), label 0 = classe B (vert). */
interface Point {
  x: number;
  y: number;
  label: 0 | 1;
}

/** Régression logistique sur des coordonnées centrées et réduites : p(A) = sigmoïde(w1·u + w2·v + b). */
interface Model {
  w1: number;
  w2: number;
  b: number;
}

const MAX_EPOCHS = 100;
const TICK_MS = 100;
const VALIDATION_SHARE = 0.2;

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
const normalize = (value: number) => (value - 5) / 5;
const predict = (model: Model, point: Point) => sigmoid(model.w1 * normalize(point.x) + model.w2 * normalize(point.y) + model.b);

/**
 * Nuage de points : la classe dépend de la position par rapport à la droite y = 0,5x + 2. Le bruit décale
 * aléatoirement cette droite pour chaque point : même un modèle parfait ne peut pas tout bien classer.
 */
const generateDataset = (size: number, noisePercent: number): Point[] => {
  const points: Point[] = [];
  for (let i = 0; i < size; i++) {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    const threshold = 0.5 * x + 2 + (Math.random() - 0.5) * noisePercent * 0.1;
    points.push({ x, y, label: y > threshold ? 1 : 0 });
  }
  return points;
};

const randomModel = (): Model => ({
  w1: (Math.random() - 0.5) * 2,
  w2: (Math.random() - 0.5) * 2,
  b: (Math.random() - 0.5)
});

/** Une époque de descente de gradient sur tout le jeu d'entraînement. */
const gradientStep = (model: Model, train: Point[], learningRate: number): Model => {
  if (train.length === 0) return model;
  let g1 = 0;
  let g2 = 0;
  let gb = 0;
  for (const point of train) {
    const error = predict(model, point) - point.label;
    g1 += error * normalize(point.x);
    g2 += error * normalize(point.y);
    gb += error;
  }
  const scale = learningRate / train.length;
  return { w1: model.w1 - g1 * scale, w2: model.w2 - g2 * scale, b: model.b - gb * scale };
};

const evaluate = (model: Model, points: Point[]) => {
  if (points.length === 0) return { accuracy: 0, loss: 0 };
  let correct = 0;
  let loss = 0;
  for (const point of points) {
    const p = Math.min(1 - 1e-7, Math.max(1e-7, predict(model, point)));
    loss -= point.label === 1 ? Math.log(p) : Math.log(1 - p);
    if ((p >= 0.5 ? 1 : 0) === point.label) correct++;
  }
  return { accuracy: (correct / points.length) * 100, loss: loss / points.length };
};

/** Extrémités de la frontière (w1·u + w2·v + b = 0) en coordonnées du dessin (0 à 100). */
const boundaryLine = (model: Model): { x1: number; y1: number; x2: number; y2: number } | null => {
  const toSvg = (x: number, y: number) => ({ x: x * 10, y: 100 - y * 10 });
  if (Math.abs(model.w2) >= Math.abs(model.w1) * 0.01 && Math.abs(model.w2) > 1e-9) {
    const yAt = (x: number) => 5 - (model.w1 * (x - 5) + 5 * model.b) / model.w2;
    const start = toSvg(0, yAt(0));
    const end = toSvg(10, yAt(10));
    return { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  }
  if (Math.abs(model.w1) > 1e-9) {
    const x = 5 - (5 * model.b) / model.w1;
    const top = toSvg(x, 10);
    const bottom = toSvg(x, 0);
    return { x1: top.x, y1: top.y, x2: bottom.x, y2: bottom.y };
  }
  return null;
};

const accuracyVariant = (accuracy: number) => (accuracy >= 90 ? 'default' : accuracy >= 75 ? 'secondary' : 'destructive');

const DataTrainingSimulator: React.FC = () => {
  const [datasetSize, setDatasetSize] = useState<number[]>([100]);
  const [noiseLevel, setNoiseLevel] = useState<number[]>([20]);
  const [learningRate, setLearningRate] = useState<number[]>([0.5]);

  const [points, setPoints] = useState<Point[]>([]);
  const [model, setModel] = useState<Model>({ w1: 0, w2: 0, b: 0 });
  const [epoch, setEpoch] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const split = useMemo(() => {
    const cut = Math.floor(points.length * (1 - VALIDATION_SHARE));
    return { train: points.slice(0, cut), validation: points.slice(cut) };
  }, [points]);

  const newExperiment = () => {
    setPoints(generateDataset(datasetSize[0], noiseLevel[0]));
    setModel(randomModel());
    setEpoch(0);
    setIsTraining(false);
  };

  // Nouveau jeu de données quand la taille ou le bruit changent (et au premier affichage).
  useEffect(() => {
    setPoints(generateDataset(datasetSize[0], noiseLevel[0]));
    setModel(randomModel());
    setEpoch(0);
    setIsTraining(false);
  }, [datasetSize, noiseLevel]);

  useEffect(() => {
    if (!isTraining) return;
    const timer = window.setInterval(() => {
      setModel((current) => gradientStep(current, split.train, learningRate[0]));
      setEpoch((current) => current + 1);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [isTraining, split, learningRate]);

  useEffect(() => {
    if (epoch >= MAX_EPOCHS) setIsTraining(false);
  }, [epoch]);

  const train = useMemo(() => evaluate(model, split.train), [model, split]);
  const validation = useMemo(() => evaluate(model, split.validation), [model, split]);
  const line = useMemo(() => boundaryLine(model), [model]);
  const isFinished = epoch >= MAX_EPOCHS;

  return (
    <Card className="border-primary/20">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-xl leading-snug sm:text-2xl">
          <Database className="h-6 w-6 text-primary" aria-hidden="true" />
          Entraînement d'un classifieur linéaire
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Un modèle de régression logistique est réellement entraîné dans votre navigateur : observez la frontière
          de décision se déplacer et les erreurs diminuer
        </p>
      </CardHeader>
      <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2" id="dts-size">
                <Database className="h-4 w-4" aria-hidden="true" />
                Taille du jeu de données
              </label>
              <span className="text-sm text-muted-foreground">{datasetSize[0]} points</span>
            </div>
            <Slider aria-labelledby="dts-size" value={datasetSize} onValueChange={setDatasetSize} max={500} min={50} step={50} className="w-full" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2" id="dts-noise">
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                Niveau de bruit
              </label>
              <span className="text-sm text-muted-foreground">{noiseLevel[0]} %</span>
            </div>
            <Slider aria-labelledby="dts-noise" value={noiseLevel} onValueChange={setNoiseLevel} max={50} min={0} step={5} className="w-full" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center gap-2" id="dts-lr">
                <Target className="h-4 w-4" aria-hidden="true" />
                Taux d'apprentissage
              </label>
              <span className="text-sm text-muted-foreground">{String(learningRate[0]).replace('.', ',')}</span>
            </div>
            <Slider aria-labelledby="dts-lr" value={learningRate} onValueChange={setLearningRate} max={3} min={0.05} step={0.05} className="w-full" />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button onClick={() => setIsTraining((current) => !current)} size="sm" className="flex items-center gap-2" disabled={isFinished && !isTraining}>
            {isTraining ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {isTraining ? 'Pause' : isFinished ? 'Terminé' : epoch > 0 ? 'Reprendre' : "Démarrer l'entraînement"}
          </Button>
          <Button onClick={newExperiment} size="sm" variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
            Nouveau tirage
          </Button>
          <div className="text-sm text-muted-foreground">
            Époque {epoch} / {MAX_EPOCHS}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Exactitude (entraînement)</span>
              <Badge variant={accuracyVariant(train.accuracy)}>{train.accuracy.toFixed(1).replace('.', ',')} %</Badge>
            </div>
            <Progress value={train.accuracy} className="h-2" aria-label="Exactitude en entraînement" />
          </div>

          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Exactitude (validation)</span>
              <Badge variant={accuracyVariant(validation.accuracy)}>{validation.accuracy.toFixed(1).replace('.', ',')} %</Badge>
            </div>
            <Progress value={validation.accuracy} className="h-2" aria-label="Exactitude en validation" />
          </div>

          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Perte (entraînement)</span>
              <span className="text-sm font-bold">{train.loss.toFixed(3).replace('.', ',')}</span>
            </div>
            <Progress value={(epoch / MAX_EPOCHS) * 100} className="h-2" aria-label="Progression de l'entraînement" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Visualisation de l'apprentissage</h4>
          <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border">
            <svg
              viewBox="0 0 100 100"
              role="img"
              aria-label="Nuage de points des classes A et B, et frontière de décision du modèle"
              className="w-full max-w-md mx-auto aspect-square rounded border bg-gray-50 dark:bg-gray-800"
            >
              <defs>
                <pattern id="dts-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#e5e7eb" strokeWidth="0.3" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#dts-grid)" />

              {line && (
                <line
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="#3B82F6"
                  strokeWidth="1"
                  strokeDasharray={isTraining ? '3,2' : undefined}
                />
              )}

              {split.train.map((point, index) => {
                const wrong = (predict(model, point) >= 0.5 ? 1 : 0) !== point.label;
                return (
                  <circle
                    key={`t${index}`}
                    cx={point.x * 10}
                    cy={100 - point.y * 10}
                    r={1.4}
                    fill={point.label === 1 ? '#EF4444' : '#10B981'}
                    stroke={wrong ? '#FBBF24' : 'none'}
                    strokeWidth={wrong ? 0.6 : 0}
                  />
                );
              })}
              {split.validation.map((point, index) => {
                const wrong = (predict(model, point) >= 0.5 ? 1 : 0) !== point.label;
                return (
                  <rect
                    key={`v${index}`}
                    x={point.x * 10 - 1.5}
                    y={100 - point.y * 10 - 1.5}
                    width={3}
                    height={3}
                    fill={point.label === 1 ? '#EF4444' : '#10B981'}
                    stroke={wrong ? '#FBBF24' : '#111827'}
                    strokeWidth={wrong ? 0.7 : 0.3}
                  />
                );
              })}
            </svg>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" aria-hidden="true"></div>
                <span>Classe A</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" aria-hidden="true"></div>
                <span>Classe B</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-0.5 bg-blue-500" aria-hidden="true"></div>
                <span>Frontière de décision</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-amber-400 rounded-full bg-transparent" aria-hidden="true"></div>
                <span>Erreur de classification</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-foreground bg-muted" aria-hidden="true"></div>
                <span>Carrés : points de validation</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Lecture de l'expérience</h4>
          <div className="space-y-2 text-sm text-blue-900 dark:text-blue-200">
            {epoch === 0 && <p>• Le modèle part de paramètres aléatoires : la frontière ne sépare pas encore les classes.</p>}
            {epoch > 0 && !isFinished && <p>• À chaque époque, le modèle ajuste ses paramètres pour réduire l'erreur sur les points d'entraînement.</p>}
            {isFinished && <p>• Entraînement terminé : les paramètres ne bougent presque plus si le taux d'apprentissage est adapté.</p>}
            {epoch > 10 && learningRate[0] <= 0.15 && train.accuracy < 80 && (
              <p>• Le taux d'apprentissage est faible : la frontière avance lentement. Essayez de l'augmenter.</p>
            )}
            {epoch > 30 && noiseLevel[0] >= 30 && validation.accuracy < 90 && (
              <p>• Le bruit limite l'exactitude : certains points sont « mal placés » par construction, aucun modèle ne peut tous les classer correctement.</p>
            )}
            {epoch > 30 && validation.accuracy >= 90 && Math.abs(train.accuracy - validation.accuracy) <= 5 && (
              <p>• Bon ajustement : exactitudes d'entraînement et de validation élevées et proches.</p>
            )}
            {epoch > 30 && train.accuracy - validation.accuracy > 10 && (
              <p>• Écart notable entre entraînement et validation : avec si peu de points, la validation est peu fiable. Essayez d'augmenter la taille du jeu de données.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTrainingSimulator;
