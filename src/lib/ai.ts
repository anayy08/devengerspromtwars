import type {
  ClassificationResponse,
  ClassifiedIssue,
  EscalationStep,
  RTIApplication,
  Severity,
  UILanguage,
} from '../types';
import { isUILanguage, languageMeta, regionalFor } from './languages';

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

/**
 * Classification prompt, parameterized on the citizen's regional language so
 * drafts and explanations come back in English + that language.
 */
function classificationPrompt(regionalName: string): string {
  return `You are an expert on Indian government administration, civic services, and grievance redressal mechanisms. A citizen will describe a civic problem in plain language (any Indian language or English). Your job is to:

1. SPLIT compound problems into separate issues (e.g., "streetlight broken AND garbage piling" = 2 separate issues).
2. CLASSIFY each issue: category, responsible department, severity.
3. IDENTIFY the best channel/portal to file the complaint, naming real Indian portals where confident (CPGRAMS, Swachhata App, IGRS, state-specific portals like PGMS for UP, CM Helpline for MP, etc.). Never invent URLs — name portals generically if unsure.
4. DRAFT a formal complaint letter in BOTH English and ${regionalName} using proper Indian administrative register:
   - English opening: "Respected Sir/Madam, I wish to bring to your kind attention..."
   - ${regionalName} opening: the equivalent formal administrative salutation in ${regionalName}.
   - Structure: Subject line, Salutation, Body with dates/location details, Request for action, Closing with "Yours faithfully" (or its ${regionalName} equivalent)
   - Include placeholders like [YOUR NAME], [YOUR ADDRESS], [YOUR PHONE NUMBER], [DATE] where citizen data is not provided.
   - If the citizen provides their name, use it. If city/area is provided, include it in the letter and reference the local municipal body.
5. PROVIDE an escalation ladder of 4-5 steps. The LAST step MUST ALWAYS be: "File an RTI application under the RTI Act 2005 asking for the current status and reasons for delay of your complaint." (and its ${regionalName} equivalent).
6. ESTIMATE expected SLA based on citizen charter norms (e.g., "7-15 working days"), in BOTH English and ${regionalName}.

IMPORTANT: This app is fully bilingual. EVERY field the citizen reads must be provided in BOTH English and ${regionalName}: category, department, reasonings, channel names, filing instructions, SLA, drafts, and every escalation step. "portalName" is the one exception — keep it as the portal's real proper-noun name. ${regionalName} text must be natural, formal-but-accessible ${regionalName} in its own script, never transliterated English.

Respond with ONLY a single valid JSON object (no markdown, no commentary, no code fences) matching exactly this shape:
{
  "issues": [
    {
      "category": string,
      "categoryRegional": string,
      "department": string,
      "departmentRegional": string,
      "departmentReasoningEnglish": string,
      "departmentReasoningRegional": string,
      "severity": "Low" | "Medium" | "High" | "Critical",
      "severityReasoningEnglish": string,
      "severityReasoningRegional": string,
      "channel": {
        "primaryEnglish": string,
        "primaryRegional": string,
        "portalName": string,
        "howToFileEnglish": string,
        "howToFileRegional": string
      },
      "expectedSLAEnglish": string,
      "expectedSLARegional": string,
      "complaintDraftEnglish": string,
      "complaintDraftRegional": string,
      "escalationLadder": [
        {
          "step": number,
          "actionEnglish": string,
          "actionRegional": string,
          "whenToUseEnglish": string,
          "whenToUseRegional": string
        }
      ]
    }
  ]
}
All *Regional fields must be written in ${regionalName}.`;
}

