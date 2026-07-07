import type {
  ClassificationResponse,
  ClassifiedIssue,
  EscalationStep,
  RTIApplication,
  Severity,
} from '../types';

type Provider = 'OPENAI' | 'GROQ' | 'GEMINI';

function resolveProvider(): Provider {
  const raw = ((import.meta.env.VITE_AI_PROVIDER as string | undefined) ?? 'OPENAI').toUpperCase();
  // "GROK" kept as a legacy alias — the endpoint has always been Groq's.
  if (raw === 'GROQ' || raw === 'GROK') return 'GROQ';
  if (raw === 'GEMINI') return 'GEMINI';
  return 'OPENAI';
}

const PROVIDER = resolveProvider();

const API_KEYS: Record<Provider, string | undefined> = {
  OPENAI: import.meta.env.VITE_OPENAI_API_KEY as string | undefined,
  GROQ: (import.meta.env.VITE_GROQ_API_KEY ?? import.meta.env.VITE_GROK_API_KEY) as string | undefined,
  GEMINI: import.meta.env.VITE_GEMINI_API_KEY as string | undefined,
};

const KEY_ENV_NAMES: Record<Provider, string> = {
  OPENAI: 'VITE_OPENAI_API_KEY',
  GROQ: 'VITE_GROQ_API_KEY',
  GEMINI: 'VITE_GEMINI_API_KEY',
};

const DEFAULT_MODELS: Record<Provider, string> = {
  OPENAI: 'gpt-4o-mini',
  GROQ: 'llama-3.3-70b-versatile',
  GEMINI: 'gemini-2.0-flash',
};

// All three providers expose an OpenAI-compatible chat completions endpoint.
const DEFAULT_URLS: Record<Provider, string> = {
  OPENAI: 'https://api.openai.com/v1/chat/completions',
  GROQ: 'https://api.groq.com/openai/v1/chat/completions',
  GEMINI: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
};

const MODEL = (import.meta.env.VITE_AI_MODEL as string | undefined) ?? DEFAULT_MODELS[PROVIDER];
const BASE_URL = (import.meta.env.VITE_AI_BASE_URL as string | undefined) ?? DEFAULT_URLS[PROVIDER];

export class MissingApiKeyError extends Error {
  constructor() {
    super(`Missing API key for provider ${PROVIDER}. Set ${KEY_ENV_NAMES[PROVIDER]} in .env.local.`);
    this.name = 'MissingApiKeyError';
  }
}

const CLASSIFICATION_SYSTEM_PROMPT = `You are an expert on Indian government administration, civic services, and grievance redressal mechanisms. A citizen will describe a civic problem in plain language (English or Hindi). Your job is to:

1. SPLIT compound problems into separate issues (e.g., "streetlight broken AND garbage piling" = 2 separate issues).
2. CLASSIFY each issue: category, responsible department, severity.
3. IDENTIFY the best channel/portal to file the complaint, naming real Indian portals where confident (CPGRAMS, Swachhata App, IGRS, state-specific portals like PGMS for UP, CM Helpline for MP, etc.). Never invent URLs — name portals generically if unsure. Provide the channel's "primary" office/authority name and "howToFile" instructions in BOTH English and Hindi (portalName stays as its real proper-noun name, unchanged across languages).
4. DRAFT a formal complaint letter in BOTH English and Hindi using proper Indian administrative register:
   - English: "Respected Sir/Madam, I wish to bring to your kind attention..."
   - Hindi: "माननीय महोदय/महोदया, मैं आपका ध्यान आकर्षित करना चाहता/चाहती हूँ..."
   - Structure: Subject line, Salutation, Body with dates/location details, Request for action, Closing with "Yours faithfully"
   - Include placeholders like [YOUR NAME], [YOUR ADDRESS], [YOUR PHONE NUMBER], [DATE] where citizen data is not provided.
   - If the citizen provides their name, use it. If city/area is provided, include it in the letter and reference the local municipal body.
5. PROVIDE an escalation ladder of 4-5 steps, each with "action" and "whenToUse" written in BOTH English and Hindi. The LAST step MUST ALWAYS be: "File an RTI application under the RTI Act 2005 asking for the current status and reasons for delay of your complaint." (and its Hindi equivalent).
6. ESTIMATE expected SLA based on citizen charter norms (e.g., "7-15 working days"), in BOTH English and Hindi (e.g., "7-15 कार्य दिवस").

Every reasoning/explanation field (department reasoning, severity reasoning) must also be written in BOTH English and Hindi — this app is fully bilingual and every field the citizen reads must appear correctly in whichever language they select.

Use formal but readable language. Hindi drafts should use शुद्ध हिन्दी but remain accessible to common citizens.

Respond with ONLY a single valid JSON object (no markdown, no commentary, no code fences) matching exactly this shape:
{
  "issues": [
    {
      "category": string,
      "department": string,
      "departmentReasoningEnglish": string,
      "departmentReasoningHindi": string,
      "severity": "Low" | "Medium" | "High" | "Critical",
      "severityReasoningEnglish": string,
      "severityReasoningHindi": string,
      "channel": {
        "primaryEnglish": string,
        "primaryHindi": string,
        "portalName": string,
        "howToFileEnglish": string,
        "howToFileHindi": string
      },
      "expectedSLAEnglish": string,
      "expectedSLAHindi": string,
      "complaintDraftEnglish": string,
      "complaintDraftHindi": string,
      "escalationLadder": [
        {
          "step": number,
          "actionEnglish": string,
          "actionHindi": string,
          "whenToUseEnglish": string,
          "whenToUseHindi": string
        }
      ]
    }
  ]
}`;

