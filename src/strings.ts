import type { ComplaintStatus, Severity, UILanguage } from './types';

export interface LandingStrings {
  navHome: string;
  navTools: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Array<{ value: string; label: string }>;
  howTitle: string;
  howSubtitle: string;
  howSteps: Array<{ title: string; desc: string }>;
  toolsTitle: string;
  toolsSubtitle: string;
  openTool: string;
  comingSoon: string;
  tools: Array<{ name: string; desc: string }>;
  missionTitle: string;
  missionPoints: Array<{ title: string; desc: string }>;
  backToTools: string;
}

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
  /** Contains a {lang} placeholder replaced with the draft's native language name */
  regionalDraftTab: string;
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
  landing: LandingStrings;
}

const en: UIStrings = {
  appName: 'NagrikSetu',
  tagline: 'Your Civic Companion',
  fileTab: 'File Complaint',
  trackerTab: 'My Complaints',
  dashboardTab: 'Area Dashboard',
  heroTitle: 'Raise your voice. We handle the paperwork.',
  heroSubtitle:
    'Describe any civic problem in your own words — NagrikSetu identifies the right department, drafts a formal complaint in English and your language, and tells you exactly where to file it.',
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
  regionalDraftTab: '{lang} Draft',
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
  langToggleLabel: 'Change language',
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
  landing: {
    navHome: 'Home',
    navTools: 'Tools',
    heroBadge: 'GenAI-powered civic platform',
    heroTitle: 'Governance that listens — in your language.',
    heroSubtitle:
      'NagrikSetu turns everyday problems into formal government action. Describe an issue the way you’d tell a neighbor; our AI finds the right department, writes the official letters, and walks you through filing, tracking and escalating — all the way to an RTI.',
    ctaPrimary: 'File a complaint now',
    ctaSecondary: 'Explore tools',
    stats: [
      { value: '5', label: 'Interface languages' },
      { value: '2', label: 'Languages in every draft' },
      { value: '4+', label: 'Escalation steps mapped' },
      { value: '0', label: 'Servers storing your data' },
    ],
    howTitle: 'How it works',
    howSubtitle: 'From a sentence to a filed complaint in three steps.',
    howSteps: [
      { title: 'Describe the problem', desc: 'Type it like you’d tell a neighbor — plain words, any of our supported languages.' },
      { title: 'AI does the paperwork', desc: 'Department, severity, the right portal, and formal letters in English plus your language.' },
      { title: 'File, track, escalate', desc: 'Save to your tracker, watch SLA deadlines, and generate an RTI application if ignored.' },
    ],
    toolsTitle: 'Citizen tools',
    toolsSubtitle: 'One platform, purpose-built tools for everyday civic life.',
    openTool: 'Open tool',
    comingSoon: 'Coming soon',
    tools: [
      { name: 'Complaint Filer', desc: 'Report civic issues and get formal, ready-to-file complaint letters with the exact department, portal and escalation path.' },
      { name: 'Scheme Finder', desc: 'Personalized recommendations for government schemes you are eligible for.' },
      { name: 'Document Assistant', desc: 'Know exactly which documents you need for any application, and how to get them.' },
      { name: 'Civic Chatbot', desc: 'Ask anything about government services and get plain-language answers.' },
    ],
    missionTitle: 'Built for a smarter Bharat',
    missionPoints: [
      { title: 'Transparency', desc: 'Every complaint knows its department, its deadline, and its escalation path — nothing disappears into a file.' },
      { title: 'Accessibility', desc: 'Formal administrative language, generated from plain speech, in the language you actually think in.' },
      { title: 'Digital inclusion', desc: 'Free, no sign-up, works in any phone browser — and your data never leaves your device.' },
    ],
    backToTools: 'All tools',
  },
};

const hi: UIStrings = {
  appName: 'नागरिकसेतु',
  tagline: 'आपका नागरिक साथी',
  fileTab: 'शिकायत दर्ज करें',
  trackerTab: 'मेरी शिकायतें',
  dashboardTab: 'क्षेत्र डैशबोर्ड',
  heroTitle: 'आवाज़ आपकी। कागज़ी कार्रवाई हमारी।',
  heroSubtitle:
    'अपनी नागरिक समस्या अपने शब्दों में बताइए — नागरिकसेतु सही विभाग पहचानता है, अंग्रेज़ी और आपकी भाषा में औपचारिक शिकायत तैयार करता है, और बताता है कि उसे कहाँ दर्ज करना है।',
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
  regionalDraftTab: '{lang} ड्राफ्ट',
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
  langToggleLabel: 'भाषा बदलें',
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
  landing: {
    navHome: 'होम',
    navTools: 'टूल्स',
    heroBadge: 'GenAI-संचालित नागरिक प्लेटफ़ॉर्म',
    heroTitle: 'ऐसा शासन जो सुनता है — आपकी भाषा में।',
    heroSubtitle:
      'नागरिकसेतु रोज़मर्रा की समस्याओं को औपचारिक सरकारी कार्रवाई में बदलता है। समस्या ऐसे बताइए जैसे पड़ोसी को बताते हैं; हमारा AI सही विभाग ढूँढता है, आधिकारिक पत्र लिखता है, और दर्ज करने, ट्रैक करने और RTI तक एस्केलेट करने में आपका साथ देता है।',
    ctaPrimary: 'अभी शिकायत दर्ज करें',
    ctaSecondary: 'टूल्स देखें',
    stats: [
      { value: '5', label: 'इंटरफ़ेस भाषाएँ' },
      { value: '2', label: 'हर ड्राफ्ट में भाषाएँ' },
      { value: '4+', label: 'एस्केलेशन चरण' },
      { value: '0', label: 'आपका डेटा रखने वाले सर्वर' },
    ],
    howTitle: 'यह कैसे काम करता है',
    howSubtitle: 'एक वाक्य से दर्ज शिकायत तक — तीन चरणों में।',
    howSteps: [
      { title: 'समस्या बताइए', desc: 'ऐसे लिखिए जैसे पड़ोसी को बताते हैं — सरल शब्दों में, किसी भी समर्थित भाषा में।' },
      { title: 'AI कागज़ी कार्रवाई करता है', desc: 'विभाग, गंभीरता, सही पोर्टल, और अंग्रेज़ी + आपकी भाषा में औपचारिक पत्र।' },
      { title: 'दर्ज करें, ट्रैक करें, एस्केलेट करें', desc: 'ट्रैकर में सेव करें, समयसीमा पर नज़र रखें, और अनदेखी होने पर RTI आवेदन बनाएँ।' },
    ],
    toolsTitle: 'नागरिक टूल्स',
    toolsSubtitle: 'एक प्लेटफ़ॉर्म — रोज़मर्रा के नागरिक जीवन के लिए बने टूल्स।',
    openTool: 'टूल खोलें',
    comingSoon: 'जल्द आ रहा है',
    tools: [
      { name: 'शिकायत फ़ाइलर', desc: 'नागरिक समस्याएँ दर्ज करें और सही विभाग, पोर्टल और एस्केलेशन पथ के साथ औपचारिक, दाखिल-योग्य शिकायत पत्र पाएँ।' },
      { name: 'योजना खोजक', desc: 'आपकी पात्रता के अनुसार सरकारी योजनाओं की व्यक्तिगत सिफ़ारिशें।' },
      { name: 'दस्तावेज़ सहायक', desc: 'किसी भी आवेदन के लिए ज़रूरी दस्तावेज़ और उन्हें पाने का तरीका जानें।' },
      { name: 'नागरिक चैटबॉट', desc: 'सरकारी सेवाओं के बारे में कुछ भी पूछें और सरल भाषा में उत्तर पाएँ।' },
    ],
    missionTitle: 'स्मार्ट भारत के लिए बनाया गया',
    missionPoints: [
      { title: 'पारदर्शिता', desc: 'हर शिकायत को उसका विभाग, समयसीमा और एस्केलेशन पथ पता है — कुछ भी फ़ाइलों में गुम नहीं होता।' },
      { title: 'सुलभता', desc: 'सरल बोलचाल से तैयार औपचारिक प्रशासनिक भाषा — उसी भाषा में जिसमें आप सोचते हैं।' },
      { title: 'डिजिटल समावेशन', desc: 'मुफ़्त, बिना साइन-अप, किसी भी फ़ोन ब्राउज़र में — और आपका डेटा आपके डिवाइस से बाहर नहीं जाता।' },
    ],
    backToTools: 'सभी टूल्स',
  },
};

