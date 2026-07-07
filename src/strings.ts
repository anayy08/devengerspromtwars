import type { ComplaintStatus, Severity } from './types';

export interface UIStrings {
  appName: string;
  tagline: string;
  fileTab: string;
  trackerTab: string;
  dashboardTab: string;
  heroTitle: string;
  heroSubtitle: string;
  heroPoints: string[];
  describeLabel: string;
  cityLabel: string;
  nameLabel: string;
  submitBtn: string;
  charCount: string;
  minChars: string;
  analyzing: string;
  copyBtn: string;
  copied: string;
  emailBtn: string;
  saveToTracker: string;
  saved: string;
  englishTab: string;
  hindiTab: string;
  filingTab: string;
  escalationTab: string;
  escalateBtn: string;
  generateRTI: string;
  rtiIntro: string; // contains {category} placeholder
  tryExamples: string;
  examples: string[];
  error: string;
  missingKeyError: string;
  retryBtn: string;
  noComplaints: string;
  fileFirstBtn: string;
  dayAgo: string;
  daysAgo: string;
  pastSLA: string;
  status: string;
  department: string;
  severity: string;
  rtiTitle: string;
  totalComplaints: string;
  resolved: string;
  pending: string;
  avgDays: string;
  byCategory: string;
  primaryChannel: string;
  portalApp: string;
  howToFile: string;
  expectedSLA: string;
  severityAssessment: string;
  unknownArea: string;
  clickToChangeStatus: string;
  deleteComplaint: string;
  confirmDelete: string;
  closeLabel: string;
  langToggleLabel: string;
  dashEmpty: string;
  footerNote: string;
  statusLabels: Record<ComplaintStatus, string>;
  severityLabels: Record<Severity, string>;
}

const en: UIStrings = {
  appName: 'NagrikSetu',
  tagline: 'Your Civic Complaint Companion',
  fileTab: 'File Complaint',
  trackerTab: 'My Complaints',
  dashboardTab: 'Area Dashboard',
  heroTitle: 'Raise your voice. We handle the paperwork.',
  heroSubtitle:
    'Describe any civic problem in your own words — NagrikSetu identifies the right department, drafts a formal complaint in English and Hindi, and tells you exactly where to file it.',
  heroPoints: ['AI-drafted formal letters', 'Right department, right portal', 'Track & escalate with RTI'],
  describeLabel: 'Describe your problem like you’d tell a neighbor…',
  cityLabel: 'City / Area',
  nameLabel: 'Your Name (optional)',
  submitBtn: 'Analyze & Draft Complaint',
  charCount: 'characters',
  minChars: 'Minimum 20 characters required',
  analyzing: 'Classifying your complaint and drafting formal letters…',
  copyBtn: 'Copy',
  copied: 'Copied!',
  emailBtn: 'Email Draft',
  saveToTracker: 'Save to Tracker',
  saved: 'Saved!',
  englishTab: 'English Draft',
  hindiTab: 'हिन्दी Draft',
  filingTab: 'Where to File',
  escalationTab: 'Escalation Path',
  escalateBtn: 'Escalate',
  generateRTI: 'Generate RTI Application',
  rtiIntro:
    'Generate an RTI application for your “{category}” complaint to legally demand accountability under the RTI Act, 2005.',
  tryExamples: 'Try an example:',
  examples: [
    'Streetlight broken outside my house for 3 weeks, and garbage is piling up at the corner',
    'Water supply comes only 1 hour a day in our colony since last month',
    'Open manhole near the school gate, very dangerous for kids',
  ],
  error: 'Something went wrong. Please try again.',
  missingKeyError: 'AI provider is not configured. Please add an API key in .env.local (see .env.example).',
  retryBtn: 'Retry',
  noComplaints: 'No complaints tracked yet. File one to get started!',
  fileFirstBtn: 'File your first complaint',
  dayAgo: 'day ago',
  daysAgo: 'days ago',
  pastSLA: 'Past expected resolution time — escalate?',
  status: 'Status',
  department: 'Department',
  severity: 'Severity',
  rtiTitle: 'RTI Application Draft',
  totalComplaints: 'Total Complaints',
  resolved: 'Resolved',
  pending: 'Pending',
  avgDays: 'Avg. Days to Resolve',
  byCategory: 'By Category',
  primaryChannel: 'Primary Channel',
  portalApp: 'Portal / App',
  howToFile: 'How to File',
  expectedSLA: 'Expected SLA',
  severityAssessment: 'Severity Assessment',
  unknownArea: 'Unknown area',
  clickToChangeStatus: 'Click to change status',
  deleteComplaint: 'Delete complaint',
  confirmDelete: 'Delete this complaint from your tracker? This cannot be undone.',
  closeLabel: 'Close',
  langToggleLabel: 'Switch language to Hindi',
  dashEmpty: 'No data yet — file and track complaints to see area statistics here.',
  footerNote: 'Made for the citizens of India · Your data stays in your browser',
  statusLabels: {
    Drafted: 'Drafted',
    Filed: 'Filed',
    Acknowledged: 'Acknowledged',
    Resolved: 'Resolved',
    Ignored: 'Ignored',
  },
  severityLabels: {
    Low: 'Low',
    Medium: 'Medium',
    High: 'High',
    Critical: 'Critical',
  },
};

