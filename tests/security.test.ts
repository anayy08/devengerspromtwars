import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('local secret files are excluded from version control', () => {
  const gitignore = readFileSync('.gitignore', 'utf8');

  assert.match(gitignore, /^\.env$/m);
  assert.match(gitignore, /^\*\.local$/m);
});

test('documentation warns that client-side VITE keys are public', () => {
  const readme = readFileSync('README.md', 'utf8');

  assert.match(readme, /VITE_\*/);
  assert.match(readme, /visible to anyone in DevTools/i);
  assert.match(readme, /proxy the AI calls through a minimal backend/i);
});
