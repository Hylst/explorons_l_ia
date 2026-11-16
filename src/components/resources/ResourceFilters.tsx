// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Search, } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ResourceFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedTopic: string;
  setSelectedTopic: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  allTopics: string[];
  allYears: (number | undefined)[];
  /** Faux quand le filtre par sujet ne s'applique pas à l'onglet affiché. */
  showTopic?: boolean;
  /** Faux quand le filtre par année ne s'applique pas à l'onglet affiché. */
  showYear?: boolean;
}

export const ResourceFilters: React.FC<ResourceFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedTopic,
  setSelectedTopic,
  selectedYear,
  setSelectedYear,
  allTopics,
  allYears,
  showTopic = true,
  showYear = true
}) => {
  return (
    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 mb-8">
      <div className="relative grow">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher des ressources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>
      
      {(showTopic || showYear) && (
        <div className={showTopic && showYear ? 'grid grid-cols-1 sm:grid-cols-2 gap-3' : ''}>
          {showTopic && (
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-full" aria-label="Sujet">
                <SelectValue placeholder="Sujet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous sujets</SelectItem>
                {allTopics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {showYear && (
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-full" aria-label="Année">
                <SelectValue placeholder="Année" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes années</SelectItem>
                {allYears.map(year => (
                  <SelectItem key={year} value={year?.toString() || ''}>{year}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  );
};

export default ResourceFilters;
