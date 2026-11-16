// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smartphone, Music, ShoppingCart, Car, Stethoscope, Banknote, GraduationCap, Factory, Shield, Camera, MessageSquare, FlaskConical } from 'lucide-react';

// Les exemples décrivent ce que fait l'IA et ce qu'il faut garder en tête, sans chiffres d'audience
// ou de performance : ces valeurs changent vite et varient selon les sources.

interface Exemple {
  icon: React.ReactNode;
  titre: string;
  description: string;
  details: string;
  aRetenir: string;
  color: string;
}

interface Repere {
  valeur: string;
  libelle: string;
  color: string;
}

const exemplesQuotidien: Exemple[] = [
  {
    icon: <Smartphone className="h-6 w-6" />,
    titre: 'Assistant vocal',
    description: 'Siri, Alexa, Gemini (qui remplace Google Assistant sur Android)',
    details: 'Reconnaissance vocale, traitement du langage naturel, actions automatisées',
    aRetenir: "La voix est convertie en texte puis interprétée\u00A0: accents, bruit ambiant et noms propres restent des sources d'erreur.",
    color: 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800'
  },
  {
    icon: <Music className="h-6 w-6" />,
    titre: 'Recommandations musicales',
    description: 'Spotify, Apple Music, YouTube Music',
    details: 'Analyse des préférences, apprentissage collaboratif, découverte personnalisée',
    aRetenir: "Les suggestions s'appuient sur vos écoutes et sur celles d'auditeurs aux goûts proches. Elles peuvent aussi vous enfermer dans vos habitudes.",
    color: 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
  },
  {
    icon: <ShoppingCart className="h-6 w-6" />,
    titre: 'E-commerce et contenus personnalisés',
    description: 'Amazon, Netflix, réseaux sociaux',
    details: 'Système de recommandation, prédiction des achats, personnalisation',
    aRetenir: "Ce que vous voyez est en partie choisi pour retenir votre attention ou susciter un achat\u00A0: deux personnes n'ont pas la même page d'accueil.",
    color: 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800'
  },
  {
    icon: <Car className="h-6 w-6" />,
    titre: 'Navigation GPS',
    description: 'Google Maps, Waze, Apple Plans',
    details: "Optimisation d'itinéraires, prédiction du trafic, navigation en temps réel",
    aRetenir: "Les estimations de trafic viennent des déplacements d'un grand nombre d'utilisateurs\u00A0: elles sont d'autant plus fiables que les données sont nombreuses et récentes.",
    color: 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
  },
  {
    icon: <Camera className="h-6 w-6" />,
    titre: 'Photos intelligentes',
    description: 'Google Photos, iCloud, reconnaissance faciale',
    details: 'Classification automatique, recherche par contenu, améliorations automatiques',
    aRetenir: "On peut chercher «\u00A0plage\u00A0» ou «\u00A0chien\u00A0» sans avoir étiqueté de photo. Le traitement se fait sur l'appareil ou dans le cloud selon le service\u00A0: vérifiez les réglages de confidentialité.",
    color: 'bg-pink-50 dark:bg-pink-950/20 border-pink-200 dark:border-pink-800'
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    titre: 'Filtres anti-spam',
    description: 'Gmail, Outlook, filtrage intelligent',
    details: "Classification de texte, détection d'anomalies, apprentissage adaptatif",
    aRetenir: "Un bon filtre laisse passer peu d'indésirables, mais il lui arrive de classer un message légitime en spam\u00A0: jetez un œil au dossier concerné.",
    color: 'bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800'
  }
];

