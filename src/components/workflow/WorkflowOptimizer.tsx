// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import type { Edge, Node } from '@xyflow/react';
import SimulationNotice from '@/components/common/SimulationNotice';
import OptimizationMetrics from './optimization/OptimizationMetrics';
import OptimizationSuggestions from './optimization/OptimizationSuggestions';
import { analyzeWorkflow } from './analysis';

interface WorkflowOptimizerProps {
  nodes: Node[];
  edges: Edge[];
}

/**
 * Analyse de la structure du workflow enregistré. Les chiffres sont calculés à partir du graphe : le site
 * n'exécute aucun modèle, il n'existe donc ni taux de succès, ni coût, ni durée réels à afficher.
 */
const WorkflowOptimizer: React.FC<WorkflowOptimizerProps> = ({ nodes, edges }) => {
  const { stats, findings } = useMemo(() => analyzeWorkflow(nodes, edges), [nodes, edges]);

  if (nodes.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <BarChart3 className="h-8 w-8 mx-auto text-muted-foreground mb-2" aria-hidden="true" />
          <p className="text-muted-foreground">Le workflow enregistré est vide : il n'y a rien à analyser.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <SimulationNotice>
        L'analyse porte sur la structure du graphe (nœuds, connexions, enchaînement). Aucune exécution réelle n'a lieu sur
        ce site : il n'y a donc ni taux de succès, ni durée, ni coût mesurés. Les conseils sont des règles générales de
        conception, pas des économies chiffrées.
      </SimulationNotice>
      <OptimizationMetrics stats={stats} />
      <OptimizationSuggestions findings={findings} />
    </div>
  );
};

export default WorkflowOptimizer;
