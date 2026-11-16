// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, RotateCcw, ListChecks } from 'lucide-react';
import { PromptTemplate } from './promptTemplatesData';

interface GeneratedPrompt {
  id: string;
  content: string;
  template: PromptTemplate;
  timestamp: Date;
  
}

interface TemplateHistoryProps {
  generatedPrompts: GeneratedPrompt[];
  onTemplateReuse: (template: PromptTemplate) => void;
  onPromptCheck: (prompt: string) => void;
}

const TemplateHistory: React.FC<TemplateHistoryProps> = ({
  generatedPrompts,
  onTemplateReuse,
  onPromptCheck
}) => {
  if (generatedPrompts.length === 0) {
    return (
      <div className="text-center py-12">
        <History className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Aucun historique</h3>
        <p className="text-muted-foreground">
          Vos prompts générés apparaîtront ici pour un accès rapide. Cet historique n'est gardé que tant que la page
          reste ouverte (20 derniers prompts). Pour garder un prompt, utilisez « Enregistrer le prompt actuel » dans l'onglet
          « Enregistrés ».
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historique des prompts générés
            <Badge variant="secondary">{generatedPrompts.length}</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Retrouvez et réutilisez vos derniers prompts générés. Cet historique n'est gardé que tant que la page reste
            ouverte (20 derniers prompts). Pour garder un prompt, utilisez « Enregistrer le prompt actuel » dans l'onglet
            « Enregistrés ».
          </p>
        </CardHeader>
      </Card>
      
      <div className="space-y-4">
        {generatedPrompts.map(prompt => (
          <Card key={prompt.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-medium">{prompt.template.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{prompt.timestamp.toLocaleString()}</span>
                      <Badge variant="outline" className="text-xs">
                        {prompt.template.domain}
                      </Badge>
                    </div>
                  </div>
                </div>
                
              </div>
              
              <div className="bg-muted p-3 rounded text-sm mb-3">
                <p className="line-clamp-3">{prompt.content}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => onTemplateReuse(prompt.template)}
                  className="text-sm"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Réutiliser le modèle
                </Button>
                <Button 
                  size="sm"
                  variant="outline"
                  onClick={() => onPromptCheck(prompt.content)}
                  className="text-sm"
                >
                  <ListChecks className="h-4 w-4 mr-1" />
                  Vérifier le prompt
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateHistory;
