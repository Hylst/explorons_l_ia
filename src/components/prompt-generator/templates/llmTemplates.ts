// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { PromptTemplate, PromptCategory } from '../promptTemplatesData';

export const llmCategories: PromptCategory[] = [
  {
    id: 'llm-analysis',
    name: 'Analyse par un LLM',
    description: 'Modèles pour l\'analyse et la compréhension de texte',
    icon: 'Brain'
  },
  {
    id: 'llm-generation',
    name: 'Génération par un LLM',
    description: 'Modèles pour la génération de contenu textuel',
    icon: 'FileText'
  },
  {
    id: 'llm-conversation',
    name: 'Conversation avec un LLM',
    description: 'Modèles pour les interactions conversationnelles',
    icon: 'MessageCircle'
  }
];

export const llmTemplates: PromptTemplate[] = [
  {
    id: 'llm-sentiment-analysis',
    name: 'Analyse de sentiment avancée',
    category: 'llm-analysis',
    domain: 'NLP',
    description: 'Analyse détaillée des sentiments dans un texte avec nuances émotionnelles',
    template: `Tu es un expert en analyse de sentiment et psychologie computationnelle. Analyse le sentiment du texte suivant avec une granularité maximale :

**TEXTE À ANALYSER :**
"{text_content}"

**ANALYSE DEMANDÉE :**

## 1. SENTIMENT GLOBAL
- Sentiment principal : [Positif/Négatif/Neutre/Mixte]
- Niveau de confiance (indicatif, non calibré) : [Faible/Moyen/Élevé]
- Intensité émotionnelle : [Faible/Modérée/Forte/Très forte]

## 2. ANALYSE GRANULAIRE
### Émotions détectées :
- Joie/Bonheur : [score et justification]
- Tristesse/Mélancolie : [score et justification]
- Colère/Frustration : [score et justification]
- Peur/Anxiété : [score et justification]
- Surprise : [score et justification]
- Dégoût : [score et justification]

## 3. CONTEXTE ET NUANCES
- Ironie/Sarcasme détecté : {detect_sarcasm}
- Références culturelles : {cultural_context}
- Registre de langue : [Familier/Soutenu/Technique/Argotique]

## 4. RECOMMANDATIONS
- Stratégie de réponse appropriée
- Ton recommandé pour l'interaction

**PARAMÈTRES :**
- Domaine : {domain}
- Public cible : {target_audience}`,
    variables: [
      { name: 'text_content', type: 'textarea', label: 'Texte à analyser', placeholder: 'Coller le texte ici...', required: true },
      { name: 'detect_sarcasm', type: 'select', label: 'Détecter sarcasme', options: ['Oui', 'Non'], required: true, defaultValue: 'Oui' },
      { name: 'cultural_context', type: 'select', label: 'Contexte culturel', options: ['Français', 'Anglo-saxon', 'Global'], required: true },
      { name: 'domain', type: 'select', label: 'Domaine', options: ['Général', 'Business', 'Médical', 'Juridique'], required: true },
      { name: 'target_audience', type: 'select', label: 'Public cible', options: ['Grand public', 'Professionnels', 'Académique'], required: true }
    ],
    tags: ['LLM', 'Sentiment', 'Analyse', 'NLP'],
  },
  {
    id: 'llm-code-explanation',
    name: 'Explication de code',
    category: 'llm-generation',
    domain: 'Développement',
    description: 'Explique du code de manière pédagogique et détaillée',
    template: `Tu es un expert développeur et formateur. Explique le code suivant :

**CODE À EXPLIQUER :**
\`\`\`{programming_language}
{code_snippet}
\`\`\`

**EXPLICATION STRUCTURÉE :**

## 1. VUE D'ENSEMBLE
- Objectif principal : [Que fait ce code ?]
- Complexité : [Débutant/Intermédiaire/Avancé]

## 2. ANALYSE DÉTAILLÉE
[Explication ligne par ligne des sections importantes]

## 3. BONNES PRATIQUES
### Points positifs :
- ✅ [Point positif 1]
- ✅ [Point positif 2]

### Améliorations possibles :
- 🔄 [Amélioration 1]
- 🔄 [Amélioration 2]

**NIVEAU :** {explanation_level}`,
    variables: [
      { name: 'code_snippet', type: 'textarea', label: 'Code à expliquer', placeholder: 'Coller le code ici...', required: true },
      { name: 'programming_language', type: 'select', label: 'Langage', options: ['JavaScript', 'Python', 'Java', 'C#', 'TypeScript'], required: true },
      { name: 'explanation_level', type: 'select', label: 'Niveau', options: ['Débutant', 'Intermédiaire', 'Avancé'], required: true }
    ],
    tags: ['LLM', 'Code', 'Explication', 'Pédagogie'],
  },
  {
    id: 'llm-text-summarizer',
    name: 'Résumé multi-format',
    category: 'llm-analysis',
    domain: 'NLP',
    description: 'Génère des résumés adaptatifs selon le format et l\'audience',
    template: `Tu es un expert en synthèse documentaire. Crée un résumé de ce texte :

**TEXTE SOURCE :**
"{source_text}"

**PARAMÈTRES DE RÉSUMÉ :**
- Format : {summary_format}
- Longueur : {summary_length}
- Public : {target_audience}
- Focus : {focus_area}

**STRUCTURE DEMANDÉE :**
{structure_type}

**TON ET STYLE :**
- Registre : {tone_register}
- Perspective : {perspective}

Adapte le résumé aux besoins spécifiques de {target_audience} en respectant le format {summary_format}.`,
    variables: [
      { name: 'source_text', type: 'textarea', label: 'Texte à résumer', placeholder: 'Coller le texte source...', required: true },
      { name: 'summary_format', type: 'select', label: 'Format de résumé', options: ['Exécutif', 'Académique', 'Liste à puces', 'Narratif', 'FAQ'], required: true },
      { name: 'summary_length', type: 'select', label: 'Longueur', options: ['Très court (50 mots)', 'Court (100 mots)', 'Moyen (200 mots)', 'Long (300+ mots)'], required: true },
      { name: 'target_audience', type: 'select', label: 'Public cible', options: ['Direction', 'Équipe technique', 'Grand public', 'Experts métier'], required: true },
      { name: 'focus_area', type: 'select', label: 'Focus principal', options: ['Points clés', 'Actions à retenir', 'Données chiffrées', 'Conclusions'], required: true },
      { name: 'structure_type', type: 'select', label: 'Structure', options: ['Chronologique', 'Par importance', 'Par thème', 'Problème-solution'], required: true },
      { name: 'tone_register', type: 'select', label: 'Registre', options: ['Formel', 'Professionnel', 'Accessible', 'Technique'], required: true },
      { name: 'perspective', type: 'select', label: 'Perspective', options: ['Objective', 'Analytique', 'Critique', 'Recommandations'], required: true }
    ],
    tags: ['LLM', 'Résumé', 'Synthèse', 'Documentation'],
  },
  {
    id: 'llm-translation-context',
    name: 'Traduction contextuelle',
    category: 'llm-generation',
    domain: 'Linguistique',
    description: 'Traduction intelligente préservant le contexte et les nuances',
    template: `Tu es un traducteur expert multilingue. Traduis ce texte en préservant toutes les nuances :

**TEXTE À TRADUIRE :**
"{source_text}"

**PARAMÈTRES DE TRADUCTION :**
- Langue source : {source_language}
- Langue cible : {target_language}
- Domaine : {specialized_domain}
- Registre : {language_register}
- Contexte : {context_type}

**EXIGENCES SPÉCIALES :**
- Adaptation culturelle : {cultural_adaptation}
- Préservation du ton : {tone_preservation}
- Terminologie : {terminology_consistency}

**LIVRABLES :**
1. Traduction principale
2. Variantes possibles pour expressions idiomatiques
3. Notes explicatives si nécessaire
4. Glossaire des termes techniques (si applicable)

Assure-toi que la traduction soit naturelle dans {target_language} tout en respectant le sens original.`,
    variables: [
      { name: 'source_text', type: 'textarea', label: 'Texte à traduire', placeholder: 'Texte source...', required: true },
      { name: 'source_language', type: 'select', label: 'Langue source', options: ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Chinois', 'Japonais'], required: true },
      { name: 'target_language', type: 'select', label: 'Langue cible', options: ['Français', 'Anglais', 'Espagnol', 'Allemand', 'Italien', 'Chinois', 'Japonais'], required: true },
      { name: 'specialized_domain', type: 'select', label: 'Domaine spécialisé', options: ['Général', 'Juridique', 'Médical', 'Technique', 'Marketing', 'Académique'], required: true },
      { name: 'language_register', type: 'select', label: 'Registre', options: ['Formel', 'Informel', 'Technique', 'Littéraire', 'Commercial'], required: true },
      { name: 'context_type', type: 'select', label: 'Type de contexte', options: ['Business', 'Académique', 'Personnel', 'Officiel', 'Créatif'], required: true },
      { name: 'cultural_adaptation', type: 'select', label: 'Adaptation culturelle', options: ['Minimale', 'Modérée', 'Complète'], required: true },
      { name: 'tone_preservation', type: 'select', label: 'Préservation du ton', options: ['Strict', 'Adaptatif', 'Localisé'], required: true },
      { name: 'terminology_consistency', type: 'select', label: 'Cohérence terminologique', options: ['Standard', 'Spécialisée', 'Personnalisée'], required: true }
    ],
    tags: ['LLM', 'Traduction', 'Multilingue', 'Contextuel'],
  },
  {
    id: 'llm-conversation-coach',
    name: 'Coach conversationnel',
    category: 'llm-conversation',
    domain: 'Communication',
    description: 'Assistant pour améliorer les compétences conversationnelles',
    template: `Tu es un coach expert en communication. Aide-moi à préparer cette conversation :

**CONTEXTE DE LA CONVERSATION :**
- Type : {conversation_type}
- Interlocuteur : {interlocutor_profile}
- Objectif : {conversation_goal}
- Enjeux : {stakes_level}

**MA SITUATION :**
- Mon rôle : {my_role}
- Mes contraintes : {my_constraints}
- Points sensibles : {sensitive_points}

**PRÉPARATION DEMANDÉE :**

## 1. STRATÉGIE DE COMMUNICATION
- Approche recommandée
- Ton et style à adopter
- Éléments à mettre en avant

## 2. STRUCTURE PROPOSÉE
- Ouverture
- Développement des points clés
- Gestion des objections possibles
- Conclusion et prochaines étapes

## 3. PHRASES CLÉS
- Formules d'accroche
- Transitions importantes
- Réponses aux objections

## 4. EXERCICES DE PRÉPARATION
- Mise en situation
- Points d'attention
- Signaux à observer

Adapte tes conseils au contexte {conversation_type} avec {interlocutor_profile}.`,
    variables: [
      { name: 'conversation_type', type: 'select', label: 'Type de conversation', options: ['Entretien d\'embauche', 'Négociation commerciale', 'Feedback difficile', 'Présentation', 'Conflit à résoudre', 'Demande d\'augmentation'], required: true },
      { name: 'interlocutor_profile', type: 'select', label: 'Profil interlocuteur', options: ['Manager/Patron', 'Client', 'Collègue', 'Équipe', 'Prospect', 'Partenaire'], required: true },
      { name: 'conversation_goal', type: 'textarea', label: 'Objectif principal', placeholder: 'Ce que je veux obtenir de cette conversation...', required: true },
      { name: 'stakes_level', type: 'select', label: 'Niveau d\'enjeux', options: ['Faible', 'Modéré', 'Élevé', 'Critique'], required: true },
      { name: 'my_role', type: 'select', label: 'Mon rôle', options: ['Demandeur', 'Décideur', 'Facilitateur', 'Expert', 'Négociateur'], required: true },
      { name: 'my_constraints', type: 'textarea', label: 'Mes contraintes', placeholder: 'Limites, contraintes temporelles, budgétaires...', required: false },
      { name: 'sensitive_points', type: 'textarea', label: 'Points sensibles', placeholder: 'Sujets délicats à aborder avec précaution...', required: false }
    ],
    tags: ['LLM', 'Communication', 'Coaching', 'Conversation'],
  },
  {
    id: 'llm-content-optimizer',
    name: 'Optimiseur de contenu SEO',
    category: 'llm-generation',
    domain: 'Marketing Digital',
    description: 'Optimise le contenu pour le référencement et l\'engagement',
    template: `Tu es un expert SEO et content marketing. Optimise ce contenu :

**CONTENU ORIGINAL :**
"{original_content}"

**OBJECTIFS D'OPTIMISATION :**
- Mot-clé principal : {primary_keyword}
- Mots-clés secondaires : {secondary_keywords}
- Intention de recherche : {search_intent}
- Public cible : {target_audience}

**PARAMÈTRES SEO :**
- Longueur cible : {target_length}
- Répétition des mots-clés (rester naturel, sans bourrage) : {keyword_repetition}
- Structure : {content_structure}

**OPTIMISATIONS À APPLIQUER :**

## 1. TITRE ET META
- Titre optimisé (50-60 caractères)
- Meta description (150-160 caractères)
- Structure Hn appropriée

## 2. CONTENU OPTIMISÉ
- Intégration naturelle des mots-clés
- Amélioration de la lisibilité
- Enrichissement sémantique

## 3. ÉLÉMENTS TECHNIQUES
- Suggestions de liens internes
- Optimisation des images (alt text)
- Schema markup recommandé

## 4. ENGAGEMENT
- Call-to-action efficaces
- Éléments interactifs
- Amélioration du temps de lecture

**TYPE DE CONTENU :** {content_type}
**PLATEFORME :** {platform}`,
    variables: [
      { name: 'original_content', type: 'textarea', label: 'Contenu original', placeholder: 'Coller le contenu à optimiser...', required: true },
      { name: 'primary_keyword', type: 'text', label: 'Mot-clé principal', placeholder: 'intelligence artificielle', required: true },
      { name: 'secondary_keywords', type: 'text', label: 'Mots-clés secondaires', placeholder: 'IA, machine learning, automatisation', required: false },
      { name: 'search_intent', type: 'select', label: 'Intention de recherche', options: ['Informationnelle', 'Navigationnelle', 'Transactionnelle', 'Commerciale'], required: true },
      { name: 'target_audience', type: 'select', label: 'Public cible', options: ['Débutants', 'Intermédiaires', 'Experts', 'Décideurs', 'Technique'], required: true },
      { name: 'target_length', type: 'select', label: 'Longueur cible', options: ['300-500 mots', '500-1000 mots', '1000-2000 mots', '2000+ mots'], required: true },
      { name: 'keyword_repetition', type: 'select', label: 'Répétition des mots-clés (rester naturel)', options: ['Faible', 'Modérée'], required: true },
      { name: 'content_structure', type: 'select', label: 'Structure contenu', options: ['Liste', 'Guide étape par étape', 'Comparaison', 'Question-réponse', 'Narratif'], required: true },
      { name: 'content_type', type: 'select', label: 'Type de contenu', options: ['Article de blog', 'Page produit', 'Landing page', 'Guide', 'FAQ'], required: true },
      { name: 'platform', type: 'select', label: 'Plateforme', options: ['Site web', 'Blog', 'E-commerce', 'LinkedIn', 'Medium'], required: true }
    ],
    tags: ['LLM', 'SEO', 'Optimisation', 'Content Marketing'],
  }
];
