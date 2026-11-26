# AI tells

Read before building any New screen, and at every T1 and T2 gate.

A model without an anchor falls back to a default kit, and readers recognise it at a glance as generated. Each item below is a finding when it appears without the anchor asking for it. None is banned outright: if the project's design system or brand guide defines it, use it as defined. `scripts/lint-design.mjs` detects the ones marked (lint).

## Screens

| Seen | Do instead | Check |
|---|---|---|
| Cream, beige or tinted page background chosen by default, with no anchor asking for it (lint) | White, or the anchor's page colour; a paper-like off-white or dark ground only on image-led pages when it suits the work and is written in the spec (`graphic.md`) | Sample the page background: it equals the page colour in the spec |
| Callout with a thick coloured left stripe (lint) | One plain sentence in a hairline box or strip, status icon plus ink text, with its action | No `border-left` of 3px or more with a colour |
| Uppercase, letter-spaced eyebrow label above headings (lint) | Sentence-case label in secondary text colour (for Latin text; CJK labels simply carry no letter-spacing or decoration), or delete it when the heading says the same | No `text-transform: uppercase` with `letter-spacing` |
| A coloured pill for every status (lint) | Coloured status text with its icon; pills only where the anchor defines them | Count pills on the render: zero unless the anchor has them |
| A rounded, bordered card around every group | Spacing between groups and hairlines between levels; a card only for an item tappable as a whole | Count bordered or shadowed boxes: only whole-item tap targets and floating surfaces |
| Shadow on in-flow cards (lint) | No shadow in flow; one layered shadow on menus, popovers, dialogs | Every `box-shadow` belongs to a floating surface |
| Dashed border for "pending" or empty (lint) | Position and container per principle 10, plus a plain label | No dashed borders |
| Donut or ring chart for a single ratio | The number, with its denominator ("7 of 12") | No circular chart showing one value |
| Row of 3–4 KPI cards with giant numbers | One number strip: the figures in a row, one size, labels beneath, no boxes | At most one display-size number per screen |
| Three status hues (amber, green, red) on one screen | One accent plus the single status that matters now | Count distinct hues on the render: accent plus at most one status |
| Serif headings with sans body, by default | One family by default; a declared pair only when each family has one job written in the spec (e.g. serif for titles, sans for data) | Count font families: one, or the declared pair |
| Dark slab hero card in an otherwise light page | The protagonist at the page's own colours, made dominant by size and position | No section with an inverted background unless the anchor has one |
| Tinted circle behind every icon | Icons alone at text colour, or no icons | No filled circles around icons |
| Gradients, glow, glass (lint) | Only where the anchor defines the brand's one distinctive graphic device (e.g. a gradient or pattern), and in one place (a cover, a hero) | Gradients and blurs appear at most once and are in the anchor |
| Emoji as icons, or icons mixed from several sets | One icon set with a constant stroke, or none | All icons share stroke width and corner style |
| Everything centred | Left-aligned to a shared margin; centre only a single short line on a cover | Text edges line up on the 25% render |
| Filler illustration or stock art | Real material, or typography and space only | Every image is real material or the work itself |
| Status or success toast with "Success!" | The result in a few words ("Saved", "Link copied"), or nothing when the change is visible | No "success" in toasts, no exclamation marks |

## Slides and documents

| Seen | Do instead | Check |
|---|---|---|
| Tinted wash or gradient on every slide | Plain body slides; the brand's distinctive graphic device, if any, on the cover and back cover only | Body slides share the plain page colour |
| Rounded, shadowed content cards on slides | Radius 0, no shadows; grouping by grid and horizontal rules | No shadows on any page |
| Display face and slogan titles | One family by default, or a declared pair as above; each title or lead is a full conclusion sentence | Reading the leads in order tells the story |
| Gradient logo block on every slide | Logo on cover and back cover; a small running mark at most | Logo appears on body slides only as a small running mark, if at all |
| Donut with a legend | Bars with numbers on them, direct labels, baseline only | No legends, no gridlines |
| Icons and people pictograms decorating points | No icons; the text carries the point | Count icons: zero unless they carry meaning |

## How to use this list

1. Before building: name any item the anchor requires, and treat the rest as off.
2. At a gate: run `scripts/lint-design.mjs`, then scan the render against both tables.
3. For each hit: remove it, or point to the anchor line that requires it. Write any new recurring tell into `LESSONS.md` through `evolve.md`.
