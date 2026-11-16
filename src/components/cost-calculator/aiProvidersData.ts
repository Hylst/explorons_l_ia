// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface PricingTier {
  name: string;
  inputPrice: number; // prix per 1M input tokens
  outputPrice: number; // prix per 1M output tokens
  currency: string;
}

export interface AIProvider {
  id: string;
  name: string;
  description: string;
  models: {
    id: string;
    name: string;
    type: 'text' | 'image' | 'audio' | 'video' | 'embedding' | 'multimodal';
    pricing: PricingTier[];
    contextLength: number;
    features: string[];
    recommended?: boolean;
    category?: string;
    speed?: 'très-rapide' | 'rapide' | 'modéré' | 'lent';
    quality?: 'basic' | 'standard' | 'premium' | 'flagship';
  }[];
  website: string;
  apiUrl: string;
  /** Page officielle des tarifs, relue à chaque relevé (voir PRICING_CHECKED_ON et `npm run check:pricing`). */
  pricingUrl: string;
  region?: string;
}


// Tarifs relevés sur les pages officielles des fournisseurs et recontrôlés le 03/11/2026.
// Unités : text, multimodal, embedding = dollars US par million de tokens. image, audio, vidéo = unité indiquée dans le nom du tarif.
export const aiProvidersData: AIProvider[] = [
  // Tarifs : https://developers.openai.com/api/docs/pricing
  {
    id: 'openai',
    name: 'OpenAI',
    description: 'Modèles GPT-6 pour le texte et l\'image, ainsi que des modèles d\'embeddings, de voix et d\'image',
    website: 'https://openai.com',
    apiUrl: 'https://api.openai.com',
    pricingUrl: 'https://developers.openai.com/api/docs/pricing',
    region: 'US',
    models: [
      {
        id: 'gpt-6-astra',
        name: 'GPT-6 Astra',
        type: 'multimodal',
        contextLength: 1050000,
        features: ['Gamme haute', 'Entrée texte et image', 'Sortie texte', 'Au-delà de 272 000 tokens en entrée\u00A0: 2 fois le prix d\'entrée, 1,5 fois le prix de sortie'],
        recommended: true,
        category: 'Flagship LLM',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 10,
            outputPrice: 50,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gpt-6-1-sol',
        name: 'GPT-6.1 Sol',
        type: 'multimodal',
        contextLength: 1050000,
        features: ['Gamme intermédiaire', 'Entrée texte et image', 'Sortie texte', 'Au-delà de 272 000 tokens en entrée\u00A0: 2 fois le prix d\'entrée, 1,5 fois le prix de sortie'],
        recommended: true,
        category: 'Premium LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 2,
            outputPrice: 10,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gpt-6-1-terra',
        name: 'GPT-6.1 Terra',
        type: 'multimodal',
        contextLength: 1050000,
        features: ['Gamme intermédiaire', 'Entrée texte et image', 'Sortie texte', 'Au-delà de 272 000 tokens en entrée\u00A0: 2 fois le prix d\'entrée, 1,5 fois le prix de sortie'],
        category: 'Premium LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 1,
            outputPrice: 5,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gpt-6-luna',
        name: 'GPT-6 Luna',
        type: 'multimodal',
        contextLength: 1050000,
        features: ['Gamme économique', 'Entrée texte et image', 'Sortie texte', 'Au-delà de 272 000 tokens en entrée\u00A0: 2 fois le prix d\'entrée, 1,5 fois le prix de sortie'],
        recommended: true,
        category: 'Économique LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.1,
            outputPrice: 0.5,
            currency: 'USD'
          }
        ]
      },
      {
        // Toujours vendus et présentés comme modèles courants sur la page des tarifs (relevé du 02/10/2026)
        id: 'gpt-4o',
        name: 'GPT-4o',
        type: 'multimodal',
        contextLength: 128000,
        features: ['Génération précédente', 'Entrée texte et image', 'Sortie texte'],
        category: 'Flagship LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 2.5,
            outputPrice: 10,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o mini',
        type: 'multimodal',
        contextLength: 128000,
        features: ['Génération précédente', 'Entrée texte et image', 'Sortie texte'],
        category: 'Économique LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.15,
            outputPrice: 0.6,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gpt-image-2',
        name: 'GPT Image 2',
        type: 'image',
        contextLength: 0,
        features: ['Génération d\'images', 'Facturation en jetons d\'image'],
        category: 'Text-to-Image',
        speed: 'modéré',
        quality: 'premium',
        pricing: [
          {
            name: 'Par million de jetons d\'image (entrée / sortie)',
            inputPrice: 8,
            outputPrice: 30,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'tts-1',
        name: 'TTS-1',
        type: 'audio',
        contextLength: 0,
        features: ['Synthèse vocale', 'Retrait annoncé par OpenAI pour le 6 janvier 2027'],
        category: 'Text-to-Audio',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Par million de caractères',
            inputPrice: 15,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'tts-1-hd',
        name: 'TTS-1 HD',
        type: 'audio',
        contextLength: 0,
        features: ['Synthèse vocale', 'Qualité supérieure à TTS-1', 'Retrait annoncé par OpenAI pour le 6 janvier 2027'],
        category: 'Text-to-Audio',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Par million de caractères',
            inputPrice: 30,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'whisper-1',
        name: 'Whisper',
        type: 'audio',
        contextLength: 0,
        features: ['Transcription', 'Multilingue', 'Retrait annoncé par OpenAI pour le 26 février 2027'],
        category: 'Audio-to-Text',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Par minute d\'audio',
            inputPrice: 0.006,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'text-embedding-3-large',
        name: 'Text Embedding 3 Large',
        type: 'embedding',
        contextLength: 8192,
        features: ['Embeddings', 'Recherche sémantique'],
        category: 'Embedding',
        speed: 'très-rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.13,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://platform.claude.com/docs/en/about-claude/pricing
  {
    id: 'anthropic',
    name: 'Anthropic Claude',
    description: 'Famille de modèles Claude (Opus, Sonnet, Haiku), accessibles par l\'API d\'Anthropic',
    website: 'https://anthropic.com',
    apiUrl: 'https://api.anthropic.com',
    pricingUrl: 'https://platform.claude.com/docs/en/about-claude/pricing',
    region: 'US',
    models: [
      {
        id: 'claude-fable-5-1',
        name: 'Claude Fable 5.1',
        type: 'multimodal',
        contextLength: 1000000,
        features: ['Gamme la plus haute', 'Raisonnement exigeant et tâches agentiques longues', 'Entrée texte et image'],
        category: 'Flagship LLM',
        speed: 'lent',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 10,
            outputPrice: 50,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'claude-opus-5-5',
        name: 'Claude Opus 5.5',
        type: 'multimodal',
        contextLength: 1000000,
        features: ['Gamme haute', 'Code et tâches longues', 'Entrée texte et image'],
        recommended: true,
        category: 'Flagship LLM',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 4,
            outputPrice: 20,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'claude-sonnet-5-5',
        name: 'Claude Sonnet 5.5',
        type: 'multimodal',
        contextLength: 1000000,
        features: ['Gamme intermédiaire', 'Équilibre vitesse et qualité', 'Entrée texte et image'],
        recommended: true,
        category: 'Premium LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 2,
            outputPrice: 10,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'claude-haiku-5-5',
        name: 'Claude Haiku 5.5',
        type: 'multimodal',
        contextLength: 1000000,
        features: ['Gamme économique', 'Faible latence', 'Entrée texte et image', 'Tarif réduit jusqu\'à 100 000 jetons par requête'],
        recommended: true,
        category: 'Économique LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Jusqu\'à 100 000 jetons par requête',
            inputPrice: 0.1,
            outputPrice: 0.5,
            currency: 'USD'
          },
          {
            name: 'Au-delà de 100 000 jetons par requête',
            inputPrice: 0.5,
            outputPrice: 2.5,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://aistudio.google.com/docs/pricing (l'ancienne page ai.google.dev y redirige)
  {
    id: 'google',
    name: 'Google Gemini',
    description: 'Modèles multimodaux de Google (API Gemini) et embeddings',
    website: 'https://gemini.google.com',
    apiUrl: 'https://generativelanguage.googleapis.com',
    pricingUrl: 'https://aistudio.google.com/docs/pricing',
    region: 'Global',
    models: [
      {
        id: 'gemini-3-1-pro-preview',
        name: 'Gemini 3.1 Pro (préversion)',
        type: 'multimodal',
        contextLength: 1048576,
        features: ['Gamme haute', 'Version en préversion', 'Entrée texte, image, audio, vidéo'],
        recommended: true,
        category: 'Flagship LLM',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard (200k tokens ou moins)',
            inputPrice: 2,
            outputPrice: 12,
            currency: 'USD'
          },
          {
            name: 'Étendu (plus de 200k tokens)',
            inputPrice: 4,
            outputPrice: 18,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gemini-3-8-flash',
        name: 'Gemini 3.8 Flash',
        type: 'multimodal',
        contextLength: 1048576,
        features: ['Gamme intermédiaire', 'Agents et code', 'Entrée texte, image, audio, vidéo'],
        recommended: true,
        category: 'Premium LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Jusqu\'au 31/12/2026',
            inputPrice: 0.75,
            outputPrice: 3.75,
            currency: 'USD'
          },
          {
            name: 'À partir du 01/01/2027',
            inputPrice: 1.5,
            outputPrice: 7.5,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gemini-3-5-flash-lite',
        name: 'Gemini 3.5 Flash-Lite',
        type: 'multimodal',
        contextLength: 1048576,
        features: ['Gamme économique', 'Volumes élevés', 'Entrée texte, image, audio, vidéo'],
        recommended: true,
        category: 'Économique LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.3,
            outputPrice: 2.5,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gemini-embedding-2',
        name: 'Gemini Embedding 2',
        type: 'embedding',
        contextLength: 8192,
        features: ['Embeddings multimodaux', 'Recherche sémantique'],
        category: 'Embedding',
        speed: 'très-rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Texte',
            inputPrice: 0.2,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://docs.dev.runwayml.com/guides/pricing/
  {
    id: 'runwayml',
    name: 'RunwayML',
    description: 'API de génération vidéo\u00A0; un crédit s\'achète 0,01\u00A0$',
    website: 'https://runway.com',
    apiUrl: 'https://api.dev.runwayml.com',
    pricingUrl: 'https://docs.dev.runwayml.com/guides/pricing/',
    region: 'US',
    models: [
      {
        id: 'gen4-5',
        name: 'Gen-4.5',
        type: 'video',
        contextLength: 0,
        features: ['Texte ou image vers vidéo', 'Sorties HDR'],
        recommended: true,
        category: 'Text-to-Video',
        speed: 'lent',
        quality: 'flagship',
        pricing: [
          {
            name: 'Par seconde de vidéo (12 crédits)',
            inputPrice: 0.12,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gen4-turbo',
        name: 'Gen-4 Turbo',
        type: 'video',
        contextLength: 0,
        features: ['Image vers vidéo', 'Génération plus rapide'],
        category: 'Image-to-Video',
        speed: 'modéré',
        quality: 'standard',
        pricing: [
          {
            name: 'Par seconde de vidéo (5 crédits)',
            inputPrice: 0.05,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://elevenlabs.io/pricing/api
  {
    id: 'eleven-labs',
    name: 'ElevenLabs',
    description: 'Synthèse vocale et transcription par API',
    website: 'https://elevenlabs.io',
    apiUrl: 'https://api.elevenlabs.io',
    pricingUrl: 'https://elevenlabs.io/pricing/api',
    region: 'Global',
    models: [
      {
        id: 'eleven-multilingual-v2',
        name: 'v2 Multilingual',
        type: 'audio',
        contextLength: 0,
        features: ['29 langues', 'Synthèse vocale'],
        recommended: true,
        category: 'Text-to-Audio',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Par 1 000 caractères',
            inputPrice: 0.08,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'eleven-flash-turbo',
        name: 'Flash / Turbo',
        type: 'audio',
        contextLength: 0,
        features: ['32 langues', 'Faible latence'],
        category: 'Text-to-Audio',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Par 1 000 caractères',
            inputPrice: 0.04,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'scribe-v2',
        name: 'Scribe v2',
        type: 'audio',
        contextLength: 0,
        features: ['Transcription'],
        category: 'Audio-to-Text',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Par heure d\'audio',
            inputPrice: 0.22,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://docs.mistral.ai/inference/pricing (l'ancienne page mistral.ai/pricing/api y redirige)
  {
    id: 'mistral',
    name: 'Mistral AI',
    description: 'Société française\u00A0: modèles ouverts et API (tarifs affichés en dollars, convertibles en euros sur le site)',
    website: 'https://mistral.ai',
    apiUrl: 'https://api.mistral.ai',
    pricingUrl: 'https://docs.mistral.ai/inference/pricing',
    region: 'EU',
    models: [
      {
        id: 'mistral-large-4',
        name: 'Mistral Large 4',
        type: 'multimodal',
        contextLength: 1000000,
        features: ['Poids ouverts (licence Mistral Ecosystem)', 'Préversion publique', 'Mixture of Experts\u00A0: 52 milliards de paramètres actifs', 'Entrée texte et image'],
        recommended: true,
        category: 'Flagship LLM',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.7,
            outputPrice: 2.1,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'mistral-small-4',
        name: 'Mistral Small 4',
        type: 'multimodal',
        contextLength: 256000,
        features: ['Gamme économique', 'Instruction, raisonnement et code', 'Entrée texte et image'],
        recommended: true,
        category: 'Économique LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.15,
            outputPrice: 0.6,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'codestral',
        name: 'Codestral',
        type: 'text',
        contextLength: 128000,
        features: ['Complétion de code', 'Fill-in-the-middle'],
        category: 'Code LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.3,
            outputPrice: 0.9,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'mistral-embed',
        name: 'Mistral Embed',
        type: 'embedding',
        contextLength: 8192,
        features: ['Embeddings', 'Recherche sémantique'],
        category: 'Embedding',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.1,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://cohere.com/pricing
  {
    id: 'cohere',
    name: 'Cohere',
    description: 'Modèles pour l\'entreprise et la recherche documentaire (RAG)',
    website: 'https://cohere.com',
    apiUrl: 'https://api.cohere.com',
    pricingUrl: 'https://cohere.com/pricing',
    region: 'Global',
    models: [
      {
        id: 'command-r-plus-08-2024',
        name: 'Command R+ (08-2024)',
        type: 'text',
        contextLength: 128000,
        features: ['Génération augmentée par la recherche', 'Multilingue'],
        recommended: true,
        category: 'RAG',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard (tarif listé comme ancien)',
            inputPrice: 2.5,
            outputPrice: 10,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://docs.perplexity.ai/docs/agent-api/models
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'Recherche web assistée par IA, accessible par l\'API Agent (l\'ancienne API Sonar Chat Completions a pris fin le 27/09/2026)',
    website: 'https://perplexity.ai',
    apiUrl: 'https://api.perplexity.ai',
    pricingUrl: 'https://docs.perplexity.ai/docs/agent-api/models',
    region: 'US',
    models: [
      {
        id: 'perplexity-sonar-agent',
        name: 'Sonar (API Agent)',
        type: 'text',
        contextLength: 0,
        features: ['Recherche web', 'Outils facturés à l\'appel en plus des jetons'],
        recommended: true,
        category: 'RAG',
        speed: 'rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Jetons uniquement (hors outils)',
            inputPrice: 0.25,
            outputPrice: 2.5,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://docs.x.ai/developers/pricing
  {
    id: 'xai',
    name: 'xAI (Grok)',
    description: 'Modèles Grok de xAI, accessibles par l\'API xAI',
    website: 'https://x.ai',
    apiUrl: 'https://api.x.ai',
    pricingUrl: 'https://docs.x.ai/developers/pricing',
    region: 'US',
    models: [
      {
        id: 'grok-4-7',
        name: 'Grok 4.7',
        type: 'multimodal',
        contextLength: 500000,
        features: ['Gamme haute', 'Entrée texte et image'],
        recommended: true,
        category: 'Flagship LLM',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard (moins de 200k tokens)',
            inputPrice: 2,
            outputPrice: 6,
            currency: 'USD'
          },
          {
            name: 'Étendu (200k tokens ou plus)',
            inputPrice: 4,
            outputPrice: 12,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'grok-4-3',
        name: 'Grok 4.3',
        type: 'multimodal',
        contextLength: 1000000,
        features: ['Gamme intermédiaire', 'Contexte de 1 million de tokens', 'Entrée texte et image'],
        recommended: true,
        category: 'Premium LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard (moins de 200k tokens)',
            inputPrice: 1.25,
            outputPrice: 2.5,
            currency: 'USD'
          },
          {
            name: 'Étendu (200k tokens ou plus)',
            inputPrice: 2.5,
            outputPrice: 5,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'grok-build-0-1',
        name: 'Grok Build 0.1',
        type: 'multimodal',
        contextLength: 256000,
        features: ['Gamme économique', 'Orienté code'],
        category: 'Code LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard (moins de 200k tokens)',
            inputPrice: 1,
            outputPrice: 2,
            currency: 'USD'
          },
          {
            name: 'Étendu (200k tokens ou plus)',
            inputPrice: 2,
            outputPrice: 4,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://console.groq.com/docs/model/openai/gpt-oss-120b (et /gpt-oss-20b). La console Groq refuse l'accès direct
  // depuis certains réseaux : les pages ont été lues via un proxy de lecture le 03/11/2026.
  {
    id: 'groq',
    name: 'Groq',
    description: 'Inférence rapide de modèles ouverts sur puces spécialisées',
    website: 'https://groq.com',
    apiUrl: 'https://api.groq.com',
    pricingUrl: 'https://console.groq.com/docs/model/openai/gpt-oss-120b',
    region: 'US',
    models: [
      {
        id: 'gpt-oss-120b',
        name: 'GPT-OSS 120B',
        type: 'text',
        contextLength: 131072,
        features: ['Poids ouverts', 'Modèle phare de la famille gpt-oss d\'OpenAI'],
        recommended: true,
        category: 'Premium LLM',
        speed: 'très-rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.15,
            outputPrice: 0.6,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'gpt-oss-20b',
        name: 'GPT-OSS 20B',
        type: 'text',
        contextLength: 131072,
        features: ['Poids ouverts', 'Gamme économique'],
        category: 'Économique LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.075,
            outputPrice: 0.3,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://www.together.ai/pricing
  {
    id: 'together',
    name: 'Together AI',
    description: 'Plateforme d\'inférence pour modèles ouverts de plusieurs éditeurs',
    website: 'https://together.ai',
    apiUrl: 'https://api.together.xyz',
    pricingUrl: 'https://www.together.ai/pricing',
    region: 'US',
    models: [
      {
        id: 'kimi-k3',
        name: 'Kimi K3',
        type: 'text',
        contextLength: 1048576,
        features: ['Modèle ouvert', 'Gamme haute du catalogue'],
        recommended: true,
        category: 'Premium LLM',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 3,
            outputPrice: 15,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'minimax-m3',
        name: 'MiniMax M3',
        type: 'text',
        contextLength: 524288,
        features: ['Modèle ouvert', 'Gamme intermédiaire'],
        recommended: true,
        category: 'Premium LLM',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.3,
            outputPrice: 1.2,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'qwen3-8-flash',
        name: 'Qwen3.8 Flash',
        type: 'text',
        contextLength: 1000000,
        features: ['Modèle hybride (raisonnement)', 'Gamme économique'],
        recommended: true,
        category: 'Économique LLM',
        speed: 'très-rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 0.15,
            outputPrice: 0.47,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'flux-2-pro',
        name: 'FLUX.2 [pro]',
        type: 'image',
        contextLength: 0,
        features: ['Génération d\'images'],
        category: 'Text-to-Image',
        speed: 'modéré',
        quality: 'premium',
        pricing: [
          {
            name: 'Par image (résolution la plus basse)',
            inputPrice: 0.03,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://dev.meta.ai/docs/pricing-rate-limits (relevé du 02/10/2026)
  {
    id: 'meta',
    name: 'Meta',
    description: 'API officielle de Meta (Meta Model API)\u00A0: modèles Muse pour le texte, l\'image et la transcription',
    website: 'https://dev.meta.ai/',
    apiUrl: 'https://dev.meta.ai',
    pricingUrl: 'https://dev.meta.ai/docs/pricing-rate-limits',
    region: 'US',
    models: [
      {
        id: 'muse-spark-1-3',
        name: 'Muse Spark 1.3',
        type: 'text',
        contextLength: 1048576,
        features: ['Palier «\u00A0Contributor\u00A0» à 0,10\u00A0$ en entrée et 0,20\u00A0$ en sortie, en échange de l\'autorisation d\'utiliser vos requêtes et réponses pour entraîner les futurs modèles de Meta'],
        category: 'Flagship LLM',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Standard',
            inputPrice: 1.25,
            outputPrice: 4.25,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'muse-image-1-0',
        name: 'Muse Image 1.0',
        type: 'image',
        contextLength: 0,
        features: ['Génération d\'images'],
        category: 'Text-to-Image',
        speed: 'modéré',
        quality: 'standard',
        pricing: [
          {
            name: 'Par image générée',
            inputPrice: 0.01,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'muse-voice-transcribe',
        name: 'Muse Voice Transcribe',
        type: 'audio',
        contextLength: 0,
        features: ['Transcription de la parole'],
        category: 'Audio-to-Text',
        speed: 'rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Par heure d\'audio',
            inputPrice: 0.18,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  },
  // Tarifs : https://docs.stability.ai/pricing (relevé du 02/10/2026). Facturation en crédits : 1 crédit = 0,01 $.
  {
    id: 'stability',
    name: 'Stability AI',
    description: 'API de génération d\'images et d\'audio facturée en crédits (1 crédit = 0,01\u00A0$)',
    website: 'https://stability.ai',
    apiUrl: 'https://api.stability.ai',
    pricingUrl: 'https://docs.stability.ai/pricing',
    models: [
      {
        id: 'stable-image-ultra',
        name: 'Stable Image Ultra',
        type: 'image',
        contextLength: 0,
        features: ['Génération d\'images', 'Basé sur Stable Diffusion 3.5 Large'],
        category: 'Text-to-Image',
        speed: 'modéré',
        quality: 'flagship',
        pricing: [
          {
            name: 'Par image (8 crédits)',
            inputPrice: 0.08,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'sd-3-5-large',
        name: 'Stable Diffusion 3.5 Large',
        type: 'image',
        contextLength: 0,
        features: ['Génération d\'images'],
        category: 'Text-to-Image',
        speed: 'modéré',
        quality: 'premium',
        pricing: [
          {
            name: 'Par image (6,5 crédits)',
            inputPrice: 0.065,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'sd-3-5-large-turbo',
        name: 'Stable Diffusion 3.5 Large Turbo',
        type: 'image',
        contextLength: 0,
        features: ['Génération d\'images', 'Variante rapide de SD 3.5 Large'],
        category: 'Text-to-Image',
        speed: 'rapide',
        quality: 'premium',
        pricing: [
          {
            name: 'Par image (4 crédits)',
            inputPrice: 0.04,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'stable-image-core',
        name: 'Stable Image Core',
        type: 'image',
        contextLength: 0,
        features: ['Génération d\'images', 'Optimisé pour la rapidité et le coût'],
        category: 'Text-to-Image',
        speed: 'rapide',
        quality: 'standard',
        pricing: [
          {
            name: 'Par image (3 crédits)',
            inputPrice: 0.03,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      },
      {
        id: 'stable-audio-3',
        name: 'Stable Audio 3.0',
        type: 'audio',
        contextLength: 0,
        features: ['Génération audio à partir de texte', 'Jusqu\'à six minutes'],
        category: 'Text-to-Audio',
        speed: 'modéré',
        quality: 'premium',
        pricing: [
          {
            name: 'Par génération (8 crédits)',
            inputPrice: 0.08,
            outputPrice: 0,
            currency: 'USD'
          }
        ]
      }
    ]
  }
];

export type AIModel = AIProvider['models'][number];

/**
 * Date du dernier contrôle complet des tarifs (toutes les pages `pricingUrl` relues). À changer à chaque relevé mensuel ;
 * `npm run check:pricing` la lit et signale un relevé de plus de 35 jours. Procédure : SUIVI_CONTENU.md, « Relevé mensuel des tarifs ».
 */
export const PRICING_CHECKED_ON = '2026-11-03';

const pricingCheckedLabel = new Date(`${PRICING_CHECKED_ON}T12:00:00Z`).toLocaleDateString('fr-FR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
}).replace(/^1 /, '1er ');

/**
 * Avertissement à afficher sur tous les outils qui utilisent ces tarifs. Les prix ci-dessus sont
 * saisis à la main : ils servent d'ordres de grandeur, jamais de référence pour un budget.
 */
export const PRICING_DISCLAIMER =
  `Les tarifs ont été relevés à la main sur les pages officielles des fournisseurs (dernier contrôle complet le ${pricingCheckedLabel}) et ne sont pas mis à jour automatiquement\u00A0: les prix et les modèles changent souvent, et certains tarifs sont promotionnels ou limités dans le temps. Prenez-les comme des ordres de grandeur pour comparer, et vérifiez toujours sur le site du fournisseur avant de fixer un budget. Montants en dollars US, hors taxes.`;

/**
 * Vrai pour les modèles facturés au token (texte, multimodal, embeddings). Les autres (image,
 * audio, vidéo) ont une autre unité de facturation : image, minute, caractère, crédit... Une
 * formule « tokens x prix » n'a aucun sens pour eux, donc le calculateur les exclut.
 */
export const isTokenPriced = (model: Pick<AIModel, 'type'>) =>
  model.type === 'text' || model.type === 'multimodal' || model.type === 'embedding';

/** Libellé de l'unité de prix d'un modèle, pour ne jamais afficher « par million de tokens » à tort. */
export const priceUnitLabel = (model: Pick<AIModel, 'type'>) =>
  isTokenPriced(model) ? 'par million de tokens' : "unité propre au service (image, minute, caractère...)";

/** Prix en notation française, sans zéros inutiles (0,075 ; 1,25 ; 15). */
export const formatPrice = (value: number) =>
  value.toLocaleString('fr-FR', { maximumFractionDigits: 3 });

/** Modèles facturés au token d'un fournisseur (ceux que le calculateur peut estimer). */
export const getTokenPricedModels = (provider: AIProvider | undefined) =>
  provider?.models.filter(isTokenPriced) ?? [];

/** Fournisseurs qui proposent au moins un modèle facturé au token. */
export const getTokenPricedProviders = () =>
  aiProvidersData.filter(provider => provider.models.some(isTokenPriced));
