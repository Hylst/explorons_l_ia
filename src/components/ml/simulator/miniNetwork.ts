// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
/**
 * Petit réseau de neurones entraîné réellement dans le navigateur, pour le simulateur d'entraînement.
 *
 * Architecture : 2 entrées (x, y) -> une couche cachée (tanh) -> 1 sortie (sigmoïde), entraînée par
 * descente de gradient par mini-lots sur une perte d'entropie croisée binaire. Les jeux de données sont
 * synthétiques et générés avec un générateur pseudo-aléatoire à graine : une même graine redonne le même jeu.
 * Aucune dépendance, aucun appel réseau.
 */

import { createRng, gaussian, shuffled } from '@/lib/random';

export { createRng };

export interface DataPoint {
  x: number;
  y: number;
  label: number;
}

export type DatasetKind = 'lunes' | 'groupes' | 'cercles' | 'quadrants';

export const DATASET_KINDS: { value: DatasetKind; label: string; description: string }[] = [
  { value: 'lunes', label: 'Deux lunes', description: 'Deux demi-cercles imbriqués\u00A0: non linéaire, un classique du genre.' },
  { value: 'groupes', label: 'Deux groupes', description: 'Deux nuages de points\u00A0: presque séparables par une droite.' },
  { value: 'cercles', label: 'Deux cercles', description: 'Un cercle dans un autre\u00A0: impossible à séparer sans couche cachée.' },
  { value: 'quadrants', label: 'Quadrants (XOR)', description: 'Le «\u00A0ou exclusif\u00A0»\u00A0: classe 1 en haut à droite et en bas à gauche. Aucune droite ne sépare les classes\u00A0; il faut au moins deux neurones cachés.' }
];

/**
 * Génère un jeu de données binaire équilibré.
 * @param noise écart-type du bruit gaussien ajouté aux points (0 = aucun)
 */
export const generateDataset = (kind: DatasetKind, size: number, noise: number, seed: number): DataPoint[] => {
  const rng = createRng(seed);
  const perClass = Math.floor(size / 2);
  const points: DataPoint[] = [];

  for (let label = 0; label < 2; label++) {
    for (let i = 0; i < perClass; i++) {
      let x: number;
      let y: number;
      if (kind === 'lunes') {
        const t = rng() * Math.PI;
        x = label === 0 ? Math.cos(t) : 1 - Math.cos(t);
        y = label === 0 ? Math.sin(t) : 0.5 - Math.sin(t);
      } else if (kind === 'groupes') {
        x = label === 0 ? -0.9 : 0.9;
        y = label === 0 ? -0.6 : 0.6;
      } else if (kind === 'quadrants') {
        // Un point au hasard dans le carré, ramené dans un quadrant de sa classe (écart au centre pour lisibilité).
        const sx = rng() < 0.5 ? -1 : 1;
        const sy = label === 1 ? sx : -sx;
        x = sx * (0.15 + rng() * 1.05);
        y = sy * (0.15 + rng() * 1.05);
      } else {
        const t = rng() * 2 * Math.PI;
        const radius = label === 0 ? 0.55 : 1.3;
        x = radius * Math.cos(t);
        y = radius * Math.sin(t);
      }
      // Les deux groupes sont deux nuages gaussiens : un bruit minimal les garde étalés.
      const spread = kind === 'groupes' ? Math.max(noise, 0.15) + 0.25 : noise;
      points.push({ x: x + gaussian(rng) * spread, y: y + gaussian(rng) * spread, label });
    }
  }
  return points;
};

/** Mélange les points puis en réserve une part pour la validation. */
export const splitDataset = (
  points: DataPoint[],
  validationShare: number,
  seed: number
): { train: DataPoint[]; validation: DataPoint[] } => {
  const mixed = shuffled(points, createRng(seed ^ 0x9e3779b9));
  const validationSize = Math.max(1, Math.round(mixed.length * validationShare));
  return { train: mixed.slice(validationSize), validation: mixed.slice(0, validationSize) };
};

/** Taux d'apprentissage proposés par le curseur (échelle logarithmique : l'effet se voit par ordres de grandeur). */
export const LEARNING_RATES = [0.001, 0.003, 0.01, 0.03, 0.1, 0.3, 1, 3, 10];

/** Force de la régularisation L2 quand l'option est activée. */
export const L2_STRENGTH = 0.01;

