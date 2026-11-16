// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import { PromptTemplate } from './promptTemplatesData';
import { allTemplates, allCategories, isAdvancedTemplate } from './allTemplates';
import TemplateFilters from './TemplateFilters';
import TemplateCard from './TemplateCard';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface TemplateSelectorProps {
  onTemplateSelect: (template: PromptTemplate) => void;
  selectedTemplate?: PromptTemplate;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onTemplateSelect, 
  selectedTemplate 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'categories'>('categories');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const filteredTemplates = useMemo(() => {
    const templates = searchQuery 
      ? allTemplates.filter(template => 
          template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      : selectedCategory === 'all' 
        ? allTemplates 
        : allTemplates.filter(template => template.category === selectedCategory);

    templates.sort((a, b) => a.name.localeCompare(b.name, 'fr'));

    return templates;
  }, [searchQuery, selectedCategory]);

  const templatesByCategory = useMemo(() => {
    const grouped = new Map<string, PromptTemplate[]>();
    
    filteredTemplates.forEach(template => {
      if (!grouped.has(template.category)) {
        grouped.set(template.category, []);
      }
      grouped.get(template.category)!.push(template);
    });

    return grouped;
  }, [filteredTemplates]);

  const getCategoryCount = (categoryId: string) => {
    return allTemplates.filter(template => template.category === categoryId).length;
  };

  const getCategoryInfo = (categoryId: string) => {
    return allCategories.find(cat => cat.id === categoryId);
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="space-y-4">
      {/* En-tête avec statistiques */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Bibliothèque de modèles de prompts ({allTemplates.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {allCategories.length} catégories • {allTemplates.length} modèles de prompts pour LLM, génération d'images, audio, vidéo et systèmes RAG
          </p>
        </CardHeader>
        <CardContent>
          <TemplateFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={allCategories}
            getCategoryCount={getCategoryCount}
            totalTemplates={allTemplates.length}
          />
          
          {/* Toggle view mode */}
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              aria-pressed={viewMode === 'list'}
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'list' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Vue liste
            </button>
            <button
              type="button"
              aria-pressed={viewMode === 'categories'}
              onClick={() => setViewMode('categories')}
              className={`px-3 py-1 text-sm rounded ${
                viewMode === 'categories' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Vue par catégories
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Affichage des templates */}
      {filteredTemplates.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">Aucun modèle de prompt ne correspond à votre recherche.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {viewMode === 'list' ? (
            // Vue Liste classique
            <div className="grid gap-4">
              {filteredTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  isSelected={selectedTemplate?.id === template.id}
                  onSelect={onTemplateSelect}
                  isAdvanced={isAdvancedTemplate(template)}
                />
              ))}
            </div>
          ) : (
            // Vue par catégories
            <div className="space-y-4">
              {Array.from(templatesByCategory.entries()).map(([categoryId, templates]) => {
                const categoryInfo = getCategoryInfo(categoryId);
                const isExpanded = expandedCategories.has(categoryId);
                
                return (
                  <Card key={categoryId} className="overflow-hidden">
                    <Collapsible
                      open={isExpanded}
                      onOpenChange={() => toggleCategoryExpansion(categoryId)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Folder className="h-5 w-5 text-primary" />
                              <div className="text-left">
                                <CardTitle className="text-lg">
                                  {categoryInfo?.name || categoryId}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {categoryInfo?.description || 'Modèles spécialisés'} • {templates.length} modèle{templates.length > 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronDown className="h-5 w-5 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="grid gap-3">
                            {templates.map(template => (
                              <TemplateCard
                                key={template.id}
                                template={template}
                                isSelected={selectedTemplate?.id === template.id}
                                onSelect={onTemplateSelect}
                                isAdvanced={isAdvancedTemplate(template)}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Statistiques de recherche */}
      {filteredTemplates.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          {filteredTemplates.length} modèle{filteredTemplates.length > 1 ? 's' : ''} trouvé{filteredTemplates.length > 1 ? 's' : ''}
          {searchQuery && ` pour «\u00A0${searchQuery}\u00A0»`}
          {selectedCategory !== 'all' && ` dans la catégorie sélectionnée`}
          {viewMode === 'categories' && ` • Organisés en ${templatesByCategory.size} catégorie${templatesByCategory.size > 1 ? 's' : ''}`}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
