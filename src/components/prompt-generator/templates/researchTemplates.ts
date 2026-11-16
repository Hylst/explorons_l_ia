// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { PromptCategory, PromptTemplate } from '../promptTemplatesData';

export const researchTemplates: PromptTemplate[] = [
  {
    id: 'academic-research',
    name: 'Recherche académique',
    description: 'Analyse de littérature scientifique et synthèse de recherche',
    category: 'recherche',
    domain: 'Recherche Académique',
    template: `Tu es un chercheur académique expert spécialisé en {domaine_recherche}.

**CONTEXTE :**
Domaine de recherche : {domaine_recherche}
Question de recherche : {question_recherche}
Méthodologie souhaitée : {methodologie}

**MISSION :**
Conduis une analyse approfondie de la littérature sur {sujet_specifique}

**STRUCTURE DE L'ANALYSE :**
1. **État de l'art** - Synthèse des travaux existants
2. **Lacunes identifiées** - Gaps dans la recherche actuelle  
3. **Méthodologie recommandée** - Approches optimales
4. **Implications théoriques** - Contributions potentielles
5. **Directions futures** - Pistes de recherche

**CRITÈRES DE QUALITÉ :**
- Rigueur méthodologique
- Citations pertinentes
- Analyse critique
- Originalité des insights
- Applicabilité pratique

**LIVRABLES ATTENDUS :**
- Synthèse structurée (2000 mots)
- Bibliographie annotée limitée à des références dont tu es certain de l'existence (auteurs, année, revue) : si tu ne peux pas les vérifier, dis-le au lieu d'en inventer
- Recommandations méthodologiques
- Axes de développement futurs

Ton expertise en {domaine_recherche} doit transparaître dans chaque analyse.`,
    variables: [
      { name: 'domaine_recherche', type: 'text', label: 'Domaine de recherche', placeholder: 'Intelligence artificielle, psychologie...', required: true },
      { name: 'question_recherche', type: 'textarea', label: 'Question de recherche', placeholder: 'Question principale à explorer', required: true },
      { name: 'methodologie', type: 'select', label: 'Méthodologie', options: ['Quantitative', 'Qualitative', 'Mixte', 'Méta-analyse'], required: true },
      { name: 'sujet_specifique', type: 'text', label: 'Sujet spécifique', placeholder: 'Aspect particulier à analyser', required: true }
    ],
    tags: ['recherche', 'académique', 'analyse', 'littérature'],
  },
  {
    id: 'competitive-analysis',
    name: 'Analyse concurrentielle',
    description: 'Étude approfondie de la concurrence et positionnement marché',
    category: 'recherche',
    domain: 'Business Intelligence',
    template: `Tu es un analyste stratégique expert en intelligence économique et veille concurrentielle.

**CONTEXTE DE L'ANALYSE :**
Secteur d'activité : {secteur}
Entreprise étudiée : {entreprise}
Marché géographique : {marche_geo}
Période d'analyse : {periode}

**MISSION :**
Réalise une analyse concurrentielle de {entreprise} sur le marché {marche_geo} à partir d'informations publiques vérifiables : n'avance aucun chiffre (prix, parts de marché, investissements) dont tu ne peux pas citer la source, et indique 'non disponible' sinon

**FRAMEWORK D'ANALYSE :**
1. **Mapping concurrentiel** - Identification des acteurs clés
2. **Analyse SWOT comparative** - Forces/faiblesses vs concurrence
3. **Stratégies différenciatrices** - Positionnements uniques
4. **Analyse des prix** - Grilles tarifaires et stratégies pricing
5. **Innovation & R&D** - Investissements et développements
6. **Parts de marché** - Évolution et tendances
7. **Stratégies marketing** - Canaux et messages
8. **Opportunités identifiées** - Niches inexploitées

**MÉTHODOLOGIE :**
- Sources primaires et secondaires
- Analyse quantitative et qualitative
- Benchmarking multi-critères
- Veille technologique
- Étude des brevets et innovations

**LIVRABLES :**
- Rapport d'analyse structuré
- Matrices de positionnement
- Recommandations stratégiques
- Plan d'action différenciation

Applique ton expertise en {secteur} pour des insights actionnables.`,
    variables: [
      { name: 'secteur', type: 'text', label: 'Secteur d\'activité', placeholder: 'Tech, automobile, finance...', required: true },
      { name: 'entreprise', type: 'text', label: 'Entreprise étudiée', placeholder: 'Nom de l\'entreprise à analyser', required: true },
      { name: 'marche_geo', type: 'select', label: 'Marché géographique', options: ['Local', 'National', 'Européen', 'International'], required: true },
      { name: 'periode', type: 'select', label: 'Période d\'analyse', options: ['3 mois', '6 mois', '1 an', '2 ans'], required: true }
    ],
    tags: ['concurrence', 'stratégie', 'marché', 'business'],
  },
  {
    id: 'trend-analysis',
    name: 'Analyse de tendances',
    description: 'Identification et analyse des tendances émergentes',
    category: 'recherche',
    domain: 'Prospective',
    template: `Tu es un futurologue et analyste de tendances expert en prospective stratégique.

**PÉRIMÈTRE D'ANALYSE :**
Secteur focus : {secteur_focus}
Horizon temporel : {horizon_temporel}
Zone géographique : {zone_geo}
Thématiques : {thematiques}

**OBJECTIF :**
Identifie et analyse les tendances émergentes impactant {secteur_focus} à horizon {horizon_temporel}

**MÉTHODOLOGIE DE VEILLE :**
1. **Signaux faibles** - Détection précoce des changements
2. **Macro-tendances** - Mouvements structurels majeurs  
3. **Micro-tendances** - Évolutions sectorielles spécifiques
4. **Tendances disruptives** - Innovations de rupture
5. **Cycles de vie** - Maturité et adoption des tendances

**GRILLE D'ANALYSE :**
- **Impact potentiel** (Faible/Moyen/Fort)
- **Plausibilité** (faible/moyenne/forte, avec justification)
- **Délai d'émergence** (Court/Moyen/Long terme)
- **Facteurs d'accélération** - Catalyseurs identifiés
- **Freins potentiels** - Obstacles à l'adoption
- **Acteurs clés** - Organisations influentes
- **Implications sectorielles** - Transformations attendues

**SOURCES DE VEILLE :**
- Recherche académique
- Brevets et innovations
- Investissements VC/startup
- Réglementations émergentes
- Comportements consommateurs
- Technologies émergentes

**LIVRABLES :**
- Radar des tendances
- Fiches d'analyse détaillées  
- Scénarios prospectifs
- Recommandations stratégiques

Propose des scénarios prospectifs argumentés, en précisant leurs limites et leurs incertitudes.`,
    variables: [
      { name: 'secteur_focus', type: 'text', label: 'Secteur focus', placeholder: 'Intelligence artificielle, mobilité...', required: true },
      { name: 'horizon_temporel', type: 'select', label: 'Horizon temporel', options: ['1 an', '3 ans', '5 ans', '10 ans'], required: true },
      { name: 'zone_geo', type: 'select', label: 'Zone géographique', options: ['France', 'Europe', 'Amérique du Nord', 'Mondial'], required: true },
      { name: 'thematiques', type: 'textarea', label: 'Thématiques', placeholder: 'Technologies, usages, réglementations...', required: true }
    ],
    tags: ['tendances', 'prospective', 'innovation', 'futur'],
  }
];

export const researchCategories: PromptCategory[] = [
  {
    id: 'recherche',
    name: 'Recherche et analyse',
    description: 'Modèles pour la recherche académique et l\'analyse stratégique',
    icon: '🔬'
  }
];
