# Changelog

## 0.5.0 - 2026-11-26

- New `references/flows.md`: a model built before any screen (objects with one home and one name, a shortest path per trigger, a state table where every state has a visible next action, a navigation model), with a worked clinic-booking example; rules with checks for validation, destructive actions, choice controls, overlays, feedback channels, timing, loading and optimistic updates, keyboard and gestures, and repeated input.
- New `references/motion.md`: when to animate, easing by role, duration by size, choreography, interruptibility, properties, reduced motion, checks and motion smells. `tokens.css` gains role easings (`--ease-out`, `--ease-in`, `--ease-in-out`, `--ease-spring-small`) and `--dur-4`; `--ease` and `--dur-sheet` still work.
- `scripts/shot.mjs --steps`: click, hover, type, key, wait, scroll, shot and burst steps over the DevTools protocol, for rendering overlays, states and transition frames; `--emulate-reduced-motion`.
- The New procedure gains "Model the system"; the structure step designs every state in the state table; the build uses motion tokens only. T1 and T2 render every overlay and state with `--steps` and report unrendered states as not verified; a ninth gate question checks that states were rendered and that feedback arrives within about 100ms.
- The cold read receives the state renders in task order and a ninth question about where the task became unclear; a step named there is a must-fix.
- A symptom table ("the owner says → look first at") at the top of `principles.md`; principle 2 points to the state table; the `craft.md` motion section is reduced to three floors and a pointer.

## 0.4.0 - 2026-11-26

- "Anchor first" is a required step in New and Improve: the project's design system or brand guide, else a public system the owner names, else `assets/tokens.css`; values and a Never list go into `DESIGN-NOTES.md`, and the build uses nothing outside them. New also asks for real assets and falls back to typography, space and hairlines, never filler illustration.
- New `assets/tokens.css` and `references/tokens.md`: neutral default tokens (role-named greys, one accent, status as text, closed type scale, 4px spacing, radii 6/8, one floating shadow, control heights, durations, focus ring, light and dark).
- New `references/ai-tells.md`: the default kit (cream backgrounds, left-stripe callouts, eyebrow labels, status pills, cards around every group, dashed pending, donuts, KPI card rows, gradients, icon circles and more), each with what to do instead and how to check; findings unless the anchor requires them.
- New `references/craft.md`: a numbered, checkable craft floor; the craft defaults moved here from platforms.md.
- New `references/graphic.md`: document pages and attract pages, replacing the print section of platforms.md. Attract wording corrected throughout: intensity comes from the scale and contrast of one element and empty space, in one brand colour; a focal image only if it is real material.
- New `scripts/lint-design.mjs`: flags off-scale type, colour literals, shadows, gradients, dashed borders, stripe callouts, eyebrow labels, pills, cream backgrounds, `transition: all`, missing tabular figures and missing reduced-motion.
- Review gate: an eighth question on spec conformance and ai-tells; T1 adds lint-design and the craft floor; T2 adds lint first and a taste review by a strong model against anchor renders.
- The `DESIGN-NOTES.md` template gains Anchor, Tokens, Never and Assets. Principle 3 points to the anchor and ai-tells instead of fixed style lines; principle 11 requires real material or none.
- Visual direction comes from the anchor and the content; the separate styling pass is removed.

## 0.3.0 - 2026-11-26

- Principle 5 gains its positive half: state the conclusion the reader would otherwise compute; must-act sentences give what, by when, the consequence and what is still fine, from given facts only, with arithmetic shown for derived values. Before/after pairs in copy.md.
- Principle 2: every trigger gets a visible answer in the first viewport, the non-urgent ones at second emphasis; history and reference tables take the lower or narrower position.
- Principle 3 and review question 3: three levels of action (one filled primary, a few secondary, quiet row-level actions); identical columns of controls and more than about 5 bordered or filled controls per Utility viewport are findings.
- platforms.md print: stacked lists instead of separator runs, illustrations large and unambiguous or omitted, secondary messages no larger than the deciding facts' details.
- cold-read.md: anything the reader had to work out is a must-fix, fixed by stating the conclusion.

## 0.2.0 - 2026-11-26

- Principle 3 now covers both directions: exactly one top-emphasis element, seen first; having none is a failure; one filled primary button per view; bold and colour only where the reader's priority is.
- Principle 2 is now "Triggers first, then frequency": the job sentence lists the reader's triggers, each answerable in the first viewport; must-act items go at the top with their action, as a requirement.
- Principle 4: the lower instance of a must-act item is the bare fact, with no second warning or button.
- New attention-budget calibration (Utility or Attract) in SKILL.md and platforms.md; print guidance requires deciding facts at distance size, one colour per role, and safe margins.
- The structure step of the New procedure asks for a deliberate visual direction (colour roles, type personality, a signature element).
- Review gate: seven questions, starting with a 3-second glance at a 25% render and a trigger check; the cold read treats a mismatch between first-seen and triggers as a must-fix and requires a second round after structural fixes.
- The Revise collision list adds restraint against prominence.

## 0.1.0 - 2026-11-26

- First release: three modes (New, Improve, Revise), 12 principles with render checks, copy rules, platform notes, tiered review gate with cold read, project notes and lesson workflow, `shot.mjs` and `lint-copy.mjs`.
