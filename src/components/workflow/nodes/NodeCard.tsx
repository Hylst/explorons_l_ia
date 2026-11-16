// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WorkflowNode {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  complexity: 'débutant' | 'intermédiaire' | 'avancé';
  cost: string;
  inputs: string[];
  outputs: string[];
}

interface NodeCardProps {
  node: WorkflowNode;
  onDragStart: (e: React.DragEvent) => void;
}

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'débutant':
      return 'bg-green-100 text-green-800 dark:text-green-200 dark:bg-green-900/40';
    case 'intermédiaire':
      return 'bg-yellow-100 text-yellow-800 dark:text-yellow-200 dark:bg-yellow-900/40';
    case 'avancé':
      return 'bg-red-100 text-red-800 dark:text-red-200 dark:bg-red-900/40';
    default:
      return 'bg-gray-100 text-gray-800 dark:text-gray-200 dark:bg-muted';
  }
};

const NodeCard: React.FC<NodeCardProps> = ({ node, onDragStart }) => {
  return (
    <Card 
      className="cursor-move hover:shadow-xs transition-shadow border-l-4 border-l-primary/30 w-full"
      draggable
      onDragStart={onDragStart}
    >
      <CardContent className="p-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-primary/10 text-primary shrink-0">
            {node.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm mb-1 wrap-break-word">{node.name}</div>
            <p className="text-xs text-muted-foreground mb-3 line-clamp-2 wrap-break-word">
              {node.description}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              <Badge 
                className={`text-xs ${getComplexityColor(node.complexity)}`}
                variant="secondary"
              >
                {node.complexity}
              </Badge>
              <Badge variant="outline" className="text-xs wrap-break-word">
                {node.cost}
              </Badge>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <div>
                <strong>Entrées :</strong> 
                <span className="wrap-break-word ml-1">{node.inputs.join(', ')}</span>
              </div>
              <div>
                <strong>Sorties :</strong> 
                <span className="wrap-break-word ml-1">{node.outputs.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NodeCard;
