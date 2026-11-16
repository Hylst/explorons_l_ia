// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Download, Upload, Sparkles, Layers } from 'lucide-react';
import WorkflowNodeLibrary from './WorkflowNodeLibrary';
import WorkflowMonitor from './WorkflowMonitor';
import WorkflowPresets from './presets/WorkflowPresets';
import WorkflowCreator from './WorkflowCreator';
import AutoOptimizer from './AutoOptimizer';
import WorkflowTemplateLibrary from './templates/WorkflowTemplateLibrary';
import { workflowNodes, workflowEdges } from './workflowData';

export interface Workflow {
  nodes: Node[];
  edges: Edge[];
}

interface WorkflowEditorProps {
  /** Workflow à restaurer (par exemple au retour sur l'onglet de l'éditeur). */
  initialWorkflow?: Workflow;
  /** Appelé quand l'éditeur est quitté, avec le workflow en cours d'édition. */
  onLeave?: (workflow: Workflow) => void;
}

/** Taille maximale d'un fichier de workflow importé. */
const MAX_IMPORT_BYTES = 1_000_000;

const isWorkflow = (value: unknown): value is Workflow => {
  if (typeof value !== 'object' || value === null) return false;
  const { nodes, edges } = value as { nodes?: unknown; edges?: unknown };
  const validNode = (node: unknown) =>
    typeof node === 'object' &&
    node !== null &&
    typeof (node as Node).id === 'string' &&
    typeof (node as Node).position?.x === 'number' &&
    typeof (node as Node).position?.y === 'number';
  const validEdge = (edge: unknown) =>
    typeof edge === 'object' &&
    edge !== null &&
    typeof (edge as Edge).id === 'string' &&
    typeof (edge as Edge).source === 'string' &&
    typeof (edge as Edge).target === 'string';
  return Array.isArray(nodes) && Array.isArray(edges) && nodes.every(validNode) && edges.every(validEdge);
};

