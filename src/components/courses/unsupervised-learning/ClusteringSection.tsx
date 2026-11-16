// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Users } from 'lucide-react';
import LessonSection from '../LessonSection';
import ZoomOn from '../ZoomOn';
import DidYouKnow from '../DidYouKnow';
import ClusteringVisualization from './ClusteringVisualization';

const ClusteringSection: React.FC = () => {
  return (
    <LessonSection 
      title="Le clustering : identifier des groupes selon une mesure de similarité"
      icon={<Users className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <p className="text-lg">
          Le clustering est probablement la technique la plus intuitive de l'apprentissage non supervisé. 
          L'objectif est de diviser un ensemble de données en groupes (clusters) où les éléments d'un même groupe 
          se ressemblent plus entre eux qu'avec les éléments des autres groupes.
        </p>

        <ZoomOn title="Algorithme K-means en action">
          <p className="mb-4">
            K-means est l'un des algorithmes de clustering les plus populaires. Voici comment il fonctionne :
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Choisir le nombre de clusters (K) à créer</li>
            <li>Placer aléatoirement K "centres" dans l'espace des données</li>
            <li>Assigner chaque point au centre le plus proche</li>
            <li>Recalculer la position des centres en fonction des points assignés</li>
            <li>Répéter les étapes 3-4 jusqu'à convergence</li>
          </ol>
        </ZoomOn>

        <ClusteringVisualization />

        <DidYouKnow
          items={[
            {
              title: "Des groupes dans les données",
              content: "Des regroupements apparaissent dans de nombreux jeux de données\u00A0: galaxies selon leurs propriétés, espèces selon leur habitat, profils d'écoute musicale. Un cluster reste le résultat d'une analyse\u00A0: il ne prouve pas que les groupes existent «\u00A0naturellement\u00A0»."
            },
            {
              title: "Netflix et clustering",
              content: "Dans un article de 2015, Gomez-Uribe et Hunt indiquent que le système de recommandation de Netflix combine des méthodes supervisées et non supervisées, dont la réduction de dimension par regroupement ou par compression. Le regroupement permet de repérer des profils proches sans étiquette préalable (Gomez-Uribe et Hunt, 2015)."
            },
            {
              title: "Marketing ciblé",
              content: "Les entreprises utilisent le clustering pour segmenter leurs clients en groupes homogènes et adapter leurs stratégies marketing à chaque segment."
            }
          ]}
        />
      </div>
    </LessonSection>
  );
};

export default ClusteringSection;
