# 🌉 NagrikSetu — Your Civic Complaint Companion

**NagrikSetu** ("Citizen Bridge") turns a plain-language description of a civic problem — broken streetlight, garbage pile, open manhole — into ready-to-file, formally drafted complaints in **English plus the selected regional language**, tells you **exactly which department and portal** to file with, and helps you **track and escalate** all the way to an RTI application.

Multilingual UI (English, Hindi, Tamil, Bengali, Punjabi), works entirely in the browser — complaint data lives in `localStorage`, nothing is sent anywhere except the AI classification call.

## ✨ Features

- **Plain-language intake** — describe the problem like you'd tell a neighbor; compound problems are split into separate issues automatically
- **AI classification** — category, responsible department, severity, and expected SLA per citizen-charter norms
- **Formal drafts** — proper Indian administrative register letters in English plus the citizen's selected regional language, with copy & email actions
- **Where to file** — real portals (CPGRAMS, Swachhata App, state helplines) with step-by-step filing instructions
- **Complaint tracker** — status timeline (Drafted → Filed → Acknowledged → Resolved), overdue-SLA alerts
- **RTI escalation** — one click generates a complete RTI Act 2005 application when a complaint is ignored past its SLA
- **Area dashboard** — resolution stats and category breakdown for your saved complaints

## 🚀 Getting Started

```bash
npm install
cp .env.example .env.local   # then add your API key
npm run dev                  # http://localhost:5173
```

### AI provider configuration (`.env.local`)

| Variable | Purpose |
|---|---|
| `VITE_AI_PROVIDER` | `OPENAI`, `GROQ`, or `GEMINI` (legacy alias `GROK` = GROQ) |
| `VITE_OPENAI_API_KEY` / `VITE_GROQ_API_KEY` / `VITE_GEMINI_API_KEY` | Key for the chosen provider |
| `VITE_AI_MODEL` | Optional model override (defaults: `gpt-4o-mini`, `llama-3.3-70b-versatile`, `gemini-2.0-flash`) |
| `VITE_AI_BASE_URL` | Optional endpoint override |

> ⚠️ **Security note:** `VITE_*` variables are embedded in the client bundle and visible to anyone in DevTools. That's acceptable for a demo/hackathon deployment; for real production traffic, proxy the AI calls through a minimal backend so the key stays server-side.

## ✅ Testing & Quality

Zero-dependency test suite built on Node's native test runner (`node:test`) — no extra install, runs in under a second:

```bash
npm test          # 18 unit tests (~0.3s)
npm run lint      # oxlint static analysis
npm run quality   # lint + tests + type-check + production build, one command
```

| Suite | Covers |
|---|---|
| `tests/languages.test.ts` | Language metadata, regional-language resolution, bilingual field selection |
| `tests/ai-normalization.test.ts` | Untrusted AI responses normalized into render-safe data; legacy schema backward compatibility |
| `tests/strings.test.ts` | All 5 translation tables complete, no empty strings, placeholders intact, enum labels covered |
| `tests/sla.test.ts` | SLA parsing ("7–15 working days", "48 hours"), day-elapsed math, clock-skew safety |
| `tests/security.test.ts` | Secret files excluded from version control; key-exposure documentation present |

CI runs the same gate (lint → test → build) on every push via [GitHub Actions](.github/workflows/ci.yml). Pure logic (AI normalization, i18n, SLA math) lives in `src/lib/` as dependency-free modules, so it's testable without a DOM or mocks.

## 📦 Build & Deploy

```bash
npm run build     # type-checks + bundles to dist/
npm run preview   # smoke-test the production bundle locally
```

The output in `dist/` is a fully static SPA (no client-side routing), so any static host works with zero extra config:

- **Vercel** — `vercel` (framework preset: Vite). Add the `VITE_*` env vars in Project Settings → Environment Variables.
- **Netlify** — build command `npm run build`, publish directory `dist`. Add env vars in Site settings.
- **GitHub Pages** — set Vite `base` in `vite.config.ts` if serving from a subpath.

## 🛠️ Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **lucide-react** icons, hand-rolled design system in [src/index.css](src/index.css)
- AI via any OpenAI-compatible chat completions endpoint (OpenAI / Groq / Gemini)
- No backend, no database — `localStorage` persistence

## 📂 Project Structure

```
src/
├── App.tsx                  # Shell: header, language toggle, tabs, footer
├── strings.ts               # Complete multilingual dictionary (typed for parity)
├── types.ts                 # Domain types
├── lib/
│   ├── ai.ts                # Provider config, prompts, response validation
│   └── storage.ts           # localStorage persistence + demo seed data
└── components/
    ├── HeroBanner.tsx       # Landing hero with civic illustration
    ├── IntakeForm.tsx       # Complaint intake + results
    ├── IssueCard.tsx        # Classified issue: drafts, filing info, escalation
    ├── DraftTabs.tsx        # Draft display with copy/email
    ├── EscalationStepper.tsx
    ├── TrackerList.tsx      # Saved complaints with status timeline
    ├── RtiModal.tsx         # RTI application generator
    └── Dashboard.tsx        # Area statistics
```
