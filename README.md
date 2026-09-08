# BureauInfo Prototype

A clickable prototype of the BureauInfo consumer cash-loan risk report portal, built for the
Product Manager case study: login → applicant search (with filters) → full credit report
(with an interactive offer slider, escalation, and behavioral AI signal) → admin/reporting
dashboard (with market/channel/status drill-down).

## Fastest way to get a live URL (no setup)

1. Go to https://codesandbox.io or https://stackblitz.com
2. Create a new **React** project
3. Replace the generated `src/App.js` with `src/App.jsx` from this folder
4. Copy `package.json`'s `dependencies` into the sandbox's dependency list (mainly `lucide-react`)
5. The sandbox gives you a shareable live URL immediately — that's your "Prototype URL" deliverable

## Running it locally

```bash
npm install
npm start
```

Opens at http://localhost:3000

## Publishing to GitHub Pages (for a permanent repo + URL)

```bash
git init
git add .
git commit -m "BureauInfo prototype"
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

Then enable GitHub Pages from the repo's Settings, or deploy via Vercel/Netlify by importing
the repo directly — both auto-detect Create React App and deploy with zero config.

## What's inside

- `src/App.jsx` — the entire prototype (login, search, report, admin dashboard)
- Built with React + Tailwind + lucide-react icons
- All data is fake/sample data, generated for this case study
