# Birchtree Financial — Design System (MASTER)

> Source of truth for all visual + interaction patterns on
> birchtreefinancial.ca. Page-specific overrides live in
> `design-system/pages/<page-name>.md`.

## Brand voice

**Trustworthy, refined, clear.**

Editorial private-bank, executed with restraint. The audience is a broad mix
of Canadian visitors making a slow, considered decision about an advisor.
Surfaces should read as designed, not generated.

Anti-patterns to avoid: side-stripe accent borders on cards, gradient text,
nested glassmorphism, italic accent words in headings, AI-fintech cyan/neon
aesthetics, identical 3-up icon grids in every section.

## Color tokens

OKLCH-friendly hex tokens (defined as CSS custom properties in
`app/globals.css`):

| Token | Value | Usage |
|---|---|---|
| `--bt-midnight` | `#0B1A2C` | Primary brand, dark surfaces |
| `--bt-midnight-2` | `#152439` | Midnight light variant |
| `--bt-midnight-3` | `#050E18` | Midnight dark variant |
| `--bt-gold` | `#D7C38A` | Accent — used sparingly (eyebrows, CTAs, hairlines) |
| `--bt-gold-deep` | `#C6A667` | Gold deep variant |
| `--bt-cream` | `#F5F7FA` | On-dark base |
| `--bt-paper` | `#FBFAF6` | Light section default — warm-tinted toward midnight |
| `--bt-paper-2` | `#F6F4EE` | Light section secondary |
| `--bt-ink` | `#0B1A2C` | Primary text on light |
| `--bt-ink-soft` | `#2A3142` | Secondary text on light |
| `--bt-ink-mute` | `#5A627A` | Muted text on light |
| `--bt-on-dark` | `#F5F7FA` | Primary text on dark |
| `--bt-on-dark-soft` | `rgba(245,247,250,0.72)` | Secondary text on dark — verified WCAG AA |
| `--bt-on-dark-mute` | `rgba(245,247,250,0.48)` | Tertiary text on dark |
| `--bt-line` | `rgba(11,26,44,0.08)` | Hairline divider on light |
| `--bt-line-strong` | `rgba(11,26,44,0.16)` | Strong divider on light |
| `--bt-line-dark` | `rgba(215,195,138,0.12)` | Gold hairline on dark |

**Contrast minimums:**
- Body text on dark: `text-white/75` or higher (≥ 4.5:1)
- Body text on light: `text-midnight/65` or higher
- Tertiary/meta on dark: `text-white/55–65`
- Tertiary/meta on light: `text-midnight/55–60`

The site-wide sweep (Phase 2/3) bumped all dark-surface body text to ≥`/72`.

## Typography

- **Display:** Libre Baskerville (`var(--font-heading)`) — serif. Bold (700)
  for headings. Italic loaded but **not** used as accent in headings (per
  user feedback — every brand voice should stay in one weight per heading).
- **Body / UI:** Inter (`var(--font-inter)`) — sans-serif.

### Hero h1 (matches Resources page pattern)
`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`
Renders 30 → 48 → 60 → 72 px. Used by `PageHeader` and bespoke heros on
about / services / team. Home hero is the only exception — it uses
`clamp(2.6rem, 1.6rem + 4.5vw, 5.5rem)` (renders up to 88 px) because it's
the showpiece surface.

### Section heading h2
`SectionHeader` renders at `clamp(1.85rem, 1.3rem + 2.2vw, 3.4rem)` —
fluid 30 → 54 px.

### Body & lead
- Body: `clamp(0.95rem, 0.92rem + 0.15vw, 1.05rem)` (`--bt-fs-body`)
- Lead/subtitle: `clamp(1.05rem, 1rem + 0.4vw, 1.25rem)` (`--bt-fs-lead`)

### Eyebrow
`text-[0.7rem] sm:text-xs uppercase tracking-[0.28em]` — gold on light,
`gold/70` on dark. Always paired above headings.

## Spacing (4pt scale)

`--bt-space-1` (4px) → `--bt-space-32` (128px). Section vertical rhythm via
`--bt-section-y` = `clamp(4rem, 6vw + 2rem, 9rem)` (default) or
`--bt-section-y-tight` = `clamp(3rem, 4vw + 1.5rem, 6rem)`.

