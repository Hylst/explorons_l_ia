// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Registre des cours approfondis : source unique des routes (/cours/<slug>), du SEO, du sitemap et de la liste
// affichée. Le contenu de chaque cours est dans <slug>.json, chargé seulement à l'ouverture de sa page.
// Imports relatifs uniquement : lu par Node au build (scripts/static-routes.ts, src/data/seoData.ts).

import type { DeepCourseLevel } from './types.ts';

export interface DeepCourseEntry {
  slug: string;
  /** Titre affiché, identique au champ title du JSON (contrôlé par npm run test:unit). */
  title: string;
  /** Description courte : moteurs de recherche et carte de la liste. */
  description: string;
  level: DeepCourseLevel;
  tags: string[];
}

export const DEEP_COURSES: DeepCourseEntry[] = [
  {
    slug: 'grokking',
    title: "Le grokking : quand un réseau généralise longtemps après avoir mémorisé",
    description: "Pourquoi un petit réseau peut généraliser très longtemps après avoir mémorisé : l'article de Power et al., le rôle du weight decay et l'analyse de Nanda et al., avec une expérience PyTorch.",
    level: 'Avancé',
    tags: ['Grokking', 'Généralisation', 'Weight decay', 'Interprétabilité mécanistique', 'Arithmétique modulaire', 'Transformers'],
  },
  {
    slug: 'rag',
    title: 'Le RAG : donner à un modèle de langage accès à vos documents',
    description: 'Principe du RAG, étapes du pipeline, limites du RAG simple, recherche hybride, reranking, évaluation et sécurité, avec du code qui tourne en local.',
    level: 'Intermédiaire',
    tags: ['RAG', 'Embeddings', 'Recherche vectorielle', 'Recherche hybride', 'Évaluation', 'Sécurité'],
  },
  {
    slug: 'generation-mot-par-mot',
    title: 'Comment un modèle de langage produit le token suivant',
    description: "Le trajet d'un prompt dans un modèle de type GPT : tokens, embeddings, attention, blocs Transformer, logits, température, top-p et cache KV, avec du code GPT-2 exécuté.",
    level: 'Intermédiaire',
    tags: ['Tokenisation', 'Transformer', 'Attention', 'Échantillonnage', 'Cache KV', 'GPT-2'],
  },
  {
    slug: 'mcp',
    title: 'Le Model Context Protocol (MCP) : brancher un modèle de langage à des outils et à des données',
    description: "Architecture hôte, client, serveur, messages JSON-RPC de la révision 2026-07-28, transports, OAuth et risques (injection de prompt, outils piégés), avec un mini client et serveur en Python pur.",
    level: 'Intermédiaire',
    tags: ['MCP', 'JSON-RPC 2.0', 'Outils et ressources', 'Transports', 'Autorisation OAuth', 'Sécurité', 'Injection de prompt'],
  },
  {
    slug: 'cout-des-tokens',
    title: "Le coût des tokens : comprendre, estimer et réduire la facture d'un modèle de langage",
    description: "Ce qu'est un token, pourquoi l'entrée et la sortie ont deux prix, ce qui s'ajoute à la requête, comment estimer un budget et le réduire, avec des calculs en Python.",
    level: 'Intermédiaire',
    tags: ['Tokens', 'Tokenisation', 'Coût des API', 'Cache du prompt', 'Tokens de réflexion', 'Estimation de budget'],
  },
  {
    slug: 'boucles-agentiques',
    title: "Les boucles agentiques : comment un modèle de langage passe de la réponse à l'action",
    description: "Comment un modèle de langage agit : appel d'outils, boucle ReAct, mémoire, arrêt, coût, garde-fous et évaluation, avec une boucle d'agent en Python exécutée en local.",
    level: 'Intermédiaire',
    tags: ['Agents', "Appel d'outils", 'ReAct', 'Mémoire de travail', 'Garde-fous', 'Injection de prompt', 'Évaluation'],
  },
  {
    slug: 'decodage-contraint',
    title: "Le décodage contraint : forcer un format valide pendant la génération",
    description: "Masquage des tokens, grammaires, JSON Schema, compromis de latence, de débit et de qualité, et limites du décodage contraint, avec une miniature exécutée en Python.",
    level: 'Intermédiaire',
    tags: ['Décodage contraint', 'Sorties structurées', 'JSON Schema', 'Grammaires', 'Masquage des tokens', 'Outlines', 'XGrammar'],
  },
  {
    slug: 'reseau-de-neurones',
    title: "Dans les entrailles d'un réseau de neurones\u00A0: comprendre le deep learning de zéro",
    description: "Un parcours en sept étapes, du neurone artificiel à la rétropropagation\u00A0: calculs à la main, code NumPy et PyTorch exécuté, et limites de la présentation.",
    level: 'Intermédiaire',
    tags: ['Réseaux de neurones', 'Deep learning', 'Rétropropagation', "Fonctions d'activation", 'Descente de gradient', 'PyTorch'],
  },
  {
    slug: 'cnn-architectures-vision',
    title: "CNN et architectures vision\u00A0: de LeNet-5 à ConvNeXt",
    description: "De LeNet-5 à ConvNeXt\u00A0: convolution, champ récepteur, ResNet, ViT et compromis entre biais inductif et efficacité, avec des exemples PyTorch.",
    level: 'Intermédiaire',
    tags: ['CNN', 'Vision par ordinateur', 'Convolution', 'ResNet', 'Vision Transformer', 'ConvNeXt'],
  },
  {
    slug: 'gpu-cpu',
    title: "Pourquoi l'IA tourne surtout sur GPU",
    description: "Pourquoi les GPU dominent l'IA\u00A0: parallélisme, Tensor Cores, mémoire, roofline, inférence et entraînement, avec des ordres de grandeur et des calculs de VRAM.",
    level: 'Intermédiaire',
    tags: ['GPU', 'CPU', 'Tensor Cores', 'VRAM', 'CUDA', 'Inférence'],
  },
  {
    slug: 'algorithmes-ia-generative',
    title: "VAE, GAN, diffusion et Flow Matching\u00A0: les algorithmes de l'IA générative",
    description: "VAE, GAN, diffusion et Flow Matching\u00A0: le trilemme génératif, les équations, les compromis et les architectures hybrides, avec du code en 2D.",
    level: 'Avancé',
    tags: ['VAE', 'GAN', 'Diffusion', 'Flow Matching', 'Modèles génératifs', 'Espace latent'],
  },
  {
    slug: 'flow-matching',
    title: "Flow Matching\u00A0: générer des images en suivant un champ de vecteurs",
    description: "Flow Matching expliqué\u00A0: couplages, champ de vélocité, Rectified Flow, intégration ODE et comparaison avec la diffusion, avec une expérience 2D.",
    level: 'Avancé',
    tags: ['Flow Matching', 'Rectified Flow', 'ODE', 'Diffusion', 'Transport optimal', "Génération d'images"],
  },
  {
    slug: 'fine-tuning',
    title: 'Fine-tuning\u00A0: LoRA, QLoRA et Full FT, quand utiliser quoi',
    description: "Choisir entre full fine-tuning, LoRA et QLoRA\u00A0: fonctionnement, mémoire, données, évaluation et mise en production, avec des configurations PEFT.",
    level: 'Intermédiaire',
    tags: ['Fine-tuning', 'LoRA', 'QLoRA', 'PEFT', 'SFT', 'Apprentissage'],
  },
  {
    slug: 'ia-locale',
    title: "IA locale pour les professionnels\u00A0: matériel, coûts et passage à l'échelle",
    description: "Faire tourner un LLM chez soi\u00A0: matériel, quantification, vLLM, SGLang, cache KV, coûts et production, avec des calculs de VRAM et de débit.",
    level: 'Intermédiaire',
    tags: ['IA locale', 'VRAM', 'VLLM', 'SGLang', 'Quantification', 'Infrastructure'],
  },
  {
    slug: 'open-weights',
    title: 'Open weights et open source\u00A0: ce que le nom cache vraiment',
    description: "Open weights, open source et licences\u00A0: ce qui est réellement publié, les libertés OSI, Llama, Mistral, OLMo et les enjeux juridiques.",
    level: 'Débutant',
    tags: ['Open weights', 'Open source', 'Licences', 'Llama', 'Mistral', 'Souveraineté'],
  },
  {
    slug: 'jev',
    title: 'Modèles de décision JEV\u00A0: décider sans générer de texte',
    description: "Les modèles de décision JEV\u00A0: routeur contraint, Laya, Kev, calibration et intégration dans un agent, avec les limites des chiffres de vendeur.",
    level: 'Avancé',
    tags: ['JEV', 'Modèles de décision', 'TypeSafe', 'Laya', 'Kev', 'Agents'],
  },
  {
    slug: 'injection-de-prompt',
    title: 'Injection de prompt\u00A0: comprendre et contenir le risque',
    description: "Injection de prompt\u00A0: modèle mental, injections directes et indirectes, impact, défenses, agents et méthode de test défensive.",
    level: 'Intermédiaire',
    tags: ['Sécurité', 'Injection de prompt', 'LLM', 'OWASP', 'Agents', 'Garde-fous'],
  },
  {
    slug: 'ia-generative-multimodale-agentique',
    title: 'IA générative, multimodale et agentique\u00A0: du neurone aux systèmes multi-agents',
    description: "Du neurone aux systèmes multi-agents\u00A0: Transformer, tokens, RAG, multimodal, LoRA, DPO, agents, MCP et coordination.",
    level: 'Intermédiaire',
    tags: ['IA générative', 'Multimodal', 'Agents', 'MCP', 'RAG', 'Systèmes multi-agents'],
  },
  {
    slug: 'solutions-ia-b2b',
    title: 'Solutions IA B2B\u00A0: catégories, packaging et déploiement',
    description: "Construire et vendre une solution IA B2B\u00A0: catégories, packaging, pricing, ROI, conformité et déploiement, avec des hypothèses explicites.",
    level: 'Intermédiaire',
    tags: ['B2B', 'Produit', 'Packaging', 'Déploiement', 'Conformité', 'ROI'],
  },
  {
    slug: 'llm-wiki',
    title: 'Le LLM Wiki de Karpathy\u00A0: compiler la connaissance au lieu de la rechercher',
    description: "Le LLM Wiki de Karpathy\u00A0: compiler des sources en pages Markdown reliées, comparer au RAG, structurer et maintenir la connaissance.",
    level: 'Intermédiaire',
    tags: ['LLM Wiki', 'RAG', 'Markdown', 'Obsidian', 'Recherche', 'Connaissance'],
  },
];

export const deepCoursePath = (slug: string) => `/cours/${slug}`;
