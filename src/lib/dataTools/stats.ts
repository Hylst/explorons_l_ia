// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/** Statistiques descriptives simples, calculées sur des tableaux de nombres finis. */

export const mean = (values: number[]) => (values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : NaN);

/** Écart-type de l'échantillon (dénominateur n - 1). */
export function std(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return Math.sqrt(values.reduce((sum, v) => sum + (v - m) ** 2, 0) / (values.length - 1));
}

/** Quantile par interpolation linéaire (méthode 7 de Hyndman et Fan, celle des tableurs). Tableau trié attendu. */
export function quantileSorted(sorted: number[], q: number): number {
  if (sorted.length === 0) return NaN;
  const position = (sorted.length - 1) * q;
  const low = Math.floor(position);
  const high = Math.ceil(position);
  return sorted[low] + (sorted[high] - sorted[low]) * (position - low);
}

/** Coefficient de corrélation de Pearson sur les paires complètes ; NaN si une variable est constante. */
export function pearson(xs: (number | null)[], ys: (number | null)[]): { r: number; n: number } {
  const pairs: [number, number][] = [];
  for (let i = 0; i < xs.length; i++) {
    const x = xs[i];
    const y = ys[i];
    if (x !== null && y !== null) pairs.push([x, y]);
  }
  const n = pairs.length;
  if (n < 3) return { r: NaN, n };
  const mx = pairs.reduce((s, p) => s + p[0], 0) / n;
  const my = pairs.reduce((s, p) => s + p[1], 0) / n;
  let sxy = 0;
  let sxx = 0;
  let syy = 0;
  for (const [x, y] of pairs) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
    syy += (y - my) ** 2;
  }
  if (sxx === 0 || syy === 0) return { r: NaN, n };
  return { r: sxy / Math.sqrt(sxx * syy), n };
}

/** Histogramme à `bins` classes de même largeur. */
export function histogram(values: number[], bins = 12): { from: number; to: number; count: number }[] {
  if (values.length === 0) return [];
  let min = Infinity;
  let max = -Infinity;
  for (const v of values) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  if (min === max) return [{ from: min, to: max, count: values.length }];
  const width = (max - min) / bins;
  const result = Array.from({ length: bins }, (_, i) => ({ from: min + i * width, to: min + (i + 1) * width, count: 0 }));
  for (const v of values) result[Math.min(bins - 1, Math.floor((v - min) / width))].count++;
  return result;
}

/** Nombre en notation française, sans zéros inutiles. */
export const formatNumber = (value: number, digits = 2) =>
  Number.isFinite(value) ? value.toLocaleString('fr-FR', { maximumFractionDigits: digits }) : 'non défini';

export const formatPercent = (ratio: number, digits = 1) =>
  Number.isFinite(ratio) ? `${(ratio * 100).toLocaleString('fr-FR', { maximumFractionDigits: digits })}\u00A0%` : 'non défini';
