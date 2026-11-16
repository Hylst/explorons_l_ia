// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import CourseSources from '@/components/courses/CourseSources';
import ClassicCourseQuiz from '@/components/courses/ClassicCourseQuiz';
import {
  AlertTriangle,
  ArrowRight,
  BarChart4,
  Bot,
  LineChart,
  Megaphone,
  MessageCircle,
  Target,
  type LucideIcon,
} from 'lucide-react';

interface MarketingSection {
  id: string;
  tab: string;
  icon: LucideIcon;
  title: string;
  heading: string;
  intro: string;
  uses: string[];
  indicators: string[];
  caution: string;
  techniques: { name: string; text: string }[];
}

const marketingSources = [
  { label: 'Règlement (UE) 2016/679 (RGPD), article 22', href: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
  { label: "Règlement (UE) 2024/1689 sur l'IA, articles 5 et 50", href: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj' },
  { label: 'Directive 2011/83/UE, article 6(1)(ea)', href: 'https://eur-lex.europa.eu/eli/dir/2011/83/oj' },
  { label: 'Moffatt v. Air Canada, 2024 BCCRT 149', href: 'https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do' },
  { label: "CNIL\u00A0: IA et conformité au RGPD", href: 'https://www.cnil.fr/fr/intelligence-artificielle/ia-comment-etre-en-conformite-avec-le-rgpd' },
  { label: "Commission européenne\u00A0: règlement sur l'IA", href: 'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai' },
];

/**
 * Contenu des cinq onglets. Aucun chiffre de performance n'est donné : les résultats dépendent du
 * contexte, des données et de la mise en œuvre. Les points de vigilance renvoient au RGPD et au
 * règlement européen sur l'IA (application progressive : vérifier le calendrier en vigueur).
 */
const sections: MarketingSection[] = [
  {
    id: 'personnalisation',
    tab: 'Personnalisation',
    icon: Target,
    title: 'Personnalisation à grande échelle',
    heading: 'Adapter le message à chaque client',
    intro: "L'IA exploite les données de comportement pour adapter ce que voit chaque client\u00A0:",
    uses: [
      "Recommandations de produits fondées sur l'historique d'achat, la navigation et les préférences exprimées",
      "Contenus de site et d'e-mails adaptés aux centres d'intérêt de chaque visiteur",
      'Segments de clientèle mis à jour automatiquement à partir des comportements récents',
    ],
    indicators: ['Taux de conversion', 'Panier moyen', "Taux d'abandon de panier"],
    caution:
      "La personnalisation repose sur des données personnelles\u00A0: recueillez un consentement valable, limitez la collecte à ce qui est utile et laissez au client le moyen de refuser (RGPD). Une recommandation ne doit ni enfermer le client dans ses habitudes ni exploiter une situation de vulnérabilité.",
    techniques: [
      {
        name: 'Systèmes de recommandation',
        text: "Algorithmes qui exploitent les achats et les consultations passés pour estimer les produits susceptibles d'intéresser un client.",
      },
      {
        name: 'Segmentation dynamique',
        text: 'Regroupement automatique des clients selon leurs comportements, mis à jour au fil du temps.',
      },
      {
        name: 'Contenu personnalisé',
        text: 'Modèles génératifs qui adaptent textes et visuels à un segment, sous contrôle humain.',
      },
    ],
  },
  {
    id: 'analyse',
    tab: 'Analyse prédictive',
    icon: BarChart4,
    title: 'Analyse prédictive des comportements',
    heading: 'Anticiper plutôt que constater',
    intro: "À partir des données passées, des modèles estiment la probabilité d'événements futurs\u00A0:",
    uses: [
      "Probabilité d'achat d'un prospect ou d'un client",
      'Repérage des clients susceptibles de résilier (attrition, ou «\u00A0churn\u00A0»)',
      'Prévision de la demande pour ajuster les stocks et les prix',
    ],
    indicators: ["Taux d'attrition", 'Durée de vie client (CLV)', 'Taux de conversion des offres ciblées'],
    caution:
      "Une prédiction est une probabilité, pas une certitude, et elle reflète les biais des données passées. Le profilage est encadré\u00A0: le RGPD prévoit des garanties pour une décision fondée uniquement sur un traitement automatisé lorsqu'elle a des effets significatifs. En Europe, un prix personnalisé sur la base d'une décision automatisée doit être signalé au consommateur.",
    techniques: [
      {
        name: "Prévention de l'attrition",
        text: "Modèles de classification qui estiment le risque de départ pour déclencher une action de fidélisation.",
      },
      {
        name: 'Tarification dynamique',
        text: "Ajustement des prix selon la demande, le stock et la concurrence. Personnaliser le prix pour un client précis est beaucoup plus sensible.",
      },
      {
        name: 'Notation des prospects',
        text: 'Classement des contacts selon leur probabilité de conclure, pour prioriser le travail commercial.',
      },
    ],
  },
  {
    id: 'automatisation',
    tab: 'Automatisation',
    icon: Megaphone,
    title: 'Automatisation des campagnes',
    heading: 'Produire et tester plus vite, sous contrôle humain',
    intro: "L'IA intervient à chaque étape de la préparation et du suivi d'une campagne\u00A0:",
    uses: [
      "Rédaction de variantes de textes, d'objets d'e-mails, de visuels et de scripts vidéo",
      "Suggestion des canaux et des horaires d'envoi selon les segments",
      'Comparaisons automatisées de variantes qui orientent le trafic vers les plus performantes',
    ],
    indicators: ["Temps de production d'une campagne", 'Retour sur investissement publicitaire', "Taux d'engagement (ouverture, clic)"],
    caution:
      "Un contenu généré doit être relu\u00A0: erreurs factuelles, ton inadapté, promesses intenables. Vérifiez les droits sur les images et les textes produits. Le règlement européen sur l'IA impose des obligations de transparence pour certains contenus générés, avec une application progressive\u00A0: vérifiez le calendrier en vigueur. Gardez une validation humaine avant toute diffusion.",
    techniques: [
      {
        name: 'Générateurs de contenu',
        text: 'Outils qui produisent des textes, images et vidéos adaptés à différents canaux.',
      },
      {
        name: 'Orchestration omnicanale',
        text: 'Plateformes qui coordonnent les messages sur plusieurs canaux (e-mail, SMS, réseaux sociaux) pour une expérience cohérente.',
      },
      {
        name: 'Optimisation en continu',
        text: "Systèmes qui ajustent les paramètres d'une campagne en fonction des résultats observés.",
      },
    ],
  },
  {
    id: 'chatbots',
    tab: 'Chatbots',
    icon: Bot,
    title: 'Chatbots commerciaux',
    heading: 'Conseiller et accompagner, avec un relais humain',
    intro: 'Les assistants conversationnels fondés sur des modèles de langage vont au-delà de la FAQ\u00A0:',
    uses: [
      'Compréhension de la demande en langage courant, y compris quand elle est mal formulée',
      "Réponses fondées sur le catalogue et la documentation de l'entreprise (souvent avec la technique du RAG)",
      "Transfert vers un conseiller humain avec l'historique de la conversation",
    ],
    indicators: ['Taux de résolution sans intervention humaine', 'Satisfaction après échange', 'Taux de transfert vers un conseiller'],
    caution:
      "Un chatbot peut se tromper, et l'entreprise en reste responsable\u00A0: en 2024, un tribunal de Colombie-Britannique (Canada) a condamné Air Canada à indemniser un passager qui s'était fié à une information erronée donnée par son chatbot. Informez l'utilisateur qu'il échange avec une IA (obligation prévue par le règlement européen sur l'IA, avec application progressive), limitez le périmètre des réponses et prévoyez toujours un accès à un humain.",
    techniques: [
      {
        name: 'Recherche dans vos documents (RAG)',
        text: 'Le chatbot cherche d’abord des passages pertinents dans votre base de connaissances, puis rédige sa réponse à partir d’eux.',
      },
      {
        name: 'Support sur plusieurs canaux',
        text: 'Déploiement sur le site, l’application mobile et les messageries, avec un historique commun.',
      },
      {
        name: 'Analyse de sentiment',
        text: 'Estimation du ton d’un message pour orienter la réponse. Fiabilité limitée\u00A0: à utiliser avec prudence.',
      },
    ],
  },
  {
    id: 'optimisation',
    tab: 'Relation client',
    icon: MessageCircle,
    title: 'Optimisation de la relation client',
    heading: 'Mieux comprendre et suivre chaque client',
    intro: "L'IA aide les équipes à traiter plus vite les demandes et à mieux suivre les clients\u00A0:",
    uses: [
      'Résumé automatique des échanges et suggestion de réponses pour les conseillers',
      'Analyse des avis et des messages pour repérer les sujets de mécontentement récurrents',
      "Alertes sur les dossiers à risque avant qu'ils ne s'aggravent",
    ],
    indicators: ['Score de recommandation (NPS)', 'Taux de rétention', "Temps de traitement d'une demande"],
    caution:
      "Ces analyses portent sur des échanges personnels\u00A0: informez les clients et limitez la durée de conservation. Évitez de vous fonder sur une détection des émotions, dont la fiabilité scientifique est débattue et qui est interdite sur les lieux de travail et dans l'éducation (sauf raisons médicales ou de sécurité) par le règlement européen sur l'IA.",
    techniques: [
      {
        name: "CRM enrichi par l'IA",
        text: 'Systèmes qui résument les échanges, complètent les fiches et suggèrent la prochaine action.',
      },
      {
        name: 'Analyse des avis',
        text: 'Regroupement automatique des commentaires par thème pour repérer les irritants.',
      },
      {
        name: 'Détection de dossiers à risque',
        text: 'Modèles qui signalent les clients dont la situation se dégrade, pour une prise en charge rapide.',
      },
    ],
  },
];

const plan: CoursePlanItem[] = [
  {
    icon: <Target className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Personnalisation',
    description: 'Adapter les recommandations et les contenus sans enfermer le client dans ses habitudes.',
  },
  {
    icon: <BarChart4 className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Analyse prédictive',
    description: 'Anticiper certains comportements et mesurer la qualité des prédictions.',
  },
  {
    icon: <Bot className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Automatisation',
    description: 'Automatiser des tâches répétitives avec un contrôle humain et des critères clairs.',
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Chatbots et assistants',
    description: 'Répondre aux demandes courantes sans promettre une réponse toujours exacte.',
  },
  {
    icon: <Megaphone className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Relation client',
    description: 'Relier les usages, les indicateurs et les points de vigilance réglementaires.',
  },
];

const IAMarketingVente = () => (
  <CourseGuideLayout
    title="IA pour le marketing et la vente"
    subtitle="Comment l'intelligence artificielle transforme le marketing et la vente, et ce qu'il faut vérifier avant de s'y lancer"
    about={[
      "L’IA permet de personnaliser les messages, d’anticiper certains comportements et d’automatiser des tâches répétitives. Ces usages touchent aux données personnelles et à la relation commerciale.",
      "Ce panorama présente des usages courants, leurs indicateurs et leurs points de vigilance. Il ne contient volontairement aucun chiffre de performance : les résultats dépendent du contexte, des données et de la qualité de la mise en œuvre.",
    ]}
    learn={[
      "Distinguer personnalisation, prédiction, automatisation et assistance conversationnelle.",
      "Choisir des indicateurs adaptés et une base de comparaison.",
      "Repérer les risques pour les données personnelles et la relation client.",
      "Vérifier les affirmations d’un outil avant de l’adopter.",
    ]}
    plan={plan}
    info={{
      level: 'Débutant à intermédiaire',
      duration: '2 à 3 heures, lecture et pratique comprises',
      prerequisites: 'Notions de marketing ou de relation client ; aucun code requis.',
      contents: ['5 usages détaillés', '1 quiz de fin de cours', 'Sources citées', 'Points de vigilance'],
      audience: 'Professionnels du marketing, de la vente et de la relation client',
      tags: ['Marketing', 'Vente', 'Relation client', 'IA'],
    }}
    related={[
      {
        to: '/cours/ia-entreprise',
        title: "IA pour l'entreprise",
        description: 'Stratégie, retour sur investissement et mise en œuvre à l’échelle de l’organisation.',
      },
      {
        to: '/cours/ia-ethique',
        title: 'IA éthique et responsable',
        description: 'Biais, transparence et protection des données.',
      },
      {
        to: '/cours/utiliser-ia-travail',
        title: "Utiliser l'IA au travail",
        description: 'Cadre d’usage, confidentialité et bonnes pratiques pour les équipes.',
      },
      {
        to: '/cas-usage',
        title: "Cas d'usage",
        description: "Des exemples d'applications de l'IA dans différents secteurs.",
      },
    ]}
  >
      <Tabs defaultValue={sections[0].id} className="w-full max-w-5xl mx-auto">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto mb-8 gap-1">
          {sections.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              {section.tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {sections.map((section) => (
          <TabsContent key={section.id} value={section.id} className="px-2">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <section.icon className="h-6 w-6 mr-2 text-primary shrink-0" aria-hidden="true" />
                  {section.title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-medium mb-3">{section.heading}</h4>
                    <p className="mb-4 text-muted-foreground">{section.intro}</p>
                    <ul className="space-y-2 mb-6">
                      {section.uses.map((use) => (
                        <li key={use} className="flex items-start">
                          <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-muted p-6 rounded-lg">
                    <h4 className="text-lg font-medium mb-3">Indicateurs à suivre</h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Mesurez la situation avant de déployer, puis comparez avec un groupe témoin.
                    </p>
                    <ul className="space-y-3">
                      {section.indicators.map((indicator) => (
                        <li key={indicator} className="flex items-center">
                          <LineChart className="h-5 w-5 mr-2 text-primary shrink-0" aria-hidden="true" />
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                      <h5 className="text-sm font-medium flex items-center gap-2 mb-1 text-amber-800 dark:text-amber-200">
                        <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
                        Point de vigilance
                      </h5>
                      <p className="text-sm text-amber-800 dark:text-amber-200">{section.caution}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t pt-6">
                  <h4 className="text-lg font-medium mb-3">Techniques et outils courants</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.techniques.map((technique) => (
                      <div key={technique.name} className="bg-card p-4 rounded-lg border">
                        <h5 className="font-medium mb-2">{technique.name}</h5>
                        <p className="text-sm text-muted-foreground">{technique.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

    <section className="section-container py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Pour aller plus loin</h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Tendances à surveiller</h3>
              <p className="mb-4 text-muted-foreground">
                Des évolutions en cours, dont la portée reste à confirmer :
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Assistants d'achat conversationnels intégrés aux sites et aux applications</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Agents capables d'enchaîner plusieurs actions (recherche, comparaison, commande) pour le compte du
                    client
                  </span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Contenus multimodaux (texte, image, voix) adaptés à chaque segment</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Conseils de mise en œuvre</h3>
              <p className="mb-4 text-muted-foreground">Pour intégrer ces techniques sans mauvaise surprise :</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Commencez par un projet pilote dont le résultat se mesure</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Vérifiez la qualité et la base légale de vos données avant de les utiliser</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Formez vos équipes et définissez qui valide quoi</span>
                </li>
                <li className="flex items-start">
                  <ArrowRight className="h-5 w-5 mr-2 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Comparez toujours avec une solution simple (règles, segments manuels) avant d'investir</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <ClassicCourseQuiz slug="ia-marketing-vente" />

        <CourseSources sources={marketingSources} />
      </div>
    </section>
  </CourseGuideLayout>
);

export default IAMarketingVente;
