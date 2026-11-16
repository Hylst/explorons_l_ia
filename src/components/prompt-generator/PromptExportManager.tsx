// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Download, Upload, Save, FileText, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { PromptTemplate } from './promptTemplatesData';
import { dataSource, DataError, type SavedPrompt } from '@/lib/data';
import { downloadFile, readTextFile, toCsv, todayStamp } from '@/lib/files';

interface PromptExportManagerProps {
  currentPrompt?: string;
  currentTemplate?: PromptTemplate;
  currentVariables?: Record<string, string>;
}

type ExportFormat = 'json' | 'txt' | 'csv';

const formatDate = (iso: string) => {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString('fr-FR');
};

const showError = (error: unknown) =>
  toast.error(error instanceof DataError ? error.message : "L'opération n'a pas abouti.");

const PromptExportManager: React.FC<PromptExportManagerProps> = ({
  currentPrompt,
  currentTemplate,
  currentVariables
}) => {
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json');
  const [promptName, setPromptName] = useState('');
  const [promptTags, setPromptTags] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => {
    dataSource.savedPrompts.list().then(setSavedPrompts, showError);
  }, []);

  useEffect(refresh, [refresh]);

  const savePrompt = async () => {
    if (!currentPrompt || !currentTemplate) {
      toast.error('Aucun prompt à enregistrer');
      return;
    }
    if (!promptName.trim()) {
      toast.error('Donnez un nom au prompt');
      return;
    }
    try {
      await dataSource.savedPrompts.add({
        id: `${Date.now()}`,
        name: promptName.trim(),
        content: currentPrompt,
        templateId: currentTemplate.id,
        templateName: currentTemplate.name,
        category: currentTemplate.category,
        tags: promptTags.split(',').map((tag) => tag.trim()).filter((tag) => tag.length > 0),
        createdAt: new Date().toISOString(),
        variables: currentVariables || {},
      });
      setPromptName('');
      setPromptTags('');
      setIsSaveDialogOpen(false);
      refresh();
      toast.success('Prompt enregistré dans ce navigateur');
    } catch (error) {
      showError(error);
    }
  };

  const exportPrompts = () => {
    if (savedPrompts.length === 0) {
      toast.error('Aucun prompt enregistré à exporter');
      return;
    }
    const stamp = todayStamp();
    if (exportFormat === 'json') {
      downloadFile(JSON.stringify(savedPrompts, null, 2), `prompts-${stamp}.json`, 'application/json');
    } else if (exportFormat === 'txt') {
      const text = savedPrompts
        .map((prompt) =>
          [`=== ${prompt.name} ===`, `Modèle : ${prompt.templateName}`, `Date : ${formatDate(prompt.createdAt)}`,
            `Mots-clés : ${prompt.tags.join(', ')}`, '', prompt.content, '', '='.repeat(50), ''].join('\n'))
        .join('\n');
      downloadFile(text, `prompts-${stamp}.txt`, 'text/plain;charset=utf-8');
    } else {
      const csv = toCsv(
        ['Nom', 'Modèle', 'Date', 'Mots-clés', 'Contenu'],
        savedPrompts.map((prompt) => [prompt.name, prompt.templateName, formatDate(prompt.createdAt), prompt.tags.join('; '), prompt.content])
      );
      downloadFile(csv, `prompts-${stamp}.csv`, 'text/csv;charset=utf-8');
    }
    toast.success(`Prompts exportés en ${exportFormat.toUpperCase()}`);
    setIsExportDialogOpen(false);
  };

  /** Import d'un export JSON de cet outil : chaque prompt est validé, les invalides sont ignorés. */
  const importPrompts = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const parsed: unknown = JSON.parse(await readTextFile(file));
      if (!Array.isArray(parsed)) throw new DataError("Le fichier doit contenir une liste de prompts exportée par cet outil.");
      const valid = parsed.map((item) => dataSource.savedPrompts.parse(item)).filter((item) => item !== null);
      for (const prompt of valid.reverse()) await dataSource.savedPrompts.add(prompt);
      refresh();
      const ignored = parsed.length - valid.length;
      toast.success(`${valid.length} prompt(s) importé(s)${ignored ? `, ${ignored} ignoré(s) car invalide(s)` : ''}`);
    } catch (error) {
      showError(error instanceof SyntaxError ? new DataError("Ce fichier n'est pas un JSON lisible.") : error);
    }
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Prompt copié dans le presse-papiers');
    } catch {
      toast.error('La copie a été refusée par le navigateur\u00A0: sélectionnez le texte à la main.');
    }
  };

  const deletePrompt = async (id: string) => {
    try {
      await dataSource.savedPrompts.remove(id);
      refresh();
      toast.success('Prompt supprimé');
    } catch (error) {
      showError(error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" aria-hidden="true" />
            Prompts enregistrés
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogTrigger asChild>
                <Button disabled={!currentPrompt} className="flex items-center gap-2">
                  <Save className="h-4 w-4" aria-hidden="true" />
                  Enregistrer le prompt actuel
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Enregistrer le prompt</DialogTitle>
                  <DialogDescription>Il restera dans ce navigateur, sur cet appareil.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prompt-name">Nom du prompt</Label>
                    <Input
                      id="prompt-name"
                      placeholder="Résumé de réunion..."
                      value={promptName}
                      maxLength={120}
                      onChange={(e) => setPromptName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="prompt-tags">Mots-clés (séparés par des virgules)</Label>
                    <Input
                      id="prompt-tags"
                      placeholder="travail, synthèse..."
                      value={promptTags}
                      onChange={(e) => setPromptTags(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="prompt-preview">Aperçu du prompt</Label>
                    <Textarea id="prompt-preview" value={currentPrompt || ''} readOnly className="h-32" />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsSaveDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={savePrompt}>Enregistrer</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={savedPrompts.length === 0}>
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Exporter ({savedPrompts.length})
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Exporter les prompts enregistrés</DialogTitle>
                  <DialogDescription>Le fichier est créé dans votre navigateur, rien n'est envoyé.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div role="radiogroup" aria-label="Format d'export" className="flex gap-2">
                    {([
                      { value: 'json', label: 'JSON', desc: 'complet, réimportable' },
                      { value: 'txt', label: 'TXT', desc: 'texte lisible' },
                      { value: 'csv', label: 'CSV', desc: 'tableur' },
                    ] as const).map((format) => (
                      <Button
                        key={format.value}
                        role="radio"
                        aria-checked={exportFormat === format.value}
                        variant={exportFormat === format.value ? 'default' : 'outline'}
                        onClick={() => setExportFormat(format.value)}
                        className="flex-1 flex-col h-auto py-2"
                      >
                        <span>{format.label}</span>
                        <span className="text-xs font-normal opacity-80">{format.desc}</span>
                      </Button>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={exportPrompts}>
                      <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                      Exporter
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => fileInput.current?.click()}>
              <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
              Importer un export JSON
            </Button>
            <input
              ref={fileInput}
              type="file"
              accept=".json,application/json"
              onChange={importPrompts}
              className="hidden"
              tabIndex={-1}
              aria-hidden="true"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Les prompts enregistrés restent dans ce navigateur. Pour les sauvegarder ou les transférer, utilisez
            l'export JSON ou la page « Vos données locales ».
          </p>
        </CardContent>
      </Card>

      {savedPrompts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" aria-hidden="true" />
              Prompts enregistrés dans ce navigateur ({savedPrompts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {savedPrompts.map((prompt) => (
                <li key={prompt.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium break-words">{prompt.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Modèle : {prompt.templateName}
                        {formatDate(prompt.createdAt) && ` • ${formatDate(prompt.createdAt)}`}
                      </p>
                      {prompt.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {prompt.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(prompt.content)}
                        aria-label={`Copier le prompt «\u00A0${prompt.name}\u00A0»`}
                      >
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-destructive hover:text-destructive"
                        onClick={() => deletePrompt(prompt.id)}
                        aria-label={`Supprimer le prompt «\u00A0${prompt.name}\u00A0»`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-muted p-3 rounded text-sm">
                    <p className="line-clamp-3 whitespace-pre-wrap break-words">{prompt.content}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PromptExportManager;
