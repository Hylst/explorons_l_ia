// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookOpen, Search, BookMarked } from 'lucide-react';

import { aiTerms, type GlossaryCategory } from './glossaryData';

const TermsGlossary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | GlossaryCategory>('all');

  const filteredTerms = aiTerms.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedTerms = [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground transition-colors duration-200" />
          <Input
            placeholder="Rechercher un terme..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 transition-all duration-300 focus:shadow-lg hover:shadow-md border-2 hover:border-primary/50 focus:border-primary"
          />
        </div>
        <div role="group" aria-label="Filtres par catégorie" className="flex flex-wrap py-1 gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === 'all' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setActiveCategory('general')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === 'general' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md'
            }`}
          >
            Généraux
          </button>
          <button
            onClick={() => setActiveCategory('technical')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === 'technical' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md'
            }`}
          >
            Techniques
          </button>
          <button
            onClick={() => setActiveCategory('ethical')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === 'ethical' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md'
            }`}
          >
            Éthiques
          </button>
          <button
            onClick={() => setActiveCategory('memory')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === 'memory' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md'
            }`}
          >
            Mémoire
          </button>
          <button
            onClick={() => setActiveCategory('advanced')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${
              activeCategory === 'advanced' 
                ? 'bg-primary text-primary-foreground shadow-lg' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md'
            }`}
          >
            Avancés
          </button>
        </div>
      </div>

      <div className="mb-4 p-4 bg-linear-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800 transform hover:scale-[1.01] transition-all duration-300 hover:shadow-lg">
        <div className="flex items-start gap-3">
          <BookMarked className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 dark:text-yellow-400">Contenu du glossaire</h3>
            <p className="text-sm text-yellow-700 dark:text-yellow-300/80">
              Ce glossaire compte {aiTerms.length} termes liés à l'IA, 
              répartis en 5 catégories : généraux, techniques, éthiques, mémoire et avancés.
            </p>
          </div>
        </div>
      </div>

      {sortedTerms.length === 0 ? (
        <div className="text-center py-10">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium">Aucun terme trouvé</h3>
          <p className="text-muted-foreground">Essayez une autre recherche ou catégorie</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sortedTerms.map((item) => (
            <Card 
              key={item.term} 
              className="overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-primary/50 cursor-pointer"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between items-start group-hover:text-primary transition-colors duration-200">
                  <span className="group-hover:scale-105 transition-transform duration-200">{item.term}</span>
                  <span className={`text-xs px-3 py-1 rounded-full transition-all duration-300 group-hover:scale-110 ${
                    item.category === 'general' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50' 
                      : item.category === 'technical' 
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/50' 
                        : item.category === 'ethical'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 group-hover:bg-green-200 dark:group-hover:bg-green-900/50'
                          : item.category === 'memory'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 group-hover:bg-amber-200 dark:group-hover:bg-amber-900/50'
                            : 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 group-hover:bg-pink-200 dark:group-hover:bg-pink-900/50'
                  }`}>
                    {item.category === 'general' 
                      ? 'Général' 
                      : item.category === 'technical' 
                        ? 'Technique' 
                        : item.category === 'ethical'
                          ? 'Éthique'
                          : item.category === 'memory'
                            ? 'Mémoire'
                            : 'Avancé'}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">{item.definition}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TermsGlossary;
