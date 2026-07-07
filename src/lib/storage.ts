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
    departmentReasoningEnglish: 'Street lighting falls under the electrical wing of the municipal corporation.',
    departmentReasoningHindi: 'स्ट्रीट लाइटिंग नगर निगम के विद्युत विभाग के अंतर्गत आती है।',
    severity: 'Medium',
    severityReasoningEnglish: 'Non-functional streetlight is a safety concern but not immediately life-threatening.',
    severityReasoningHindi: 'खराब स्ट्रीटलाइट सुरक्षा की दृष्टि से चिंताजनक है, लेकिन तत्काल जानलेवा नहीं है।',
    channel: {
      primaryEnglish: 'Municipal portal / ward office',
      primaryHindi: 'नगर निगम पोर्टल / वार्ड कार्यालय',
      portalName: 'City Municipal Portal',
      howToFileEnglish: '1. Visit the municipal corporation website\n2. Register a complaint under "Street Lighting"\n3. Note the complaint reference number',
      howToFileHindi: '1. नगर निगम की वेबसाइट पर जाएँ\n2. "स्ट्रीट लाइटिंग" के अंतर्गत शिकायत दर्ज करें\n3. शिकायत संदर्भ संख्या नोट कर लें',
    },
    expectedSLAEnglish: '7–15 working days',
    expectedSLAHindi: '7–15 कार्य दिवस',
    complaintDraftEnglish: 'Subject: Non-functional Streetlight — Urgent Attention Required\n\nRespected Sir/Madam,\n\nI wish to bring to your kind attention that the streetlight near [YOUR ADDRESS] has not been functional for the past 3 weeks. This has caused significant inconvenience and safety concerns for residents.\n\nI kindly request immediate action to repair the said streetlight.\n\nYours faithfully,\n[YOUR NAME]',
    complaintDraftHindi: 'विषय: खराब स्ट्रीटलाइट — तत्काल ध्यान आवश्यक\n\nमाननीय महोदय/महोदया,\n\nमैं आपका ध्यान आकर्षित करना चाहता हूँ कि [YOUR ADDRESS] के पास स्ट्रीटलाइट पिछले 3 सप्ताह से खराब है। इससे निवासियों को काफ़ी असुविधा और सुरक्षा संबंधी चिंता हो रही है।\n\nकृपया उक्त स्ट्रीटलाइट की मरम्मत के लिए तत्काल कार्रवाई करें।\n\nभवदीय,\n[YOUR NAME]',
    escalationLadder: [
      { step: 1, actionEnglish: 'Follow up with the ward office in person', actionHindi: 'वार्ड कार्यालय में व्यक्तिगत रूप से फॉलो-अप करें', whenToUseEnglish: 'After 7 days of no response', whenToUseHindi: '7 दिनों तक कोई जवाब न मिलने पर' },
      { step: 2, actionEnglish: 'Write to the Municipal Commissioner', actionHindi: 'नगर आयुक्त को पत्र लिखें', whenToUseEnglish: 'After 15 days of no action', whenToUseHindi: '15 दिनों तक कोई कार्रवाई न होने पर' },
      { step: 3, actionEnglish: 'File complaint on CPGRAMS', actionHindi: 'CPGRAMS पर शिकायत दर्ज करें', whenToUseEnglish: 'If local channels fail', whenToUseHindi: 'यदि स्थानीय माध्यम विफल हो जाएँ' },
      { step: 4, actionEnglish: 'File RTI under RTI Act 2005', actionHindi: 'RTI अधिनियम 2005 के तहत RTI दाखिल करें', whenToUseEnglish: 'To legally demand accountability', whenToUseHindi: 'जवाबदेही की कानूनी माँग के लिए' },
    ],
    ...overrides,
  });

  const seeds: SavedComplaint[] = [
    {
      id: generateId(),
      issue: seedIssue({
        category: 'Water Supply',
        department: 'Municipal Corporation — Water Works Division',
        departmentReasoningEnglish: 'Water supply issues are managed by the Water Works Division.',
        departmentReasoningHindi: 'जल आपूर्ति संबंधी समस्याएँ जल कार्य प्रभाग द्वारा संभाली जाती हैं।',
        severity: 'High',
        severityReasoningEnglish: 'Inadequate water supply directly impacts daily life and health.',
        severityReasoningHindi: 'अपर्याप्त जल आपूर्ति सीधे दैनिक जीवन और स्वास्थ्य को प्रभावित करती है।',
        expectedSLAEnglish: '3–7 working days',
        expectedSLAHindi: '3–7 कार्य दिवस',
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
        severityReasoningEnglish: 'Open manhole near a school poses immediate danger to children.',
        severityReasoningHindi: 'स्कूल के पास खुला मैनहोल बच्चों के लिए तत्काल खतरा है।',
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
        departmentReasoningEnglish: 'Garbage collection falls under the Sanitation Wing.',
        departmentReasoningHindi: 'कचरा संग्रहण स्वच्छता विभाग के अंतर्गत आता है।',
        severity: 'Medium',
        channel: {
          primaryEnglish: 'Swachhata App / Municipal portal',
          primaryHindi: 'स्वच्छता ऐप / नगर निगम पोर्टल',
          portalName: 'Swachhata App',
          howToFileEnglish: '1. Download the Swachhata App\n2. Upload photo of garbage pile\n3. Pin location and submit',
          howToFileHindi: '1. स्वच्छता ऐप डाउनलोड करें\n2. कचरे के ढेर की फ़ोटो अपलोड करें\n3. स्थान पिन करें और सबमिट करें',
        },
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
