// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Hero from '@/components/Hero';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Trash2, Shield, Mail, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { CONTACT_EMAIL, SITE_NAME } from '@/config/site';
import { DataError, STORAGE_KEYS } from '@/lib/data';
import { createBackup, restoreBackup } from '@/lib/data/backup';
import { downloadFile, readTextFile, todayStamp } from '@/lib/files';

/**
 * Données que le site peut écrire dans le navigateur (localStorage).
 * Toute nouvelle clé doit être ajoutée ici pour rester exportable et effaçable.
 */
export const LOCAL_STORAGE_KEYS: { key: string; purpose: string }[] = [
  { key: 'theme', purpose: "Thème d'affichage choisi (clair, sombre ou système)" },
  { key: STORAGE_KEYS.costEstimates, purpose: 'Estimations enregistrées dans le calculateur de coûts' },
  { key: STORAGE_KEYS.detectionHistory, purpose: 'Historique des analyses du détecteur de contenu' },
  { key: STORAGE_KEYS.savedPrompts, purpose: 'Prompts enregistrés dans le générateur de prompts' },
  { key: STORAGE_KEYS.testGrids, purpose: 'Grille de test du comparateur de modèles' },
];

const readStoredData = () =>
  Object.fromEntries(
    LOCAL_STORAGE_KEYS.map(({ key }) => {
      try {
        return [key, localStorage.getItem(key)];
      } catch {
        return [key, null];
      }
    })
  );

/** Nombre d'éléments d'une liste enregistrée, ou null si la valeur n'est pas une liste. */
const countItems = (raw: string | null | undefined) => {
  if (!raw) return null;
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.length : null;
  } catch {
    return null;
  }
};

const GestionDonneesRGPD = () => {
  const [stored, setStored] = useState<Record<string, string | null>>({});
  const fileInput = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => setStored(readStoredData()), []);
  useEffect(refresh, [refresh]);

  const handleExport = async () => {
    const backup = await createBackup();
    let theme: string | null = null;
    try {
      theme = localStorage.getItem('theme');
    } catch {
      // stockage indisponible : pas de préférence à exporter
    }
    downloadFile(
      JSON.stringify({ ...backup, site: SITE_NAME, preferences: { theme } }, null, 2),
      `explorons-l-ia-donnees-locales-${todayStamp()}.json`,
      'application/json'
    );
    toast.success('Export téléchargé');
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    try {
      const report = await restoreBackup(await readTextFile(file));
      refresh();
      toast.success(
        `${report.added} élément(s) restauré(s)${report.ignored ? `, ${report.ignored} ignoré(s) car invalide(s)` : ''}`
      );
    } catch (error) {
      toast.error(error instanceof DataError ? error.message : "La restauration n'a pas abouti.");
    }
  };

  const handleDelete = () => {
    LOCAL_STORAGE_KEYS.forEach(({ key }) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // stockage indisponible (navigation privée stricte) : rien à effacer
      }
    });
    refresh();
    toast.success('Données locales effacées');
  };

  const hasData = Object.values(stored).some((v) => v !== null);

  return (
    <>
      <Hero
        title="Vos données locales"
        subtitle="Ce que le site enregistre dans votre navigateur, et comment l'exporter, le restaurer ou l'effacer."
      />

      <section className="section-container">
        <div className="max-w-3xl mx-auto space-y-6">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Dans votre navigateur, {SITE_NAME} ne dépose ni cookie ni traceur et n'envoie rien à un serveur : pas de
              compte, aucun outil de mesure d'audience. Les seules données sont des préférences et des historiques
              enregistrés dans votre navigateur, sur votre appareil uniquement. Le serveur, lui, conserve douze mois au plus de
              journaux techniques (voir la page Confidentialité).
            </AlertDescription>
          </Alert>

          <Card>
            <CardHeader>
              <CardTitle>Données enregistrées dans ce navigateur</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y divide-border">
                {LOCAL_STORAGE_KEYS.map(({ key, purpose }) => {
                  const raw = stored[key];
                  const count = countItems(raw);
                  return (
                    <li key={key} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{purpose}</p>
                        <p className="text-xs text-muted-foreground font-mono">{key}</p>
                      </div>
                      <span className="text-sm text-muted-foreground whitespace-nowrap">
                        {raw === null || raw === undefined ? 'Aucune' : count !== null ? `${count} élément(s)` : 'Présente'}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Button onClick={handleExport} className="flex-1" disabled={!hasData}>
                  <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                  Exporter (JSON)
                </Button>
                <Button onClick={() => fileInput.current?.click()} variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" aria-hidden="true" />
                  Restaurer un export
                </Button>
                <Button onClick={handleDelete} variant="destructive" className="flex-1" disabled={!hasData}>
                  <Trash2 className="h-4 w-4 mr-2" aria-hidden="true" />
                  Tout effacer
                </Button>
              </div>
              <input
                ref={fileInput}
                type="file"
                accept=".json,application/json"
                onChange={handleImport}
                className="hidden"
                tabIndex={-1}
                aria-hidden="true"
              />
              <p className="text-xs text-muted-foreground mt-3">
                L'export est un fichier JSON créé dans votre navigateur. La restauration l'ajoute aux données présentes
                (un élément de même identifiant est remplacé) ; le thème n'est pas restauré. Vous pouvez aussi effacer
                ces données depuis les réglages de votre navigateur (données de site).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 flex items-start gap-3">
              <Mail className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm text-muted-foreground">
                Une question sur vos données ? Écrivez à{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
};

export default GestionDonneesRGPD;
