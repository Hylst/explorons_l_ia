// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Cpu, Globe, Lightbulb, Zap, ShieldCheck, Server } from 'lucide-react';

interface EmergingTechnology {
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
  year: string;
}

const technologies: EmergingTechnology[] = [
  {
    title: "IA neuromorphique",
    description: "Puces et systèmes inspirés du cerveau humain qui visent à améliorer l'efficacité énergétique et les capacités d'apprentissage des systèmes d'IA.",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    examples: [
      "Puces Loihi 2 d'Intel, utilisées en recherche pour des réseaux de neurones à impulsions",
      "SpiNNaker de l'Université de Manchester pour la simulation neuronale",
      "Puces TrueNorth (2014) puis NorthPole (2023) d'IBM, qui rapprochent la mémoire du calcul"
    ],
    year: "en recherche"
  },
  {
    title: "IA quantique",
    description: "Recherche sur l'usage d'ordinateurs quantiques pour certaines tâches d'apprentissage ou d'optimisation. Les accélérations démontrées concernent des problèmes très structurés\u00A0; les gains pour l'IA en pratique restent à établir.",
    icon: <Cpu className="h-6 w-6 text-blue-500" />,
    examples: [
      "Optimisation combinatoire (pistes étudiées)",
      "Simulation moléculaire (pistes étudiées)",
      "Apprentissage automatique quantique (noyaux quantiques, circuits variationnels)\u00A0: résultats expérimentaux sur de petits jeux de données"
    ],
    year: "en recherche"
  },
  {
    title: "IA fédérée",
    description: "Apprentissage collaboratif où les données restent sur les appareils ou chez chaque organisation et où seules les mises à jour du modèle sont partagées. Il réduit l'exposition des données mais doit être combiné à d'autres protections (confidentialité différentielle, agrégation sécurisée).",
    icon: <Globe className="h-6 w-6 text-green-500" />,
    examples: [
      "Applications médicales où les données des patients restent dans chaque établissement",
      "Smartphones qui améliorent un modèle (par exemple la prédiction de clavier) sans envoyer les textes saisis, seulement des mises à jour du modèle",
      "Collaboration inter-entreprises sans mise en commun des données brutes"
    ],
    year: "en déploiement"
  },
  {
    title: "IA symbolique + connexionniste",
    description: "Systèmes hybrides combinant l'apprentissage profond avec le raisonnement symbolique pour une intelligence plus complète et interprétable.",
    icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
    examples: [
      "LLMs augmentés avec des capacités de raisonnement logique",
      "Systèmes capables d'expliquer leur raisonnement étape par étape",
      "IA pour la recherche scientifique avec vérification formelle"
    ],
    year: "en recherche"
  },
  {
    title: "IA embarquée (Edge AI)",
    description: "Algorithmes d'IA optimisés pour fonctionner directement sur des appareils périphériques, réduisant la latence et améliorant la confidentialité.",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
    examples: [
      "IA dans les véhicules autonomes pour décisions en temps réel",
      "Appareils médicaux portables qui analysent un signal (par exemple l'ECG) et signalent une anomalie à confirmer par un professionnel de santé",
      "Caméras de sécurité avec analyse vidéo intégrée"
    ],
    year: "en déploiement"
  },
  {
    title: "IA transparente (XAI)",
    description: "Méthodes et techniques permettant de comprendre, interpréter et expliquer les décisions des systèmes d'IA complexes.",
    icon: <ShieldCheck className="h-6 w-6 text-teal-500" />,
    examples: [
      "Diagnostic médical avec justification des conclusions",
      "Systèmes d'évaluation de crédit avec explications claires",
      "IA juridique avec traçabilité des raisonnements"
    ],
    year: "en recherche et en déploiement"
  },
  {
    title: "Agents autonomes multi-domaines",
    description: "Systèmes d'IA qui enchaînent des actions (outils, navigation, code) pour accomplir une tâche avec peu de supervision\u00A0; la fiabilité reste limitée hors de cadres précis.",
    icon: <Server className="h-6 w-6 text-indigo-500" />,
    examples: [
      "Assistants virtuels qui enchaînent plusieurs étapes pour traiter une demande",
      "Systèmes d'aide à la planification pour entreprises",
      "Agents de recherche scientifique automatisés"
    ],
    year: "en recherche et en déploiement"
  }
];

const EmergingTechnologies: React.FC = () => {
  return (
    <div className="py-8">
      <h3 className="heading-sm mb-6 text-center">Pistes de recherche et technologies émergentes de l'IA</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full border-primary/10 hover:shadow-md transition-all">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10">
                    {tech.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tech.title}</CardTitle>
                    <p className="text-xs text-muted-foreground">{tech.year}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{tech.description}</p>
                <div className="space-y-2">
                  {tech.examples.map((example, i) => (
                    <div key={i} className="text-xs bg-secondary/20 p-2 rounded-md">
                      {example}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EmergingTechnologies;
