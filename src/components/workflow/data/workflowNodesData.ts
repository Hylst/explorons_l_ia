// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { 
  Brain, 
  FileText, 
  Image, 
  Music, 
  Video, 
  MessageSquare, 
  Database, 
  Zap,
  BarChart3,
  Filter,
  Settings,
  Code,
  Globe,
  Mail,
  ShoppingCart,
  Search,
  Shield,
  Puzzle,
  Target,
  Lightbulb,
  Cpu,
  Eye,
  Mic,
  Users,
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

export interface WorkflowNode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  complexity: 'débutant' | 'intermédiaire' | 'avancé';
  cost: string;
  inputs: string[];
  outputs: string[];
}

export interface NodeCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  nodes: WorkflowNode[];
}

export const workflowNodes: WorkflowNode[] = [
  {
    id: 'llm-openai',
    name: 'Processeur de modèle de langage (OpenAI)',
    description: "Traitement de texte avec un modèle GPT choisi par l'utilisateur",
    icon: React.createElement(Brain, { className: "h-4 w-4" }),
    category: 'llm',
    complexity: 'intermédiaire',
    cost: "Payant (à l'usage)",
    inputs: ['Texte', 'Instructions'],
    outputs: ['Texte généré', 'Métadonnées']
  },
  {
    id: 'llm-claude',
    name: 'Processeur de modèle de langage (Claude)',
    description: 'Analyse et génération avec un modèle Claude au choix',
    icon: React.createElement(MessageSquare, { className: "h-4 w-4" }),
    category: 'llm',
    complexity: 'intermédiaire',
    cost: "Payant (à l'usage)",
    inputs: ['Texte', 'Contexte'],
    outputs: ['Réponse', 'Métadonnées (jetons utilisés, raison d\'arrêt)']
  },
  {
    id: 'text-embedding',
    name: 'Plongement vectoriel (embedding)',
    description: 'Conversion texte en vecteurs pour recherche sémantique',
    icon: React.createElement(Puzzle, { className: "h-4 w-4" }),
    category: 'llm',
    complexity: 'avancé',
    cost: "Payant (à l'usage)",
    inputs: ['Texte'],
    outputs: ['Vecteur', 'Dimension']
  },
  {
    id: 'sentiment-analyzer',
    name: 'Analyseur de sentiment',
    description: 'Détection d\'émotion et sentiment dans le texte',
    icon: React.createElement(BarChart3, { className: "h-4 w-4" }),
    category: 'analyse',
    complexity: 'débutant',
    cost: "Payant (à l'usage)",
    inputs: ['Texte'],
    outputs: ['Sentiment', 'Score', 'Émotions']
  },
  {
    id: 'image-openai',
    name: "Générateur d'images (GPT Image)",
    description: "Création d'images à partir d'un texte avec un modèle d'image d'OpenAI",
    icon: React.createElement(Image, { className: "h-4 w-4" }),
    category: 'image',
    complexity: 'débutant',
    cost: "Payant (à l'usage)",
    inputs: ['Prompt', 'Style'],
    outputs: ['Image', 'URL', 'Métadonnées']
  },
  {
    id: 'image-third-party',
    name: "Générateur d'images (service tiers)",
    description: "Génération d'images via l'API d'un fournisseur de modèles d'image",
    icon: React.createElement(Lightbulb, { className: "h-4 w-4" }),
    category: 'image',
    complexity: 'intermédiaire',
    cost: "Payant (à l'usage)",
    inputs: ['Prompt', 'Paramètres'],
    outputs: ['Image', 'Variations']
  },
  {
    id: 'image-upscaler',
    name: 'Amélioration d\'image',
    description: 'Augmentation de résolution et amélioration qualité',
    icon: React.createElement(Eye, { className: "h-4 w-4" }),
    category: 'image',
    complexity: 'intermédiaire',
    cost: "Payant (à l'usage)",
    inputs: ['Image source'],
    outputs: ['Image HD', 'Facteur zoom']
  },
  {
    id: 'whisper-transcription',
    name: 'Transcription (Whisper)',
    description: 'Conversion audio/vidéo en texte avec Whisper',
    icon: React.createElement(Mic, { className: "h-4 w-4" }),
    category: 'audio',
    complexity: 'débutant',
    cost: "Gratuit en local (modèle ouvert) ou payant via une API",
    inputs: ['Audio/Vidéo'],
    outputs: ['Transcription', 'Horodatages']
  },
  {
    id: 'elevenlabs-tts',
    name: 'Synthèse vocale (ElevenLabs)',
    description: 'Génération de voix réaliste à partir de texte',
    icon: React.createElement(Music, { className: "h-4 w-4" }),
    category: 'audio',
    complexity: 'intermédiaire',
    cost: "Offre gratuite limitée, puis abonnement ou paiement à l'usage via l'API (tarifs à vérifier chez l'éditeur)",
    inputs: ['Texte', 'Voix'],
    outputs: ['Audio', 'Format']
  },
  {
    id: 'video-generator',
    name: 'Générateur de vidéo',
    description: 'Création de vidéos courtes à partir d\'images et texte',
    icon: React.createElement(Video, { className: "h-4 w-4" }),
    category: 'video',
    complexity: 'avancé',
    cost: "Payant (à l'usage)",
    inputs: ['Images', 'Script'],
    outputs: ['Vidéo', 'Durée']
  },
  {
    id: 'web-scraper',
    name: 'Extracteur web',
    description: 'Extraction automatique de données depuis des sites web',
    icon: React.createElement(Globe, { className: "h-4 w-4" }),
    category: 'data',
    complexity: 'intermédiaire',
    cost: "Payant (à l'usage)",
    inputs: ['URL', 'Sélecteurs'],
    outputs: ['Données', 'Statut']
  },
  {
    id: 'database-connector',
    name: 'Connecteur de base de données',
    description: 'Interface avec bases de données SQL et NoSQL',
    icon: React.createElement(Database, { className: "h-4 w-4" }),
    category: 'data',
    complexity: 'avancé',
    cost: 'Variable',
    inputs: ['Requête', 'Paramètres'],
    outputs: ['Résultats', 'Métadonnées']
  },
  {
    id: 'api-connector',
    name: 'Connecteur API',
    description: 'Intégration avec APIs externes et webhooks',
    icon: React.createElement(Zap, { className: "h-4 w-4" }),
    category: 'integration',
    complexity: 'intermédiaire',
    cost: 'Variable',
    inputs: ['Endpoint', 'Headers', 'Payload'],
    outputs: ['Réponse', 'Code statut']
  },
  {
    id: 'condition-gate',
    name: 'Porte conditionnelle',
    description: 'Routage conditionnel basé sur des règles',
    icon: React.createElement(Filter, { className: "h-4 w-4" }),
    category: 'logic',
    complexity: 'débutant',
    cost: 'Gratuit',
    inputs: ['Données', 'Conditions'],
    outputs: ['Branche A', 'Branche B']
  },
  {
    id: 'loop-processor',
    name: 'Boucle de traitement',
    description: 'Exécution itérative sur des ensembles de données',
    icon: React.createElement(Settings, { className: "h-4 w-4" }),
    category: 'logic',
    complexity: 'intermédiaire',
    cost: 'Gratuit',
    inputs: ['Collection', 'Logique'],
    outputs: ['Résultats', 'Compteur']
  },
  {
    id: 'aggregator',
    name: 'Agrégateur',
    description: 'Fusion et agrégation de données multiples',
    icon: React.createElement(Target, { className: "h-4 w-4" }),
    category: 'logic',
    complexity: 'débutant',
    cost: 'Gratuit',
    inputs: ['Données A', 'Données B', 'Données C'],
    outputs: ['Résultat agrégé']
  },
  {
    id: 'email-sender',
    name: 'Envoi d\'emails',
    description: 'Envoi d\'emails personnalisés (prévoir le consentement des destinataires et un lien de désinscription)',
    icon: React.createElement(Mail, { className: "h-4 w-4" }),
    category: 'communication',
    complexity: 'débutant',
    cost: "Payant (à l'usage)",
    inputs: ['Destinataires', 'Template'],
    outputs: ['Statut envoi', 'Statistiques']
  },
  {
    id: 'recommendation-engine',
    name: 'Moteur de recommandation',
    description: 'Suggestions personnalisées basées sur ML',
    icon: React.createElement(ShoppingCart, { className: "h-4 w-4" }),
    category: 'ml',
    complexity: 'avancé',
    cost: "Payant (à l'usage)",
    inputs: ['Profil utilisateur', 'Historique'],
    outputs: ['Recommandations', 'Scores']
  },
  {
    id: 'security-scanner',
    name: 'Scanner de sécurité',
    description: 'Analyse de vulnérabilités et détection d\'anomalies',
    icon: React.createElement(Shield, { className: "h-4 w-4" }),
    category: 'security',
    complexity: 'avancé',
    cost: "Payant (à l'usage)",
    inputs: ['Code/URL', 'Règles'],
    outputs: ['Rapport', 'Vulnérabilités']
  }
];

