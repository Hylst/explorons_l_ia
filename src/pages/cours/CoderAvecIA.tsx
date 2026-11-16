// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import CourseGuideLayout, { CoursePlanItem } from '@/components/courses/CourseGuideLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import CourseSources from '@/components/courses/CourseSources';
import ClassicCourseQuiz from '@/components/courses/ClassicCourseQuiz';
import { Check, Code, Lightbulb, BrainCircuit, Gem, BookOpen, XSquare, AlertCircle, Bot, Wrench, Palette } from 'lucide-react';

const coderSources = [
  { label: 'Google Developers Blog (19 mai 2026)\u00A0: transition de Gemini CLI vers Antigravity CLI', href: 'https://developers.googleblog.com/en/an-important-update-transitioning-gemini-cli-to-antigravity-cli/' },
  { label: 'Mistral AI (12 août 2026)\u00A0: Le Chat devient Vibe', href: 'https://help.mistral.ai/en/articles/682992-le-chat-is-now-vibe' },
  { label: 'Google Cloud\u00A0: Gemini Enterprise Agent Platform', href: 'https://cloud.google.com/products/gemini-enterprise-agent-platform' },
  { label: 'METR (10 juillet 2025)\u00A0: essai contrôlé sur des développeurs expérimentés', href: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/' },
  { label: 'Spracklen et al. (2025)\u00A0: We Have a Package for You! (USENIX Security)', href: 'https://www.usenix.org/conference/usenixsecurity25/presentation/spracklen' },
];

const CodeSnippet = ({ children }: { children: React.ReactNode }) => (
  <pre tabIndex={0} role="region" aria-label="Extrait de code" className="bg-muted p-4 rounded-md overflow-x-auto my-4 text-sm">
    <code>{children}</code>
  </pre>
);

const TipCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="my-4 border-l-4 border-l-primary">
    <CardContent className="p-4">
      <div className="flex gap-2 items-start">
        <Lightbulb className="h-5 w-5 text-primary shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-sm">{title}</h4>
          <div className="text-sm text-muted-foreground mt-1">{children}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const WarningCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="my-4 border-l-4 border-l-orange-400">
    <CardContent className="p-4">
      <div className="flex gap-2 items-start">
        <AlertCircle className="h-5 w-5 text-orange-500 shrink-0 mt-1" />
        <div>
          <h4 className="font-semibold text-sm">{title}</h4>
          <div className="text-sm text-muted-foreground mt-1">{children}</div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const plan: CoursePlanItem[] = [
  { icon: <BrainCircuit className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Concepts clés', description: 'Ce qu’un assistant de code sait faire, et ce qu’il ne vérifie pas.' },
  { icon: <Bot className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Assistants IA', description: 'Travailler avec un assistant dans l’éditeur, en gardant la responsabilité du code.' },
  { icon: <Code className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Intégrer l’IA dans une application', description: 'API, clés, coûts, sécurité et gestion des erreurs.' },
  { icon: <Palette className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Approche no code', description: 'Construire un prototype sans écrire tout le code, et connaître ses limites.' },
  { icon: <Wrench className="h-5 w-5 text-primary" aria-hidden="true" />, title: 'Workflows avancés', description: 'Contexte, mémoire de projet, génération et relecture.' },
];

const CoderAvecIA = () => {
  return (
    <CourseGuideLayout
      title="Coder une application avec l'IA"
      subtitle="Concepts, outils et risques du code généré par l'IA"
      about={[
        "Les assistants de code et les API génératives changent une partie du travail de développement, sans supprimer la vérification, la sécurité ni la responsabilité du code livré.",
        "Ce cours distingue l’assistance dans l’éditeur, l’intégration d’un modèle dans une application et les approches no code. Il insiste sur les tests, les secrets et les coûts.",
      ]}
      learn={[
        "Choisir entre assistance, intégration et no code selon le besoin.",
        "Reconnaître les erreurs et les limites d’un code généré.",
        "Protéger les clés, les données et les secrets.",
        "Tester et relire le code avant de le livrer.",
      ]}
      plan={plan}
      info={{
        level: 'Débutant à intermédiaire',
        duration: '3 à 4 heures, lecture et pratique comprises',
        prerequisites: 'Notions de développement web utiles ; les parties no code restent accessibles.',
        contents: ['5 parties', '1 quiz de fin de cours', 'Sources citées', 'Exemples de code et avertissements'],
        audience: "Développeurs, étudiants, créateurs d'applications",
        tags: ['Code', 'Assistants IA', 'API', 'No code'],
      }}
      related={[
        { to: '/cours/prompt-engineering', title: 'Prompt engineering', description: 'Formuler ses demandes pour obtenir des réponses plus fiables.' },
        { to: '/cours/python-ia', title: "Initiation à Python pour l'IA", description: "Apprendre les bases pour comprendre le code qu'un assistant vous propose." },
        { to: '/cours/ia-ethique', title: 'IA éthique et responsable', description: 'Confidentialité, biais et responsabilité.' },
        { to: '/ressources', title: 'Ressources externes', description: 'Cours, outils et lectures sélectionnés.' },
      ]}
    >
        <div className="max-w-3xl mx-auto mb-16">
          <div>
            <p className="lead">
              L'intelligence artificielle change une partie des pratiques de développement, avec des bénéfices variables selon les tâches et les profils.
              Qu'il s'agisse de l'utilisation d'outils comme GitHub Copilot pour vous assister dans le code ou
              de l'intégration de fonctionnalités IA dans vos applications, ce guide vous aidera à
              comprendre les concepts, techniques et bonnes pratiques nécessaires.
            </p>

            <div className="flex flex-wrap gap-4 my-6">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Assistance au développement (gain de temps variable selon la tâche)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Aide à l'exploration de problèmes complexes</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Génération automatique de code</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Prototypage rapide</span>
              </div>
            </div>
          </div>

          <Tabs defaultValue="concepts" className="w-full mt-8">
            <TabsList className="grid w-full h-auto grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1">
              <TabsTrigger value="concepts">Concepts clés</TabsTrigger>
              <TabsTrigger value="assistants">Assistants IA</TabsTrigger>
              <TabsTrigger value="integration">Intégration IA</TabsTrigger>
              <TabsTrigger value="nocode">Approche No Code</TabsTrigger>
              <TabsTrigger value="workflow">Workflows Avancés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="concepts" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Les concepts fondamentaux de l'IA pour le code</h2>
              
              <h3 className="text-xl font-semibold mt-6">LLM : Les grands modèles de langage</h3>
              <p>
                Les Grands Modèles de Langage (LLM) sont au cœur des IA qui comprennent et génèrent du code.
                Ces modèles ont été entraînés sur d'immenses corpus de textes et de code, leur permettant
                de comprendre la structure, la syntaxe et même la sémantique du code dans différents langages
                de programmation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Bot className="h-4 w-4 text-primary" />
                      Entraînement
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Les LLM sont entraînés sur de très grandes quantités de code (en partie open-source),
                      des documentations techniques et des discussions de développeurs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <BrainCircuit className="h-4 w-4 text-primary" />
                      Fonctionnement
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Ces modèles prédisent la suite probable d'une séquence de texte ou de code,
                      en fonction des motifs qu'ils ont appris.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-6">Fenêtre de contexte</h3>
              <p>
                La fenêtre de contexte représente la quantité d'information que l'IA peut « retenir » et
                prendre en compte lors d'une interaction. C'est comme la mémoire à court terme de l'IA.
              </p>
              
              <TipCard title="Optimisation du contexte">
                Pour obtenir les meilleurs résultats avec les outils IA, fournissez un contexte clair et concis.
                Incluez les informations essentielles sur votre projet, comme le langage, les frameworks utilisés,
                et des extraits pertinents de votre code.
              </TipCard>
              
              <h3 className="text-xl font-semibold mt-6">Tokens : l'unité de mesure de l'IA</h3>
              <p>
                Les tokens sont les unités de base traitées par un LLM. Un token peut être un mot, une partie de mot,
                un caractère ou un symbole. Pour le code, les tokens peuvent être des mots-clés, des opérateurs,
                des identificateurs, etc.
              </p>
              
              <div className="bg-muted p-4 rounded-md my-4">
                <h4 className="font-semibold mb-2">Exemple de tokenisation (découpage illustratif : il varie d'un modèle à l'autre)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Code</p>
                    <p className="text-sm text-muted-foreground">const greeting = "Hello, world!";</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Tokens</p>
                    <p className="text-sm text-muted-foreground">["const", " greeting", " =", " \"", "Hello", ",", " world", "!", "\"", ";"]</p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-6">L'art du prompting pour le code</h3>
              <p>
                Le « prompting » est l'art de communiquer efficacement avec l'IA pour obtenir les résultats souhaités.
                Dans le contexte du développement, des prompts bien conçus jouent un rôle important
                dans la qualité du code généré.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-green-700 dark:text-green-400">Bon prompt : précis et contextualisé</h4>
                    <p className="text-sm text-muted-foreground">
                      « Écris une fonction JavaScript qui prend un tableau de nombres en entrée et retourne
                      la somme des éléments pairs. Utilise la syntaxe ES6 avec des arrow functions et des méthodes
                      de tableau comme filter et reduce. »
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-red-700 dark:text-red-400">Prompt trop vague</h4>
                    <p className="text-sm text-muted-foreground">
                      « Écris une fonction pour faire des maths avec des nombres. »
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="assistants" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Utiliser les Assistants IA pour le code</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Complétion de code</h3>
                    <p className="text-sm text-muted-foreground">
                      Les assistants IA peuvent suggérer et compléter des lignes de code pendant que vous programmez.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      Génération automatique de documentation pour votre code, y compris les commentaires JSDoc et README.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Refactoring</h3>
                    <p className="text-sm text-muted-foreground">
                      Optimisation et restructuration de code existant pour améliorer sa qualité et sa maintenabilité.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Les grandes familles d'outils d'IA pour développer</h3>

              <div className="space-y-4 mt-4">
                {[
                  {
                    title: "Assistants intégrés à l'éditeur",
                    examples: 'GitHub Copilot, JetBrains AI Assistant, Tabnine, Gemini Code Assist (offres Standard et Enterprise)',
                    text: "Suggestions de code pendant que vous tapez, discussion sur le fichier ouvert, génération de tests et de documentation.",
                  },
                  {
                    title: "Éditeurs conçus autour de l'IA",
                    examples: 'Cursor',
                    text: "L'éditeur donne à l'IA une vue d'ensemble du projet et applique les modifications proposées sous forme de différences à valider.",
                  },
                  {
                    title: 'Agents en ligne de commande',
                    examples: 'Claude Code, Codex CLI, Antigravity CLI (successeur de Gemini CLI pour les comptes individuels depuis juin 2026), Aider',
                    text: "L'agent lit le dépôt, modifie plusieurs fichiers, lance les tests et recommence. Vous relisez et validez le résultat\u00A0: la responsabilité reste la vôtre.",
                  },
                  {
                    title: 'Assistants conversationnels généralistes',
                    examples: 'ChatGPT, Claude, Gemini, Vibe de Mistral (anciennement Le Chat)',
                    text: "Expliquer une erreur, comparer des approches, générer un extrait de code à adapter.",
                  },
                  {
                    title: "Analyse de sécurité assistée par l'IA",
                    examples: 'Snyk Code (anciennement DeepCode), GitHub code scanning (analyse CodeQL, avec Copilot Autofix pour suggérer des correctifs)',
                    text: "Détection de failles et de mauvaises pratiques, à combiner avec les outils d'analyse statique classiques.",
                  },
                ].map((family) => (
                  <Card key={family.title}>
                    <CardContent className="p-4">
                      <h4 className="font-semibold">{family.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{family.text}</p>
                      <p className="text-sm mt-2">
                        <span className="font-medium">Exemples :</span> {family.examples}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                Les offres, les tarifs et même les noms de ces outils changent très vite : vérifiez toujours sur le site de
                l'éditeur avant de choisir, en particulier ce qui est fait de votre code (voir les risques dans l'onglet
                « Workflows Avancés »).
              </p>

              <h3 className="text-xl font-semibold mt-8">Techniques avancées de prompting pour le code</h3>
              
              <div className="space-y-6 mt-4">
                <div>
                  <h4 className="font-semibold text-primary">Few-Shot Prompting</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fournir quelques exemples pour montrer à l'IA le style et le format que vous attendez.
                  </p>
                  <CodeSnippet>
                    {`Convertis ces fonctions JavaScript en TypeScript:
Exemple 1:
JS: function add(a, b) { return a + b; }
TS: function add(a: number, b: number): number { return a + b; }

Exemple 2:
JS: function greet(name) { return \`Hello \${name}!\`; }
TS: function greet(name: string): string { return \`Hello \${name}!\`; }

Maintenant, convertis ceci:
function multiply(x, y) { return x * y; }`}
                  </CodeSnippet>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary">Chain-of-Thought</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Demander à l'IA de raisonner étape par étape pour résoudre des problèmes complexes. Les modèles dits
                    « de raisonnement » le font déjà en interne : la consigne y est moins nécessaire.
                  </p>
                  <CodeSnippet>
                    {`Aide-moi à créer un algorithme de tri fusion en JavaScript.
Explique ton raisonnement étape par étape:
1. Comment diviser le tableau?
2. Comment fusionner les sous-tableaux triés?
3. Comment implémenter la récursion?
Puis écris le code complet.`}
                  </CodeSnippet>
                </div>
                
                <div>
                  <h4 className="font-semibold text-primary">Prompting incrémental</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Commencer par une base simple et ajouter progressivement des détails et des contraintes.
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="integration" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Intégrer l'IA dans votre application</h2>
              
              <p>
                Au-delà de l'utilisation d'assistants IA pour développer, vous pouvez également intégrer
                des fonctionnalités d'IA directement dans vos applications pour offrir des expériences intelligentes à vos utilisateurs.
              </p>
              
              <h3 className="text-xl font-semibold mt-6">Architecture d'une application intégrant l'IA</h3>
              
              <div className="relative bg-muted p-6 rounded-md my-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Frontend</h4>
                    <p className="text-sm text-muted-foreground">
                      Interface utilisateur qui capture les entrées et affiche les résultats de l'IA.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full inline-block">React</div>
                      <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full inline-block">Vue</div>
                      <div className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full inline-block">Angular</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Backend</h4>
                    <p className="text-sm text-muted-foreground">
                      Gestion des requêtes, appels API IA sécurisés, logique métier.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full inline-block">Node.js</div>
                      <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full inline-block">Python</div>
                      <div className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full inline-block">Serverless</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Services IA</h4>
                    <p className="text-sm text-muted-foreground">
                      API d'IA tierce ou modèles hébergés qui fournissent l'intelligence.
                    </p>
                    <div className="mt-3 space-y-2">
                      <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full inline-block">OpenAI</div>
                      <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full inline-block">Hugging Face</div>
                      <div className="text-xs bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-2 py-1 rounded-full inline-block">Gemini Enterprise Agent Platform (ex-Vertex AI)</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-semibold mb-3">Flux d'une requête typique</h4>
                  <ol className="space-y-4 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">1</span>
                      <p>L'utilisateur interagit avec l'interface (ex: pose une question, télécharge une image)</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">2</span>
                      <p>Le frontend envoie la requête au backend</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">3</span>
                      <p>Le backend prétraite les données et les envoie au service IA via API</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">4</span>
                      <p>Le service IA traite la requête et renvoie une réponse</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">5</span>
                      <p>Le backend post-traite la réponse et l'envoie au frontend</p>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0">6</span>
                      <p>Le frontend affiche le résultat à l'utilisateur</p>
                    </li>
                  </ol>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Code d'exemple : appeler un service d'IA depuis son backend</h3>

              <p className="text-sm text-muted-foreground mt-2">
                Ces extraits sont à adapter à votre projet. Ils ne sont pas exécutés sur ce site, qui est statique et
                n'appelle aucune API : la route <code>/api/chat</code> représente celle de votre propre backend.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h4 className="font-semibold mb-3">Backend (Node.js)</h4>
                  <CodeSnippet>
                    {`// Edge Function ou API Route
import { OpenAI } from 'openai';

export async function POST(req) {
  const { prompt } = await req.json();
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  
  try {
    const response = await openai.chat.completions.create({
      model: process.env.AI_MODEL, // nom du modèle choisi chez votre fournisseur
      messages: [
        { role: "user", content: prompt }
      ]
    });
    
    return new Response(JSON.stringify({
      content: response.choices[0].message.content
    }), { status: 200 });
    
  } catch (error) {
    return new Response(JSON.stringify({
      error: error.message
    }), { status: 500 });
  }
}`}
                  </CodeSnippet>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Frontend (React)</h4>
                  <CodeSnippet>
                    {`import { useState } from 'react';

function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await fetch('/api/chat', {   // route de votre backend
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResponse(data.content);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error);
      setResponse('Erreur: ' + error.message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Posez votre question..."
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Chargement...' : 'Envoyer'}
        </button>
      </form>
      
      {response && (
        <div className="response">
          <h3>Réponse:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}`}
                  </CodeSnippet>
                </div>
              </div>
              
              <WarningCard title="Sécurité des clés API">
                Ne stockez JAMAIS vos clés API côté client ! Utilisez toujours un backend ou des fonctions edge sécurisées
                pour effectuer les appels vers les services IA. Les clés exposées peuvent mener à une utilisation abusive
                et à des factures élevées.
              </WarningCard>
              
              <h3 className="text-xl font-semibold mt-8">Bases de données vectorielles pour RAG</h3>
              <p>
                Le RAG (Retrieval Augmented Generation) est une technique qui améliore les réponses d'un LLM en
                lui fournissant des informations spécifiques issues d'une base de données.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold">Cas d'usage</h4>
                    <ul className="list-disc pl-4 mt-2 text-sm space-y-1 text-muted-foreground">
                      <li>Assistants virtuels avec accès à la documentation de votre produit</li>
                      <li>Systèmes de recommandation basés sur le contenu utilisateur</li>
                      <li>Recherche sémantique dans un corpus de documents</li>
                      <li>Chatbots avec connaissance de données confidentielles</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold">Solutions populaires</h4>
                    <ul className="list-disc pl-4 mt-2 text-sm space-y-1 text-muted-foreground">
                      <li>Pinecone - Base de données vectorielle cloud</li>
                      <li>Weaviate - Moteur de recherche vectorielle</li>
                      <li>Chroma - Base de données pour embeddings</li>
                      <li>Milvus - Système de recherche vectorielle open-source</li>
                      <li>PostgreSQL avec l'extension pgvector - Recherche vectorielle dans une base classique</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="nocode" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Développer une application avec l'IA en No Code</h2>
              
              <p className="mb-6">
                L'approche No Code démocratise le développement d'applications en permettant à des personnes
                sans compétences techniques poussées de créer des applications fonctionnelles. Combinée avec l'IA,
                cette approche peut faciliter davantage certaines tâches, avec les limites décrites plus bas.
              </p>
              
              <h3 className="text-xl font-semibold mt-6">Avantages du No Code avec IA</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-primary">Rapidité</h4>
                    <p className="text-sm text-muted-foreground">
                      Prototypage souvent plus rapide pour des applications simples ; l'écart dépend du projet.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-primary">Accessibilité</h4>
                    <p className="text-sm text-muted-foreground">
                      Permet aux non-développeurs de créer des applications intelligentes.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-primary">Coût initial parfois réduit</h4>
                    <p className="text-sm text-muted-foreground">
                      Nécessite moins de ressources techniques spécialisées.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 text-primary">Flexibilité</h4>
                    <p className="text-sm text-muted-foreground">
                      Facilité d'itération et d'adaptation aux besoins changeants.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Outils No Code avec capacités IA</h3>
              
              <div className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Bubble</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Plateforme complète de développement no-code avec possibilité d'intégrer des API d'IA via des plugins.
                          Permet de créer des applications web avec bases de données, workflows et interfaces personnalisées.
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">Web Apps</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">FlutterFlow</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Création d'applications mobiles Flutter sans code, avec intégration possible d'API IA
                          pour la génération de contenu, la reconnaissance d'images ou le traitement de langage naturel.
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">Mobile Apps</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Adalo</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Plateforme de création d'applications mobiles et web avec une interface glisser-déposer.
                          Support d'intégrations API externes pour ajouter des fonctionnalités IA.
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">Mobile/Web Apps</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Voiceflow</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Spécialisé dans la création d'assistants vocaux et de chatbots, avec des intégrations IA natives
                          pour la compréhension du langage naturel et la génération de réponses.
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">Chatbots/Voicebots</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">Softr</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Création de portails web et d'applications basés sur Airtable ou Google Sheets.
                          Possibilité d'intégrer des widgets IA pour enrichir les fonctionnalités.
                        </p>
                      </div>
                      <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">Web Apps</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Conception d'une app No Code avec IA : Étapes clés</h3>
              
              <div className="mt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Définir les objectifs et besoins</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Identifiez clairement le problème à résoudre, le public cible et les fonctionnalités essentielles.
                      Pour les fonctionnalités IA, précisez les tâches spécifiques où l'intelligence artificielle
                      apporterait une réelle valeur ajoutée.
                    </p>
                    <div className="mt-2 text-sm bg-muted p-3 rounded-md">
                      <p className="font-medium">Exemple:</p>
                      <p>Application de feedback client qui analyse automatiquement les sentiments et classe les commentaires.</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Choisir les outils appropriés</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Sélectionnez une plateforme no-code qui correspond à vos besoins (web, mobile, etc.)
                      et qui permet l'intégration avec des services IA externes ou propose des fonctionnalités
                      IA natives.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Concevoir l'interface utilisateur</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Créez une interface intuitive avec les plateformes no-code qui offrent des composants
                      drag-and-drop. Pour les interactions IA, pensez à intégrer des éléments comme des zones de texte
                      pour les prompts, des espaces pour afficher les réponses, ou des zones de téléchargement pour les images.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Configurer les intégrations IA</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Utilisez des connecteurs ou des API pour intégrer des services d'IA comme OpenAI, Google AI,
                      ou des solutions spécialisées. La plupart des plateformes no-code permettent d'ajouter des
                      intégrations via des webhooks, des plugins, ou des API.
                    </p>
                    
                    <TipCard title="Astuce pour les intégrations IA">
                      Utilisez des services comme Zapier, Make (anciennement Integromat) ou n8n pour créer des workflows
                      d'automatisation entre votre application no-code et les API d'IA sans avoir à écrire de code.
                    </TipCard>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Configurer la base de données et la logique</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Définissez la structure de données et les workflows dans votre plateforme no-code.
                      Pour les fonctionnalités IA, pensez à stocker les résultats générés pour éviter
                      de refaire des appels API coûteux.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Tester et itérer</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Testez votre application avec des utilisateurs réels et recueillez leurs commentaires.
                      Les fonctionnalités IA peuvent nécessiter plusieurs itérations pour affiner les prompts
                      et améliorer la qualité des résultats.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">7</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Déployer et surveiller</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Publiez votre application et mettez en place un suivi des performances.
                      Pour les fonctionnalités IA, surveillez particulièrement les coûts d'API,
                      la qualité des réponses générées et le feedback utilisateur.
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Limites et considérations</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card className="border-l-4 border-l-orange-400">
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <XSquare className="h-4 w-4 text-orange-500" />
                      Limites techniques
                    </h4>
                    <ul className="list-disc pl-4 mt-2 text-sm space-y-1 text-muted-foreground">
                      <li>Personnalisation moins poussée qu'avec du code</li>
                      <li>Intégrations IA parfois limitées aux API disponibles</li>
                      <li>Performances potentiellement réduites pour les applications complexes</li>
                      <li>Dépendance aux plateformes et services tiers</li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card className="border-l-4 border-l-blue-400">
                  <CardContent className="p-4">
                    <h4 className="font-semibold flex items-center gap-2">
                      <Gem className="h-4 w-4 text-blue-500" />
                      Meilleures pratiques
                    </h4>
                    <ul className="list-disc pl-4 mt-2 text-sm space-y-1 text-muted-foreground">
                      <li>Commencer simple et itérer progressivement</li>
                      <li>Utiliser des templates et exemples existants</li>
                      <li>Se former sur les capacités et limites des outils choisis</li>
                      <li>Prévoir des fallbacks en cas d'indisponibilité des services IA</li>
                      <li>Tester régulièrement avec des utilisateurs réels</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="workflow" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Workflows Avancés pour Développer avec l'IA</h2>
              
              <h3 className="text-xl font-semibold mt-6">Méthodologie de développement assisté par IA</h3>
              <p>
                Pour tirer le meilleur parti des outils d'IA dans le développement, il est utile de suivre
                une méthodologie adaptée qui capitalise sur les forces de l'IA tout en reconnaissant ses limites.
              </p>
              
              <div className="space-y-6 mt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Planification et architecture</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Avant de commencer à générer du code, définissez clairement l'architecture et les fonctionnalités 
                      du système. L'IA peut vous aider à explorer différentes options d'architecture, mais la décision 
                      finale bénéficie de l'expertise humaine.
                    </p>
                    <div className="mt-2 text-sm bg-muted p-3 rounded-md">
                      <p className="font-medium">Exemple de prompt:</p>
                      <p>« Je veux créer une application web pour la gestion de tâches avec authentification, stockage 
                      en temps réel et notifications push. Propose-moi plusieurs options d'architecture avec leurs avantages 
                      et inconvénients, en utilisant des technologies modernes comme React, Firebase, etc. »</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Développement itératif par composants</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Plutôt que de demander à l'IA de générer une application complète en une seule fois, 
                      adoptez une approche itérative par composants. Cela permet de mieux contrôler la qualité et 
                      de comprendre chaque partie du système.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div className="text-sm bg-red-50 dark:bg-red-950 p-3 rounded-md border border-red-200 dark:border-red-800">
                        <p className="font-medium text-red-700 dark:text-red-300">À éviter :</p>
                        <p className="text-red-700 dark:text-red-400">« Génère une application complète d'e-commerce avec React, Node.js et MongoDB »</p>
                      </div>
                      <div className="text-sm bg-green-50 dark:bg-green-950 p-3 rounded-md border border-green-200 dark:border-green-800">
                        <p className="font-medium text-green-700 dark:text-green-300">À privilégier :</p>
                        <p className="text-green-700 dark:text-green-400">« Génère un composant de carte produit pour une application e-commerce React avec gestion d'état et animations »</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Une boucle de travail inspirée du REPL</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Le REPL (Read-Eval-Print Loop) est un environnement de programmation interactif, pas une méthode établie. Voici une boucle de travail qui s'en inspire (proposition de ce cours) :
                    </p>
                    <ul className="list-disc pl-5 mt-2 text-sm space-y-2 text-muted-foreground">
                      <li><span className="font-medium">Read</span>: Analyser la documentation, les spécifications et le code existant</li>
                      <li><span className="font-medium">Evaluate</span>: Demander à l'IA de générer des solutions ou améliorations</li>
                      <li><span className="font-medium">Print</span>: Intégrer et tester le code généré</li>
                      <li><span className="font-medium">Loop</span>: Affiner, corriger et améliorer avec l'aide de l'IA</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Techniques avancées de prompting pour le développement</h3>
              
              <div className="space-y-6 mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      Prompt Engineering pour le code
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-sm">Prompting avec contexte complet</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Fournissez le contexte nécessaire: langage, framework, style de code, versions, contraintes.
                        </p>
                        <CodeSnippet>
                          {`"Je travaille sur une application React 18 avec TypeScript 5.0 et Tailwind CSS. 
Notre convention de code utilise des composants fonctionnels, des hooks personnalisés, 
et nous suivons les principes de l'architecture propre. 
Génère un composant de formulaire de contact avec validation qui envoie les données à une API."`}
                        </CodeSnippet>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Prompting incrémental ciblé</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Posez des questions spécifiques sur des parties du code plutôt que de demander des refactorisations complètes.
                        </p>
                        <CodeSnippet>
                          {`"Dans ce composant React, j'ai un problème de performance avec la fonction handleSubmit. 
Elle est appelée trop souvent et cause des re-rendus inutiles. 
Voici le code:

function ContactForm() {
  // ... [code du composant]
  
  const handleSubmit = () => {
    // ... [code de la fonction]
  }
  
  // ... [reste du code]
}

Comment puis-je optimiser cette fonction avec useCallback et useMemo pour éviter les re-rendus?"`}
                        </CodeSnippet>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Prompting avec auto-critique</h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Demandez à l'IA d'évaluer ses propres solutions et de proposer des améliorations.
                        </p>
                        <CodeSnippet>
                          {`"Génère une fonction en JavaScript pour trier un tableau d'objets par une propriété spécifiée.
Ensuite, analyse ton propre code et identifie:
1. Les potentiels bugs ou cas limites
2. Les optimisations possibles
3. Comment la rendre plus maintenable et réutilisable
Enfin, propose une version améliorée basée sur cette analyse."`}
                        </CodeSnippet>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Modèles de prompts pour tâches de développement spécifiques
                    </h4>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-sm">Pour créer des tests unitaires</h5>
                        <CodeSnippet>
                          {`"Génère des tests unitaires Jest pour cette fonction:
[CODE DE LA FONCTION]

Les tests doivent:
1. Couvrir les cas nominaux
2. Gérer les cas d'erreur
3. Tester les cas limites
4. Utiliser des mocks pour les dépendances externes
5. Suivre le pattern AAA (Arrange, Act, Assert)"`}
                        </CodeSnippet>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Pour refactorer du code</h5>
                        <CodeSnippet>
                          {`"Refactorise ce code pour:
[CODE À REFACTORISER]

Objectifs:
1. Améliorer la lisibilité
2. Réduire la complexité cognitive
3. Appliquer les principes SOLID
4. Utiliser les fonctionnalités modernes du langage
5. Maintenir la fonctionnalité exacte (comportement identique)

Explique chaque changement majeur et ses avantages."`}
                        </CodeSnippet>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Pour optimiser les performances</h5>
                        <CodeSnippet>
                          {`"Analyse les performances de ce code:
[CODE À OPTIMISER]

Propose des optimisations spécifiques pour:
1. Réduire la complexité algorithmique
2. Minimiser les opérations coûteuses
3. Éviter les fuites mémoire
4. Améliorer la mise en cache
5. Réduire les calculs redondants

Pour chaque optimisation, explique le gain attendu et les compromis."`}
                        </CodeSnippet>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-sm">Pour implémenter un design pattern</h5>
                        <CodeSnippet>
                          {`"J'ai besoin d'implémenter le pattern Observer dans mon application JavaScript pour:
[DESCRIPTION DU PROBLÈME]

Génère une implémentation qui:
1. Est facile à comprendre et à utiliser
2. Utilise des concepts modernes (classes ES6, etc.)
3. Est typée avec JSDoc ou TypeScript
4. Inclut des exemples d'utilisation
5. Est facilement extensible"`}
                        </CodeSnippet>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Collaboration humain-IA : bonnes pratiques</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-3">Comprendre avant d'intégrer</h4>
                    <p className="text-sm text-muted-foreground">
                      Ne copiez jamais de code généré par une IA sans le comprendre. Prenez le temps d'analyser 
                      la solution proposée et assurez-vous de comprendre comment elle fonctionne.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-3">Vérifier et tester rigoureusement</h4>
                    <p className="text-sm text-muted-foreground">
                      Le code généré par l'IA peut contenir des erreurs subtiles ou des problèmes de sécurité.
                      Testez toujours minutieusement et utilisez des outils d'analyse statique.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h4 className="font-semibold mb-3">L'IA comme partenaire, non remplaçant</h4>
                    <p className="text-sm text-muted-foreground">
                      Utilisez l'IA comme une aide dont vous mesurez l'apport réel sur vos tâches (un essai contrôlé randomisé de METR en 2025 a mesuré des tâches en moyenne 19 pour cent plus longues avec l'IA pour des développeurs expérimentés), et maintenez votre
                      jugement critique. La vision d'ensemble du projet reste une compétence humaine clé.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <h3 className="text-xl font-semibold mt-8">Risques du code généré et garde-fous</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {[
                  {
                    title: 'Dépendances inventées',
                    text: "Une IA peut recommander un paquet qui n'existe pas. Des chercheurs ont montré qu'un attaquant peut enregistrer ces noms pour y placer du code malveillant («\u00A0slopsquatting\u00A0»)\u00A0: vérifiez qu'un paquet existe, qui le maintient et depuis quand avant de l'installer.",
                  },
                  {
                    title: 'Failles de sécurité',
                    text: "Le code généré peut contenir des injections, des secrets écrits en dur ou des choix cryptographiques faibles. Relisez, testez et passez un outil d'analyse statique, comme pour du code écrit par un humain.",
                  },
                  {
                    title: 'Confidentialité et licences',
                    text: "N'envoyez pas de secrets, de données personnelles ni de code propriétaire à un service dont vous n'avez pas lu les conditions. Vérifiez la politique de votre organisation et la licence du code obtenu.",
                  },
                  {
                    title: 'Agents\u00A0: permissions et instructions cachées',
                    text: "Donnez à un agent le minimum de droits, faites-le travailler sur une branche et relisez chaque modification. Méfiez-vous des fichiers et des pages web qu'il lit\u00A0: ils peuvent contenir des instructions qui détournent son comportement (injection de prompt).",
                  },
                ].map((risk) => (
                  <Card key={risk.title} className="border-l-4 border-l-orange-400">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3">{risk.title}</h4>
                      <p className="text-sm text-muted-foreground">{risk.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <TipCard title="Construire une mémoire de projet avec l'IA">
                Pour les projets complexes, créez un « guide IA » spécifique au projet qui définit la structure,
                les conventions et les dépendances. Au début de chaque session avec un outil IA,
                fournissez ce guide pour assurer que le code généré reste cohérent avec la vision du projet.
              </TipCard>
              
              <h3 className="text-xl font-semibold mt-8">Automatisation des tâches de développement</h3>
              
              <div className="space-y-4 mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-2">Scripts personnalisés + IA</h4>
                    <p className="text-sm text-muted-foreground">
                      Créez des scripts qui utilisent les API des modèles d'IA pour automatiser des tâches répétitives
                      comme la génération de documentation, la création de tests, ou la revue de code.
                    </p>
                    <CodeSnippet>
                      {`#!/usr/bin/env node
// generate-docs.js - Script pour générer automatiquement de la documentation

const fs = require('fs');
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generateDocForFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  
  const response = await openai.chat.completions.create({
    model: process.env.AI_MODEL, // nom du modèle choisi chez votre fournisseur
    messages: [
      { 
        role: "system", 
        content: "Génère une documentation complète pour le code suivant." 
      },
      { 
        role: "user", 
        content: code 
      }
    ]
  });
  
  const docContent = response.choices[0].message.content;
  const docPath = filePath.replace(/\\.js$/, '.md');
  
  fs.writeFileSync(docPath, docContent);
  console.log(\`Documentation générée pour \${filePath} -> \${docPath}\`);
}

// Usage: node generate-docs.js src/components/*.js
// Le shell développe le joker *.js : le script reçoit directement la liste des fichiers.
const files = process.argv.slice(2);

(async () => {
  for (const file of files) {
    await generateDocForFile(file);
  }
})();`}
                    </CodeSnippet>
                    <WarningCard title="Attention à ce que vous envoyez">
                      Ce script transmet le contenu de vos fichiers à un service externe. Ne l'utilisez pas sur du code
                      confidentiel sans avoir vérifié les conditions d'usage du fournisseur, et relisez la documentation
                      produite : elle peut contenir des erreurs.
                    </WarningCard>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-8" />
          
          <ClassicCourseQuiz slug="coder-avec-ia" />

          <CourseSources sources={coderSources} />

        </div>
    </CourseGuideLayout>
  );
};

export default CoderAvecIA;
