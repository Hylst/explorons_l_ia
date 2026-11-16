// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { asset } from '@/lib/paths';

interface DetailedExample {
  /** Description de l'illustration pour les lecteurs d'écran. */
  imageAlt: string;
  title: string;
  sector: string;
  description: string;
  impact: string;
  technology: string;
  realWorldCase: string;
  image?: string;
}

// Les gains chiffrés sont volontairement absents : les fourchettes publiées par les éditeurs ou les
// cabinets de conseil ne sont pas vérifiables. Les exemples réels sont attribués à leur source.
const detailedExamples: DetailedExample[] = [
  {
    title: "Diagnostic médical assisté par IA",
    sector: "Santé",
    description: "Des algorithmes de deep learning analysent des images médicales (radiographies, IRM, scanners, fonds d'œil) pour repérer des anomalies et aider à prioriser les examens. Sur certaines tâches précises, leurs performances se rapprochent de celles de spécialistes, mais elles dépendent fortement des données d'entraînement et de la population étudiée.",
    impact: "Aide à la détection précoce, gain de temps dans le tri des examens, accès facilité à un premier avis dans les régions où les spécialistes manquent. Les erreurs (faux positifs, faux négatifs) restent possibles\u00A0: la décision et la responsabilité médicales demeurent humaines.",
    technology: "Réseaux de neurones convolutifs (CNN), vision par ordinateur, apprentissage par transfert, augmentation de données",
    realWorldCase: "IDx-DR (Digital Diagnostics, produit rebaptisé LumineticsCore depuis), autorisé par la FDA américaine en 2018, a été le premier système d'IA autorisé à rendre un résultat de dépistage de la rétinopathie diabétique sans qu'un médecin interprète l'image. Dans l'essai clinique publié en 2018, sa sensibilité était d'environ 87\u00A0% et sa spécificité d'environ 91\u00A0%.",
    image: asset("pics/diagnostic-medical.jpg"),
    imageAlt: "Illustration\u00A0: une radiographie des poumons, une loupe, un cerveau stylisé et un stéthoscope"
  },
  {
    title: "Systèmes d'alerte précoce en finance",
    sector: "Finance",
    description: "Surveillance continue des transactions pour repérer les comportements inhabituels ou frauduleux avant qu'ils ne causent des dommages aux établissements financiers et à leurs clients.",
    impact: "Vérification ou blocage de transactions suspectes en temps réel, protection des clients contre l'usurpation d'identité, détection de schémas de fraude nouveaux. Le compromis est permanent\u00A0: trop de fausses alertes agacent les clients, trop peu laissent passer des fraudes.",
    technology: "Détection d'anomalies en temps réel, apprentissage supervisé sur des fraudes connues, analyse comportementale, analyse de graphes",
    realWorldCase: "Les réseaux de paiement, comme Mastercard ou Visa, attribuent à chaque transaction un score de risque calculé par des modèles d'apprentissage en une fraction de seconde. Les performances annoncées par ces entreprises sont leurs propres chiffres et ne sont pas vérifiables de façon indépendante.",
    image: asset("pics/alerte-fraude.jpg"),
    imageAlt: "Illustration\u00A0: un ordinateur portable affiche une grille d'opérations bancaires, dont une carte bancaire surlignée en orange à côté d'un triangle d'alerte"
  },
  {
    title: "Assistants pédagogiques personnalisés",
    sector: "Éducation",
    description: "Des plateformes éducatives ajustent le niveau, le rythme et les exercices proposés à chaque apprenant d'après ses réponses passées.",
    impact: "Exercices mieux ciblés, repérage plus rapide des difficultés, aide aux enseignants pour différencier leur pédagogie. Les effets sur les résultats varient selon les études, le contexte et l'accompagnement humain\u00A0: aucun chiffre général ne peut être avancé.",
    technology: "Systèmes de tutorat intelligents, modèles prédictifs, traitement du langage naturel, analyse de progression",
    realWorldCase: "Duolingo estime le niveau de chaque apprenant et la difficulté de chaque exercice pour choisir la suite de la leçon. L'entreprise a décrit cette approche (modèle «\u00A0Birdbrain\u00A0») sur son blog technique\u00A0; l'effet réel sur l'apprentissage reste à documenter par des études indépendantes.",
    image: asset("pics/apprentissage-adaptatif.jpg"),
    imageAlt: "Illustration\u00A0: un adolescent travaille sur un ordinateur portable, un exercice validé d'une coche verte à l'écran"
  },
  {
    title: "Maintenance prédictive industrielle",
    sector: "Industrie",
    description: "Analyse des données des capteurs des équipements industriels pour prédire les pannes avant qu'elles ne se produisent, ce qui permet une maintenance proactive plutôt que réactive et limite les arrêts de production coûteux.",
    impact: "Moins d'arrêts imprévus, interventions planifiées au bon moment, durée de vie des équipements mieux exploitée, sécurité des installations améliorée. Les gains dépendent de l'état initial de la maintenance et de la qualité des données de capteurs\u00A0: les fourchettes annoncées par les éditeurs sont à manier avec prudence.",
    technology: "Internet des objets (IoT), analyse prédictive, apprentissage automatique, jumeaux numériques, edge computing",
    realWorldCase: "Des industriels comme Siemens commercialisent des solutions de maintenance prédictive (par exemple Senseye, racheté en 2022) qui analysent les données de capteurs des machines pour signaler une dérive avant la panne. Les résultats varient d'un site à l'autre et sont généralement communiqués par les fournisseurs eux-mêmes.",
    image: asset("pics/maintenance-predictive.jpg"),
    imageAlt: "Illustration\u00A0: un moteur électrique industriel, un capteur et une tablette qui affiche une courbe de vibrations avec un pic"
  },
  {
    title: "Optimisation logistique du dernier kilomètre",
    sector: "Logistique",
    description: "Des algorithmes optimisent les itinéraires de livraison en tenant compte du trafic, de la météo, des créneaux demandés par les clients et de nombreuses autres contraintes.",
    impact: "Distances parcourues et carburant réduits, livraisons plus ponctuelles, empreinte carbone moindre. Une grande part du gain vient de l'optimisation mathématique classique autant que de l'apprentissage automatique.",
    technology: "Optimisation combinatoire, algorithmes génétiques, apprentissage par renforcement, GPS et cartographie avancée",
    realWorldCase: "UPS a déployé ORION, un système qui calcule l'ordre des arrêts de chaque chauffeur-livreur. Selon les chiffres communiqués par l'entreprise, il permettrait d'économiser de l'ordre de 10 millions de gallons de carburant par an. ORION relève surtout de la recherche opérationnelle plutôt que du deep learning.",
    image: asset("pics/logistique-tournee.jpg"),
    imageAlt: "Illustration\u00A0: une camionnette jaune suit un itinéraire en pointillés entre des repères de livraison, dans une ville vue de haut"
  },
  {
    title: "Analyse juridique automatisée",
    sector: "Juridique",
    description: "Des outils d'IA analysent de grands volumes de documents juridiques pour en extraire des informations, rapprocher des précédents et signaler des clauses à risque, afin d'accélérer le travail des professionnels du droit.",
    impact: "Recherche documentaire plus rapide, relecture de contrats assistée, coûts potentiellement réduits. Les modèles de langage peuvent inventer des références\u00A0: des avocats américains ont été sanctionnés en 2023 pour avoir cité des décisions inexistantes produites par un agent conversationnel. Toute citation doit être vérifiée.",
    technology: "Traitement du langage naturel (NLP), extraction d'information, classification de texte, systèmes de raisonnement",
    realWorldCase: "D'après un article de Bloomberg (2017), JPMorgan Chase a indiqué que son programme COIN interprète des contrats de prêts commerciaux en quelques secondes, un travail qui mobilisait environ 360 000 heures par an de juristes et de chargés de prêts.",
    image: asset("pics/analyse-juridique.jpg"),
    imageAlt: "Illustration\u00A0: une pile de documents, une loupe posée sur une page, une balance de la justice et un ordinateur portable"
  },
  {
    title: "Agriculture de précision",
    sector: "Agriculture",
    description: "L'IA analyse les données de capteurs, les images satellites et les prévisions météorologiques pour ajuster l'irrigation, la fertilisation et les traitements des cultures, parfois à l'échelle de la plante.",
    impact: "Dosage plus fin de l'eau, des engrais et des traitements, réduction possible des intrants et de l'impact environnemental. Les bénéfices dépendent des cultures, du climat et de l'équipement\u00A0: ils ne sont pas les mêmes d'une exploitation à l'autre.",
    technology: "Vision par ordinateur, apprentissage automatique, IoT agricole, traitement d'images satellites, drones",
    realWorldCase: "Blue River Technology, rachetée par John Deere en 2017, a développé un pulvérisateur qui reconnaît les mauvaises herbes par vision par ordinateur et ne traite que celles-ci plutôt que tout le champ. Le constructeur communique des réductions d'herbicide qui varient selon les cultures et les saisons.",
    image: asset("pics/agriculture-precision.jpg"),
    imageAlt: "Illustration\u00A0: un champ cultivé avec une rampe d'irrigation goutte à goutte, un capteur dans le sol, un drone et un satellite dans le ciel"
  },
  {
    title: "Technologies d'assistance par IA",
    sector: "Accessibilité",
    description: "Des systèmes d'IA interprètent la parole, les images ou les gestes pour aider les personnes en situation de handicap à communiquer, à s'orienter et à commander leurs appareils.",
    impact: "Autonomie accrue, accès facilité à l'information et aux services numériques, inclusion. Ces outils fonctionnent mieux lorsqu'ils sont conçus avec les personnes concernées et testés sur des profils variés (voix atypiques, par exemple).",
    technology: "Reconnaissance vocale, vision par ordinateur, synthèse vocale, suivi oculaire, traitement du signal",
    realWorldCase: "L'application Seeing AI de Microsoft (2017) décrit à voix haute les textes, les personnes et les objets captés par la caméra du téléphone, à l'intention des personnes aveugles ou malvoyantes. Le projet Euphonia de Google cherche à adapter la reconnaissance vocale aux personnes dont la parole est atypique.",
    image: asset("pics/assistance-vocale.jpg"),
    imageAlt: "Illustration\u00A0: un homme âgé en fauteuil roulant parle à un ordinateur qui affiche un micro, une aidante debout à ses côtés"
  }
];

const DetailedExamples: React.FC = () => {
  return (
    <div className="space-y-8 mt-10">
      {detailedExamples.map((example, index) => (
        <motion.div
          key={example.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <Card className="mb-8 overflow-hidden border-primary/10">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">{example.title}</CardTitle>
                  <CardDescription className="mt-1">Secteur : {example.sector}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Cas concret
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {example.image && (
                  <div className="rounded-lg overflow-hidden aspect-video self-start">
                    <img
                      src={example.image}
                      alt={example.imageAlt}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium uppercase text-muted-foreground mb-1">Description</h4>
                    <p className="text-sm">{example.description}</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-primary mb-2">Impact</h4>
                      <p className="text-sm">{example.impact}</p>
                    </div>

                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-primary mb-2">Technologies</h4>
                      <p className="text-sm">{example.technology}</p>
                    </div>

                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-primary mb-2">Exemple réel</h4>
                      <p className="text-sm">{example.realWorldCase}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default DetailedExamples;
