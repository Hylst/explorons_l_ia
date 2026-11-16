// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Zap, Users, Globe, DollarSign, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

interface Stat {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
  comparison?: string;
  color: string;
}

// Chiffres publiés par les auteurs des modèles ou estimés par des tiers (sources citées dans chaque ligne).
const stats: Stat[] = [
  {
    icon: <Database className="h-6 w-6" />,
    title: "Données d'entraînement",
    value: "300 Md",
    description: "Tokens vus par GPT-3 pendant l'entraînement (Brown et al., 2020)",
    comparison: "Surtout du texte du web filtré, complété par des livres et Wikipédia",
    color: "blue"
  },
  {
    icon: <Cpu className="h-6 w-6" />,
    title: "Paramètres",
    value: "175 Md",
    description: "Nombre de paramètres de GPT-3 (Brown et al., 2020)",
    comparison: "175 milliards de nombres ajustés pendant l'entraînement",
    color: "purple"
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Puissance de calcul",
    value: "3,14×10²³",
    description: "Opérations (FLOPs) effectuées pour entraîner GPT-3 (Brown et al., 2020)",
    comparison: "Un total de calculs, pas une vitesse\u00A0: il a fallu un très grand nombre d'accélérateurs",
    color: "orange"
  },
  {
    icon: <DollarSign className="h-6 w-6" />,
    title: "Coût d'entraînement",
    value: "≈ 4,5 M$",
    description: "Coût de calcul estimé pour entraîner GPT-3",
    comparison: "Estimation de tiers (entre 4,3 et 4,6 millions de dollars selon les sources), pas un chiffre publié par l'entreprise",
    color: "green"
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Adoption",
    value: "≈ 100 M",
    description: "Utilisateurs actifs mensuels estimés de ChatGPT en janvier 2023, deux mois après son lancement (estimation UBS)",
    comparison: "L'un des démarrages les plus rapides observés pour une application grand public",
    color: "red"
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Langues évaluées",
    value: "26",
    description: "Langues dans lesquelles GPT-4 a été évalué sur un test de connaissances (rapport technique, 2023)",
    comparison: "Les performances varient d'une langue à l'autre et sont en général meilleures en anglais",
    color: "teal"
  }
];

const COLOR_CLASSES: Record<string, string> = {
  blue: 'from-blue-600 to-blue-700 text-blue-100',
  purple: 'from-purple-600 to-purple-700 text-purple-100',
  orange: 'from-orange-700 to-orange-800 text-orange-100',
  green: 'from-green-700 to-green-800 text-green-100',
  red: 'from-red-600 to-red-700 text-red-100',
  teal: 'from-teal-700 to-teal-800 text-teal-100'
};

const LLMStatsShowcase: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4 text-foreground">Quelques ordres de grandeur</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Des chiffres publiés, ou estimés par des tiers, pour situer l'échelle des grands modèles de langage
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardHeader className={`bg-linear-to-r ${COLOR_CLASSES[stat.color] ?? COLOR_CLASSES.blue} text-white`}>
                <div className="flex items-center gap-3">
                  {stat.icon}
                  <div>
                    <CardTitle className="text-lg text-white">{stat.title}</CardTitle>
                    <div className="text-3xl font-bold text-white mt-2">{stat.value}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                  {stat.comparison && (
                    <div className="bg-muted/50 p-3 rounded-lg border-l-2 border-primary">
                      <p className="text-xs text-muted-foreground font-medium">
                        Repère : {stat.comparison}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="bg-linear-to-r from-primary/10 to-blue-500/10 p-6 rounded-lg border border-primary/20">
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          Une échelle qui croît vite
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h5 className="font-medium mb-2 text-foreground">Taille des modèles :</h5>
            <ul className="space-y-1 text-muted-foreground">
              <li>• 2018 : GPT-1 (117 millions de paramètres)</li>
              <li>• 2019 : GPT-2 (1,5 milliard)</li>
              <li>• 2020 : GPT-3 (175 milliards)</li>
              <li>• 2023 : GPT-4 (taille non publiée)</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2 text-foreground">Coûts de calcul estimés :</h5>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Transformer (2017) : environ 900 $</li>
              <li>• GPT-3 (2020) : environ 4,5 millions de $</li>
              <li>• GPT-4 (2023) : environ 78 millions de $</li>
              <li>• Gemini Ultra (2023) : environ 190 millions de $</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2 text-foreground">Énergie (entraînement de GPT-3) :</h5>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Environ 1 287 MWh d'électricité</li>
              <li>• Soit la consommation annuelle d'environ 120 foyers américains</li>
              <li>• Environ 552 tonnes de CO2 émises</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Sources : articles de présentation des modèles, rapport AI Index 2024 (Stanford, avec Epoch AI) pour les
          coûts estimés, Patterson et al. (2021) pour l'énergie. Les coûts sont des estimations de tiers.
        </p>
      </div>
    </div>
  );
};

export default LLMStatsShowcase;
