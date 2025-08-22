# CRPS Awareness Game — Starter Repo (Audit-Ready)

This is a ready-to-upload starter repo that matches your audit plan. 
It includes:
- Vite + TypeScript setup
- Seeded RNG wrapper (single source for dice + deck draws)
- FSM scaffold for turn flow + flare logic
- zod schemas for card/ deck JSON
- Example deck JSON
- ESLint + Prettier
- Vitest unit tests + Playwright e2e scaffold
- Public assets folder with your board + card images

## Quick Start
1. Install Node 20+.
2. In a terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open the dev URL it prints (usually http://localhost:5173).

## Tests
```bash
npm run test        # Vitest unit tests
npx playwright install
npm run test:e2e    # If you add a script to run Playwright
```

## Where to Add Your Code
- Game logic: `src/core/*`
- Rendering & UI: `src/ui/*`
- Accessibility helpers: `src/a11y/*`
- Decks: `src/data/decks/*.json` (validated with zod schema)

## How to Upload to GitHub (no command line)
1. Download the ZIP from our chat.
2. Unzip it on your computer.
3. Go to https://github.com and click **New** (create repository).
4. Name it `crps-awareness-game` (or anything you like), keep it **Public** or **Private**.
5. Click **Create repository**.
6. On the new repo page, find the **…or upload an existing file** link, click it.
7. Drag the **entire folder** (not just the files) into the upload area.
8. Scroll down and click **Commit changes**.

That’s it — now you have a repo URL you can share for the audit.

## Notes
- Images live in `public/assets/` and are referenced from code.
- Replace the demo outcome picker in `GameFSM.drawCard()` with real deck draw + active card UI.
- Add real CI (GitHub Actions) when you’re ready; we can supply a workflow file.