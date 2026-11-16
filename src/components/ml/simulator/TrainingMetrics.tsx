// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingDown, Activity, Clock, Target, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import type { Diagnostic, EpochMetrics } from './diagnostics';

interface TrainingMetricsProps {
  history: EpochMetrics[];
  maxEpochs: number;
  isTraining: boolean;
  learningRate: number;
  diagnostics: Diagnostic[];
}

const formatLoss = (value: number) => value.toFixed(3).replace('.', ',');
const formatPercent = (value: number) => `${value.toFixed(1).replace('.', ',')}\u00A0%`;

const TONE_STYLES: Record<Diagnostic['tone'], { icon: React.ElementType; className: string }> = {
  info: { icon: Info, className: 'text-muted-foreground' },
  warning: { icon: AlertTriangle, className: 'text-amber-700 dark:text-amber-300' },
  success: { icon: CheckCircle2, className: 'text-green-700 dark:text-green-400' }
};

const TrainingMetrics: React.FC<TrainingMetricsProps> = ({ history, maxEpochs, isTraining, learningRate, diagnostics }) => {
  const current = history.length > 0 ? history[history.length - 1] : null;

  if (!current) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" aria-hidden="true" />
          <p>Les métriques s'affichent dès le démarrage de l'entraînement.</p>
        </CardContent>
      </Card>
    );
  }

  const perEpoch = current.timeElapsed / current.epoch;
  const eta = isTraining ? `${Math.max(0, Math.round(((maxEpochs - current.epoch) * perEpoch) / 1000))} s` : '-';

  const cards = [
    { label: 'Perte (entraînement)', value: formatLoss(current.trainLoss), color: 'text-blue-600 dark:text-blue-400', icon: TrendingDown },
    { label: 'Perte (validation)', value: formatLoss(current.valLoss), color: 'text-orange-700 dark:text-orange-400', icon: TrendingDown },
    { label: 'Exactitude (entraînement)', value: formatPercent(current.trainAccuracy), color: 'text-green-700 dark:text-green-400', icon: Target },
    { label: 'Exactitude (validation)', value: formatPercent(current.valAccuracy), color: 'text-purple-600 dark:text-purple-400', icon: Target }
  ];

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, color, icon: Icon }) => (
          <Card key={label}>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{label}</p>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                </div>
                <Icon className={`h-7 w-7 shrink-0 opacity-60 ${color}`} aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-5 w-5" aria-hidden="true" />
            Progression de l'entraînement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Époque {current.epoch} / {maxEpochs}</span>
            <span>{Math.round((current.epoch / maxEpochs) * 100)} % effectué</span>
          </div>
          <Progress value={(current.epoch / maxEpochs) * 100} className="h-2" aria-label="Progression de l'entraînement" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span>Temps écoulé : {(current.timeElapsed / 1000).toFixed(1).replace('.', ',')} s</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span>Taux d'apprentissage : {String(learningRate).replace('.', ',')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <span>Temps restant estimé : {eta}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {diagnostics.length > 0 && (
        <Card className="border-amber-200 bg-amber-50/50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="pt-4">
            <h4 className="font-medium mb-2 text-amber-900 dark:text-amber-200">Lecture des courbes</h4>
            <ul className="space-y-2 text-sm">
              {diagnostics.map((diagnostic) => {
                const { icon: Icon, className } = TONE_STYLES[diagnostic.tone];
                return (
                  <li key={diagnostic.text} className={`flex items-start gap-2 ${className}`}>
                    <Icon className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{diagnostic.text}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainingMetrics;
