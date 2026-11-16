// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// ACP (analyse en composantes principales) calculée pour de vrai, sans dépendance :
// variables centrées et réduites, matrice de corrélation, valeurs propres par la méthode de Jacobi.

export interface PcaResult {
  /** Valeurs propres triées par ordre décroissant (leur somme vaut le nombre de variables). */
  eigenvalues: number[];
  /** Part de variance portée par chaque composante (0 à 1). */
  explainedRatio: number[];
  /** components[k][j] : poids de la variable j dans la composante k. */
  components: number[][];
  /** scores[i][k] : coordonnée de l'observation i sur la composante k. */
  scores: number[][];
}

/** Diagonalise une matrice symétrique (méthode de Jacobi). Renvoie valeurs propres et vecteurs propres (en colonnes). */
export function jacobiEigen(matrix: number[][], maxSweeps = 80): { values: number[]; vectors: number[][] } {
  const n = matrix.length;
  const a = matrix.map((row) => row.slice());
  const v: number[][] = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));

  for (let sweep = 0; sweep < maxSweeps; sweep++) {
    let off = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += a[i][j] * a[i][j];
    if (off < 1e-22) break;

    for (let p = 0; p < n - 1; p++) {
      for (let q = p + 1; q < n; q++) {
        if (Math.abs(a[p][q]) < 1e-15) continue;
        const theta = (a[q][q] - a[p][p]) / (2 * a[p][q]);
        const t = (theta >= 0 ? 1 : -1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1);
        const s = t * c;
        for (let k = 0; k < n; k++) {
          const akp = a[k][p];
          const akq = a[k][q];
          a[k][p] = c * akp - s * akq;
          a[k][q] = s * akp + c * akq;
        }
        for (let k = 0; k < n; k++) {
          const apk = a[p][k];
          const aqk = a[q][k];
          a[p][k] = c * apk - s * aqk;
          a[q][k] = s * apk + c * aqk;
        }
        for (let k = 0; k < n; k++) {
          const vkp = v[k][p];
          const vkq = v[k][q];
          v[k][p] = c * vkp - s * vkq;
          v[k][q] = s * vkp + c * vkq;
        }
      }
    }
  }
  return { values: a.map((row, i) => row[i]), vectors: v };
}

/** ACP normée : `rows[i][j]` est la valeur de la variable j pour l'observation i. */
export function pca(rows: number[][]): PcaResult {
  const n = rows.length;
  const d = rows[0].length;
  const mean = Array.from({ length: d }, (_, j) => rows.reduce((sum, r) => sum + r[j], 0) / n);
  const std = Array.from({ length: d }, (_, j) =>
    Math.sqrt(rows.reduce((sum, r) => sum + (r[j] - mean[j]) ** 2, 0) / n) || 1,
  );
  const z = rows.map((r) => r.map((x, j) => (x - mean[j]) / std[j]));

  const corr = Array.from({ length: d }, (_, a) =>
    Array.from({ length: d }, (_, b) => z.reduce((sum, r) => sum + r[a] * r[b], 0) / n),
  );
  const { values, vectors } = jacobiEigen(corr);

  const order = values.map((_, i) => i).sort((i, j) => values[j] - values[i]);
  const eigenvalues = order.map((i) => Math.max(0, values[i]));
  const total = eigenvalues.reduce((sum, x) => sum + x, 0) || 1;
  const components = order.map((i) => {
    const column = vectors.map((row) => row[i]);
    // Le signe d'un vecteur propre est arbitraire : on le fixe pour que la somme des poids soit positive.
    const sign = column.reduce((sum, x) => sum + x, 0) < 0 ? -1 : 1;
    return column.map((x) => x * sign);
  });
  const scores = z.map((r) => components.map((comp) => comp.reduce((sum, w, j) => sum + w * r[j], 0)));

  return { eigenvalues, explainedRatio: eigenvalues.map((x) => x / total), components, scores };
}
