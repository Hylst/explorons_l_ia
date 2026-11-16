// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import CourseModule from '@/components/courses/CourseModule';
import CourseConclusion from '@/components/courses/CourseConclusion';
import CourseSources from '@/components/courses/CourseSources';
import ClassicCourseQuiz from '@/components/courses/ClassicCourseQuiz';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AUTHOR_TITLE } from '@/config/site';
import {
  FolderTree,
  Tags,
  Calendar,
  FileText,
  Settings,
  Lightbulb,
  Target,
  CheckCircle2,
  Star,
  Archive,
  Search,
} from 'lucide-react';

const headerProps = {
  title: "Comment organiser les différents services d'IA que l'on utilise\u00A0?",
  subtitle: "Une méthode simple pour garder la maîtrise de ses outils d'IA\u00A0: les classer, les documenter et les sécuriser",
  author: 'Geoffroy Streit',
  authorDescription: AUTHOR_TITLE,
  duration: '2 à 3 heures',
  level: 'Débutant',
  audience: 'Particuliers',
  tags: ['Organisation', 'Gestion', 'Services IA'],
};

const plan: CoursePlanItem[] = [
  {
    icon: <FolderTree className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Inventaire et catégorisation',
    description: 'Recenser ses outils et les classer par usage, objectif et priorité.',
  },
  {
    icon: <Tags className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Méthodes d’organisation',
    description: 'Documenter chaque outil, ses accès et ce qu’on peut lui confier.',
  },
  {
    icon: <Settings className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Outils de gestion',
    description: 'Centraliser l’inventaire sans ajouter une complexité inutile.',
  },
  {
    icon: <Archive className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Maintenance et évolution',
    description: 'Suivre les abonnements, les comptes et les outils abandonnés.',
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" aria-hidden="true" />,
    title: 'Modèles prêts à l’emploi',
    description: 'Partir d’une fiche simple et l’adapter à son usage.',
  },
];

const organizationSources = [
  { label: 'Mozilla\u00A0: fin de Pocket (2025)', href: 'https://support.mozilla.org/en-US/kb/future-of-pocket' },
  { label: 'CNIL\u00A0: mots de passe, recommandations pour maîtriser sa sécurité', href: 'https://www.cnil.fr/fr/mots-de-passe-recommandations-pour-maitriser-sa-securite' },
  { label: "CNIL\u00A0: authentification multifacteur", href: 'https://www.cnil.fr/fr/recommandation-mfa' },
  { label: 'CNIL\u00A0: guide de la sécurité des données personnelles', href: 'https://cnil.fr/fr/guide-de-la-securite-des-donnees-personnelles' },
  { label: 'CNIL\u00A0: les droits pour maîtriser vos données personnelles', href: 'https://www.cnil.fr/fr/les-droits-pour-maitriser-vos-donnees-personnelles' },
];

const module1Data = [
  {
    icon: <Tags className="h-5 w-5 text-primary" />,
    title: 'Catégorisation par usage',
    items: [
      'Création et génération de contenu',
      'Analyse et traitement de données',
      'Communication et traduction',
      'Organisation et productivité',
      'Apprentissage et formation',
    ],
  },
  {
    icon: <Target className="h-5 w-5 text-primary" />,
    title: 'Classification par objectif',
    items: [
      'Outils de travail quotidien',
      'Assistants créatifs',
      "Solutions d'apprentissage",
      'Outils de divertissement',
      'Services spécialisés',
    ],
  },
  {
    icon: <Star className="h-5 w-5 text-primary" />,
    title: 'Niveau de priorité',
    items: [
      'Essentiels (usage quotidien)',
      'Importants (usage régulier)',
      'Utiles (usage occasionnel)',
      'Expérimentaux (tests)',
      'Archivés (plus utilisés)',
    ],
  },
];

const module2Data = [
  {
    icon: <FolderTree className="h-5 w-5 text-primary" />,
    title: 'Structure par dossiers',
    items: [
      'Dossiers thématiques peu nombreux',
      "Sous-catégories par type d'usage",
      'Organisation hiérarchique logique',
      'Nommage cohérent des dossiers',
      "Un dossier «\u00A0à tester\u00A0» pour ne pas s'éparpiller",
    ],
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: 'Documentation des outils',
    items: [
      'Fiche descriptive pour chaque outil',
      "Notes d'utilisation personnelles",
      'Exemples de prompts efficaces',
      "Ce qu'il ne faut pas lui confier",
      'Limites et alternatives',
    ],
  },
  {
    icon: <Settings className="h-5 w-5 text-primary" />,
    title: 'Gestion des accès',
    items: [
      'Inventaire des comptes créés',
      'Gestionnaire de mots de passe et double authentification',
      'Suivi des abonnements payants et des dates de renouvellement',
      'Suppression des comptes inutilisés',
      'Export régulier de vos données importantes',
    ],
  },
];

