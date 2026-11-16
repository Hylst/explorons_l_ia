// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Noms officiels et routes des neuf outils du site : source unique pour la fiche d'outil (toolsData), les titres
// de page (seoData) et les liens. Un nom se change ici, nulle part ailleurs.
// Fichier aussi exécuté par Node au build (seoData.ts l'importe) : aucun import, aucune API propre à Vite.

export interface SiteTool {
  /** Nom affiché, en minuscules à la française (seul le premier mot prend une majuscule). */
  name: string;
  /** Route interne, avec slash initial (sans le sous-chemin du site). */
  path: string;
}

export const TOOLS = {
  costCalculator: { name: "Calculateur de coûts d'API IA", path: '/calculateur-couts-ia' },
  modelComparator: { name: "Comparateur de modèles d'IA", path: '/comparateur-modeles-ia' },
  promptGenerator: { name: 'Générateur de prompts', path: '/generateur-prompts' },
  trainingSimulator: { name: "Simulateur d'entraînement IA", path: '/simulateur-ia' },
  contentDetector: { name: 'Détecteur de contenu IA', path: '/detecteur-contenu-ia' },
  workflowOptimizer: { name: 'Optimiseur de workflow IA', path: '/optimiseur-workflow-ia' },
  datasetAnalyzer: { name: 'Analyseur de jeu de données', path: '/analyseur-donnees' },
  syntheticDataGenerator: { name: 'Générateur de données synthétiques', path: '/generateur-donnees' },
  biasAuditor: { name: 'Auditeur de biais', path: '/auditeur-biais' },
} as const satisfies Record<string, SiteTool>;
