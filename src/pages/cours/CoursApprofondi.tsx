// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useReducedMotion } from 'framer-motion';
import { ArrowLeft, Check, ChevronLeft, ChevronRight, Copy, PenLine, Printer } from 'lucide-react';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import RelatedLinks from '@/components/courses/RelatedLinks';
import DeepMarkdown from '@/components/courses/deep/DeepMarkdown';
import DeepModuleView from '@/components/courses/deep/DeepModuleView';
import { AUTHOR_NAME } from '@/config/site';
import { asset } from '@/lib/paths';
import { DEEP_COURSES } from '@/content/cours-approfondis/registry';
import type { DeepCourse } from '@/content/cours-approfondis/types';

// Un fichier JSON par cours, chargé seulement à l'ouverture de sa page (un fichier JS par cours dans le build).
const loaders = import.meta.glob<{ default: DeepCourse }>('../../content/cours-approfondis/*.json');

/** Durée de lecture estimée à 160 mots par minute, code et SVG exclus. */
function readingMinutes(course: DeepCourse): number {
  const parts = [course.summary, course.introduction];
  for (const m of course.modules) {
    parts.push(m.theory, ...m.keyTakeaways, m.analogy?.text ?? '', m.example?.text ?? '');
    m.exercises?.forEach((exercise) => parts.push(exercise.title, exercise.prompt, exercise.solution));
    m.diagram?.steps.forEach((s) => parts.push(s.explanation));
    m.quiz.forEach((q) => parts.push(q.question, q.explanation));
  }
  const words = parts.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(5, Math.round(words / 160 / 5) * 5);
}

const formatMinutes = (minutes: number) =>
  minutes < 60 ? `environ ${minutes} min` : `environ ${Math.floor(minutes / 60)} h${minutes % 60 ? ` ${String(minutes % 60).padStart(2, '0')}` : ''}`;

