// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { ChevronRight, Search, X } from 'lucide-react';
import Hero from '@/components/Hero';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DEEP_COURSES, deepCoursePath } from '@/content/cours-approfondis/registry';

const LEVEL_ORDER = { Débutant: 0, Intermédiaire: 1, Avancé: 2 } as const;
const LEVELS = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'] as const;

const PATHS = [
  {
    title: 'Fondamentaux',
    description: 'Comprendre les données, les modèles et l’entraînement avant d’aller vers les LLM.',
    courses: [
      ['/cours/python-ia', 'Python pour l’IA'],
      ['/cours/bases-mathematiques-ia', 'Bases mathématiques'],
      ['/cours/apprentissage-supervise', 'Apprentissage supervisé'],
      ['/cours/reseau-de-neurones', 'Réseau de neurones'],
      ['/cours/cnn-architectures-vision', 'CNN et vision'],
    ],
  },
  {
    title: 'LLM et agents',
    description: 'Du token au système qui lit des documents et appelle des outils.',
    courses: [
      ['/cours/generation-mot-par-mot', 'Génération mot par mot'],
      ['/cours/rag', 'RAG'],
      ['/cours/fine-tuning', 'Fine-tuning'],
      ['/cours/mcp', 'MCP'],
      ['/cours/boucles-agentiques', 'Boucles agentiques'],
    ],
  },
  {
    title: 'Déploiement',
    description: 'Coûts, matériel, modèles ouverts et passage à l’échelle.',
    courses: [
      ['/cours/cout-des-tokens', 'Coût des tokens'],
      ['/cours/gpu-cpu', 'GPU et CPU'],
      ['/cours/ia-locale', 'IA locale'],
      ['/cours/open-weights', 'Open weights'],
      ['/cours/solutions-ia-b2b', 'Solutions B2B'],
    ],
  },
] as const;

/** Liste des cours approfondis, du plus accessible au plus technique. */
const CoursApprofondis: React.FC = () => {
  const courses = useMemo(
    () => [...DEEP_COURSES].sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.title.localeCompare(b.title, 'fr')),
    [],
  );
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('Tous');

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('fr');
    return courses.filter((course) => {
      if (level !== 'Tous' && course.level !== level) return false;
      if (!q) return true;
      const haystack = [course.title, course.description, ...course.tags].join(' ').toLocaleLowerCase('fr');
      return haystack.includes(q);
    });
  }, [courses, level, query]);

  return (
    <>
      <Hero
        title="Cours approfondis"
        subtitle="Des sujets précis de l'IA, expliqués sans se presser : contexte, analogies, schémas pas à pas, code et questions."
      />
      <section className="section-container mb-12">
        <div className="mb-8 max-w-3xl space-y-4">
          <p>
            Des cours longs, gratuits comme tout le site, sur des sujets précis de l'IA : comment un modèle choisit
            le mot suivant, ce que change le RAG, pourquoi l'IA tourne sur des GPU, comment on attaque un modèle... Ils
            sont écrits avec l'aide d'outils d'IA, puis relus et vérifiés sur les articles et documentations cités en fin
            de chaque cours. Les démonstrations de code ont été exécutées ; les schémas sont des illustrations.
          </p>
          <p className="text-muted-foreground">
            Ils vont plus loin que les pages de découverte du site : prévoyez du temps, et revenez aux{' '}
            <Link to="/les-bases" className="text-primary underline underline-offset-2">
              bases
            </Link>{' '}
            ou au{' '}
            <Link to="/glossaire" className="text-primary underline underline-offset-2">
              glossaire
            </Link>{' '}
            si un terme bloque.
          </p>
        </div>

        <section aria-labelledby="parcours" className="mb-10">
          <h2 id="parcours" className="mb-4 text-2xl font-bold">Parcours recommandés</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {PATHS.map((path) => (
              <Card key={path.title} className="h-full">
                <CardContent className="p-5">
                  <h3 className="mb-2 font-semibold">{path.title}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{path.description}</p>
                  <ol className="space-y-2 text-sm">
                    {path.courses.map(([to, label], index) => (
                      <li key={to} className="flex items-start gap-2">
                        <span className="font-mono text-xs text-primary">{index + 1}.</span>
                        <Link to={to} className="hover:underline">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <label htmlFor="recherche-cours" className="mb-1 block font-semibold">
              Rechercher un cours
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <input
                id="recherche-cours"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Titre, description ou tag"
                className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-9 text-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Effacer la recherche"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-2" aria-label="Filtrer par niveau">
            {LEVELS.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLevel(item)}
                aria-pressed={level === item}
                className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                  level === item ? 'border-primary bg-primary text-primary-foreground' : 'border-input hover:bg-muted'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <p className="mb-3 text-sm text-muted-foreground" aria-live="polite">
          {filtered.length} cours {filtered.length === 1 ? 'correspond' : 'correspondent'} à la recherche.
        </p>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground">Aucun cours ne correspond. Effacez la recherche ou changez de niveau.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((course) => (
              <li key={course.slug}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-5">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{course.level}</Badge>
                    </div>
                    <h2 className="mb-2 text-lg font-semibold">
                      <Link to={deepCoursePath(course.slug)} className="hover:underline">
                        {course.title}
                      </Link>
                    </h2>
                    <p className="mb-4 flex-1 text-sm text-muted-foreground">{course.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {course.tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Link to={deepCoursePath(course.slug)} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary" aria-hidden="true" tabIndex={-1}>
                      Ouvrir le cours
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
};

export default CoursApprofondis;
