---
name: design-muli
description: Design, improve, revise or review user interfaces and graphic layouts from a written visual anchor (tokens and a Never list), with checkable principles, an interaction model (objects, tasks, states, navigation), motion rules, a craft floor, design and copy lints, state-by-state renders, and a review gate with a cold read and a taste review. Use for web, mobile and desktop app UI and UX, and for decks, reports, portfolios, posters and one-pagers; when designing from scratch, improving an existing design, revising from feedback or a screenshot ("too dense", "looks tiring", "nothing stands out", "looks AI-made", "this doesn't belong together"), or reviewing a design before it ships. Triggers include 设计, 重新设计, 优化界面, 改一下界面, UI, UX, 交互, 交互逻辑, 动效, 流程, 状态, 太密, 太重, 看着累, AI 味, 排版, 海报, 幻灯片, 单页, review this screen.
---

# design-muli

Procedures and principles for designing and reviewing interfaces and graphic layouts. Each principle is written so that it can be checked on a render. Every reference path below is relative to this file's folder.

## Start: pick the mode

Read `DESIGN-NOTES.md` in the project if it exists (format in `references/evolve.md`). Then route:

- **New**: nothing exists yet, or the owner asked to start over.
- **Improve**: something exists and the owner wants it better, with no specific complaint.
- **Revise**: the owner points at a symptom, usually with a screenshot.
- **Review only**: run Improve steps 1–4, report, and stop.

### New

1. Write the job sentence: who uses this, in what moment, on what medium and sizes, to do what, and the reader's triggers (the 1–3 situations that bring them here, e.g. "card about to expire", "is it free?"). Classify each screen as Utility or Attract (below). Done when it fits two lines; if the job of any feature is unclear, ask before building.
2. Ask the constraints the owner decides: who will see it, what must be usable on site (IDs, codes, contact details), which assets and licences are acceptable, which references or guidelines to follow. Done when each answer is written in `DESIGN-NOTES.md`; anything shown on a public channel has its own, stricter rules written there too.
3. **Anchor first.** Before any visual work, choose the visual anchor, taking the first source that exists: (a) the project's own design system, Figma file or brand guide; (b) a public design system the owner names, with its real published values; (c) the default tokens in `assets/tokens.css` (`references/tokens.md`). Write the chosen values and the project's Never list (each prohibition with its reason) into `DESIGN-NOTES.md`. Done when every colour, type size, weight, font, radius, shadow, control height and duration the build will use is written there; the build uses nothing outside it.
4. Ask for real material: brand colour, fonts, logo, photos or artwork. Done when each is listed in `DESIGN-NOTES.md` or marked "none". If there is none, use only typography, space and hairlines, with no filler illustration or decorative icons.
5. List the content. Give each item a frequency in the moment of use, a layer (main line, key point, detail) and a certainty (confirmed, optional, pending). Done when every item has all three.
6. **Model the system** (`references/flows.md`): objects, the task path for each trigger, a state table for each object and async action, and the navigation model. Done when the state table has no state without a visible next action.
7. Read `references/ai-tells.md`, then propose the structure: what each prime position holds, the protagonist of each screen (the must-act item, else the main trigger), a visible answer for every other trigger at second emphasis in the first viewport, history and reference material in the lower or narrower position, the patterns reused across screens, and a design for every state in the state table. The visual direction comes from the anchor and the content, not from a default look. Done when the owner has agreed, for anything larger than one component.
8. Build with the anchor's values only, to the floor in `references/craft.md`, with motion from the `references/motion.md` tokens only. Verify every number, time and price from a source as you write it.
9. Pass the review gate below.

### Improve

