// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import { TOOLS } from '@/config/tools';
import React from 'react';
import Hero from '@/components/Hero';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { AIContentDetector } from '@/components/detection/AIContentDetector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Image, Music, Zap, BarChart3, Download } from 'lucide-react';

const DetecteurContenuIA = () => {
  return (
    <>
      <Hero
        title={TOOLS.contentDetector.name}
        subtitle="Démonstration pédagogique : quels indices statistiques peut-on chercher dans un texte, une image ou un son, et pourquoi aucun ne suffit à prouver qu'un contenu vient d'une IA."
      />
      
      <section className="section-container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-primary/10 px-4 py-2 rounded-lg mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">Analyse 100 % locale : vos fichiers ne quittent pas votre appareil</span>
          </div>
        </div>

        {/* Fonctionnalités principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Détection de texte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Repérez des indices simples (répétitions de mots, diversité du vocabulaire, expressions de liaison formelles) parfois associés aux textes générés par des modèles de langage, mais aussi courants dans des textes humains.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Répétitions et diversité du vocabulaire</li>
                <li>• Repérage de mots et d'expressions cités comme fréquents dans les textes générés (surtout anglais, quelques tournures françaises)</li>
                <li>• Indice de 0 à 100 et indicateurs relevés</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-5 w-5" />
                Analyse d'images
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Examinez métadonnées et artefacts visuels parfois laissés par les générateurs d'images (Midjourney, GPT Image d'OpenAI, Stable Diffusion...).
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Analyse des métadonnées EXIF</li>
                <li>• Mesures simples sur les pixels (couleurs, bruit, dimensions)</li>
                <li>• Structure du fichier (JPEG, PNG)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Music className="h-5 w-5" />
                Détection audio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Calcule quelques mesures sur le signal audio (énergie au-dessus de 8 kHz, niveaux, régularité). Aucune ne permet d'identifier une voix synthétique : le résultat est un indice, pas une identification.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Part d'énergie au-dessus de 8 kHz (transformée de Fourier)</li>
                <li>• Niveaux sonores par trame (dynamique, passages calmes)</li>
                <li>• Débit estimé des fichiers compressés</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Fonctionnalités avancées */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Calculs dans votre navigateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les calculs s'exécutent dans votre navigateur, sans envoi de fichier.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Indices et limites
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Affiche des indices statistiques, un indice de confiance indicatif et les limites à garder en tête.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Export et historique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Les analyses restent dans ce navigateur (historique local) et peuvent être exportées en JSON ou CSV.
              </p>
            </CardContent>
          </Card>
        </div>

        <Alert className="mb-8 border-orange-300 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-900">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertTitle>À lire avant d'utiliser le détecteur</AlertTitle>
          <AlertDescription>
            Ce détecteur repose sur des heuristiques simples, sans modèle entraîné, et ses listes de mots et d'expressions sont écrites surtout pour l'anglais (avec quelques tournures françaises) : sur un texte ordinaire, en général aucun indicateur ne se déclenche, ce qui ne dit rien de son origine. Ses scores sont indicatifs et
            produisent des faux positifs (textes humains très réguliers, traductions, personnes non natives) comme des
            faux négatifs (textes générés puis retouchés). Même les détecteurs commerciaux ne sont pas fiables : aucun
            score ne doit servir à accuser ou sanctionner quelqu'un (devoir, candidature, litige).
          </AlertDescription>
        </Alert>

        {/* Interface principale */}
        <AIContentDetector />
      </section>
    </>
  );
};

export default DetecteurContenuIA;
