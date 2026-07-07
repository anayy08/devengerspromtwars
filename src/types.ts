export interface IssueChannel {
  primary: string;
  portalName: string;
  howToFile: string;
}

export interface EscalationStep {
  step: number;
  action: string;
  whenToUse: string;
}

export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface ClassifiedIssue {
  category: string;
  department: string;
  departmentReasoning: string;
  severity: Severity;
  severityReasoning: string;
  channel: IssueChannel;
  expectedSLA: string;
  complaintDraftEnglish: string;
  complaintDraftHindi: string;
  escalationLadder: EscalationStep[];
  photoObservations?: string;
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
  draftHindi: string;
}

export type AppTab = 'file' | 'tracker' | 'dashboard';
export type UILanguage = 'en' | 'hi';
