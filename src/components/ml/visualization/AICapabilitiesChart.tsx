// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later


import React, { useState } from 'react';
import { 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  RadarChart, 
  ResponsiveContainer, 
  Tooltip,
  Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimulationNotice from '@/components/common/SimulationNotice';
import { useIsMobile } from '@/hooks/use-mobile';

interface CapabilityRow {
  capability: string;
  LLM: number;
  NLP: number;
  CNN: number;
  RL: number;
  XAI: number;
}

interface TooltipEntry {
  name: string;
  value: number;
  color: string;
  payload: CapabilityRow;
}

// Types d'IA et leurs capacités
const aiCapabilitiesData: CapabilityRow[] = [
  {
    capability: 'Traitement du langage',
    LLM: 95,
    NLP: 90,
    CNN: 20,
    RL: 30,
    XAI: 50,
  },
  {
    capability: 'Vision par ordinateur',
    LLM: 40,
    NLP: 20,
    CNN: 95,
    RL: 40,
    XAI: 60,
  },
  {
    capability: 'Raisonnement',
    LLM: 75,
    NLP: 60,
    CNN: 30,
    RL: 70,
    XAI: 65,
  },
  {
    capability: 'Apprentissage continu',
    LLM: 30,
    NLP: 40,
    CNN: 30,
    RL: 90,
    XAI: 40,
  },
  {
    capability: 'Transparence',
    LLM: 30,
    NLP: 40,
    CNN: 20,
    RL: 50,
    XAI: 95,
  },
  {
    capability: 'Adaptabilité',
    LLM: 65,
    NLP: 60,
    CNN: 40,
    RL: 85,
    XAI: 55,
  },
];

// Caractéristiques techniques
const technicalCharacteristicsData: CapabilityRow[] = [
  {
    capability: 'Besoin de données',
    LLM: 90,
    NLP: 75,
    CNN: 85,
    RL: 40,
    XAI: 60,
  },
  {
    capability: 'Coût computationnel',
    LLM: 95,
    NLP: 70,
    CNN: 80,
    RL: 75,
    XAI: 60,
  },
  {
    capability: 'Parallélisation',
    LLM: 80,
    NLP: 70,
    CNN: 90,
    RL: 50,
    XAI: 60,
  },
  {
    capability: 'Facilité d\'implémentation',
    LLM: 50,
    NLP: 60,
    CNN: 40,
    RL: 30,
    XAI: 70,
  },
  {
    capability: 'Interprétabilité',
    LLM: 30,
    NLP: 50,
    CNN: 20,
    RL: 40,
    XAI: 95,
  },
];

interface AxisTickProps {
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  payload?: { value: string };
}

/** Coupe un libellé d'axe en lignes d'au plus `max` caractères (sans couper les mots). */
const wrapLabel = (label: string, max: number): string[] => {
  const lines: string[] = [];
  for (const word of label.split(' ')) {
    const last = lines[lines.length - 1];
    if (last !== undefined && (last + ' ' + word).length <= max) lines[lines.length - 1] = last + ' ' + word;
    else lines.push(word);
  }
  return lines;
};

/** Libellé d'axe du radar : repoussé vers l'extérieur, aligné selon le côté, sur plusieurs lignes si besoin. */
const AxisTick: React.FC<AxisTickProps & { isMobile?: boolean }> = ({ isMobile = false, x = 0, y = 0, cx = 0, cy = 0, payload }) => {
  const dx = x - cx;
  const dy = y - cy;
  const len = Math.hypot(dx, dy) || 1;
  const px = x + (dx / len) * 6;
  const py = y + (dy / len) * 6;
  const anchor = dx > 5 ? 'start' : dx < -5 ? 'end' : 'middle';
  const lines = wrapLabel(payload?.value ?? '', 12);
  return (
    <text x={px} y={py} textAnchor={anchor} fill="currentColor" fontSize={isMobile ? 11 : 12}>
      {lines.map((line, i) => (
        <tspan key={line} x={px} dy={i === 0 ? `${0.35 - (lines.length - 1) * 0.6}em` : '1.2em'}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

const AICapabilitiesChart: React.FC = () => {
  const isMobile = useIsMobile();
  const [selectedAITypes, setSelectedAITypes] = useState<string[]>(['LLM', 'CNN', 'RL', 'XAI']);
  
  const colorMap: Record<string, string> = {
    LLM: '#8b5cf6',
    NLP: '#6366f1',
    CNN: '#0ea5e9',
    RL: '#f97316',
    XAI: '#10b981',
  };
  
  const toggleAIType = (aiType: string) => {
    if (selectedAITypes.includes(aiType)) {
      setSelectedAITypes(selectedAITypes.filter(type => type !== aiType));
    } else {
      setSelectedAITypes([...selectedAITypes, aiType]);
    }
  };
  
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipEntry[] }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-2 shadow-md">
          <p className="font-medium">{payload[0].payload.capability}</p>
          {payload.map((entry) => (
            <p key={entry.name} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  const RenderChart = ({ data }: { data: CapabilityRow[] }) => (
    <div className="w-full h-[500px]">
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {Object.keys(colorMap).map((aiType) => (
          <button
            key={aiType}
            onClick={() => toggleAIType(aiType)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedAITypes.includes(aiType)
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {aiType}
          </button>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={isMobile ? '36%' : '70%'} data={data} margin={{ top: 20, right: 0, bottom: 10, left: 0 }}>
          <PolarGrid />
          <PolarAngleAxis dataKey="capability" tick={<AxisTick isMobile={isMobile} />} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={isMobile ? false : { fontSize: 10 }} axisLine={!isMobile} />
          
          {selectedAITypes.map((type) => (
            <Radar
              key={type}
              name={type}
              dataKey={type}
              stroke={colorMap[type]}
              fill={colorMap[type]}
              fillOpacity={0.2}
            />
          ))}
          
          <Tooltip content={<CustomTooltip />} />
          <Legend formatter={(value) => <span className="text-sm text-foreground">{value}</span>} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
  
  return (
    <div className="mt-8 border rounded-lg p-4 animate-fade-in shadow-xs">
      <SimulationNotice className="mb-4">
        Ces profils comparent des familles de techniques avec des scores indicatifs de 0 à 100 : ils ne proviennent
        d'aucune mesure et résument des tendances générales. L'IA générale (AGI) n'existe pas à ce jour : elle n'est donc
        pas représentée. L'XAI est un ensemble de techniques d'explication, non une famille de modèles : ses scores
        sur les axes langage et vision reflètent ce qu'elles savent expliquer, pas une capacité à traiter du texte ou des images.
      </SimulationNotice>
      <Tabs defaultValue="capabilities" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="capabilities" className="py-3 whitespace-normal h-auto">Capacités</TabsTrigger>
          <TabsTrigger value="technical" className="py-3 whitespace-normal h-auto">Caractéristiques techniques</TabsTrigger>
        </TabsList>
        
        <TabsContent value="capabilities" className="mt-0">
          <RenderChart data={aiCapabilitiesData} />
        </TabsContent>
        
        <TabsContent value="technical" className="mt-0">
          <RenderChart data={technicalCharacteristicsData} />
        </TabsContent>
        
      </Tabs>
    </div>
  );
};

export default AICapabilitiesChart;
