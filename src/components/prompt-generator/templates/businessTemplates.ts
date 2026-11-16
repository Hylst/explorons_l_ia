// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { PromptTemplate, PromptCategory } from '../promptTemplatesData';

export const businessCategories: PromptCategory[] = [
  {
    id: 'business-strategy',
    name: 'Stratégie d\'entreprise',
    description: 'Modèles pour la planification stratégique',
    icon: 'Target'
  },
  {
    id: 'business-operations',
    name: 'Opérations',
    description: 'Modèles pour l\'optimisation opérationnelle',
    icon: 'Settings'
  },
  {
    id: 'business-marketing',
    name: 'Marketing et ventes',
    description: 'Modèles pour le marketing et les ventes',
    icon: 'TrendingUp'
  }
];

export const businessTemplates: PromptTemplate[] = [
  {
    id: 'business-plan-creator',
    name: 'Créateur de business plan',
    category: 'business-strategy',
    domain: 'Strategy',
    description: 'Génère un business plan structuré et professionnel',
    template: `Tu es un consultant en stratégie d'entreprise. Crée un business plan complet pour :

**INFORMATIONS DE BASE :**
- Nom de l'entreprise : {company_name}
- Secteur d'activité : {industry}
- Modèle économique : {business_model}
- Marché cible : {target_market}
- Financement recherché : {funding_needed}

**STRUCTURE DU BUSINESS PLAN :**

## 1. RÉSUMÉ EXÉCUTIF
- Vision et mission
- Proposition de valeur unique
- Facteurs clés de succès
- Demande de financement

## 2. ANALYSE DE MARCHÉ
- Taille du marché : {market_size}
- Tendances sectorielles
- Analyse concurrentielle
- Positionnement

## 3. OFFRE PRODUIT/SERVICE
- Description détaillée
- Avantages concurrentiels
- Propriété intellectuelle
- Roadmap développement

## 4. STRATÉGIE MARKETING
- Segmentation client : {customer_segments}
- Stratégie de prix : {pricing_strategy}
- Canaux de distribution
- Plan communication

## 5. ORGANISATION
- Équipe fondatrice
- Structure organisationnelle
- Besoins en recrutement
- Gouvernance

## 6. PLAN FINANCIER
- Projections sur {projection_years} ans
- Compte de résultat prévisionnel
- Plan de trésorerie
- Hypothèses financières

## 7. ANALYSE DES RISQUES
- Risques identifiés
- Plans de mitigation
- Scénarios alternatifs

**CONTEXTE SPÉCIFIQUE :**
- Phase de développement : {development_stage}
- Géographie : {geographic_scope}
- Objectifs à 3 ans : {three_year_goals}`,
    variables: [
      { name: 'company_name', type: 'text', label: 'Nom de l\'entreprise', placeholder: 'Nom de votre projet (exemple fictif)', required: true },
      { name: 'industry', type: 'select', label: 'Secteur d\'activité', options: ['Technologie', 'Santé', 'Finance', 'E-commerce', 'Industrie', 'Services', 'Alimentation et boissons'], required: true },
      { name: 'business_model', type: 'select', label: 'Modèle économique', options: ['SaaS/Abonnement', 'Place de marché', 'E-commerce', 'Service traditionnel', 'Freemium', 'Licence'], required: true },
      { name: 'target_market', type: 'text', label: 'Marché cible', placeholder: 'PME françaises, particuliers 25-45 ans...', required: true },
      { name: 'funding_needed', type: 'select', label: 'Financement recherché', options: ['< 100K€', '100K-500K€', '500K-1M€', '1M-5M€', '> 5M€'], required: true },
      { name: 'market_size', type: 'text', label: 'Taille du marché', placeholder: '500M€ en France, croissance 15%/an', required: true },
      { name: 'customer_segments', type: 'textarea', label: 'Segments clients', placeholder: 'Segment 1: PME tech, Segment 2: Grandes entreprises...', required: true },
      { name: 'pricing_strategy', type: 'select', label: 'Stratégie de prix', options: ['Premium', 'Compétitif', 'Pénétration', 'Basée sur la valeur', 'Freemium'], required: true },
      { name: 'projection_years', type: 'select', label: 'Années de projection', options: ['3 ans', '5 ans'], required: true },
      { name: 'development_stage', type: 'select', label: 'Phase de développement', options: ['Idée/Concept', 'MVP', 'Lancement', 'Croissance', 'Expansion'], required: true },
      { name: 'geographic_scope', type: 'select', label: 'Portée géographique', options: ['Local', 'National', 'Européen', 'International'], required: true },
      { name: 'three_year_goals', type: 'textarea', label: 'Objectifs à 3 ans', placeholder: 'CA de 5M€, 50 employés, leader sur le marché français...', required: true }
    ],
    tags: ['Business Plan', 'Stratégie', 'Financement', 'Startup'],
  },
  {
    id: 'swot-analysis-expert',
    name: 'Analyse SWOT',
    category: 'business-strategy',
    domain: 'Strategic Analysis',
    description: 'Analyse SWOT complète et actionnable',
    template: `Tu es un analyste stratégique expert. Réalise une analyse SWOT approfondie pour :

**CONTEXTE DE L'ANALYSE :**
- Organisation : {organization_name}
- Secteur : {industry_sector}
- Objectif d'analyse : {analysis_objective}
- Horizon temporel : {time_horizon}

**ANALYSE SWOT COMPLÈTE :**

## 🔵 FORCES (Strengths)
### Internes - Avantages actuels
- **Opérationnelles :** {operational_strengths}
- **Humaines :** {human_resources_strengths}
- **Financières :** {financial_strengths}
- **Technologiques :** {tech_strengths}
- **Market position :** {market_position}

## 🔴 FAIBLESSES (Weaknesses)  
### Internes - Points d'amélioration
- **Lacunes opérationnelles**
- **Contraintes ressources**
- **Gaps compétences**
- **Limitations technologiques**
- **Positionnement marché**

## 🟢 OPPORTUNITÉS (Opportunities)
### Externes - Potentiel à saisir
- **Évolutions marché :** {market_trends}
- **Innovations technologiques**
- **Changements réglementaires**
- **Nouveaux segments**
- **Partenariats potentiels**

## 🟡 MENACES (Threats)
### Externes - Risques à anticiper
- **Concurrence :** {competitive_threats}
- **Évolutions sectorielles**
- **Risques économiques**
- **Changements réglementaires**
- **Disruptions technologiques**

## 📊 MATRICE CROISÉE
### Stratégies SO (Forces × Opportunités)
- Maximiser les forces pour saisir les opportunités

### Stratégies WO (Faiblesses × Opportunités)  
- Corriger les faiblesses pour exploiter les opportunités

### Stratégies ST (Forces × Menaces)
- Utiliser les forces pour contrer les menaces

### Stratégies WT (Faiblesses × Menaces)
- Minimiser les faiblesses face aux menaces

## 🎯 PLAN D'ACTION PRIORITAIRE
- **Actions immédiates (0-3 mois)**
- **Projets moyen terme (3-12 mois)**  
- **Initiatives long terme (1-3 ans)**

**FOCUS SECTORIEL :** {industry_focus}
**CONTEXTE CONCURRENTIEL :** {competitive_context}`,
    variables: [
      { name: 'organization_name', type: 'text', label: 'Nom organisation', placeholder: 'Mon entreprise, division X...', required: true },
      { name: 'industry_sector', type: 'select', label: 'Secteur d\'activité', options: ['Technologie', 'Industrie', 'Services', 'Commerce de détail', 'Santé', 'Finance', 'Agriculture'], required: true },
      { name: 'analysis_objective', type: 'select', label: 'Objectif d\'analyse', options: ['Stratégie générale', 'Lancement produit', 'Expansion marché', 'Transformation digitale', 'Optimisation'], required: true },
      { name: 'time_horizon', type: 'select', label: 'Horizon temporel', options: ['Court terme (1 an)', 'Moyen terme (3 ans)', 'Long terme (5+ ans)'], required: true },
      { name: 'operational_strengths', type: 'textarea', label: 'Forces opérationnelles', placeholder: 'Processus efficaces, qualité produit, supply chain...', required: true },
      { name: 'human_resources_strengths', type: 'textarea', label: 'Forces RH', placeholder: 'Équipe experte, culture forte, leadership...', required: true },
      { name: 'financial_strengths', type: 'textarea', label: 'Forces financières', placeholder: 'Trésorerie solide, rentabilité, accès financement...', required: true },
      { name: 'tech_strengths', type: 'textarea', label: 'Forces technologiques', placeholder: 'Innovation, R&D, infrastructure IT...', required: true },
      { name: 'market_position', type: 'text', label: 'Position marché', placeholder: 'Leader, challenger, niche...', required: true },
      { name: 'market_trends', type: 'textarea', label: 'Tendances de marché', placeholder: 'Croissance secteur, nouveaux besoins, digitalisation...', required: true },
      { name: 'competitive_threats', type: 'textarea', label: 'Menaces concurrentielles', placeholder: 'Nouveaux entrants, guerre des prix, disruption...', required: true },
      { name: 'industry_focus', type: 'text', label: 'Focus sectoriel', placeholder: 'Spécificités et enjeux du secteur...', required: false },
      { name: 'competitive_context', type: 'text', label: 'Contexte concurrentiel', placeholder: 'Intensité concurrence, barrières à l\'entrée...', required: false }
    ],
    tags: ['SWOT', 'Analyse stratégique', 'Planning', 'Business'],
  },
  {
    id: 'marketing-campaign-planner',
    name: 'Planificateur de campagne marketing',
    category: 'business-marketing',
    domain: 'Marketing',
    description: 'Crée des campagnes marketing complètes et efficaces',
    template: `Tu es un expert en marketing digital et traditionnel. Conçois une campagne marketing complète :

**BRIEF CAMPAGNE :**
- Marque/Produit : {brand_product}
- Objectif principal : {campaign_objective}
- Budget total : {total_budget}
- Durée : {campaign_duration}
- Marché cible : {target_market}

**ANALYSE STRATÉGIQUE :**
- Public cible : {target_audience}
- Positionnement : {brand_positioning}
- Message clé : {key_message}
- Tonalité : {brand_tone}

**MIX MARKETING :**

## 📱 DIGITAL (part du budget à définir)
### Social Media
- **Plateformes :** {social_platforms}
- **Contenu :** {content_strategy}
- **Influenceurs :** {influencer_strategy}

### Publicité Digitale
- **Google Ads :** {google_ads_strategy}
- **Facebook/Meta Ads :** {meta_ads_strategy}
- **Autres canaux :** {other_digital_channels}

## 📺 TRADITIONNEL (part du budget à définir)
- **TV/Radio :** {traditional_media}
- **Print :** {print_strategy}
- **Outdoor :** {outdoor_strategy}

**CALENDRIER CAMPAGNE :**
- **Phase 1 - Teasing :** {teasing_phase}
- **Phase 2 - Lancement :** {launch_phase}
- **Phase 3 - Amplification :** {amplification_phase}
- **Phase 4 - Clôture :** {closing_phase}

**MESURE PERFORMANCE :**
- **KPIs principaux :** {primary_kpis}
- **Outils de tracking :** {tracking_tools}
- **Objectifs chiffrés :** {numerical_targets}

**GESTION DES RISQUES :**
- **Risques identifiés :** {identified_risks}
- **Plans de contingence :** {contingency_plans}

**RECOMMANDATIONS CRÉATIVES :**
- **Concept créatif :** {creative_concept}
- **Assets nécessaires :** {required_assets}
- **Production timeline :** {production_schedule}`,
    variables: [
      { name: 'brand_product', type: 'text', label: 'Marque/Produit', placeholder: 'Application de suivi budgétaire, baskets de running...', required: true },
      { name: 'campaign_objective', type: 'select', label: 'Objectif principal', options: ['Notoriété', 'Génération leads', 'Ventes directes', 'Lancement produit', 'Fidélisation', 'Repositionnement'], required: true },
      { name: 'total_budget', type: 'select', label: 'Budget total', options: ['< 10K€', '10K-50K€', '50K-100K€', '100K-500K€', '> 500K€'], required: true },
      { name: 'campaign_duration', type: 'select', label: 'Durée campagne', options: ['1 mois', '3 mois', '6 mois', '1 an'], required: true },
      { name: 'target_market', type: 'select', label: 'Marché cible', options: ['Local', 'National', 'Européen', 'International'], required: true },
      { name: 'target_audience', type: 'textarea', label: 'Public cible détaillé', placeholder: 'Femmes 25-40 ans, urbaines, CSP+, intéressées mode...', required: true },
      { name: 'brand_positioning', type: 'text', label: 'Positionnement', placeholder: 'Premium accessible, innovant, authentique...', required: true },
      { name: 'key_message', type: 'textarea', label: 'Message clé', placeholder: 'Le message principal à communiquer...', required: true },
      { name: 'brand_tone', type: 'select', label: 'Tonalité marque', options: ['Professionnel', 'Décontracté', 'Inspirant', 'Humoristique', 'Sophistiqué', 'Authentique'], required: true },
      { name: 'social_platforms', type: 'text', label: 'Plateformes sociales', placeholder: 'Instagram, TikTok, LinkedIn...', required: true },
      { name: 'content_strategy', type: 'select', label: 'Stratégie contenu', options: ['Contenu généré par les utilisateurs', 'Contenu de marque', 'Éducatif', 'Divertissement', 'Mix équilibré'], required: true },
      { name: 'influencer_strategy', type: 'select', label: 'Stratégie influenceurs', options: ['Macro-influenceurs', 'Micro-influenceurs', 'Nano-influenceurs', 'Mix', 'Pas d\'influenceurs'], required: true },
      { name: 'google_ads_strategy', type: 'select', label: 'Stratégie Google Ads', options: ['Search only', 'Display', 'Shopping', 'YouTube', 'Mix complet'], required: true },
      { name: 'meta_ads_strategy', type: 'select', label: 'Stratégie Meta Ads', options: ['Facebook focus', 'Instagram focus', 'Multi-plateformes', 'Remarketing'], required: true },
      { name: 'other_digital_channels', type: 'text', label: 'Autres canaux digitaux', placeholder: 'LinkedIn, TikTok, programmatique...', required: false },
      { name: 'traditional_media', type: 'select', label: 'Médias traditionnels', options: ['TV nationale', 'Radio locale', 'Mix TV/Radio', 'Pas de média traditionnel'], required: false },
      { name: 'print_strategy', type: 'select', label: 'Stratégie print', options: ['Presse nationale', 'Magazines spécialisés', 'Presse locale', 'Pas de print'], required: false },
      { name: 'outdoor_strategy', type: 'select', label: 'Stratégie outdoor', options: ['Affichage urbain', 'Transport', 'Digital outdoor', 'Pas d\'outdoor'], required: false },
      { name: 'teasing_phase', type: 'text', label: 'Phase teasing', placeholder: 'Durée et actions de la phase teasing...', required: true },
      { name: 'launch_phase', type: 'text', label: 'Phase lancement', placeholder: 'Actions de lancement intensif...', required: true },
      { name: 'amplification_phase', type: 'text', label: 'Phase amplification', placeholder: 'Maintien et amplification du message...', required: true },
      { name: 'closing_phase', type: 'text', label: 'Phase clôture', placeholder: 'Actions de conclusion et bilan...', required: true },
      { name: 'primary_kpis', type: 'textarea', label: 'KPIs principaux', placeholder: 'Reach, CTR, conversions, ROAS...', required: true },
      { name: 'tracking_tools', type: 'text', label: 'Outils de tracking', placeholder: 'Outil d\'analyse d\'audience, pixel de suivi publicitaire, paramètres UTM...', required: true },
      { name: 'numerical_targets', type: 'textarea', label: 'Objectifs chiffrés', placeholder: '1M impressions, 10K leads, ROAS 4:1...', required: true },
      { name: 'identified_risks', type: 'textarea', label: 'Risques identifiés', placeholder: 'Réaction concurrence, bad buzz, saisonnalité...', required: false },
      { name: 'contingency_plans', type: 'textarea', label: 'Plans de contingence', placeholder: 'Actions en cas de problème...', required: false },
      { name: 'creative_concept', type: 'textarea', label: 'Concept créatif', placeholder: 'L\'idée créative centrale de la campagne...', required: true },
      { name: 'required_assets', type: 'textarea', label: 'Assets nécessaires', placeholder: 'Photos, vidéos, graphiques, textes...', required: true },
      { name: 'production_schedule', type: 'text', label: 'Planning production', placeholder: 'Timeline de création des contenus...', required: true }
    ],
    tags: ['Marketing', 'Campagne', 'Digital', 'Stratégie'],
  },
  {
    id: 'roi-calculator-business',
    name: 'Analyse de ROI d\'un projet',
    category: 'business-operations',
    domain: 'Finance',
    description: 'Prompt pour structurer l\'analyse du retour sur investissement d\'un projet (refaites les calculs dans un tableur : un modèle de langage peut se tromper)',
    template: `Tu es un analyste financier expert. Calcule et analyse le ROI de ce projet :

**PROJET À ANALYSER :**
- Nom du projet : {project_name}
- Type d'investissement : {investment_type}
- Montant investissement : {investment_amount}
- Durée d'analyse : {analysis_period}
- Secteur : {business_sector}

**COÛTS DÉTAILLÉS :**
- **Investissement initial :** {initial_investment}
- **Coûts opérationnels annuels :** {operational_costs}
- **Coûts de maintenance :** {maintenance_costs}
- **Autres coûts :** {other_costs}

**BÉNÉFICES ATTENDUS :**
- **Augmentation revenus :** {revenue_increase}
- **Réduction coûts :** {cost_savings}
- **Gains productivité :** {productivity_gains}
- **Bénéfices intangibles :** {intangible_benefits}

**CALCULS ROI :**

## 📊 MÉTRIQUES FINANCIÈRES
### ROI Simple
- **Formule :** (Bénéfices - Investissement) / Investissement × 100
- **Calcul détaillé**
- **Résultat :** X% sur {analysis_period}

### ROI Annualisé
- **ROI moyen par an**
- **Variation annuelle**

### Autres Métriques
- **Payback Period :** {payback_calculation}
- **VAN (NPV) :** Avec taux {discount_rate}%
- **TRI (IRR) :** Taux de rentabilité interne

## 📈 ANALYSE TEMPORELLE
- **Année 1 :** Coûts vs Bénéfices
- **Année 2 :** Évolution
- **Année 3 :** Maturation
- **Années suivantes :** Optimisation

## ⚖️ ANALYSE DE SENSIBILITÉ
### Scénarios
- **Optimiste :** +20% bénéfices
- **Réaliste :** Hypothèses de base
- **Pessimiste :** -20% bénéfices

### Variables critiques
- **Impact de ±10% sur les revenus**
- **Impact de ±10% sur les coûts**
- **Seuil de rentabilité**

## 🎯 RECOMMANDATIONS
- **Viabilité du projet**
- **Points d'attention**
- **Optimisations possibles**
- **Comparaison alternatives**

**CONTEXTE MARCHÉ :** {market_context}
**FACTEURS DE RISQUE :** {risk_factors}`,
    variables: [
      { name: 'project_name', type: 'text', label: 'Nom du projet', placeholder: 'Transformation digitale, nouveau produit...', required: true },
      { name: 'investment_type', type: 'select', label: 'Type d\'investissement', options: ['Technologie/IT', 'Marketing/Ventes', 'RH/Formation', 'Infrastructure', 'R&D', 'Expansion'], required: true },
      { name: 'investment_amount', type: 'text', label: 'Montant investissement', placeholder: '100 000€', required: true },
      { name: 'analysis_period', type: 'select', label: 'Période d\'analyse', options: ['1 an', '2 ans', '3 ans', '5 ans'], required: true },
      { name: 'business_sector', type: 'select', label: 'Secteur business', options: ['Technologie', 'Industrie', 'Services', 'Commerce de détail', 'Santé', 'Finance'], required: true },
      { name: 'initial_investment', type: 'text', label: 'Investissement initial', placeholder: 'Détail des coûts initiaux...', required: true },
      { name: 'operational_costs', type: 'text', label: 'Coûts opérationnels', placeholder: '20 000€/an - licences, maintenance...', required: true },
      { name: 'maintenance_costs', type: 'text', label: 'Coûts de maintenance', placeholder: '5 000€/an - support, mises à jour...', required: false },
      { name: 'other_costs', type: 'text', label: 'Autres coûts', placeholder: 'Formation, consulting...', required: false },
      { name: 'revenue_increase', type: 'text', label: 'Augmentation revenus', placeholder: '50 000€/an - nouveaux clients, prix...', required: true },
      { name: 'cost_savings', type: 'text', label: 'Réduction coûts', placeholder: '30 000€/an - automatisation, efficacité...', required: true },
      { name: 'productivity_gains', type: 'text', label: 'Gains productivité', placeholder: 'Équivalent 0,5 ETP économisé...', required: false },
      { name: 'intangible_benefits', type: 'textarea', label: 'Bénéfices intangibles', placeholder: 'Satisfaction client, image marque, agilité...', required: false },
      { name: 'payback_calculation', type: 'select', label: 'Méthode payback', options: ['Simple', 'Actualisé', 'Les deux'], required: true },
      { name: 'discount_rate', type: 'select', label: 'Taux d\'actualisation', options: ['5%', '8%', '10%', '12%'], required: true },
      { name: 'market_context', type: 'textarea', label: 'Contexte marché', placeholder: 'Tendances, concurrence, opportunités...', required: false },
      { name: 'risk_factors', type: 'textarea', label: 'Facteurs de risque', placeholder: 'Risques pouvant impacter le ROI...', required: false }
    ],
    tags: ['ROI', 'Finance', 'Analyse', 'Investissement'],
  },
  {
    id: 'crisis-communication-plan',
    name: 'Plan de communication de crise',
    category: 'business-operations',
    domain: 'Communication',
    description: 'Crée un plan de gestion de communication de crise',
    template: `Tu es un expert en communication de crise. Élabore un plan complet de gestion de crise :

**CONTEXTE DE LA CRISE :**
- Type de crise : {crisis_type}
- Secteur d'activité : {industry}
- Taille organisation : {organization_size}
- Niveau de gravité : {severity_level}
- Parties prenantes : {stakeholders}

**ANALYSE DE SITUATION :**
- **Origine de la crise :** {crisis_origin}
- **Impact potentiel :** {potential_impact}
- **Urgence temporelle :** {time_urgency}
- **Ampleur médiatique :** {media_exposure}

**PLAN DE COMMUNICATION :**

## 🚨 PHASE 1 - RÉACTION IMMÉDIATE (0-2h)
### Actions prioritaires
- **Activation cellule de crise**
- **Évaluation situation**
- **Communication interne**
- **Veille médiatique**

### Messages clés
- **Reconnaissance des faits :** {fact_acknowledgment}
- **Empathie et responsabilité :** {empathy_statement}
- **Actions immédiates :** {immediate_actions}

## 📢 PHASE 2 - COMMUNICATION ACTIVE (2-24h)
### Stratégie de communication
- **Porte-parole désigné :** {spokesperson}
- **Ton et style :** {communication_tone}
- **Canaux prioritaires :** {priority_channels}

### Messages par audience
- **Employés :** {employee_message}
- **Clients :** {customer_message}
- **Médias :** {media_message}
- **Investisseurs :** {investor_message}
- **Autorités :** {authority_message}

## 🔄 PHASE 3 - SUIVI ET AJUSTEMENT (24h-1 semaine)
### Monitoring
- **Veille médiatique continue**
- **Analyse sentiment réseaux sociaux**
- **Remontées parties prenantes**

### Ajustements communication
- **Adaptation messages**
- **Nouvelles informations**
- **Réponses critiques**

## 📈 PHASE 4 - RECONSTRUCTION (1 semaine+)
### Stratégie de sortie de crise
- **Communication positive :** {positive_messaging}
- **Preuves d'amélioration**
- **Témoignages tiers**
- **Initiatives RSE**

**OUTILS ET RESSOURCES :**
- **Dark site préparé :** {dark_site_ready}
- **Templates de communiqués**
- **Listes de contacts médias**
- **Processus d'escalade**

**FORMATION ET PRÉPARATION :**
- **Media training porte-paroles**
- **Simulations de crise**
- **Mise à jour procédures**

**MESURE ET ANALYSE :**
- **KPIs de suivi :** {monitoring_kpis}
- **Outils de mesure**
- **Reporting régulier**

Prépare l'organisation à gérer efficacement la crise {crisis_type} dans le secteur {industry}.`,
    variables: [
      { name: 'crisis_type', type: 'select', label: 'Type de crise', options: ['Produit défaillant', 'Incident sécurité', 'Scandale RH', 'Cyberattaque', 'Accident industriel', 'Polémique publique', 'Faillite/Difficultés'], required: true },
      { name: 'industry', type: 'select', label: 'Secteur d\'activité', options: ['Agroalimentaire', 'Automobile', 'Technologie', 'Finance', 'Santé', 'Énergie', 'Transport'], required: true },
      { name: 'organization_size', type: 'select', label: 'Taille organisation', options: ['Startup (<50)', 'PME (50-250)', 'ETI (250-5000)', 'Grande entreprise (>5000)'], required: true },
      { name: 'severity_level', type: 'select', label: 'Niveau de gravité', options: ['Mineur', 'Modéré', 'Majeur', 'Critique'], required: true },
      { name: 'stakeholders', type: 'textarea', label: 'Parties prenantes', placeholder: 'Clients, employés, investisseurs, médias, autorités...', required: true },
      { name: 'crisis_origin', type: 'textarea', label: 'Origine de la crise', placeholder: 'Cause initiale et facteurs déclencheurs...', required: true },
      { name: 'potential_impact', type: 'textarea', label: 'Impact potentiel', placeholder: 'Conséquences financières, réputation, opérationnelles...', required: true },
      { name: 'time_urgency', type: 'select', label: 'Urgence temporelle', options: ['Immédiate', 'Quelques heures', 'Quelques jours', 'Long terme'], required: true },
      { name: 'media_exposure', type: 'select', label: 'Exposition médiatique', options: ['Locale', 'Nationale', 'Internationale', 'Réseaux sociaux'], required: true },
      { name: 'fact_acknowledgment', type: 'textarea', label: 'Reconnaissance faits', placeholder: 'Comment reconnaître les faits sans aggraver...', required: true },
      { name: 'empathy_statement', type: 'textarea', label: 'Déclaration empathie', placeholder: 'Expression d\'empathie et prise de responsabilité...', required: true },
      { name: 'immediate_actions', type: 'textarea', label: 'Actions immédiates', placeholder: 'Mesures concrètes prises immédiatement...', required: true },
      { name: 'spokesperson', type: 'select', label: 'Porte-parole', options: ['PDG', 'Directeur Communication', 'Expert technique', 'Porte-parole externe'], required: true },
      { name: 'communication_tone', type: 'select', label: 'Ton communication', options: ['Empathique et humble', 'Professionnel et factuel', 'Confiant et rassurant', 'Transparent et honnête'], required: true },
      { name: 'priority_channels', type: 'text', label: 'Canaux prioritaires', placeholder: 'Communiqué presse, réseaux sociaux, site web...', required: true },
      { name: 'employee_message', type: 'textarea', label: 'Message employés', placeholder: 'Communication interne spécifique...', required: true },
      { name: 'customer_message', type: 'textarea', label: 'Message clients', placeholder: 'Communication client adaptée...', required: true },
      { name: 'media_message', type: 'textarea', label: 'Message médias', placeholder: 'Éléments de langage pour la presse...', required: true },
      { name: 'investor_message', type: 'textarea', label: 'Message investisseurs', placeholder: 'Communication financière...', required: false },
      { name: 'authority_message', type: 'textarea', label: 'Message autorités', placeholder: 'Communication institutionnelle...', required: false },
      { name: 'positive_messaging', type: 'textarea', label: 'Messaging positif', placeholder: 'Messages de reconstruction d\'image...', required: true },
      { name: 'dark_site_ready', type: 'select', label: 'Dark site préparé', options: ['Oui, opérationnel', 'En cours de préparation', 'Non, à créer'], required: true },
      { name: 'monitoring_kpis', type: 'textarea', label: 'KPIs de suivi', placeholder: 'Mentions médias, sentiment, reach, engagement...', required: true }
    ],
    tags: ['Communication', 'Crise', 'Gestion', 'Relations publiques'],
  }
];
