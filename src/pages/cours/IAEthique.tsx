// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Link } from 'react-router';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import CourseModule from '@/components/courses/CourseModule';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import ClassicCourseQuiz from '@/components/courses/ClassicCourseQuiz';
import ZoomOn from '@/components/courses/ZoomOn';
import DidYouKnow from '@/components/courses/DidYouKnow';
import ExpandableSection from '@/components/courses/ExpandableSection';
import InteractiveExample from '@/components/courses/InteractiveExample';
import InfoTooltip from '@/components/courses/InfoTooltip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AUTHOR_TITLE } from '@/config/site';
import { 
  Shield, 
  Scale, 
  Eye, 
  Heart, 
  AlertTriangle, 
  CheckCircle2,
  Users,
  Globe,
  BookOpen,
  Gavel,
  Brain,
  Lock,
  FileText,
  Lightbulb,
  Search,
  Building,
  UserCheck,
  Database,
  Zap,
  Target
} from 'lucide-react';

const plan: CoursePlanItem[] = [
  { icon: <Heart className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Fondamentaux de l’éthique', description: 'Principes, cadre d’évaluation et limites des chartes.' },
  { icon: <Users className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Biais et équité', description: 'Identifier les biais, mesurer les écarts et documenter les corrections.' },
  { icon: <Gavel className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Gouvernance et conformité', description: 'Rôles, comité, documentation et exigences réglementaires.' },
  { icon: <AlertTriangle className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Études de cas', description: 'Analyser des dilemmes et arbitrer avec une méthode explicite.' },
  { icon: <BookOpen className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Culture et formation', description: 'Installer une pratique responsable dans la durée.' },
];

const ethicsSources = [
  { label: 'AI Act Service Desk\u00A0: article 113, calendrier d\'application', href: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-113' },
  { label: 'AI Act Service Desk\u00A0: article 86, droit à l\'explication', href: 'https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-86' },
  { label: 'EUR-Lex\u00A0: règlement (UE) 2024/1689 sur l\'IA', href: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj' },
  { label: 'EUR-Lex\u00A0: règlement (UE) 2026/1744', href: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj' },
  { label: 'EUR-Lex\u00A0: règlement (UE) 2016/679 (RGPD), article 22', href: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' },
  { label: 'Buolamwini et Gebru (2018)\u00A0: Gender Shades', href: 'https://proceedings.mlr.press/v81/buolamwini18a.html' },
  { label: 'ProPublica (2016)\u00A0: Machine Bias (COMPAS)', href: 'https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing' },
  { label: 'Reuters (2018)\u00A0: Amazon scraps secret AI recruiting tool', href: 'https://www.reuters.com/article/us-amazon-com-jobs-automation-insight-idUSKCN1MK08G' },
  { label: 'Seldon Alibi\u00A0: licence du logiciel', href: 'https://github.com/SeldonIO/alibi/blob/master/LICENSE' },
  { label: 'Ribeiro et al. (2016)\u00A0: Why Should I Trust You? (LIME)', href: 'https://arxiv.org/abs/1602.04938' },
  { label: 'Lundberg et Lee (2017)\u00A0: A Unified Approach to Interpreting Model Predictions (SHAP)', href: 'https://arxiv.org/abs/1705.07874' },
];

const IAEthique = () => {
  const headerProps = {
    title: "IA éthique et responsable\u00A0: guide pratique",
    subtitle: "Développer et déployer l'IA de manière éthique et responsable",
    author: "Geoffroy Streit",
    authorDescription: AUTHOR_TITLE,
    duration: "3-4 heures",
    level: "Intermédiaire",
    audience: "Développeurs, managers, décideurs et juristes",
    tags: ["IA éthique", "Responsabilité", "Biais", "Transparence", "RGPD", "Gouvernance"]
  };

  const ethicalFrameworkSteps = [
    {
      title: "Évaluation éthique initiale",
      description: "Évaluer les risques éthiques potentiels du système IA",
      result: "Matrice de risques avec score de criticité par dimension éthique"
    },
    {
      title: "Conception éthique dès l'origine",
      description: "Intégrer les principes éthiques dès la conception",
      result: "Spécifications techniques incluant contraintes éthiques"
    },
    {
      title: "Tests et validation",
      description: "Tester les biais, équité et transparence du modèle",
      result: "Rapport d'audit avec métriques d'équité et recommandations"
    },
    {
      title: "Monitoring continu",
      description: "Surveiller le comportement éthique en production",
      result: "Dashboard de monitoring éthique et alertes automatisées"
    }
  ];

  const module1Data = [
    {
      icon: <Scale className="h-5 w-5 text-primary" />,
      title: "Principes éthiques fondamentaux",
      items: [
        "Équité et non-discrimination algorithmique",
        "Transparence et explicabilité des décisions",
        "Responsabilité et redevabilité des acteurs",
        "Respect de la vie privée et protection des données",
        "Bienfaisance et non-malfaisance (do no harm)",
        "Autonomie humaine et supervision humaine effective"
      ]
    },
    {
      icon: <AlertTriangle className="h-5 w-5 text-primary" />,
      title: "Identification et mitigation des risques",
      items: [
        "Biais algorithmiques\u00A0: sources et détection",
        "Discrimination involontaire et intersectionnelle",
        "Atteintes à la vie privée et surveillance",
        "Manipulation et désinformation à grande échelle",
        "Impact sur l'emploi et inégalités sociales",
        "Dual use et détournement malveillant"
      ]
    },
    {
      icon: <Shield className="h-5 w-5 text-primary" />,
      title: "Cadre réglementaire et conformité",
      items: [
        "AI Act européen\u00A0: obligations par niveau de risque",
        "RGPD et protection des données personnelles",
        "Standards internationaux (ISO/IEC 23053, 23894)",
        "Certifications et audits éthiques tiers",
        "Conformité sectorielle (santé, finance, etc.)",
        "Responsabilité civile et pénale des développeurs"
      ]
    }
  ];

  const didYouKnowItems = [
    {
      title: "Un biais mesuré\u00A0: Gender Shades",
      content: "En 2018, l'étude Gender Shades (Joy Buolamwini et Timnit Gebru, MIT Media Lab) a testé trois systèmes commerciaux d'analyse faciale\u00A0: leurs taux d'erreur atteignaient jusqu'à environ 35\u00A0% pour les femmes à la peau foncée, contre moins de 1\u00A0% pour les hommes à la peau claire. Ces résultats ont poussé les entreprises concernées à améliorer leurs systèmes."
    },
    {
      title: "Quand un outil de recrutement discrimine",
      content: "En 2018, l'agence Reuters a révélé qu'Amazon avait abandonné un outil expérimental de tri de CV\u00A0: entraîné sur dix ans de candidatures, surtout masculines, il pénalisait des indices associés aux femmes. Les ingénieurs n'avaient pas pu garantir qu'il cesserait de discriminer."
    },
    {
      title: "Des sanctions élevées dans le règlement européen",
      content: "Le règlement européen sur l'IA prévoit des amendes pouvant aller jusqu'à 35 millions d'euros ou 7\u00A0% du chiffre d'affaires mondial pour les pratiques interdites, et des montants moindres pour les autres manquements. Son application est progressive depuis 2025\u00A0: vérifiez le calendrier en vigueur."
    },
    {
      title: "Le droit de comprendre une décision",
      content: "Le RGPD encadre les décisions fondées uniquement sur un traitement automatisé produisant des effets juridiques ou significatifs (article 22), avec des exceptions (contrat, loi, consentement) et des garanties. Le règlement sur l'IA prévoit, pour certains systèmes à haut risque, un droit d'obtenir des explications sur le rôle du système et les principaux éléments d'une décision individuelle (article 86, applicable depuis le 2 août 2026). L'explicabilité n'est donc pas seulement un atout commercial\u00A0: dans ces cas précis, c'est aussi une obligation légale."
    },
    {
      title: "Paradoxe de la surveillance éthique",
      content: "Pour surveiller l'équité des algorithmes, il faut souvent collecter plus de données sensibles (origine, genre), ce qui crée de nouveaux risques pour la vie privée. L'équité et la protection des données peuvent être en tension."
    }
  ];

  return (
    <CourseGuideLayout
      title={headerProps.title}
      subtitle={headerProps.subtitle}
      about={[
        "L’éthique de l’IA ne se réduit pas à une charte : elle demande des choix explicites sur les données, les biais, la transparence, la responsabilité et les recours. Le cadre réglementaire fixe des obligations, mais ne remplace pas le jugement.",
        "Ce cours propose des méthodes pour identifier les risques, documenter les arbitrages et mettre en place une gouvernance proportionnée.",
      ]}
      learn={[
        "Distinguer éthique, droit et conformité.",
        "Identifier les biais et mesurer leurs effets.",
        "Construire une gouvernance et une documentation proportionnées.",
        "Analyser un dilemme avec une méthode explicite.",
      ]}
      plan={plan}
      info={{
        level: headerProps.level,
        duration: headerProps.duration,
        prerequisites: 'Aucun prérequis technique ; connaître le contexte de son organisation aide.',
        contents: ['5 modules', '1 quiz de fin de cours', 'Sources citées', 'Études de cas et repères'],
        audience: headerProps.audience,
        tags: headerProps.tags,
      }}
      related={[
        { to: '/cours/ia-entreprise', title: "IA pour l'entreprise", description: 'Stratégie, valeur et mise en œuvre.' },
        { to: '/cours/utiliser-ia-travail', title: "Utiliser l'IA au travail", description: 'Cadre d’usage, confidentialité et gouvernance.' },
        { to: '/cours/ia-marketing-vente', title: 'IA pour le marketing et la vente', description: 'Usages, indicateurs et points de vigilance.' },
      ]}
    >
        {/* Introduction enrichie */}
        <CourseModule
          title="Introduction : L'impératif éthique de l'IA à l'ère de l'AI Act"
          description="Comprendre les enjeux éthiques, légaux et business de l'IA responsable"
        >
          <Alert className="mb-6 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800">
            <Lightbulb className="h-5 w-5 text-amber-600" />
            <AlertDescription>
              <strong>Objectif pédagogique :</strong> À la fin de ce module, vous pourrez décrire les principes
              de l'IA éthique et les grandes étapes d'une démarche de gouvernance, en lien avec les exigences du
              règlement européen sur l'IA. Le cours ne remplace pas un avis juridique.
            </AlertDescription>
          </Alert>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Pourquoi l'éthique IA est stratégique ?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    L'IA transforme notre société à une vitesse inédite, mais avec cette puissance 
                    vient une responsabilité immense. L'éthique n'est plus optionnelle : c'est un 
                    impératif business, réglementaire et sociétal.
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Obligations réglementaires selon la catégorie de risque (règlement sur l'IA)</li>
                    <li>• Réduction des risques juridiques et réputationnels</li>
                    <li>• Confiance client et acceptabilité sociale</li>
                    <li>• Avantage concurrentiel et différenciation</li>
                  </ul>
                </div>
                <Card className="bg-muted/40">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3">Ce que l'éthique de l'IA change concrètement</h4>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>
                        • <strong>Obligations légales :</strong> le RGPD s'applique déjà, et le règlement européen sur
                        l'IA s'applique progressivement depuis 2025.
                      </li>
                      <li>
                        • <strong>Risque juridique et réputationnel :</strong> des contentieux et des affaires très
                        médiatisées (Amazon en 2018, COMPAS en 2016) ont montré le coût réputationnel et juridique
                        d'un système contesté.
                      </li>
                      <li>
                        • <strong>Confiance :</strong> difficile à mesurer de façon fiable, et facile à perdre.
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
              
          <ZoomOn title="L'IA responsable : un enjeu de société et de compétitivité">
            <div className="space-y-4">
              <p className="mb-3">
                Chaque jour, l'IA prend des millions de décisions qui affectent la vie des gens : 
                qui obtient un prêt, qui est embauché, qui reçoit quelle publicité, qui bénéficie 
                de soins médicaux. Ces décisions peuvent perpétuer ou corriger des inégalités.
              </p>
              
              <ExpandableSection 
                title="Les 4 dimensions de l'impact sociétal de l'IA"
                icon={<Globe className="h-4 w-4" />}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-blue-200">
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        1. Justice et équité
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Garantir un traitement équitable indépendamment de l'origine, 
                        du genre, de l'âge ou du statut socio-économique
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200">
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Lock className="h-4 w-4 text-green-500" />
                        2. Vie privée et autonomie
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Respecter le droit à la vie privée et préserver l'autonomie 
                        de décision des individus
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-purple-200">
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Eye className="h-4 w-4 text-purple-500" />
                        3. Transparence et confiance
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Expliquer les décisions automatisées et maintenir la 
                        confiance du public dans les systèmes IA
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-orange-200">
                    <CardContent className="pt-4">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <Building className="h-4 w-4 text-orange-500" />
                        4. Impact économique et social
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Anticiper les effets sur l'emploi et accompagner les 
                        transitions professionnelles
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </ExpandableSection>

              <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <h5 className="font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  Cas réels de dérives éthiques
                </h5>
                <div className="text-sm space-y-2">
                  <p>• <strong>Recrutement (Amazon) :</strong> outil expérimental de tri de CV (révélé par Reuters en 2018) abandonné car il pénalisait les candidatures féminines</p>
                  <p>• <strong>Justice prédictive (COMPAS) :</strong> déséquilibre racial des erreurs dénoncé par ProPublica en 2016, contesté par l'éditeur du logiciel (les critères d'équité utilisés divergent)</p>
                  <p>• <strong>Reconnaissance faciale :</strong> erreurs nettement plus fréquentes pour les femmes à la peau foncée (étude Gender Shades, 2018)</p>
                  <p>• <strong>Crédit scoring :</strong> risque de discrimination indirecte par des variables « proxy », comme le code postal</p>
                </div>
              </div>

              <p className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4 text-sm">
                <strong>Opportunité :</strong> une organisation qui documente ses choix, teste ses systèmes et
                explique ses décisions réduit ses risques juridiques et peut gagner en confiance. L'ampleur de ces
                effets dépend du contexte et n'est pas chiffrable de façon générale.
              </p>
            </div>
          </ZoomOn>

          <InteractiveExample
            title="Cas pratique (scénario fictif) : audit éthique d'un système de recommandation"
            description="Suivons l'audit d'un algorithme de recommandation d'offres d'emploi"
            steps={ethicalFrameworkSteps}
            finalMessage="Dans ce scénario fictif, l'audit met en évidence un écart de traitement entre femmes et hommes et conduit à corriger le modèle. Les mesures d'équité (parité, égalité des chances) sont à choisir et à justifier selon le contexte : aucun chiffre unique ne prouve qu'un système est « juste »."
          />
        </CourseModule>

        {/* Module 1 enrichi */}
        <CourseModule
          title="Module 1 : Fondamentaux et framework de l'IA éthique"
          description="Comprendre les concepts essentiels et construire votre cadre éthique"
          modules={module1Data}
        />

        <div className="max-w-4xl mx-auto mb-12">
          <ExpandableSection 
            title="🎯 Framework d'évaluation éthique IA" 
            icon={<Target className="h-4 w-4" />}
          >
            <div className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Un cadre d'évaluation pédagogique en 4 dimensions, proposé par l'auteur et inspiré de plusieurs exigences du règlement européen sur l'IA (supervision humaine, transparence, gouvernance des données). Ce n'est pas un référentiel officiel :
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Scale className="h-4 w-4" />
                      1. Équité & Non-discrimination
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="space-y-1">
                      <p><strong>Métriques :</strong> Parité démographique, égalité des chances, parité prédictive</p>
                      <p><strong>Tests :</strong> Analyse par sous-groupes, tests de disparité d'impact</p>
                      <p><strong>Seuils :</strong> À définir selon le contexte et à justifier (écart toléré fixé par l'organisation), avec un contrôle de significativité statistique</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      2. Transparence & Explicabilité
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="space-y-1">
                      <p><strong>Méthodes d'explication :</strong> LIME, SHAP, importance des variables. Ce sont des explications locales, pas des métriques de qualité.</p>
                      <p><strong>Tests :</strong> Compréhensibilité utilisateur, cohérence explications</p>
                      <p><strong>Exigences :</strong> Explications formulées en langage clair, testées auprès des utilisateurs concernés</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      3. Vie privée & Protection données
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="space-y-1">
                      <p><strong>Techniques :</strong> Privacy by design, differential privacy, federated learning</p>
                      <p><strong>Compliance :</strong> RGPD, minimisation données, consentement éclairé</p>
                      <p><strong>Audit :</strong> Analyse d'impact relative à la protection des données (AIPD), obligatoire lorsque le traitement présente un risque élevé pour les personnes (RGPD, article 35)</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <UserCheck className="h-4 w-4" />
                      4. Supervision humaine
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-xs space-y-2">
                    <div className="space-y-1">
                      <p><strong>Modes de supervision :</strong> human-in-the-loop (validation humaine), on-the-loop (supervision), out-of-the-loop (sans intervention humaine)</p>
                      <p><strong>Décisions à fort impact :</strong> Supervision humaine exigée pour les systèmes à haut risque (règlement sur l'IA, article 14)</p>
                      <p><strong>Formation :</strong> Personnes compétentes et formées, qui comprennent les limites du système</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <InfoTooltip content="L'AI Act classe les systèmes en 4 catégories : risque minimal, limité, élevé et inacceptable" />
                <AlertDescription className="ml-6">
                  <strong>AI Act européen :</strong> Obligations différenciées selon le niveau de risque. 
                  Les systèmes à haut risque (recrutement, accès au crédit, justice) doivent satisfaire des exigences
                  (gestion des risques, qualité des données, documentation, supervision humaine) et faire l'objet d'une
                  évaluation de la conformité avant leur mise sur le marché, le plus souvent par contrôle interne du
                  fournisseur. Ces obligations s'appliquent à partir du 2 décembre 2027 pour les systèmes de l'annexe III.
                </AlertDescription>
              </Alert>
            </div>
          </ExpandableSection>

          <ExpandableSection 
            title="🔍 Détection et correction des biais algorithmiques" 
            icon={<Search className="h-4 w-4" />}
          >
            <div className="space-y-4">
              <Card className="bg-muted/40">
                <CardContent className="pt-6">
                  <h5 className="font-medium mb-3">Mesurer l'équité : quelques critères usuels</h5>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• <strong>Parité démographique :</strong> la proportion de décisions favorables est similaire entre les groupes.</li>
                    <li>• <strong>Égalité des chances :</strong> les personnes qualifiées ont la même probabilité d'être retenues, quel que soit leur groupe.</li>
                    <li>• <strong>Calibration :</strong> un même score correspond à la même fréquence observée dans chaque groupe.</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    Ces critères ne peuvent généralement pas être tous satisfaits en même temps : choisir lequel
                    privilégier est un arbitrage à justifier selon le contexte, et non un simple réglage technique.
                  </p>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-3">Sources courantes de biais</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <Database className="h-4 w-4 text-red-500 mt-0.5" />
                      <div>
                        <strong>Biais de données :</strong> Échantillons non représentatifs, données historiques biaisées
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Brain className="h-4 w-4 text-orange-500 mt-0.5" />
                      <div>
                        <strong>Biais algorithmiques :</strong> Choix de features, méthodes d'optimisation
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <strong>Biais humains :</strong> Préjugés des développeurs, annotation subjective
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="h-4 w-4 text-purple-500 mt-0.5" />
                      <div>
                        <strong>Biais de déploiement :</strong> Dérives temporelles, feedback loops
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium mb-3">Techniques de mitigation</h5>
                  <div className="space-y-2 text-sm">
                    <div className="border rounded p-2">
                      <strong>Pré-processing :</strong> Ré-échantillonnage, augmentation données, feature engineering équitable
                    </div>
                    <div className="border rounded p-2">
                      <strong>In-processing :</strong> Contraintes d'équité, régularisation, optimisation multi-objectifs
                    </div>
                    <div className="border rounded p-2">
                      <strong>Post-processing :</strong> Calibration, seuils adaptatifs, correction des outputs
                    </div>
                    <div className="border rounded p-2">
                      <strong>Monitoring :</strong> Métriques continues, alertes dérive, re-entraînement adaptatif
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-blue-50 dark:bg-blue-950/30">
                <CardContent className="pt-4">
                  <h6 className="font-medium mb-2">Outil pratique : Checklist audit biais</h6>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    <div className="space-y-1">
                      <p>☐ Analyse démographique des données d'entraînement</p>
                      <p>☐ Test de parité démographique par sous-groupes</p>
                      <p>☐ Évaluation de l'égalité des chances</p>
                      <p>☐ Analyse des corrélations avec attributs sensibles</p>
                    </div>
                    <div className="space-y-1">
                      <p>☐ Tests de robustesse et stabilité</p>
                      <p>☐ Évaluation sur données out-of-distribution</p>
                      <p>☐ Analyse des faux positifs/négatifs par groupe</p>
                      <p>☐ Documentation complète des choix méthodologiques</p>
                    </div>
                  </div>
                  <p className="text-xs mt-3">
                    Pour essayer la parité, l'égalité des chances et l'analyse des faux positifs par groupe sur vos
                    propres prédictions (ou sur un exemple fictif), voir{' '}
                    <Link to="/auditeur-biais" className="text-primary hover:underline">
                      l'auditeur de biais
                    </Link>
                    &nbsp;; pour examiner les données d'entraînement,{' '}
                    <Link to="/analyseur-donnees" className="text-primary hover:underline">
                      l'analyseur de jeu de données
                    </Link>
                    . Tout se calcule dans le navigateur.
                  </p>
                </CardContent>
              </Card>
            </div>
          </ExpandableSection>
        </div>

        <DidYouKnow items={didYouKnowItems} />

        {/* Module 2 enrichi */}
        <CourseModule
          title="Module 2 : Méthodologies et outils pour l'IA responsable"
          description="Techniques concrètes et outils pratiques pour développer une IA éthique"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Audit et évaluation continue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="outline">Méthodologie</Badge>
                  <ul className="text-sm space-y-2">
                    <li>• Tests automatisés de biais algorithmiques</li>
                    <li>• Évaluation multi-critères de l'équité</li>
                    <li>• Algorithmic Impact Assessment (AIA)</li>
                    <li>• Audit de transparence et explicabilité</li>
                    <li>• Validation par panels d'experts diversifiés</li>
                    <li>• Red teaming et tests adverses</li>
                  </ul>
                  
                  <ExpandableSection title="Outils techniques recommandés">
                    <div className="space-y-3 text-xs">
                      <div>
                        <h6 className="font-medium">Bibliothèques Python :</h6>
                        <ul className="mt-1 space-y-1">
                          <li>• <strong>Fairlearn :</strong> Détection et mitigation des biais</li>
                          <li>• <strong>AI Fairness 360 :</strong> Boîte à outils d'équité créée par IBM</li>
                          <li>• <strong>SHAP/LIME :</strong> Explicabilité locale</li>
                          <li>• <strong>What-If Tool :</strong> Analyse interactive de modèles, créée par Google (vérifiez qu'elle est toujours maintenue)</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium">Plateformes entreprise :</h6>
                        <ul className="mt-1 space-y-1">
                          <li>• <strong>Fiddler AI :</strong> Monitoring et explicabilité</li>
                          <li>• <strong>Arthur AI :</strong> Performance et équité</li>
                          <li>• <strong>Seldon Alibi :</strong> Explications et détection (sous licence Business Source License depuis 2024 : une licence commerciale peut être requise en production)</li>
                        </ul>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Bonnes pratiques opérationnelles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge variant="outline">Implémentation</Badge>
                  <ul className="text-sm space-y-2">
                    <li>• Équipes diverses et inclusives (genre, origine)</li>
                    <li>• Documentation éthique et traçabilité complète</li>
                    <li>• Tests utilisateurs avec panels représentatifs</li>
                    <li>• Surveillance continue et alertes automatisées</li>
                    <li>• Mécanismes de recours et correction</li>
                    <li>• Formation continue des équipes</li>
                  </ul>

                  <ExpandableSection title="Template de documentation éthique">
                    <div className="space-y-2 text-xs">
                      <div className="border rounded p-2">
                        <strong>1. Contexte et objectifs :</strong> Description du système, cas d'usage, parties prenantes
                      </div>
                      <div className="border rounded p-2">
                        <strong>2. Données :</strong> Sources, biais potentiels, représentativité, protection
                      </div>
                      <div className="border rounded p-2">
                        <strong>3. Modèle :</strong> Architecture, métriques, limitations, incertitudes
                      </div>
                      <div className="border rounded p-2">
                        <strong>4. Évaluation :</strong> Tests d'équité, explicabilité, robustesse
                      </div>
                      <div className="border rounded p-2">
                        <strong>5. Déploiement :</strong> Monitoring, feedback, procédures d'escalade
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              </CardContent>
            </Card>
          </div>
        </CourseModule>

        {/* Module 3 enrichi */}
        <CourseModule
          title="Module 3 : Gouvernance et conformité réglementaire"
          description="Mettre en place une gouvernance IA robuste et assurer la conformité"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Gavel className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-medium mb-3">Comité d'éthique IA</h4>
                <div className="space-y-2 text-sm">
                  <div>• Composition multidisciplinaire recommandée</div>
                  <div>• Processus de décision formalisé</div>
                  <div>• Escalade des enjeux critiques</div>
                  <div>• Revue périodique des systèmes</div>
                </div>

                <ExpandableSection title="Guide de mise en place">
                  <div className="text-left space-y-2 text-xs">
                    <p><strong>Composition recommandée :</strong></p>
                    <ul className="ml-4 space-y-1">
                      <li>• Data scientist senior</li>
                      <li>• Juriste spécialisé technologie</li>
                      <li>• Représentant métier/utilisateurs</li>
                      <li>• Expert éthique/philosophie</li>
                      <li>• Risk manager</li>
                      <li>• Représentant société civile (optionnel)</li>
                    </ul>
                    <p className="mt-2"><strong>Fréquence :</strong> Réunion mensuelle + sessions ad hoc</p>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <BookOpen className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-medium mb-3">Charte éthique IA</h4>
                <div className="space-y-2 text-sm">
                  <div>• Valeurs organisationnelles claires</div>
                  <div>• Lignes directrices opérationnelles</div>
                  <div>• Procédures et responsabilités</div>
                  <div>• Formation obligatoire du personnel</div>
                </div>

                <ExpandableSection title="Template de charte">
                  <div className="text-left space-y-2 text-xs">
                    <div>
                      <p><strong>1. Principes fondamentaux</strong></p>
                      <p className="ml-2">Respect de la dignité humaine, équité, transparence</p>
                    </div>
                    <div>
                      <p><strong>2. Engagements concrets</strong></p>
                      <p className="ml-2">Tests systématiques, documentation, formation</p>
                    </div>
                    <div>
                      <p><strong>3. Gouvernance</strong></p>
                      <p className="ml-2">Rôles, responsabilités, processus d'escalade</p>
                    </div>
                    <div>
                      <p><strong>4. Sanctions</strong></p>
                      <p className="ml-2">Mesures disciplinaires en cas de non-respect</p>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h4 className="font-medium mb-3">Conformité réglementaire</h4>
                <div className="space-y-2 text-sm">
                  <div>• Veille réglementaire active</div>
                  <div>• DPIA et impact assessments</div>
                  <div>• Registres de conformité tenus</div>
                  <div>• Reporting aux autorités</div>
                </div>

                <ExpandableSection title="Obligations AI Act">
                  <div className="text-left space-y-2 text-xs">
                    <div>
                      <p><strong>Systèmes haut risque :</strong></p>
                      <ul className="ml-4 space-y-1">
                        <li>• Marquage CE obligatoire</li>
                        <li>• Documentation technique complète</li>
                        <li>• Surveillance post-marché</li>
                        <li>• Notification incidents graves</li>
                      </ul>
                    </div>
                    <div>
                      <p><strong>Délais de mise en conformité :</strong></p>
                      <p className="ml-2">Application par étapes à partir de l'entrée en vigueur (1er août 2024) : interdictions et obligation de maîtrise de l'IA depuis le 2 février 2025, modèles d'IA à usage général depuis le 2 août 2025, application générale (dont les obligations de transparence de l'article 50) depuis le 2 août 2026, nouvelles interdictions prévues par le règlement (UE) 2026/1744 le 2 décembre 2026, systèmes à haut risque listés à l'annexe III le 2 décembre 2027, systèmes intégrés à des produits réglementés le 2 août 2028. Ces deux derniers reports résultent du règlement (UE) 2026/1744 (« omnibus numérique » sur l'IA), publié au Journal officiel le 24 juillet 2026. Vérifiez les dates en vigueur sur le site de la Commission européenne avant de planifier.</p>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          </div>
        </CourseModule>

        {/* Module 4 enrichi avec plus de cas pratiques */}
        <CourseModule
          title="Module 4 : Études de cas et dilemmes éthiques complexes"
          description="Analyser des scénarios inspirés de cas publics et exercer votre jugement éthique"
        >
          <Card className="mb-6">
            <CardContent className="pt-6">
              <h4 className="font-semibold mb-4">Trois scénarios d'étude (illustratifs)</h4>
              
              <div className="space-y-6">
                <ExpandableSection 
                  title="Cas 1 : Algorithme de recrutement discriminatoire" 
                  icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
                  defaultExpanded
                >
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950/30 border-l-4 border-red-400 pl-4">
                      <h5 className="font-medium text-red-700 dark:text-red-400 mb-2">🏢 Contexte</h5>
                      <p className="text-sm mb-2">
                        Scénario inspiré du cas d'Amazon (2018) : une entreprise utilise un algorithme pour présélectionner
                        des CV. Entraîné sur des années de recrutements passés, majoritairement masculins, le modèle
                        apprend à pénaliser des indices associés aux candidatures féminines. Les détails ci-dessous sont
                        illustratifs.
                      </p>
                      <p className="text-sm font-medium">
                        <strong>Enjeux identifiés :</strong> Discrimination, équité, transparence, responsabilité légale
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-medium mb-2">🔍 Investigation</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Analyse révèle biais dans données historiques</li>
                          <li>• Le modèle reproduit les tendances des recrutements passés</li>
                          <li>• Variables indirectes liées au genre (proxys) détectées</li>
                          <li>• Aucune supervision sur critères d'équité</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">⚖️ Solutions appliquées</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Retrait immédiat features biaisées</li>
                          <li>• Re-entraînement avec contraintes d'équité</li>
                          <li>• Tests A/B avec métriques de parité</li>
                          <li>• Supervision humaine sur décisions finales</li>
                        </ul>
                      </div>
                    </div>

                    <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200">
                      <CheckCircle2 className="h-4 w-4 text-green-700 dark:text-green-400" />
                      <AlertDescription>
                        <strong>Enseignement :</strong> corriger un biais exige de revoir les données, les critères et
                        le processus, pas seulement le modèle. Dans le cas réel, Amazon a renoncé à l'outil faute de
                        pouvoir garantir l'absence de discrimination. Les systèmes de tri de candidatures relèvent des
                        systèmes à haut risque du règlement européen sur l'IA.
                      </AlertDescription>
                    </Alert>
                  </div>
                </ExpandableSection>

                <ExpandableSection 
                  title="Cas 2 : IA médicale et explicabilité critique" 
                  icon={<Heart className="h-4 w-4 text-blue-500" />}
                >
                  <div className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-400 pl-4">
                      <h5 className="font-medium text-blue-700 dark:text-blue-400 mb-2">🏥 Contexte</h5>
                      <p className="text-sm mb-2">
                        Un système d'aide au diagnostic en imagerie médicale obtient de bons résultats sur un jeu de test (scénario illustratif) 
                        mais ses recommandations ne sont pas explicables. Les médecins s'interrogent 
                        sur la confiance à accorder au système.
                      </p>
                      <p className="text-sm font-medium">
                        <strong>Enjeux :</strong> Explicabilité vs performance, responsabilité médicale, 
                        sécurité patient, acceptabilité professionnelle
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h6 className="font-medium mb-2">⚠️ Dilemmes identifiés</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Performance vs explicabilité (trade-off)</li>
                          <li>• Responsabilité en cas d'erreur</li>
                          <li>• Formation médicale continue nécessaire</li>
                          <li>• Coût/bénéfice du déploiement</li>
                        </ul>
                      </div>
                      <div>
                        <h6 className="font-medium mb-2">🛡️ Approche hybride adoptée</h6>
                        <ul className="text-sm space-y-1">
                          <li>• Système d'aide (non remplacement)</li>
                          <li>• Explications post-hoc (LIME/SHAP)</li>
                          <li>• Formation médecins sur limites IA</li>
                          <li>• Protocole strict supervision humaine</li>
                        </ul>
                      </div>
                    </div>

                    <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <AlertDescription>
                        <strong>Enseignement :</strong> L'explicabilité parfaite n'est pas toujours 
                        nécessaire si la supervision humaine est adéquate et les bénéfices prouvés. 
                        L'acceptabilité professionnelle est cruciale.
                      </AlertDescription>
                    </Alert>
                  </div>
                </ExpandableSection>

                <ExpandableSection 
                  title="Cas 3 : Modération de contenu et liberté d'expression" 
                  icon={<Globe className="h-4 w-4 text-green-500" />}
                >
                  <div className="space-y-4">
                    <div className="bg-green-50 dark:bg-green-950/30 border-l-4 border-green-400 pl-4">
                      <h5 className="font-medium text-green-700 dark:text-green-400 mb-2">🌐 Contexte</h5>
                      <p className="text-sm mb-2">
                        Une plateforme sociale mondiale utilise l'IA pour modérer des milliards de publications (scénario illustratif). 
                        Le système sur-modère dans certaines cultures et sous-modère dans d'autres, 
                        créant des tensions sur la liberté d'expression.
                      </p>
                      <p className="text-sm font-medium">
                        <strong>Enjeux :</strong> Liberté d'expression vs protection, biais culturels, 
                        scale global vs nuances locales
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium mb-2">🎯 Solutions multiculturelles</h6>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div className="border rounded p-2">
                            <strong>Modèles localisés :</strong> Adaptation par région/culture
                          </div>
                          <div className="border rounded p-2">
                            <strong>Supervision humaine :</strong> Équipes locales formées
                          </div>
                          <div className="border rounded p-2">
                            <strong>Transparence :</strong> Publication des règles et métriques
                          </div>
                        </div>
                      </div>

                      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 rounded p-3 text-sm">
                        <strong>Complexité réelle :</strong> Équilibrer protection (harcèlement, 
                        désinformation) et liberté d'expression dans de très nombreux pays aux codes culturels 
                        différents. Aucune solution parfaite n'existe.
                      </div>
                    </div>
                  </div>
                </ExpandableSection>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🧠 Exercice : Votre comité d'éthique</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Imaginez que vous devez trancher ces dilemmes. Comment votre comité d'éthique 
                aborderait-il ces cas ? Quels critères de décision utiliseriez-vous ?
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 rounded p-4">
                <h5 className="font-medium mb-2">Framework de décision éthique</h5>
                <ol className="text-sm space-y-1 list-decimal list-inside">
                  <li>Identifier toutes les parties prenantes impactées</li>
                  <li>Analyser les bénéfices et risques pour chacune</li>
                  <li>Évaluer les alternatives possibles</li>
                  <li>Appliquer les principes éthiques fondamentaux</li>
                  <li>Considérer les contraintes légales et réglementaires</li>
                  <li>Décider avec transparence et traçabilité</li>
                  <li>Prévoir le monitoring et ajustements futurs</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </CourseModule>

        {/* Conclusion enrichie */}
        <ClassicCourseQuiz slug="ia-ethique" />

        <CourseConclusion
          title="Conclusion : Vers une IA au service de l'humanité"
          description="Récapitulatif et engagement pour une IA responsable et conforme"
          learningPoints={[
            "Comprendre les principes éthiques fondamentaux et le cadre d'évaluation",
            "Identifier, mesurer et corriger les biais algorithmiques avec des outils concrets",
            "Implémenter une gouvernance IA robuste avec comité d'éthique et charte",
            "Situer les exigences du règlement européen sur l'IA et des autres réglementations",
            "Développer une culture de responsabilité et formation continue",
            "Résoudre des dilemmes éthiques complexes avec méthodologie structurée"
          ]}
          nextSteps={[
            "Réaliser un audit éthique complet de vos systèmes IA existants",
            "Rédiger et adopter votre charte éthique IA avec équipes",
            "Former vos développeurs et managers aux enjeux éthiques",
            "Mettre en place votre comité d'éthique IA multidisciplinaire",
            "Suivre l'évolution réglementaire et préparer la conformité AI Act",
            "Développer des métriques d'équité et outils de monitoring continu"
          ]}
        />

        <Alert className="mb-8 bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
          <Shield className="h-5 w-5 text-green-700 dark:text-green-400" />
          <AlertDescription>
            <strong>Engagement éthique :</strong> une démarche responsable peut réduire des risques juridiques
            et favoriser la confiance, sans que l'ampleur de ces effets soit chiffrable de façon générale.
          </AlertDescription>
        </Alert>

        <CourseSources sources={ethicsSources} />
    </CourseGuideLayout>
  );
};

export default IAEthique;
