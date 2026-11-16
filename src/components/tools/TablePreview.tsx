// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later

import React from 'react';

interface TablePreviewProps {
  headers: string[];
  rows: string[][];
  limit?: number;
  caption: string;
}

/** Aperçu des premières lignes d'un tableau, défilable horizontalement sans élargir la page. */
const TablePreview: React.FC<TablePreviewProps> = ({ headers, rows, limit = 10, caption }) => (
  <div tabIndex={0} role="region" aria-label={caption} className="relative max-w-full overflow-x-auto rounded-md border">
    <table className="w-full text-xs">
      <caption className="sr-only">{caption}</caption>
      <thead className="bg-muted/60">
        <tr>
          {headers.map((h) => (
            <th key={h} scope="col" className="px-2 py-1.5 text-left font-semibold whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.slice(0, limit).map((row, i) => (
          <tr key={i} className="border-t">
            {row.map((cell, j) => (
              <td key={j} className="px-2 py-1 whitespace-nowrap max-w-48 truncate">
                {cell === '' ? <span className="text-muted-foreground italic">vide</span> : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TablePreview;
