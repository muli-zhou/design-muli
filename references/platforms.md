# Platforms and media

Read when the target is not a single phone-width web page, and when choosing an overlay. Radii and other component details: `craft.md`; motion: `motion.md`. Print and slides: `graphic.md`.

> **Status.** The native mobile and desktop app sections apply the same principles plus standard platform practice and are less tested than the web sections. When a real project confirms or contradicts them, replace the text through `evolve.md`.

The principles do not change between media. What changes is the size of the reader's view, the input (touch, pointer, keyboard, none), and where the artifact is consumed. Verify in that real medium: the actual viewport sizes, the actual app that opens an export, the printed size.

## Attention budget: Utility or Attract

Classify each screen, not each product: a ticketing app's event page is Attract, its order history is Utility.

| | Utility | Attract |
|---|---|---|
| Reader | already committed, returns often | not committed, gives a few seconds |
| Examples | settings, dashboards, billing, itineraries, forms, inboxes | poster, cover slide, landing hero, store listing, empty first run, onboarding |
| Intensity | calm; contrast and colour reserved for the protagonist and the must-act item | high, from the scale and contrast of one element and the empty space around it, in one brand colour; a focal image only if it is real material, otherwise type |
| Density | dense but ordered; three layers for long content | few words; the 3 facts that decide interest, nothing competing |
| Restraint applies to | material, borders, badges, repeated emphasis | the number of messages and colour roles, not intensity |
| Protagonist | the trigger answer or the must-act item, with its button | the one message or offer, with the deciding facts beside it |
| Test | 25% render, 3-second glance: the protagonist is seen first | thumbnail or distance view: what, when or price, and the action are readable |

On both: exactly one protagonist, one colour per role, and every value from the anchor in `DESIGN-NOTES.md`. A calm Utility screen still makes its protagonist stand out, and an intense Attract screen still has few elements.

## Web: one layout that adapts

Build phone-first and widen in two steps. Change these values in `DESIGN-NOTES.md`, not ad hoc.

| | Phone (< 640px) | Tablet (640–1023px) | Desktop (≥ 1024px) |
|---|---|---|---|
| Side gutter | 20px | 24px | 32px |
| Content width | full, single column | single column, max about 640px | max about 1120px, two columns about 7:5 |
| Main navigation | floating bottom tab bar, 4 items, safe-area aware | same | moves into the top bar as a segmented control, same indicator |
| Top bar | sticky, about 48px, translucent with a solid fallback | same | same, holds the navigation |
| Detail layer | bottom sheet, full height minus about 16px, rounded top, drag handle | right drawer, about 440px, full height | right drawer |
| Card grids | one column or horizontal scroll | 2 columns | 3 columns |
| Secondary column | below the main one | below | sticky beside the main column |

Rules:
- One detail pattern has two shapes. The same `<dialog>`-based layer is a bottom sheet on phones and a side drawer from 640px. Escape, the system back gesture and a close button all close it; focus returns to the row that opened it.
- Fixed bars carry navigation. Back ("← Source name", returning to where the reader came from, else home), the page title, and previous/next sit in the sticky top bar at every width. Under about 340px, the back label collapses to the arrow.
- Hover is an enhancement. Wrap hover effects in `@media (hover: hover)`; show fine-pointer-only controls (map zoom buttons) under `(hover: hover) and (pointer: fine)`. Anything revealed on hover is also reachable by tap.
- Hit areas are at least 44px, even when the visible control is 32px (extend them with a pseudo-element).
- On short landscape viewports (wide but under about 560px tall) a bottom sheet would cover the content; use a narrow side panel instead.
- Images: one high-priority hero image above the fold, the rest lazy; fixed aspect ratios so nothing shifts; on wide screens cap hero height (about 320–480px) instead of keeping the phone ratio.
- Accessibility media queries: under `prefers-reduced-motion: reduce`, keep opacity and colour transitions of about 150ms and drop movement and scale; under `prefers-reduced-transparency: reduce`, replace glass with a solid surface; under `forced-colors: active`, give custom marks a `CanvasText` border.
- Light and dark come from the same role tokens; do not darken photos in dark mode.
- Render widths to check: 375, 768 and 1280 at minimum; add 320 if the audience has small phones.

## Native mobile (less tested)

- Follow the platform's navigation model: iOS navigation bar with back at the top left and swipe-back from the edge; Android system back and predictive back. Do not draw a custom back where the system provides one.
- Sheets use the platform's detents (medium and large); the detail-layer rule (one pattern for detail) still holds.
- Hit targets: 44pt on iOS, 48dp on Android.
- Respect Dynamic Type or font scaling: test at the largest accessibility size; rows grow in height, they do not truncate key facts.
- Safe areas at every edge, including the home indicator and camera cutouts.
- Bottom tab bars hold 3–5 destinations used during the main moment of use (principle 2).

## Desktop apps (less tested)

- Windows can be resized: define a minimum width and check the layout at that width and at a large one.
- Typical structure: sidebar for destinations, main content, optional inspector on the right for detail. The inspector is the desktop's detail layer; do not use bottom sheets.
- Dialogs centred and sized to their content, for short forms and confirmations only (principle 7 overlay choice).
- Every action reachable by keyboard; frequent actions have shortcuts shown in menus and tooltips.
- Denser spacing than mobile is acceptable, but the scales stay fixed; density comes from smaller gaps, not from more sizes.
- Example: a settings window lists sections in a sidebar, each section is one group with one row form (label left, control right), and a change applies at once with no Save button unless it is irreversible.

## Print and graphic layout

Moved to `graphic.md` (decks, reports, portfolios, posters, one-pagers).

## Craft defaults

Moved to `craft.md` (radii and component floors), `motion.md` (easing, motion, continuity) and `flows.md` (loading, undo).