## Motion

| Token | Value | Usage |
|---|---|---|
| `--bt-dur-fast` | `160ms` | Hover color shifts |
| `--bt-dur` | `240ms` | Default transitions |
| `--bt-dur-slow` | `380ms` | Section reveals |
| `--bt-ease` | `cubic-bezier(0.22, 1, 0.36, 1)` | ease-out-quart, default |
| `--bt-ease-emphasis` | `cubic-bezier(0.16, 1, 0.3, 1)` | ease-out-expo, hero |

**Rules:**
- One choreographed entrance per section (`Reveal` / `RevealStagger`), not
  per-element.
- No bounce, no elastic — feel dated.
- Aurora animations gated off coarse-pointer devices (mobile) and
  reduced-motion users via `app/globals.css` media queries.
- Hero scroll-driven parallax was removed — adds main-thread cost on every
  scroll for marginal visual benefit.

## Elevation

| Token | Value |
|---|---|
| `--bt-elev-1` | `0 1px 2px rgba(11,26,44,.04), 0 2px 8px rgba(11,26,44,.04)` |
| `--bt-elev-2` | `0 2px 6px rgba(11,26,44,.05), 0 8px 24px rgba(11,26,44,.06)` |
| `--bt-elev-3` | `0 4px 12px rgba(11,26,44,.06), 0 16px 40px rgba(11,26,44,.08)` |
| `--bt-elev-dark-1` | `0 1px 2px rgba(0,0,0,.4), 0 0 0 1px rgba(215,195,138,.06)` |
| `--bt-elev-dark-2` | `0 8px 28px rgba(0,0,0,.45), 0 0 0 1px rgba(215,195,138,.08)` |

`will-change` is **never** applied to infinite-loop animations — only to
hover states where the layer is short-lived.

## Layout primitives (`components/ui/`)

### `<Section tone rhythm topRule grain>`
Vertical rhythm + tonal background. Replaces every `py-20 sm:py-28 md:py-36
lg:py-44 relative bg-...` block.

- `tone="paper"` — warm light (default for content sections)
- `tone="paper-soft"` — alternate light
- `tone="dark"` — navy with subtle aurora
- `tone="dark-aurora"` — navy with deeper aurora + vignette
- `rhythm="tight"` — half the default vertical padding
- `topRule` — adds the gold hairline divider at the top edge
- `grain` — adds film-grain overlay (skipped on touch devices)

### `<Container size>`
Single source of truth for horizontal gutters and max-width. Replaces
`container mx-auto px-4 sm:px-6 lg:px-8`.

- `size="narrow"` — `max-w-3xl` (prose, single column content)
- `size="default"` — `max-w-6xl` (most pages)
- `size="wide"` — `max-w-7xl` (showpiece)

### `<Eyebrow tone>`
Small uppercase tracking text above headings. `tone="dark"` for on-navy
surfaces.

### `<SectionHeader eyebrow heading subtitle rule align tone as>`
The eyebrow + heading + (gold rule) + subtitle pattern that sits at the top
of nearly every section. Replaces ~10 lines of boilerplate per section.

### `<Reveal y delay>`
Single-element fade+y on viewport entry. One easing
(`ease-out-quart`), respects `prefers-reduced-motion`.

### `<RevealStagger stagger y>`
Wrap a list/grid so children fade+rise in sequence as the parent enters
the viewport. **Use sparingly** — design principle is one entrance per
section, not one per element.

## Layout component

### `<PageHeader title subtitle eyebrow accent>`
Dark-navy hero band used at the top of secondary pages (faq, contact,
ai-advisor, helpful-tools, why-you-need-a-will, blog, resources, team
[slug], etc.). About / services / team have **bespoke** heros (per user
preference) instead of using PageHeader.

## Card patterns

### Light service card (`/services`, `/`)
- White background, `border: 1px solid rgba(11,26,44,0.07)`
- Shadow: `--bt-elev-1` resting → `--bt-elev-2` hover
- Top hairline that scales 0 → 100% on hover via gold gradient
- Icon in soft midnight ring (`bg-midnight/[0.04] ring-1 ring-midnight/[0.05]`)
- Optional serif italic gold numeral (01–06) at top-right
- "Learn more →" link at bottom

