// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Download, Save, History } from 'lucide-react';
import { toast } from 'sonner';
import { dataSource, DataError, type CostEstimate } from '@/lib/data';
import { downloadFile, toCsv, todayStamp } from '@/lib/files';

interface CostSaverProps {
  currentCalculation: {
    provider: string;
    model: string;
    inputTokens: number;
    outputTokens: number;
    totalCost: number;
    usageType: string;
  } | null;
}

const formatUsd = (value: number) =>
  `${value.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}\u00A0$`;

const showError = (error: unknown) =>
  toast.error(error instanceof DataError ? error.message : "L'opération n'a pas abouti.");

const CostSaver: React.FC<CostSaverProps> = ({ currentCalculation }) => {
  const [savedCalculations, setSavedCalculations] = useState<CostEstimate[]>([]);
  const [saveName, setSaveName] = useState('');

  const refresh = useCallback(() => {
    dataSource.costEstimates.list().then(setSavedCalculations, showError);
  }, []);

  useEffect(refresh, [refresh]);

  const saveCalculation = async () => {
    if (!currentCalculation || !saveName.trim()) {
      toast.error("Donnez un nom à cette estimation pour l'enregistrer");
      return;
    }
    try {
      await dataSource.costEstimates.add({
        id: `${Date.now()}`,
        name: saveName.trim(),
        date: new Date().toLocaleDateString('fr-FR'),
        ...currentCalculation,
      });
      setSaveName('');
      refresh();
      toast.success('Estimation enregistrée dans ce navigateur');
    } catch (error) {
      showError(error);
    }
  };

  const deleteCalculation = async (id: string) => {
    try {
      await dataSource.costEstimates.remove(id);
      refresh();
      toast.success('Estimation supprimée');
    } catch (error) {
      showError(error);
    }
  };

  const exportToCSV = () => {
    if (savedCalculations.length === 0) {
      toast.error('Aucune estimation à exporter');
      return;
    }
    const csv = toCsv(
      ['Nom', 'Date', 'Fournisseur', 'Modèle', 'Tokens en entrée', 'Tokens en sortie', 'Coût par requête (USD)', "Type d'usage"],
      savedCalculations.map((calc) => [
        calc.name,
        calc.date,
        calc.provider,
        calc.model,
        calc.inputTokens,
        calc.outputTokens,
        calc.totalCost,
        calc.usageType,
      ])
    );
    downloadFile(csv, `estimations-couts-ia-${todayStamp()}.csv`, 'text/csv;charset=utf-8');
    toast.success('Export CSV téléchargé');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" aria-hidden="true" />
          Estimations enregistrées
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentCalculation && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Label htmlFor="save-name">Nom de l'estimation</Label>
                <Input
                  id="save-name"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && saveCalculation()}
                  placeholder="Calcul projet X..."
                  maxLength={120}
                />
              </div>
              <Button onClick={saveCalculation} className="sm:mt-6">
                <Save className="h-4 w-4 mr-2" aria-hidden="true" />
                Enregistrer dans ce navigateur
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="font-medium min-w-0 break-words">
            Estimations enregistrées dans ce navigateur ({savedCalculations.length})
          </h4>
          {savedCalculations.length > 0 && (
            <Button variant="outline" size="sm" onClick={exportToCSV} className="shrink-0">
              <Download className="h-4 w-4 mr-2" aria-hidden="true" />
              Exporter CSV
            </Button>
          )}
        </div>

        <div tabIndex={0} role="region" aria-label="Estimations enregistrées" className="space-y-2 max-h-64 overflow-y-auto">
          {savedCalculations.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              Aucune estimation enregistrée
            </p>
          ) : (
            savedCalculations.map((calc) => (
              <div key={calc.id} className="flex items-center justify-between gap-2 p-3 border rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="font-medium break-words">{calc.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {calc.provider} {calc.model} : {formatUsd(calc.totalCost)} par requête ({calc.date})
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteCalculation(calc.id)}
                  className="text-destructive hover:text-destructive"
                  aria-label={`Supprimer l'estimation «\u00A0${calc.name}\u00A0»`}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            ))
          )}
        </div>
        <p className="text-xs text-muted-foreground">
          Ces estimations restent sur cet appareil. Pour les sauvegarder ou les transférer, utilisez la page « Vos
          données locales ».
        </p>
      </CardContent>
    </Card>
  );
};

export default CostSaver;
