// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Database, Shuffle } from 'lucide-react';
import { DATASET_KINDS, type DatasetKind } from './miniNetwork';

interface DatasetControlsProps {
  kind: DatasetKind;
  size: number;
  noise: number;
  onKindChange: (kind: DatasetKind) => void;
  onSizeChange: (size: number) => void;
  onNoiseChange: (noise: number) => void;
  onRegenerate: () => void;
}

const DatasetControls: React.FC<DatasetControlsProps> = ({
  kind,
  size,
  noise,
  onKindChange,
  onSizeChange,
  onNoiseChange,
  onRegenerate
}) => {
  const selected = DATASET_KINDS.find((item) => item.value === kind);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-primary" aria-hidden="true" />
          Jeu de données synthétique
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="text-sm font-medium" id="label-dataset-kind">Forme des données</div>
          <div className="flex flex-wrap gap-2" role="group" aria-labelledby="label-dataset-kind">
            {DATASET_KINDS.map((item) => (
              <Button
                key={item.value}
                type="button"
                size="sm"
                variant={item.value === kind ? 'default' : 'outline'}
                aria-pressed={item.value === kind}
                onClick={() => onKindChange(item.value)}
              >
                {item.label}
              </Button>
            ))}
          </div>
          {selected && <p className="text-xs text-muted-foreground">{selected.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" id="label-dataset-size">Nombre de points</label>
              <Badge variant="secondary">{size}</Badge>
            </div>
            <Slider
              aria-labelledby="label-dataset-size"
              value={[size]}
              onValueChange={(value) => onSizeChange(value[0])}
              min={100}
              max={400}
              step={50}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              80 % des points servent à l'entraînement, 20 % à la validation.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" id="label-dataset-noise">Bruit</label>
              <Badge variant="secondary">{noise.toFixed(2).replace('.', ',')}</Badge>
            </div>
            <Slider
              aria-labelledby="label-dataset-noise"
              value={[Math.round(noise * 100)]}
              onValueChange={(value) => onNoiseChange(value[0] / 100)}
              min={0}
              max={50}
              step={5}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              Plus il y a de bruit, plus les classes se chevauchent : la tâche devient plus difficile.
            </p>
          </div>
        </div>

        <Button type="button" variant="outline" size="sm" onClick={onRegenerate}>
          <Shuffle className="h-4 w-4 mr-2" aria-hidden="true" />
          Nouveau tirage
        </Button>
      </CardContent>
    </Card>
  );
};

export default DatasetControls;
