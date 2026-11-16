// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { detectionPresets, DetectionPreset } from '@/services/detection/detectionPresets';
import { 
  GraduationCap, 
  Newspaper, 
  Palette, 
  Users, 
  Scale, 
  Megaphone,
  CheckCircle
} from 'lucide-react';

interface PresetSelectorProps {
  selectedPreset?: string;
  onPresetSelect: (presetId: string | undefined) => void;
}

const presetIcons = {
  academic: GraduationCap,
  journalistic: Newspaper,
  creative: Palette,
  social_media: Users,
  legal: Scale,
  marketing: Megaphone,
};

/** Types MIME ramenés à des mots (Texte, Image, Audio), sans doublon. */
const fileTypeLabels = (fileTypes: string[]): string[] => {
  const labels = fileTypes.map((type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('audio/')) return 'Audio';
    return 'Texte';
  });
  return Array.from(new Set(labels));
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({
  selectedPreset,
  onPresetSelect
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Préréglages de détection</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPresetSelect(undefined)}
        >
          Analyse standard
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {detectionPresets.map((preset) => {
          const Icon = presetIcons[preset.id as keyof typeof presetIcons] || CheckCircle;
          const isSelected = selectedPreset === preset.id;

          return (
            <Card 
              key={preset.id} 
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onPresetSelect(preset.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Icon className="h-5 w-5" />
                  {preset.name}
                  {isSelected && <CheckCircle className="h-4 w-4 text-primary ml-auto" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-3">
                  {preset.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {{ low: 'Sensibilité basse', medium: 'Sensibilité moyenne', high: 'Sensibilité élevée' }[preset.settings.sensitivity]}
                  </Badge>
                  {fileTypeLabels(preset.fileTypes).map((label) => (
                    <Badge key={label} variant="outline" className="text-xs">
                      {label}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
