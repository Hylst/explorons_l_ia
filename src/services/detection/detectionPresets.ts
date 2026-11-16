// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


/**
 * Un préréglage ne change qu'une chose : la sensibilité, c'est-à-dire un facteur appliqué à l'indice affiché
 * (0,8 en sensibilité basse, 1 en moyenne, 1,2 en élevée). Il ne change ni les mesures ni l'échelle de lecture
 * (scoreScale.ts), identique pour tous. `fileTypes` n'est qu'une indication des fichiers visés : rien n'est filtré.
 */
export interface DetectionPreset {
  id: string;
  name: string;
  description: string;
  fileTypes: string[];
  settings: {
    sensitivity: 'low' | 'medium' | 'high';
  };
}

export const detectionPresets: DetectionPreset[] = [
  {
    id: 'academic',
    name: 'Contrôle académique',
    description: 'Pour des textes longs de type devoir. Sensibilité élevée : l’indice affiché est multiplié par 1,2. Ne jamais sanctionner sur cette seule base.',
    fileTypes: ['text/plain', 'text/html'],
    settings: { sensitivity: 'high' }
  },
  {
    id: 'journalistic',
    name: 'Vérification journalistique',
    description: 'Pour des textes d’actualité. Sensibilité moyenne : l’indice affiché n’est pas modifié. Un indice n’est pas une vérification.',
    fileTypes: ['text/plain', 'text/html'],
    settings: { sensitivity: 'medium' }
  },
  {
    id: 'creative',
    name: 'Contenu créatif',
    description: 'Pour des images et des sons. Sensibilité moyenne : l’indice affiché n’est pas modifié (la vidéo n’est pas prise en charge).',
    fileTypes: ['image/*', 'audio/*'],
    settings: { sensitivity: 'medium' }
  },
  {
    id: 'social_media',
    name: 'Réseaux sociaux',
    description: 'Pour des contenus courts de réseaux sociaux. Sensibilité basse : l’indice affiché est multiplié par 0,8, donc moins de contenus atteignent un niveau élevé.',
    fileTypes: ['image/*', 'text/plain', 'audio/*'],
    settings: { sensitivity: 'low' }
  },
  {
    id: 'legal',
    name: 'Signalement large',
    description: 'Sensibilité élevée : l’indice affiché est multiplié par 1,2, donc davantage de contenus atteignent un niveau élevé, avec plus de faux positifs. Sans valeur de preuve.',
    fileTypes: ['text/plain', 'image/*'],
    settings: { sensitivity: 'high' }
  },
  {
    id: 'marketing',
    name: 'Contenu marketing',
    description: 'Pour des textes et des images publicitaires. Sensibilité moyenne : l’indice affiché n’est pas modifié.',
    fileTypes: ['text/plain', 'image/*'],
    settings: { sensitivity: 'medium' }
  }
];

export const getPresetById = (id: string): DetectionPreset | undefined => {
  return detectionPresets.find(preset => preset.id === id);
};

export const getPresetsForFileType = (fileType: string): DetectionPreset[] => {
  return detectionPresets.filter(preset =>
    preset.fileTypes.some(type =>
      type === fileType ||
      type.endsWith('/*') && fileType.startsWith(type.replace('/*', ''))
    )
  );
};