const folderTree = `Mon écosystème IA/
├── Création et design/
│   ├── Génération d'images
│   ├── Montage vidéo
│   └── Design graphique
├── Rédaction et communication/
│   ├── Assistants de rédaction
│   ├── Traduction
│   └── Correction
├── Productivité et organisation/
│   ├── Planification
│   ├── Prise de notes
│   └── Gestion de tâches
├── Apprentissage et recherche/
│   ├── Moteurs de recherche IA
│   ├── Tutoriels assistés
│   └── Analyse de documents
└── Expérimental/
    ├── Nouveaux outils à tester
    └── Outils spécialisés`;

const inventoryRows = [
  {
    outil: 'Assistant conversationnel (exemple)',
    usage: 'Brainstorming, premiers jets de texte',
    cout: 'Gratuit avec limites, abonnement optionnel',
    donnees: 'Jamais de données personnelles ni confidentielles',
    verification: 'À noter',
  },
  {
    outil: 'Traducteur en ligne (exemple)',
    usage: 'Traduction de textes courts',
    cout: 'Gratuit',
    donnees: 'Textes non sensibles uniquement',
    verification: 'À noter',
  },
];

const OrganiserServicesIA = () => (
  <CourseGuideLayout
    title={headerProps.title}
    subtitle={headerProps.subtitle}
    about={[
      "Les services d’IA se multiplient, chacun avec un compte, un abonnement et des données confiées. Sans méthode, on oublie des outils, on paie pour ce qu’on n’utilise plus et on ne sait plus où sont les informations.",
      "Ce cours propose une organisation personnelle simple : classer les outils, documenter leur usage et leurs limites, sécuriser les accès, puis entretenir l’ensemble.",
    ]}
    learn={[
      "Classer ses outils d’IA par usage, objectif et priorité.",
      "Documenter ce que chaque outil reçoit et ce qu’il ne doit pas recevoir.",
      "Sécuriser les comptes et suivre les abonnements.",
      "Entretenir l’organisation avec une routine courte.",
    ]}
    plan={plan}
    info={{
      level: headerProps.level,
      duration: headerProps.duration,
      prerequisites: 'Aucun prérequis technique ; savoir lister les services utilisés.',
      contents: ['5 modules', '1 quiz de fin de cours', 'Sources citées', 'Modèles de fiches'],
      audience: headerProps.audience,
      tags: headerProps.tags,
    }}
    related={[
      {
        to: '/cours/utiliser-ia-quotidien',
        title: "Utiliser l'IA au quotidien",
        description: 'Bons usages, limites et protection de la vie privée.',
      },
      {
        to: '/cours/utiliser-ia-travail',
        title: "Utiliser l'IA au travail",
        description: 'Cadre d’usage, confidentialité et gouvernance.',
      },
      {
        to: '/generateur-prompts',
        title: 'Générateur de prompts',
        description: 'Préparer des demandes précises, entièrement dans votre navigateur.',
      },
      {
        to: '/ressources',
        title: 'Ressources externes',
        description: 'Outils, cours et lectures sélectionnés.',
      },
    ]}
  >
      <CourseModule
        title="Introduction"
        description="Face à la multiplication des outils d'IA, un minimum d'organisation évite de perdre du temps et de disperser ses données."
      >
        <Card>
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              Les services d'IA se multiplient, et chacun demande un compte, un abonnement ou l'envoi de vos données. Sans
              méthode, on oublie des outils utiles, on paie des abonnements qu'on n'utilise plus et on ne sait plus quelles
              informations ont été confiées à quel service.
            </p>
            <p className="mb-4">
              Ce cours propose une approche simple pour bâtir votre écosystème personnel : classer vos outils, les
              documenter, sécuriser vos accès et le mettre à jour régulièrement.
            </p>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Lightbulb className="h-4 w-4" />
                Objectif principal
              </h4>
              <p className="text-sm">
                Retrouver rapidement le bon outil pour chaque situation, en sachant ce qu'il coûte et ce que vous lui
                confiez.
              </p>
            </div>
          </CardContent>
        </Card>
      </CourseModule>

      <CourseModule
        title="Module 1 : Inventaire et catégorisation"
        description="Recensez vos outils d'IA et classez-les selon une logique claire"
        modules={module1Data}
      />

      <CourseModule
        title="Module 2 : Méthodes d'organisation pratiques"
        description="Des habitudes concrètes pour gérer vos outils, leur documentation et leurs accès"
        modules={module2Data}
      />

      <CourseModule
        title="Module 3 : Outils de gestion"
        description="Des solutions simples pour centraliser votre inventaire"
      >
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Solutions de gestion possibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Tableurs et bases de notes</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Un tableur (Excel, LibreOffice, Google Sheets) pour l'inventaire</li>
                    <li>• Notion ou Obsidian pour une documentation détaillée</li>
                    <li>• Airtable pour une classification plus avancée</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Gestionnaires de favoris</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Raindrop.io pour une organisation visuelle</li>
                    <li>• Les dossiers de favoris et groupes d'onglets de votre navigateur</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Les services changent ou ferment : Pocket, par exemple, a fermé le 8 juillet 2025. Privilégiez un format
                que vous pouvez exporter (CSV, Markdown) et faites une sauvegarde régulière.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Retrouver un outil rapidement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2 text-green-700 dark:text-green-400">Mots-clés utiles</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Fonction principale de l'outil</li>
                    <li>• Domaine d'application</li>
                    <li>• Coût (gratuit, gratuit avec limites, payant)</li>
                    <li>• Niveau de difficulté d'usage</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Repères visuels</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Une couleur par catégorie</li>
                    <li>• Le logo ou une capture d'écran du service</li>
                    <li>• Une étiquette « à vérifier » quand une information est ancienne</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </CourseModule>

      <CourseModule
        title="Module 4 : Maintenance et évolution"
        description="Gardez votre organisation à jour, sans y passer des heures"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Routine de maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium mb-2">Chaque semaine (5 minutes)</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Ajouter les nouveaux outils testés</li>
                    <li>• Noter ce qui a bien ou mal fonctionné</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Chaque trimestre</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Archiver les outils qui ne servent plus</li>
                    <li>• Vérifier les abonnements, les tarifs et les conditions d'usage</li>
                    <li>• Supprimer les comptes inutiles et exporter vos données</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5 text-primary" />
                Gestion des changements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  Archiver les outils obsolètes plutôt que de les laisser traîner
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  Prévoir une alternative avant qu'un service ne ferme ou change de conditions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  Adapter le classement à vos nouveaux besoins
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  Partager vos trouvailles, sans y inclure vos identifiants
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </CourseModule>

      <CourseModule
        title="Module 5 : Modèles prêts à l'emploi"
        description="Une arborescence et un inventaire à copier, puis à adapter à vos usages"
      >
        <Card>
          <CardHeader>
            <CardTitle>Modèle d'organisation personnelle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Arborescence de dossiers proposée :</h4>
                <pre tabIndex={0} role="region" aria-label="Arborescence de dossiers proposée" className="bg-muted rounded-lg p-4 text-sm overflow-x-auto">{folderTree}</pre>
              </div>

              <div>
                <h4 className="font-medium mb-3">Modèle d'inventaire (à recopier dans un tableur) :</h4>
                <div tabIndex={0} role="region" aria-label="Modèle d'inventaire" className="relative overflow-x-auto rounded-lg border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted text-left">
                      <tr>
                        <th className="p-3 font-medium">Outil</th>
                        <th className="p-3 font-medium">Usage</th>
                        <th className="p-3 font-medium">Coût</th>
                        <th className="p-3 font-medium">Données confiées</th>
                        <th className="p-3 font-medium">Dernière vérification</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventoryRows.map((row) => (
                        <tr key={row.outil} className="border-t align-top">
                          <td className="p-3">{row.outil}</td>
                          <td className="p-3">{row.usage}</td>
                          <td className="p-3">{row.cout}</td>
                          <td className="p-3">{row.donnees}</td>
                          <td className="p-3">{row.verification}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  La colonne « Données confiées » est la plus utile : elle vous rappelle ce que chaque service peut
                  conserver. Ajoutez aussi l'adresse utilisée pour le compte et la date de renouvellement des
                  abonnements, mais jamais un mot de passe : utilisez un gestionnaire de mots de passe.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CourseModule>

      <ClassicCourseQuiz slug="organiser-services-ia" />

      <CourseConclusion
        title="Conclusion : garder la main sur ses outils d'IA"
        description="Un inventaire à jour, des accès sécurisés et une routine légère suffisent"
        learningPoints={[
          "Classer ses outils d'IA par usage, par objectif et par priorité",
          'Documenter chaque outil, y compris ce qu’on ne doit pas lui confier',
          'Sécuriser ses comptes et suivre ses abonnements',
          'Entretenir son organisation avec une routine courte',
        ]}
        nextSteps={[
          "Créer votre inventaire à partir du modèle proposé",
          "Repérer les outils que vous n'utilisez plus et supprimer les comptes correspondants",
          "Lire le cours «\u00A0Utiliser l'IA au quotidien\u00A0» pour les bons usages",
          'Faire le point tous les trimestres',
        ]}
      />

      <CourseSources sources={organizationSources} />
  </CourseGuideLayout>
);

export default OrganiserServicesIA;
