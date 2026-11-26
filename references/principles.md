# Principles

Each principle: the rule, why it holds, a failure example (a generic before and after), and how to check it on a render or artifact.

1. [Job first](#1-job-first)
2. [Triggers first, then frequency](#2-triggers-first-then-frequency)
3. [One protagonist, seen first](#3-one-protagonist-seen-first)
4. [Say it once](#4-say-it-once)
5. [Words carry only what the reader does not know](#5-words-carry-only-what-the-reader-does-not-know)
6. [Make grouping visible](#6-make-grouping-visible)
7. [Three layers for long content](#7-three-layers-for-long-content)
8. [Navigation and primary actions stay reachable](#8-navigation-and-primary-actions-stay-reachable)
9. [One pattern per situation, one meaning per control](#9-one-pattern-per-situation-one-meaning-per-control)
10. [Certainty is visible](#10-certainty-is-visible)
11. [Real imagery or none](#11-real-imagery-or-none)
12. [Every fact is verified](#12-every-fact-is-verified)

## Where to look first

| The owner says | Look first at |
|---|---|
| cramped, too dense / 太挤、太密 | gaps between groups, count of bordered or filled things, line height, items per row (3, 7) |
| no focus, nothing stands out / 没重点 | the protagonist, trigger answers, action hierarchy (2, 3) |
| heavy, tiring / 太重、看着累 | material count, weights, colour roles, copy length (3, 5, 7) |
| muddy, grey / 发灰 | contrast of text roles, several greys doing one job, the accent missing from the one action (3, `tokens.md`) |
| stiff, dead / 僵硬、没生气 | press and hover feedback, continuity, state changes that cut (`motion.md`) |
| confusing, where am I / 看不懂、找不到在哪 | grouping, headings, navigation model, back (6, 8, `flows.md`) |
| looks AI-made, templated / AI 味、像模板 | `ai-tells.md`, the anchor |
| cheap / 廉价 | content and facts first (5, 12), then alignment and the type scale (`craft.md`) |
| slow, laggy / 慢、卡 | loading and optimistic rules (`flows.md`), motion durations (`motion.md`) |

When two principles conflict, the reader's job (1) decides. The pairs that most often collide are listed in SKILL.md, Revise step 4.

## 1. Job first

**Rule.** Write one sentence naming what this surface does for the reader at the moment they use it, and list the reader's triggers: the 1–3 situations that bring them here ("my card is about to expire", "is this event free?"). If a feature's job is unclear, ask before building. Prefer fewer items.

**Why.** A feature built on a guessed job gets rebuilt; polishing the wrong job wastes every round after it.

**Failure.** A clinic app's "add to calendar" export first mirrored everything in the app: appointments, preparation tips, reminders to drink water, tentative slots, over a hundred events. Three rounds of fixing titles and locations did not help, because the job was different: to replace adding each confirmed booking by hand, with an alert before each. The right export had about twenty events.

**Check.**
- The job sentence exists and names a reader, a moment, an outcome and 1–3 triggers.
- Every element on the render traces to that sentence; anything that does not is cut or moved.
- Before a new feature: you asked what it replaces for the reader, or the owner already said.

## 2. Triggers first, then frequency

**Rule.** Every trigger from the job sentence gets a visible answer in the first viewport. Anything that will cost the reader if missed (an expiry, a deadline, a failure, a safety issue) is the protagonist: at the top, with its action attached, stated per principle 5 (what, by when, the consequence, what is still fine). This placement is required. The other triggers' answers sit at second emphasis: larger type or first position in their group, never an ordinary row inside a reference table. Space follows frequency too: history, logs and reference tables go below or beside, in the lower or narrower position, never the prime half. Below that, prime positions (tab bar slots, the top of the first screen, the first row) go to what is used most in the real usage situation, not in the planning phase. Temporary content lives in a strip that disappears when done, not in a permanent section. Design every state up front: build the state table in `flows.md` (empty, loading, error, partial, finished, offline, expired, very long text, missing image, and the domain's own states) and give each a design.

**Why.** The reader came for one of a few reasons; if the answer is not in view, the screen does not do its job, however well it is edited. Content that matters during planning gets prominence while the designer builds but is not needed in use, and a section that empties leaves a gap in the most valuable space.

**Failure.** A library app's account screen listed loans, holds, history and fines in calm, equal rows. The fact that two books were due tomorrow, with renewals still possible, was a small amber line in the loans row, which readers missed. After: a one-sentence strip at the top ("2 books due tomorrow") with a "Renew" button; the loans row below keeps only "Due 14 May". Separately, an event app gave one of four tab slots to "Registration", finished weeks before the event; it became a one-line strip ("2 left to confirm") that vanishes at zero.

**Check.**
- For each trigger, point to its answer in the first-viewport render.
- Each must-act item sits at the top, in one or two sentences, with its action button beside it.
- Every other trigger's answer is at second emphasis in the first viewport, not a row in a table.
- History, logs and reference tables occupy neither the top nor the wider column.
- For each prime slot, state how often it is used in the main moment of use; the least-used slot should not outrank a more-used item placed lower.
- Render with all tasks done and with no data: no blank region taller than about a third of the viewport, and no heading over nothing.
- Each state in the list above has a render or a written decision.

## 3. One protagonist, seen first

**Rule.** Each screen has exactly one element at the top emphasis level: the thing the reader came for or must act on. It is the first thing seen, by a clear margin. Having none is as much a failure as having several. Emphasis and material (solid fills, shadows, borders, badges, glass, texture) are scarce so that nothing competes with the protagonist; this limits competing emphasis and does not mean a weaker protagonist. On Attract surfaces the protagonist dominates through its scale and contrast and the empty space around it, in one brand colour, not through added colours or shapes. Default other surfaces to flat and group them by spacing and type size. The primary action of a view looks like a button (one filled button per view is expected); secondary actions are visibly quieter. Bold and colour mark the reader's priorities, not a whole column by habit. All values come from the anchor's closed scales in `DESIGN-NOTES.md`; how status, groups and callouts look by default is in `ai-tells.md`.

**Why.** Every added effect competes with the others; many good texture techniques applied at once read as dense, heavy and tiring. The opposite also fails. A screen reduced to uniform calm leaves the reader to find the important thing alone, and they often do not.

**Failure.** Too much: a team dashboard had a bordered, shadowed card for every widget, coloured badge pills for every status, raised buttons everywhere and a glass header; readers called it busy and tiring. After: no borders or shadows, 40px gaps between groups, statuses as coloured words, the raised material only on the single "Publish" button. Too little: a later settings screen in the same style had every action as an identical blue text link and bold dates in every row; nothing stood out, and the one urgent item was found last. After: the urgent item became the protagonist with one filled button, other actions became quiet secondary buttons, and dates went back to regular weight.

**Check.**
- Glance at a 25% render for 3 seconds: the first thing seen is the protagonist. Nothing standing out, or two things tying, is a finding.
- Count solid or strongly coloured blocks: exactly the protagonist and at most the one primary button, unless they are the same element.
- Actions have three levels: one filled primary; a few secondary; row-level and rare actions as quiet text or icon actions. A column of identical controls, all links or all bordered buttons, is a finding.
- Count bordered or filled controls in one viewport: more than about 5 on a Utility screen is a finding.
- Every bold or coloured run marks something the reader prioritises; remove it where it marks a column by habit.
- Computed font sizes, weights, colours and radii all come from the anchor (`scripts/lint-design.mjs`). Spacing between groups: one value.
- No item from `ai-tells.md` appears unless the anchor requires it.
- Material or texture appears on at most 1–2 primary actions or floating surfaces per screen.

## 4. Say it once

**Rule.** One fact appears once per screen and has one source of truth in the data. A must-act item (principle 2) is stated in the top strip; the lower instance is reduced to the bare fact, with no second warning style and no second button. The top strip holds at most 4 items (hard deadlines, things the reader must bring or do, failures, safety), in time order. Deduplication removes repeats; it never removes a must-act item from the top strip.

**Why.** Repetition makes a screen longer and teaches the reader to skim, so the one repeat that matters gets skimmed too. Removing a deadline from the top strip because it already appears lower down fails the reader when the deadline arrives.

**Failure.** A course planner showed "12 weeks" three times on one screen: in the header, a badge and a summary sentence. The cleanup then went too far, and the exam registration deadline appeared only deep in week 9's list. After: each fact once, plus a top strip with the deadline and its "Register" button; week 9 keeps only the date.

**Check.**
- On the render, count each date, count, status and duration: more than one occurrence is a finding unless one is in the top strip and the other is the bare fact.
- The top strip holds only the kinds above, at most 4 items, ordered by time; advice, background and options stay out.
- A warning style or action button appears once per must-act item.
- A duration, price or time lives in one field in the data; other places read from it. Where two values describe the same thing differently (planned time vs. booking deadline), each is labelled by what it is.

## 5. Words carry only what the reader does not know

**Rule.** Interface text carries names, times, amounts, IDs, status and must-know warnings, and it states the conclusion the reader would otherwise have to compute. A must-act sentence says what, by when, the consequence, and what is still fine, in one or two plain sentences built only from given facts; a derived value is never presented as a fact, and when one helps, the arithmetic is shown ("14 seats × $12"). Remove sentences that explain how to use the interface; affordance comes from form and position (a chevron, a row that looks tappable). No marketing voice, no exclamation marks. Buttons use the shortest verb. Use the reader's everyday vocabulary, not the data source's or the industry's. Do not add an explanation the reader did not ask for.

**Why.** Every extra sentence costs attention and makes the product sound generated. Most readers already know a row with a chevron opens.

**Failure.** A fitness app's history screen said "Tap any workout to see it on the map" above a list whose rows already had chevrons, and labelled averages with a meteorological term most users had never seen. After: the hint was deleted, the label became "usual for this week of the year", and the "View details" button became "Details".

**Check.**
- Run `scripts/lint-copy.mjs`; resolve or consciously keep each hit.
- For each string on the render, ask what the reader learns from it that the screen does not already show; if nothing, delete it. Deleting filler never deletes the one sentence that saves a calculation or comparison.
- For each must-act sentence: what, by when, consequence, what is still fine; no derived date or total stated without its source or arithmetic.
- Each button label is one or two words and starts with a verb or names the object.
- Full rules and examples: `copy.md`.

## 6. Make grouping visible

**Rule.** Items of one kind share one row or card form. Sibling sections get sibling headings and clear separation (a gap clearly larger than the gaps inside each). Before deleting a heading, divider or gap, check whether it carries grouping or orientation.

**Why.** Readers infer structure from form before reading a word. A different form reads as a different group; a missing gap merges two groups.

**Failure.** A clinic app's "Your appointments" section showed the in-person visit as a large photo card and the lab test as a plain row; at a glance the visit looked like a separate section. A later cleanup removed the "Schedule" heading below it, and the appointments ran straight into the schedule. After: one row form for all appointments with the photo below the text, and the heading restored.

**Check.**
- Blur or shrink the render: each section reads as one block, and sibling blocks are distinguishable.
- Within each group every item has the same structure (same order of fields, same image placement).
- Each sibling section has a heading of the same level, or all have none.
- For each deletion in the diff: what separated these two things before, and what separates them now?

## 7. Three layers for long content

**Rule.** Long content gets three layers: a main line (a short phrase, at most 2 lines), at most two key points (one line each), and details in an overlay that reuses the one detail pattern the product already has (bottom sheet on phones, side drawer from tablet width up, ≥640px). Expanding details inline still lengthens the list, so collapsing content does not count as shortening it. Keep the default collapsed state when the owner has chosen one.

Choosing an overlay:
- The action can be undone: do it at once and offer Undo; no confirmation.
- It cannot be undone, one item: a confirmation anchored to the button. Large impact, other people, many items: a dialog that names what is affected.
- Short form that needs nothing else on the page: dialog. Long content, or the page must stay in view: sheet or drawer. The main task, or it needs a shareable URL: a page.
- Hover-only information must also be reachable by tap.

**Why.** Paragraph-per-item lists read as walls. Expanding details in place moves everything below and makes the list longer than before.

**Failure.** A conference agenda showed each session as a full paragraph. The first fix split each into title, points and details, but details expanded in place; with three open, the page doubled. After: rows show title plus at most two grey points, the whole row is tappable with a chevron, and details open in the same sheet used elsewhere.

**Check.**
- At phone width, no list item at rest is taller than about 3 text lines plus its key points.
- Opening details does not move the list.
- The product has one detail overlay pattern, and every new detail view uses it.

## 8. Navigation and primary actions stay reachable

**Rule.** Back, previous/next and the primary action live in fixed bars or the title row, visible at any scroll position. They do not float as small buttons on imagery and do not sit at the end of a list. Back is always available, returns to where the reader came from, and falls back to home. An action's scope matches its label; one button does not hide a second set of modes.

**Why.** Shrinking navigation onto a photo makes the screen look calmer but lowers the controls' contrast, and controls that scroll away force the reader to scroll back.

**Failure.** A recipe app's step pages put previous/next as small round buttons on the header photo; low contrast, and gone after scrolling. The "Start cooking" button sat after 20 ingredients. After: a fixed top bar with "← Recipes", the step title and ‹ ›; "Start cooking" moved to the title row.

**Check.**
- Render with the page scrolled to the bottom (`shot.mjs --viewport --scroll bottom`): back and the primary action are visible.
- Controls have at least 3:1 contrast against what is behind them and a hit area of at least 44px.
- Each control's label describes everything it does; no control changes what another control means.

## 9. One pattern per situation, one meaning per control

**Rule.** The same situation gets the same interaction across the product: opening detail, choosing among options, confirming, showing a route or a timeline. Each control has one meaning.

**Why.** Two patterns for one situation force the reader to learn both and to wonder whether the difference means something.

**Failure.** A delivery tracker drew city routes as radial sketches and regional routes as polylines with stops, and its "All" button also contained hidden sub-switches for three regions. After: one route form everywhere (small map with stop names plus a segment chain with mode and time), and "All" just shows everything.

**Check.**
- List each recurring situation and the pattern used for it; any situation with two patterns is a finding.
- No control contains a second control set that changes its meaning.
- A fact shown in one pattern (a travel time in the segment chain) is not also repeated in free text.

## 10. Certainty is visible

**Rule.** Confirmed, optional and pending items differ by container and position, not only by a word. The main line holds what is confirmed; options live in their own container (a separate group, a horizontal set of cards). Exports and reminders (calendar files, printouts, notifications) carry confirmed items only unless the owner asks otherwise.

**Why.** Readers treat whatever sits on the main line as decided. A small "(optional)" label is read last, if at all.

**Failure.** A conference schedule listed optional workshops in the main track with an "optional" tag; attendees read them as required. After: the main track showed only confirmed sessions plus "Free time" blocks; workshops moved to a "Choose one" row of cards inside each free block.

**Check.**
- Cover the labels on the render: you can still tell confirmed from optional by position and container.
- Every export contains only confirmed items, or the owner chose otherwise.

## 11. Real imagery or none

**Rule.** Real material or none: photos, artwork, product shots or the work itself, never filler illustration or stock decoration; with no real material, the design uses typography, space and hairlines. An image shows what the reader will actually get: the right place, the right variant (the selected colour, the ordered model), the right season. Use imagery where it conveys an impression (places, experiences, products, food) and lead with it there; on Attract surfaces (SKILL.md) a real focal image leads when one exists, otherwise type is the focal element; leave it off logistics (delivery steps, checkout, forms). Each image appears once per page. Diagrams carry readable labels (names, mode, time) or are removed. Images have a stable aspect ratio, a placeholder colour, and a layout that works with no image (no grey box). Text over an image sits on a scrim with at least 4.5:1 contrast.

**Why.** The right image tells the reader in a second what something will feel like. A wrong or off-season image misleads, and an unlabelled diagram adds weight without information.

**Failure.** An online furniture shop showed the grey sofa photo while the reader had selected green, repeated one decorative living-room photo across three sections, and drew its delivery zones as coloured blobs with no names. After: the product photo follows the selected variant, the room photo appears once at the top of the collection, the zone map labels each area with its name and delivery days, and the checkout steps carry no images.

**Check.**
- For each image: is it the actual subject, variant and season? Does it appear elsewhere on the page?
- No image sits on a logistics item, and no image is filler illustration, stock decoration or a placeholder.
- Every diagram's labels are legible at the smallest target size.
- Render with images blocked: the layout holds, with no empty boxes.
- Asset and licence limits come from the owner's answer about who will see it, not from your own caution.

## 12. Every fact is verified

**Rule.** Every number, time, distance, price and opening hour comes from a source, checked, never estimated. Values you could not verify are marked as such ("about", "unconfirmed"). Give ranges where conditions vary ("about 25 min, allow 40 in snow"). When the owner says "check", check every instance, not a sample.

**Why.** A wrong time breaks the screen however good it looks. Estimates presented as facts are found out when the reader relies on them.

**Failure.** A field-service app showed drive times from a routing estimate; one leg said 8 minutes and took 14. The owner asked twice to verify. After: every leg was looked up in a map service, written as "about X (allow Y)", and a full sweep found further wrong opening hours.

**Check.**
- Every numeric value has a source in the data or in `DESIGN-NOTES.md`.
- Unverified values carry a visible mark.
- After a "check it" request, the report states how many values were checked out of how many exist.
