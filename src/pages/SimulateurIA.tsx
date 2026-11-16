// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo, useState } from 'react';
import SimulatorHeader from '@/components/ml/simulator/SimulatorHeader';
import DatasetControls from '@/components/ml/simulator/DatasetControls';
import TrainingSimulator from '@/components/ml/TrainingSimulator';
import { DATASET_KINDS, generateDataset, type DatasetKind } from '@/components/ml/simulator/miniNetwork';

const SimulateurIA: React.FC = () => {
  const [kind, setKind] = useState<DatasetKind>('cercles');
  const [size, setSize] = useState(200);
  const [noise, setNoise] = useState(0.15);
  const [seed, setSeed] = useState(1);

  const dataset = useMemo(() => generateDataset(kind, size, noise, seed), [kind, size, noise, seed]);
  const datasetLabel = DATASET_KINDS.find((item) => item.value === kind)?.label ?? kind;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <SimulatorHeader />
        <DatasetControls
          kind={kind}
          size={size}
          noise={noise}
          onKindChange={setKind}
          onSizeChange={setSize}
          onNoiseChange={setNoise}
          onRegenerate={() => setSeed((current) => current + 1)}
        />
        {/* Changer de jeu de données remonte le simulateur : l'entraînement repart de zéro. */}
        <TrainingSimulator
          key={`${kind}-${size}-${noise}-${seed}`}
          dataset={dataset}
          seed={seed}
          datasetLabel={datasetLabel}
        />
      </div>
    </div>
  );
};

export default SimulateurIA;
