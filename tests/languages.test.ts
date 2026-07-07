import test from 'node:test';
import assert from 'node:assert/strict';
import { LANGUAGES, isUILanguage, localized, regionalFor } from '../src/lib/languages.ts';

test('supported language metadata stays complete', () => {
  assert.deepEqual(
    LANGUAGES.map((language) => language.code),
    ['en', 'hi', 'ta', 'bn', 'pa'],
  );
  assert.equal(isUILanguage('ta'), true);
  assert.equal(isUILanguage('mr'), false);
});

test('regional draft language follows selected UI language', () => {
  assert.equal(regionalFor('en'), 'hi');
  assert.equal(regionalFor('hi'), 'hi');
  assert.equal(regionalFor('ta'), 'ta');
  assert.equal(regionalFor('bn'), 'bn');
  assert.equal(regionalFor('pa'), 'pa');
});

test('localized fields only show regional text when it matches current language', () => {
  assert.equal(localized('Water Supply', 'நீர் விநியோகம்', 'ta', 'ta'), 'நீர் விநியோகம்');
  assert.equal(localized('Water Supply', 'जल आपूर्ति', 'hi', 'ta'), 'Water Supply');
  assert.equal(localized('', 'জল সরবরাহ', 'bn', 'bn'), 'জল সরবরাহ');
});
