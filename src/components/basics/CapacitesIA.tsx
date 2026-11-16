// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Eye, Ear, MessageCircle, Calculator, Target, Users, Brain, Zap, Lightbulb } from 'lucide-react';

const CapacitesIA = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const capacites = [
    {
      id: 'vision',
      icon: <Eye className="h-8 w-8 text-blue-500" />,
      titre: 'Vision par ordinateur',
      description: 'Reconnaître et analyser des images, détecter des objets, lire du texte',
      niveau: 'Très bon',
      commentaire: 'Très performante sur des tâches précises (classification d\'images, lecture de texte), mais fragile hors des conditions d\'entraînement.',
      couleur: 'text-blue-700 dark:text-blue-400',
      exemples: [
        'Reconnaissance faciale (déverrouillage de téléphone)',
        'Diagnostic médical par imagerie',
        'Voitures autonomes (détection d\'obstacles)',
        'OCR - lecture automatique de documents',
        'Réalité augmentée (filtres Snapchat/Instagram)'
      ],
      defis: [
        'Conditions d\'éclairage difficiles',
        'Objets partiellement cachés',
        'Interprétation du contexte'
      ]
    },
    {
      id: 'audio',
      icon: <Ear className="h-8 w-8 text-green-500" />,
      titre: 'Traitement audio',
      description: 'Comprendre la parole, reconnaître des sons, analyser de la musique',
      niveau: 'Bon',
      commentaire: 'Utile pour transcrire et reconnaître la parole, avec des erreurs possibles sur les accents, le bruit de fond et les échanges à plusieurs voix.',
      couleur: 'text-green-700 dark:text-green-400',
      exemples: [
        'Assistants vocaux (Siri, Alexa, Gemini)',
        'Transcription automatique (sous-titres)',
        'Traduction vocale en temps réel',
        'Reconnaissance de musique (Shazam)',
        'Analyse de la voix (rythme, intonation)\u00A0: la reconnaissance des émotions reste scientifiquement discutée, et l\'UE interdit de l\'utiliser au travail et à l\'école (sauf raisons médicales ou de sécurité)'
      ],
      defis: [
        'Accents et dialectes',
        'Bruit de fond',
        'Conversation naturelle multi-personnes'
      ]
    },
    {
      id: 'langage',
      icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
      titre: 'Traitement du langage',
      description: 'Comprendre et générer du texte, traduire, résumer',
      niveau: 'Très bon',
      commentaire: 'Très à l\'aise sur de nombreuses tâches de texte, avec des erreurs factuelles possibles (hallucinations).',
      couleur: 'text-purple-700 dark:text-purple-400',
      exemples: [
        'ChatGPT, Claude, Gemini (conversation)',
        'Google Translate (traduction)',
        'Résumé automatique d\'articles',
        'Génération de code informatique',
        'Rédaction d\'emails et documents'
      ],
      defis: [
        'Compréhension du contexte culturel',
        'Détection de l\'ironie et sarcasme',
        'Raisonnement logique complexe'
      ]
    },
    {
      id: 'calcul',
      icon: <Calculator className="h-8 w-8 text-orange-500" />,
      titre: 'Calcul et optimisation',
      description: 'Résoudre des problèmes mathématiques complexes, optimiser',
      niveau: 'Très bon',
      commentaire: 'Très efficace sur des problèmes bien définis et chiffrés, moins sur ceux qui demandent de l\'intuition ou des données complètes.',
      couleur: 'text-orange-700 dark:text-orange-400',
      exemples: [
        'Trading haute fréquence',
        'Optimisation de routes logistiques',
        'Prévisions météorologiques',
        'Calculs scientifiques complexes',
        'Optimisation énergétique de bâtiments'
      ],
      defis: [
        'Problèmes nécessitant de l\'intuition',
        'Optimisation multi-objectifs complexes',
        'Incertitude et données incomplètes'
      ]
    },
    {
      id: 'prediction',
      icon: <Target className="h-8 w-8 text-red-500" />,
      titre: 'Prédiction et analyse',
      description: 'Anticiper des tendances, prévoir des événements',
      niveau: 'Limité',
      commentaire: 'Utile sur des phénomènes réguliers, limitée face aux événements rares ou imprévisibles.',
      couleur: 'text-red-700 dark:text-red-400',
      exemples: [
        'Prévisions météorologiques à quelques jours (modèles d\'IA utilisés en exploitation, par exemple l\'AIFS du CEPMMT depuis 2025)',
        'Analyse de données de marché (évaluation de risques), sans garantie de prédire les cours',
        'Prévision de pannes machines',
        'Recommandations personnalisées',
        'Détection de fraudes'
      ],
      defis: [
        'Événements imprévisibles (cygnes noirs)',
        'Biais dans les données historiques',
        'Évolution rapide des comportements'
      ]
    },
    {
      id: 'interaction',
      icon: <Users className="h-8 w-8 text-teal-500" />,
      titre: 'Interaction sociale',
      description: 'Converser naturellement, comprendre les émotions',
      niveau: 'En progrès',
      commentaire: 'Les échanges deviennent fluides, mais la compréhension des émotions et des nuances reste limitée.',
      couleur: 'text-teal-700 dark:text-teal-400',
      exemples: [
        'Chatbots de service client',
        'Outils de soutien au bien-être (suivi, exercices guidés), qui ne remplacent pas un professionnel de santé mentale\u00A0; certains États, comme l\'Illinois en 2025, interdisent la thérapie menée par une IA',
        'Compagnons virtuels pour seniors',
        'Modération de contenus en ligne',
        'Analyse de sentiment sur réseaux sociaux'
      ],
      defis: [
        'Nuances émotionnelles complexes',
        'Empathie véritable',
        'Adaptation aux personnalités'
      ]
    }
  ];

  const toggleSection = (id: string) => {
    setOpenSections(prev => 
      prev.includes(id) 
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-linear-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/20 dark:to-cyan-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Capacités de l'intelligence artificielle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Lightbulb className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="font-medium">Apprendre</p>
                <p className="text-sm text-muted-foreground">À partir de données et d'expériences</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Target className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium">Raisonner</p>
                <p className="text-sm text-muted-foreground">Analyser et tirer des conclusions</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Zap className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium">Agir</p>
                <p className="text-sm text-muted-foreground">Prendre des décisions et résoudre des problèmes</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <Brain className="h-6 w-6 text-purple-500" />
              <div>
                <p className="font-medium">S'adapter</p>
                <p className="text-sm text-muted-foreground">Améliorer les performances avec l'expérience</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        Les niveaux ci-dessous sont des appréciations qualitatives de l'éditeur du site, et non des mesures : aucune échelle chiffrée ni aucun test comparatif ne les fonde.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capacites.map((capacite) => (
          <Card key={capacite.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-2">
                {capacite.icon}
                <CardTitle className="text-lg">{capacite.titre}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">{capacite.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Appréciation qualitative</span>
                    <Badge className={`${capacite.couleur} bg-transparent border`}>
                      {capacite.niveau}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {capacite.commentaire}
                  </p>
                </div>

                <Collapsible 
                  open={openSections.includes(capacite.id)}
                  onOpenChange={() => toggleSection(capacite.id)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium hover:text-primary transition-colors">
                    Voir les détails
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      openSections.includes(capacite.id) ? 'rotate-180' : ''
                    }`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-3">
                    <div>
                      <p className="text-xs font-medium text-green-700 dark:text-green-400 mb-1">
                        Exemples d'applications :
                      </p>
                      <ul className="text-xs space-y-1">
                        {capacite.exemples.map((exemple, idx) => (
                          <li key={idx} className="text-muted-foreground">• {exemple}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-orange-700 dark:text-orange-400 mb-1">
                        ⚠️ Défis actuels :
                      </p>
                      <ul className="text-xs space-y-1">
                        {capacite.defis.map((defi, idx) => (
                          <li key={idx} className="text-muted-foreground">• {defi}</li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CapacitesIA;
