// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Wand2, Copy, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { PromptTemplate, PromptVariable } from './promptTemplatesData';

interface PromptEngineProps {
  template: PromptTemplate;
  onPromptGenerated: (prompt: string, template: PromptTemplate, variables: Record<string, string>) => void;
}

const PromptEngine: React.FC<PromptEngineProps> = ({ template, onPromptGenerated }) => {
  const [variables, setVariables] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    template.variables.forEach(variable => {
      initial[variable.name] = variable.defaultValue || '';
    });
    return initial;
  });
  
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');

  const updateVariable = (name: string, value: string) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  };

  const generatePrompt = () => {
    const missingRequired = template.variables
      .filter(variable => variable.required && !variables[variable.name]?.trim())
      .map(variable => variable.label);

    if (missingRequired.length > 0) {
      toast.error(`Champs à remplir\u00A0: ${missingRequired.join(', ')}`);
      return;
    }

    // Un seul passage sur le texte du modèle : seules les variables déclarées sont remplacées. Les accolades
    // présentes dans le modèle (exemples de JSON) ou dans les valeurs saisies (code) restent intactes, et une
    // valeur contenant « $& » ou « $1 » est recopiée telle quelle.
    const declared = new Set(template.variables.map(variable => variable.name));
    const prompt = template.template.replace(/\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g, (match, name: string) =>
      declared.has(name) ? (variables[name]?.trim() || '[non spécifié]') : match
    );

    setGeneratedPrompt(prompt);
    onPromptGenerated(prompt, template, variables);
    toast.success('Prompt composé');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      toast.success('Prompt copié dans le presse-papiers');
    } catch {
      toast.error('La copie a été refusée par le navigateur\u00A0: sélectionnez le texte à la main.');
    }
  };

  const resetVariables = () => {
    const initial: Record<string, string> = {};
    template.variables.forEach(variable => {
      initial[variable.name] = variable.defaultValue || '';
    });
    setVariables(initial);
    setGeneratedPrompt('');
  };

  const renderVariableInput = (variable: PromptVariable) => {
    const commonProps = {
      id: `var-${variable.name}`,
      value: variables[variable.name] || '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
        updateVariable(variable.name, e.target.value)
    };

    switch (variable.type) {
      case 'textarea':
        return (
          <Textarea
            {...commonProps}
            placeholder={variable.placeholder}
            className="min-h-[100px]"
          />
        );
      
      case 'select':
        return (
          <Select 
            value={variables[variable.name] || ''} 
            onValueChange={(value) => updateVariable(variable.name, value)}
          >
            <SelectTrigger id={`var-${variable.name}`}>
              <SelectValue placeholder="Choisir..." />
            </SelectTrigger>
            <SelectContent>
              {variable.options?.map(option => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      
      case 'number':
        return (
          <Input
            {...commonProps}
            type="number"
            placeholder={variable.placeholder}
          />
        );
      
      default:
        return (
          <Input
            {...commonProps}
            placeholder={variable.placeholder}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                {template.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </div>
            <div className="flex gap-2">
              {template.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {template.variables.map(variable => (
              <div key={variable.name} className="space-y-2">
                <Label htmlFor={`var-${variable.name}`}>
                  {variable.label}
                  {variable.required && <span className="text-destructive ml-1" aria-label="obligatoire">*</span>}
                </Label>
                {renderVariableInput(variable)}
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={generatePrompt} className="flex-1">
              <Wand2 className="h-4 w-4 mr-2" aria-hidden="true" />
              Composer le prompt
            </Button>
            <Button variant="outline" onClick={resetVariables} aria-label="Effacer les champs">
              <RefreshCw className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {generatedPrompt && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Prompt composé</CardTitle>
              <Button variant="outline" size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4 mr-2" />
                Copier
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{generatedPrompt}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptEngine;
