// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/SectionHeading';

interface LegalSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/** Bloc commun des pages légales (mentions, confidentialité, CGU). */
const LegalSection = ({ title, description, children }: LegalSectionProps) => (
  <Card className="mb-8">
    <CardContent className="pt-6">
      <SectionHeading title={title} description={description} />
      <div className="space-y-4 mt-4">{children}</div>
    </CardContent>
  </Card>
);

export default LegalSection;