### Dark mission/value card (about, home mission section)
- `rgba(11,26,44,0.55)` background
- `border-gold/10` resting → `border-gold/25` hover
- Icon in `border-white/[0.07] bg-white/[0.03]` ring

### Team member row (`/team`)
- Dark navy gradient background
- Top gold hairline
- Photo + content in 1/3 + 2/3 grid
- Credential badge in `bg-gold/[0.06] border-gold/25`
- Number-stat with gold numeral + small uppercase label

### Pull quote (`/about`)
Conventional left-rule treatment is allowed for **blockquotes** — this is
not the side-stripe AI tell. Border-left at 1px gold/55 with gold opening
quote behind.

## CTA pattern

### Dark-surface CTA pair
Gold primary + white-ghost secondary. Used on home, about, services, team,
faq, will, contact CTAs.

```tsx
<Button asChild size="lg" className="rounded-xl border-0 bg-gold ...">
  <Link href="/contact">Book a Consultation <ArrowRight /></Link>
</Button>
<Button asChild size="lg" className="rounded-xl border border-white/[0.12] bg-white/[0.04] ...">
  <Link href="/services">Explore Services</Link>
</Button>
```

## Touch & accessibility minimums

- All interactive elements ≥ **44 × 44 px** (Apple HIG / WCAG 2.5.5).
  Verified by responsiveness-check across all 5 main pages.
- Body text contrast ≥ 4.5:1 on both surfaces.
- Focus rings preserved (no `outline: none` without replacement).
- All animations respect `prefers-reduced-motion`.
- Aurora animations also disabled on `(hover: none) and (pointer: coarse)`.
- Form inputs ≥ 16px font size on mobile (prevents iOS auto-zoom).

## Image pipeline

- All raster assets live in `/public` as **WebP** (converted via cwebp
  q=82 m=6 from PNG sources).
- All `<img>` rendered through `next/image` so the browser receives
  AVIF/WebP at the requested display size.
- `priority` set on first above-the-fold image per page (LCP candidate).
- `sizes` attribute set on every Image so the browser picks the smallest
  variant.
- next.config.js: `formats: ['image/avif', 'image/webp']`,
  `minimumCacheTTL: 30 days`.

## Performance budget

| Page | First Load JS |
|---|---|
| / | 157 kB |
| /about | 160 kB |
| /services | 154 kB |
| /team | 152 kB |
| /contact | 145 kB |
| /faq | 153 kB |
| Tools w/ charts | 140 kB (recharts dynamic-imported) |
| Shared chunk | 87.8 kB |

Bundle-splitting rules:
- Chat panel: launcher only on initial load; panel lazy-loaded on idle/click
- Recharts: per-calculator dynamic import with skeleton placeholder
- Cloudflare Stream video iframe: deferred until in-view via
  IntersectionObserver
- Radix Select replaced with native `<select>` where the dropdown is
  trivial (e.g. payment frequency)

## File layout

```
components/
  ui/
    section.tsx            ← Section primitive
    container.tsx          ← Container primitive
    eyebrow.tsx            ← Eyebrow primitive
    section-header.tsx     ← SectionHeader primitive
    reveal.tsx             ← Reveal + RevealStagger
    button.tsx, card.tsx, accordion.tsx, ...   (shadcn/ui base)
  layout/
    Navbar.tsx
    Footer.tsx
    PageHeader.tsx         ← Dark hero band for secondary pages
  HeroBackground.tsx       ← Server-rendered hero gradient mesh (home)
  ChatBot.tsx              ← Launcher (panel dynamic-imported)
  ChatBotPanel.tsx         ← Heavy chat UI (lazy)
  RevealText.tsx           ← Lightweight drop-in for legacy heading reveals
  FAQSection.tsx           ← Shared FAQ block (uses Section + SectionHeader)

app/globals.css            ← Tokens (under :root) + utilities
.impeccable.md             ← Design context (audience, voice, principles)
design-system/MASTER.md    ← This file
```

## When to break the system

Bespoke per-page treatments are allowed when they reinforce the brand
voice — the home hero and the team-page overlapping portrait circles are
intentional bespoke moments. Page-specific overrides should be documented
in `design-system/pages/<page>.md` rather than diverging silently.
