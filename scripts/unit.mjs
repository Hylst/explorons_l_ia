// SPDX-FileCopyrightText: 2025-2026 Geoffroy Streit
// SPDX-License-Identifier: AGPL-3.0-or-later
// Tests unitaires des calculs des outils (`npm run test:unit`, sans build ni navigateur).
// Node 22.18 ou plus récent : les fichiers .ts sont chargés directement (types retirés à la volée), d'où les
// imports avec extension dans src/lib/, src/components/prompt-generator/ et src/components/resources/data/.
// Code de sortie 1 au moindre échec.
import assert from 'node:assert/strict';
import { existsSync, readdirSync, statSync } from 'node:fs';
const L = new URL('../src/lib/dataTools/', import.meta.url).href;
const C = new URL('../src/components/cost-calculator/', import.meta.url).href;
const { parseCsv, detectDelimiter } = await import(L + 'csv.ts');
const { mean, std, quantileSorted, pearson, histogram } = await import(L + 'stats.ts');
const { profileDataset, toNumber } = await import(L + 'profile.ts');
const { fairnessReport } = await import(L + 'fairness.ts');
const { generateTable, validateSpecs, parseCategories } = await import(L + 'synth.ts');
const { sampleBikeRentals, sampleApplications, SYNTH_PRESETS } = await import(L + 'samples.ts');
const { computeCost, clampField, formatUsd, DEFAULT_SCENARIO } = await import(C + 'costMath.ts');
const { RESOURCE_TYPE_LABELS, resourceTypeLabel } = await import(new URL('../src/components/resources/resourceTypeLabels.ts', import.meta.url).href);
const { buildProposalEmail } = await import(new URL('../src/components/resources/proposalMailto.ts', import.meta.url).href);
let ok = 0;
let failed = 0;
const t = (name, fn) => { try { fn(); ok++; } catch (e) { failed++; console.log('KO', name, '\n  ', e.message); } };

// CSV
t('csv simple', () => { const p = parseCsv('a,b\n1,2\n3,4\n'); assert.deepEqual(p.headers, ['a', 'b']); assert.deepEqual(p.rows, [['1', '2'], ['3', '4']]); });
t('csv guillemets et virgule', () => { const p = parseCsv('nom,ville\n"Dupont, Jean","Paris"\n"Le ""chef""",Lyon'); assert.deepEqual(p.rows, [['Dupont, Jean', 'Paris'], ['Le "chef"', 'Lyon']]); });
t('csv retour à la ligne dans un champ', () => { const p = parseCsv('a,b\n"x\ny",2\n'); assert.deepEqual(p.rows, [['x\ny', '2']]); });
t('csv point-virgule et virgule décimale', () => { const p = parseCsv('a;b\n1,5;2\n3;4,25'); assert.equal(p.delimiter, ';'); assert.deepEqual(p.rows[0], ['1,5', '2']); });
t('csv tabulation', () => assert.equal(detectDelimiter('a\tb\tc\n1\t2\t3'), '\t'));
t('csv CRLF et BOM', () => { const p = parseCsv('\uFEFFa,b\r\n1,2\r\n'); assert.deepEqual(p.headers, ['a', 'b']); assert.deepEqual(p.rows, [['1', '2']]); });
t('csv lignes irrégulières', () => { const p = parseCsv('a,b,c\n1,2\n1,2,3,4'); assert.equal(p.irregularRows, 2); assert.deepEqual(p.rows[0], ['1', '2', '']); assert.deepEqual(p.rows[1], ['1', '2', '3']); });
t('csv en-têtes vides ou doublés', () => assert.deepEqual(parseCsv('a,,a\n1,2,3').headers, ['a', 'colonne_2', 'a_2']));
t('csv limite de lignes', () => { const p = parseCsv('a\n1\n2\n3\n4', 2); assert.equal(p.rows.length, 2); assert.equal(p.truncated, true); });
t('csv vide', () => assert.throws(() => parseCsv('')));

