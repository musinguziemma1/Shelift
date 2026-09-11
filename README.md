# SHELIFT — One-Page Website

A premium, single-page organizational website for **SHELIFT — Sustainable
Health, Education, and Livelihood Initiative for Transformation**, built as a
world-class international-development organization site.

> **Content source:** All copy is drawn from the SHELIFT Strategic Plan
> 2025–2027. No programs, achievements, statistics, partnerships, impact
> numbers, or contact details have been invented.

---

## Stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | React 19 + Vite 7                                  |
| Language   | TypeScript (strict)                                |
| Styling    | Tailwind CSS v4 (design tokens in `src/index.css`) |
| Motion     | Framer Motion (scroll reveals, panel system)       |
| Icons      | Lucide React                                       |
| Imagery    | Design-led placeholders generated with `sharp`     |

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server
npm run build        # type-check + production build (dist/)
npm run preview      # preview the production build
npm run generate:placeholders   # (re)generate brand-palette placeholder art
npm run fetch:photos            # fetch+optimize the Unsplash photo set (18 images)
```

> **Imagery:** the site currently uses **real photography from Unsplash**
> (see `images-credits.md`), downloaded and optimized via `npm run fetch:photos`.
> These are representative photos — not SHELIFT field photography. Replace them
> with official photos by dropping files into `public/images/` under the same
> filenames.

## Project structure

```text
shelift/
├── index.html                     # SEO, Open Graph, JSON-LD, favicons, fonts
├── api/
│   └── contact.ts                 # Vercel serverless — contact form → Resend
├── public/
│   ├── images/                    # all imagery (swap in real photos here)
│   └── logo.png, logo-white.png, favicon-*.png, robots.txt, site.webmanifest
├── scripts/
│   ├── generate-placeholders.mjs  # renders brand-palette placeholders w/ sharp
│   └── fetch-unsplash.mjs         # downloads + optimizes the Unsplash photo set
└── src/
    ├── main.tsx
    ├── App.tsx                    # page composition + code-splitting
    ├── index.css                  # Tailwind v4 theme (colors, fonts, utilities)
    ├── data/
    │   ├── images.ts              # ★ central image configuration
    │   ├── content.ts             # hero, nav, about, vision & mission…
    │   ├── strategicAreas.ts      # the four strategic areas
    │   ├── storytelling.ts        # approach, gallery, impact chain
    │   ├── leadership.ts          # founder + governing board
    │   └── engage.ts              # targets, partnerships, CTA, contact, footer
    ├── hooks/
    │   ├── useActiveSection.ts    # nav active-link tracking (lazy-ready)
    │   └── useScrolled.ts         # navbar compact/opaque transition
    ├── lib/motion.ts              # shared Framer Motion variants/easing
    └── components/
        ├── ui/                    # ButtonLink, SectionHeading, Reveal,
        │                          # Counter, SmartImage
        ├── Navbar, Hero, PurposeStrip, About, VisionMission, StrategicAreas,
        │   Approach, StoryGallery, ImpactPathway, Targets, Leadership,
        │   Partnerships, Cta, Contact, Footer, Brand
        └── ...
