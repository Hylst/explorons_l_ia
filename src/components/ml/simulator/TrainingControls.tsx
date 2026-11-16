// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Play, Pause, RotateCcw, Settings, Download, Save } from 'lucide-react';
import { EARLY_STOPPING_PATIENCE, L2_STRENGTH, LEARNING_RATES } from './miniNetwork';

interface TrainingControlsProps {
  isTraining: boolean;
  isFinished: boolean;
  currentEpoch: number;
  maxEpochs: number[];
  /** Position du curseur dans LEARNING_RATES. */
  learningRateIndex: number[];
  batchSize: number[];
  hiddenUnits: number[];
  enableEarlyStopping: boolean;
  enableRegularization: boolean;
  onStartPause: () => void;
  onReset: () => void;
  onMaxEpochsChange: (value: number[]) => void;
  onLearningRateChange: (value: number[]) => void;
  onBatchSizeChange: (value: number[]) => void;
  onHiddenUnitsChange: (value: number[]) => void;
  onEarlyStoppingToggle: (value: boolean) => void;
  onRegularizationToggle: (value: boolean) => void;
  onExportConfig: () => void;
  onSaveProgress: () => void;
}

const formatRate = (rate: number) => String(rate).replace('.', ',');

const TrainingControls: React.FC<TrainingControlsProps> = ({
  isTraining,
  isFinished,
  currentEpoch,
  maxEpochs,
  learningRateIndex,
  batchSize,
  hiddenUnits,
  enableEarlyStopping,
  enableRegularization,
  onStartPause,
  onReset,
  onMaxEpochsChange,
  onLearningRateChange,
  onBatchSizeChange,
  onHiddenUnitsChange,
  onEarlyStoppingToggle,
  onRegularizationToggle,
  onExportConfig,
  onSaveProgress
}) => {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" aria-hidden="true" />
          Hyperparamètres
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" id="label-epochs">Nombre d'époques</label>
              <Badge variant="secondary">{maxEpochs[0]}</Badge>
            </div>
            <Slider
              aria-labelledby="label-epochs"
              value={maxEpochs}
              onValueChange={onMaxEpochsChange}
              min={50}
              max={500}
              step={25}
              disabled={isTraining}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Une époque correspond à un passage complet sur les données d'entraînement.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" id="label-lr">Taux d'apprentissage</label>
              <Badge variant="secondary">{formatRate(LEARNING_RATES[learningRateIndex[0]])}</Badge>
            </div>
            <Slider
              aria-labelledby="label-lr"
              value={learningRateIndex}
              onValueChange={onLearningRateChange}
              min={0}
              max={LEARNING_RATES.length - 1}
              step={1}
              disabled={isTraining}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Trop faible, l'apprentissage est très lent. Trop élevé, la perte oscille ou diverge.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" id="label-batch">Taille de lot (batch)</label>
              <Badge variant="secondary">{batchSize[0]}</Badge>
            </div>
            <Slider
              aria-labelledby="label-batch"
              value={batchSize}
              onValueChange={onBatchSizeChange}
              min={8}
              max={128}
              step={8}
              disabled={isTraining}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Petit lot : mises à jour plus nombreuses et plus bruitées. Grand lot : plus stables, mais moins nombreuses par époque.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" id="label-hidden">Neurones cachés</label>
              <Badge variant="secondary">{hiddenUnits[0]}</Badge>
            </div>
            <Slider
              aria-labelledby="label-hidden"
              value={hiddenUnits}
              onValueChange={onHiddenUnitsChange}
              min={1}
              max={16}
              step={1}
              disabled={isTraining}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Capacité du réseau. Modifier ce réglage réinitialise l'entraînement.
            </p>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t">
          <h4 className="font-medium">Options</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm" id="label-early">Arrêt précoce</div>
                <div className="text-xs text-muted-foreground">
                  Stoppe l'entraînement si la perte de validation ne s'améliore plus pendant {EARLY_STOPPING_PATIENCE} époques.
                </div>
              </div>
              <Switch
                aria-labelledby="label-early"
                checked={enableEarlyStopping}
                onCheckedChange={onEarlyStoppingToggle}
                disabled={isTraining}
              />
            </div>

            <div className="flex items-center justify-between gap-3 p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm" id="label-l2">Régularisation L2</div>
                <div className="text-xs text-muted-foreground">
                  Pénalise les poids élevés (coefficient {formatRate(L2_STRENGTH)}) pour limiter le surapprentissage.
                </div>
              </div>
              <Switch
                aria-labelledby="label-l2"
                checked={enableRegularization}
                onCheckedChange={onRegularizationToggle}
                disabled={isTraining}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4 border-t">
          <Button onClick={onStartPause} className="flex items-center gap-2" size="sm" disabled={isFinished && !isTraining}>
            {isTraining ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            {isTraining ? 'Pause' : isFinished ? 'Terminé' : currentEpoch > 0 ? 'Reprendre' : 'Démarrer'}
          </Button>

          <Button variant="outline" onClick={onReset} disabled={isTraining || currentEpoch === 0} size="sm">
            <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
            Réinitialiser
          </Button>

          <div className="flex flex-wrap gap-2 sm:ml-auto">
            <Button variant="outline" onClick={onSaveProgress} size="sm" disabled={currentEpoch === 0}>
              <Save className="h-4 w-4 mr-2" aria-hidden="true" />
              Exporter les métriques
            </Button>

            <Button variant="outline" onClick={onExportConfig} size="sm">
              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
              Exporter la configuration
            </Button>
          </div>
        </div>

        <div className="bg-muted/30 p-3 rounded-lg text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">État de l'entraînement</span>
            <Badge variant={isTraining ? 'default' : 'secondary'}>
              {isTraining ? 'En cours' : isFinished ? 'Terminé' : 'Arrêté'}
            </Badge>
          </div>
          <div className="text-muted-foreground">
            {isTraining
              ? `Époque ${currentEpoch} sur ${maxEpochs[0]}`
              : isFinished
                ? `Entraînement terminé (${currentEpoch} époques). Réinitialisez pour recommencer, ou augmentez le nombre d'époques pour poursuivre.`
                : currentEpoch > 0
                  ? `En pause à l'époque ${currentEpoch}`
                  : "Prêt à démarrer"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingControls;
