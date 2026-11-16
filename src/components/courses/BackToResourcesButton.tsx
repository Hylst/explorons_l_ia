// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

const BackToResourcesButton: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/ressources?tab=cours', { replace: true });
  };

  return (
    <div className="mb-6">
      <Button 
        variant="outline" 
        onClick={handleBack}
        className="flex items-center gap-2 hover:bg-primary/5"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour aux cours
      </Button>
    </div>
  );
};

export default BackToResourcesButton;