const hi: UIStrings = {
  appName: 'नागरिकसेतु',
  tagline: 'आपका नागरिक शिकायत साथी',
  fileTab: 'शिकायत दर्ज करें',
  trackerTab: 'मेरी शिकायतें',
  dashboardTab: 'क्षेत्र डैशबोर्ड',
  heroTitle: 'आवाज़ आपकी। कागज़ी कार्रवाई हमारी।',
  heroSubtitle:
    'अपनी नागरिक समस्या अपने शब्दों में बताइए — नागरिकसेतु सही विभाग पहचानता है, अंग्रेज़ी और हिन्दी में औपचारिक शिकायत तैयार करता है, और बताता है कि उसे कहाँ दर्ज करना है।',
  heroPoints: [
    'AI द्वारा तैयार औपचारिक पत्र',
    'सही विभाग, सही पोर्टल',
    'RTI के साथ ट्रैक और एस्केलेट करें',
  ],
  describeLabel: 'अपनी समस्या ऐसे बताइए जैसे पड़ोसी को बताते…',
  cityLabel: 'शहर / क्षेत्र',
  nameLabel: 'आपका नाम (वैकल्पिक)',
  submitBtn: 'विश्लेषण कर शिकायत तैयार करें',
  charCount: 'अक्षर',
  minChars: 'न्यूनतम 20 अक्षर आवश्यक',
  analyzing: 'आपकी शिकायत का विश्लेषण और पत्र तैयार हो रहे हैं…',
  copyBtn: 'कॉपी करें',
  copied: 'कॉपी हो गया!',
  emailBtn: 'ईमेल ड्राफ्ट',
  saveToTracker: 'ट्रैकर में सेव करें',
  saved: 'सेव हो गया!',
  englishTab: 'English ड्राफ्ट',
  hindiTab: 'हिन्दी ड्राफ्ट',
  filingTab: 'कहाँ दर्ज करें',
  escalationTab: 'एस्केलेशन पथ',
  escalateBtn: 'एस्केलेट करें',
  generateRTI: 'RTI आवेदन तैयार करें',
  rtiIntro:
    'सूचना का अधिकार अधिनियम, 2005 के तहत जवाबदेही माँगने के लिए अपनी “{category}” शिकायत का RTI आवेदन तैयार करें।',
  tryExamples: 'उदाहरण आज़माएँ:',
  examples: [
    'मेरे घर के बाहर की स्ट्रीटलाइट 3 हफ़्तों से खराब है और नुक्कड़ पर कचरा जमा हो रहा है',
    'पिछले महीने से हमारी कॉलोनी में पानी दिन में सिर्फ़ 1 घंटा आता है',
    'स्कूल गेट के पास खुला मैनहोल है, बच्चों के लिए बहुत खतरनाक',
  ],
  error: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।',
  missingKeyError: 'AI सेवा कॉन्फ़िगर नहीं है। कृपया .env.local में API key जोड़ें (.env.example देखें)।',
  retryBtn: 'पुनः प्रयास',
  noComplaints: 'अभी कोई शिकायत ट्रैक नहीं है। शुरू करने के लिए एक दर्ज करें!',
  fileFirstBtn: 'अपनी पहली शिकायत दर्ज करें',
  dayAgo: 'दिन पहले',
  daysAgo: 'दिन पहले',
  pastSLA: 'अपेक्षित समाधान समय बीत चुका — एस्केलेट करें?',
  status: 'स्थिति',
  department: 'विभाग',
  severity: 'गंभीरता',
  rtiTitle: 'RTI आवेदन ड्राफ्ट',
  totalComplaints: 'कुल शिकायतें',
  resolved: 'समाधान हुआ',
  pending: 'लंबित',
  avgDays: 'औसत समाधान दिन',
  byCategory: 'श्रेणी अनुसार',
  primaryChannel: 'मुख्य माध्यम',
  portalApp: 'पोर्टल / ऐप',
  howToFile: 'दर्ज करने का तरीका',
  expectedSLA: 'अपेक्षित समयसीमा',
  severityAssessment: 'गंभीरता आकलन',
  unknownArea: 'अज्ञात क्षेत्र',
  clickToChangeStatus: 'स्थिति बदलने के लिए क्लिक करें',
  deleteComplaint: 'शिकायत हटाएँ',
  confirmDelete: 'क्या आप यह शिकायत ट्रैकर से हटाना चाहते हैं? यह वापस नहीं हो सकेगा।',
  closeLabel: 'बंद करें',
  langToggleLabel: 'Switch language to English',
  dashEmpty: 'अभी कोई डेटा नहीं — क्षेत्र के आँकड़े देखने के लिए शिकायतें दर्ज और ट्रैक करें।',
  footerNote: 'भारत के नागरिकों के लिए बनाया गया · आपका डेटा आपके ब्राउज़र में ही रहता है',
  statusLabels: {
    Drafted: 'ड्राफ्ट तैयार',
    Filed: 'दर्ज',
    Acknowledged: 'स्वीकृत',
    Resolved: 'समाधान हुआ',
    Ignored: 'अनदेखा',
  },
  severityLabels: {
    Low: 'निम्न',
    Medium: 'मध्यम',
    High: 'उच्च',
    Critical: 'गंभीर',
  },
};

const strings: Record<'en' | 'hi', UIStrings> = { en, hi };

export type StringKey = keyof UIStrings;
export { strings };
