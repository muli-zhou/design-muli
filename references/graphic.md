# Graphic layout

Read for decks, reports, portfolios, one-pagers, posters and covers. The 12 principles hold; this file adds what changes on a fixed page. The poster section is less tested than the rest.

Two kinds of page:
- **Document pages** (decks, reports, portfolios, one-pagers): read in sequence, often printed or projected. They use a fixed grid, a closed type scale, one colour and no ornament. Because the form stays the same from page to page, the reader can attend to the content.
- **Attract pages** (poster, cover, title slide): seen in passing. Principle 3 applies at large scale: one element dominates through size, contrast and the empty space around it, in one brand colour. Use a focal image only if it is real material or the work itself; otherwise type is the focal element.

## Canvas and grid

- Fix the canvas first: 1920×1080 for slides, A-sizes or the printer's spec for print. Write it in `DESIGN-NOTES.md`.
- A 12-column grid with fixed outer margins (e.g. 96 left/right, 56 top, 36 bottom at 1920×1080). Every block starts and ends on a column edge.
- Fixed vertical zones that do not move from page to page: title band, lead sentence, body, source line, footer rule at a fixed y. By page 2 the reader knows where to look.
- Safe margins: nothing, footers and page numbers included, touches or crosses the trim or the projector-safe edge. Print adds bleed (commonly 3mm) and a safe margin of 5–10mm inside the trim.
- Deliberate empty space: leave a zone empty rather than filling it with a shape, an icon or a tint.

## Type

A closed scale for 1920×1080, three weights at most:

| Role | Size / weight | Notes |
|---|---|---|
| Cover title | 112 / 600 | cover and back cover only |
| Page title | 48 / 600 | fixed position in the title band |
| Lead | 32 / 600 | one full conclusion sentence |
| Body and notes | 22–24 / 400 | |
| Table | 22 head / 20 body / 18 notes | |
| Number strip | 56 / 600 | at most one strip per page; numbers only, a non-numeric outcome is set as a normal sentence |
| Source line | 16 / 400 | secondary colour |
| Footer | 15 / 400 | running head, chapter progress, page N / total |

Scaling to paper: multiply by page width in points ÷ 1920. A4 landscape (842pt) ≈ ×0.44, A3 landscape (1191pt) ≈ ×0.62. Minimum: after scaling, no text is below 8pt in print. Lines that would fall below it (footer, source line, table notes on A4) are set at 8pt instead of being scaled.

- One family by default; a declared pair is allowed when each family has one job written in the spec (e.g. serif for titles, sans for data). Hierarchy within one family: size first, then weight, not colour; italic is available for Latin text only, so CJK decks use size and weight.
- Leads are conclusion sentences, not topic labels: "Returns fell 18% after the size guide launched", not "Returns". Read in sequence, the leads alone tell the whole story.
- One message per page. A second message is a second page.

## Colour and symbols

- One brand colour for titles, rules and the protagonist. A second accent only when it has exactly two declared meanings, used on few pages.
- A symbol table in `DESIGN-NOTES.md`: each colour and line style means one thing everywhere (solid = actual, dashed = forecast; accent = this year, grey = last year). It must survive greyscale printing: differ by value or line style, not hue alone.
- The brand's one distinctive graphic device (e.g. a gradient or pattern, a full-bleed photo, a coloured field) appears on the cover and back cover only; body pages are plain.

## Lines, tables, charts

- Horizontal 1px rules only: under the title band, above the footer, between table groups. No vertical lines, no boxes, no zebra stripes.
- Tables align numbers right with tabular figures; the header is separated by a rule, not a fill.
- Charts square-cornered, numbers on the bars, direct labels, baseline only; no legend, no gridlines, no donuts. For anything beyond simple bars and lines, use a dedicated charting tool.
- Radius 0 and no shadows on any page. No decorative icons or people pictograms.

## Running elements

- Running head top right (section or chapter name), footer with a small segmented chapter-progress bar and "N / total".
- Footer and running head sit at fixed coordinates on every body page; the cover and back cover omit them.

## Image-led pages (portfolios, case studies, catalogues)

- The work is the main visual: large images, with text in support. Captions small, secondary colour, factual (what, where, when, role), no adjectives.
- Images align to column edges and share the text's left margin.
- Annotations: numbered markers on the image keyed to a numbered list beside it, rather than arrows and callout boxes.
- The page is white by default. A paper-like off-white or a dark ground is allowed for image-led pages when it suits the work and is written in the spec; it is never a tint chosen by default with no anchor (`ai-tells.md`). Text colours swap with it from the same token set.
- A hairline under small section labels and a running head keep long documents navigable.

## Posters and covers

- Write the 3-second takeaway: what a passer-by must know. That message is the protagonist, set very large.
- The facts that decide attendance or interest (what, when, where, cost; "Free" is one) are all legible from the intended distance: letter height at least about distance ÷ 120 (2 m → about 17mm). Details may be small, but they stay a compact block, not half the page.
- Lists are short stacked lines or columns at readable size, not inline runs joined by "·" or "/".
- An illustration is either large, real and unambiguous at the viewing distance, or left out.
- No secondary message (a call for volunteers, a sponsor line) is set larger than the supporting details of the deciding facts.
- One colour, one role: one accent for the protagonist and deciding facts, neutrals for everything else.

## Checks before delivery

1. Overflow and line breaks: no text box overflows; no single word alone on a last line of a title or lead; no lead wraps to more than two lines. Script it for decks (measure every text box) where possible.
2. View at real size: print at 100%, or the projector or a screen of similar size; posters from the intended distance (a 25% render approximates 2 m for A3).
3. Greyscale pass: print or render in greyscale; every symbol still reads.
4. Leads only: read the leads in order; the story holds.
5. Run `references/ai-tells.md` (slides and documents table) on the renders.
