// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ListChecks } from 'lucide-react';
import type { Edge, Node } from '@xyflow/react';
import OptimizationSuggestions from './optimization/OptimizationSuggestions';
import { analyzeWorkflow, type Finding } from './analysis';

interface AutoOptimizerProps {
  nodes: Node[];
  edges: Edge[];
  onOptimizationApplied: (optimizedNodes: Node[], optimizedEdges: Edge[]) => void;
}

/**
 * Vérifications de la structure du graphe en cours d'édition. Seule la suppression des nœuds non reliés peut être
 * appliquée automatiquement : les autres conseils demandent un choix de conception.
 */
const AutoOptimizer: React.FC<AutoOptimizerProps> = ({ nodes, edges, onOptimizationApplied }) => {
  const { stats, findings } = useMemo(() => analyzeWorkflow(nodes, edges), [nodes, edges]);

  const applyFix = (finding: Finding) => {
    if (finding.fix === 'remove-isolated') {
      const removed = new Set(stats.isolated.map((node) => node.id));
      onOptimizationApplied(
        nodes.filter((node) => !removed.has(node.id)),
        edges
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ListChecks className="h-5 w-5 text-primary" aria-hidden="true" />
          Vérifications
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Points d'attention repérés dans la structure du graphe. Les règles sont générales : elles ne remplacent pas un
          test sur de vrais cas.
        </p>
      </CardHeader>
      <CardContent>
        {nodes.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">Ajoutez des nœuds pour lancer les vérifications.</p>
        ) : (
          <OptimizationSuggestions findings={findings} onApplyFix={applyFix} compact />
        )}
      </CardContent>
    </Card>
  );
};

export default AutoOptimizer;