const RTI_SYSTEM_PROMPT = `You are an expert on the Right to Information Act, 2005 (India). Given details of a civic complaint that has not been resolved within the expected timeframe, draft a complete RTI application addressed to the Public Information Officer (PIO) of the relevant department.

The application must:
1. Be addressed to "The Public Information Officer, [Department Name]"
2. Reference the RTI Act 2005, Section 6(1)
3. Ask for: (a) current status of the complaint, (b) name and designation of the officer responsible, (c) prescribed timeline for resolution as per citizen charter, (d) reasons for delay if any
4. Include the line: "I am depositing the prescribed fee of ₹10 (Rupees Ten only) as required under Section 6 of the RTI Act, 2005."
5. Use formal Indian administrative language
6. Include [YOUR NAME], [YOUR ADDRESS], [DATE] placeholders
7. End with "Yours faithfully" and signature block

Provide both English and Hindi versions.

Respond with ONLY a single valid JSON object (no markdown, no commentary, no code fences) matching exactly this shape:
{
  "draftEnglish": string,
  "draftHindi": string
}`;

function parseJSON(text: string): unknown {
  let cleaned = text.trim();
  // Strip markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?\s*```$/, '');
  }
  try {
    return JSON.parse(cleaned);
  } catch (error) {
    // Model added prose around the JSON object; extract the outermost braces.
    const start = cleaned.indexOf('{');
    const end = cleaned.lastIndexOf('}');
    if (start === -1 || end === -1 || end <= start) throw error;
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

/* ---------- Response validation ----------
 * The model's output is untrusted; a missing field must degrade gracefully,
 * never crash the render. */

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

const SEVERITIES: Severity[] = ['Low', 'Medium', 'High', 'Critical'];

function asSeverity(value: unknown): Severity {
  return SEVERITIES.includes(value as Severity) ? (value as Severity) : 'Medium';
}

/** Prefer each language's own field; fall back to the other language, then to `fallback`. */
function asBilingualPair(
  english: unknown,
  hindi: unknown,
  fallback = '',
): [string, string] {
  const en = asString(english);
  const hi = asString(hindi);
  return [en || hi || fallback, hi || en || fallback];
}

function normalizeIssue(raw: unknown): ClassifiedIssue {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const channel = (obj.channel && typeof obj.channel === 'object' ? obj.channel : {}) as Record<string, unknown>;
  const ladderRaw = Array.isArray(obj.escalationLadder) ? obj.escalationLadder : [];

  const escalationLadder: EscalationStep[] = ladderRaw.map((step, i) => {
    const s = (step && typeof step === 'object' ? step : {}) as Record<string, unknown>;
    const actionEnglish = asString(s.actionEnglish);
    const actionHindi = asString(s.actionHindi);
    const whenToUseEnglish = asString(s.whenToUseEnglish);
    const whenToUseHindi = asString(s.whenToUseHindi);
    return {
      step: typeof s.step === 'number' ? s.step : i + 1,
      actionEnglish: actionEnglish || actionHindi,
      actionHindi: actionHindi || actionEnglish,
      whenToUseEnglish: whenToUseEnglish || whenToUseHindi,
      whenToUseHindi: whenToUseHindi || whenToUseEnglish,
    };
  });

  const [primaryEnglish, primaryHindi] = asBilingualPair(
    channel.primaryEnglish, channel.primaryHindi, 'Local municipal office',
  );
  const [howToFileEnglish, howToFileHindi] = asBilingualPair(
    channel.howToFileEnglish, channel.howToFileHindi, '—',
  );
  const [departmentReasoningEnglish, departmentReasoningHindi] = asBilingualPair(
    obj.departmentReasoningEnglish, obj.departmentReasoningHindi,
  );
  const [severityReasoningEnglish, severityReasoningHindi] = asBilingualPair(
    obj.severityReasoningEnglish, obj.severityReasoningHindi,
  );
  const [expectedSLAEnglish, expectedSLAHindi] = asBilingualPair(
    obj.expectedSLAEnglish, obj.expectedSLAHindi, '7–15 working days',
  );

  return {
    category: asString(obj.category, 'General Civic Issue'),
    department: asString(obj.department, 'Municipal Corporation'),
    departmentReasoningEnglish,
    departmentReasoningHindi,
    severity: asSeverity(obj.severity),
    severityReasoningEnglish,
    severityReasoningHindi,
    channel: {
      primaryEnglish,
      primaryHindi,
      portalName: asString(channel.portalName, '—'),
      howToFileEnglish,
      howToFileHindi,
    },
    expectedSLAEnglish,
    expectedSLAHindi,
    complaintDraftEnglish: asString(obj.complaintDraftEnglish),
    complaintDraftHindi: asString(obj.complaintDraftHindi),
    escalationLadder,
  };
}

function normalizeClassification(raw: unknown): ClassificationResponse {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const issues = Array.isArray(obj.issues) ? obj.issues : [];
  if (issues.length === 0) {
    throw new Error('AI returned no issues for this complaint');
  }
  return { issues: issues.map(normalizeIssue) };
}

function normalizeRTI(raw: unknown): RTIApplication {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const draftEnglish = asString(obj.draftEnglish);
  const draftHindi = asString(obj.draftHindi);
  if (!draftEnglish && !draftHindi) {
    throw new Error('AI returned an empty RTI draft');
  }
  return {
    draftEnglish: draftEnglish || draftHindi,
    draftHindi: draftHindi || draftEnglish,
  };
}

/* ---------- Transport ---------- */

function isRetryable(status: number): boolean {
  // Retry rate limits and server errors; auth/validation failures won't heal.
  return status === 429 || status >= 500;
}

async function callAI(
  userPrompt: string,
  systemPrompt: string,
  retries = 2,
): Promise<unknown> {
  const apiKey = API_KEYS[PROVIDER];
  if (!apiKey) throw new MissingApiKeyError();

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 8192,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        const error = new Error(`${PROVIDER} ${response.status}: ${errorBody}`);
        if (!isRetryable(response.status)) throw Object.assign(error, { fatal: true });
        throw error;
      }

      const data = await response.json();
      const text = data?.choices?.[0]?.message?.content;

      if (!text || typeof text !== 'string') {
        throw new Error('Empty response from AI');
      }

      return parseJSON(text);
    } catch (error) {
      if ((error as { fatal?: boolean }).fatal) throw error;
      if (attempt === retries) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000 * (attempt + 1)));
    }
  }

  throw new Error('Max retries exceeded');
}

export async function classifyComplaint(
  description: string,
  city: string,
  name: string,
): Promise<ClassificationResponse> {
  const parts: string[] = [`Citizen's complaint: "${description}"`];
  if (city) parts.push(`City/Area: ${city}`);
  if (name) parts.push(`Citizen's name: ${name}`);

  const result = await callAI(parts.join('\n'), CLASSIFICATION_SYSTEM_PROMPT);
  return normalizeClassification(result);
}

export async function generateRTI(
  category: string,
  department: string,
  originalComplaint: string,
  area: string,
  expectedSLA: string,
): Promise<RTIApplication> {
  const prompt = `Generate an RTI application for the following unresolved civic complaint:

Category: ${category}
Department: ${department}
Area: ${area}
Expected SLA: ${expectedSLA}
Original complaint: "${originalComplaint}"

The complaint was filed but not resolved within the expected timeframe. Draft the RTI application.`;

  const result = await callAI(prompt, RTI_SYSTEM_PROMPT);
  return normalizeRTI(result);
}
