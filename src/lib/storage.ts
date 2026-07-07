import type { SavedComplaint, ComplaintStatus, ClassifiedIssue } from '../types';

const STORAGE_KEY = 'nagriksetu-complaints';
const SEEDED_KEY = 'nagriksetu-seeded';

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function getComplaints(): SavedComplaint[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveComplaint(complaint: SavedComplaint): void {
  const complaints = getComplaints();
  complaints.unshift(complaint);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
}

export function updateComplaintStatus(id: string, status: ComplaintStatus): void {
  const complaints = getComplaints();
  const idx = complaints.findIndex(c => c.id === id);
  if (idx !== -1) {
    complaints[idx].status = status;
    complaints[idx].statusHistory.push({ status, date: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  }
}

export function deleteComplaint(id: string): void {
  const complaints = getComplaints().filter(c => c.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
}

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

/** Seed localStorage with demo complaints on first load */
export function seedIfNeeded(): void {
  if (localStorage.getItem(SEEDED_KEY)) return;

  const seedIssue = (overrides: Partial<ClassifiedIssue>): ClassifiedIssue => ({
    category: 'Street Lighting',
    department: 'Municipal Corporation — Electrical Wing',
    departmentReasoning: 'Street lighting falls under the electrical wing of the municipal corporation.',
    severity: 'Medium',
    severityReasoning: 'Non-functional streetlight is a safety concern but not immediately life-threatening.',
    channel: { primary: 'Municipal portal / ward office', portalName: 'City Municipal Portal', howToFile: '1. Visit the municipal corporation website\n2. Register a complaint under "Street Lighting"\n3. Note the complaint reference number' },
    expectedSLA: '7–15 working days',
    complaintDraftEnglish: 'Subject: Non-functional Streetlight — Urgent Attention Required\n\nRespected Sir/Madam,\n\nI wish to bring to your kind attention that the streetlight near [YOUR ADDRESS] has not been functional for the past 3 weeks. This has caused significant inconvenience and safety concerns for residents.\n\nI kindly request immediate action to repair the said streetlight.\n\nYours faithfully,\n[YOUR NAME]',
    complaintDraftHindi: 'विषय: खराब स्ट्रीटलाइट — तत्काल ध्यान आवश्यक\n\nमाननीय महोदय/महोदया,\n\nमैं आपका ध्यान आकर्षित करना चाहता हूँ कि [YOUR ADDRESS] के पास स्ट्रीटलाइट पिछले 3 सप्ताह से खराब है। इससे निवासियों को काफ़ी असुविधा और सुरक्षा संबंधी चिंता हो रही है।\n\nकृपया उक्त स्ट्रीटलाइट की मरम्मत के लिए तत्काल कार्रवाई करें।\n\nभवदीय,\n[YOUR NAME]',
    escalationLadder: [
      { step: 1, action: 'Follow up with the ward office in person', whenToUse: 'After 7 days of no response' },
      { step: 2, action: 'Write to the Municipal Commissioner', whenToUse: 'After 15 days of no action' },
      { step: 3, action: 'File complaint on CPGRAMS', whenToUse: 'If local channels fail' },
      { step: 4, action: 'File RTI under RTI Act 2005', whenToUse: 'To legally demand accountability' },
    ],
    ...overrides,
  });

  const seeds: SavedComplaint[] = [
    {
      id: generateId(),
      issue: seedIssue({
        category: 'Water Supply',
        department: 'Municipal Corporation — Water Works Division',
        departmentReasoning: 'Water supply issues are managed by the Water Works Division.',
        severity: 'High',
        severityReasoning: 'Inadequate water supply directly impacts daily life and health.',
        expectedSLA: '3–7 working days',
      }),
      area: 'Sector 15, Noida',
      name: 'Rajesh Kumar',
      originalText: 'Water supply comes only 1 hour a day in our colony since last month',
      status: 'Filed',
      dateFiled: daysAgo(18),
      statusHistory: [
        { status: 'Drafted', date: daysAgo(18) },
        { status: 'Filed', date: daysAgo(17) },
      ],
    },
    {
      id: generateId(),
      issue: seedIssue({
        category: 'Road Safety',
        department: 'Municipal Corporation — Roads & Infrastructure',
        severity: 'Critical',
        severityReasoning: 'Open manhole near a school poses immediate danger to children.',
      }),
      area: 'Lajpat Nagar, Delhi',
      name: 'Priya Sharma',
      originalText: 'Open manhole near the school gate, very dangerous for kids',
      status: 'Acknowledged',
      dateFiled: daysAgo(5),
      statusHistory: [
        { status: 'Drafted', date: daysAgo(5) },
        { status: 'Filed', date: daysAgo(5) },
        { status: 'Acknowledged', date: daysAgo(3) },
      ],
    },
    {
      id: generateId(),
      issue: seedIssue({
        category: 'Solid Waste Management',
        department: 'Municipal Corporation — Sanitation Wing',
        departmentReasoning: 'Garbage collection falls under the Sanitation Wing.',
        severity: 'Medium',
        channel: { primary: 'Swachhata App / Municipal portal', portalName: 'Swachhata App', howToFile: '1. Download the Swachhata App\n2. Upload photo of garbage pile\n3. Pin location and submit' },
      }),
      area: 'Koramangala, Bengaluru',
      name: 'Arun Nair',
      originalText: 'Garbage not collected for over 2 weeks, pile growing at the street corner',
      status: 'Resolved',
      dateFiled: daysAgo(25),
      statusHistory: [
        { status: 'Drafted', date: daysAgo(25) },
        { status: 'Filed', date: daysAgo(24) },
        { status: 'Acknowledged', date: daysAgo(20) },
        { status: 'Resolved', date: daysAgo(12) },
      ],
    },
  ];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(seeds));
  localStorage.setItem(SEEDED_KEY, 'true');
}