```

## Replacing placeholder images

All imagery is routed through `src/data/images.ts` (`src/assets/` is *not*
used for photos):

```ts
export const images = {
  hero: "/images/hero.jpg",
  ...
};
```

Drop real photography into `public/images/` with the same filenames and the
site picks them up automatically. `SmartImage` components lazy-load images
(below the fold), and a graceful gradient + monogram fallback renders if any
asset is missing.

Recommended dimensions:
`hero` / `cta` 1920×1280 · `about` / `founder` 1200×1500 · strategic areas
1200×1500 · story tiles 1500×1000 · `og-image` 1200×630.

## Leadership section

A dark editorial section sits between **2025–2027 Ambition** and
**Partnerships**, featuring founder **Dorah Nakagga** (named in the Strategic
Plan) with portrait + story, followed by the **Governing Board**.

Board member **names are real** (per the Strategic Plan / governing board
records) but portraits are intentionally **initials monograms** until
consented photography exists — pairing real names with stock photos of other
people is a credibility risk for an NGO. When real portraits are ready, drop
them in `public/images/` and restore the `SmartImage` render in
`src/components/Leadership.tsx` (the previous image-based markup is in git
history, commit `e328ecd^`).

```ts
board: [
  {
    id: "board-01",
    name: "Board Member Name",
    role: "Board Chair — Governance",
    short: "Two-sentence biography from the Strategic Plan.",
  },
  // …board-02, board-03
],
```

A generated `founder.jpg` portrait placeholder exists in `public/images/` —
drop in the real portrait under the same filename when available.

## Design system

- **Colors:** deep botanical forest green, warm terracotta, soft sand, muted
  gold, warm ivory — defined as Tailwind tokens (`forest-*`, `clay-*`,
  `sand-*`, `gold-*`, `ivory`, `charcoal`) in `src/index.css`.
- **Type:** *DM Serif Display* for editorial headlines, *Manrope* for UI/body.
- **Hero slider:** a five-slide cinematic carousel — each linking to one of
  SHELIFT's strategic areas (intro, health, education, livelihoods,
  leadership) with crossfading images, line-by-line headline reveals, autoplay
  (paused on hover/focus/reduced-motion), prev/next/dot/play–pause controls,
  and full carousel ARIA semantics.
- **Back-to-top button:** a floating circular control that appears after
  scrolling past the hero, with smooth scroll (auto for reduced motion).
- **Motion:** one shared easing `[0.22, 1, 0.36, 1]` in `lib/motion.ts`;
  centralized variants; `prefers-reduced-motion` is respected globally via
  `MotionConfig reducedMotion="user"` and per-component hooks.
- **Interactions:** expanding four-panel strategic-area system (desktop) that
  recomposes into a stacked accordion (mobile), animated counters for
  **strategic targets** (never presented as achieved results), parallax CTA,
  hover caption reveals in the gallery, arrow micro-interactions on buttons,
  animated nav underlines, and a full-screen animated mobile menu.

## Accessibility

- Semantic landmarks and heading hierarchy
- Skip-to-content link, visible focus states, keyboard-friendly panels
- `aria-expanded`/`aria-invalid`/`aria-describedby` wiring, `role="alert"` /
  `role="status"` for form feedback
- Full `prefers-reduced-motion` support (static, clean experience)

## Contact form

The form is fully wired: it POSTs to the **Vercel serverless function**
`api/contact.ts`, which validates, sanitises, and sends via **Resend** to the
organisation inbox. Hardening included: HTML-escaping of every user-supplied
value (prevents email-content injection), a hidden **honeypot** field,
per-IP burst rate limiting (5 per 15 min), same-origin enforcement, and
length caps on all inputs. Configuration:

```bash
cp .env.example .env   # add RESEND_API_KEY locally
```

Set `RESEND_API_KEY` in Vercel → Settings → Environment Variables for
production. `CONTACT_TO` / `CONTACT_FROM` are optional overrides — switch
`CONTACT_FROM` to `website@sheliftuganda.org` once the domain is verified in
Resend (SPF/DKIM), as the default `onboarding@resend.dev` is a sandbox sender.

## SEO

`index.html` ships the canonical URL, Open Graph + Twitter card meta with
absolute image URLs, enriched `NGO` + `WebSite` JSON-LD (contact point,
`knowsAbout`, geo tags), `robots.txt`, and a `sitemap.xml`. Remaining
pre-launch items: verify the domain in Google Search Console and submit the
sitemap, connect official social accounts (populates `sameAs` in the schema,
currently empty), and optionally pre-render the route so crawlers get
content-bearing HTML without executing JavaScript.

## Custom cursor

Per the brief, hover interactions are intentionally restrained; a custom
cursor layer was deliberately *not* added to keep the site calm and avoid
annoyance — pointer hover is handled with scale/opacity/underline
micro-interactions instead.