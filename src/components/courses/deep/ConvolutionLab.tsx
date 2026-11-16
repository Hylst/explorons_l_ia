import React, { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const INPUT = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 1, 1, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

type KernelName = 'vertical' | 'horizontal' | 'moyenne';

const KERNELS: Record<KernelName, number[][]> = {
  vertical: [[-1, 0, 1], [-1, 0, 1], [-1, 0, 1]],
  horizontal: [[-1, -1, -1], [0, 0, 0], [1, 1, 1]],
  moyenne: [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
};

function convolve(input: number[][], kernel: number[][], stride: number, padding: number) {
  const size = input.length;
  const k = kernel.length;
  const outSize = Math.floor((size + 2 * padding - k) / stride) + 1;
  const output: number[][] = [];
  for (let y = 0; y < outSize; y++) {
    const row: number[] = [];
    for (let x = 0; x < outSize; x++) {
      let sum = 0;
      for (let ky = 0; ky < k; ky++) {
        for (let kx = 0; kx < k; kx++) {
          const iy = y * stride + ky - padding;
          const ix = x * stride + kx - padding;
          if (iy >= 0 && iy < size && ix >= 0 && ix < size) {
            sum += input[iy][ix] * kernel[ky][kx];
          }
        }
      }
      row.push(sum);
    }
    output.push(row);
  }
  return output;
}

const ConvolutionLab: React.FC = () => {
  const [kernelName, setKernelName] = useState<KernelName>('vertical');
  const [stride, setStride] = useState(1);
  const [padding, setPadding] = useState(0);
  const kernel = KERNELS[kernelName];
  const output = useMemo(() => convolve(INPUT, kernel, stride, padding), [kernel, stride, padding]);
  const maxAbs = Math.max(1, ...output.flat().map((v) => Math.abs(v)));

  return (
    <Card className="my-6 border-primary/30 bg-primary/5" data-print-hide>
      <CardContent className="p-4 sm:p-5">
        <h3 className="mb-1 text-lg font-semibold">Laboratoire : une convolution à la main</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Scénario illustratif. Une entrée 6 × 6, un noyau 3 × 3 et ses réglages. Les valeurs sont calculées dans le navigateur.
        </p>

        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className="text-sm">
            <span className="mb-1 block font-medium">Noyau</span>
            <select
              id="lab-noyau"
              value={kernelName}
              onChange={(e) => setKernelName(e.target.value as KernelName)}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="vertical">Contour vertical</option>
              <option value="horizontal">Contour horizontal</option>
              <option value="moyenne">Moyenne 3 × 3</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Pas</span>
            <select
              id="lab-pas"
              value={stride}
              onChange={(e) => setStride(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
            </select>
          </label>
          <label className="text-sm">
            <span className="mb-1 block font-medium">Padding</span>
            <select
              id="lab-padding"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
            </select>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <figure>
            <figcaption className="mb-1 text-sm font-medium">Entrée 6 × 6</figcaption>
            <svg viewBox="0 0 150 150" role="img" aria-label="Entrée 6 par 6 avec une bande verticale" className="w-full max-w-[220px] rounded border bg-background">
              {INPUT.map((row, y) => row.map((v, x) => (
                <g key={`${x}-${y}`}>
                  <rect x={x * 24 + 2} y={y * 24 + 2} width={22} height={22} rx={3} fill={v ? '#38bdf8' : '#1e293b'} />
                </g>
              )))}
            </svg>
          </figure>
          <figure>
            <figcaption className="mb-1 text-sm font-medium">Noyau 3 × 3</figcaption>
            <svg viewBox="0 0 110 110" role="img" aria-label="Noyau de convolution 3 par 3" className="w-full max-w-[150px] rounded border bg-background">
              {kernel.map((row, y) => row.map((v, x) => (
                <g key={`${x}-${y}`}>
                  <rect x={x * 34 + 2} y={y * 34 + 2} width={32} height={32} rx={3} fill={v > 0 ? '#34d399' : v < 0 ? '#fb7185' : '#334155'} />
                  <text x={x * 34 + 18} y={y * 34 + 23} textAnchor="middle" fontSize="12" fill="#f8fafc">{v}</text>
                </g>
              )))}
            </svg>
          </figure>
          <figure>
            <figcaption className="mb-1 text-sm font-medium">Sortie {output.length} × {output[0]?.length ?? 0}</figcaption>
            <svg viewBox="0 0 150 150" role="img" aria-label="Carte de sortie de la convolution" className="w-full max-w-[220px] rounded border bg-background">
              {output.map((row, y) => row.map((v, x) => {
                const intensity = Math.min(1, Math.abs(v) / maxAbs);
                const fill = v >= 0 ? `rgba(52, 211, 153, ${0.15 + intensity * 0.85})` : `rgba(251, 113, 133, ${0.15 + intensity * 0.85})`;
                return <rect key={`${x}-${y}`} x={x * 24 + 2} y={y * 24 + 2} width={22} height={22} rx={3} fill={fill} />;
              }))}
            </svg>
          </figure>
        </div>
        <p id="lab-conv-summary" className="mt-4 text-sm" aria-live="polite">
          La sortie contient {output.length * (output[0]?.length ?? 0)} positions. Changer le pas réduit la résolution ; le padding ajoute des zéros sur les bords.
        </p>
      </CardContent>
    </Card>
  );
};

export default ConvolutionLab;
