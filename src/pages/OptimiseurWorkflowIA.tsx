// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Hero from '@/components/Hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Workflow,
  MousePointer,
  BarChart4,
  Play,
  Settings,
  TrendingUp,
  ListChecks,
  Ban,
  Calculator,
  User
} from 'lucide-react';
import WorkflowEditor, { type Workflow as WorkflowGraph } from '@/components/workflow/WorkflowEditor';
import WorkflowOptimizer from '@/components/workflow/WorkflowOptimizer';
import WorkflowCreator from '@/components/workflow/WorkflowCreator';
import { workflowNodes as libraryNodes } from '@/components/workflow/data/workflowNodesData';
import { workflowPresets } from '@/components/workflow/presets/WorkflowPresets';
import { workflowTemplates } from '@/components/workflow/templates/WorkflowTemplateLibrary';
import { AUTHOR_TITLE } from '@/config/site';

const OptimiseurWorkflowIA = () => {
  const navigate = useNavigate();
  // Dernier état de l'éditeur : il est transmis quand on quitte l'onglet, pour ne rien perdre au retour.
  const [workflow, setWorkflow] = useState<WorkflowGraph | null>(null);
  const [tab, setTab] = useState('editor');

  return (
    <>
      <Hero
        title="Optimiseur de workflow IA"
        subtitle="Concevez une chaîne de traitement IA sous forme de graphe, simulez son exécution et repérez des points d'amélioration dans sa structure"
      />

      <section className="section-container">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/ressources?tab=outils')}
            className="flex items-center gap-2"
          >
            ← Retour aux outils IA
          </Button>
        </div>

        <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Concevoir et analyser un workflow</h2>
            <p className="text-muted-foreground max-w-3xl">
              Assemblez des étapes (les nœuds) et reliez-les. L'outil simule l'enchaînement et repère des points
              d'attention dans la structure. Il n'appelle aucun modèle d'IA : tout se passe dans votre navigateur.
            </p>
          </div>
          <WorkflowCreator />
        </div>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="editor" className="flex items-center gap-2">
              <MousePointer className="h-4 w-4" aria-hidden="true" />
              Éditeur visuel
            </TabsTrigger>
            <TabsTrigger value="optimizer" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" aria-hidden="true" />
              Analyse du workflow
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Settings className="h-4 w-4" aria-hidden="true" />
              Ce que fait l'outil
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" aria-hidden="true" />
                  Éditeur de workflow
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Glissez des nœuds depuis la bibliothèque, reliez-les, ou partez d'un préréglage ou d'un gabarit.
                </p>
              </CardHeader>
              <CardContent>
                <WorkflowEditor initialWorkflow={workflow ?? undefined} onLeave={setWorkflow} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="optimizer" className="mt-6">
            {workflow ? (
              <WorkflowOptimizer nodes={workflow.nodes} edges={workflow.edges} />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <BarChart4 className="h-12 w-12 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                  <h3 className="text-lg font-semibold mb-2">Aucun workflow à analyser</h3>
                  <p className="text-muted-foreground mb-4">
                    Construisez un workflow dans l'éditeur : son analyse s'affichera ici.
                  </p>
                  <Button variant="outline" onClick={() => setTab('editor')}>
                    Aller à l'éditeur
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MousePointer className="h-5 w-5" aria-hidden="true" />
                    Éditeur visuel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Glisser-déposer de {libraryNodes.length} types de nœuds, connexions, zoom et mini-carte</li>
                    <li>• {workflowPresets.length} préréglages et {workflowTemplates.length} gabarits comme points de départ</li>
                    <li>• Export et import du workflow au format JSON</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" aria-hidden="true" />
                    Simulation d'exécution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Parcours du graphe dans l'ordre de ses dépendances</li>
                    <li>• Durées fictives par type d'étape, accélérées pour la démonstration</li>
                    <li>• Aucun modèle appelé, aucune donnée envoyée</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5" aria-hidden="true" />
                    Analyse de la structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Nœuds non reliés, boucles, chaînes d'étapes très longues</li>
                    <li>• Absence d'étape de vérification après un modèle</li>
                    <li>• Rappel sur les données transmises à un modèle (confidentialité, RGPD)</li>
                    <li>• Conseils qualitatifs : aucune économie chiffrée n'est promise</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ban className="h-5 w-5" aria-hidden="true" />
                    Ce que l'outil ne fait pas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm space-y-1">
                    <li>• Il n'exécute pas de vrais modèles et ne se connecte à aucun service</li>
                    <li>• Il ne mesure ni coûts, ni durées, ni taux de succès réels</li>
                    <li>• Il ne conserve pas votre travail en ligne : exportez-le en JSON pour le garder</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" aria-hidden="true" />
                  Pour estimer des coûts
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                <p>
                  Les coûts réels dépendent du modèle, du volume et des tarifs en vigueur. Utilisez le{' '}
                  <Link to="/calculateur-couts-ia" className="underline underline-offset-4">calculateur de coûts</Link>{' '}
                  et le{' '}
                  <Link to="/comparateur-modeles-ia" className="underline underline-offset-4">comparateur de modèles</Link>{' '}
                  pour situer les ordres de grandeur, puis vérifiez les tarifs auprès des fournisseurs.
                </p>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" aria-hidden="true" />
                  À propos du créateur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <User className="h-8 w-8 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Geoffroy Streit</h4>
                    <p className="text-muted-foreground">{AUTHOR_TITLE}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default OptimiseurWorkflowIA;
