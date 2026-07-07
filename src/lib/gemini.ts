import type { ClassificationResponse, RTIApplication } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const MODEL = 'gemini-2.0-flash';
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models';

const CLASSIFICATION_SYSTEM_PROMPT = `You are an expert on Indian government administration, civic services, and grievance redressal mechanisms. A citizen will describe a civic problem in plain language. Your job is to:

1. SPLIT compound problems into separate issues (e.g., "streetlight broken AND garbage piling" = 2 separate issues).
2. CLASSIFY each issue: category, responsible department, severity.
3. IDENTIFY the best channel/portal to file the complaint, naming real Indian portals where confident (CPGRAMS, Swachhata App, IGRS, state-specific portals like PGMS for UP, CM Helpline for MP, etc.). Never invent URLs — name portals generically if unsure.
4. DRAFT a formal complaint letter in BOTH English and Hindi using proper Indian administrative register:
   - English: "Respected Sir/Madam, I wish to bring to your kind attention..."
   - Hindi: "माननीय महोदय/महोदया, मैं आपका ध्यान आकर्षित करना चाहता/चाहती हूँ..."
   - Structure: Subject line, Salutation, Body with dates/location details, Request for action, Closing with "Yours faithfully"
   - Include placeholders like [YOUR NAME], [YOUR ADDRESS], [YOUR PHONE NUMBER], [DATE] where citizen data is not provided.
   - If the citizen provides their name, use it. If city/area is provided, include it in the letter and reference the local municipal body.
5. PROVIDE an escalation ladder of 4-5 steps. The LAST step MUST ALWAYS be: "File an RTI application under the RTI Act 2005 asking for the current status and reasons for delay of your complaint."
6. ESTIMATE expected SLA based on citizen charter norms (e.g., "7-15 working days").

Use formal but readable language. Hindi drafts should use शुद्ध हिन्दी but remain accessible to common citizens.`;

const CLASSIFICATION_SCHEMA = {
  type: 'OBJECT',
  properties: {
    issues: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          category: { type: 'STRING' },
          department: { type: 'STRING' },
          departmentReasoning: { type: 'STRING' },
          severity: { type: 'STRING', enum: ['Low', 'Medium', 'High', 'Critical'] },
          severityReasoning: { type: 'STRING' },
          channel: {
            type: 'OBJECT',
            properties: {
              primary: { type: 'STRING' },
              portalName: { type: 'STRING' },
              howToFile: { type: 'STRING' },
            },
            required: ['primary', 'portalName', 'howToFile'],
          },
          expectedSLA: { type: 'STRING' },
          complaintDraftEnglish: { type: 'STRING' },
          complaintDraftHindi: { type: 'STRING' },
          escalationLadder: {
            type: 'ARRAY',
            items: {
              type: 'OBJECT',
              properties: {
                step: { type: 'INTEGER' },
                action: { type: 'STRING' },
                whenToUse: { type: 'STRING' },
              },
              required: ['step', 'action', 'whenToUse'],
            },
          },
        },
        required: [
          'category', 'department', 'departmentReasoning',
          'severity', 'severityReasoning', 'channel',
          'expectedSLA', 'complaintDraftEnglish', 'complaintDraftHindi',
          'escalationLadder',
        ],
      },
    },
  },
  required: ['issues'],
};

const RTI_SYSTEM_PROMPT = `You are an expert on the Right to Information Act, 2005 (India). Given details of a civic complaint that has not been resolved within the expected timeframe, draft a complete RTI application addressed to the Public Information Officer (PIO) of the relevant department.

The application must:
1. Be addressed to "The Public Information Officer, [Department Name]"
2. Reference the RTI Act 2005, Section 6(1)
3. Ask for: (a) current status of the complaint, (b) name and designation of the officer responsible, (c) prescribed timeline for resolution as per citizen charter, (d) reasons for delay if any
4. Include the line: "I am depositing the prescribed fee of ₹10 (Rupees Ten only) as required under Section 6 of the RTI Act, 2005."
5. Use formal Indian administrative language
6. Include [YOUR NAME], [YOUR ADDRESS], [DATE] placeholders
7. End with "Yours faithfully" and signature block

Provide both English and Hindi versions.`;

const RTI_SCHEMA = {
  type: 'OBJECT',
  properties: {
    draftEnglish: { type: 'STRING' },
    draftHindi: { type: 'STRING' },
  },
  required: ['draftEnglish', 'draftHindi'],
};

function parseJSON(text: string): unknown {
  let cleaned = text.trim();
  // Strip markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?\s*```$/, '');
  }
  return JSON.parse(cleaned);
}

async function callGemini(
  userPrompt: string,
  systemPrompt: string,
  schema: object,
  retries = 2,
): Promise<unknown> {
  const url = `${BASE_URL}/${MODEL}:generateContent?key=${API_KEY}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt }] },
          contents: [{ parts: [{ text: userPrompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
            responseSchema: schema,
            temperature: 0.7,
          },
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`API ${response.status}: ${errorBody}`);
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('Empty response from Gemini API');
      }

      return parseJSON(text);
    } catch (error) {
      if (attempt === retries) throw error;
      // Exponential backoff
      await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
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

  const result = await callGemini(
    parts.join('\n'),
    CLASSIFICATION_SYSTEM_PROMPT,
    CLASSIFICATION_SCHEMA,
  );

  return result as ClassificationResponse;
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

  const result = await callGemini(
    prompt,
    RTI_SYSTEM_PROMPT,
    RTI_SCHEMA,
  );

  return result as RTIApplication;
}
