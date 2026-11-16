// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PromptTemplate } from './promptTemplatesData';

interface TemplateCardProps {
  template: PromptTemplate;
  isSelected: boolean;
  onSelect: (template: PromptTemplate) => void;
  isAdvanced?: boolean;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ 
  template, 
  isSelected, 
  onSelect,
  isAdvanced = false 
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => onSelect(template)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-lg">{template.name}</h3>
              {isAdvanced && (
                <Badge variant="default" className="text-xs">Avancé</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {template.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Badge variant="outline">{template.domain}</Badge>
            </div>
          </div>
          {isSelected && (
            <div className="ml-2">
              <Badge>Sélectionné</Badge>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {template.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