// Statistiques
t('moyenne, écart-type', () => { assert.equal(mean([1, 2, 3, 4]), 2.5); assert.ok(Math.abs(std([2, 4, 4, 4, 5, 5, 7, 9]) - 2.138) < 0.001); });
t('quantiles (méthode 7)', () => { const s = [1, 2, 3, 4, 5]; assert.equal(quantileSorted(s, 0.25), 2); assert.equal(quantileSorted(s, 0.5), 3); assert.equal(quantileSorted([1, 2, 3, 4], 0.5), 2.5); });
t('pearson', () => { assert.ok(Math.abs(pearson([1, 2, 3, 4], [2, 4, 6, 8]).r - 1) < 1e-12); assert.ok(Math.abs(pearson([1, 2, 3, 4], [8, 6, 4, 2]).r + 1) < 1e-12); assert.ok(Number.isNaN(pearson([1, 1, 1], [1, 2, 3]).r)); assert.equal(pearson([1, null, 3, 4], [1, 5, 3, 4]).n, 3); });
t('histogramme', () => { const h = histogram([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5); assert.equal(h.reduce((s, b) => s + b.count, 0), 11); assert.equal(h[4].count, 3); });
t('toNumber', () => { assert.equal(toNumber('3,5'), 3.5); assert.equal(toNumber('-1e3'), -1000); assert.equal(toNumber('12 €'), null); assert.equal(toNumber('1 234'), 1234); assert.equal(toNumber(''), null); });

// Profil
t('profil : manquants, doublons, constante, identifiant, type', () => {
  const headers = ['id', 'x', 'c', 'k', 'y'];
  const rows = [];
  for (let i = 0; i < 40; i++) rows.push([`u${i}`, i % 7 === 0 ? 'NA' : String(i), i % 2 ? 'a' : 'b', 'z', i < 6 ? '1' : '0']);
  rows.push([...rows[3]]);
  rows[5][1] = 'abc';
  const p = profileDataset(headers, rows, 'y');
  const by = Object.fromEntries(p.columns.map((c) => [c.name, c]));
  assert.equal(p.duplicateRows, 1);
  assert.equal(by.x.kind, 'numérique');
  assert.equal(by.x.missing, 6);
  assert.equal(by.x.mismatched, 1);
  assert.equal(by.k.unique, 1);
  const titles = p.issues.map((i) => i.title).join(' | ');
  assert.match(titles, /Valeur constante/);
  assert.match(titles, /identifiant/);
  assert.match(titles, /déséquilibrées/);
  assert.match(titles, /en double/);
});
t('profil : fuite par colonne catégorielle', () => {
  const rows = []; for (let i = 0; i < 50; i++) { const y = i % 3 === 0 ? 'oui' : 'non'; rows.push([String(i), y === 'oui' ? 'p' : 'q', y]); }
  const p = profileDataset(['n', 'leak', 'y'], rows, 'y');
  assert.ok(p.issues.some((i) => i.column === 'leak' && /parfaitement/.test(i.title)));
});

// Équité : matrice de confusion vérifiée à la main
t('équité : taux par groupe', () => {
  // groupe A : 4 lignes, vérité 1,1,0,0 ; prédiction 1,0,1,0 -> TP1 FN1 FP1 TN1
  // groupe B : 4 lignes, vérité 1,1,1,0 ; prédiction 1,1,0,0 -> TP2 FN1 FP0 TN1
  const r = fairnessReport({ groups: ['A', 'A', 'A', 'A', 'B', 'B', 'B', 'B'], truth: [1, 1, 0, 0, 1, 1, 1, 0].map(Boolean), predicted: [1, 0, 1, 0, 1, 1, 0, 0].map(Boolean) });
  const A = r.groups.find((g) => g.group === 'A'); const B = r.groups.find((g) => g.group === 'B');
  assert.equal(A.tpr, 0.5); assert.equal(A.fpr, 0.5); assert.equal(A.selectionRate, 0.5); assert.equal(A.ppv, 0.5);
  assert.ok(Math.abs(B.tpr - 2 / 3) < 1e-12); assert.equal(B.fpr, 0); assert.equal(B.ppv, 1); assert.equal(B.selectionRate, 0.5);
  assert.equal(r.gaps.selection.diff, 0); assert.equal(r.gaps.selection.ratio, 1);
  assert.ok(Math.abs(r.gaps.tpr - 1 / 6) < 1e-12); assert.equal(r.gaps.fpr, 0.5); assert.equal(r.gaps.equalizedOdds, 0.5);
});
t('équité : groupe sans négatif -> FPR non défini, ignoré dans les écarts', () => {
  const r = fairnessReport({ groups: ['A', 'A', 'B', 'B'], truth: [true, true, true, false], predicted: [true, false, true, true] });
  assert.ok(Number.isNaN(r.groups.find((g) => g.group === 'A').fpr));
  assert.ok(Number.isNaN(r.gaps.fpr));
});

// Synthétique
t('catégories pondérées', () => assert.deepEqual(parseCategories('A:3, B , C:0.5'), [{ value: 'A', weight: 3 }, { value: 'B', weight: 1 }, { value: 'C', weight: 0.5 }]));
t('génération reproductible', () => { const s = SYNTH_PRESETS[0].specs; assert.deepEqual(generateTable(s, 50, 3), generateTable(s, 50, 3)); assert.notDeepEqual(generateTable(s, 50, 3).rows, generateTable(s, 50, 4).rows); });
t('presets valides', () => SYNTH_PRESETS.forEach((p) => assert.deepEqual(validateSpecs(p.specs), [], p.id)));
t('validation', () => {
  const pb = validateSpecs([{ kind: 'entier', name: 'a', min: 5, max: 1, missingRate: 0 }, { kind: 'linéaire', name: 'a', source: 'z', slope: 1, intercept: 0, noise: 0, decimals: 0, missingRate: 0 }]);
  assert.ok(pb.some((x) => /deux fois/.test(x))); assert.ok(pb.some((x) => /minimum/.test(x))); assert.ok(pb.some((x) => /n'existe pas/.test(x)));
});
t('linéaire exacte sans bruit', () => {
  const g = generateTable([{ kind: 'entier', name: 'x', min: 0, max: 10, missingRate: 0 }, { kind: 'linéaire', name: 'y', source: 'x', slope: 2, intercept: 1, noise: 0, decimals: 0, missingRate: 0 }], 30, 1);
  g.rows.forEach(([x, y]) => assert.equal(Number(y), 2 * Number(x) + 1));
});
t('taux de manquants', () => { const g = generateTable([{ kind: 'entier', name: 'x', min: 0, max: 9, missingRate: 0.3 }], 5000, 9); const m = g.rows.filter((r) => r[0] === '').length / 5000; assert.ok(m > 0.27 && m < 0.33, String(m)); });
t('entiers dans les bornes', () => generateTable([{ kind: 'entier', name: 'x', min: -2, max: 2, missingRate: 0 }], 2000, 5).rows.forEach(([x]) => assert.ok(Number(x) >= -2 && Number(x) <= 2)));
t('dates dans les bornes', () => generateTable([{ kind: 'date', name: 'd', start: '2026-01-01', end: '2026-01-31', missingRate: 0 }], 500, 5).rows.forEach(([d]) => assert.ok(d >= '2026-01-01' && d <= '2026-01-31', d)));

// Jeux d'exemple
t('exemple vélos : défauts attendus détectés', () => {
  const s = sampleBikeRentals(); const p = profileDataset(s.headers, s.rows, 'forte_demande');
  const titles = p.issues.map((i) => `${i.column}: ${i.title}`).join('\n');
  assert.ok(p.duplicateRows >= 5, String(p.duplicateRows));
  assert.match(titles, /humidite_pct: .*manquante/); assert.match(titles, /humidite_pct: .*ne correspondent pas/);
  assert.match(titles, /prime_equipe_versee: Prédit parfaitement/); assert.match(titles, /forte_demande: Classes déséquilibrées/);
  assert.match(titles, /id_jour: Ressemble à un identifiant/);
});
t('exemple candidatures : écart visible', () => {
  const s = sampleApplications(); const gi = s.headers.indexOf('groupe');
  const r = fairnessReport({ groups: s.rows.map((x) => x[gi]), truth: s.rows.map((x) => x[2] === '1'), predicted: s.rows.map((x) => x[4] === '1') });
  assert.ok(r.gaps.tpr > 0.1);
});
// Calculateur de coûts : vérifié à la main (1 000 x 2 $/M + 500 x 12 $/M = 0,008 $ par requête)
t('coût par requête, jour, mois, an', () => {
  const c = computeCost({ ...DEFAULT_SCENARIO, inputTokens: 1000, outputTokens: 500, users: 10, requestsPerUser: 20, daysPerMonth: 30 }, { inputPrice: 2, outputPrice: 12 });
  assert.ok(Math.abs(c.perRequest - 0.008) < 1e-12);
  assert.equal(c.requestsPerDay, 200);
  assert.ok(Math.abs(c.perDay - 1.6) < 1e-9);
  assert.ok(Math.abs(c.perMonth - 48) < 1e-9);
  assert.ok(Math.abs(c.perYear - 576) < 1e-9);
  assert.ok(Math.abs(c.perRequestFull - c.perRequest) < 1e-12);
  assert.equal(c.discountPerMonth, 0);
});
t('cache : remise sur une part des tokens d’entrée', () => {
  const c = computeCost(
    { ...DEFAULT_SCENARIO, inputTokens: 1000, outputTokens: 500, users: 10, requestsPerUser: 20, daysPerMonth: 30, cachedInputShare: 50, cacheDiscount: 50 },
    { inputPrice: 2, outputPrice: 12 }
  );
  assert.ok(Math.abs(c.inputCost - 0.0015) < 1e-12);
  assert.ok(Math.abs(c.perRequest - 0.0075) < 1e-12);
  assert.ok(Math.abs(c.perRequestFull - 0.008) < 1e-12);
  assert.ok(Math.abs(c.discountPerMonth - 3) < 1e-9);
});
t('lots : remise sur une part des requêtes', () => {
  const c = computeCost(
    { ...DEFAULT_SCENARIO, inputTokens: 1000, outputTokens: 500, users: 10, requestsPerUser: 20, daysPerMonth: 30, batchRequestShare: 50, batchDiscount: 50 },
    { inputPrice: 2, outputPrice: 12 }
  );
  assert.ok(Math.abs(c.perRequest - 0.006) < 1e-12);
  assert.ok(Math.abs(c.perMonth - 36) < 1e-9);
});
t('remises : bornes 0-100, zéro part = prix plein', () => {
  assert.equal(clampField('cacheDiscount', 120), 100);
  assert.equal(clampField('batchRequestShare', -3), 0);
  const zero = computeCost(DEFAULT_SCENARIO, { inputPrice: 2, outputPrice: 12 });
  const unused = computeCost(
    { ...DEFAULT_SCENARIO, cachedInputShare: 0, cacheDiscount: 90, batchRequestShare: 0, batchDiscount: 90 },
    { inputPrice: 2, outputPrice: 12 }
  );
  assert.equal(zero.perRequest, unused.perRequest);
});
t('saisies bornées', () => {
  assert.equal(clampField('users', -5), 0);
  assert.equal(clampField('daysPerMonth', 0), 1);
  assert.equal(clampField('inputTokens', NaN), 0);
  assert.equal(clampField('daysPerMonth', 99), 31);
});
t('montants affichés', () => {
  assert.equal(formatUsd(0.008), '0,008 $');
  assert.equal(formatUsd(0), '0 $');
  assert.match(formatUsd(1234.5), /^1.235 \$$/);
});

// Cours approfondis : schéma, accord avec le registre, règles éditoriales, formules compilées par KaTeX.
{
  const D = new URL('../src/content/cours-approfondis/', import.meta.url);
  const { deepCourseSchema, editorialIssues } = await import(new URL('schema.ts', D).href);
  const { DEEP_COURSES } = await import(new URL('registry.ts', D).href);
  const { normalizeDisplayMath, markdownFieldsOf } = await import(new URL('markdownText.ts', D).href);
  const { createElement } = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const Markdown = (await import('react-markdown')).default;
  const remarkGfm = (await import('remark-gfm')).default;
  const remarkMath = (await import('remark-math')).default;
  const rehypeKatex = (await import('rehype-katex')).default;
  const { readdirSync, readFileSync } = await import('node:fs');
  const files = readdirSync(D).filter((name) => name.endsWith('.json'));
  const NEW_COURSES = new Set([
    'reseau-de-neurones',
    'cnn-architectures-vision',
    'gpu-cpu',
    'algorithmes-ia-generative',
    'flow-matching',
    'fine-tuning',
    'ia-locale',
    'open-weights',
    'jev',
    'injection-de-prompt',
    'ia-generative-multimodale-agentique',
    'solutions-ia-b2b',
    'llm-wiki',
  ]);
  const words = (s) => s.trim().split(/\s+/).filter(Boolean).length;
  const render = (md) => renderToStaticMarkup(createElement(Markdown, { remarkPlugins: [remarkGfm, remarkMath], rehypePlugins: [rehypeKatex] }, normalizeDisplayMath(md)));
  // Du texte français pris pour une formule trahit un « $ » de montant non échappé (à écrire « \\$ » dans le JSON).
  const proseInMath = (tex) => /[a-zà-ÿ]{3,} [a-zà-ÿ]{3,} [a-zà-ÿ]{3,}/i.test(tex.replace(/\\(?:text|mathrm|operatorname|textbf|mathbf)\{[^}]*\}/g, ''));
  t('cours approfondis : registre et fichiers', () => {
    assert.deepEqual(files.map((name) => name.replace(/\.json$/, '')).sort(), DEEP_COURSES.map((c) => c.slug).sort());
  });
  for (const name of files) {
    const course = JSON.parse(readFileSync(new URL(name, D), 'utf8'));
    t(`cours ${name} : schéma`, () => {
      const r = deepCourseSchema.safeParse(course);
      assert.ok(r.success, r.success ? '' : r.error.issues.slice(0, 5).map((i) => `${i.path.join('.')} : ${i.message}`).join(' | '));
    });
    t(`cours ${name} : registre`, () => {
      const entry = DEEP_COURSES.find((c) => c.slug === course.slug);
      assert.ok(entry, 'absent du registre');
      assert.equal(entry.title, course.title);
      assert.equal(entry.level, course.level);
      assert.equal(`${course.slug}.json`, name);
    });
    if (NEW_COURSES.has(course.slug)) {
      t(`cours ${name} : couverture`, () => {
        assert.ok(course.cover, 'couverture absente');
        assert.equal(course.cover.src, `pics/cours/${course.slug}.webp`);
        assert.ok(course.cover.alt.length >= 20);
        const file = new URL(`../public/${course.cover.src}`, import.meta.url);
        assert.ok(existsSync(file), `fichier absent : ${course.cover.src}`);
        assert.ok(statSync(file).size > 0, `fichier vide : ${course.cover.src}`);
      });
      t(`cours ${name} : structure éditoriale`, () => {
        assert.ok(course.modules.length >= 5 && course.modules.length <= 10, `${course.modules.length} modules`);
        assert.ok(course.sources.length >= 5 && course.sources.length <= 10, `${course.sources.length} sources`);
        assert.ok(course.tags.length >= 4 && course.tags.length <= 6, `${course.tags.length} tags`);
        assert.ok(course.prerequisites.length >= 3 && course.prerequisites.length <= 5);
        assert.ok(course.related.length >= 3 && course.related.length <= 4);
        assert.equal(course.checkedOn, '2026-10-26');
        assert.ok(!/youtube\.com|youtu\.be/i.test(JSON.stringify(course)), 'vidéo citée');
        assert.ok(!/\b(?:TBD|TODO)\b|À compléter|placeholder/i.test(JSON.stringify(course)), 'texte provisoire');
        for (const source of course.sources) {
          assert.ok(source.href.startsWith('https://'));
          assert.ok(/\b(?:19|20)\d{2}\b|consulté/i.test(source.label), `source non datée : ${source.label}`);
        }
        for (const m of course.modules) {
          assert.ok(words(m.theory) >= 700 && words(m.theory) <= 1500, `${m.id} : ${words(m.theory)} mots`);
          assert.ok(m.keyTakeaways.length >= 3 && m.keyTakeaways.length <= 5);
          assert.ok(m.glossary.length >= 2 && m.glossary.length <= 5);
          assert.ok(m.quiz.length >= 2, `${m.id} : ${m.quiz.length} quiz`);
          for (const q of m.quiz) assert.ok(q.options.length >= 3 && q.options.length <= 4, `${m.id} : options`);
          assert.ok(m.diagram && m.diagram.steps.length >= 2, `${m.id} : schéma`);
        }
      });
    }
    t(`cours ${name} : règles éditoriales`, () => assert.deepEqual(editorialIssues(course), []));
    t(`cours ${name} : formules`, () => {
      const problems = [];
      const fields = [course.summary, course.introduction, ...course.modules.flatMap((m) => markdownFieldsOf(m))];
      for (const md of fields) {
        const html = render(md);
        if (html.includes('katex-error')) problems.push(`formule invalide près de « ${(html.match(/title="([^"]{0,120})/) || [])[1]} »`);
        for (const [, tex] of html.matchAll(/<annotation encoding="application\/x-tex">([^<]*)<\/annotation>/g)) {
          if (proseInMath(tex)) problems.push(`texte pris pour une formule : « ${tex.slice(0, 80)} »`);
        }
      }
      // Quiz, glossaire et étapes de schéma sont affichés en texte simple : pas de LaTeX.
      for (const m of course.modules) {
        const plain = [...m.quiz.flatMap((q) => [q.question, q.explanation, ...q.options]), ...m.glossary.flatMap((g) => [g.term, g.definition]), ...(m.diagram?.steps.flatMap((s) => [s.title, s.explanation]) ?? [])];
        for (const s of plain) if (/(^|[^\\])\$[^$\s][^$]*\$/.test(s) || /\\(frac|sum|mathbb|sqrt|cdot)\b/.test(s)) problems.push(`LaTeX dans un texte simple (${m.id}) : « ${s.slice(0, 60)} »`);
      }
      assert.deepEqual(problems.slice(0, 8), []);
    });
  }
  t('couvertures classiques : 20 WebP', () => {
    const dir = new URL('../public/pics/cours-classiques/', import.meta.url);
    const covers = readdirSync(dir).filter((name) => name.endsWith('.webp'));
    assert.equal(covers.length, 20);
    for (const name of covers) assert.ok(statSync(new URL(name, dir)).size > 1000, name);
  });
  t('cours approfondis : distribution des réponses des quiz', () => {
    const counts = [0, 0, 0, 0];
    let total = 0;
    for (const name of files) {
      const course = JSON.parse(readFileSync(new URL(name, D), 'utf8'));
      for (const module of course.modules) {
        for (const question of module.quiz) {
          counts[question.correctIndex] += 1;
          total += 1;
        }
      }
    }
    assert.ok(total > 0);
    assert.ok(Math.max(...counts) <= Math.ceil(total * 0.6), `répartition trop déséquilibrée : ${counts.join('/')}`);
  });
  t('cours approfondis : 13 nouveaux et 94 modules', () => {
    const courses = files
      .map((name) => JSON.parse(readFileSync(new URL(name, D), 'utf8')))
      .filter((c) => NEW_COURSES.has(c.slug));
    assert.equal(courses.length, 13);
    assert.equal(courses.reduce((n, c) => n + c.modules.length, 0), 94);
  });
}

// Guide Agir : contenu et liens.
{
  const A = new URL('../src/components/resources/data/', import.meta.url).href;
  const { TOOLS } = await import(new URL('../src/config/tools.ts', import.meta.url).href);
  const { agirIntro, agirSections, agirActions } = await import(A + 'agirData.ts');
  const { authorApps } = await import(A + 'authorAppsData.ts');
  const all = [...agirSections.flatMap((s) => s.resources), ...agirActions.flatMap((a) => a.resources)];
  const unique = [...new Map(all.map((r) => [r.link, r])).values()];
  const byLink = new Map(unique.map((r) => [r.link, r]));

  t('guide Agir : structure', () => {
    assert.equal(agirIntro.paragraphs.length, 2);
    assert.deepEqual(agirSections.map((s) => s.id), ['comprendre', 'interroger', 'prompts', 'environnement', 'informer']);
    assert.deepEqual(agirActions.map((a) => a.id), ['apprendre', 'ecouter', 'proteger', 'encadrer', 'informer', 'transmettre', 'former', 'contribuer', 'experimenter']);
  });

  t('guide Agir : 26 liens uniques et typés', () => {
    assert.equal(unique.length, 26);
    for (const r of unique) {
      assert.ok(r.title && r.source && r.description && r.type, r.link);
      assert.ok(r.link.startsWith('https://') || (r.isInternal && r.link.startsWith('/')), r.link);
      assert.ok(!/[—–]/.test(`${r.title} ${r.description}`), r.link);
      assert.ok(!/ [?!:;]/.test(`${r.title} ${r.description}`), r.link);
    }
  });

  t('guide Agir : liens internes, notes et dates', () => {
    assert.equal(unique.filter((r) => r.isInternal).length, 2);
    const generator = byLink.get(TOOLS.promptGenerator.path);
    assert.ok(generator);
    assert.equal(generator.ctaLabel, "Ouvrir l'outil");
    const courses = byLink.get('/cours');
    assert.ok(courses);
    assert.equal(courses.isInternal, true);
    assert.equal(byLink.get('https://www.academie-nr.org/mooc-ia/fr/index.html')?.note, 'Gratuit');
    assert.equal(byLink.get('https://cafeia.org/carte-interactive/')?.note, 'Gratuit');
    assert.equal(byLink.get('https://framamia.org/')?.note, 'Point de vue');
    assert.equal(byLink.get('https://dial-ia.fr/')?.note, 'Dialogue social');
    assert.equal(byLink.get('https://participer.montpellier.fr/ia')?.note, 'Exemple daté');
    assert.equal(byLink.get('https://www.paris.fr/pages/l-ia-s-invite-au-debat-partagez-votre-opinion-sur-l-intelligence-artificielle-dans-la-ville-28391')?.note, 'Exemple daté');
    assert.equal(byLink.get('https://participer.montpellier.fr/ia')?.year, 2024);
    assert.equal(byLink.get('https://www.paris.fr/pages/l-ia-s-invite-au-debat-partagez-votre-opinion-sur-l-intelligence-artificielle-dans-la-ville-28391')?.year, 2024);
    assert.equal(byLink.get('https://www.radiofrance.fr/franceinter/quiz-comment-reperer-une-image-generee-par-intelligence-artificielle-7249226')?.year, 2023);
  });

  t('guide Agir : actions', () => {
    for (const a of agirActions) {
      assert.ok(a.ideas.length >= 2 && a.ideas.length <= 3, a.id);
      assert.ok(a.resources.length >= 1 && a.resources.length <= 4, a.id);
    }
  });

  t('applications Hylst : fiches complètes, liens conformes et sans doublon', () => {
    assert.equal(authorApps.length, 11);
    assert.equal(new Set(authorApps.map((app) => app.name)).size, authorApps.length);
    assert.equal(new Set(authorApps.map((app) => app.link)).size, authorApps.length);
    for (const app of authorApps) {
      assert.ok(app.name && app.description && app.category, app.link);
      assert.ok(app.tags.length >= 1, app.name);
      assert.match(app.link, /^https:\/\/(?:[a-z0-9-]+\.)?hylst\.fr\/[a-z0-9._-]+\/$/, app.link);
      assert.notEqual(app.link, 'https://hylst.fr/data/', 'Data Science Memo répond 410');
      assert.ok(app.description.length >= 80 && app.description.length <= 240, app.name);
      assert.ok(!/[—–]/.test(`${app.name} ${app.description}`), app.name);
      assert.ok(!/ [?!:;]/.test(`${app.name} ${app.description}`), app.name);
    }
  });
}

// Glossaire général : termes uniques, catégories valides, définitions non vides.
{
  const { aiTerms } = await import(new URL('../src/components/glossary/glossaryData.ts', import.meta.url).href);
  const categories = new Set(['general', 'technical', 'ethical', 'memory', 'advanced']);

  t('glossaire : 123 termes uniques et catégories valides', () => {
    assert.equal(aiTerms.length, 123);
    assert.equal(new Set(aiTerms.map((item) => item.term)).size, aiTerms.length);
    for (const item of aiTerms) {
      assert.ok(item.term && item.term.trim().length > 0, 'terme vide');
      assert.ok(item.definition && item.definition.trim().length >= 30, item.term);
      assert.ok(categories.has(item.category), `${item.term} : catégorie ${item.category} invalide`);
      assert.ok(!/[—–]/.test(`${item.term} ${item.definition}`), item.term);
      assert.ok(!/ [?!:;]/.test(`${item.term} ${item.definition}`), item.term);
    }
  });

  t('glossaire : notions clés récentes présentes', () => {
    for (const name of ['MCP (Model Context Protocol)', "Appel d'outils (function calling)", 'Cache de prompt (prompt caching)']) {
      const found = aiTerms.find((item) => item.term === name);
      assert.ok(found, name);
      assert.equal(found.category, 'technical', name);
    }
  });
}

// Prompts : règles de forme partagées par la vérification et le comparateur (aucune heuristique de fond).
{
  const P = new URL('../src/components/prompt-generator/', import.meta.url).href;
  const {
    MIN_PROMPT_LENGTH,
    MAX_PROMPT_LENGTH,
    definesRole,
    hasReasonableLength,
    hasStructuredInstructions,
    asksForFormat,
    hasUnfilledPlaceholder
  } = await import(P + 'structureChecks.ts');
  const { toCsv } = await import(new URL('../src/lib/files.ts', import.meta.url).href);

  t('prompt : longueur utile bornée', () => {
    assert.equal(hasReasonableLength('a'.repeat(MIN_PROMPT_LENGTH - 1)), false);
    assert.equal(hasReasonableLength('a'.repeat(MIN_PROMPT_LENGTH)), true);
    assert.equal(hasReasonableLength('a'.repeat(MAX_PROMPT_LENGTH)), true);
    assert.equal(hasReasonableLength('a'.repeat(MAX_PROMPT_LENGTH + 1)), false);
    assert.equal(hasReasonableLength(`   ${'a'.repeat(MIN_PROMPT_LENGTH - 1)}   `), false);
  });

  t('prompt : rôle, structure et format', () => {
    assert.equal(definesRole('Tu es un relecteur technique.'), true);
    assert.equal(definesRole('Agis comme un professeur de mathématiques.'), true);
    assert.equal(definesRole('Résume ce texte en trois phrases.'), false);
    assert.equal(hasStructuredInstructions('Consignes :\n- première\n- seconde'), true);
    assert.equal(hasStructuredInstructions('1. première étape\n2. seconde étape'), true);
    assert.equal(hasStructuredInstructions('Une seule phrase sans liste.'), false);
    assert.equal(asksForFormat('Réponds en JSON, en trois lignes.'), true);
    assert.equal(asksForFormat('Résume ce texte.'), false);
  });

  t('prompt : champs à compléter détectés sans faux positif', () => {
    assert.equal(hasUnfilledPlaceholder('Résume [votre sujet] en trois lignes.'), true);
    assert.equal(hasUnfilledPlaceholder('[Titre]'), true);
    assert.equal(hasUnfilledPlaceholder('Note chaque point de [score et justification].'), true);
    assert.equal(hasUnfilledPlaceholder('[à compléter]'), true);
    assert.equal(hasUnfilledPlaceholder('Utilise tableau[i] puis arr[0] et data["clé"].'), false);
    assert.equal(hasUnfilledPlaceholder('Voir [texte](https://exemple.fr) et [1].'), false);
    assert.equal(hasUnfilledPlaceholder('[Contexte]\nTu es un relecteur.\n[Contraintes]\n- deux paragraphes'), false);
    assert.equal(hasUnfilledPlaceholder('Compare [1, 2] et [ 3 ].'), false);
  });

  t('prompt : export CSV échappé (RFC 4180)', () => {
    assert.equal(toCsv(['a', 'b'], [['x,y', 'ligne\nsur deux']]), 'a,b\r\n"x,y","ligne\nsur deux"');
    assert.equal(toCsv(['p'], [['Le "chef"']]), 'p\r\n"Le ""chef"""');
  });
}

// Fraîcheur des dates de contrôle affichées dans le catalogue.
{
  const { daysSince, isStale, STALE_AFTER_DAYS } = await import(new URL('../src/lib/freshness.ts', import.meta.url).href);

  t('fraîcheur : jours écoulés et seuil de 90 jours', () => {
    assert.equal(STALE_AFTER_DAYS, 90);
    assert.equal(daysSince('2026-10-26', new Date('2026-10-27T08:00:00Z')), 1);
    assert.equal(daysSince('2026-10-27', new Date('2026-10-27T23:00:00Z')), 0);
    assert.equal(daysSince('2026-10-28', new Date('2026-10-27T08:00:00Z')), -1);
    assert.equal(isStale('2026-10-26', new Date('2026-10-27T08:00:00Z')), false);
    assert.equal(isStale('2026-07-28', new Date('2026-10-26T08:00:00Z')), false);
    assert.equal(isStale('2026-07-27', new Date('2026-10-26T08:00:00Z')), true);
    assert.equal(isStale(undefined), false);
  });
}

// Catalogue externe : fiches complètes, liens et dates valides, aucun doublon.
{
  const { iaTools } = await import(new URL('../src/components/resources/data/toolsData.ts', import.meta.url).href);
  const external = iaTools.filter((tool) => /^https:\/\//.test(tool.link));
  // Date locale (Europe/Paris), pas UTC : un relevé du 31/10 à 00 h 30 serait sinon « futur ».
  const today = new Date().toLocaleDateString('sv-SE');

  t('catalogue : 76 outils externes et 9 outils internes', () => {
    assert.equal(external.length, 76);
    assert.equal(iaTools.length, 85);
  });

  t('catalogue : noms et liens uniques', () => {
    assert.equal(new Set(iaTools.map((tool) => tool.name)).size, iaTools.length);
    assert.equal(new Set(iaTools.map((tool) => tool.link)).size, iaTools.length);
  });

  t('catalogue : champs affichés complets', () => {
    for (const tool of iaTools) {
      assert.ok(tool.name && tool.category && tool.description, tool.name);
      assert.ok(tool.pricing, tool.name);
      assert.ok(tool.features.length >= 1, tool.name);
      assert.ok(tool.description.length >= 30 && tool.description.length <= 240, tool.name);
      assert.ok(tool.features.every((feature) => feature.length <= 30), tool.name);
      assert.ok(!/[—–]/.test(`${tool.name} ${tool.description}`), tool.name);
      assert.ok(!/ [?!:;]/.test(`${tool.name} ${tool.description}`), tool.name);
    }
  });

  t('catalogue : dates de contrôle plausibles', () => {
    for (const tool of external) {
      assert.match(tool.lastChecked, /^\d{4}-\d{2}-\d{2}$/, tool.name);
      assert.ok(tool.lastChecked <= today, tool.name);
    }
  });

  t('catalogue : chaque outil externe a un tarif daté ou une revue expliquée', () => {
    for (const tool of external) {
      const dated = Boolean(tool.pricingChecked);
      const reviewed = Boolean(tool.pricingReviewed && tool.pricingNote);
      assert.ok(dated || reviewed, tool.name);
      if (reviewed) assert.match(tool.pricingReviewed, /^\d{4}-\d{2}-\d{2}$/, tool.name);
    }
  });

  t('catalogue : un tarif daté cite sa page tarifaire', () => {
    const dated = external.filter((tool) => tool.pricingChecked);
    assert.ok(dated.length >= 4, `${dated.length} tarif(s) daté(s)`);
    for (const tool of dated) {
      assert.match(tool.pricingChecked, /^\d{4}-\d{2}-\d{2}$/, tool.name);
      assert.ok(tool.pricingChecked <= today, tool.name);
      assert.match(tool.pricingUrl, /^https:\/\//, tool.name);
    }
  });

  t('catalogue : douze outils ajoutés le 30/10', () => {
    const names = ['Microsoft Copilot', 'Meta AI', 'Qwen', 'Ollama', 'LM Studio', 'ComfyUI', 'Google AI Studio', 'OpenRouter', 'n8n', 'LightOn', 'Aleph Alpha', 'Lucie'];
    for (const name of names) assert.ok(iaTools.some((tool) => tool.name === name), name);
  });

  t('catalogue : les outils locaux datent leur tarif', () => {
    for (const name of ['Ollama', 'LM Studio', 'ComfyUI', 'Google AI Studio', 'OpenRouter', 'n8n']) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.pricingChecked, '2026-10-30', name);
      assert.match(tool.pricingUrl, /^https:\/\//, name);
    }
  });

  t('catalogue : deux tarifs supplémentaires le 31/10', () => {
    for (const name of ['Grok', 'Gemini Notebook (ex-NotebookLM)']) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.pricingChecked, '2026-10-31', name);
      assert.match(tool.pricingUrl, /^https:\/\//, name);
    }
  });

  t('catalogue : deuxième relevé tarifaire du 31/10', () => {
    const names = ['Runway', 'Jasper AI', 'Loom AI', 'Otter.ai', 'Synthesia', 'Descript', 'Murf AI', 'Beautiful.ai', 'Krisp', 'Fireflies.ai', 'Writesonic', 'Artbreeder', 'Pika', 'Suno', 'Hugging Face', 'Upscale.media', 'DeepL'];
    for (const name of names) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.pricingChecked, '2026-10-31', name);
      assert.match(tool.pricingUrl, /^https:\/\//, name);
    }
    assert.equal(iaTools.find((tool) => tool.name === 'Krisp').pricing, 'Payant');
  });

  t('catalogue : quatre outils ajoutés le 31/10', () => {
    for (const name of ['HeyGen', 'Opus Clip', 'Kaggle', 'Cohere']) assert.ok(iaTools.some((tool) => tool.name === name), name);
    for (const name of ['HeyGen', 'Opus Clip', 'Cohere']) {
      assert.equal(iaTools.find((tool) => tool.name === name).pricingChecked, '2026-10-31', name);
    }
    assert.equal(iaTools.find((tool) => tool.name === 'Kaggle').pricingReviewed, '2026-10-31');
  });

  t('catalogue : faits langue, compte et API cohérents', () => {
    for (const tool of iaTools) {
      const facts = [tool.interfaceLanguage, tool.accountRequired, tool.apiAvailable].filter((value) => value !== undefined);
      if (facts.length) assert.match(tool.factsChecked, /^\d{4}-\d{2}-\d{2}$/, tool.name);
      if (tool.factsChecked) assert.ok(facts.length > 0, tool.name);
      if (tool.interfaceLanguage) assert.ok(['fr', 'multi', 'en'].includes(tool.interfaceLanguage), tool.name);
    }
    assert.equal(iaTools.filter((tool) => tool.factsChecked).length, iaTools.length, 'toutes les fiches sont documentées');
  });

  t('catalogue : douze fiches documentées le 31/10', () => {
    const names = ['ElevenLabs', 'Pika', 'Grok', 'DeepSeek', 'Qwen', 'QuillBot', 'Otter.ai', 'Synthesia', 'Descript', 'Murf AI', 'Krisp', 'Adobe Firefly'];
    for (const name of names) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.factsChecked, '2026-10-31', name);
      assert.ok(tool.interfaceLanguage, name);
    }
  });

  t('catalogue : Runway, Suno et Fireflies en anglais le 06/11 (lot 17)', () => {
    for (const name of ['Runway', 'Suno', 'Fireflies.ai']) {
      const tool = iaTools.find((item) => item.name === name);
      assert.ok(tool, name);
      assert.equal(tool.interfaceLanguage, 'en', name);
      assert.equal(tool.factsChecked, '2026-11-06', name);
    }
  });

  t('catalogue : quinze fiches de plus documentées le 02/11', () => {
    const names = ['Gemini Notebook (ex-NotebookLM)', 'Figma AI', 'Jasper AI', 'Copy.ai', 'Loom AI', 'Beautiful.ai', 'Leonardo AI', 'Google AI Studio', 'n8n', 'Opus Clip', 'Krea', 'OpenRouter', 'Cleanup Pictures', 'Writesonic', 'remove.bg'];
    for (const name of names) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.factsChecked, '2026-11-02', name);
      assert.ok(tool.interfaceLanguage, name);
    }
  });

  t('formulaire : le type de ressource est libellé en clair', () => {
    assert.equal(resourceTypeLabel('tool'), 'Outil IA');
    assert.equal(resourceTypeLabel('article'), 'Article');
    assert.deepEqual(Object.keys(RESOURCE_TYPE_LABELS), ['article', 'book', 'video', 'course', 'website', 'tool']);
    for (const label of Object.values(RESOURCE_TYPE_LABELS)) assert.ok(label.length > 0);
  });

  t("formulaire : l'e-mail de proposition nomme le type en clair", () => {
    const base = { title: 'Test', author: 'Auteur', link: 'https://example.com', level: 'Tous niveaux', language: 'FR', description: 'Description de test.' };
    const tool = buildProposalEmail({ ...base, type: 'tool' });
    assert.match(tool.body, /Type : Outil IA - Niveau : Tous niveaux - Langue : FR/);
    assert.ok(!/Type : tool/.test(tool.body), 'le code interne ne doit pas fuiter');
    assert.equal(tool.subject, "Explorons l'IA - proposition de ressource : Test");
    assert.match(buildProposalEmail({ ...base, type: 'video', year: 2026, topics: 'Images' }).body, /Année : 2026\nThèmes : Images/);
  });

  t('catalogue : quinze fiches de plus documentées le 02/11 (lot 13)', () => {
    const names = ['Grammarly', 'Replit Agent', 'Upscale.media', 'Replika', 'Artbreeder', 'Meta AI', 'Ollama', 'LM Studio', 'ComfyUI', 'Zapier', 'HeyGen', 'Kaggle', 'Cohere', 'LightOn', 'Lucie'];
    for (const name of names) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.factsChecked, '2026-11-02', name);
      assert.ok(tool.interfaceLanguage, name);
    }
    const undocumented = iaTools.filter((tool) => tool.link && !tool.factsChecked).map((tool) => tool.name);
    assert.deepEqual(undocumented.sort(), []);
  });

  t('catalogue : six outils ajoutés le 02/11 (lot 14)', () => {
    const names = ['Luma AI', 'Ideogram', 'FLUX', 'AssemblyAI', 'Amazon Q Developer', 'Make'];
    for (const name of names) {
      const tool = iaTools.find((item) => item.name === name);
      assert.ok(tool, name);
      assert.equal(tool.pricingChecked, '2026-11-02', name);
      assert.match(tool.pricingUrl, /^https:\/\//, name);
      assert.equal(tool.factsChecked, '2026-11-02', name);
      assert.ok(tool.accountRequired, name);
    }
    const undocumented = iaTools.filter((tool) => tool.link && !tool.factsChecked).map((tool) => tool.name);
    assert.deepEqual(undocumented.sort(), []);
  });

  t('catalogue : cinq outils ajoutés le 06/11 (lot 15)', () => {
    const names = ['Kimi', 'Albert', 'Kyutai', 'Google Colab', 'IBM watsonx'];
    for (const name of names) {
      const tool = iaTools.find((item) => item.name === name);
      assert.ok(tool, name);
      assert.equal(tool.factsChecked, '2026-11-06', name);
      assert.ok(tool.interfaceLanguage, name);
    }
    for (const name of ['Kimi', 'IBM watsonx']) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.pricingChecked, '2026-11-06', name);
      assert.match(tool.pricingUrl, /^https:\/\//, name);
    }
    for (const name of ['Albert', 'Kyutai', 'Google Colab']) {
      const tool = iaTools.find((item) => item.name === name);
      assert.equal(tool.pricingReviewed, '2026-11-06', name);
      assert.ok(tool.pricingNote, name);
    }
    const undocumented = iaTools.filter((tool) => tool.link && !tool.factsChecked).map((tool) => tool.name);
    assert.deepEqual(undocumented.sort(), []);
  });

  t('catalogue : Character.ai documenté le 06/11 (lot 16)', () => {
    const tool = iaTools.find((item) => item.name === 'Character.ai');
    assert.equal(tool.factsChecked, '2026-11-06');
    assert.equal(tool.lastChecked, '2026-11-06');
    assert.equal(tool.interfaceLanguage, 'fr');
    assert.equal(tool.accountRequired, true);
    assert.equal(tool.apiAvailable, undefined);
    assert.equal(iaTools.filter((item) => item.link && !item.factsChecked).length, 0);
    assert.equal(iaTools.find((item) => item.name === 'Google Colab').interfaceLanguage, 'fr');
    assert.equal(iaTools.find((item) => item.name === 'Google AI Studio').pricingUrl, 'https://aistudio.google.com/docs/pricing');
  });

  t('catalogue : les grands assistants ont un tarif daté', () => {
    const names = ['ChatGPT', 'Claude', 'Gemini', 'Mistral Vibe (ex-Le Chat)', 'GitHub Copilot', 'Cursor', 'Claude Code', 'Perplexity', 'Notion AI', 'Figma AI', 'Grammarly', 'ElevenLabs'];
    for (const name of names) {
      const tool = iaTools.find((item) => item.name === name);
      assert.ok(tool, name);
      assert.equal(tool.pricingChecked, '2026-10-30', name);
      assert.match(tool.pricingUrl, /^https:\/\//, name);
    }
  });

  t('catalogue : Stable Diffusion en poids ouverts, sans doublon d\'images', () => {
    const stable = iaTools.find((tool) => tool.name === 'Stable Diffusion');
    assert.equal(stable.pricing, 'Gratuit / poids ouverts');
    assert.ok(!iaTools.some((tool) => tool.pricing === 'Open source'), 'un outil est encore marqué « Open source »');
    assert.ok(!iaTools.some((tool) => /ChatGPT Images/i.test(tool.name)), 'doublon ChatGPT Images de retour');
  });
}

