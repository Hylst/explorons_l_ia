// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Fige un snapshot statique reproductible : copie dist/, calcule les empreintes et écrit SNAPSHOT-MANIFEST.json.
// Usage : npm run snapshot -- <dossier-de-destination> [--commit <sha>]
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { TREE_ALGORITHM, treeSha256 } from './snapshot-lib.mjs';

const args = process.argv.slice(2);
const destination = args[0];
if (!destination) {
  console.error('Usage : npm run snapshot -- <dossier-de-destination> [--commit <sha>]');
  process.exit(2);
}
const commitIndex = args.indexOf('--commit');
const sourceCommit = commitIndex === -1 ? null : args[commitIndex + 1] || null;

const source = path.resolve('dist');
if (!fs.existsSync(path.join(source, 'index.html'))) {
  console.error('dist/index.html absent : lancer npm run build.');
  process.exit(2);
}

fs.rmSync(destination, { recursive: true, force: true });
fs.cpSync(source, destination, { recursive: true });
const manifestPath = path.join(destination, 'SNAPSHOT-MANIFEST.json');
fs.rmSync(manifestPath, { force: true });

const walk = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
  entry.isDirectory()
    ? walk(path.join(directory, entry.name))
    : [path.join(directory, entry.name)]
);
const relative = (base, file) => path.relative(base, file).split(path.sep).join('/');
const sha256 = (file) => createHash('sha256').update(fs.readFileSync(file)).digest('hex');

const rows = walk(destination)
  .map((file) => [relative(destination, file), sha256(file)])
  .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
const index = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
const entry = index.match(/assets\/index-[^"]+\.js/)?.[0];
const css = index.match(/assets\/index-[^"]+\.css/)?.[0];
if (!entry || !css) {
  console.error('Entrée JS ou CSS introuvable dans dist/index.html.');
  process.exit(2);
}

const manifest = {
  entry,
  css,
  files: rows.length,
  treeSha256: treeSha256(rows),
  treeAlgorithm: TREE_ALGORITHM,
  indexSha256: sha256(path.join(source, 'index.html')),
  entrySha256: sha256(path.join(source, entry)),
  cssSha256: sha256(path.join(source, css)),
  createdAt: new Date().toISOString(),
  sourceCommit,
};
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest, null, 2));