const exemplesProfessionnels: Exemple[] = [
  {
    icon: <Stethoscope className="h-6 w-6" />,
    titre: 'Diagnostic médical',
    description: 'Imagerie médicale, détection précoce de maladies',
    details: "Aide à la lecture d'images (radiographies, mammographies, fonds d'œil) pour repérer des anomalies et prioriser les examens",
    aRetenir: "Sur certaines tâches précises, des études publiées rapportent des performances proches de celles de spécialistes. La validation clinique et la décision médicale restent humaines.",
    color: 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
  },
  {
    icon: <Banknote className="h-6 w-6" />,
    titre: 'Finance et trading',
    description: 'Détection de fraude, trading algorithmique',
    details: 'Analyse de comportements suspects, évaluation de risques, stratégies automatisées',
    aRetenir: "L'automatisation est ancienne dans ce secteur\u00A0: l'apprentissage automatique s'ajoute à des règles et à des statistiques classiques. Un modèle peut se tromper sur une situation qu'il n'a jamais vue.",
    color: 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    titre: 'Éducation personnalisée',
    description: "Plateformes d'apprentissage adaptatif",
    details: 'Parcours individualisés, détection des difficultés, recommandations de contenu',
    aRetenir: "L'adaptation du parcours peut aider, surtout avec un accompagnement humain. Les effets observés varient beaucoup selon les études et les contextes.",
    color: 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800'
  },
  {
    icon: <Factory className="h-6 w-6" />,
    titre: 'Industrie 4.0',
    description: 'Maintenance prédictive, automatisation',
    details: 'Prédiction de pannes, optimisation de production, robotique collaborative',
    aRetenir: "Une prédiction de panne ne vaut que par la qualité des données de capteurs et de l'historique de maintenance dont on dispose.",
    color: 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    titre: 'Cybersécurité',
    description: "Détection d'intrusions, analyse de menaces",
    details: 'Identification de comportements suspects, aide à la réponse aux incidents',
    aRetenir: "Repérer un comportement inhabituel produit aussi des fausses alertes\u00A0: l'IA aide les analystes à trier, elle ne les remplace pas. Les attaquants utilisent eux aussi l'IA.",
    color: 'bg-slate-50 dark:bg-slate-950/20 border-slate-200 dark:border-slate-800'
  },
  {
    icon: <FlaskConical className="h-6 w-6" />,
    titre: 'Recherche scientifique',
    description: 'Découverte de médicaments, simulation',
    details: 'Accélération de la recherche, modélisation moléculaire, prédictions climatiques',
    aRetenir: "AlphaFold, qui prédit la structure 3D des protéines, a valu à ses auteurs une part du prix Nobel de chimie 2024. Il accélère certaines étapes de la recherche, pas l'ensemble du développement d'un médicament.",
    color: 'bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800'
  }
];

const reperes: Record<'quotidien' | 'professionnel', Repere[]> = {
  quotidien: [
    { valeur: 'Discrète', libelle: "Souvent intégrée aux services sans qu'on la remarque", color: 'text-blue-700 dark:text-blue-400' },
    { valeur: 'Personnalisée', libelle: 'Adaptée à vos usages passés', color: 'text-green-700 dark:text-green-400' },
    { valeur: 'Imparfaite', libelle: 'Peut se tromper\u00A0: gardez un regard critique', color: 'text-purple-700 dark:text-purple-400' }
  ],
  professionnel: [
    { valeur: 'Assistance', libelle: "L'humain garde la décision et la responsabilité", color: 'text-blue-700 dark:text-blue-400' },
    { valeur: 'Données', libelle: 'La qualité des données conditionne le résultat', color: 'text-green-700 dark:text-green-400' },
    { valeur: 'Mesure', libelle: 'Les gains se vérifient au cas par cas', color: 'text-purple-700 dark:text-purple-400' }
  ]
};

const ReperesGrid = ({ items }: { items: Repere[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
    {items.map((repere) => (
      <div key={repere.valeur} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
        <div className={`text-xl font-bold ${repere.color}`}>{repere.valeur}</div>
        <div className="text-sm text-muted-foreground">{repere.libelle}</div>
      </div>
    ))}
  </div>
);

const ExempleCards = ({ items }: { items: Exemple[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {items.map((exemple) => (
      <Card key={exemple.titre} className={`hover:shadow-md transition-shadow ${exemple.color}`}>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            {exemple.icon}
            <div>
              <CardTitle className="text-lg">{exemple.titre}</CardTitle>
              <p className="text-sm text-muted-foreground">{exemple.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-3">{exemple.details}</p>
          <p className="text-xs text-muted-foreground">
            <span className="font-semibold text-foreground">À retenir :</span> {exemple.aRetenir}
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ExemplesPratiques = () => {
  const [selectedCategory, setSelectedCategory] = useState('quotidien');

  return (
    <div className="space-y-6">
      <Card className="bg-linear-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <CardHeader>
          <CardTitle>L'IA dans notre quotidien</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-1 gap-1 sm:grid-cols-2">
              <TabsTrigger value="quotidien">Usage personnel</TabsTrigger>
              <TabsTrigger value="professionnel">Applications professionnelles</TabsTrigger>
            </TabsList>

            <TabsContent value="quotidien" className="space-y-6">
              <ReperesGrid items={reperes.quotidien} />
              <ExempleCards items={exemplesQuotidien} />
            </TabsContent>

            <TabsContent value="professionnel" className="space-y-6">
              <ReperesGrid items={reperes.professionnel} />
              <ExempleCards items={exemplesProfessionnels} />
            </TabsContent>
          </Tabs>
          <p className="mt-6 text-xs text-muted-foreground">
            Les chiffres d'usage, de marché ou de performance changent vite et varient selon les sources : ils ne sont
            volontairement pas repris ici.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExemplesPratiques;
