# Craft floor

Read when building or auditing components. Each item is a minimum, with how to check it in code or on a render. Values refer to the anchor; where the project has none, to `assets/tokens.css`.

## Typography
1. Type sizes, weights and families come only from the anchor's closed scale. Check: `lint-design.mjs` counts; no value outside `DESIGN-NOTES.md`.
2. Hierarchy by size and colour first, weight second; at most three weights. Check: bold appears only where the reader's priority is.
3. Measure: body lines about 45–75 Latin characters or 25–40 Chinese characters. Check: widest body line on the largest render.
4. No synthetic bold or italic. Check: `font-synthesis-weight: none`; each weight used exists in the loaded font.

## Numbers
5. Tabular figures on all numbers that align, update or compare. Check: `font-variant-numeric: tabular-nums` on body or on every numeric element.
6. Monospace only for codes, IDs and aligned time columns. Check: no mono on prices or counts.
7. One format per kind (time, date, money, duration), written in `DESIGN-NOTES.md`. Check: grep the build for other formats.

## Chinese and Latin
8. Space between Chinese and Latin or digits, handled once: `text-autospace` or server-side, not typed by hand. Check: no double spaces; codes and mono excluded.
9. No negative letter-spacing and no italics on Chinese. Check: computed `letter-spacing` ≥ 0 on `:lang(zh)`.
10. Chinese line height 1.5–1.6. Check: computed line-height on Chinese paragraphs.
11. System Chinese stack as fallback after the Latin face (PingFang SC, Noto Sans SC, Microsoft YaHei). Check: no Chinese webfont download in the network log.

## Lines and alignment
12. Where two levels have the same size and colour, separate them with a 1px hairline, not a box. Check: no bordered box whose only job is separation.
13. Optical alignment: icons, bullets and quotation marks nudged 1–2px so their visual edge, not their box, meets the text edge. Check: zoom the render at the left margin.
14. One shared left margin per column; images align to text column edges. Check: vertical guide on the render touches every block.
15. Concentric radii: inner = outer − padding. Check: nested rounded shapes on the render.

## Interaction states
16. One press-state definition for the whole product: instant on press, about 150ms on release, pressed only half a step darker than hover, no scale or translate jump. Check: one shared rule in the CSS, not per component.
17. Hover only under `(hover: hover)`; everything shown on hover is reachable by tap. Check: media query wraps every `:hover`.
18. Visible focus on `:focus-visible` for every interactive element. Check: tab through the page.
19. Action levels: one filled primary per view, quieter secondaries, text or icon row actions. Check: gate question 3.

## Touch
20. Inputs 16px or larger on touch, so iOS does not zoom on focus. Check: computed font-size of inputs at 375px width.
21. Control heights from a closed set (32/36/40), with 44px hit areas on touch. Check: measure on the 375px render.
22. Safe-area insets on fixed bars. Check: `env(safe-area-inset-*)` in the bar styles.

## Motion
Rules, tokens and checks: `motion.md`. Three floors:
23. Animate transform and opacity only, with named role easings and tier durations. Check: no `transition: all`; no width, height, top or margin transitions.
24. Nothing blocks input; the state commits at once and the animation follows. Check: act again mid-animation in a `--steps` run.
25. Reduced motion honoured: short opacity and colour changes stay, movement goes. Check: a `prefers-reduced-motion` block exists; `shot.mjs --emulate-reduced-motion` frames show no travel.

Undo over confirm, feedback channels and timing rules: `flows.md`.

## Charts
26. Direct labels on the marks; no legend, no gridlines, a baseline only; numbers on bars where they fit. Check: no legend element. For anything beyond a simple chart, use a dedicated charting tool.
27. A single ratio is a number, not a donut. Check: `ai-tells.md`.

## States
28. Empty, loading and error share one layout and position with the full state; skeletons match real sizes; loader timing is in `flows.md`. Check: render each state; nothing jumps when data arrives.
29. A setting the owner would choose once is a default, not a control; tell the reader only what they need. Check: every setting has a reason to vary per reader.

## Dark mode
30. Light and dark each have a full tuned token set; nothing is a computed inversion. Check: render both; contrast holds; photos are not dimmed.
31. Floating shadows in dark mode carry a faint light ring so edges stay visible. Check: menus on the dark render.