1. **Anchor first.** Find the anchor the product already follows (its tokens, design system or brand guide) and its Never list. If there is none, propose one as in New step 3 before changing any visual value. Done when `DESIGN-NOTES.md` names the anchor.
2. Render the current state at the smallest and largest target sizes (`scripts/shot.mjs`). Done when the PNGs exist and you have looked at them.
3. Audit the renders against the 12 principles (`references/principles.md`), `references/ai-tells.md` and `references/craft.md`; for navigation, forms, async or destructive actions also `references/flows.md`, and for anything that animates `references/motion.md`. Run `scripts/lint-design.mjs` and `scripts/lint-copy.mjs` on the source. Done when every finding names a location and a principle, tell or craft item.
4. Rank findings by how often the reader meets them times how much they cost; keep at most 8. Present them with the proposed change and wait for the owner's pick.
5. Change shared tokens and components rather than one-off styles. Before deleting an element, check whether it carries grouping or orientation (principle 6). Done when every picked finding is changed and nothing else.
6. Pass the review gate.

### Revise

The owner usually names a symptom and expects you to find its cause, not only to fix the spot they pointed at.

1. Restate the symptom in one line and locate it on the render. The symptom table at the top of `references/principles.md` says where to look first.
2. Name the principle, tell or craft item it violates. Then sweep the whole product for other instances. Done when the list of instances is complete, not sampled.
3. If the owner suggested a specific widget or fix, weigh it against the principle and propose the best fix with a one-line reason; say so when it differs from the suggestion.
4. Fix at the cause, within the anchor. Check the fix against its neighbours: restraint against prominence (3), dedup against the must-act strip (4), subtraction against grouping (6), collapsing against shortening (7), visual calm against reachable navigation (8).
5. Pass the review gate. Then classify the correction as project-specific or general (`references/evolve.md`).

## Attention budget: Utility or Attract

Classify each screen before designing it; many products have both kinds.

- **Utility**: the reader is already committed and comes back (settings, dashboards, billing, itineraries, forms). Calm, dense but ordered, with little material. There is still exactly one protagonist, and the must-act item is at the top.
- **Attract**: the reader has not committed and gives it a few seconds (poster, cover slide, landing hero, store listing, empty first run). Attention comes from the scale and contrast of one element and the empty space around it, in one brand colour; the 3 facts that decide interest are readable at distance or thumbnail size. Use a focal image only if it is real material or the work itself; otherwise type is the focal element. Restraint limits the number of messages and colour roles, not the scale of the protagonist.

## The 12 principles

1. **Job first.** Name the one job this surface does for the reader in the moment of use, and the triggers that bring them; prefer fewer items.
2. **Triggers first, then frequency.** Every trigger gets a visible answer in the first viewport: the must-act item at the top with its action, the others at second emphasis, never as a plain table row. After that, space follows frequency: history and reference go lower or narrower, and temporary content disappears when done.
3. **One protagonist, seen first.** Exactly one element is at the top emphasis level, and it is seen first by a clear margin; having none is as wrong as having several. Keeping other emphasis scarce does not mean weakening the protagonist's contrast or character.
4. **Say it once.** Each fact appears once per screen and has one source. When the top strip states a must-act item, the lower instance is the bare fact, with no second warning or button.
5. **Words carry only what the reader does not know, including the conclusion they would otherwise compute.** No how-to-use sentences, marketing voice or exclamation marks; the shortest verb on buttons; the reader's everyday words; derived numbers show their arithmetic.
6. **Make grouping visible.** Items of one kind share one form; sibling sections get sibling headings and clear separation.
7. **Three layers for long content.** A short main line, at most two key points, and details in one shared overlay pattern, not expanded inline.
8. **Navigation and primary actions stay reachable.** They sit in fixed bars, not as small buttons on imagery or at the end of a list; back is always available; an action's scope matches its label.
9. **One pattern per situation, one meaning per control.**
10. **Certainty is visible.** Confirmed, optional and pending items differ by container and position, not only by a word.
11. **Real imagery or none.** Use only real material that shows what the reader will actually get, once per page, where it conveys an impression; diagrams have readable labels or are removed.
12. **Every fact is verified.** Every value comes from a source; unverified values are marked; when the owner asks you to check, check every instance.

## Review gate

Pick the tier by the size of the change; details and the reader briefs are in `references/cold-read.md`.

