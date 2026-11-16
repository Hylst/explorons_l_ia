// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

/**
 * Mesures d'équité d'un classifieur binaire, calculées groupe par groupe à partir de la vérité terrain et des
 * prédictions (ou d'un score et d'un seuil). Définitions usuelles de la littérature :
 * - parité démographique : même taux de sélection (prédictions positives) dans chaque groupe ;
 * - égalité des chances (Hardt, Price et Srebro, 2016) : même taux de vrais positifs ;
 * - égalité des cotes : mêmes taux de vrais positifs et de faux positifs ;
 * - parité de la valeur prédictive positive : même précision des prédictions positives.
 * Quand les taux de base diffèrent entre groupes, ces critères ne peuvent pas tous être satisfaits à la fois
 * (Chouldechova, 2017 ; Kleinberg, Mullainathan et Raghavan, 2016).
 */

export interface GroupMetrics {
  group: string;
  n: number;
  positives: number; // vérité = positif
  tp: number;
  fp: number;
  tn: number;
  fn: number;
  baseRate: number; // part de positifs réels
  selectionRate: number; // part de prédictions positives
  tpr: number; // taux de vrais positifs (rappel)
  fpr: number; // taux de faux positifs
  ppv: number; // valeur prédictive positive (précision)
  accuracy: number;
}

export interface FairnessReport {
  groups: GroupMetrics[];
  overall: GroupMetrics;
  ignoredRows: number;
  gaps: {
    selection: { diff: number; ratio: number };
    tpr: number;
    fpr: number;
    equalizedOdds: number;
    ppv: number;
  };
}

export interface FairnessInput {
  groups: string[];
  truth: boolean[];
  predicted: boolean[];
}

const ratio = (a: number, b: number) => (b === 0 ? NaN : a / b);

function metrics(group: string, truth: boolean[], predicted: boolean[]): GroupMetrics {
  let tp = 0;
  let fp = 0;
  let tn = 0;
  let fn = 0;
  for (let i = 0; i < truth.length; i++) {
    if (predicted[i]) {
      if (truth[i]) tp++;
      else fp++;
    } else if (truth[i]) fn++;
    else tn++;
  }
  const n = truth.length;
  return {
    group,
    n,
    positives: tp + fn,
    tp,
    fp,
    tn,
    fn,
    baseRate: ratio(tp + fn, n),
    selectionRate: ratio(tp + fp, n),
    tpr: ratio(tp, tp + fn),
    fpr: ratio(fp, fp + tn),
    ppv: ratio(tp, tp + fp),
    accuracy: ratio(tp + tn, n),
  };
}

/** Écart maximal entre groupes pour une mesure (groupes où elle est définie). */
const spread = (values: number[]) => {
  const defined = values.filter(Number.isFinite);
  return defined.length < 2 ? NaN : Math.max(...defined) - Math.min(...defined);
};

export function fairnessReport({ groups, truth, predicted }: FairnessInput): FairnessReport {
  const byGroup = new Map<string, { truth: boolean[]; predicted: boolean[] }>();
  groups.forEach((g, i) => {
    if (!byGroup.has(g)) byGroup.set(g, { truth: [], predicted: [] });
    byGroup.get(g)!.truth.push(truth[i]);
    byGroup.get(g)!.predicted.push(predicted[i]);
  });
  const list = [...byGroup.entries()]
    .map(([g, data]) => metrics(g, data.truth, data.predicted))
    .sort((a, b) => b.n - a.n);
  const selection = list.map((m) => m.selectionRate).filter(Number.isFinite);
  const tprSpread = spread(list.map((m) => m.tpr));
  const fprSpread = spread(list.map((m) => m.fpr));
  return {
    groups: list,
    overall: metrics('Ensemble', truth, predicted),
    ignoredRows: 0,
    gaps: {
      selection: {
        diff: spread(selection),
        ratio: selection.length < 2 || Math.max(...selection) === 0 ? NaN : Math.min(...selection) / Math.max(...selection),
      },
      tpr: tprSpread,
      fpr: fprSpread,
      equalizedOdds: Number.isFinite(tprSpread) && Number.isFinite(fprSpread) ? Math.max(tprSpread, fprSpread) : NaN,
      ppv: spread(list.map((m) => m.ppv)),
    },
  };
}
