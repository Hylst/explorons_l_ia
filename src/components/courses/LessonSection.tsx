// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeading from '@/components/SectionHeading';
import { motion } from 'framer-motion';

interface LessonSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

const LessonSection: React.FC<LessonSectionProps> = ({ 
  title, 
  icon, 
  children,
  delay = 0
}) => {
  return (
    <motion.div 
      className="mb-10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <SectionHeading 
        title={title} 
        pretitle="Leçon"
      />
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="flex gap-3 sm:gap-4 items-start">
            {/* Icône décorative : masquée sur téléphone pour laisser toute la largeur au texte. */}
            <div className="text-primary shrink-0 mt-1 hidden sm:block" aria-hidden="true">
              {icon}
            </div>
            <div className="space-y-4 min-w-0 flex-1">
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LessonSection;
