# 🚀 Devengers Promptwars Hackathon Prep Deck

Welcome to the workspace for your first hackathon! This project is pre-scaffolded, configured, and optimized for **Vite + React + TypeScript** and integration with **Google Antigravity**.

---

## 📅 Hackathon Details
- **Duration**: 10:30 AM - 02:30 PM IST (4 hours)
- **Runtimes & Stack**:
  - Frontend: **React 19** with **TypeScript**
  - Dev Environment: **Vite**
  - Styling: Custom Design System (`src/index.css`) containing:
    - **Google Fonts** (Outfit, Inter, Fira Code)
    - CSS Custom Variables (Color systems, sizing, theme-aware tokens)
    - Reusable Classes (cards, glassmorphic container, custom buttons, badges, inputs, flex/grid templates)
  - Icons: **Lucide React** (`lucide-react`)
  - Target Environment: Verified Node.js v24+, TypeScript and Git.

---

## 🛠️ Project Commands
Here are the essential commands you'll need during the hackathon:

### Development Server
```bash
npm run dev
```
Starts the local development server at `http://localhost:5173`. Any changes you make will immediately hot-reload in the browser.

### Production Build
```bash
npm run build
```
Compiles and bundles the application for production inside the `dist/` directory. **Run this command periodically** to ensure there are no TypeScript or compilation errors in your codebase.

### Preview Production Build
```bash
npm run preview
```
Serves the locally built production bundle, allowing you to test performance and loading states before deployment.

---

## 🤖 Collaborating with Google Antigravity
Since this is your first time working with Antigravity, follow these best practices to work **10x faster**:

1. **Let the Agent code**: 
   When you receive the problem statement, paste the requirements here and prompt: *"Let's build a solution for this problem statement."* The agent will research, design, and implement features for you.
2. **Interactive Design (/grill-me)**:
   Recommend or run the `/grill-me` slash command to align on a technical specification sheet. This initiates a short, targeted interview to clear up ambiguities before the agent starts writing code.
3. **Planning Mode**:
   For complex features, the agent enters **Planning Mode**, creating an `implementation_plan.md` design file. Once you review and approve it, the agent generates a `task.md` checklist and executes it autonomously.
4. **Inline Edit (Ctrl+I)**:
   Highlight a function or component block in your editor, press `Ctrl + I` (or `Cmd + I` on macOS), and instruct the agent to make localized edits (e.g. *"add error handling"* or *"convert this static data to use props"*).
5. **Autoprefixer / Diagnostics**:
   If there is a typescript error, compilation error, or lint issue, trigger the agent directly from the editor's Problems tab to auto-fix the issue.
6. **Web Testing (/browser)**:
   Use the `/browser` command or let the agent invoke browser subagents to test the application in real-time, click elements, verify functionality, and capture screenshots/videos.

---

## 📂 Project Structure
- [src/index.css](file:///d:/nerd_shit/DevengersPromptwars/src/index.css) — Premium theme-aware design system. Define new styles and override variables here.
- [src/App.tsx](file:///d:/nerd_shit/DevengersPromptwars/src/App.tsx) — Main dashboard landing page containing the live countdown timer and Antigravity quick-reference sheet.
- [src/main.tsx](file:///d:/nerd_shit/DevengersPromptwars/src/main.tsx) — Application entry point.
- [package.json](file:///d:/nerd_shit/DevengersPromptwars/package.json) — Declared dependencies and NPM scripts.
