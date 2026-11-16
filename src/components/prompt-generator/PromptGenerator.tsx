// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb, History, ListChecks, Save, Sparkles, Columns3 } from 'lucide-react';
import PromptGeneratorHeader from './PromptGeneratorHeader';
import TemplateSelector from './TemplateSelector';
import PromptEngine from './PromptEngine';

import PromptOptimizer from './PromptOptimizer';
import PromptComparisonLab from './PromptComparisonLab';
import PromptExportManager from './PromptExportManager';
import TemplateHistory from './TemplateHistory';
import { PromptTemplate } from './promptTemplatesData';
import { templateCounts } from './allTemplates';

interface GeneratedPrompt {
  id: string;
  content: string;
  template: PromptTemplate;
  timestamp: Date;
}

const PromptGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | undefined>();
  const [currentPrompt, setCurrentPrompt] = useState<string>('');
  const [currentVariables, setCurrentVariables] = useState<Record<string, string>>({});
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);
  const [activeTab, setActiveTab] = useState('templates');
  // Les variantes vivent ici : elles survivent au changement d'onglet, l'onglet inactif étant démonté.
  const [compareVariants, setCompareVariants] = useState<string[]>(['', '', '']);

  const handleTemplateSelect = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    // Auto-switch to generator tab when template is selected
    if (activeTab === 'templates') {
      setActiveTab('generator');
    }
  };

  const handlePromptGenerated = (prompt: string, template: PromptTemplate, variables: Record<string, string>) => {
    setCurrentPrompt(prompt);
    setCurrentVariables(variables);
    
    const newGenerated: GeneratedPrompt = {
      id: Date.now().toString(),
      content: prompt,
      template,
      timestamp: new Date()
    };
    
    setGeneratedPrompts(prev => [newGenerated, ...prev.slice(0, 19)]); // Keep last 20
  };

  

  const handleTemplateReuse = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setActiveTab('generator');
  };

  const handlePromptCheck = (prompt: string) => {
    setCurrentPrompt(prompt);
    setActiveTab('optimizer');
  };

  /** À la première ouverture du comparateur, la variante A reprend le prompt en cours. */
  const handleTabChange = (tab: string) => {
    if (tab === 'compare' && currentPrompt && compareVariants.every((value) => value.trim() === '')) {
      setCompareVariants([currentPrompt, '', '']);
    }
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6">
      <PromptGeneratorHeader />
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 gap-1 md:grid-cols-6">
          <TabsTrigger value="templates" className="col-span-2 flex items-center gap-2 md:col-span-1">
            <Sparkles className="h-4 w-4" />
            Modèles
          </TabsTrigger>
          <TabsTrigger value="generator" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Générateur
          </TabsTrigger>
          <TabsTrigger value="optimizer" className="flex items-center gap-2">
            <ListChecks className="h-4 w-4" />
            Vérification
          </TabsTrigger>
          <TabsTrigger value="compare" className="flex items-center gap-2">
            <Columns3 className="h-4 w-4" />
            Comparer
          </TabsTrigger>
          <TabsTrigger value="manager" className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Enregistrés
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-6">
          <TemplateSelector 
            onTemplateSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
          />
        </TabsContent>

        <TabsContent value="generator" className="mt-6">
          {selectedTemplate ? (
            <PromptEngine
              key={selectedTemplate.id}
              template={selectedTemplate}
              onPromptGenerated={handlePromptGenerated}
            />
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <Lightbulb className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-3">Sélectionnez un modèle</h3>
                <p className="text-muted-foreground mb-6">
                  Choisissez parmi {templateCounts.templates} modèles de prompts pour les LLM, la génération
                  d'images, l'audio, la vidéo et les systèmes RAG.
                </p>
                <button 
                  onClick={() => setActiveTab('templates')}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Parcourir les modèles
                </button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="optimizer" className="mt-6">
          {currentPrompt ? (
            <PromptOptimizer 
              prompt={currentPrompt}
              onOptimizedPrompt={setCurrentPrompt}
            />
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <ListChecks className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-3">Générez un prompt d'abord</h3>
                <p className="text-muted-foreground mb-6">
                  Créez un prompt dans l'onglet « Générateur » pour pouvoir en vérifier la structure ici.
                </p>
                <button 
                  onClick={() => setActiveTab('generator')}
                  className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Aller au générateur
                </button>
              </div>
            </div>
          )}
        </TabsContent>

        

        <TabsContent value="compare" className="mt-6">
          <PromptComparisonLab
            variants={compareVariants}
            onVariantsChange={setCompareVariants}
            sourcePrompt={currentPrompt}
          />
        </TabsContent>

        <TabsContent value="manager" className="mt-6">
          <PromptExportManager 
            currentPrompt={currentPrompt}
            currentTemplate={selectedTemplate}
            currentVariables={currentVariables}
          />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <TemplateHistory
            generatedPrompts={generatedPrompts}
            onTemplateReuse={handleTemplateReuse}
            onPromptCheck={handlePromptCheck}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptGenerator;
