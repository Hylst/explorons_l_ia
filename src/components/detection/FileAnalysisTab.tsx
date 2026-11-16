// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileUploader } from './FileUploader';
import { ResultsGrid } from './ResultsGrid';
import { VisualComparison } from './VisualComparison';
import { DetectionResult } from '@/services/aiDetectionService';
import { getPresetById } from '@/services/detection/detectionPresets';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  BarChart3, 
  Eye, 
  Zap,
  FileText
} from 'lucide-react';

interface FileAnalysisTabProps {
  selectedPreset?: string;
  onPresetDeselect: () => void;
  results: DetectionResult[];
  isAnalyzing: boolean;
  onFilesSelected: (files: File[]) => void;
  onViewDetails: (result: DetectionResult) => void;
  onViewDetailedAnalysis: (result: DetectionResult) => void;
  onExportResult: (result: DetectionResult) => void;
}

export const FileAnalysisTab: React.FC<FileAnalysisTabProps> = ({
  selectedPreset,
  onPresetDeselect,
  results,
  isAnalyzing,
  onFilesSelected,
  onViewDetails,
  onViewDetailedAnalysis,
  onExportResult
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisView, setAnalysisView] = useState<'upload' | 'visual'>('upload');

  const handleFileSelection = (files: File[]) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
      // Les images ouvrent directement la vue visuelle
      if (files[0].type.startsWith('image/')) {
        setAnalysisView('visual');
      }
    }
    onFilesSelected(files);
  };

  return (
    <div className="space-y-6">
      {selectedPreset && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/30 dark:border-blue-800">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Préréglage actif</Badge>
                <span className="font-medium">{getPresetById(selectedPreset)?.name ?? selectedPreset}</span>
              </div>
              <Button variant="outline" size="sm" onClick={onPresetDeselect}>
                Désactiver
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={analysisView} onValueChange={(value) => setAnalysisView(value as typeof analysisView)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Téléversement
          </TabsTrigger>
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Analyse visuelle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Analyse de fichiers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUploader 
                onFilesSelected={handleFileSelection}
                acceptedTypes={['text/*', 'image/*', 'audio/*']}
                maxFiles={5}
              />
            </CardContent>
          </Card>

          {results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Résultats d'analyse ({results.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResultsGrid
                  results={results}
                  isAnalyzing={isAnalyzing}
                  onViewDetails={onViewDetails}
                  onViewDetailedAnalysis={onViewDetailedAnalysis}
                  onExportResult={onExportResult}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="visual" className="space-y-6">
          {selectedFile && selectedFile.type.startsWith('image/') ? (
            <VisualComparison file={selectedFile} />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center text-muted-foreground">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>
                    {selectedFile 
                      ? "L'analyse visuelle n'est disponible que pour les images"
                      : "Sélectionnez une image dans l'onglet Téléversement pour l'analyse visuelle"
                    }
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