const ta: UIStrings = {
  appName: 'நாகரிக்சேது',
  tagline: 'உங்கள் குடிமைத் துணை',
  fileTab: 'புகார் பதிவு',
  trackerTab: 'எனது புகார்கள்',
  dashboardTab: 'பகுதி டாஷ்போர்டு',
  heroTitle: 'உங்கள் குரலை எழுப்புங்கள். காகிதப் பணியை நாங்கள் பார்த்துக்கொள்கிறோம்.',
  heroSubtitle:
    'உங்கள் குடிமைப் பிரச்சனையை உங்கள் சொந்த வார்த்தைகளில் விவரிக்கவும் — நாகரிக்சேது சரியான துறையை அடையாளம் கண்டு, ஆங்கிலம் மற்றும் உங்கள் மொழியில் முறையான புகார் கடிதத்தை தயார் செய்து, அதை எங்கு பதிவு செய்ய வேண்டும் என்பதைத் தெரிவிக்கும்.',
  heroPoints: [
    'AI வரைந்த முறையான கடிதங்கள்',
    'சரியான துறை, சரியான போர்ட்டல்',
    'RTI மூலம் கண்காணித்து மேலமுறையீடு செய்யுங்கள்',
  ],
  describeLabel: 'உங்கள் பக்கத்து வீட்டுக்காரரிடம் சொல்வது போல் உங்கள் பிரச்சனையை விவரிக்கவும்…',
  cityLabel: 'நகரம் / பகுதி',
  nameLabel: 'உங்கள் பெயர் (விருப்பத்தேர்வு)',
  submitBtn: 'பகுப்பாய்வு செய்து புகார் தயார் செய்யவும்',
  charCount: 'எழுத்துக்கள்',
  minChars: 'குறைந்தது 20 எழுத்துக்கள் தேவை',
  analyzing: 'உங்கள் புகாரை வகைப்படுத்தி முறையான கடிதங்களை தயார் செய்கிறோம்…',
  copyBtn: 'நகலெடு',
  copied: 'நகலெடுக்கப்பட்டது!',
  emailBtn: 'மின்னஞ்சல் வரைவு',
  saveToTracker: 'கண்காணிப்பானில் சேமிக்கவும்',
  saved: 'சேமிக்கப்பட்டது!',
  englishTab: 'ஆங்கில வரைவு',
  regionalDraftTab: '{lang} வரைவு',
  filingTab: 'எங்கு பதிவு செய்வது',
  escalationTab: 'மேலமுறையீட்டு பாதை',
  escalateBtn: 'மேலமுறையீடு செய்',
  generateRTI: 'RTI விண்ணப்பம் உருவாக்கு',
  rtiIntro:
    'தகவல் அறியும் உரிமைச் சட்டம், 2005-ன் கீழ் பொறுப்புக்கூறலைக் கோர உங்கள் “{category}” புகாருக்கான RTI விண்ணப்பத்தை உருவாக்கவும்.',
  tryExamples: 'ஒரு உதாரணத்தை முயற்சிக்கவும்:',
  examples: [
    'என் வீட்டுக்கு வெளியே உள்ள தெருவிளக்கு 3 வாரங்களாக பழுதடைந்துள்ளது, மூலையில் குப்பை குவிந்து கிடக்கிறது',
    'கடந்த மாதம் முதல் எங்கள் காலனியில் தண்ணீர் தினமும் 1 மணி நேரம் மட்டுமே வருகிறது',
    'பள்ளி வாசலுக்கு அருகில் திறந்த மேன்ஹோல் உள்ளது, குழந்தைகளுக்கு மிகவும் ஆபத்தானது',
  ],
  error: 'ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.',
  missingKeyError: 'AI சேவை கட்டமைக்கப்படவில்லை. .env.local-இல் API key சேர்க்கவும் (.env.example பார்க்கவும்).',
  retryBtn: 'மீண்டும் முயற்சி',
  noComplaints: 'இதுவரை புகார் எதுவும் கண்காணிக்கப்படவில்லை. தொடங்க ஒன்றை பதிவு செய்யுங்கள்!',
  fileFirstBtn: 'உங்கள் முதல் புகாரை பதிவு செய்யுங்கள்',
  dayAgo: 'நாள் முன்பு',
  daysAgo: 'நாட்கள் முன்பு',
  pastSLA: 'எதிர்பார்க்கப்பட்ட தீர்வு காலம் கடந்துவிட்டது — மேலமுறையீடு செய்யவா?',
  status: 'நிலை',
  department: 'துறை',
  severity: 'தீவிரம்',
  rtiTitle: 'RTI விண்ணப்ப வரைவு',
  totalComplaints: 'மொத்த புகார்கள்',
  resolved: 'தீர்க்கப்பட்டது',
  pending: 'நிலுவையில்',
  avgDays: 'சராசரி தீர்வு நாட்கள்',
  byCategory: 'வகை வாரியாக',
  primaryChannel: 'முதன்மை வழி',
  portalApp: 'போர்ட்டல் / ஆப்',
  howToFile: 'பதிவு செய்வது எப்படி',
  expectedSLA: 'எதிர்பார்க்கப்படும் காலஅளவு',
  severityAssessment: 'தீவிர மதிப்பீடு',
  unknownArea: 'அறியப்படாத பகுதி',
  clickToChangeStatus: 'நிலையை மாற்ற கிளிக் செய்யவும்',
  deleteComplaint: 'புகாரை நீக்கு',
  confirmDelete: 'இந்த புகாரை உங்கள் கண்காணிப்பானில் இருந்து நீக்க வேண்டுமா? இதை மீட்க முடியாது.',
  closeLabel: 'மூடு',
  langToggleLabel: 'மொழியை மாற்று',
  dashEmpty: 'இன்னும் தரவு இல்லை — பகுதி புள்ளிவிவரங்களை காண புகார்களை பதிவு செய்து கண்காணிக்கவும்.',
  footerNote: 'இந்திய குடிமக்களுக்காக உருவாக்கப்பட்டது · உங்கள் தரவு உங்கள் உலாவியிலேயே இருக்கும்',
  statusLabels: {
    Drafted: 'வரைவு',
    Filed: 'பதிவு செய்யப்பட்டது',
    Acknowledged: 'ஏற்கப்பட்டது',
    Resolved: 'தீர்க்கப்பட்டது',
    Ignored: 'புறக்கணிக்கப்பட்டது',
  },
  severityLabels: {
    Low: 'குறைவு',
    Medium: 'நடுத்தரம்',
    High: 'அதிகம்',
    Critical: 'மிக முக்கியம்',
  },
  landing: {
    navHome: 'முகப்பு',
    navTools: 'கருவிகள்',
    heroBadge: 'GenAI இயங்கும் குடிமைத் தளம்',
    heroTitle: 'கேட்கும் ஆட்சி — உங்கள் மொழியில்.',
    heroSubtitle:
      'நாகரிக்சேது அன்றாட பிரச்சனைகளை முறையான அரசு நடவடிக்கையாக மாற்றுகிறது. பக்கத்து வீட்டுக்காரரிடம் சொல்வது போல் பிரச்சனையை விவரியுங்கள்; எங்கள் AI சரியான துறையைக் கண்டறிந்து, அதிகாரப்பூர்வ கடிதங்களை எழுதி, பதிவு, கண்காணிப்பு மற்றும் RTI வரை மேலமுறையீடு — எல்லாவற்றிலும் உங்களுக்கு வழிகாட்டுகிறது.',
    ctaPrimary: 'இப்போது புகார் பதிவு செய்யுங்கள்',
    ctaSecondary: 'கருவிகளை பார்க்கவும்',
    stats: [
      { value: '5', label: 'இடைமுக மொழிகள்' },
      { value: '2', label: 'ஒவ்வொரு வரைவிலும் மொழிகள்' },
      { value: '4+', label: 'மேலமுறையீட்டு படிகள்' },
      { value: '0', label: 'உங்கள் தரவை சேமிக்கும் சர்வர்கள்' },
    ],
    howTitle: 'இது எப்படி செயல்படுகிறது',
    howSubtitle: 'ஒரு வாக்கியத்தில் இருந்து பதிவு செய்யப்பட்ட புகார் வரை — மூன்று படிகளில்.',
    howSteps: [
      { title: 'பிரச்சனையை விவரியுங்கள்', desc: 'பக்கத்து வீட்டுக்காரரிடம் சொல்வது போல் எழுதுங்கள் — எளிய வார்த்தைகளில், ஆதரிக்கப்படும் எந்த மொழியிலும்.' },
      { title: 'AI காகித வேலையை செய்கிறது', desc: 'துறை, தீவிரம், சரியான போர்ட்டல், மற்றும் ஆங்கிலம் + உங்கள் மொழியில் முறையான கடிதங்கள்.' },
      { title: 'பதிவு, கண்காணிப்பு, மேலமுறையீடு', desc: 'கண்காணிப்பானில் சேமித்து, காலக்கெடுவை கவனித்து, புறக்கணிக்கப்பட்டால் RTI விண்ணப்பம் உருவாக்குங்கள்.' },
    ],
    toolsTitle: 'குடிமக்கள் கருவிகள்',
    toolsSubtitle: 'ஒரே தளம் — அன்றாட குடிமை வாழ்க்கைக்கான கருவிகள்.',
    openTool: 'கருவியை திற',
    comingSoon: 'விரைவில்',
    tools: [
      { name: 'புகார் பதிவாளர்', desc: 'குடிமைப் பிரச்சனைகளை புகாரளித்து, சரியான துறை, போர்ட்டல் மற்றும் மேலமுறையீட்டு பாதையுடன் முறையான புகார் கடிதங்களைப் பெறுங்கள்.' },
      { name: 'திட்ட தேடல்', desc: 'உங்கள் தகுதிக்கேற்ற அரசு திட்டங்களின் தனிப்பயன் பரிந்துரைகள்.' },
      { name: 'ஆவண உதவியாளர்', desc: 'எந்த விண்ணப்பத்திற்கும் தேவையான ஆவணங்கள் மற்றும் அவற்றை பெறும் வழியை அறியுங்கள்.' },
      { name: 'குடிமை சாட்பாட்', desc: 'அரசு சேவைகள் பற்றி எதையும் கேட்டு எளிய மொழியில் பதில்களைப் பெறுங்கள்.' },
    ],
    missionTitle: 'ஸ்மார்ட் பாரதத்திற்காக உருவாக்கப்பட்டது',
    missionPoints: [
      { title: 'வெளிப்படைத்தன்மை', desc: 'ஒவ்வொரு புகாருக்கும் அதன் துறை, காலக்கெடு, மேலமுறையீட்டு பாதை தெரியும் — எதுவும் கோப்புகளில் மறைவதில்லை.' },
      { title: 'அணுகல்தன்மை', desc: 'எளிய பேச்சிலிருந்து உருவாக்கப்படும் முறையான நிர்வாக மொழி — நீங்கள் சிந்திக்கும் மொழியிலேயே.' },
      { title: 'டிஜிட்டல் உள்ளடக்கம்', desc: 'இலவசம், பதிவு தேவையில்லை, எந்த போன் உலாவியிலும் — உங்கள் தரவு உங்கள் சாதனத்தை விட்டு வெளியேறாது.' },
    ],
    backToTools: 'அனைத்து கருவிகள்',
  },
};

