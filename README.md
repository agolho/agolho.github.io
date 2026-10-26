# agolho.github.io

> If living is a sin, then I am a sinner

Personal portfolio of **Yusuf Bektas**, game developer. A casino-themed single page: playable slot machine (with a Konami-code bonus round), career "Game Recall" timeline, skills, shipped titles, side projects and contact.

Live at **https://agolho.github.io**

## Stack

- [Next.js](https://nextjs.org) 16 (App Router, static export) + React 19
- Tailwind CSS 4
- three.js for the shader backgrounds
- canvas-confetti for wins

## Develop

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # static export to ./out
npm run lint
```

## Where things live

| What | File |
| --- | --- |
| Hero card & page order | `src/app/page.tsx` |
| Career timeline, education, languages | `src/components/GameRecall.tsx` |
| Skills ("House Advantage") & shipped titles | `src/components/Inventory.tsx` |
| Side projects ("The Lounge") | `src/components/QuestLog.tsx` |
| Contact links | `src/components/Contact.tsx` |
| Resume download | `public/resume.pdf` |
| Page title & link-preview metadata | `src/app/layout.tsx` |

## Deploy

Every push to `master` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

`legacy_backup/` holds the previous hand-written site and is not part of the build.
