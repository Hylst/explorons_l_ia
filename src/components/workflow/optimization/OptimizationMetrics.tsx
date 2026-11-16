// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Layers, Network, Repeat } from 'lucide-react';
import { KIND_LABELS, type NodeKind, type WorkflowStats } from '../analysis';

interface OptimizationMetricsProps {
  stats: WorkflowStats;
}

const OptimizationMetrics: React.FC<OptimizationMetricsProps> = ({ stats }) => {
  const cards = [
    { label: 'Nœuds', value: String(stats.nodeCount), icon: Layers, color: 'text-blue-500' },
    { label: 'Connexions', value: String(stats.edgeCount), icon: Network, color: 'text-purple-500' },
    {
      label: 'Étapes successives',
      value: stats.hasCycle ? 'Boucle' : String(stats.depth),
      icon: stats.hasCycle ? Repeat : GitBranch,
      color: stats.hasCycle ? 'text-red-500' : 'text-orange-500'
    },
    {
      label: 'Nœuds en parallèle (max)',
      value: stats.hasCycle ? 'n.d.' : String(stats.parallelism),
      icon: GitBranch,
      color: 'text-green-500'
    }
  ];

  const kinds = (Object.keys(KIND_LABELS) as NodeKind[]).filter((kind) => stats.kinds[kind] > 0);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Icon className={`h-4 w-4 shrink-0 ${color}`} aria-hidden="true" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-lg font-semibold">{value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {kinds.length > 0 && (
        <div className="space-y-1">
          <div className="flex flex-wrap gap-2">
            {kinds.map((kind) => (
              <Badge key={kind} variant="secondary">
                {KIND_LABELS[kind]} : {stats.kinds[kind]}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Types estimés d'après les libellés des nœuds.</p>
        </div>
      )}
    </div>
  );
};

export default OptimizationMetrics;
