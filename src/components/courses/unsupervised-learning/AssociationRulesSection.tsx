// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { ShoppingCart } from 'lucide-react';
import LessonSection from '../LessonSection';
import InteractiveExample from '../InteractiveExample';
import AssociationRulesDemo from './AssociationRulesDemo';

const AssociationRulesSection: React.FC = () => {
  return (
    <LessonSection 
      title="Règles d'association : repérer des liens fréquents"
      icon={<ShoppingCart className="h-6 w-6" />}
    >
      <div className="space-y-6">
        <p className="text-lg">
          "Les personnes qui achètent du pain achètent souvent du lait" - voilà le type de découverte que permettent 
          les règles d'association. Cette technique identifie des relations fréquentes entre différents éléments 
          dans un jeu de données.
        </p>

        <AssociationRulesDemo />

        <InteractiveExample
          title="Analyse du panier de marché"
          description="Voyons comment un supermarché peut découvrir des associations entre produits"
          steps={[
            {
              title: "Collecte des données",
              description: "Enregistrer tous les achats\u00A0: Ticket 1 {Pain, Lait, Œufs}, Ticket 2 {Pain, Beurre}, etc.",
              result: "Base de tickets de caisse (ici, 10 tickets fictifs)"
            },
            {
              title: "Calcul des fréquences",
              description: "Identifier les combinaisons fréquentes\u00A0: dans l'exemple ci-dessus, Pain+Lait apparaît dans 4 tickets sur 10",
              result: "Pain → Lait (Support\u00A0: 40\u00A0%, Confiance\u00A0: 67\u00A0%, Lift\u00A0: 1,11)"
            },
            {
              title: "Génération des règles",
              description: "Créer des règles\u00A0: Si Pain alors Lait (confiance de 67\u00A0% sur les 10 tickets d'exemple)",
              result: "Règles retenues selon des seuils minimaux de support et de confiance"
            },
            {
              title: "Application pratique",
              description: "Placer le lait près du pain, proposer des promotions groupées",
              result: "Effet à mesurer ensuite sur des données réelles (par exemple par un test A/B)"
            }
          ]}
          finalMessage="Les règles d'association mettent en évidence des achats fréquemment associés. Elles décrivent une co-occurrence, pas une cause, et leur intérêt se vérifie sur des données réelles."
        />
      </div>
    </LessonSection>
  );
};

export default AssociationRulesSection;
