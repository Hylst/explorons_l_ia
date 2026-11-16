// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';

export interface CourseSource {
  label: string;
  href: string;
}

interface CourseSourcesProps {
  sources: CourseSource[];
  title?: string;
  note?: string;
}

const CourseSources: React.FC<CourseSourcesProps> = ({
  sources,
  title = 'Sources',
  note = 'Sources utilisées pour vérifier les faits et les chiffres de ce cours.',
}) => (
  <section className="mt-12 mb-8 max-w-4xl mx-auto">
    <SectionHeading title={title} />
    {note && <p className="text-sm text-muted-foreground mb-4">{note}</p>}
    <ul className="space-y-2 text-sm">
      {sources.map((source) => (
        <li key={source.href} className="flex items-start gap-2">
          <ExternalLink className="h-3 w-3 mt-1.5 text-primary shrink-0" aria-hidden="true" />
          <a
            href={source.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline break-words"
          >
            {source.label}
          </a>
        </li>
      ))}
    </ul>
  </section>
);

export default CourseSources;
