// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
/**
 * Petite forêt aléatoire entraînée réellement dans le navigateur, pour la démonstration du cours.
 *
 * Les données sont synthétiques : des dossiers de crédit dont la décision suit une règle cachée (revenus, dettes,
 * expérience) à laquelle s'ajoute du bruit. Chaque arbre est entraîné sur un échantillon tiré avec remise
 * (« bagging ») et ne voit qu'un sous-ensemble des variables. Aucune dépendance, aucun appel réseau.
 */
import { createRng, gaussian, shuffled } from '@/lib/random';

export type FeatureKey = 'age' | 'salaire' | 'experience' | 'dette';

export interface Applicant {
  age: number;
  salaire: number;
  experience: number;
  dette: number;
}

export interface Sample extends Applicant {
  approved: 0 | 1;
}

export interface FeatureInfo {
  key: FeatureKey;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
}

export const FEATURES: FeatureInfo[] = [
  { key: 'age', label: 'Âge', unit: 'ans', min: 20, max: 65, step: 1 },
  { key: 'salaire', label: 'Salaire mensuel net', unit: '€', min: 1200, max: 6000, step: 100 },
  { key: 'experience', label: 'Expérience', unit: 'ans', min: 0, max: 35, step: 1 },
  { key: 'dette', label: 'Dettes en cours', unit: '€', min: 0, max: 40000, step: 1000 }
];

const FEATURE_KEYS = FEATURES.map((feature) => feature.key);
export const FEATURE_LABELS: Record<FeatureKey, string> = {
  age: 'âge',
  salaire: 'salaire',
  experience: 'expérience',
  dette: 'dettes'
};

/** Nombre de variables examinées à chaque coupure (racine du nombre de variables, arrondie : 2 sur 4). */
const FEATURES_PER_SPLIT = Math.max(2, Math.round(Math.sqrt(FEATURE_KEYS.length)));
const APPROVAL_THRESHOLD = 0.09;
const NOISE = 0.08;

/**
 * Dossiers synthétiques. La règle cachée ne dépend que du salaire, de l'expérience et des dettes : l'âge n'y
 * intervient pas (il n'est corrélé qu'à l'expérience). Un bruit gaussien rend la règle imparfaitement lisible.
 */
export const generateApplicants = (size: number, seed: number): Sample[] => {
  const rng = createRng(seed);
  const samples: Sample[] = [];
  for (let i = 0; i < size; i++) {
    const age = 20 + Math.floor(rng() * 46);
    const salaire = 1200 + Math.round((rng() * 4800) / 100) * 100;
    const experience = Math.floor(rng() * (Math.min(age - 18, 35) + 1));
    const dette = Math.round((rng() * 40000) / 1000) * 1000;
    const score =
      0.5 * ((salaire - 1200) / 4800) + 0.2 * (experience / 35) - 0.45 * (dette / 40000) + gaussian(rng) * NOISE;
    samples.push({ age, salaire, experience, dette, approved: score > APPROVAL_THRESHOLD ? 1 : 0 });
  }
  return samples;
};

interface Leaf {
  kind: 'leaf';
  label: 0 | 1;
}
interface Split {
  kind: 'split';
  feature: FeatureKey;
  threshold: number;
  left: TreeNode;
  right: TreeNode;
}
export type TreeNode = Leaf | Split;

const gini = (positives: number, total: number) => (total === 0 ? 0 : 2 * (positives / total) * (1 - positives / total));

/**
 * Arbre de décision (CART, critère de Gini) limité en profondeur. Si `rng` est fourni, chaque coupure n'examine
 * qu'un sous-ensemble tiré au hasard des variables (principe de la forêt aléatoire) ; sinon elle les examine toutes.
 */
