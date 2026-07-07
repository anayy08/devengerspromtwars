import test from 'node:test';
import assert from 'node:assert/strict';
import { strings, type UIStrings } from '../src/strings.ts';
import { LANGUAGES } from '../src/lib/languages.ts';

const LANG_CODES = LANGUAGES.map((l) => l.code);

/** Recursively assert every leaf string in a translation object is non-empty. */
function assertNoEmptyLeaves(value: unknown, path: string): void {
  if (typeof value === 'string') {
    assert.notEqual(value.trim(), '', `empty translation at ${path}`);
    return;
  }
  if (Array.isArray(value)) {
    assert.ok(value.length > 0, `empty array at ${path}`);
    value.forEach((item, i) => assertNoEmptyLeaves(item, `${path}[${i}]`));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      assertNoEmptyLeaves(child, `${path}.${key}`);
    }
  }
}

test('every supported language has a complete translation table', () => {
  assert.deepEqual(Object.keys(strings).sort(), [...LANG_CODES].sort());

  const referenceKeys = Object.keys(strings.en).sort();
  for (const code of LANG_CODES) {
    const table: UIStrings = strings[code];
    assert.deepEqual(
      Object.keys(table).sort(),
      referenceKeys,
      `strings.${code} is missing or adding keys vs strings.en`,
    );
    assertNoEmptyLeaves(table, `strings.${code}`);
  }
});

test('template strings keep their runtime placeholders in every language', () => {
  for (const code of LANG_CODES) {
    const t = strings[code];
    assert.ok(t.regionalDraftTab.includes('{lang}'), `strings.${code}.regionalDraftTab lost {lang}`);
    assert.ok(t.rtiIntro.includes('{category}'), `strings.${code}.rtiIntro lost {category}`);
  }
});

test('status and severity labels cover every enum value in every language', () => {
  const statuses = ['Drafted', 'Filed', 'Acknowledged', 'Resolved', 'Ignored'] as const;
  const severities = ['Low', 'Medium', 'High', 'Critical'] as const;
  for (const code of LANG_CODES) {
    const t = strings[code];
    for (const s of statuses) assert.ok(t.statusLabels[s], `strings.${code}.statusLabels.${s}`);
    for (const s of severities) assert.ok(t.severityLabels[s], `strings.${code}.severityLabels.${s}`);
  }
});

test('each language ships localized intake examples', () => {
  for (const code of LANG_CODES) {
    assert.ok(strings[code].examples.length >= 3, `strings.${code}.examples has fewer than 3 examples`);
  }
});

test('landing page content is complete in every language', () => {
  for (const code of LANG_CODES) {
    const landing = strings[code].landing;
    assert.equal(landing.howSteps.length, 3, `strings.${code}.landing.howSteps`);
    assert.equal(landing.missionPoints.length, 3, `strings.${code}.landing.missionPoints`);
    assert.equal(landing.tools.length, 4, `strings.${code}.landing.tools`);
    assert.ok(landing.stats.length >= 3, `strings.${code}.landing.stats`);
  }
});