// Arbre SHA-256 des snapshots : algorithme documenté et stable.
{
  const { treeSha256 } = await import(new URL('../scripts/snapshot-lib.mjs', import.meta.url).href);
  const { createHash } = await import('node:crypto');
  const sha = (value) => createHash('sha256').update(value).digest('hex');

  t('snapshot : arbre trié par octets et lignes chemin|hash', () => {
    const rows = [['b.txt', '2'], ['A.txt', '1'], ['a.txt', '3']];
    assert.equal(treeSha256(rows), sha('A.txt|1\na.txt|3\nb.txt|2\n'));
    assert.equal(treeSha256([...rows].reverse()), treeSha256(rows));
    assert.notEqual(treeSha256([['a.txt', '1']]), sha('a.txt|1'));
  });
}

// Recherche de la bibliothèque : accents, casse, ligatures et mots multiples.
{
  const { fold, matchesQuery } = await import(new URL('../src/lib/search.ts', import.meta.url).href);

  t('recherche : accents, casse et ligatures ignorés', () => {
    assert.equal(fold('Éthique'), 'ethique');
    assert.equal(fold('Vidéo'), 'video');
    assert.equal(fold('Cœur'), 'coeur');
  });

  t('recherche : « video » trouve « vidéo », « donnees » trouve « données »', () => {
    assert.equal(matchesQuery('Génération de vidéos par IA', 'video'), true);
    assert.equal(matchesQuery('Données manquantes', 'donnees'), true);
    assert.equal(matchesQuery('Éthique', 'ethique'), true);
    assert.equal(matchesQuery('Midjourney', 'video'), false);
  });

  t('recherche : tous les mots doivent apparaître, requête vide acceptée', () => {
    assert.equal(matchesQuery('Auditeur de biais', 'biais auditeur'), true);
    assert.equal(matchesQuery('Auditeur de biais', 'biais absence'), false);
    assert.equal(matchesQuery('peu importe', '   '), true);
  });
}