/** Nombre d'époques sans amélioration de la perte de validation avant l'arrêt précoce. */
export const EARLY_STOPPING_PATIENCE = 15;

export interface Evaluation {
  loss: number;
  accuracy: number;
}

export interface TrainingStepConfig {
  learningRate: number;
  batchSize: number;
  /** Coefficient de régularisation L2 (0 = désactivée). */
  l2: number;
}

const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));
const EPSILON = 1e-7;

export class MiniNetwork {
  private readonly hidden: number;
  private readonly w1: Float64Array; // hidden x 2, stocké ligne par ligne
  private readonly b1: Float64Array;
  private readonly w2: Float64Array;
  private b2 = 0;

  constructor(hiddenUnits: number, seed: number) {
    this.hidden = hiddenUnits;
    const rng = createRng(seed ^ 0x85ebca6b);
    this.w1 = new Float64Array(hiddenUnits * 2).map(() => gaussian(rng) * 0.9);
    this.b1 = new Float64Array(hiddenUnits);
    this.w2 = new Float64Array(hiddenUnits).map(() => gaussian(rng) * (1 / Math.sqrt(hiddenUnits)));
  }

  /** Probabilité prédite d'appartenir à la classe 1. */
  predict(x: number, y: number): number {
    let z2 = this.b2;
    for (let j = 0; j < this.hidden; j++) {
      z2 += this.w2[j] * Math.tanh(this.w1[2 * j] * x + this.w1[2 * j + 1] * y + this.b1[j]);
    }
    return sigmoid(z2);
  }

  /** Une époque : un passage complet sur les données d'entraînement, par mini-lots mélangés. */
  trainEpoch(train: DataPoint[], config: TrainingStepConfig, rng: () => number): void {
    const order = shuffled(
      train.map((_, i) => i),
      rng
    );

    const { hidden } = this;
    const gw1 = new Float64Array(hidden * 2);
    const gb1 = new Float64Array(hidden);
    const gw2 = new Float64Array(hidden);
    const activations = new Float64Array(hidden);

    for (let start = 0; start < order.length; start += config.batchSize) {
      const end = Math.min(start + config.batchSize, order.length);
      gw1.fill(0);
      gb1.fill(0);
      gw2.fill(0);
      let gb2 = 0;

      for (let k = start; k < end; k++) {
        const point = train[order[k]];
        let z2 = this.b2;
        for (let j = 0; j < hidden; j++) {
          const a = Math.tanh(this.w1[2 * j] * point.x + this.w1[2 * j + 1] * point.y + this.b1[j]);
          activations[j] = a;
          z2 += this.w2[j] * a;
        }
        // Pour une sortie sigmoïde et une entropie croisée, le gradient de z2 vaut simplement (p - cible).
        const dz2 = sigmoid(z2) - point.label;
        gb2 += dz2;
        for (let j = 0; j < hidden; j++) {
          gw2[j] += dz2 * activations[j];
          const dz1 = dz2 * this.w2[j] * (1 - activations[j] * activations[j]);
          gw1[2 * j] += dz1 * point.x;
          gw1[2 * j + 1] += dz1 * point.y;
          gb1[j] += dz1;
        }
      }

      const scale = 1 / (end - start);
      const { learningRate, l2 } = config;
      for (let j = 0; j < hidden; j++) {
        this.w2[j] -= learningRate * (gw2[j] * scale + l2 * this.w2[j]);
        this.b1[j] -= learningRate * gb1[j] * scale;
        this.w1[2 * j] -= learningRate * (gw1[2 * j] * scale + l2 * this.w1[2 * j]);
        this.w1[2 * j + 1] -= learningRate * (gw1[2 * j + 1] * scale + l2 * this.w1[2 * j + 1]);
      }
      this.b2 -= learningRate * gb2 * scale;
    }
  }

  /** Perte d'entropie croisée moyenne et exactitude sur un ensemble de points. */
  evaluate(points: DataPoint[]): Evaluation {
    if (points.length === 0) return { loss: 0, accuracy: 0 };
    let loss = 0;
    let correct = 0;
    for (const point of points) {
      const p = Math.min(1 - EPSILON, Math.max(EPSILON, this.predict(point.x, point.y)));
      loss -= point.label === 1 ? Math.log(p) : Math.log(1 - p);
      if ((p >= 0.5 ? 1 : 0) === point.label) correct++;
    }
    return { loss: loss / points.length, accuracy: (correct / points.length) * 100 };
  }
}