const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const CoursApprofondi: React.FC<{ slug: string }> = ({ slug }) => {
  const entry = DEEP_COURSES.find((c) => c.slug === slug);
  const [course, setCourse] = useState<DeepCourse | null>(null);
  const [failed, setFailed] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const moduleTop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    const load = loaders[`../../content/cours-approfondis/${slug}.json`];
    if (!load) {
      setFailed(true);
      return;
    }
    load()
      .then((mod) => !cancelled && setCourse(mod.default))
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, [slug]);

  // Le module affiché suit l'ancre de l'adresse (#identifiant-du-module) : lien direct, retour arrière.
  const activeIndex = useMemo(() => {
    if (!course) return 0;
    const id = decodeURIComponent(location.hash.replace(/^#/, ''));
    const found = course.modules.findIndex((m) => m.id === id);
    return found >= 0 ? found : 0;
  }, [course, location.hash]);

  const goTo = (index: number) => {
    if (!course) return;
    navigate({ hash: `#${course.modules[index].id}` });
    moduleTop.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (!course) return;
    const id = 'cours-jsonld';
    document.getElementById(id)?.remove();
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: course.title,
      description: course.summary.replace(/[#*_`]/g, '').slice(0, 300),
      inLanguage: 'fr',
      isAccessibleForFree: true,
      educationalLevel: course.level,
      provider: { '@type': 'Organization', name: "Explorons l'IA" },
      about: course.tags,
      url: window.location.href.split('#')[0],
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [course]);

  const minutes = useMemo(() => (course ? readingMinutes(course) : 0), [course]);

  const copyModuleLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!entry) return null;

  return (
    <>
      <Hero title={entry.title} subtitle={course?.subtitle ?? entry.description} />

      <section className="section-container mb-12">
        <Link to="/cours-approfondis" className="mb-6 inline-flex items-center gap-2 text-sm text-primary underline underline-offset-2">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Tous les cours approfondis
        </Link>

        {failed && <p role="alert">Le contenu de ce cours n'a pas pu être chargé. Rechargez la page.</p>}
        {!course && !failed && <p className="text-muted-foreground">Chargement du cours…</p>}

        {course && (
          <>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="min-w-0 lg:col-span-2">
                {course.cover && (
                  <figure className="mb-6">
                    <img
                      src={asset(course.cover.src)}
                      alt={course.cover.alt}
                      width={1280}
                      height={720}
                      loading="eager"
                      decoding="async"
                      className="aspect-video w-full rounded-lg border object-cover"
                    />
                    <figcaption className="mt-2 text-sm text-muted-foreground">
                      {course.cover.caption ?? 'Illustration générée localement avec Qwen Image 2.1. Métaphore visuelle, sans valeur technique.'}
                    </figcaption>
                  </figure>
                )}
                <DeepMarkdown>{course.summary}</DeepMarkdown>
                <h2 className="mb-3 mt-6 text-2xl font-bold">Mise en contexte</h2>
                <DeepMarkdown>{course.introduction}</DeepMarkdown>
              </div>
              <Card className="h-fit">
                <CardContent className="space-y-4 p-5 text-sm">
                  <div>
                    <p className="font-medium text-muted-foreground">Niveau</p>
                    <p>{course.level}</p>
                  </div>
                  <div>
                    <p className="font-medium text-muted-foreground">Lecture</p>
                    <p>
                      {formatMinutes(minutes)}, en {course.modules.length} modules
                    </p>
                  </div>
                  {course.prerequisites.length > 0 && (
                    <div>
                      <p className="font-medium text-muted-foreground">Prérequis</p>
                      <ul className="list-disc space-y-1 pl-5">
                        {course.prerequisites.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {course.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="rounded-md border bg-muted/40 p-3">
                    <p className="mb-1 flex items-center gap-2 font-medium">
                      <PenLine className="h-4 w-4 text-primary" aria-hidden="true" />
                      Écriture
                    </p>
                    <p>
                      Cours écrit par {AUTHOR_NAME}, avec l'aide d'outils d'IA, puis relu et vérifié sur les sources citées
                      en fin de page (dernière vérification : {formatDate(course.checkedOn)}). Une erreur reste possible :
                      signalez-la, elle sera corrigée.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div ref={moduleTop} className="mt-10 scroll-mt-24 grid grid-cols-1 gap-8 lg:grid-cols-4">
              {/* Sous 1 024 px, une liste déroulante : la liste complète repousserait chaque module sous dix lignes. */}
              <div className="lg:hidden">
                <label htmlFor="choix-module" className="mb-1 block font-semibold">
                  Module
                </label>
                <select
                  id="choix-module"
                  value={activeIndex}
                  onChange={(e) => goTo(Number(e.target.value))}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  {course.modules.map((m, i) => (
                    <option key={m.id} value={i}>
                      {i + 1}. {m.title}
                    </option>
                  ))}
                </select>
              </div>
              <nav aria-label="Modules du cours" className="hidden lg:col-span-1 lg:block">
                <p className="mb-2 font-semibold">Modules</p>
                <ol className="space-y-1">
                  {course.modules.map((m, i) => (
                    <li key={m.id}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={i === activeIndex ? 'step' : undefined}
                        className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                          i === activeIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                        }`}
                      >
                        <span className="font-medium">{i + 1}.</span> {m.title}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="min-w-0 lg:col-span-3">
                <div className="mb-4 flex justify-end" data-print-hide>
                  <Button variant="outline" size="sm" onClick={copyModuleLink}>
                    {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                    {copied ? 'Lien copié' : 'Copier le lien du module'}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.print()} className="ml-2">
                    <Printer className="h-4 w-4" aria-hidden="true" />
                    Imprimer
                  </Button>
                </div>
                <p className="sr-only" aria-live="polite">{copied ? 'Lien du module copié.' : ''}</p>
                <DeepModuleView module={course.modules[activeIndex]} index={activeIndex} courseSlug={course.slug} />
                <div className="mt-8 flex flex-wrap justify-between gap-3 border-t pt-6">
                  <Button variant="outline" onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}>
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    Module précédent
                  </Button>
                  <Button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === course.modules.length - 1}>
                    Module suivant
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </div>

            {course.sources.length > 0 && (
              <section className="mt-12" aria-labelledby="sources-cours">
                <h2 id="sources-cours" className="mb-3 text-2xl font-bold">
                  Sources et lectures
                </h2>
                <ul className="list-disc space-y-1.5 pl-6">
                  {course.sources.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="mt-12 hidden print:block" aria-label="Fiche de révision">
              <h2 className="mb-3 text-2xl font-bold">Fiche de révision</h2>
              <p className="mb-4 text-sm">Points clés et vocabulaire des {course.modules.length} modules.</p>
              {course.modules.map((module, index) => (
                <div key={module.id} className="mb-6 break-inside-avoid">
                  <h3 className="mb-2 text-lg font-semibold">{index + 1}. {module.title}</h3>
                  <ul className="mb-2 list-disc space-y-1 pl-5 text-sm">
                    {module.keyTakeaways.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  {module.glossary.length > 0 && (
                    <dl className="grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                      {module.glossary.map((entry) => (
                        <div key={entry.term}>
                          <dt className="font-medium">{entry.term}</dt>
                          <dd>{entry.definition}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              ))}
            </section>

            {course.related.length > 0 && <RelatedLinks links={course.related} />}
          </>
        )}
      </section>
    </>
  );
};

export default CoursApprofondi;
