// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ExpandableSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  icon?: React.ReactNode;
}

const ExpandableSection: React.FC<ExpandableSectionProps> = ({
  title,
  children,
  defaultExpanded = false,
  icon
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <Card className="mb-4">
      <CardHeader className="p-4 pb-3 sm:p-6 sm:pb-3">
        <Button
          variant="ghost"
          className="w-full justify-between gap-2 p-0 h-auto whitespace-normal"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CardTitle className="flex items-center gap-2 text-left min-w-0">
            {icon}
            {title}
          </CardTitle>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0" />
          )}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent className="px-4 pb-4 pt-0 sm:px-6 sm:pb-6 animate-fade-in">
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default ExpandableSection;
