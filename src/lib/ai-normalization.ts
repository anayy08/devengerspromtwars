import type {
  ClassificationResponse,
  ClassifiedIssue,
  EscalationStep,
  RTIApplication,
  Severity,
  UILanguage,
} from '../types.ts';
import { isUILanguage } from './languages.ts';

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

const SEVERITIES: Severity[] = ['Low', 'Medium', 'High', 'Critical'];

function asSeverity(value: unknown): Severity {
  return SEVERITIES.includes(value as Severity) ? (value as Severity) : 'Medium';
}

function asPair(english: unknown, regional: unknown, fallback = ''): [string, string] {
  const en = asString(english);
  const re = asString(regional);
  return [en || re || fallback, re || en || fallback];
}

export function normalizeIssue(raw: unknown, defaultRegionalLang: UILanguage = 'hi'): ClassifiedIssue {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const channel = (obj.channel && typeof obj.channel === 'object' ? obj.channel : {}) as Record<string, unknown>;
  const ladderRaw = Array.isArray(obj.escalationLadder) ? obj.escalationLadder : [];
  const regionalLang = isUILanguage(obj.regionalLang) && obj.regionalLang !== 'en'
    ? obj.regionalLang
    : defaultRegionalLang;

  const escalationLadder: EscalationStep[] = ladderRaw.map((step, i) => {
    const s = (step && typeof step === 'object' ? step : {}) as Record<string, unknown>;
    const [actionEnglish, actionRegional] = asPair(s.actionEnglish, s.actionRegional ?? s.actionHindi);
    const [whenToUseEnglish, whenToUseRegional] = asPair(s.whenToUseEnglish, s.whenToUseRegional ?? s.whenToUseHindi);
    return {
      step: typeof s.step === 'number' ? s.step : i + 1,
      actionEnglish,
      actionRegional,
      whenToUseEnglish,
      whenToUseRegional,
    };
  });

  const [category, categoryRegional] = asPair(obj.category, obj.categoryRegional, 'General Civic Issue');
  const [department, departmentRegional] = asPair(obj.department, obj.departmentRegional, 'Municipal Corporation');
  const [departmentReasoningEnglish, departmentReasoningRegional] = asPair(
    obj.departmentReasoningEnglish, obj.departmentReasoningRegional ?? obj.departmentReasoningHindi,
  );
  const [severityReasoningEnglish, severityReasoningRegional] = asPair(
    obj.severityReasoningEnglish, obj.severityReasoningRegional ?? obj.severityReasoningHindi,
  );
  const [expectedSLAEnglish, expectedSLARegional] = asPair(
    obj.expectedSLAEnglish, obj.expectedSLARegional ?? obj.expectedSLAHindi, '7-15 working days',
  );
  const [primaryEnglish, primaryRegional] = asPair(
    channel.primaryEnglish, channel.primaryRegional ?? channel.primaryHindi, 'Local municipal office',
  );
  const [howToFileEnglish, howToFileRegional] = asPair(
    channel.howToFileEnglish, channel.howToFileRegional ?? channel.howToFileHindi, '-',
  );
  const [complaintDraftEnglish, complaintDraftRegional] = asPair(
    obj.complaintDraftEnglish, obj.complaintDraftRegional ?? obj.complaintDraftHindi,
  );

  return {
    category,
    categoryRegional,
    department,
    departmentRegional,
    departmentReasoningEnglish,
    departmentReasoningRegional,
    severity: asSeverity(obj.severity),
    severityReasoningEnglish,
    severityReasoningRegional,
    channel: {
      primaryEnglish,
      primaryRegional,
      portalName: asString(channel.portalName, '-'),
      howToFileEnglish,
      howToFileRegional,
    },
    expectedSLAEnglish,
    expectedSLARegional,
    complaintDraftEnglish,
    complaintDraftRegional,
    escalationLadder,
    regionalLang,
  };
}

export function normalizeClassification(raw: unknown, regionalLang: UILanguage): ClassificationResponse {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const issues = Array.isArray(obj.issues) ? obj.issues : [];
  if (issues.length === 0) {
    throw new Error('AI returned no issues for this complaint');
  }
  return { issues: issues.map((issue) => normalizeIssue(issue, regionalLang)) };
}

export function normalizeRTI(raw: unknown, regionalLang: UILanguage): RTIApplication {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const [draftEnglish, draftRegional] = asPair(obj.draftEnglish, obj.draftRegional ?? obj.draftHindi);
  if (!draftEnglish && !draftRegional) {
    throw new Error('AI returned an empty RTI draft');
  }
  return { draftEnglish, draftRegional, regionalLang };
}
