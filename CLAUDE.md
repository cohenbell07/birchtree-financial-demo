# Birchtree Financial — project memory

Next.js 14 App Router · Tailwind · framer-motion · lucide-react · TypeScript.
Marketing/advisory site for Birchtree Financial (Olds, AB). Body is the scroll
container (`html,body{height:100%}` in globals.css) — in Playwright/devtools use
`document.body.scrollTop`, NOT `window.scrollTo`, and avoid `fullPage`
screenshots (they expose the dark `html` bg as a fake dark band — use viewport
shots or scroll).

## Where we are right now (2026-05-31)
The **entire site was just redesigned to a light "private-bank" aesthetic** and
committed. This is the current state.

- **Branch:** `redesign/site-refresh` (HEAD = `30ed27b`). **NEVER commit to or
  touch `main`** — it stays at the safe/live commit `7e979a8`. Don't push
  without the user explicitly asking.
- Working tree clean. TypeScript passes (`npx tsc --noEmit` → 0 errors).
  All routes return 200.

### Run it
```bash
cd "/Users/marnibell/Documents/Birch tree financial"
PORT=3000 npm run dev        # → http://localhost:3000  (port 3000 is free here)
```

## The design system (match this for any new UI)
Light, airy, refined. Brand tokens (Tailwind names): `midnight` #0B1A2C (text +
navy buttons; `midnight-light` #152439), `gold` #D7C38A / `gold-dark` #C4B076
(ACCENTS ONLY — eyebrows, hairlines, small icons, rules), paper #FBFAF6 /
alt #F7F5EF, white. Fonts: **Libre Baskerville** headings (`font-heading`),
**Inter** body. **Primary buttons are NAVY** (`bg-midnight text-white`), never
gold-filled. Section bgs alternate `bg-white` / `bg-[#F7F5EF]`, rhythm
`py-20 sm:py-24`. Cards: `rounded-2xl border border-midnight/10 bg-white p-6`
with hover `-translate-y-1 ... hover:shadow-[0_18px_40px_rgba(11,26,44,0.09)]`.
Eyebrows gold-dark; gold hairline rule under headings
(`linear-gradient(to right, rgba(215,195,138,0.85), transparent)`).
Reference implementation = `app/page.tsx` (the homepage — the source of truth).
Reuse primitives in `components/ui/` (Container, Section, SectionHeader,
Eyebrow, Reveal/RevealStagger, Card, Button) and `components/layout/PageHeader`
(now light). No dark section backgrounds anywhere except the footer/nav.

## Key files
- `app/page.tsx` — homepage, the canonical light design
- `components/layout/{Navbar,Footer,PageHeader}.tsx` — Navbar has the vector logo
  + fixed dropdowns; PageHeader is the shared light page-hero band
- `components/brand/{BirchTreeMark,BirchtreeLogo}.tsx` — logo is now SVG+text
  (not a PNG); recolors via currentColor
- `components/{ChatBot,ChatBotPanel}.tsx` — light chatbot (navy launcher w/ gold
  icon; white panel, navy user bubbles)
- `app/globals.css` — tokens + `.bt-*` utilities + `.bt-section--*` tonal bgs
- `public/favicon.svg` + `favicon-16/32`, `apple-touch-icon`, `android-chrome-*`
  — redesigned navy badge favicon (regenerate via rsvg-convert; browsers cache
  favicons hard, hard-refresh to see)

## Gotchas / lessons (IMPORTANT)
- **Multi-agent workflows fabricated/dropped real content** on content-heavy
  pages during the redesign (team page had ALL real staff replaced with invented
  people; about/faq/resources/cpp-oas lost real copy/data/logic). These were
  caught and fixed by reverting to original content then re-styling with a
  content-locked pass. **If you run a styling workflow over content pages again,
  forbid touching any string/array and verify with a `git diff HEAD` content
  check.** Real data lives in arrays at the top of each page (teamMembers, stats,
  faqs, etc.) — never reword or invent these.
- Real team = Melissa Birch, Kevin Birch, Kaleb Birch, Crystal Smith, Art Birch
  (slugs melissa-birch/kevin-birch/kaleb-birch/crystal/art-birch; photos
  `/melissaupdate.webp`,`/Kevinupdate.webp`,`/kalebbirchtreenew.webp`,
  `/crystalteamimg.webp`,`/artbirchnew.webp`). Real about stats: 30+/500+/$1B+.
- Orphaned/unused since the logo rebuild (safe to delete): `components/Logo.tsx`,
  `components/LogoTreeIcon.tsx`, `components/BirchTreeIcon.tsx`,
  `public/birchtree logo22.png`, `public/newtreeicon.png`.
- `.preview/` and `.playwright-mcp/` are gitignored local scratch (screenshots,
  the workflow scripts `.preview/*.js`). Fuller history: `SESSION-NOTES.md`.
- `npm audit`: 14 vulns (7 moderate/7 high), untouched.

## Next up
User wants a few more **design touch-ups** (light theme already in place).
Make changes against the design system above; keep content/data byte-identical.