const bn: UIStrings = {
  appName: 'নাগরিকসেতু',
  tagline: 'আপনার নাগরিক সহায়ক',
  fileTab: 'অভিযোগ দায়ের করুন',
  trackerTab: 'আমার অভিযোগসমূহ',
  dashboardTab: 'এলাকা ড্যাশবোর্ড',
  heroTitle: 'আপনার কণ্ঠস্বর তুলুন। কাগজের কাজ আমরা সামলাবো।',
  heroSubtitle:
    'আপনার নাগরিক সমস্যা নিজের ভাষায় বর্ণনা করুন — নাগরিকসেতু সঠিক বিভাগ চিহ্নিত করে, ইংরেজি ও আপনার ভাষায় একটি আনুষ্ঠানিক অভিযোগপত্র তৈরি করে, এবং জানিয়ে দেয় ঠিক কোথায় এটি জমা দিতে হবে।',
  heroPoints: [
    'AI-নির্মিত আনুষ্ঠানিক পত্র',
    'সঠিক বিভাগ, সঠিক পোর্টাল',
    'RTI-এর মাধ্যমে ট্র্যাক ও এসকেলেট করুন',
  ],
  describeLabel: 'প্রতিবেশীকে যেমন বলতেন, তেমনি আপনার সমস্যা বর্ণনা করুন…',
  cityLabel: 'শহর / এলাকা',
  nameLabel: 'আপনার নাম (ঐচ্ছিক)',
  submitBtn: 'বিশ্লেষণ করে অভিযোগ তৈরি করুন',
  charCount: 'অক্ষর',
  minChars: 'সর্বনিম্ন ২০ অক্ষর প্রয়োজন',
  analyzing: 'আপনার অভিযোগ শ্রেণীবদ্ধ করে আনুষ্ঠানিক পত্র তৈরি হচ্ছে…',
  copyBtn: 'কপি করুন',
  copied: 'কপি হয়েছে!',
  emailBtn: 'ইমেইল ড্রাফট',
  saveToTracker: 'ট্র্যাকারে সংরক্ষণ করুন',
  saved: 'সংরক্ষিত হয়েছে!',
  englishTab: 'ইংরেজি খসড়া',
  regionalDraftTab: '{lang} খসড়া',
  filingTab: 'কোথায় দাখিল করবেন',
  escalationTab: 'এসকেলেশন পথ',
  escalateBtn: 'এসকেলেট করুন',
  generateRTI: 'RTI আবেদন তৈরি করুন',
  rtiIntro:
    'তথ্যের অধিকার আইন, ২০০৫-এর অধীনে জবাবদিহিতা দাবি করতে আপনার “{category}” অভিযোগের জন্য একটি RTI আবেদন তৈরি করুন।',
  tryExamples: 'একটি উদাহরণ চেষ্টা করুন:',
  examples: [
    'আমার বাড়ির বাইরের স্ট্রিটলাইট ৩ সপ্তাহ ধরে নষ্ট, এবং কোণায় আবর্জনা জমছে',
    'গত মাস থেকে আমাদের কলোনিতে দিনে মাত্র ১ ঘণ্টা জল সরবরাহ হয়',
    'স্কুলের গেটের কাছে খোলা ম্যানহোল, শিশুদের জন্য অত্যন্ত বিপজ্জনক',
  ],
  error: 'কিছু ভুল হয়েছে। আবার চেষ্টা করুন।',
  missingKeyError: 'AI পরিষেবা কনফিগার করা নেই। .env.local-এ একটি API key যোগ করুন (.env.example দেখুন)।',
  retryBtn: 'আবার চেষ্টা করুন',
  noComplaints: 'এখনও কোনো অভিযোগ ট্র্যাক করা হয়নি। শুরু করতে একটি দায়ের করুন!',
  fileFirstBtn: 'আপনার প্রথম অভিযোগ দায়ের করুন',
  dayAgo: 'দিন আগে',
  daysAgo: 'দিন আগে',
  pastSLA: 'প্রত্যাশিত সমাধানের সময় পার হয়ে গেছে — এসকেলেট করবেন?',
  status: 'অবস্থা',
  department: 'বিভাগ',
  severity: 'গুরুত্ব',
  rtiTitle: 'RTI আবেদন খসড়া',
  totalComplaints: 'মোট অভিযোগ',
  resolved: 'সমাধান হয়েছে',
  pending: 'মুলতুবি',
  avgDays: 'গড় সমাধানের দিন',
  byCategory: 'বিভাগ অনুযায়ী',
  primaryChannel: 'প্রধান মাধ্যম',
  portalApp: 'পোর্টাল / অ্যাপ',
  howToFile: 'কীভাবে দাখিল করবেন',
  expectedSLA: 'প্রত্যাশিত সময়সীমা',
  severityAssessment: 'গুরুত্ব মূল্যায়ন',
  unknownArea: 'অজানা এলাকা',
  clickToChangeStatus: 'অবস্থা পরিবর্তন করতে ক্লিক করুন',
  deleteComplaint: 'অভিযোগ মুছুন',
  confirmDelete: 'আপনি কি আপনার ট্র্যাকার থেকে এই অভিযোগটি মুছে ফেলতে চান? এটি ফিরিয়ে আনা যাবে না।',
  closeLabel: 'বন্ধ করুন',
  langToggleLabel: 'ভাষা পরিবর্তন করুন',
  dashEmpty: 'এখনও কোনো তথ্য নেই — এলাকার পরিসংখ্যান দেখতে অভিযোগ দায়ের ও ট্র্যাক করুন।',
  footerNote: 'ভারতের নাগরিকদের জন্য তৈরি · আপনার তথ্য আপনার ব্রাউজারেই থাকে',
  statusLabels: {
    Drafted: 'খসড়া তৈরি',
    Filed: 'দাখিল হয়েছে',
    Acknowledged: 'স্বীকৃত',
    Resolved: 'সমাধান হয়েছে',
    Ignored: 'উপেক্ষিত',
  },
  severityLabels: {
    Low: 'নিম্ন',
    Medium: 'মাঝারি',
    High: 'উচ্চ',
    Critical: 'গুরুতর',
  },
  landing: {
    navHome: 'হোম',
    navTools: 'টুলস',
    heroBadge: 'GenAI-চালিত নাগরিক প্ল্যাটফর্ম',
    heroTitle: 'যে শাসন শোনে — আপনার ভাষায়।',
    heroSubtitle:
      'নাগরিকসেতু দৈনন্দিন সমস্যাকে আনুষ্ঠানিক সরকারি পদক্ষেপে পরিণত করে। প্রতিবেশীকে যেমন বলেন তেমনি সমস্যাটি বর্ণনা করুন; আমাদের AI সঠিক বিভাগ খুঁজে বের করে, অফিসিয়াল চিঠি লেখে, এবং দায়ের, ট্র্যাক ও RTI পর্যন্ত এসকেলেশনে আপনাকে পথ দেখায়।',
    ctaPrimary: 'এখনই অভিযোগ দায়ের করুন',
    ctaSecondary: 'টুলস দেখুন',
    stats: [
      { value: '5', label: 'ইন্টারফেস ভাষা' },
      { value: '2', label: 'প্রতিটি খসড়ায় ভাষা' },
      { value: '4+', label: 'এসকেলেশন ধাপ' },
      { value: '0', label: 'আপনার তথ্য রাখা সার্ভার' },
    ],
    howTitle: 'এটি কীভাবে কাজ করে',
    howSubtitle: 'একটি বাক্য থেকে দায়ের করা অভিযোগ পর্যন্ত — তিন ধাপে।',
    howSteps: [
      { title: 'সমস্যা বর্ণনা করুন', desc: 'প্রতিবেশীকে যেমন বলেন তেমনি লিখুন — সহজ ভাষায়, সমর্থিত যেকোনো ভাষায়।' },
      { title: 'AI কাগজের কাজ করে', desc: 'বিভাগ, গুরুত্ব, সঠিক পোর্টাল, এবং ইংরেজি + আপনার ভাষায় আনুষ্ঠানিক চিঠি।' },
      { title: 'দায়ের, ট্র্যাক, এসকেলেট', desc: 'ট্র্যাকারে সংরক্ষণ করুন, সময়সীমা দেখুন, এবং উপেক্ষিত হলে RTI আবেদন তৈরি করুন।' },
    ],
    toolsTitle: 'নাগরিক টুলস',
    toolsSubtitle: 'এক প্ল্যাটফর্ম — দৈনন্দিন নাগরিক জীবনের জন্য তৈরি টুলস।',
    openTool: 'টুল খুলুন',
    comingSoon: 'শীঘ্রই আসছে',
    tools: [
      { name: 'অভিযোগ ফাইলার', desc: 'নাগরিক সমস্যা রিপোর্ট করুন এবং সঠিক বিভাগ, পোর্টাল ও এসকেলেশন পথসহ আনুষ্ঠানিক, দাখিল-প্রস্তুত অভিযোগপত্র পান।' },
      { name: 'স্কিম ফাইন্ডার', desc: 'আপনার যোগ্যতা অনুযায়ী সরকারি প্রকল্পের ব্যক্তিগত সুপারিশ।' },
      { name: 'ডকুমেন্ট সহায়ক', desc: 'যেকোনো আবেদনের জন্য প্রয়োজনীয় নথি এবং সেগুলি পাওয়ার উপায় জানুন।' },
      { name: 'নাগরিক চ্যাটবট', desc: 'সরকারি পরিষেবা সম্পর্কে যেকোনো প্রশ্ন করুন এবং সহজ ভাষায় উত্তর পান।' },
    ],
    missionTitle: 'স্মার্ট ভারতের জন্য তৈরি',
    missionPoints: [
      { title: 'স্বচ্ছতা', desc: 'প্রতিটি অভিযোগ তার বিভাগ, সময়সীমা ও এসকেলেশন পথ জানে — কিছুই ফাইলে হারিয়ে যায় না।' },
      { title: 'সহজলভ্যতা', desc: 'সহজ কথা থেকে তৈরি আনুষ্ঠানিক প্রশাসনিক ভাষা — যে ভাষায় আপনি ভাবেন সেই ভাষাতেই।' },
      { title: 'ডিজিটাল অন্তর্ভুক্তি', desc: 'বিনামূল্যে, সাইন-আপ ছাড়া, যেকোনো ফোন ব্রাউজারে — আপনার তথ্য আপনার ডিভাইস ছেড়ে যায় না।' },
    ],
    backToTools: 'সব টুলস',
  },
};

