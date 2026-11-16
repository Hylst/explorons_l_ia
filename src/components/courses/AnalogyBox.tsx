// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Lightbulb, Info } from 'lucide-react';

interface AnalogyBoxProps {
  title: string;
  description?: string;
  content?: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'info' | 'tip';
}

const AnalogyBox: React.FC<AnalogyBoxProps> = ({ 
  title, 
  description,
  content,
  icon,
  variant = 'default'
}) => {
  const variantStyles = {
    default: {
      bg: "bg-blue-50 border-l-4 border-blue-400 dark:bg-blue-950/30 dark:border-blue-500",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-800 dark:text-blue-200",
      contentColor: "text-blue-700 dark:text-blue-300"
    },
    info: {
      bg: "bg-amber-50 border-l-4 border-amber-400 dark:bg-amber-950/30 dark:border-amber-500", 
      iconColor: "text-amber-600 dark:text-amber-400",
      titleColor: "text-amber-800 dark:text-amber-200",
      contentColor: "text-amber-700 dark:text-amber-300"
    },
    tip: {
      bg: "bg-green-50 border-l-4 border-green-400 dark:bg-green-950/30 dark:border-green-500",
      iconColor: "text-green-600 dark:text-green-400", 
      titleColor: "text-green-800 dark:text-green-200",
      contentColor: "text-green-700 dark:text-green-300"
    }
  };

  const styles = variantStyles[variant];
  const defaultIcon = variant === 'info' ? <Info className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />;
  const displayContent = content || description;

  return (
    <div className={`${styles.bg} p-4 rounded-r-lg`}>
      <div className="flex items-start">
        <div className={`${styles.iconColor} mt-1 mr-3 shrink-0`}>
          {icon || defaultIcon}
        </div>
        <div>
          <h4 className={`font-medium ${styles.titleColor} mb-1`}>{title}</h4>
          <p className={`${styles.contentColor} text-sm`}>{displayContent}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalogyBox;
