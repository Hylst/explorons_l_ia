// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, ExternalLink, Brain } from 'lucide-react';
import { useNavigate } from 'react-router';

const FEATURES = [
  { color: 'bg-green-500', label: 'Entraînement réel dans le navigateur' },
  { color: 'bg-blue-500', label: 'Jeu de données synthétique' },
  { color: 'bg-purple-500', label: 'Aucune donnée envoyée' }
];

const SimulatorHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToResources = () => {
    navigate('/ressources?tab=outils');
  };

  return (
    <Card className="bg-linear-to-r from-primary/5 to-primary/10 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBackToResources} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour aux outils
            </Button>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="h-6 w-6 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Simulateur d'entraînement IA</h1>
                <p className="text-muted-foreground">
                  Entraînez un petit réseau de neurones et observez l'effet des hyperparamètres
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="flex items-center gap-2">
              <User className="h-3 w-3" aria-hidden="true" />
              Créé par Geoffroy Streit
            </Badge>
            <Button variant="outline" size="sm" onClick={handleBackToResources} className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Plus d'outils IA
            </Button>
          </div>
        </div>

        <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {FEATURES.map((feature) => (
            <li key={feature.label} className="flex items-center gap-2 bg-white/50 dark:bg-gray-900/50 p-3 rounded-lg">
              <span className={`w-2 h-2 rounded-full ${feature.color}`} aria-hidden="true" />
              <span>{feature.label}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SimulatorHeader;