- **T0** (one string, one spacing value or one colour): answer the gate questions below from the code and the change.
- **T1** (a section or component): `lint-design.mjs`, the craft floor on the changed part, a check of the changed part against `ai-tells.md`, and the gate questions on real renders at the smallest and largest target sizes, including every overlay and state the change touches.
- **T2** (a full screen, page, deck, poster, or any New design): `lint-design.mjs`, real renders, a cold read by a fresh reader, then a taste review against anchor renders; with renders of every overlay and every state in the state table; triage, fix, re-render. A second cold-read round is required after any structural fix; skip round 2 only when round 1 changed wording alone.

Render overlays and states with `shot.mjs --steps` (bursts for transitions): at T1 every overlay and state the change touches, at T2 every overlay and every state in the state table. List them in the report; a state not rendered is reported as not verified.

The gate questions:
1. Glance at a 25% render for 3 seconds: what is seen first? It must be the protagonist (a trigger or the must-act item). If nothing stands out, or several things do, fix.
2. Does every trigger have a visible answer in the first viewport (must-act item at the top with its action, the others at second emphasis), and does any sentence leave the reader to compare dates, do arithmetic or infer what is still fine?
3. Are actions in three levels (one filled primary, a few secondary, row-level and rare actions as quiet text or icons), with at most about 5 bordered or filled controls per Utility viewport, and bold and colour only where the reader's priority is?
4. Does any string explain the interface, sell, exclaim, or repeat a fact already on this screen?
5. Does every group use one form and read as separate from its neighbours, and with labels covered can you still tell confirmed from optional?
6. With the page scrolled to the bottom, are back and the primary action still visible and at least 44px to hit?
7. Does every number have a source?
8. Does every colour, size, radius, shadow and font on the render come from the spec in `DESIGN-NOTES.md`, and is every ai-tells hit either removed or required by the anchor?
9. Has every state and overlay been rendered and looked at, and does every action show feedback within about 100ms?

Report every change with before and after renders, and say what was not verified (real device, real app, print size, gestures).

## References: read when

- `references/tokens.md` and `assets/tokens.css`: when the project has no anchor of its own.
- `references/ai-tells.md`: before building any New screen, and at every T1 and T2 gate.
- `references/craft.md`: when building or auditing components.
- `references/flows.md`: before any screen in New (step 6); then for multi-step tasks, forms, anything with async or destructive actions, and navigation changes.
- `references/motion.md`: for anything that animates, or when the owner says stiff, dead or janky.
- `references/graphic.md`: for decks, reports, portfolios, posters and one-pagers.
- `references/principles.md`: when auditing, when two principles seem to conflict, or when you need a principle's check.
- `references/copy.md`: before writing or editing any interface text, and when lint-copy reports findings.
- `references/platforms.md`: when the target is not a single phone-width web page, and when choosing an overlay.
- `references/cold-read.md`: at every T2 gate, and when no subagent tool is available.
- `references/evolve.md`: when creating `DESIGN-NOTES.md`, at the end of a task, and whenever the owner rejects or corrects a design.
- `scripts/shot.mjs`: full-page PNGs at several widths with local Chrome. `node scripts/shot.mjs <url|file> --widths 375,768,1280 [--dark] [--viewport --scroll bottom] [--steps steps.json] [--emulate-reduced-motion]`; steps format in the script header.
- `scripts/lint-design.mjs`: flags off-spec values and default-kit tells. `node scripts/lint-design.mjs <file.html|file.css>`. Advisory.
- `scripts/lint-copy.mjs`: flags copy smells and facts repeated 3 or more times. `node scripts/lint-copy.mjs <file.html>`. Advisory.

## Delegating

When handing work to a subagent, include in the brief: the job sentence, the anchor and Never list from `DESIGN-NOTES.md`, the references the owner gave, rejected approaches, the principles the task touches, and the completion check. Without the anchor, the subagent falls back to the model's default look.

## Scope

This skill covers the design itself: structure, interaction, visual language, copy and review. It does not cover producing specialised assets or operating design tools. When the task needs an icon set, a logo or illustration, complex data visualisation, or reading and writing files in a design tool, use a dedicated tool or skill for that part if one is available, and hold its output to the same anchor and Never list.

Committing and pushing are the owner's call.
