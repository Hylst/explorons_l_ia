// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';

interface TemplateFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: Array<{id: string; name: string}>;
  getCategoryCount: (categoryId: string) => number;
  totalTemplates: number;
}

const TemplateFilters: React.FC<TemplateFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  getCategoryCount,
  totalTemplates
}) => {
  return (
    <div className="space-y-4">
      {/* Barre de recherche et tri */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un modèle..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Catégories */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onCategoryChange('all')}
        >
          Tous ({totalTemplates})
        </Button>
        {categories.map(category => {
          const count = getCategoryCount(category.id);
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(category.id)}
            >
              {category.name} ({count})
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateFilters;
