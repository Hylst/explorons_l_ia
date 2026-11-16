// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React, { useEffect, useMemo, useRef } from 'react';
import type { DataPoint } from './miniNetwork';

interface DecisionBoundaryProps {
  /** Probabilité de la classe 1 prédite par le réseau en un point du plan. */
  predict: (x: number, y: number) => number;
  train: DataPoint[];
  validation: DataPoint[];
  /** Change à chaque époque (ou réinitialisation) pour déclencher le redessin. */
  version: number;
}

const SIZE = 320;
const GRID = 40;
const CLASS_COLORS = ['#3b82f6', '#f97316'];

/**
 * Dessine la frontière de décision d'un classifieur à deux entrées : fond coloré selon la classe prédite
 * (l'opacité reflète la certitude), cercles pour l'entraînement, carrés pour la validation.
 */
const DecisionBoundary: React.FC<DecisionBoundaryProps> = ({ predict, train, validation, version }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Repère carré centré sur les données, pour que les cercles restent des cercles.
  const view = useMemo(() => {
    const all = [...train, ...validation];
    if (all.length === 0) return { minX: -2, minY: -2, span: 4 };
    const xs = all.map((p) => p.x);
    const ys = all.map((p) => p.y);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const span = Math.max(maxX - minX, maxY - minY) + 0.8;
    return { minX: (minX + maxX) / 2 - span / 2, minY: (minY + maxY) / 2 - span / 2, span };
  }, [train, validation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, SIZE, SIZE);

    const cell = SIZE / GRID;
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        const x = view.minX + ((i + 0.5) / GRID) * view.span;
        const y = view.minY + (1 - (j + 0.5) / GRID) * view.span;
        const p = predict(x, y);
        const confidence = Math.abs(2 * p - 1);
        ctx.fillStyle = p >= 0.5 ? `rgba(249,115,22,${0.1 + 0.4 * confidence})` : `rgba(59,130,246,${0.1 + 0.4 * confidence})`;
        ctx.fillRect(i * cell, j * cell, cell + 0.5, cell + 0.5);
      }
    }

    const toX = (x: number) => ((x - view.minX) / view.span) * SIZE;
    const toY = (y: number) => SIZE - ((y - view.minY) / view.span) * SIZE;

    for (const point of train) {
      ctx.beginPath();
      ctx.arc(toX(point.x), toY(point.y), 3.2, 0, 2 * Math.PI);
      ctx.fillStyle = CLASS_COLORS[point.label];
      ctx.fill();
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(255,255,255,0.95)';
      ctx.stroke();
    }
    for (const point of validation) {
      const px = toX(point.x);
      const py = toY(point.y);
      ctx.fillStyle = CLASS_COLORS[point.label];
      ctx.fillRect(px - 3.5, py - 3.5, 7, 7);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#111827';
      ctx.strokeRect(px - 3.5, py - 3.5, 7, 7);
    }
  }, [version, view, predict, train, validation]);

  return (
    <canvas
      ref={canvasRef}
      width={SIZE}
      height={SIZE}
      role="img"
      aria-label="Frontière de décision du réseau : fond bleu ou orange selon la classe prédite, points d'entraînement en cercles, points de validation en carrés"
      className="w-full max-w-sm mx-auto aspect-square rounded-md border"
    />
  );
};

export default DecisionBoundary;
