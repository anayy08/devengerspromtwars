import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeClassification, normalizeIssue, normalizeRTI } from '../src/lib/ai-normalization.ts';

test('normalizes modern regional AI response into render-safe issue data', () => {
  const issue = normalizeIssue({
    category: 'Road Safety',
    categoryRegional: 'சாலை பாதுகாப்பு',
    department: 'Municipal Corporation',
    departmentRegional: 'மாநகராட்சி',
    severity: 'Critical',
    channel: {
      primaryEnglish: 'Municipal portal',
      primaryRegional: 'மாநகராட்சி தளம்',
      portalName: 'City Portal',
      howToFileEnglish: 'Upload photo and submit',
      howToFileRegional: 'புகைப்படத்தை பதிவேற்றி சமர்ப்பிக்கவும்',
    },
    complaintDraftEnglish: 'English draft',
    complaintDraftRegional: 'தமிழ் வரைவு',
    escalationLadder: [
      {
        actionEnglish: 'Follow up',
        actionRegional: 'தொடர்ந்து கேளுங்கள்',
        whenToUseEnglish: 'After 7 days',
        whenToUseRegional: '7 நாட்களுக்கு பிறகு',
      },
    ],
  }, 'ta');

  assert.equal(issue.regionalLang, 'ta');
  assert.equal(issue.categoryRegional, 'சாலை பாதுகாப்பு');
  assert.equal(issue.severity, 'Critical');
  assert.equal(issue.channel.primaryRegional, 'மாநகராட்சி தளம்');
  assert.equal(issue.escalationLadder[0].step, 1);
});

test('legacy Hindi-shaped AI response remains backward compatible', () => {
  const issue = normalizeIssue({
    severity: 'Unexpected',
    departmentReasoningHindi: 'पुराना कारण',
    channel: { primaryHindi: 'पुराना चैनल' },
    complaintDraftHindi: 'पुराना ड्राफ्ट',
  }, 'hi');

  assert.equal(issue.severity, 'Medium');
  assert.equal(issue.departmentReasoningRegional, 'पुराना कारण');
  assert.equal(issue.channel.primaryRegional, 'पुराना चैनल');
  assert.equal(issue.complaintDraftRegional, 'पुराना ड्राफ्ट');
});

test('classification and RTI normalization fail loudly on unusable AI payloads', () => {
  assert.throws(() => normalizeClassification({ issues: [] }, 'bn'), /no issues/i);
  assert.throws(() => normalizeRTI({}, 'pa'), /empty RTI/i);
});

test('classification wrapper preserves selected regional language', () => {
  const result = normalizeClassification({
    issues: [{ category: 'Waste', categoryRegional: 'বর্জ্য', channel: {} }],
  }, 'bn');

  assert.equal(result.issues[0].regionalLang, 'bn');
  assert.equal(result.issues[0].categoryRegional, 'বর্জ্য');
});
