import test from 'node:test';
import assert from 'node:assert/strict';
import { daysElapsed, parseSLADays } from '../src/lib/sla.ts';

test('SLA ranges resolve to their upper bound in days', () => {
  assert.equal(parseSLADays('7–15 working days'), 15);
  assert.equal(parseSLADays('3-7 working days'), 7);
  assert.equal(parseSLADays('30 days'), 30);
});

test('hour-based SLAs convert to whole days instead of being misread', () => {
  assert.equal(parseSLADays('48 hours'), 2);
  assert.equal(parseSLADays('24 hours'), 1);
  assert.equal(parseSLADays('12 hours'), 1); // never less than one day
  assert.equal(parseSLADays('72 घंटे'), 3); // Hindi hour word
});

test('unparseable SLA text falls back to a sane default', () => {
  assert.equal(parseSLADays('as per citizen charter'), 15);
  assert.equal(parseSLADays(''), 15);
});

test('daysElapsed counts whole days and never goes negative', () => {
  const now = Date.UTC(2026, 6, 7); // 2026-07-07
  assert.equal(daysElapsed(new Date(Date.UTC(2026, 6, 2)).toISOString(), now), 5);
  assert.equal(daysElapsed(new Date(Date.UTC(2026, 6, 6, 23)).toISOString(), now), 0);
  // A clock skew putting dateFiled in the future must not produce -1 days
  assert.equal(daysElapsed(new Date(Date.UTC(2026, 6, 8)).toISOString(), now), 0);
});
