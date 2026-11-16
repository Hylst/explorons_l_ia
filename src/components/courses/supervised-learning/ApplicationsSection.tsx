// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import LessonSection from '@/components/courses/LessonSection';
import QuickFactBox from '@/components/courses/QuickFactBox';
import ExpandableSection from '@/components/courses/ExpandableSection';
import ZoomOn from '@/components/courses/ZoomOn';
import { Lightbulb, Heart, ShoppingCart, Car, Building } from 'lucide-react';

const ApplicationsSection: React.FC = () => {
  return (
    <LessonSection
      title="Applications dans la vie réelle"
      icon={<Lightbulb className="h-6 w-6" />}
    >
      <div className="space-y-8">
        <div>
          <p className="text-lg leading-relaxed">
            L'apprentissage supervisé est déjà présent dans de nombreux services du quotidien. Voyons quelques
            secteurs où il est utilisé, avec ses apports et ses limites.
          </p>
        </div>

        <div className="grid gap-6">
          <ExpandableSection
            title="Santé et médecine : aider au diagnostic"
            icon={<Heart className="h-5 w-5 text-red-500" />}
            defaultExpanded={true}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-red-700 dark:text-red-400">Diagnostic médical</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Radiologie :</strong> repérer des anomalies sur des mammographies ou des scanners</li>
                    <li>• <strong>Dermatologie :</strong> aider à identifier des lésions suspectes sur des photos de peau</li>
                    <li>• <strong>Ophtalmologie :</strong> dépister la rétinopathie diabétique</li>
                    <li>• <strong>Cardiologie :</strong> analyser des ECG pour détecter des arythmies</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-red-700 dark:text-red-400">Recherche et développement</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Découverte de médicaments :</strong> prédire l'activité de molécules candidates</li>
                    <li>• <strong>Essais cliniques :</strong> aider à identifier des patients éligibles</li>
                    <li>• <strong>Génomique :</strong> estimer des prédispositions à partir de données génétiques</li>
                    <li>• <strong>Épidémiologie :</strong> modéliser la propagation des maladies</li>
                  </ul>
                </div>
              </div>

              <ZoomOn title="Cas d'étude : le dépistage du cancer du sein">
                <p className="mb-4">
                  En 2020, une équipe de Google Health et de DeepMind a publié dans la revue Nature une évaluation
                  d'un système d'IA sur des mammographies déjà interprétées. Par rapport aux décisions des
                  radiologues, le système réduisait les faux positifs de 5,7 points de pourcentage et les faux
                  négatifs de 9,4 points sur les données américaines, et de 1,2 et 2,7 points sur les données
                  britanniques.
                </p>
                <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded border border-green-200 dark:border-green-800">
                  <strong>À retenir :</strong> cette évaluation était rétrospective, sur des images déjà
                  archivées. Elle ne prouve pas que l'outil améliorerait le dépistage en conditions réelles : cela
                  exige des essais cliniques et la supervision de professionnels de santé.
                </div>
              </ZoomOn>

              <QuickFactBox
                title="Une limite à connaître"
                description="Un modèle entraîné avec les images d'un hôpital peut perdre en performance dans un autre : les patients, les appareils et les protocoles diffèrent. La validation sur des données extérieures est indispensable."
                icon="⚠️"
                variant="warning"
              />
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="E-commerce et marketing : personnaliser l'expérience"
            icon={<ShoppingCart className="h-5 w-5 text-blue-500" />}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Recommandations</h4>
                  <ul className="text-sm space-y-1 text-blue-700 dark:text-blue-300">
                    <li>• « Les clients ayant acheté... »</li>
                    <li>• Suggestions personnalisées</li>
                    <li>• Ventes croisées</li>
                    <li>• Playlists musicales sur mesure</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Tarification dynamique</h4>
                  <ul className="text-sm space-y-1 text-green-700 dark:text-green-300">
                    <li>• Prix ajustés en temps réel</li>
                    <li>• Optimisation des marges</li>
                    <li>• Alignement sur la concurrence</li>
                    <li>• Tarifs personnalisés : dans l'Union européenne, le consommateur doit en être informé</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Analyse client</h4>
                  <ul className="text-sm space-y-1 text-purple-700 dark:text-purple-300">
                    <li>• Segmentation automatique</li>
                    <li>• Prédiction de résiliation (churn)</li>
                    <li>• Valeur vie client</li>
                    <li>• Analyse de sentiment</li>
                  </ul>
                </div>
              </div>

              <ZoomOn title="Cas d'étude : les recommandations de Netflix">
                <p className="mb-4">
                  Dans un article publié en 2015, deux responsables de Netflix estimaient que de l'ordre de 80 % des
                  heures visionnées étaient influencées par les recommandations, et que la personnalisation permettait à
                  l'entreprise d'économiser plus d'un milliard de dollars par an en limitant les résiliations
                  d'abonnement.
                </p>
                <div className="bg-blue-50 dark:bg-blue-950/30 p-3 rounded border border-blue-200 dark:border-blue-800">
                  <strong>À retenir :</strong> ces chiffres sont ceux de l'entreprise, datés de 2015, et ils ne
                  sont pas vérifiables de façon indépendante. Ils montrent surtout que, pour un service de
                  contenu, la recommandation est au cœur du produit.
                </div>
              </ZoomOn>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Transport et mobilité"
            icon={<Car className="h-5 w-5 text-green-500" />}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-400">Conduite assistée et véhicules autonomes</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Vision :</strong> reconnaissance de panneaux, de piétons, d'obstacles</li>
                    <li>• <strong>Prédiction :</strong> anticipation du comportement des autres usagers</li>
                    <li>• <strong>Décision :</strong> freiner, accélérer, tourner</li>
                    <li>• <strong>Planification :</strong> choix de la trajectoire en temps réel</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-green-700 dark:text-green-400">Villes connectées</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong>Trafic :</strong> réglage des feux de circulation</li>
                    <li>• <strong>Stationnement :</strong> prédiction des places disponibles</li>
                    <li>• <strong>Transports publics :</strong> ajustement des horaires</li>
                    <li>• <strong>Maintenance :</strong> prédiction des pannes d'infrastructure</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">Apprendre de la flotte</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  Les constructeurs de véhicules à conduite assistée utilisent des données de conduite remontées par
                  leur flotte, dans le cadre de leur politique de confidentialité, pour entraîner et évaluer leurs
                  modèles.
                </p>
                <div className="text-xs text-green-700 dark:text-green-400">
                  Une aide à la conduite reste une aide : le conducteur conserve la responsabilité du véhicule.
                </div>
              </div>
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Finance et assurance : sécuriser et optimiser"
            icon={<Building className="h-5 w-5 text-yellow-500" />}
          >
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickFactBox
                  title="Détection de fraude"
                  description="Analyse en temps réel de grands volumes de transactions. Le défi : limiter à la fois les fraudes non détectées et les fausses alertes, deux erreurs qui ont un coût."
                  icon="🛡️"
                  variant="warning"
                />

                <QuickFactBox
                  title="Scoring de crédit"
                  description="Évaluation automatique du risque d'un emprunteur à partir de nombreuses variables. Ces décisions sont encadrées : le règlement européen sur l'IA classe l'évaluation de solvabilité parmi les usages à haut risque."
                  icon="📊"
                  variant="success"
                />

                <QuickFactBox
                  title="Trading algorithmique"
                  description="Une part importante des ordres sur les grandes places boursières passe par des algorithmes qui exécutent des règles en quelques millisecondes. L'apprentissage automatique n'en est qu'une composante."
                  icon="📈"
                  variant="default"
                />
              </div>

              <ZoomOn title="Cas d'étude : l'analyse de contrats chez JPMorgan">
                <p className="mb-4">
                  D'après un article de Bloomberg publié en 2017, JPMorgan Chase a indiqué que son programme COIN
                  interprète des contrats de prêts commerciaux en quelques secondes, un travail qui mobilisait
                  environ 360 000 heures par an de juristes et de chargés de prêts.
                </p>
                <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded border border-yellow-200 dark:border-yellow-800">
                  <strong>Attention aux promesses :</strong> prédire les marchés financiers reste très difficile.
                  Un modèle qui réussit sur des données passées échoue souvent en conditions réelles
                  (surapprentissage). Méfiez-vous de toute précision annoncée sur l'évolution des cours.
                </div>
              </ZoomOn>
            </div>
          </ExpandableSection>
        </div>

        <div className="bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-4 sm:p-6 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Ce que ces exemples ont en commun
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <div className="font-medium text-indigo-700 dark:text-indigo-300">Conditions de réussite</div>
              <ul className="space-y-1 text-indigo-700 dark:text-indigo-400">
                <li>• Des données nombreuses, représentatives et correctement étiquetées</li>
                <li>• Une mesure claire de la performance (précision, rappel, coût des erreurs)</li>
                <li>• Une évaluation sur des données que le modèle n'a jamais vues</li>
                <li>• Un suivi dans le temps, car les données évoluent</li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="font-medium text-indigo-700 dark:text-indigo-300">Points de vigilance</div>
              <ul className="space-y-1 text-indigo-700 dark:text-indigo-400">
                <li>• Toutes les erreurs ne se valent pas : rater un spam n'est pas rater un cancer</li>
                <li>• Les biais des données se retrouvent dans les prédictions</li>
                <li>• Les gains annoncés par les éditeurs se vérifient au cas par cas</li>
                <li>• Pour les décisions importantes, un humain doit garder la main</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LessonSection>
  );
};

export default ApplicationsSection;
