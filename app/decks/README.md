# Decks — authoring guide

Unlisted, offline-capable presentation decks. Each deck is a fullscreen
slideshow at `/decks/<slug>`, reachable by URL but linked from nowhere
(`robots: noindex/nofollow`, inherited from `layout.tsx`). The `/decks` index
auto-discovers any `app/decks/<slug>/page.tsx`.

## Anatomy

- `layout.tsx` — fonts + robots only (no chrome). Self-hosts Archivo, Homemade
  Apple, and Playfair Display via `next/font/local` (woff2 in `./fonts/`) so a
  deck builds and renders with **zero network** — the offline-presentation
  guarantee.
- `page.tsx` (index) — blog-styled list; each row is a Folio-card thumbnail.
- `Deck.tsx` — the slideshow shell. Each child is one slide; navigate with
  **← / → / ↑ / ↓ / Space / Backspace / Home / End**. Only the active slide
  shows (cross-fade); a counter sits bottom-right.
- `LogoBorder.tsx` — frames a slide with the spinning signature logo
  (`/assets/LogoSpin2026.json`): a row top + bottom and a column each side,
  flex-distributed so it stays even and responsive.
- `<slug>/page.tsx` — a deck: `<Deck>` wrapping slide `<div>`s.

## Visual system

The whole deck reads as one system. Match it.

- **Ground** `#f5f5f5`, **ink** `#111`. Slides are full-bleed (`.slide`).
- **Headlines** — Archivo SemiBold **600**, line-height 110%, 0 tracking
  (`.slide-section-title`, `.slide-stat`). Spec'd at 150px on a 1920 canvas,
  scaled as `vw` so proportions hold full-screen.
- **Ampersand** — Playfair Display SemiBold **600**, +4% tracking
  (`.slide-amp`), e.g. `Models <span className="slide-amp">&amp;</span> Modes`.
- **Handwritten accents** — Homemade Apple, 150% line-height, −2.2% tracking
  (`.slide-eyebrow`, `.slide-footnote`). Used for eyebrows/footnotes/dates.
  **Always lowercase unless a proper name** ("part 2 of 4", "to prove a point";
  but "Maximillian Piras", "Larry Tesler", "@MVXMXM").
- **Optical centering** — the lockup (`.slide-content`) sits slightly above true
  center via a bottom margin; footnotes get a touch more top gap than eyebrows
  get bottom gap (headlines lack descenders, so equal margins read tight below).

## Slide archetypes (see `template/page.tsx`)

- **Title** — `slide--title` + `<LogoBorder />`, eyebrow / headline / footnote.
- **Section divider** — eyebrow / big headline (with `.slide-amp` if it has an
  ampersand) / footnote.
- **Stat** — eyebrow / `.slide-stat` big number / footnote.
- **Closer** — bookends the title with `<LogoBorder />`.

## Adding a deck

1. `app/decks/<slug>/page.tsx` exporting a `<Deck>` of slides.
2. Assets in `public/decks/<slug>/`; reference as `/decks/<slug>/file.ext`.
3. Thumbnail: `public/decks/<slug>/thumbnail.{svg,png,jpg,webp}` — the index
   picks it up automatically. It's a **hand-authored artifact**, so regenerate
   it whenever the title slide changes (the template's embeds the fonts + logo
   so it renders self-contained, matching the live slide).

## Publishing

Decks are unlisted by default. To publish one, link to it (nav, sketchbook) —
that's the only switch.
