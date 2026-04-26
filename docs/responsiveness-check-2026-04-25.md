# Responsiveness Check — Birchtree Financial

**Date:** 2026-04-25
**URLs tested:** `/`, `/about`, `/services`, `/team`, `/contact`
**Method:** playwright-core (Chromium 1217), single-session resize per URL,
8 standard breakpoints (320, 375, 768, 1024, 1280, 1440, 1920, 2560).
80 screenshots in `docs/screenshots/responsiveness/`.

## Executive summary

**Layout is responsive end-to-end.** No horizontal overflow at any width on
any page tested. Hero typography scales cleanly via the
`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl` pattern (and the
home page uses a clamp() that goes higher).

**One real issue found, repeated everywhere: touch targets under 44 px on
mobile (≤ 768 px).** The targets affected are the Navbar mobile menu button
(40 × 40 px), all 12 footer links (~60 × 20 px), and the team page View
Profile button (133 × 36 px). All under the WCAG 2.5.5 / Apple HIG / Material
44 px minimum.

## Layout transitions detected

| Transition | Approx width | Behaviour |
|---|---|---|
| Navbar collapses to hamburger | ~1024 px | Switches at lg breakpoint, clean |
| Footer 4-column → 1-column | ~768 px | Stacks at md breakpoint, clean |
| Service-card grid 3 → 2 → 1 col | ~1024 / 768 px | Reflows at lg / md, clean |
| Team-card row → stack | ~768 px | Photo + content stack at md, clean |
| Hero h1 size growth | 30 → 48 → 60 → 72 px | text-3xl → 4xl → 5xl → 6xl/7xl |
| Home hero h1 (clamp) | 42 → 60 → 83 → 88 px | Larger curve, fluid |

## Findings

### High
*(none)*

### Medium

- **Navbar hamburger 40 × 40 px** at all mobile widths — under the 44 px
  Apple HIG / WCAG touch target minimum. → Bump to `w-11 h-11` (44 px).
- **Footer link tap areas ~60 × 20 px** at all widths (12 links, on every
  page) — text-only links with no padding. → Add `py-2 -my-2` so the tap area
  is 36 px+ without visually changing spacing, or `py-3` for full 44 px.
- **Team page "View Profile" button 133 × 36 px** — `size="sm"` button height
  is 36 px. → Use default size or bump min-h to 44 px.

### Low

- Per-row touch-target audit only finds 6 elements per page (the worst
  offenders); other elements like footer contact icons (32 × 32 px) and
  chatbot toggle (correctly 56 × 56 px) are above threshold.

## Per-page metrics (h1 px / overflow / small-tap count)

```
home      320:42  375:42  768:60  1024:72  1280:83  1440:88  1920:88  2560:88   overflow: none everywhere
about     320:30  375:30  768:48  1024:60  1280:72  1440:72  1920:72  2560:72   overflow: none everywhere
services  320:30  375:30  768:48  1024:60  1280:72  1440:72  1920:72  2560:72   overflow: none everywhere
team      320:30  375:30  768:48  1024:60  1280:72  1440:72  1920:72  2560:72   overflow: none everywhere
contact   320:30  375:30  768:48  1024:60  1280:72  1440:72  1920:72  2560:72   overflow: none everywhere
```

The home page hero is intentionally larger (it uses a clamp() with a 5.5rem
ceiling) — confirmed working. The other four pages match the Resources
heading sizing the user requested.

## What looks good

- No horizontal overflow at any breakpoint on any page tested.
- Hero typography scales smoothly through every breakpoint.
- All grid layouts reflow cleanly at the documented breakpoints.
- Aurora animations correctly disabled on coarse-pointer devices (no jank
  detected on mobile widths).
- Navbar / footer / chatbot work at every width.

## Top fixes (in order)

1. **Navbar hamburger:** `w-10 h-10` → `w-11 h-11` (44 px). One-line fix.
2. **Footer links:** add tap padding so they hit ≥ 44 px without inflating
   visual rhythm. `block py-2 -my-2` or move spacing onto the link element.
3. **Team View Profile button:** drop `size="sm"`, use default size (44 px).