const WorkflowEditor: React.FC<WorkflowEditorProps> = ({ initialWorkflow, onLeave }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialWorkflow?.nodes ?? workflowNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialWorkflow?.edges ?? workflowEdges);
  const [isExecuting, setIsExecuting] = useState(false);
  const [showMonitor, setShowMonitor] = useState(false);
  const instanceRef = useRef<ReactFlowInstance | null>(null);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Mémorise l'état courant pour le transmettre à la page quand l'éditeur est quitté (changement d'onglet).
  const latest = useRef<Workflow>({ nodes, edges });
  latest.current = { nodes, edges };
  const leaveRef = useRef(onLeave);
  leaveRef.current = onLeave;
  useEffect(() => () => leaveRef.current?.(latest.current), []);

  // Les connexions ne s'animent que pendant la simulation : une animation permanente coûte du processeur pour rien.
  const displayedEdges = useMemo(
    () => edges.map((edge) => (Boolean(edge.animated) === isExecuting ? edge : { ...edge, animated: isExecuting })),
    [edges, isExecuting]
  );

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSimulate = useCallback(() => {
    setShowMonitor(true);
    setIsExecuting(true);
  }, []);

  const handleExport = useCallback(() => {
    const workflow = {
      nodes,
      edges,
      metadata: {
        name: 'Workflow IA personnalisé',
        generator: "Explorons l'IA (hylst.fr)",
        created: new Date().toISOString(),
        format: 1
      }
    };

    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workflow-ia-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  const handleImport = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = '';
      if (!file) return;
      if (file.size > MAX_IMPORT_BYTES) {
        toast.error('Fichier trop volumineux (1 Mo maximum).');
        return;
      }
      try {
        const parsed: unknown = JSON.parse(await file.text());
        if (!isWorkflow(parsed)) {
          toast.error("Ce fichier n'est pas un workflow valide (nœuds et connexions attendus).");
          return;
        }
        setNodes(parsed.nodes);
        setEdges(parsed.edges);
        toast.success(`Workflow importé\u00A0: ${parsed.nodes.length} nœuds, ${parsed.edges.length} connexions.`);
      } catch {
        toast.error("Le fichier n'a pas pu être lu\u00A0: ce n'est pas du JSON valide.");
      }
    },
    [setNodes, setEdges]
  );

  const handleLoadPreset = useCallback((preset: Workflow) => {
    setNodes(preset.nodes);
    setEdges(preset.edges);
  }, [setNodes, setEdges]);

  const handleLoadTemplate = useCallback((template: Workflow) => {
    setNodes(template.nodes);
    setEdges(template.edges);
  }, [setNodes, setEdges]);

  const handleOptimizationApplied = useCallback((optimizedNodes: Node[], optimizedEdges: Edge[]) => {
    setNodes(optimizedNodes);
    setEdges(optimizedEdges);
  }, [setNodes, setEdges]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:h-[800px]">
      {/* Sidebar gauche */}
      <Card className="w-full lg:w-80 shrink-0 h-[420px] lg:h-full flex flex-col overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Outils et ressources</CardTitle>
          <WorkflowCreator />
        </CardHeader>
        <CardContent className="p-0 flex-1 overflow-hidden min-h-0">
          <Tabs defaultValue="nodes" className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 mx-4 mb-4">
              <TabsTrigger value="nodes" className="text-xs">Nœuds</TabsTrigger>
              <TabsTrigger value="presets" className="text-xs">Préréglages</TabsTrigger>
              <TabsTrigger value="templates" className="text-xs">Gabarits</TabsTrigger>
              <TabsTrigger value="optimizer" className="text-xs" aria-label="Vérifications">
                <Sparkles className="h-3 w-3" aria-hidden="true" />
              </TabsTrigger>
            </TabsList>

            <TabsContent value="nodes" className="mt-0 flex-1 overflow-hidden min-h-0">
              <WorkflowNodeLibrary />
            </TabsContent>

            <TabsContent value="presets" className="mt-0 max-h-[600px] overflow-y-auto">
              <div className="p-4">
                <WorkflowPresets onLoadPreset={handleLoadPreset} />
              </div>
            </TabsContent>

            <TabsContent value="templates" className="mt-0 max-h-[600px] overflow-y-auto">
              <div className="p-4">
                <WorkflowTemplateLibrary onLoadTemplate={handleLoadTemplate} />
              </div>
            </TabsContent>

            <TabsContent value="optimizer" className="mt-0 max-h-[600px] overflow-y-auto">
              <div className="p-4">
                <AutoOptimizer
                  nodes={nodes}
                  edges={edges}
                  onOptimizationApplied={handleOptimizationApplied}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Éditeur principal */}
      <div className="flex-1 flex flex-col min-w-0 h-[600px] lg:h-auto">
        {/* Barre d'outils */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button onClick={handleSimulate} disabled={isExecuting}>
            <Play className="h-4 w-4 mr-2" aria-hidden="true" />
            {isExecuting ? 'Simulation en cours...' : "Simuler l'exécution"}
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" aria-hidden="true" />
            Exporter (JSON)
          </Button>
          <Button variant="outline" onClick={() => importInputRef.current?.click()}>
            <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
            Importer (JSON)
          </Button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            onChange={handleImport}
            aria-label="Importer un workflow au format JSON"
          />
          <div className="flex-1" />
          <div className="text-sm text-muted-foreground flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Layers className="h-4 w-4" aria-hidden="true" />
              {nodes.length} nœuds
            </div>
            <div>
              {edges.length} connexions
            </div>
          </div>
        </div>

        {/* Canvas React Flow */}
        <div className="flex-1 border rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={displayedEdges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={(instance) => {
              instanceRef.current = instance;
            }}
            fitView
            attributionPosition="top-right"
            style={{ backgroundColor: "#F7F9FB" }}
            onDrop={(event) => {
              event.preventDefault();
              const raw = event.dataTransfer.getData('application/reactflow');
              if (!raw) return;
              let nodeData: { data?: { label?: string; description?: string; category?: string } };
              try {
                nodeData = JSON.parse(raw);
              } catch {
                return;
              }
              const position = instanceRef.current
                ? instanceRef.current.screenToFlowPosition({ x: event.clientX, y: event.clientY })
                : { x: event.clientX - 200, y: event.clientY - 100 };
              const newNode: Node = {
                id: `node-${Date.now()}`,
                type: 'default',
                position,
                data: {
                  label: nodeData.data?.label ?? 'Nœud',
                  description: nodeData.data?.description,
                  category: nodeData.data?.category
                }
              };
              setNodes((nds) => [...nds, newNode]);
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.dataTransfer.dropEffect = 'move';
            }}
          >
            <MiniMap zoomable pannable />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>

      {/* Panneau de simulation */}
      {showMonitor && (
        <Card className="w-full lg:w-80 shrink-0">
          <CardHeader>
            <CardTitle className="text-base">Simulation d'exécution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <WorkflowMonitor
              isExecuting={isExecuting}
              nodes={nodes}
              edges={edges}
              onFinished={() => setIsExecuting(false)}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkflowEditor;
