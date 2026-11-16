// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Edge, Node } from '@xyflow/react';

/**
 * Analyse structurelle d'un workflow (graphe de nœuds et de connexions). Tout ce qui est affiché est calculé
 * à partir du graphe : aucune métrique d'exécution, aucun coût, aucune économie chiffrée n'est inventé.
 */

export type NodeKind = 'llm' | 'image' | 'audio' | 'video' | 'data' | 'logic' | 'autre';

export const KIND_LABELS: Record<NodeKind, string> = {
  llm: 'Texte / modèle de langage',
  image: 'Image',
  audio: 'Audio',
  video: 'Vidéo',
  data: 'Données et intégrations',
  logic: 'Logique et contrôle',
  autre: 'Autre'
};

// Catégories de la bibliothèque de nœuds -> type d'étape.
const CATEGORY_KINDS: Record<string, NodeKind> = {
  llm: 'llm',
  image: 'image',
  audio: 'audio',
  video: 'video',
  data: 'data',
  integration: 'data',
  analyse: 'data',
  communication: 'data',
  logic: 'logic',
  security: 'logic',
  ml: 'autre'
};

// À défaut de catégorie (presets, templates), le type est estimé d'après le libellé.
const KEYWORDS: [NodeKind, RegExp][] = [
  ['video', /vid[ée]o|sora|runway/i],
  ['image', /image|vision|photo|dall|midjourney|diffusion|ocr/i],
  ['audio', /audio|voix|vocal|parole|speech|whisper|musique|podcast/i],
  ['logic', /condition|filtre|valid|d[ée]cision|routeur|r[èe]gle|contr[ôo]le|v[ée]rif/i],
  ['llm', /llm|gpt|claude|gemini|llama|mistral|langage|texte|r[ée]sum|traduc|chat|prompt|nlp|sentiment|classification|extraction|r[ée]dact|g[ée]n[ée]ration/i],
  ['data', /donn[ée]e|base|sql|fichier|document|email|mail|crm|api|webhook|stockage|export|import|source/i]
];

export const classifyNode = (node: Node): NodeKind => {
  const data = (node.data ?? {}) as { category?: unknown; label?: unknown; description?: unknown };
  if (typeof data.category === 'string' && CATEGORY_KINDS[data.category]) return CATEGORY_KINDS[data.category];
  const text = `${typeof data.label === 'string' ? data.label : ''} ${typeof data.description === 'string' ? data.description : ''}`;
  for (const [kind, pattern] of KEYWORDS) {
    if (pattern.test(text)) return kind;
  }
  return 'autre';
};

export const nodeLabel = (node: Node): string =>
  typeof node.data?.label === 'string' && node.data.label.trim() !== '' ? node.data.label : `Nœud ${node.id}`;

export interface WorkflowStats {
  nodeCount: number;
  edgeCount: number;
  /** Nœuds sans aucune connexion. */
  isolated: Node[];
  hasCycle: boolean;
  /** Nombre maximal d'étapes successives (longueur du plus long chemin), 0 si le graphe contient une boucle. */
  depth: number;
  /** Nombre maximal de nœuds pouvant s'exécuter en même temps (un même « niveau » du graphe). */
  parallelism: number;
  kinds: Record<NodeKind, number>;
  /** Ordre d'exécution (tri topologique) ; dans l'ordre d'origine si le graphe contient une boucle. */
  order: Node[];
}

export const computeStats = (nodes: Node[], edges: Edge[]): WorkflowStats => {
  const ids = new Set(nodes.map((node) => node.id));
  const validEdges = edges.filter((edge) => ids.has(edge.source) && ids.has(edge.target));

  const incoming = new Map<string, string[]>();
  const outgoing = new Map<string, string[]>();
  for (const node of nodes) {
    incoming.set(node.id, []);
    outgoing.set(node.id, []);
  }
  for (const edge of validEdges) {
    outgoing.get(edge.source)!.push(edge.target);
    incoming.get(edge.target)!.push(edge.source);
  }

  // Tri topologique (algorithme de Kahn) avec calcul du niveau de chaque nœud.
  const remaining = new Map(nodes.map((node) => [node.id, incoming.get(node.id)!.length]));
  const level = new Map<string, number>();
  const queue = nodes.filter((node) => remaining.get(node.id) === 0).map((node) => node.id);
  queue.forEach((id) => level.set(id, 1));
  const orderIds: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    orderIds.push(current);
    for (const next of outgoing.get(current)!) {
      level.set(next, Math.max(level.get(next) ?? 1, (level.get(current) ?? 1) + 1));
      remaining.set(next, remaining.get(next)! - 1);
      if (remaining.get(next) === 0) queue.push(next);
    }
  }

  const hasCycle = orderIds.length < nodes.length;
  const levelCounts = new Map<number, number>();
  if (!hasCycle) level.forEach((value) => levelCounts.set(value, (levelCounts.get(value) ?? 0) + 1));

  const kinds: Record<NodeKind, number> = { llm: 0, image: 0, audio: 0, video: 0, data: 0, logic: 0, autre: 0 };
  for (const node of nodes) kinds[classifyNode(node)]++;

  const byId = new Map(nodes.map((node) => [node.id, node]));
  return {
    nodeCount: nodes.length,
    edgeCount: validEdges.length,
    isolated: nodes.length > 1 ? nodes.filter((node) => incoming.get(node.id)!.length + outgoing.get(node.id)!.length === 0) : [],
    hasCycle,
    depth: hasCycle ? 0 : Math.max(0, ...levelCounts.keys()),
    parallelism: hasCycle ? 0 : Math.max(0, ...levelCounts.values()),
    kinds,
    order: hasCycle ? nodes : orderIds.map((id) => byId.get(id)!)
  };
};

