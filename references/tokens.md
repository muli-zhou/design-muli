# Default tokens

Read when the project has no anchor of its own: no design system, Figma file or brand guide, and no public system named by the owner. The values live in `assets/tokens.css`, ready to paste.

This is a neutral default in the tradition of the Geist design system and the Web Interface Guidelines (white page, near-black ink, one accent, closed scales); the values are this skill's own, not copied from either. Treat it as a starting anchor. When the project has an anchor, use the anchor's values and delete these. Whatever is used, copy the values into `DESIGN-NOTES.md` and use nothing outside them.

## Colour

| Token | Role | Use it for | Not for |
|---|---|---|---|
| `--page` | page background | the page, sheets, dialogs | tinted or cream backgrounds |
| `--fill` | subtle fill | whole-item tap targets, input wells, table header | wrapping every group in a card |
| `--fill-hover` | hover and pressed fill | hover and press on rows and quiet buttons | static decoration |
| `--hairline` | 1px separator | between rows and levels where size and colour are equal | boxes around sections |
| `--border` | strong border | inputs, secondary buttons | cards |
| `--text-3` | tertiary text | captions, placeholders, disabled | body text |
| `--text-2` | secondary text | labels, metadata, sentence-case section labels (for Latin text; CJK labels simply carry no letter-spacing or decoration) | the protagonist |
| `--ink` | primary text, icons | body, titles, the accent when there is no brand colour | |
| `--accent` | the one accent | the primary button, links, the current navigation state, focus | decoration, backgrounds of sections |
| `--ok` `--warn` `--bad` | status | coloured status text with its icon | filled pills, section backgrounds |

- One accent per product. Replace it with the brand colour; with no brand colour, set `--accent: var(--ink)`.
- At most one status colour usually appears on a screen; three at once means the screen is reporting too much.
- Contrast: `--text-2` and `--ink` meet 4.5:1 on `--page` and `--fill`; `--text-3` is for non-essential text only.
- Dark mode is a separate tuned set, not an inversion: lighter accent, softer status colours, a ring in the floating shadow.

## Type

| Token | Size / line height | Role |
|---|---|---|
| `--fs-12` | 12 / 16 | captions, footnotes, legal |
| `--fs-14` | 14 / 20 | secondary text, labels, table cells |
| `--fs-16` | 16 / 24 | body, inputs (16px stops iOS zoom on focus) |
| `--fs-20` | 20 / 28 | section and card titles |
| `--fs-28` | 28 / 36 | page title |
| `--fs-40` | 40 / 48 | display, at most once per screen (a hero number or cover title) |

- Weights 400, 500 and 600 only. Hierarchy comes from size and colour first, weight second.
- `--font-sans` lists a neutral UI sans first, then system fonts, then the system Chinese stack. Self-host the Latin face; do not load a Chinese webfont.
- `--font-mono` for codes, IDs and aligned time columns only. All other numbers use the sans with tabular figures (set on `body`).
- Chinese runs: line height about 1.6, no negative tracking, no italics, automatic CJK–Latin spacing.

## Space, shape, lines

- Spacing on a 4px grid: 4, 8, 12, 16, 24, 32, 48. Each project picks exactly three working values from it: one inside a row (8), one inside a group (12 or 16), one between groups (32 or 48).
- Radii: 6 for controls, 8 for panels, menus, dialogs and images; 0 for print. Nested shapes are concentric: inner radius = outer radius − padding.
- `--r-round` only for avatars and switch parts, not for status pills or buttons.
- A 1px line in `--hairline` separates levels. Prefer it, or space, over boxes.

## Elevation

- Nothing in the page flow has a shadow: no shadowed cards.
- `--shadow-float` is the one shadow, for surfaces that float over content: menus, popovers, dialogs, toasts.

## Controls

- Heights 32, 36, 40; 44 for touch targets (or a 44px hit area around a smaller visual).
- One filled button per view uses `--accent`; secondary buttons use `--border` or `--fill`; row-level actions are text or icon only.

## Motion

| Token | Value | Role |
|---|---|---|
| `--ease-out` | `cubic-bezier(.2,.8,.2,1)` | entrances, press and hover feedback |
| `--ease-in` | `cubic-bezier(.4,0,1,1)` | exits |
| `--ease-in-out` | `cubic-bezier(.45,0,.25,1)` | moves and resizes on screen |
| `--ease-spring-small` | `cubic-bezier(.3,1.4,.5,1)` | small confirmations up to about 64px |
| `--dur-1` / `--dur-2` | 100 / 150ms | hover and press / small changes and exits |
| `--dur-3` / `--dur-4` | 250 / 400ms | small entrances, menus, popovers / sheets and large surfaces on phones |
| `--dur-3m` | 300ms | medium surfaces on phones (dialogs, popovers with content, drawers) |

- `--ease` (= `--ease-out`) and `--dur-sheet` (= `--dur-4`) still work. Animate transform and opacity only.
- The reduced-motion block keeps short colour and opacity changes and removes movement. Rules: `motion.md`.

## Focus

- `--focus-ring`: a 2px page-coloured gap and a 2px accent ring, shown on `:focus-visible` only.