// Date de contrôle affichée sur les fiches : aucune conversion de fuseau horaire.
{
  const { formatIsoDay } = await import(new URL('../src/lib/freshness.ts', import.meta.url).href);

  t('date de contrôle : formatée sans décalage de fuseau', () => {
    assert.equal(formatIsoDay('2026-10-26'), '26/10/2026');
    assert.equal(formatIsoDay('2026-1-2'), '2026-1-2');
  });
}

// Filtres du catalogue d'outils : options complètes, combinaison et recherche.
{
  const { toolFilterOptions, filterTools, readToolFilter, toolSlug } = await import(new URL('../src/components/resources/toolFilters.ts', import.meta.url).href);
  const { iaTools } = await import(new URL('../src/components/resources/data/toolsData.ts', import.meta.url).href);

  t('filtres : les options viennent du catalogue complet', () => {
    const { categories, pricings } = toolFilterOptions(iaTools);
    assert.equal(categories.length, new Set(iaTools.map((tool) => tool.category)).size);
    assert.deepEqual(pricings, ['Gratuit', 'Gratuit / poids ouverts', 'Freemium', 'Payant']);
  });

  t('slug : identifiants ASCII stables et uniques', () => {
    assert.equal(toolSlug('Mistral Vibe (ex-Le Chat)'), 'mistral-vibe-ex-le-chat');
    assert.equal(toolSlug('Éthique'), 'ethique');
    assert.equal(toolSlug('n8n'), 'n8n');
    assert.equal(new Set(iaTools.map((tool) => toolSlug(tool.name))).size, iaTools.length);
  });

  t('filtres : catégorie et tarif combinés', () => {
    assert.equal(filterTools(iaTools, { category: 'Vidéo', pricing: '', query: '' }).length, 7);
    assert.deepEqual(
      filterTools(iaTools, { category: 'Vidéo', pricing: 'Payant', query: '' }).map((tool) => tool.name),
      ['Veo', 'Luma AI']
    );
  });

  t('filtres : la recherche couvre catégorie, tarif et fonctions', () => {
    assert.ok(filterTools(iaTools, { category: '', pricing: '', query: 'ethique' }).some((tool) => tool.name === 'Auditeur de biais'));
    assert.equal(filterTools(iaTools, { category: '', pricing: '', query: 'payant' }).length, 15);
    assert.ok(filterTools(iaTools, { category: '', pricing: '', query: 'export csv' }).length >= 3);
    assert.ok(filterTools(iaTools, { category: '', pricing: '', query: 'video' }).some((tool) => tool.name === 'Runway'));
  });

  t('filtres : une valeur inconnue de l\'URL est ignorée', () => {
    assert.equal(readToolFilter('Vidéo', ['Vidéo']), 'Vidéo');
    assert.equal(readToolFilter('Inconnue', ['Vidéo']), '');
    assert.equal(readToolFilter(null, ['Vidéo']), '');
  });
}

console.log(`${ok} test(s) réussi(s), ${failed} échec(s)`);
process.exit(failed ? 1 : 0);
