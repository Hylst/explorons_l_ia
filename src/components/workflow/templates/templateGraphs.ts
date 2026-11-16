// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import type { Edge, Node } from '@xyflow/react';

/**
 * Graphes des gabarits de WorkflowTemplateLibrary. Fichier de données pur (aucun import à l'exécution) pour pouvoir
 * être contrôlé par un script Node. Convention : un nœud « input » à gauche, un ou plusieurs nœuds « output » à droite,
 * lecture de gauche à droite, 200 px entre deux colonnes et 100 px entre deux nœuds d'une même colonne.
 * Les étiquettes sont lues par workflow/analysis.ts (classifyNode) : une étape de contrôle porte « validation »,
 * « vérification » ou « contrôle » dans son libellé, pour être reconnue comme étape de logique.
 */

export interface TemplateGraph {
  nodes: Node[];
  edges: Edge[];
}

const entree = (id: string, label: string, x: number, y: number): Node => ({ id, type: 'input', data: { label }, position: { x, y } });
const etape = (id: string, label: string, x: number, y: number): Node => ({ id, type: 'default', data: { label }, position: { x, y } });
const sortie = (id: string, label: string, x: number, y: number): Node => ({ id, type: 'output', data: { label }, position: { x, y } });

const graphe = (nodes: Node[], liens: [string, string][]): TemplateGraph => ({
  nodes,
  edges: liens.map(([source, target]) => ({ id: `e${source}-${target}`, source, target, type: 'smoothstep' }))
});

