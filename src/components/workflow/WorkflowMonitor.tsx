// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Activity, CheckCircle, Timer } from 'lucide-react';
import type { Edge, Node } from '@xyflow/react';
import SimulationNotice from '@/components/common/SimulationNotice';
import { KIND_LABELS, classifyNode, computeStats, nodeLabel, type NodeKind } from './analysis';

interface WorkflowMonitorProps {
  isExecuting: boolean;
  nodes: Node[];
  edges: Edge[];
  /** Appelé quand la simulation est terminée (ou interrompue). */
  onFinished: () => void;
}

interface SimulationLog {
  id: string;
  nodeName: string;
  kind: NodeKind;
  status: 'running' | 'completed';
  simulatedMs?: number;
}

/** Durées fictives par type d'étape, en millisecondes simulées. */
const SIMULATED_MS: Record<NodeKind, number> = {
  llm: 1800,
  image: 2600,
  audio: 1500,
  video: 3500,
  data: 600,
  logic: 300,
  autre: 500
};

/** La simulation est accélérée : 4 s simulées s'écoulent en 1 s réelle. */
const SPEED_UP = 4;

const formatSeconds = (ms: number) => (ms / 1000).toFixed(1).replace('.', ',');

/**
 * Simulation de l'exécution : le graphe est parcouru dans l'ordre de ses dépendances et chaque étape « dure » un
 * temps fictif selon son type. Aucun modèle n'est appelé, aucune donnée n'est envoyée.
 */
const WorkflowMonitor: React.FC<WorkflowMonitorProps> = ({ isExecuting, nodes, edges, onFinished }) => {
  const [logs, setLogs] = useState<SimulationLog[]>([]);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const [simulatedMs, setSimulatedMs] = useState(0);
  const [hasCycle, setHasCycle] = useState(false);
  const finishedRef = useRef(onFinished);
  finishedRef.current = onFinished;
  // La simulation part d'une photo du graphe : modifier le graphe pendant qu'elle tourne ne la relance pas.
  const graphRef = useRef({ nodes, edges });
  graphRef.current = { nodes, edges };

  useEffect(() => {
    if (!isExecuting) return;

    let cancelled = false;
    const sleep = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

    const run = async () => {
      const stats = computeStats(graphRef.current.nodes, graphRef.current.edges);
      setLogs([]);
      setCompleted(0);
      setSimulatedMs(0);
      setTotal(stats.order.length);
      setHasCycle(stats.hasCycle);

      let elapsed = 0;
      for (let i = 0; i < stats.order.length; i++) {
        const node = stats.order[i];
        const kind = classifyNode(node);
        const duration = SIMULATED_MS[kind];
        const base = { id: node.id, nodeName: nodeLabel(node), kind };

        setLogs((previous) => [...previous, { ...base, id: `${node.id}-start`, status: 'running' }]);
        await sleep(duration / SPEED_UP);
        if (cancelled) return;

        elapsed += duration;
        setLogs((previous) => [...previous, { ...base, id: `${node.id}-end`, status: 'completed', simulatedMs: duration }]);
        setCompleted(i + 1);
        setSimulatedMs(elapsed);
      }
      if (!cancelled) finishedRef.current();
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [isExecuting]);

  const progress = total === 0 ? 0 : (completed / total) * 100;

  return (
    <div className="p-4 space-y-4">
      <SimulationNotice>
        Simulation : aucun modèle n'est appelé. Les durées sont des valeurs fictives par type d'étape, accélérées pour la
        démonstration.
      </SimulationNotice>

      {hasCycle && (
        <p className="text-xs text-amber-700 dark:text-amber-300">
          Le graphe contient une boucle : les nœuds sont simulés dans leur ordre de création.
        </p>
      )}

      <div className="grid grid-cols-2 gap-2">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Étapes simulées</p>
                <p className="text-sm font-semibold">{completed}/{total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-blue-500" aria-hidden="true" />
              <div>
                <p className="text-xs text-muted-foreground">Durée simulée</p>
                <p className="text-sm font-semibold">{formatSeconds(simulatedMs)} s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Progress value={progress} className="h-2" aria-label="Progression de la simulation" />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Déroulé de la simulation</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-64">
            <div className="p-3 space-y-2">
              {logs.length === 0 ? (
                <p className="text-xs text-muted-foreground text-center py-4">Aucune étape simulée pour l'instant</p>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 text-xs">
                    {log.status === 'running' ? (
                      <Activity className="h-4 w-4 text-blue-500 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
                    ) : (
                      <CheckCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium truncate">{log.nodeName}</span>
                        <Badge variant={log.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                          {log.status === 'completed' ? 'terminée' : 'en cours'}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">
                        {KIND_LABELS[log.kind]}
                        {log.simulatedMs !== undefined && ` · ${formatSeconds(log.simulatedMs)} s simulées`}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowMonitor;
