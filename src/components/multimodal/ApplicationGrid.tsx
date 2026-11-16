// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { AppExample } from './ApplicationsData';
import AppCard from './AppCard';

interface ApplicationGridProps {
  applications: AppExample[];
  onExampleClick: (id: string, title: string) => void;
}

const ApplicationGrid: React.FC<ApplicationGridProps> = ({ applications, onExampleClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {applications.map((app, index) => (
        <AppCard key={index} app={app} onExampleClick={onExampleClick} />
      ))}
    </div>
  );
};

export default ApplicationGrid;
