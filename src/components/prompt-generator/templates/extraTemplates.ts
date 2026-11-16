// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { PromptTemplate, PromptCategory } from '../promptTemplatesData';

export const extraCategories: PromptCategory[] = [
  {
    id: 'legal-compliance',
    name: 'Juridique et conformité',
    description: 'Modèles pour les aspects légaux et réglementaires',
    icon: 'Scale'
  },
  {
    id: 'scientific-research',
    name: 'Recherche scientifique',
    description: 'Modèles pour la recherche académique et scientifique',
    icon: 'Microscope'
  }
];

export const extraTemplates: PromptTemplate[] = [
  {
    id: 'legal-contract-analyzer',
    name: 'Analyseur de contrats juridiques',
    category: 'legal-compliance',
    domain: 'Droit',
    description: 'Analyse et révision de contrats avec points d\'attention juridiques',
    template: `Tu es un assistant de relecture de contrats. Analyse ce contrat à titre informatif (cette analyse ne constitue pas un conseil juridique et ne remplace pas un avocat) et signale les points à faire vérifier :

**CONTRAT À ANALYSER :**
Type de contrat : {contract_type}
Parties : {contract_parties}  
Juridiction : {jurisdiction}
Montant/Valeur : {contract_value}

**DOCUMENT CONTRACTUEL :**
"{contract_text}"

**ANALYSE JURIDIQUE COMPLÈTE :**

## ⚖️ STRUCTURE CONTRACTUELLE
### Éléments essentiels
- **Parties contractantes** - Identification et capacité
- **Objet du contrat** - Précision et légalité
- **Obligations réciproques** - Équilibre et clarté
- **Contreparties** - Adéquation et modalités

### Clauses clés
- **Conditions suspensives/résolutoires**
- **Garanties et responsabilités**
- **Force majeure**
- **Résiliation et extinction**

## 🔍 POINTS D'ATTENTION MAJEURS
### Risques juridiques identifiés
- **Clauses déséquilibrées** 
- **Ambiguïtés d'interprétation**
- **Lacunes contractuelles**
- **Non-conformités réglementaires**

### Conformité réglementaire
- **RGPD et données personnelles** : {gdpr_compliance}
- **Droit de la consommation** : {consumer_law}
- **Réglementation sectorielle** : {sector_regulation}
- **Droit du travail** : {labor_law_compliance}

## 📋 CLAUSES PROBLÉMATIQUES
### À modifier impérativement
1. **Clause X** - Problème identifié et solution
2. **Clause Y** - Risque et recommandation
3. **Clause Z** - Amélioration suggérée

### À négocier
- **Conditions de paiement**
- **Pénalités et intérêts de retard**  
- **Limitation de responsabilité**
- **Propriété intellectuelle**

## ✅ RECOMMANDATIONS PRIORITAIRES
### Modifications contractuelles
- **Ajouts nécessaires**
- **Suppressions recommandées**  
- **Reformulations conseillées**

### Négociation stratégique
- **Points non-négociables**
- **Marges de manœuvre**
- **Arguments juridiques**

## 📊 ÉVALUATION GLOBALE
- **Niveau de risque** : {risk_level}
- **Qualité rédactionnelle** : X/10
- **Équilibre contractuel** : X/10
- **Points à faire valider par un juriste avant toute signature**

**CONTEXTE SPÉCIALISÉ :**
- **Secteur d'activité** : {business_sector}
- **Droit applicable** : {applicable_law}
- **Particularités locales** : {local_specifics}`,
    variables: [
      { name: 'contract_type', type: 'select', label: 'Type de contrat', options: ['Vente', 'Prestation de services', 'Distribution', 'Licence', 'Partenariat', 'Travail', 'Bail'], required: true },
      { name: 'contract_parties', type: 'text', label: 'Parties contractantes', placeholder: 'Entreprise A et Entreprise B', required: true },
      { name: 'jurisdiction', type: 'select', label: 'Juridiction', options: ['France', 'Union Européenne', 'International', 'États-Unis', 'Royaume-Uni'], required: true },
      { name: 'contract_value', type: 'text', label: 'Valeur du contrat', placeholder: '100 000€, récurrent...', required: false },
      { name: 'contract_text', type: 'textarea', label: 'Texte du contrat', placeholder: 'Coller le contrat à analyser...', required: true },
      { name: 'gdpr_compliance', type: 'select', label: 'Conformité RGPD', options: ['Critique', 'Important', 'Standard', 'Non applicable'], required: true },
      { name: 'consumer_law', type: 'select', label: 'Droit consommation', options: ['Applicable', 'Partiellement', 'Non applicable'], required: true },
      { name: 'sector_regulation', type: 'text', label: 'Réglementation sectorielle', placeholder: 'Banque, santé, télécoms...', required: false },
      { name: 'labor_law_compliance', type: 'select', label: 'Conformité droit travail', options: ['Critique', 'Important', 'Non applicable'], required: false },
      { name: 'risk_level', type: 'select', label: 'Niveau de risque attendu', options: ['Faible', 'Modéré', 'Élevé', 'Critique'], required: true },
      { name: 'business_sector', type: 'select', label: 'Secteur d\'activité', options: ['Technologie', 'Commerce', 'Services', 'Industrie', 'Santé', 'Finance'], required: true },
      { name: 'applicable_law', type: 'select', label: 'Droit applicable', options: ['Droit français', 'Droit européen', 'Common law', 'Droit international'], required: true },
      { name: 'local_specifics', type: 'text', label: 'Spécificités locales', placeholder: 'Particularités juridiques locales...', required: false }
    ],
    tags: ['Juridique', 'Contrats', 'Analyse', 'Conformité'],
  },
  {
    id: 'scientific-paper-analyzer',
    name: 'Analyseur d\'articles scientifiques',
    category: 'scientific-research',
    domain: 'Recherche',
    description: 'Analyse critique d\'articles scientifiques et de publications de recherche',
    template: `Tu es un relecteur scientifique attentif à la méthode dans le domaine {research_field}. Analyse cet article de manière critique, sans présenter tes notes comme une évaluation officielle ni comme un avis médical :

**ARTICLE À ANALYSER :**
- Titre : {paper_title}
- Domaine : {research_field}
- Journal : {journal_name}
- Méthodologie : {methodology_type}
- Niveau d'analyse : {analysis_depth}

**TEXTE DE L'ARTICLE :**
"{paper_content}"

**ANALYSE SCIENTIFIQUE CRITIQUE :**

## 📊 ÉVALUATION MÉTHODOLOGIQUE

### Protocole expérimental
- **Design de l'étude** : {study_design}
- **Rigueur méthodologique**
- **Taille et représentativité de l'échantillon**
- **Contrôles et variables confondantes**
- **Biais potentiels identifiés**

### Validité statistique
- **Tests statistiques appropriés**
- **Puissance statistique**
- **Significativité et pertinence clinique**
- **Gestion des données manquantes**
- **Reproductibilité des analyses**

## 🔬 CONTRIBUTION SCIENTIFIQUE

### Originalité et innovation
- **Nouveauté des résultats**
- **Avancée par rapport à l'état de l'art**
- **Implications théoriques**
- **Applications pratiques potentielles**

### Positionnement dans la littérature
- **Références bibliographiques pertinentes**
- **Lacunes dans la revue de littérature**
- **Contextualisation des résultats**
- **Comparaison avec études similaires**

## ⚡ FORCES ET FAIBLESSES

### Points forts
- **Aspects méthodologiques solides**
- **Résultats robustes**
- **Interprétations justifiées**
- **Transparence et reproductibilité**

### Limitations identifiées
- **Biais méthodologiques**
- **Limites de généralisation**
- **Analyses manquantes**
- **Surinterprétation des résultats**

## 🎯 IMPLICATIONS ET PERSPECTIVES

### Impact potentiel
- **Domaine de recherche** : {impact_field}
- **Applications cliniques/pratiques**
- **Politiques publiques**
- **Recherche future**

### Recommandations
- **Études complémentaires nécessaires**
- **Améliorations méthodologiques**
- **Collaborations suggérées**
- **Financement et ressources**

## 📋 ÉVALUATION GLOBALE

### Scores d'évaluation
- **Rigueur méthodologique** : X/10
- **Originalité** : X/10  
- **Clarté de présentation** : X/10
- **Impact potentiel** : X/10
- **Note globale** : X/10

### Recommandation éditoriale
- **Acceptation** : Oui/Non/Avec révisions
- **Révisions majeures/mineures**
- **Points à adresser prioritairement**

**EXPERTISE SPÉCIALISÉE :**
Domaine : {research_field}
Sous-spécialité : {subspecialty}
Standards du domaine : {field_standards}`,
    variables: [
      { name: 'paper_title', type: 'text', label: 'Titre de l\'article', placeholder: 'Titre complet de la publication...', required: true },
      { name: 'research_field', type: 'select', label: 'Domaine de recherche', options: ['Médecine', 'Biologie', 'Physique', 'Chimie', 'Informatique', 'Psychologie', 'Économie', 'Sociologie'], required: true },
      { name: 'journal_name', type: 'text', label: 'Nom du journal', placeholder: 'Nature, Science, NEJM...', required: false },
      { name: 'methodology_type', type: 'select', label: 'Type de méthodologie', options: ['Expérimentale', 'Observationnelle', 'Méta-analyse', 'Revue systématique', 'Cas clinique', 'Théorique'], required: true },
      { name: 'analysis_depth', type: 'select', label: 'Profondeur d\'analyse', options: ['Rapide', 'Standard', 'Approfondie', 'Expert'], required: true },
      { name: 'paper_content', type: 'textarea', label: 'Contenu de l\'article', placeholder: 'Résumé ou texte complet de l\'article...', required: true },
      { name: 'study_design', type: 'select', label: 'Design d\'étude', options: ['RCT', 'Cohorte', 'Cas-témoin', 'Transversale', 'Qualitative', 'Méthodes mixtes'], required: false },
      { name: 'impact_field', type: 'text', label: 'Domaine d\'impact', placeholder: 'Oncologie, IA, environnement...', required: false },
      { name: 'subspecialty', type: 'text', label: 'Sous-spécialité', placeholder: 'Cardiologie, machine learning...', required: false },
      { name: 'field_standards', type: 'text', label: 'Standards du domaine', placeholder: 'CONSORT, PRISMA, STROBE...', required: false }
    ],
    tags: ['Recherche', 'Science', 'Analyse', 'Publication'],
  },
  {
    id: 'gdpr-compliance-audit',
    name: 'Audit de conformité RGPD',
    category: 'legal-compliance',
    domain: 'Protection des données',
    description: 'Évalue la conformité RGPD et propose un plan d\'action',
    template: `Tu es un assistant qui aide à préparer une revue de conformité RGPD (règlement (UE) 2016/679). Cette revue est indicative et ne remplace ni un DPO ni un conseil juridique. Propose une liste de points à vérifier pour cette organisation :

**ORGANISATION À AUDITER :**
- Nom : {organization_name}
- Secteur : {business_sector}
- Taille : {organization_size}
- Traitement : {data_processing_type}
- Géographie : {geographic_scope}

**CONTEXTE ACTUEL :**
- Niveau de maturité : {current_maturity}
- Ressources dédiées : {dedicated_resources}
- Incidents antérieurs : {previous_incidents}
- Audits précédents : {previous_audits}

**AUDIT RGPD COMPLET :**

## 📋 DIAGNOSTIC DE CONFORMITÉ

### Licéité du traitement (Art. 6 RGPD)
- **Base légale identifiée** : {legal_basis}
- **Documentation des bases légales**
- **Consentement valide** (si applicable)
- **Intérêt légitime justifié** (si applicable)

### Principes fondamentaux (Art. 5 RGPD)
- **Licéité, loyauté, transparence**
- **Limitation des finalités** 
- **Minimisation des données**
- **Exactitude des données**
- **Limitation de conservation**
- **Intégrité et confidentialité**
- **Responsabilité (accountability)**

## 🔒 DROITS DES PERSONNES CONCERNÉES

### Droits implémentés
- **Information et transparence** (Art. 13-14)
- **Droit d'accès** (Art. 15)
- **Droit de rectification** (Art. 16)
- **Droit à l'effacement** (Art. 17)
- **Droit à la limitation** (Art. 18)
- **Droit à la portabilité** (Art. 20)
- **Droit d'opposition** (Art. 21)

### Processus d'exercice
- **Procédures en place** : {rights_procedures}
- **Délais de réponse** 
- **Formation des équipes**
- **Outils de gestion**

## 🛡️ SÉCURITÉ ET PROTECTION

### Mesures techniques et organisationnelles
- **Chiffrement des données** : {encryption_status}
- **Contrôles d'accès** : {access_controls}
- **Sauvegarde et récupération**
- **Détection des incidents**
- **Formation sensibilisation**

### Analyse d'impact (AIPD)
- **Traitements à risque élevé** : {high_risk_processing}
- **AIPD réalisées** : {pia_completed}
- **Mesures de mitigation**
- **Consultations CNIL**

## 📊 GOUVERNANCE DES DONNÉES

### Organisation
- **DPO désigné** : {dpo_designated}
- **Politique de protection des données**
- **Procédures documentées**
- **Registre des traitements** : {processing_register}

### Sous-traitance
- **Contrats de sous-traitance** : {subprocessor_contracts}
- **Due diligence des prestataires**
- **Clauses contractuelles types**
- **Audits sous-traitants**

## 🚨 NON-CONFORMITÉS IDENTIFIÉES

### Critiques (Risque élevé)
1. **Non-conformité X** - Impact et recommandation
2. **Non-conformité Y** - Action corrective urgente
3. **Non-conformité Z** - Mise en conformité

### Importantes (Risque modéré)
- **Points d'amélioration prioritaires**
- **Recommandations organisationnelles**
- **Optimisations techniques**

## 📅 PLAN D'ACTION RGPD

### Phase 1 - Urgences (0-3 mois)
- **Actions critiques immédiates**
- **Ressources nécessaires** : {immediate_resources}
- **Budget estimé** : {immediate_budget}

### Phase 2 - Consolidation (3-12 mois)
- **Projets structurants**
- **Formation et sensibilisation**
- **Amélioration continue**

### Phase 3 - Optimisation (12+ mois)
- **Privacy by design**
- **Automatisation**
- **Certification/Codes de conduite**

## 💰 ANALYSE COÛTS/RISQUES
- **Coût de mise en conformité** : {compliance_cost}
- **Risque d'amende** : {fine_risk}
- **ROI de la conformité**
- **Avantages concurrentiels**

**SPÉCIFICITÉS SECTORIELLES :**
Secteur : {business_sector}
Réglementations complémentaires : {additional_regulations}
Bonnes pratiques métier : {industry_best_practices}`,
    variables: [
      { name: 'organization_name', type: 'text', label: 'Nom organisation', placeholder: 'Entreprise ABC', required: true },
      { name: 'business_sector', type: 'select', label: 'Secteur d\'activité', options: ['E-commerce', 'Santé', 'Finance', 'Éducation', 'Technologie', 'RH/Recrutement', 'Marketing'], required: true },
      { name: 'organization_size', type: 'select', label: 'Taille organisation', options: ['<50 employés', '50-250 employés', '250-5000 employés', '>5000 employés'], required: true },
      { name: 'data_processing_type', type: 'select', label: 'Type de traitement', options: ['Clients B2C', 'Données RH', 'Marketing digital', 'Données sensibles', 'Profilage', 'IA/ML'], required: true },
      { name: 'geographic_scope', type: 'select', label: 'Portée géographique', options: ['France uniquement', 'Union Européenne', 'International'], required: true },
      { name: 'current_maturity', type: 'select', label: 'Maturité actuelle', options: ['Débutant', 'Intermédiaire', 'Avancé', 'Expert'], required: true },
      { name: 'dedicated_resources', type: 'select', label: 'Ressources dédiées', options: ['Aucune', 'Temps partiel', 'DPO interne', 'Équipe dédiée'], required: true },
      { name: 'previous_incidents', type: 'select', label: 'Incidents antérieurs', options: ['Aucun', 'Incidents mineurs', 'Violation notifiée', 'Sanctions'], required: true },
      { name: 'previous_audits', type: 'select', label: 'Audits précédents', options: ['Jamais audité', 'Audit interne', 'Audit externe', 'Contrôle CNIL'], required: true },
      { name: 'legal_basis', type: 'select', label: 'Base légale principale', options: ['Consentement', 'Contrat', 'Intérêt légitime', 'Obligation légale', 'Intérêt vital', 'Mission service public'], required: true },
      { name: 'rights_procedures', type: 'select', label: 'Procédures droits personnes', options: ['Inexistantes', 'Basiques', 'Structurées', 'Optimisées'], required: true },
      { name: 'encryption_status', type: 'select', label: 'Statut chiffrement', options: ['Aucun', 'Partiel', 'Standard', 'Renforcé'], required: true },
      { name: 'access_controls', type: 'select', label: 'Contrôles d\'accès', options: ['Basiques', 'Standard', 'Avancés', 'Zero-trust'], required: true },
      { name: 'high_risk_processing', type: 'text', label: 'Traitements à risque élevé', placeholder: 'Profilage, données sensibles, surveillance...', required: false },
      { name: 'pia_completed', type: 'select', label: 'AIPD réalisées', options: ['Aucune', 'Partielles', 'Complètes', 'Régulièrement mises à jour'], required: true },
      { name: 'dpo_designated', type: 'select', label: 'DPO désigné', options: ['Non', 'En cours', 'Interne', 'Externe'], required: true },
      { name: 'processing_register', type: 'select', label: 'Registre traitements', options: ['Inexistant', 'Partiel', 'Complet', 'À jour'], required: true },
      { name: 'subprocessor_contracts', type: 'select', label: 'Contrats sous-traitants', options: ['Non conformes', 'Partiellement', 'Conformes', 'Optimisés'], required: true },
      { name: 'immediate_resources', type: 'text', label: 'Ressources immédiates', placeholder: '1 ETP juridique, consultant externe...', required: false },
      { name: 'immediate_budget', type: 'text', label: 'Budget immédiat', placeholder: '50K€, 100K€...', required: false },
      { name: 'compliance_cost', type: 'text', label: 'Coût mise en conformité', placeholder: 'Estimation globale...', required: false },
      { name: 'fine_risk', type: 'select', label: 'Risque d\'amende', options: ['Faible', 'Modéré', 'Élevé', 'Très élevé'], required: true },
      { name: 'additional_regulations', type: 'text', label: 'Réglementations complémentaires', placeholder: 'HDS, PCI-DSS, SOX...', required: false },
      { name: 'industry_best_practices', type: 'text', label: 'Bonnes pratiques secteur', placeholder: 'Standards et certifications du secteur...', required: false }
    ],
    tags: ['RGPD', 'Conformité', 'Protection données', 'Audit'],
  }
];
