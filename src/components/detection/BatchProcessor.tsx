// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useDropzone } from 'react-dropzone';
import { DetectionResult, aiDetectionService } from '@/services/aiDetectionService';
import { useToast } from '@/hooks/use-toast';
import { SUPPORTED_FORMATS_LABEL, detectFileKind, readTextFile } from '@/services/detection/fileKinds';
import { 
  Upload, 
  Zap, 
  FileText, 
  Image, 
  Music, 
  X,
  Play,
  Pause,
  Download
} from 'lucide-react';

interface BatchProcessorProps {
  onAnalysisComplete: (result: DetectionResult) => void;
  selectedPreset?: string;
}

export const BatchProcessor: React.FC<BatchProcessorProps> = ({
  onAnalysisComplete,
  selectedPreset
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [results, setResults] = useState<DetectionResult[]>([]);
  const { toast } = useToast();
  // La boucle asynchrone lit ces valeurs à chaque tour : un état React y serait figé à sa valeur de départ.
  const pausedRef = useRef(false);
  const nextIndexRef = useRef(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/*': ['.txt', '.md', '.html'],
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
      'audio/*': ['.mp3', '.wav', '.ogg', '.m4a']
    },
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    const kind = detectFileKind(file);
    if (kind === 'image') return <Image className="h-4 w-4" />;
    if (kind === 'audio') return <Music className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const kindLabels = { text: 'Texte', image: 'Image', audio: 'Audio' } as const;

  const startBatchProcessing = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setIsPaused(false);
    pausedRef.current = false;
    if (nextIndexRef.current >= files.length) {
      nextIndexRef.current = 0;
      setResults([]);
    }
    const newResults: DetectionResult[] = [];

    try {
      for (let i = nextIndexRef.current; i < files.length; i++) {
        if (pausedRef.current) break;

        setCurrentFileIndex(i);
        const file = files[i];

        let result: DetectionResult | null = null;
        const kind = detectFileKind(file);
        if (kind === 'text') {
          const text = await readTextFile(file);
          result = await aiDetectionService.detectText(text, selectedPreset);
          result.fileName = file.name;
        } else if (kind === 'image') {
          result = await aiDetectionService.detectImage(file, selectedPreset);
        } else if (kind === 'audio') {
          result = await aiDetectionService.detectAudio(file, selectedPreset);
        }

        if (result) {
          newResults.push(result);
          setResults(prev => [...prev, result]);
          onAnalysisComplete(result);
        }
        nextIndexRef.current = i + 1;
        setProgress(((i + 1) / files.length) * 100);

        // Rend la main au navigateur entre deux fichiers, pour que l'affichage suive.
        await new Promise(resolve => setTimeout(resolve, 0));
      }

      if (!pausedRef.current) {
        setCurrentFileIndex(files.length);
        toast({
          title: "Traitement par lots terminé",
          description: `${newResults.length} fichier(s) analysé(s).`,
        });
      }
    } catch (error) {
      console.error('Erreur lors du traitement par lots:', error);
      toast({
        title: "Erreur de traitement",
        description: "Une erreur est survenue pendant le traitement.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const pauseProcessing = () => {
    pausedRef.current = true;
    setIsPaused(true);
    setIsProcessing(false);
  };

  const resumeProcessing = () => {
    setIsPaused(false);
    startBatchProcessing();
  };

  const resetBatch = () => {
    setFiles([]);
    setResults([]);
    nextIndexRef.current = 0;
    pausedRef.current = false;
    setProgress(0);
    setCurrentFileIndex(0);
    setIsProcessing(false);
    setIsPaused(false);
  };

  const exportBatchResults = () => {
    if (results.length === 0) return;

    const data = aiDetectionService.exportResults(results, 'json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `batch-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Export terminé",
      description: "Les résultats du traitement par lots ont été exportés.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Traitement par lots
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isProcessing && !isPaused && (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
              }`}
            >
              <input {...getInputProps({ 'aria-label': 'Choisir des fichiers à analyser par lot' })} />
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">
                {isDragActive ? 'Déposez vos fichiers ici' : 'Ajoutez des fichiers en lot'}
              </p>
              <p className="text-sm text-muted-foreground">
                Glissez-déposez ou cliquez pour sélectionner plusieurs fichiers
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Formats pris en charge : {SUPPORTED_FORMATS_LABEL}
              </p>
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Fichiers sélectionnés ({files.length})</h3>
                <div className="flex gap-2">
                  {!isProcessing && !isPaused && (
                    <Button onClick={startBatchProcessing} className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Démarrer l'analyse
                    </Button>
                  )}
                  {isProcessing && (
                    <Button onClick={pauseProcessing} variant="outline" className="flex items-center gap-2">
                      <Pause className="h-4 w-4" />
                      Pause
                    </Button>
                  )}
                  {isPaused && (
                    <Button onClick={resumeProcessing} className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      Reprendre
                    </Button>
                  )}
                  <Button onClick={resetBatch} variant="outline">
                    Réinitialiser
                  </Button>
                </div>
              </div>

              {(isProcessing || isPaused) && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Progression</span>
                    <span className="text-sm text-muted-foreground">
                      {Math.round(progress)} %
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" aria-label="Progression du traitement par lot" />
                  <p className="text-sm text-muted-foreground">
                    Fichier {currentFileIndex + 1} sur {files.length}
                  </p>
                </div>
              )}

              <div className="grid gap-2 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      index < currentFileIndex ? 'bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-800' :
                      index === currentFileIndex && isProcessing ? 'bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800' :
                      'bg-background'
                    }`}
                  >
                    {getFileIcon(file)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1).replace('.', ',')} Ko
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {kindLabels[detectFileKind(file) ?? 'text']}
                    </Badge>
                    {index < currentFileIndex && (
                      <Badge className="text-xs bg-green-700 hover:bg-green-700">Terminé</Badge>
                    )}
                    {index === currentFileIndex && isProcessing && (
                      <Badge className="text-xs bg-blue-600 hover:bg-blue-600">En cours</Badge>
                    )}
                    {!isProcessing && !isPaused && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFile(index)}
                        aria-label={`Retirer ${file.name}`}
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {results.length > 0 && (
                <div className="flex items-center justify-between pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    {results.length} résultats d'analyse disponibles
                  </p>
                  <Button
                    onClick={exportBatchResults}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Exporter les résultats
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
