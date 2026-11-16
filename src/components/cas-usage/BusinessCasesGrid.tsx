// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, Building2, Stethoscope, BookOpen, Scale, ShoppingBag, 
  Truck, Factory, Music, Dumbbell, Microscope, Landmark, CheckCircle,
  Users, Leaf
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface BusinessSector {
  /** Ancre optionnelle (lien depuis l'accueil). */
  id?: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
}

const sectors: BusinessSector[] = [
  {
    name: 'Santé',
    icon: <Stethoscope className="h-5 w-5" />,
    description: 'Diagnostic assisté, découverte de médicaments, imagerie médicale améliorée, gestion des données médicales et systèmes de suivi des patients.',
    examples: [
      'Détection précoce de maladies via l\'analyse d\'images médicales',
      'Prédiction des épidémies et gestion des ressources hospitalières',
      'Aide à la personnalisation des traitements à partir de données génomiques',
      'Systèmes de surveillance continue des patients à risque',
      'Interprétation automatisée des analyses biologiques'
    ]
  },
  {
    name: 'Éducation',
    icon: <BookOpen className="h-5 w-5" />,
    description: 'Apprentissage personnalisé, évaluation automatisée, assistance pédagogique, création de contenu éducatif et outils d\'accessibilité.',
    examples: [
      'Systèmes adaptatifs ajustant le contenu selon le rythme de l\'apprenant',
      'Outils de correction automatique pour les enseignants',
      'Assistants virtuels pour répondre aux questions des étudiants',
      'Génération de matériel pédagogique personnalisé',
      'Systèmes de détection précoce des difficultés d\'apprentissage'
    ]
  },
  {
    name: 'Finance',
    icon: <Landmark className="h-5 w-5" />,
    description: 'Détection de fraudes, trading algorithmique, évaluation des risques, conseil financier automatisé et analyse de tendances de marché.',
    examples: [
      'Modèles prédictifs pour les investissements et la gestion de portefeuille',
      'Systèmes d\'alerte pour les transactions suspectes',
      'Chatbots de service client pour les opérations bancaires',
      'Évaluation automatisée des demandes de crédit (à haut risque au sens de l\'AI Act pour les particuliers)',
      'Analyse des marchés financiers en temps réel'
    ]
  },
  {
    name: 'Juridique',
    icon: <Scale className="h-5 w-5" />,
    description: 'Analyse de contrats, recherche juridique, prédiction des décisions, automatisation documentaire et conformité réglementaire.',
    examples: [
      'Examen automatisé de documents juridiques complexes',
      'Systèmes d\'aide à la décision pour les juges et avocats',
      'Analyse prédictive des résultats de procès basée sur des cas similaires (en France, l\'article 33 de la loi du 23 mars 2019 interdit de réutiliser les données d\'identité des magistrats pour évaluer, comparer ou prédire leurs pratiques)',
      'Génération de documents juridiques personnalisés',
      'Surveillance de la conformité réglementaire'
    ]
  },
  {
    name: 'Commerce',
    icon: <ShoppingBag className="h-5 w-5" />,
    description: 'Recommandations personnalisées, optimisation des prix, service client automatisé, analyse du comportement des consommateurs et gestion des stocks.',
    examples: [
      'Moteurs de recommandation adaptés aux préférences des utilisateurs',
      'Prévision de la demande et gestion des stocks optimisée',
      'Assistants virtuels pour l\'expérience d\'achat en ligne',
      'Analyse des sentiments clients à partir des avis',
      'Optimisation dynamique des prix selon la demande'
    ]
  },
  {
    name: 'Industrie',
    icon: <Factory className="h-5 w-5" />,
    description: 'Maintenance prédictive, optimisation de production, contrôle qualité, automatisation industrielle et gestion de la chaîne d\'approvisionnement.',
    examples: [
      'Détection anticipée des pannes d\'équipement',
      'Optimisation des processus de fabrication et réduction des déchets',
      'Systèmes de vision par ordinateur pour l\'inspection qualité',
      'Optimisation de la consommation énergétique',
      'Robots intelligents pour les tâches dangereuses'
    ]
  },
  {
    name: 'Logistique',
    icon: <Truck className="h-5 w-5" />,
    description: 'Optimisation des itinéraires, gestion de flotte, prévision de demande, traçabilité des produits et automatisation d\'entrepôts.',
    examples: [
      'Planification dynamique des routes de livraison',
      'Prédiction des besoins de maintenance pour les véhicules',
      'Optimisation des chaînes d\'approvisionnement mondiales',
      'Systèmes de suivi en temps réel des expéditions',
      'Robots autonomes pour la gestion d\'entrepôts'
    ]
  },
  {
    name: 'Divertissement',
    icon: <Music className="h-5 w-5" />,
    description: 'Création de contenu, recommandations personnalisées, effets spéciaux, analyse d\'audience et monétisation optimisée.',
    examples: [
      'Génération de musique et d\'art assistée par IA',
      'Systèmes de recommandation pour les plateformes de streaming',
      'Animation et rendu 3D améliorés pour les films et jeux',
      'Création automatique de sous-titres et traductions',
      'Personnalisation des expériences de jeu'
    ]
  },
  {
    name: 'Sport',
    icon: <Dumbbell className="h-5 w-5" />,
    description: 'Analyse de performance, prévention des blessures, stratégies de jeu, entraînement personnalisé et engagement des fans.',
    examples: [
      'Analyse vidéo des techniques et des performances des athlètes',
      'Prédiction et prévention des blessures via des données biométriques',
      'Planification tactique basée sur l\'analyse des adversaires',
      'Programmes d\'entraînement personnalisés basés sur les données',
      'Expériences immersives pour les spectateurs'
    ]
  },
  {
    id: 'recherche-scientifique',
    name: 'Recherche',
    icon: <Microscope className="h-5 w-5" />,
    description: 'Analyse de données complexes, modélisation, accélération des découvertes, simulation et prédiction de phénomènes.',
    examples: [
      'Simulation de processus biologiques pour la recherche médicale',
      'Analyse de vastes ensembles de données astronomiques',
      'Modélisation climatique et prévision des catastrophes naturelles',
      'Découverte de nouveaux matériaux et composés chimiques',
      'Aide au contrôle et à la correction d\'erreurs des ordinateurs quantiques (recherche en cours)'
    ]
  },
  {
    name: 'Ressources humaines',
    icon: <Users className="h-5 w-5" />,
    description: 'Recrutement assisté, analyse des talents, formation personnalisée, gestion de la performance et prédiction des besoins en personnel.',
    examples: [
      'Analyse automatisée des CV et présélection des candidats (usage classé à haut risque par l\'AI Act, annexe III)',
      'Programmes d\'intégration personnalisés pour les nouveaux employés',
      'Systèmes de détection précoce du risque de départ',
      'Planification des carrières et recommandations de formation',
      'Enquêtes de satisfaction des employés analysées automatiquement (l\'analyse du sentiment d\'un texte écrit n\'est pas visée, mais la reconnaissance des émotions des salariés à partir de données biométriques, comme le visage ou la voix, est interdite par l\'AI Act depuis le 2 février 2025, sauf raisons médicales ou de sécurité)'
    ]
  },
  {
    name: 'Agriculture',
    icon: <Leaf className="h-5 w-5" />,
    description: 'Agriculture de précision, surveillance des cultures, optimisation des ressources, prévisions météorologiques et gestion du bétail.',
    examples: [
      'Systèmes d\'irrigation intelligents basés sur les besoins réels',
      'Détection précoce des maladies des plantes par imagerie',
      'Optimisation de l\'utilisation des pesticides et engrais',
      'Prévisions de rendement basées sur l\'analyse de données',
      'Surveillance automatisée de la santé du bétail'
    ]
  }
];

const BusinessCasesGrid: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  if (activeTab !== "professionnels") return null;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sectors.map((sector, index) => (
        <motion.div
          key={sector.name}
          id={sector.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="h-full border-primary/10 hover:border-primary/30 transition-all hover:shadow-md">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  {sector.icon}
                </div>
                <CardTitle className="text-lg">{sector.name}</CardTitle>
              </div>
              <CardDescription>{sector.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h4 className="text-sm font-medium mb-2">Exemples d'applications :</h4>
              <ul className="space-y-1">
                {sector.examples.map((example, i) => (
                  <li key={i} className="text-sm flex items-start">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{example}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default BusinessCasesGrid;