export const nodeCategories: NodeCategory[] = [
  {
    id: 'llm',
    name: 'LLM & NLP',
    icon: React.createElement(Brain, { className: "h-4 w-4" }),
    color: 'bg-purple-100 text-purple-800 dark:text-purple-200 dark:bg-purple-900/40',
    nodes: workflowNodes.filter(node => node.category === 'llm')
  },
  {
    id: 'image',
    name: 'Génération d\'images',
    icon: React.createElement(Image, { className: "h-4 w-4" }),
    color: 'bg-blue-100 text-blue-800 dark:text-blue-200 dark:bg-blue-900/40',
    nodes: workflowNodes.filter(node => node.category === 'image')
  },
  {
    id: 'audio',
    name: 'Audio & Voix',
    icon: React.createElement(Music, { className: "h-4 w-4" }),
    color: 'bg-green-100 text-green-800 dark:text-green-200 dark:bg-green-900/40',
    nodes: workflowNodes.filter(node => node.category === 'audio')
  },
  {
    id: 'video',
    name: 'Vidéo',
    icon: React.createElement(Video, { className: "h-4 w-4" }),
    color: 'bg-red-100 text-red-800 dark:text-red-200 dark:bg-red-900/40',
    nodes: workflowNodes.filter(node => node.category === 'video')
  },
  {
    id: 'data',
    name: 'Données',
    icon: React.createElement(Database, { className: "h-4 w-4" }),
    color: 'bg-yellow-100 text-yellow-800 dark:text-yellow-200 dark:bg-yellow-900/40',
    nodes: workflowNodes.filter(node => node.category === 'data')
  },
  {
    id: 'integration',
    name: 'Intégrations',
    icon: React.createElement(Zap, { className: "h-4 w-4" }),
    color: 'bg-orange-100 text-orange-800 dark:text-orange-200 dark:bg-orange-900/40',
    nodes: workflowNodes.filter(node => node.category === 'integration')
  },
  {
    id: 'logic',
    name: 'Logique',
    icon: React.createElement(Settings, { className: "h-4 w-4" }),
    color: 'bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-muted',
    nodes: workflowNodes.filter(node => node.category === 'logic')
  },
  {
    id: 'analyse',
    name: 'Analyse',
    icon: React.createElement(BarChart3, { className: "h-4 w-4" }),
    color: 'bg-teal-100 text-teal-800 dark:text-teal-200 dark:bg-teal-900/40',
    nodes: workflowNodes.filter(node => node.category === 'analyse')
  },
  {
    id: 'communication',
    name: 'Communication',
    icon: React.createElement(Mail, { className: "h-4 w-4" }),
    color: 'bg-pink-100 text-pink-800 dark:text-pink-200 dark:bg-pink-900/40',
    nodes: workflowNodes.filter(node => node.category === 'communication')
  },
  {
    id: 'ml',
    name: 'Apprentissage automatique',
    icon: React.createElement(Cpu, { className: "h-4 w-4" }),
    color: 'bg-indigo-100 text-indigo-800 dark:text-indigo-200 dark:bg-indigo-900/40',
    nodes: workflowNodes.filter(node => node.category === 'ml')
  },
  {
    id: 'security',
    name: 'Sécurité',
    icon: React.createElement(Shield, { className: "h-4 w-4" }),
    color: 'bg-rose-100 text-rose-800 dark:text-rose-200 dark:bg-rose-900/40',
    nodes: workflowNodes.filter(node => node.category === 'security')
  }
];
