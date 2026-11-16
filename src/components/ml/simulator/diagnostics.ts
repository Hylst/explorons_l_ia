// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface EpochMetrics {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  trainAccuracy: number;
  valAccuracy: number;
  timeElapsed: number;
}

export interface Diagnostic {
  tone: 'info' | 'warning' | 'success';
  text: string;
}

const format = (value: number) => value.toFixed(2).replace('.', ',');
const SMOOTHING_WINDOW = 5;

const mean = (rows: EpochMetrics[], key: 'trainLoss' | 'valLoss') =>
  rows.reduce((sum, row) => sum + row[key], 0) / rows.length;

/**
 * Lit les courbes d'entraînement et formule des remarques pédagogiques. Toutes les conditions portent sur les
 * métriques réellement mesurées : aucune remarque n'est affichée si elle n'est pas observée.
 */
export const diagnose = (
  history: EpochMetrics[],
  config: { maxEpochs: number; learningRate: number; stoppedEarly: boolean }
): Diagnostic[] => {
  if (history.length === 0) return [];

  const last = history[history.length - 1];
  const out: Diagnostic[] = [];

  if (last.epoch < 10) {
    out.push({ tone: 'info', text: "Début de l'entraînement\u00A0: les métriques évoluent vite, puis se stabilisent." });
  }

  // Instabilité : la perte d'entraînement remonte à plusieurs reprises, ou dépasse sa valeur de départ.
  const recent = history.slice(-12);
  let increases = 0;
  for (let i = 1; i < recent.length; i++) {
    if (recent[i].trainLoss > recent[i - 1].trainLoss * 1.1) increases++;
  }
  const diverging = history.length >= 5 && last.trainLoss > history[0].trainLoss * 1.5;
  // Un bond de la perte bien au-dessus de sa valeur initiale (environ 0,69 pour deux classes) signale des pas trop grands.
  const peak = history.reduce((max, row) => Math.max(max, row.trainLoss), 0);
  const spiked = peak > 1.5 && config.learningRate >= 1;
  const unstable = increases >= 3 || diverging || spiked;
  if (unstable) {
    out.push({
      tone: 'warning',
      text: spiked && !diverging && increases < 3
        ? `La perte a fait un bond (jusqu'à ${format(peak)}) avant de redescendre\u00A0: signe d'un taux d'apprentissage trop élevé. Essayez de le réduire.`
        : "La perte d'entraînement oscille ou augmente\u00A0: le taux d'apprentissage est probablement trop élevé. Essayez de le réduire."
    });
  }

  // Surapprentissage : la perte de validation (lissée sur quelques époques) remonte alors que celle
  // d'entraînement continue de baisser. On ne l'affirme pas quand l'entraînement est instable.
  if (history.length >= 30 && !unstable) {
    let bestIndex = SMOOTHING_WINDOW - 1;
    let bestVal = Infinity;
    for (let i = SMOOTHING_WINDOW - 1; i < history.length; i++) {
      const value = mean(history.slice(i - SMOOTHING_WINDOW + 1, i + 1), 'valLoss');
      if (value < bestVal) {
        bestVal = value;
        bestIndex = i;
      }
    }
    const bestTrain = mean(history.slice(bestIndex - SMOOTHING_WINDOW + 1, bestIndex + 1), 'trainLoss');
    const lastWindow = history.slice(-SMOOTHING_WINDOW);
    const lastVal = mean(lastWindow, 'valLoss');
    const lastTrain = mean(lastWindow, 'trainLoss');
    if (lastVal > bestVal * 1.15 && lastVal - bestVal > 0.03 && lastTrain < bestTrain) {
      out.push({
        tone: 'warning',
        text: `La perte de validation remonte (de ${format(bestVal)} à ${format(lastVal)}) alors que celle d'entraînement baisse\u00A0: signe de surapprentissage. L'arrêt précoce, la régularisation ou moins de neurones peuvent aider.`
      });
    }
  }

  // Apprentissage lent avec un petit taux d'apprentissage.
  if (last.epoch >= config.maxEpochs * 0.5 && last.trainAccuracy < 75 && config.learningRate <= 0.03) {
    out.push({
      tone: 'info',
      text: "L'apprentissage est lent\u00A0: avec un taux d'apprentissage aussi faible, il faudrait beaucoup plus d'époques. Essayez de l'augmenter."
    });
  }

  // Capacité insuffisante : le réseau plafonne malgré un taux d'apprentissage raisonnable.
  if (last.epoch >= 40 && last.trainAccuracy < 80 && config.learningRate >= 0.1 && increases < 3) {
    out.push({
      tone: 'info',
      text: "Le réseau n'arrive pas à bien séparer les classes\u00A0: sa capacité est peut-être insuffisante. Augmentez le nombre de neurones cachés."
    });
  }

  if (!unstable && last.valAccuracy >= 90 && last.trainAccuracy - last.valAccuracy <= 5) {
    out.push({
      tone: 'success',
      text: "Bon ajustement\u00A0: les exactitudes d'entraînement et de validation sont élevées et proches l'une de l'autre."
    });
  }

  if (config.stoppedEarly) {
    out.push({
      tone: 'info',
      text: `Arrêt précoce à l'époque ${last.epoch}\u00A0: la perte de validation ne s'améliorait plus.`
    });
  }

  return out;
};
