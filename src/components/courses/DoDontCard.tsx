// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DoDontCardProps {
  title: string;
  icon?: React.ReactNode;
  dos: string[];
  donts: string[];
  doTitle?: string;
  dontTitle?: string;
}

/**
 * Deux colonnes "à faire" / "à éviter". Remplace les listes titrées avec des emojis :
 * le sens est porté par le texte et l'icône, pas par un caractère décoratif.
 */
const DoDontCard: React.FC<DoDontCardProps> = ({
  title,
  icon,
  dos,
  donts,
  doTitle = 'À faire',
  dontTitle = 'À éviter',
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3 text-green-700 dark:text-green-400">{doTitle}</h4>
          <ul className="space-y-2 text-sm">
            {dos.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3 text-red-700 dark:text-red-400">{dontTitle}</h4>
          <ul className="space-y-2 text-sm">
            {donts.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default DoDontCard;