export const templateGraphs = {
  // E-commerce et marketing
  'ecommerce-product-content': graphe(
    [
      entree('1', 'Sujet produit', 100, 100),
      etape('2', 'Recherche SEO', 300, 50),
      etape('3', 'Description par un modèle de langage', 500, 100),
      etape('4', 'Images générées', 700, 50),
      sortie('5', 'Fiche produit complète', 900, 100)
    ],
    [['1', '2'], ['1', '3'], ['2', '3'], ['3', '4'], ['4', '5']]
  ),
  'social-media-automation': graphe(
    [
      entree('1', 'Calendrier contenu', 100, 100),
      etape('2', 'Analyse audience', 300, 50),
      etape('3', 'Génération posts', 500, 100),
      etape('4', 'Adaptation plateformes', 700, 50),
      etape('5', 'Programmation auto', 700, 150),
      sortie('6', 'Posts programmés', 900, 100)
    ],
    [['1', '2'], ['1', '3'], ['2', '3'], ['3', '4'], ['3', '5'], ['4', '6'], ['5', '6']]
  ),
  'email-marketing-personalized': graphe(
    [
      entree('1', 'Base contacts', 100, 100),
      etape('2', 'Segmentation IA', 300, 100),
      etape('3', 'Personnalisation', 500, 50),
      etape('4', 'A/B Testing', 500, 150),
      etape('5', 'Envoi optimisé', 700, 100),
      sortie('6', 'Analytics campagne', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),

  // Service client et support
  'customer-support-ai': graphe(
    [
      entree('1', 'Message client (messagerie, e-mail)', 100, 100),
      etape('2', "Analyse de l'intention (modèle de langage)", 300, 100),
      etape('3', 'Porte conditionnelle (sujet couvert ou non)', 500, 100),
      etape('4', "Réponse d'un modèle de langage appuyée sur la base d'aide", 700, 50),
      etape('5', 'Transfert à un conseiller humain', 700, 150),
      sortie('6', 'Réponse envoyée au client', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['3', '4'], ['3', '5'], ['4', '6'], ['5', '6']]
  ),
  'ticket-classification': graphe(
    [
      entree('1', 'Ticket reçu', 100, 100),
      etape('2', "Classement par un modèle de langage", 300, 100),
      etape('3', 'Porte conditionnelle (classement sûr ou incertain)', 500, 100),
      etape('4', "Routage vers l'équipe concernée", 700, 50),
      etape('5', 'Relecture humaine du classement', 700, 150),
      sortie('6', 'Ticket attribué', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['3', '4'], ['3', '5'], ['4', '6'], ['5', '6']]
  ),
  'sentiment-monitoring': graphe(
    [
      entree('1', 'Avis et messages clients', 100, 100),
      etape('2', 'Nettoyage du texte', 300, 100),
      etape('3', 'Analyse de sentiment', 500, 100),
      etape('4', "Porte conditionnelle (seuil d'alerte)", 700, 50),
      etape('5', 'Regroupement par thème et par période', 700, 150),
      sortie('6', "Tableau de suivi et alertes à l'équipe", 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['3', '4'], ['3', '5'], ['4', '6'], ['5', '6']]
  ),

  // Création de contenu
  'blog-content-pipeline': graphe(
    [
      entree('1', 'Thème éditorial', 100, 100),
      etape('2', 'Recherche de sujets et de mots-clés', 300, 100),
      etape('3', 'Brouillon rédigé par un modèle de langage', 500, 50),
      etape('4', 'Titres et balises SEO', 500, 150),
      etape('5', 'Relecture et validation humaine', 700, 100),
      sortie('6', 'Article validé, prêt à programmer', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),
  'video-content-creation': graphe(
    [
      entree('1', 'Brief (idée, public, durée)', 100, 100),
      etape('2', 'Script rédigé par un modèle de langage', 300, 100),
      etape('3', 'Voix-off (synthèse vocale)', 500, 50),
      etape('4', "Images ou plans (génération d'images)", 500, 150),
      etape('5', 'Montage vidéo', 700, 150),
      etape('6', 'Sous-titres (transcription de la voix-off)', 700, 50),
      etape('7', 'Validation humaine', 900, 100),
      sortie('8', 'Vidéo prête à publier', 1100, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['3', '6'], ['5', '7'], ['6', '7'], ['7', '8']]
  ),
  'podcast-production': graphe(
    [
      entree('1', "Thème et sources de l'épisode", 100, 100),
      etape('2', 'Script rédigé par un modèle de langage', 300, 100),
      etape('3', 'Voix de synthèse', 500, 100),
      etape('4', 'Montage audio', 700, 50),
      etape('5', "Transcription pour les notes d'épisode", 700, 150),
      etape('6', 'Validation humaine avant publication', 900, 100),
      sortie('7', 'Épisode prêt à publier', 1100, 100)
    ],
    [['1', '2'], ['2', '3'], ['3', '4'], ['3', '5'], ['4', '6'], ['5', '6'], ['6', '7']]
  ),

  // Ressources humaines
  'recruitment-screening': graphe(
    [
      entree('1', 'Candidatures reçues', 100, 100),
      etape('2', 'Extraction des informations des CV (modèle de langage)', 300, 50),
      etape('3', 'Vérification des critères de tri (non discriminatoires)', 300, 150),
      etape('4', 'Rapprochement avec les critères du poste', 500, 100),
      etape('5', 'Validation humaine par le recruteur', 700, 100),
      sortie('6', 'Décision du recruteur et information des candidats', 900, 100)
    ],
    [['1', '2'], ['1', '3'], ['2', '4'], ['3', '4'], ['4', '5'], ['5', '6']]
  ),
  'employee-onboarding': graphe(
    [
      entree('1', "Fiche de poste et date d'arrivée", 100, 100),
      etape('2', 'Porte conditionnelle (parcours selon le poste)', 300, 100),
      etape('3', "Supports d'accueil rédigés par un modèle de langage", 500, 50),
      etape('4', 'Planification des rendez-vous et des rappels', 500, 150),
      etape('5', 'Validation par les RH et le manager', 700, 100),
      sortie('6', 'Parcours envoyé au nouvel employé', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),
  'performance-analysis': graphe(
    [
      entree('1', 'Indicateurs de performance fournis', 100, 100),
      etape('2', 'Vérification de la qualité des données', 300, 100),
      etape('3', 'Synthèse des indicateurs (modèle de langage)', 500, 50),
      etape('4', 'Repérage des écarts et des tendances', 500, 150),
      etape('5', 'Validation humaine par le manager et les RH', 700, 100),
      sortie('6', "Notes pour l'entretien de suivi", 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),

  // Finance et comptabilité
  'invoice-processing': graphe(
    [
      entree('1', 'Facture reçue (PDF ou image)', 100, 100),
      etape('2', 'Lecture du document (OCR)', 300, 100),
      etape('3', 'Extraction des champs (modèle de langage)', 500, 100),
      etape('4', 'Contrôle des montants et validation humaine des cas douteux', 700, 100),
      sortie('5', 'Écriture préparée pour la comptabilité', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['3', '4'], ['4', '5']]
  ),
  'expense-monitoring': graphe(
    [
      entree('1', 'Export des dépenses (fichier ou base)', 100, 100),
      etape('2', 'Catégorisation des dépenses', 300, 100),
      etape('3', "Détection d'écarts (règles et statistiques)", 500, 50),
      etape('4', 'Comparaison avec le budget', 500, 150),
      etape('5', 'Validation humaine des alertes', 700, 100),
      sortie('6', 'Liste des écarts à examiner', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),
  'financial-reporting': graphe(
    [
      entree('1', 'Données comptables (base de données)', 100, 100),
      etape('2', 'Calcul des indicateurs (requêtes et formules)', 300, 100),
      etape('3', 'Commentaire rédigé par un modèle de langage', 500, 50),
      etape('4', 'Projections selon des hypothèses explicites', 500, 150),
      etape('5', 'Validation par un responsable financier', 700, 100),
      sortie('6', 'Rapport financier relu', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),

  // Sécurité et conformité
  'security-monitoring': graphe(
    [
      entree('1', 'Journaux de plusieurs sources', 100, 100),
      etape('2', 'Normalisation des événements', 300, 100),
      etape('3', "Détection d'anomalies par règles", 500, 50),
      etape('4', 'Corrélation avec les vulnérabilités connues', 500, 150),
      etape('5', 'Validation humaine par un analyste', 700, 100),
      sortie('6', 'Alertes qualifiées et actions proposées', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),
  'gdpr-compliance': graphe(
    [
      entree('1', 'Registre des traitements et documents', 100, 50),
      entree('2', 'Grille des points à vérifier (base légale, durées, droits)', 100, 150),
      etape('3', 'Extraction des informations clés (modèle de langage)', 300, 50),
      etape('4', 'Rapprochement documents et points à vérifier', 500, 100),
      etape('5', 'Validation par le DPO ou un juriste', 700, 100),
      sortie('6', "Dossier de préparation d'audit", 900, 100)
    ],
    [['1', '3'], ['3', '4'], ['2', '4'], ['4', '5'], ['5', '6']]
  ),

  // Développement et IT
  'code-review-ai': graphe(
    [
      entree('1', 'Modification de code (diff)', 100, 100),
      etape('2', 'Analyse statique et linter', 300, 50),
      etape('3', 'Exécution des tests existants', 300, 150),
      etape('4', 'Relecture par un modèle de langage', 500, 100),
      etape('5', 'Validation humaine par un développeur', 700, 100),
      sortie('6', 'Remarques et décision de fusion', 900, 100)
    ],
    [['1', '2'], ['1', '3'], ['2', '4'], ['3', '4'], ['4', '5'], ['5', '6']]
  ),
  'automated-testing': graphe(
    [
      entree('1', 'Code et spécifications', 100, 100),
      etape('2', 'Tests proposés par un modèle de langage', 300, 100),
      etape('3', 'Exécution des tests', 500, 50),
      etape('4', 'Mesure de la couverture', 500, 150),
      etape('5', 'Validation humaine par un développeur', 700, 100),
      sortie('6', 'Tests retenus', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),
  'documentation-generator': graphe(
    [
      entree('1', 'Code et spécifications', 100, 100),
      etape('2', 'Analyse de la structure du code (modules, fonctions)', 300, 100),
      etape('3', 'Rédaction par un modèle de langage', 500, 50),
      etape('4', "Exemples d'utilisation à partir des tests", 500, 150),
      etape('5', 'Relecture technique et validation', 700, 100),
      sortie('6', 'Guide technique relu', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  ),

  // Informatique décisionnelle
  'sales-forecasting': graphe(
    [
      entree('1', 'Historique des ventes', 100, 50),
      entree('2', 'Facteurs externes (calendrier, promotions)', 100, 150),
      etape('3', 'Préparation et nettoyage des données', 300, 100),
      etape('4', 'Modèle prédictif (apprentissage automatique)', 500, 100),
      etape('5', 'Évaluation sur des données mises de côté', 700, 100),
      sortie('6', 'Estimations et erreur mesurée', 900, 100)
    ],
    [['1', '3'], ['2', '3'], ['3', '4'], ['4', '5'], ['5', '6']]
  ),
  'customer-segmentation': graphe(
    [
      entree('1', 'Données clients (commandes, historique)', 100, 100),
      etape('2', 'Minimisation et pseudonymisation des données', 300, 100),
      etape('3', 'Regroupement en segments (récence, fréquence, montant)', 500, 50),
      etape('4', 'Vérification du consentement et de la base légale', 500, 150),
      etape('5', 'Validation humaine des segments', 700, 100),
      sortie('6', 'Segments utilisables pour le marketing', 900, 100)
    ],
    [['1', '2'], ['2', '3'], ['2', '4'], ['3', '5'], ['4', '5'], ['5', '6']]
  )
} satisfies Record<string, TemplateGraph>;
