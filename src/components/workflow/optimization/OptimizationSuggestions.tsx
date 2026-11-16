// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, DollarSign, Lightbulb, Network, Shield, TrendingUp } from 'lucide-react';
import type { Finding, FindingType, Priority } from '../analysis';

interface OptimizationSuggestionsProps {
  findings: Finding[];
  /** Quand fourni, les constats qui ont une correction automatique affichent un bouton. */
  onApplyFix?: (finding: Finding) => void;
  title?: string;
  /** Sans cadre : pour l'intégrer dans un panneau étroit. */
  compact?: boolean;
}

const TYPE_LABELS: Record<FindingType, string> = {
  structure: 'Structure',
  performance: 'Performance',
  cost: 'Coût',
  reliability: 'Fiabilité',
  security: 'Sécurité'
};

const TYPE_ICONS: Record<FindingType, React.ReactNode> = {
  structure: <Network className="h-4 w-4 text-slate-500" aria-hidden="true" />,
  performance: <TrendingUp className="h-4 w-4 text-blue-500" aria-hidden="true" />,
  cost: <DollarSign className="h-4 w-4 text-green-500" aria-hidden="true" />,
  reliability: <CheckCircle className="h-4 w-4 text-purple-500" aria-hidden="true" />,
  security: <Shield className="h-4 w-4 text-rose-500" aria-hidden="true" />
};

const PRIORITY_STYLES: Record<Priority, string> = {
  haute: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200',
  moyenne: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200',
  basse: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200'
};

const FindingsList: React.FC<Pick<OptimizationSuggestionsProps, 'findings' | 'onApplyFix'>> = ({ findings, onApplyFix }) => (
  <div className="space-y-3">
    {findings.map((finding) => (
      <div key={finding.id} className="border rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">{TYPE_ICONS[finding.type]}</div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h4 className="font-medium text-sm">{finding.title}</h4>
              <Badge variant="outline" className="text-xs">{TYPE_LABELS[finding.type]}</Badge>
              <Badge className={`text-xs ${PRIORITY_STYLES[finding.priority]}`} variant="secondary">
                Priorité {finding.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{finding.description}</p>
          </div>
          {onApplyFix && finding.fix && (
            <Button size="sm" variant="outline" onClick={() => onApplyFix(finding)}>
              Corriger
            </Button>
          )}
        </div>
      </div>
    ))}
  </div>
);

const OptimizationSuggestions: React.FC<OptimizationSuggestionsProps> = ({
  findings,
  onApplyFix,
  title = "Conseils d'amélioration",
  compact = false
}) => {
  const body =
    findings.length === 0 ? (
      <div className="text-center py-6">
        <CheckCircle className="h-8 w-8 mx-auto text-green-700 dark:text-green-400 mb-2" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          Aucun point d'attention détecté dans la structure. Cela ne garantit pas que le workflow fonctionne : testez-le
          sur de vrais cas.
        </p>
      </div>
    ) : (
      <FindingsList findings={findings} onApplyFix={onApplyFix} />
    );

  if (compact) return body;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{body}</CardContent>
    </Card>
  );
};

export default OptimizationSuggestions;