function rtiPrompt(regionalName: string): string {
  return `You are an expert on the Right to Information Act, 2005 (India). Given details of a civic complaint that has not been resolved within the expected timeframe, draft a complete RTI application addressed to the Public Information Officer (PIO) of the relevant department.

The application must:
1. Be addressed to "The Public Information Officer, [Department Name]"
2. Reference the RTI Act 2005, Section 6(1)
3. Ask for: (a) current status of the complaint, (b) name and designation of the officer responsible, (c) prescribed timeline for resolution as per citizen charter, (d) reasons for delay if any
4. Include the line: "I am depositing the prescribed fee of ₹10 (Rupees Ten only) as required under Section 6 of the RTI Act, 2005."
5. Use formal Indian administrative language
6. Include [YOUR NAME], [YOUR ADDRESS], [DATE] placeholders
7. End with "Yours faithfully" and signature block

Provide BOTH an English version and a ${regionalName} version (in ${regionalName} script, never transliterated English).

Respond with ONLY a single valid JSON object (no markdown, no commentary, no code fences) matching exactly this shape:
{
  "draftEnglish": string,
  "draftRegional": string
}
"draftRegional" must be written in ${regionalName}.`;
}

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
 * never crash the render. Legacy "*Hindi" field names (pre-regional schema)
 * are accepted as regional so complaints saved by older versions still load. */

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

const SEVERITIES: Severity[] = ['Low', 'Medium', 'High', 'Critical'];

function asSeverity(value: unknown): Severity {
  return SEVERITIES.includes(value as Severity) ? (value as Severity) : 'Medium';
}

/** Prefer each variant's own field; fall back to the other, then to `fallback`. */
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
    obj.expectedSLAEnglish, obj.expectedSLARegional ?? obj.expectedSLAHindi, '7–15 working days',
  );
  const [primaryEnglish, primaryRegional] = asPair(
    channel.primaryEnglish, channel.primaryRegional ?? channel.primaryHindi, 'Local municipal office',
  );
  const [howToFileEnglish, howToFileRegional] = asPair(
    channel.howToFileEnglish, channel.howToFileRegional ?? channel.howToFileHindi, '—',
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
      portalName: asString(channel.portalName, '—'),
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

function normalizeClassification(raw: unknown, regionalLang: UILanguage): ClassificationResponse {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const issues = Array.isArray(obj.issues) ? obj.issues : [];
  if (issues.length === 0) {
    throw new Error('AI returned no issues for this complaint');
  }
  return { issues: issues.map((issue) => normalizeIssue(issue, regionalLang)) };
}

function normalizeRTI(raw: unknown, regionalLang: UILanguage): RTIApplication {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const [draftEnglish, draftRegional] = asPair(obj.draftEnglish, obj.draftRegional ?? obj.draftHindi);
  if (!draftEnglish && !draftRegional) {
    throw new Error('AI returned an empty RTI draft');
  }
  return { draftEnglish, draftRegional, regionalLang };
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
  uiLang: UILanguage,
): Promise<ClassificationResponse> {
  const regionalLang = regionalFor(uiLang);
  const regionalName = languageMeta(regionalLang).englishName;

  const parts: string[] = [`Citizen's complaint: "${description}"`];
  if (city) parts.push(`City/Area: ${city}`);
  if (name) parts.push(`Citizen's name: ${name}`);

  const result = await callAI(parts.join('\n'), classificationPrompt(regionalName));
  return normalizeClassification(result, regionalLang);
}

export async function generateRTI(
  category: string,
  department: string,
  originalComplaint: string,
  area: string,
  expectedSLA: string,
  uiLang: UILanguage,
): Promise<RTIApplication> {
  const regionalLang = regionalFor(uiLang);
  const regionalName = languageMeta(regionalLang).englishName;

  const prompt = `Generate an RTI application for the following unresolved civic complaint:

Category: ${category}
Department: ${department}
Area: ${area}
Expected SLA: ${expectedSLA}
Original complaint: "${originalComplaint}"

The complaint was filed but not resolved within the expected timeframe. Draft the RTI application.`;

  const result = await callAI(prompt, rtiPrompt(regionalName));
  return normalizeRTI(result, regionalLang);
}
