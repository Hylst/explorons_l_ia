// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Outils de signal sans dépendance au navigateur : transformée de Fourier rapide (radix 2), fenêtre de Hann,
 * mesure de la part d'énergie spectrale située au-dessus d'une fréquence.
 */

/** Vrai si n est une puissance de deux (1, 2, 4, 8...). */
export function isPowerOfTwo(n: number): boolean {
  return Number.isInteger(n) && n > 0 && (n & (n - 1)) === 0;
}

/** Fenêtre de Hann de longueur n (version symétrique). */
export function hannWindow(n: number): Float64Array {
  const window = new Float64Array(n);
  if (n === 1) {
    window[0] = 1;
    return window;
  }
  for (let i = 0; i < n; i++) {
    window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (n - 1)));
  }
  return window;
}

/**
 * Transformée de Fourier discrète rapide, en place (algorithme de Cooley-Tukey, radix 2, décimation dans le temps).
 * `re` et `im` doivent avoir la même longueur, une puissance de deux.
 */
export function fftInPlace(re: Float64Array, im: Float64Array): void {
  const n = re.length;
  if (n !== im.length || !isPowerOfTwo(n)) {
    throw new Error('fftInPlace : la longueur doit être une puissance de deux, identique pour re et im');
  }

  // Permutation par inversion de bits
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1;
    for (; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j) {
      [re[i], re[j]] = [re[j], re[i]];
      [im[i], im[j]] = [im[j], im[i]];
    }
  }

  // Papillons
  for (let size = 2; size <= n; size <<= 1) {
    const half = size >> 1;
    const angle = (-2 * Math.PI) / size;
    const wRe = Math.cos(angle);
    const wIm = Math.sin(angle);
    for (let start = 0; start < n; start += size) {
      let curRe = 1;
      let curIm = 0;
      for (let k = 0; k < half; k++) {
        const a = start + k;
        const b = a + half;
        const tRe = re[b] * curRe - im[b] * curIm;
        const tIm = re[b] * curIm + im[b] * curRe;
        re[b] = re[a] - tRe;
        im[b] = im[a] - tIm;
        re[a] += tRe;
        im[a] += tIm;
        const nextRe = curRe * wRe - curIm * wIm;
        curIm = curRe * wIm + curIm * wRe;
        curRe = nextRe;
      }
    }
  }
}

/** Spectre de puissance (bins 0 à n/2 inclus) d'une trame fenêtrée par Hann. */
export function powerSpectrum(frame: ArrayLike<number>, window: Float64Array): Float64Array {
  const n = window.length;
  const re = new Float64Array(n);
  const im = new Float64Array(n);
  for (let i = 0; i < n; i++) re[i] = (frame[i] ?? 0) * window[i];
  fftInPlace(re, im);
  const power = new Float64Array(n / 2 + 1);
  for (let k = 0; k <= n / 2; k++) power[k] = re[k] * re[k] + im[k] * im[k];
  return power;
}

export interface HighBandResult {
  /** Part de l'énergie spectrale située au-dessus de la fréquence de coupure, entre 0 et 1. */
  share: number;
  /** Nombre de trames utilisées (réparties sur toute la durée du signal). */
  frames: number;
}

/**
 * Part de l'énergie spectrale au-dessus de `cutoffHz`, cumulée sur des trames de `frameSize` échantillons
 * (au plus `maxFrames`, réparties régulièrement sur le signal) avec fenêtrage de Hann.
 * Renvoie null si le signal est trop court, si la fréquence de coupure dépasse la fréquence de Nyquist
 * ou si le signal est nul : la mesure n'a alors pas de sens.
 */
export function highBandEnergyShare(
  samples: Float32Array | number[],
  sampleRate: number,
  cutoffHz: number,
  frameSize = 2048,
  maxFrames = 64
): HighBandResult | null {
  if (!isPowerOfTwo(frameSize) || samples.length < frameSize) return null;
  const nyquist = sampleRate / 2;
  if (cutoffHz >= nyquist) return null;

  const window = hannWindow(frameSize);
  const cutoffBin = Math.ceil((cutoffHz / nyquist) * (frameSize / 2));
  const lastStart = samples.length - frameSize;
  const frames = Math.min(maxFrames, Math.floor(lastStart / frameSize) + 1);
  const step = frames > 1 ? lastStart / (frames - 1) : 0;

  let high = 0;
  let total = 0;
  for (let f = 0; f < frames; f++) {
    const start = Math.round(f * step);
    const power = powerSpectrum(samples.slice(start, start + frameSize), window);
    // Le bin 0 (composante continue) est ignoré : il ne dit rien du contenu en fréquence.
    for (let k = 1; k < power.length; k++) {
      total += power[k];
      if (k >= cutoffBin) high += power[k];
    }
  }

  if (!(total > 0)) return null;
  return { share: high / total, frames };
}
