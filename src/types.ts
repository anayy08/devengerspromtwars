export type UILanguage = 'en' | 'hi' | 'ta' | 'bn' | 'pa';

export interface IssueChannel {
  primaryEnglish: string;
  primaryRegional: string;
  portalName: string;
  howToFileEnglish: string;
  howToFileRegional: string;
}

export interface EscalationStep {
  step: number;
  actionEnglish: string;
  actionRegional: string;
  whenToUseEnglish: string;
  whenToUseRegional: string;
}

export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

/**
 * One classified civic issue. Every user-facing field exists in an
 * English + regional-language pair; `regionalLang` records which language
 * the regional fields were generated in (Hindi when the UI is English).
 */
export interface ClassifiedIssue {
  category: string;
  categoryRegional: string;
  department: string;
  departmentRegional: string;
  departmentReasoningEnglish: string;
  departmentReasoningRegional: string;
  severity: Severity;
  severityReasoningEnglish: string;
  severityReasoningRegional: string;
  channel: IssueChannel;
  expectedSLAEnglish: string;
  expectedSLARegional: string;
  complaintDraftEnglish: string;
  complaintDraftRegional: string;
  escalationLadder: EscalationStep[];
  regionalLang: UILanguage;
}

export interface ClassificationResponse {
  issues: ClassifiedIssue[];
}

export type ComplaintStatus = 'Drafted' | 'Filed' | 'Acknowledged' | 'Resolved' | 'Ignored';

export interface SavedComplaint {
  id: string;
  issue: ClassifiedIssue;
  area: string;
  name: string;
  originalText: string;
  status: ComplaintStatus;
  dateFiled: string;
  statusHistory: Array<{ status: ComplaintStatus; date: string }>;
}

export interface RTIApplication {
  draftEnglish: string;
  draftRegional: string;
  regionalLang: UILanguage;
}

export type AppTab = 'file' | 'tracker' | 'dashboard';