export const trainTree = (samples: Sample[], maxDepth: number, rng?: () => number, minLeaf = 3): TreeNode => {
  const build = (subset: Sample[], depth: number): TreeNode => {
    const positives = subset.reduce((sum, item) => sum + item.approved, 0);
    const majority: 0 | 1 = positives * 2 >= subset.length ? 1 : 0;
    if (depth >= maxDepth || subset.length < 2 * minLeaf || positives === 0 || positives === subset.length) {
      return { kind: 'leaf', label: majority };
    }

    const candidates = rng ? shuffled(FEATURE_KEYS, rng).slice(0, FEATURES_PER_SPLIT) : FEATURE_KEYS;
    let best: { feature: FeatureKey; threshold: number; score: number } | null = null;
    for (const feature of candidates) {
      const sorted = [...subset].sort((a, b) => a[feature] - b[feature]);
      let leftPositives = 0;
      for (let i = 0; i < sorted.length - 1; i++) {
        leftPositives += sorted[i].approved;
        if (sorted[i][feature] === sorted[i + 1][feature]) continue;
        const leftSize = i + 1;
        const rightSize = sorted.length - leftSize;
        if (leftSize < minLeaf || rightSize < minLeaf) continue;
        const score =
          (leftSize * gini(leftPositives, leftSize) + rightSize * gini(positives - leftPositives, rightSize)) / sorted.length;
        if (!best || score < best.score) {
          best = { feature, threshold: (sorted[i][feature] + sorted[i + 1][feature]) / 2, score };
        }
      }
    }
    if (!best) return { kind: 'leaf', label: majority };

    const { feature, threshold } = best;
    return {
      kind: 'split',
      feature,
      threshold,
      left: build(subset.filter((item) => item[feature] <= threshold), depth + 1),
      right: build(subset.filter((item) => item[feature] > threshold), depth + 1)
    };
  };
  return build(samples, 0);
};

export const predictTree = (node: TreeNode, applicant: Applicant): 0 | 1 => {
  let current = node;
  while (current.kind === 'split') current = applicant[current.feature] <= current.threshold ? current.left : current.right;
  return current.label;
};

const treeAccuracy = (tree: TreeNode, samples: Sample[]) =>
  samples.length === 0 ? 0 : (samples.filter((item) => predictTree(tree, item) === item.approved).length / samples.length) * 100;

export interface ForestTree {
  id: number;
  tree: TreeNode;
  /** Variable et seuil de la première coupure de l'arbre (sa question la plus discriminante parmi celles examinées). */
  root: { feature: FeatureKey; threshold: number } | null;
  /** Nombre de dossiers distincts vus par l'arbre (un échantillon tiré avec remise en contient environ 63 %). */
  distinctSamples: number;
  /** Exactitude sur les dossiers que cet arbre n'a pas vus (« out-of-bag »), ou null s'il y en a trop peu. */
  outOfBagAccuracy: number | null;
}

export const trainForest = (train: Sample[], config: { trees: number; maxDepth: number; seed: number }): ForestTree[] => {
  const rng = createRng(config.seed ^ 0x51ed270b);
  return Array.from({ length: config.trees }, (_, index) => {
    const drawn = Array.from({ length: train.length }, () => Math.floor(rng() * train.length));
    const seen = new Set(drawn);
    const tree = trainTree(drawn.map((i) => train[i]), config.maxDepth, rng);
    const unseen = train.filter((_, i) => !seen.has(i));
    return {
      id: index + 1,
      tree,
      root: tree.kind === 'leaf' ? null : { feature: tree.feature, threshold: tree.threshold },
      distinctSamples: seen.size,
      outOfBagAccuracy: unseen.length >= 5 ? treeAccuracy(tree, unseen) : null
    };
  });
};

export interface ForestVote {
  approvals: number;
  rejections: number;
  decision: 0 | 1;
  /** Part des arbres qui votent comme la décision finale, en pourcentage. */
  agreement: number;
}

export const forestVote = (forest: ForestTree[], applicant: Applicant): ForestVote => {
  const approvals = forest.filter((item) => predictTree(item.tree, applicant) === 1).length;
  const rejections = forest.length - approvals;
  const decision: 0 | 1 = approvals > rejections ? 1 : 0;
  return {
    approvals,
    rejections,
    decision,
    agreement: forest.length === 0 ? 0 : (Math.max(approvals, rejections) / forest.length) * 100
  };
};

export const forestAccuracy = (forest: ForestTree[], samples: Sample[]) =>
  samples.length === 0
    ? 0
    : (samples.filter((item) => forestVote(forest, item).decision === item.approved).length / samples.length) * 100;

export const singleTreeAccuracy = (train: Sample[], test: Sample[], maxDepth: number) =>
  treeAccuracy(trainTree(train, maxDepth), test);

export const forestTreeAccuracy = treeAccuracy;

/** Sépare un jeu en entraînement et test (70 / 30) après mélange reproductible. */
export const splitApplicants = (samples: Sample[], seed: number): { train: Sample[]; test: Sample[] } => {
  const mixed = shuffled(samples, createRng(seed ^ 0x2545f491));
  const cut = Math.round(mixed.length * 0.7);
  return { train: mixed.slice(0, cut), test: mixed.slice(cut) };
};