export type FindingType = 'structure' | 'performance' | 'cost' | 'reliability' | 'security';
export type Priority = 'haute' | 'moyenne' | 'basse';

export interface Finding {
  id: string;
  type: FindingType;
  title: string;
  description: string;
  priority: Priority;
  /** Correction automatique disponible dans l'éditeur. */
  fix?: 'remove-isolated';
}

/** Longueur au-delà de laquelle une chaîne d'étapes successives mérite d'être questionnée. */
const LONG_CHAIN = 6;

export const analyzeWorkflow = (nodes: Node[], edges: Edge[]): { stats: WorkflowStats; findings: Finding[] } => {
  const stats = computeStats(nodes, edges);
  const findings: Finding[] = [];
  if (nodes.length === 0) return { stats, findings };

  if (stats.hasCycle) {
    findings.push({
      id: 'cycle',
      type: 'reliability',
      title: 'Le graphe contient une boucle',
      description:
        "Une boucle peut tourner indéfiniment si aucune condition d'arrêt n'est prévue. Ajoutez un compteur de tentatives ou une condition de sortie.",
      priority: 'haute'
    });
  }

  if (stats.isolated.length > 0) {
    const names = stats.isolated.map(nodeLabel).join(', ');
    findings.push({
      id: 'isolated',
      type: 'structure',
      title: `${stats.isolated.length} nœud${stats.isolated.length > 1 ? 's' : ''} non relié${stats.isolated.length > 1 ? 's' : ''}`,
      description: `Ces nœuds ne participent à aucun traitement\u00A0: ${names}. Reliez-les au reste du graphe ou supprimez-les.`,
      priority: 'moyenne',
      fix: 'remove-isolated'
    });
  }

  if (!stats.hasCycle && stats.depth >= LONG_CHAIN) {
    findings.push({
      id: 'long-chain',
      type: 'performance',
      title: `Une chaîne de ${stats.depth} étapes successives`,
      description:
        "Chaque étape ajoute de la latence et un risque d'erreur. Regroupez des étapes, supprimez celles qui ne sont pas indispensables, ou exécutez en parallèle celles qui sont indépendantes.",
      priority: 'moyenne'
    });
  }

  if (stats.kinds.llm >= 3) {
    findings.push({
      id: 'many-llm',
      type: 'cost',
      title: `${stats.kinds.llm} étapes de traitement de texte par un modèle`,
      description:
        "Vérifiez que chaque appel est nécessaire, et réservez les plus gros modèles aux étapes difficiles\u00A0: les étapes simples (tri, reformatage) se contentent souvent d'un modèle plus petit. Comparez les tarifs dans le calculateur de coûts.",
      priority: 'moyenne'
    });
  }

  if (stats.kinds.llm + stats.kinds.image + stats.kinds.audio + stats.kinds.video > 0 && stats.kinds.logic === 0) {
    findings.push({
      id: 'no-check',
      type: 'reliability',
      title: 'Aucune étape de vérification',
      description:
        "La sortie d'un modèle peut être fausse ou hors sujet. Ajoutez une étape de contrôle (règles, validation humaine, seuil de confiance) avant d'utiliser le résultat.",
      priority: 'haute'
    });
  }

  if (stats.kinds.data > 0 && stats.kinds.llm + stats.kinds.image + stats.kinds.audio + stats.kinds.video > 0) {
    findings.push({
      id: 'data-flow',
      type: 'security',
      title: 'Des données circulent vers un modèle',
      description:
        "Vérifiez ce qui est transmis au modèle, surtout s'il est hébergé par un tiers\u00A0: données personnelles, informations confidentielles, base légale (RGPD). Minimisez et anonymisez quand c'est possible.",
      priority: 'moyenne'
    });
  }

  return { stats, findings };
};