const pa: UIStrings = {
  appName: 'ਨਾਗਰਿਕਸੇਤੂ',
  tagline: 'ਤੁਹਾਡਾ ਨਾਗਰਿਕ ਸਾਥੀ',
  fileTab: 'ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
  trackerTab: 'ਮੇਰੀਆਂ ਸ਼ਿਕਾਇਤਾਂ',
  dashboardTab: 'ਖੇਤਰ ਡੈਸ਼ਬੋਰਡ',
  heroTitle: 'ਆਪਣੀ ਆਵਾਜ਼ ਉਠਾਓ। ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਅਸੀਂ ਸੰਭਾਲਾਂਗੇ।',
  heroSubtitle:
    'ਆਪਣੀ ਨਾਗਰਿਕ ਸਮੱਸਿਆ ਆਪਣੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਦੱਸੋ — ਨਾਗਰਿਕਸੇਤੂ ਸਹੀ ਵਿਭਾਗ ਦੀ ਪਛਾਣ ਕਰਦਾ ਹੈ, ਅੰਗਰੇਜ਼ੀ ਅਤੇ ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਰਸਮੀ ਸ਼ਿਕਾਇਤ ਤਿਆਰ ਕਰਦਾ ਹੈ, ਅਤੇ ਦੱਸਦਾ ਹੈ ਕਿ ਇਸਨੂੰ ਕਿੱਥੇ ਦਰਜ ਕਰਨਾ ਹੈ।',
  heroPoints: [
    'AI ਦੁਆਰਾ ਤਿਆਰ ਰਸਮੀ ਪੱਤਰ',
    'ਸਹੀ ਵਿਭਾਗ, ਸਹੀ ਪੋਰਟਲ',
    'RTI ਨਾਲ ਟਰੈਕ ਅਤੇ ਐਸਕੇਲੇਟ ਕਰੋ',
  ],
  describeLabel: 'ਆਪਣੀ ਸਮੱਸਿਆ ਇੰਝ ਦੱਸੋ ਜਿਵੇਂ ਗੁਆਂਢੀ ਨੂੰ ਦੱਸਦੇ ਹੋ…',
  cityLabel: 'ਸ਼ਹਿਰ / ਖੇਤਰ',
  nameLabel: 'ਤੁਹਾਡਾ ਨਾਮ (ਵਿਕਲਪਿਕ)',
  submitBtn: 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ ਅਤੇ ਸ਼ਿਕਾਇਤ ਤਿਆਰ ਕਰੋ',
  charCount: 'ਅੱਖਰ',
  minChars: 'ਘੱਟੋ-ਘੱਟ 20 ਅੱਖਰ ਲੋੜੀਂਦੇ ਹਨ',
  analyzing: 'ਤੁਹਾਡੀ ਸ਼ਿਕਾਇਤ ਦਾ ਵਰਗੀਕਰਨ ਅਤੇ ਰਸਮੀ ਪੱਤਰ ਤਿਆਰ ਹੋ ਰਹੇ ਹਨ…',
  copyBtn: 'ਕਾਪੀ ਕਰੋ',
  copied: 'ਕਾਪੀ ਹੋ ਗਿਆ!',
  emailBtn: 'ਈਮੇਲ ਡਰਾਫਟ',
  saveToTracker: 'ਟਰੈਕਰ ਵਿੱਚ ਸੰਭਾਲੋ',
  saved: 'ਸੰਭਾਲਿਆ ਗਿਆ!',
  englishTab: 'ਅੰਗਰੇਜ਼ੀ ਡਰਾਫਟ',
  regionalDraftTab: '{lang} ਡਰਾਫਟ',
  filingTab: 'ਕਿੱਥੇ ਦਰਜ ਕਰੀਏ',
  escalationTab: 'ਐਸਕੇਲੇਸ਼ਨ ਮਾਰਗ',
  escalateBtn: 'ਐਸਕੇਲੇਟ ਕਰੋ',
  generateRTI: 'RTI ਅਰਜ਼ੀ ਤਿਆਰ ਕਰੋ',
  rtiIntro:
    'ਸੂਚਨਾ ਦੇ ਅਧਿਕਾਰ ਐਕਟ, 2005 ਤਹਿਤ ਜਵਾਬਦੇਹੀ ਦੀ ਮੰਗ ਕਰਨ ਲਈ ਆਪਣੀ “{category}” ਸ਼ਿਕਾਇਤ ਲਈ RTI ਅਰਜ਼ੀ ਤਿਆਰ ਕਰੋ।',
  tryExamples: 'ਇੱਕ ਉਦਾਹਰਨ ਅਜ਼ਮਾਓ:',
  examples: [
    'ਮੇਰੇ ਘਰ ਦੇ ਬਾਹਰ ਸਟਰੀਟਲਾਈਟ 3 ਹਫ਼ਤਿਆਂ ਤੋਂ ਖਰਾਬ ਹੈ, ਅਤੇ ਕੋਨੇ ਉੱਤੇ ਕੂੜਾ ਜਮ੍ਹਾ ਹੋ ਰਿਹਾ ਹੈ',
    'ਪਿਛਲੇ ਮਹੀਨੇ ਤੋਂ ਸਾਡੀ ਕਲੋਨੀ ਵਿੱਚ ਪਾਣੀ ਦਿਨ ਵਿੱਚ ਸਿਰਫ਼ 1 ਘੰਟਾ ਆਉਂਦਾ ਹੈ',
    'ਸਕੂਲ ਦੇ ਗੇਟ ਕੋਲ ਖੁੱਲ੍ਹਾ ਮੈਨਹੋਲ ਹੈ, ਬੱਚਿਆਂ ਲਈ ਬਹੁਤ ਖਤਰਨਾਕ',
  ],
  error: 'ਕੁਝ ਗਲਤ ਹੋ ਗਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
  missingKeyError: 'AI ਸੇਵਾ ਕੌਂਫਿਗਰ ਨਹੀਂ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ .env.local ਵਿੱਚ API key ਸ਼ਾਮਲ ਕਰੋ (.env.example ਵੇਖੋ)।',
  retryBtn: 'ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ',
  noComplaints: 'ਹਾਲੇ ਕੋਈ ਸ਼ਿਕਾਇਤ ਟਰੈਕ ਨਹੀਂ ਕੀਤੀ ਗਈ। ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਇੱਕ ਦਰਜ ਕਰੋ!',
  fileFirstBtn: 'ਆਪਣੀ ਪਹਿਲੀ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
  dayAgo: 'ਦਿਨ ਪਹਿਲਾਂ',
  daysAgo: 'ਦਿਨ ਪਹਿਲਾਂ',
  pastSLA: 'ਉਮੀਦ ਕੀਤਾ ਹੱਲ ਸਮਾਂ ਲੰਘ ਚੁੱਕਾ ਹੈ — ਐਸਕੇਲੇਟ ਕਰੀਏ?',
  status: 'ਸਥਿਤੀ',
  department: 'ਵਿਭਾਗ',
  severity: 'ਗੰਭੀਰਤਾ',
  rtiTitle: 'RTI ਅਰਜ਼ੀ ਡਰਾਫਟ',
  totalComplaints: 'ਕੁੱਲ ਸ਼ਿਕਾਇਤਾਂ',
  resolved: 'ਹੱਲ ਹੋਇਆ',
  pending: 'ਬਕਾਇਆ',
  avgDays: 'ਔਸਤ ਹੱਲ ਦਿਨ',
  byCategory: 'ਸ਼੍ਰੇਣੀ ਅਨੁਸਾਰ',
  primaryChannel: 'ਮੁੱਖ ਮਾਧਿਅਮ',
  portalApp: 'ਪੋਰਟਲ / ਐਪ',
  howToFile: 'ਦਰਜ ਕਰਨ ਦਾ ਤਰੀਕਾ',
  expectedSLA: 'ਉਮੀਦ ਕੀਤੀ ਸਮਾਂ-ਸੀਮਾ',
  severityAssessment: 'ਗੰਭੀਰਤਾ ਮੁਲਾਂਕਣ',
  unknownArea: 'ਅਣਜਾਣ ਖੇਤਰ',
  clickToChangeStatus: 'ਸਥਿਤੀ ਬਦਲਣ ਲਈ ਕਲਿੱਕ ਕਰੋ',
  deleteComplaint: 'ਸ਼ਿਕਾਇਤ ਮਿਟਾਓ',
  confirmDelete: 'ਕੀ ਤੁਸੀਂ ਇਹ ਸ਼ਿਕਾਇਤ ਆਪਣੇ ਟਰੈਕਰ ਤੋਂ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ? ਇਹ ਵਾਪਸ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕੇਗਾ।',
  closeLabel: 'ਬੰਦ ਕਰੋ',
  langToggleLabel: 'ਭਾਸ਼ਾ ਬਦਲੋ',
  dashEmpty: 'ਹਾਲੇ ਕੋਈ ਡਾਟਾ ਨਹੀਂ — ਖੇਤਰ ਦੇ ਅੰਕੜੇ ਵੇਖਣ ਲਈ ਸ਼ਿਕਾਇਤਾਂ ਦਰਜ ਅਤੇ ਟਰੈਕ ਕਰੋ।',
  footerNote: 'ਭਾਰਤ ਦੇ ਨਾਗਰਿਕਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ · ਤੁਹਾਡਾ ਡਾਟਾ ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਹੀ ਰਹਿੰਦਾ ਹੈ',
  statusLabels: {
    Drafted: 'ਡਰਾਫਟ ਤਿਆਰ',
    Filed: 'ਦਰਜ',
    Acknowledged: 'ਸਵੀਕਾਰਿਆ',
    Resolved: 'ਹੱਲ ਹੋਇਆ',
    Ignored: 'ਅਣਡਿੱਠਾ',
  },
  severityLabels: {
    Low: 'ਘੱਟ',
    Medium: 'ਦਰਮਿਆਨਾ',
    High: 'ਵੱਧ',
    Critical: 'ਗੰਭੀਰ',
  },
  landing: {
    navHome: 'ਹੋਮ',
    navTools: 'ਟੂਲਜ਼',
    heroBadge: 'GenAI-ਸੰਚਾਲਿਤ ਨਾਗਰਿਕ ਪਲੇਟਫਾਰਮ',
    heroTitle: 'ਅਜਿਹਾ ਸ਼ਾਸਨ ਜੋ ਸੁਣਦਾ ਹੈ — ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ।',
    heroSubtitle:
      'ਨਾਗਰਿਕਸੇਤੂ ਰੋਜ਼ਾਨਾ ਦੀਆਂ ਸਮੱਸਿਆਵਾਂ ਨੂੰ ਰਸਮੀ ਸਰਕਾਰੀ ਕਾਰਵਾਈ ਵਿੱਚ ਬਦਲਦਾ ਹੈ। ਸਮੱਸਿਆ ਇੰਝ ਦੱਸੋ ਜਿਵੇਂ ਗੁਆਂਢੀ ਨੂੰ ਦੱਸਦੇ ਹੋ; ਸਾਡਾ AI ਸਹੀ ਵਿਭਾਗ ਲੱਭਦਾ ਹੈ, ਅਧਿਕਾਰਤ ਪੱਤਰ ਲਿਖਦਾ ਹੈ, ਅਤੇ ਦਰਜ ਕਰਨ, ਟਰੈਕ ਕਰਨ ਅਤੇ RTI ਤੱਕ ਐਸਕੇਲੇਟ ਕਰਨ ਵਿੱਚ ਤੁਹਾਡਾ ਸਾਥ ਦਿੰਦਾ ਹੈ।',
    ctaPrimary: 'ਹੁਣੇ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰੋ',
    ctaSecondary: 'ਟੂਲਜ਼ ਵੇਖੋ',
    stats: [
      { value: '5', label: 'ਇੰਟਰਫੇਸ ਭਾਸ਼ਾਵਾਂ' },
      { value: '2', label: 'ਹਰ ਡਰਾਫਟ ਵਿੱਚ ਭਾਸ਼ਾਵਾਂ' },
      { value: '4+', label: 'ਐਸਕੇਲੇਸ਼ਨ ਕਦਮ' },
      { value: '0', label: 'ਤੁਹਾਡਾ ਡਾਟਾ ਰੱਖਣ ਵਾਲੇ ਸਰਵਰ' },
    ],
    howTitle: 'ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
    howSubtitle: 'ਇੱਕ ਵਾਕ ਤੋਂ ਦਰਜ ਸ਼ਿਕਾਇਤ ਤੱਕ — ਤਿੰਨ ਕਦਮਾਂ ਵਿੱਚ।',
    howSteps: [
      { title: 'ਸਮੱਸਿਆ ਦੱਸੋ', desc: 'ਇੰਝ ਲਿਖੋ ਜਿਵੇਂ ਗੁਆਂਢੀ ਨੂੰ ਦੱਸਦੇ ਹੋ — ਸਧਾਰਨ ਸ਼ਬਦਾਂ ਵਿੱਚ, ਕਿਸੇ ਵੀ ਸਮਰਥਿਤ ਭਾਸ਼ਾ ਵਿੱਚ।' },
      { title: 'AI ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਕਰਦਾ ਹੈ', desc: 'ਵਿਭਾਗ, ਗੰਭੀਰਤਾ, ਸਹੀ ਪੋਰਟਲ, ਅਤੇ ਅੰਗਰੇਜ਼ੀ + ਤੁਹਾਡੀ ਭਾਸ਼ਾ ਵਿੱਚ ਰਸਮੀ ਪੱਤਰ।' },
      { title: 'ਦਰਜ ਕਰੋ, ਟਰੈਕ ਕਰੋ, ਐਸਕੇਲੇਟ ਕਰੋ', desc: 'ਟਰੈਕਰ ਵਿੱਚ ਸੰਭਾਲੋ, ਸਮਾਂ-ਸੀਮਾ ਵੇਖੋ, ਅਤੇ ਅਣਡਿੱਠ ਹੋਣ ਉੱਤੇ RTI ਅਰਜ਼ੀ ਬਣਾਓ।' },
    ],
    toolsTitle: 'ਨਾਗਰਿਕ ਟੂਲਜ਼',
    toolsSubtitle: 'ਇੱਕ ਪਲੇਟਫਾਰਮ — ਰੋਜ਼ਾਨਾ ਨਾਗਰਿਕ ਜੀਵਨ ਲਈ ਬਣੇ ਟੂਲਜ਼।',
    openTool: 'ਟੂਲ ਖੋਲ੍ਹੋ',
    comingSoon: 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ',
    tools: [
      { name: 'ਸ਼ਿਕਾਇਤ ਫਾਈਲਰ', desc: 'ਨਾਗਰਿਕ ਸਮੱਸਿਆਵਾਂ ਦੀ ਰਿਪੋਰਟ ਕਰੋ ਅਤੇ ਸਹੀ ਵਿਭਾਗ, ਪੋਰਟਲ ਅਤੇ ਐਸਕੇਲੇਸ਼ਨ ਮਾਰਗ ਨਾਲ ਰਸਮੀ, ਦਾਖਲ-ਯੋਗ ਸ਼ਿਕਾਇਤ ਪੱਤਰ ਪਾਓ।' },
      { name: 'ਯੋਜਨਾ ਖੋਜਕ', desc: 'ਤੁਹਾਡੀ ਯੋਗਤਾ ਅਨੁਸਾਰ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਦੀਆਂ ਨਿੱਜੀ ਸਿਫ਼ਾਰਸ਼ਾਂ।' },
      { name: 'ਦਸਤਾਵੇਜ਼ ਸਹਾਇਕ', desc: 'ਕਿਸੇ ਵੀ ਅਰਜ਼ੀ ਲਈ ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼ ਅਤੇ ਉਨ੍ਹਾਂ ਨੂੰ ਪਾਉਣ ਦਾ ਤਰੀਕਾ ਜਾਣੋ।' },
      { name: 'ਨਾਗਰਿਕ ਚੈਟਬੋਟ', desc: 'ਸਰਕਾਰੀ ਸੇਵਾਵਾਂ ਬਾਰੇ ਕੁਝ ਵੀ ਪੁੱਛੋ ਅਤੇ ਸਧਾਰਨ ਭਾਸ਼ਾ ਵਿੱਚ ਜਵਾਬ ਪਾਓ।' },
    ],
    missionTitle: 'ਸਮਾਰਟ ਭਾਰਤ ਲਈ ਬਣਾਇਆ ਗਿਆ',
    missionPoints: [
      { title: 'ਪਾਰਦਰਸ਼ਤਾ', desc: 'ਹਰ ਸ਼ਿਕਾਇਤ ਨੂੰ ਆਪਣਾ ਵਿਭਾਗ, ਸਮਾਂ-ਸੀਮਾ ਅਤੇ ਐਸਕੇਲੇਸ਼ਨ ਮਾਰਗ ਪਤਾ ਹੈ — ਕੁਝ ਵੀ ਫਾਈਲਾਂ ਵਿੱਚ ਗੁੰਮ ਨਹੀਂ ਹੁੰਦਾ।' },
      { title: 'ਪਹੁੰਚਯੋਗਤਾ', desc: 'ਸਧਾਰਨ ਬੋਲਚਾਲ ਤੋਂ ਤਿਆਰ ਰਸਮੀ ਪ੍ਰਸ਼ਾਸਕੀ ਭਾਸ਼ਾ — ਉਸੇ ਭਾਸ਼ਾ ਵਿੱਚ ਜਿਸ ਵਿੱਚ ਤੁਸੀਂ ਸੋਚਦੇ ਹੋ।' },
      { title: 'ਡਿਜੀਟਲ ਸ਼ਮੂਲੀਅਤ', desc: 'ਮੁਫ਼ਤ, ਬਿਨਾਂ ਸਾਈਨ-ਅੱਪ, ਕਿਸੇ ਵੀ ਫ਼ੋਨ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ — ਅਤੇ ਤੁਹਾਡਾ ਡਾਟਾ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ਤੋਂ ਬਾਹਰ ਨਹੀਂ ਜਾਂਦਾ।' },
    ],
    backToTools: 'ਸਾਰੇ ਟੂਲਜ਼',
  },
};

const strings: Record<UILanguage, UIStrings> = { en, hi, ta, bn, pa };

export type StringKey = keyof UIStrings;
export { strings };
