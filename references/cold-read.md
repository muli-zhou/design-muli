# Cold read and taste review

A designer who has just made a screen cannot see it fresh: they know what every element is for. The cold read puts the render in front of a reader who knows only who they are and what they came to do, and collects what they actually perceive. The taste review then asks a second, stronger reader whether the result looks made for this product or templated.

## Choose the tier

Cost rises with each tier; pick the lowest one that covers the change.

| Tier | Change | What to do |
|---|---|---|
| T0 | One string, one spacing value or one colour | The gate questions in SKILL.md, answered from the code and the change. No render needed. |
| T1 | A section or a component | `scripts/lint-design.mjs`, the `craft.md` floor on the changed part, a check of the changed part against `ai-tells.md`, and the gate questions on real renders at the smallest and largest target sizes, including every overlay and state the change touches. |
| T2 | A full screen, page, poster, slide set, or any New design | `scripts/lint-design.mjs` first, then real renders at all target sizes, including every overlay and every state in the state table, a cold read by a fresh reader, triage, and a taste review. |

Raise the tier when the change touches navigation, grouping between sections, or the first screen.

## Render

- Web: `node scripts/shot.mjs <url|file> --widths 375,768,1280 --out shots/<label>`. Add `--dark` if the product has a dark mode. For reachability, add `--viewport --scroll bottom` to capture what the reader sees after scrolling.
- Native and desktop apps: screenshots from the simulator or the running app at the smallest and largest supported sizes.
- Print: export to PDF or PNG at final size; for posters, also a version scaled to how it looks from the intended distance (e.g. 25% for 2 m).
- Look at every render yourself before handing them on. A render you have not looked at does not count as verified.

## T2 step 1: lint

Run `node scripts/lint-design.mjs <file>` and `node scripts/lint-copy.mjs <file>` before any reader sees the renders. Fix every hit that is not required by the anchor, then render. Do not spend readers' attention on problems a script can find.

## T2 step 2: brief the fresh reader

Use a subagent with no conversation context. A smaller, cheaper model is enough, because the reader only reports what it sees. Give it only the renders and one sentence about the reader. Do not include the design rationale, the principles, or what you changed; any of these biases the reader towards your intent.

Brief template:

```
You are seeing these images for the first time. They are <screens of an app | pages of a website | a poster | slides>.
Imagine you are <who the reader is>, and you came to <what they came to do>.
Images: <paths>, shown at <sizes>. Images <first>–<last> are the states of one task, in order.

Answer each question with what you observe. Do not suggest redesigns, and do not guess at the designer's intent.
1. What do you see in the first 3 seconds? List the first three things your eye lands on, in order.
2. What is this for, in one sentence?
3. Which things belong together? Describe the groups you see.
4. Which words could be deleted with no loss of information? Quote them.
5. What looks tappable or clickable, and what would you tap first?
6. What looks confirmed or decided, and what looks optional or undecided? What tells you?
7. Was there anything you had to read twice, or could not understand?
8. Is anything repeated? Quote each repeated item and where it appears.
9. Walk the task from the first image to the last: at which step were you unsure what had happened or what to do next?

Answer in a numbered list matching the questions. Keep each answer under 60 words.
```

The reader sentence is one line, e.g. "a patient checking tomorrow's appointment on their phone while on a bus" or "a conference attendee walking past this poster in a hallway".

## Triage

First, compare the reader's answer to question 1 (the first three things seen) with the triggers in the job sentence. If the first thing seen is not a trigger or the must-act item, that is a must-fix, and it is structural: change position, size, contrast or the primary button, not wording. Do the same for question 5: the first thing the reader would tap should be the primary action.

Also a must-fix: any step the reader named in question 9; fix the state's feedback or next action (`flows.md`), then re-render that state.

Also a must-fix: anything the reader had to work out (compare dates, do arithmetic, infer scope or what is still fine). Fix it by stating the conclusion in the interface (principle 5), not by treating it as optional wording.

Then, for each observation, decide:

| Observation | Principle | Action |
|---|---|---|
| e.g. "first thing I see is the green badge" | 3 | Fix: badge becomes coloured text |
| e.g. first three things are the logo, the profile name, the history list; the trigger was a loan due tomorrow | 2, 3 | Must-fix: the due loan moves to a top strip with its "Renew" button |
| e.g. "'12 weeks' appears in three places" | 4 | Fix: keep the header instance |
| e.g. "unsure what the grey row is" | 5 or 6 | Fix, or Keep with a reason |

- Fix what maps to a principle and matches the job sentence.
- Keep with a written reason when the observation conflicts with the job (the reader expected something this surface deliberately does not do).
- An observation that maps to no principle is a candidate lesson (`evolve.md`).

Then fix and re-render. If round 1 produced any structural fix (position, size, contrast, grouping, a new or moved element), run round 2 with a new fresh reader and check that the first three things now match the triggers. Skip round 2 only when round 1 changed wording alone. Stop after 2 rounds; carry what remains into the report.

## T2 step 3: taste review

After the cold-read fixes, a strong model (not the small cold reader) compares the renders with the anchor. Give it the new renders side by side with 1–3 anchor renders (the product's existing screens, or pages of the reference design system or brand guide), and `references/ai-tells.md`. Nothing else: no rationale, no principles.

Brief template:

```
Image set A is the reference: <the product's existing screens | the reference design system's own pages>.
Image set B is new work meant to belong with A: <paths>.
The attached list describes common signs of generated, templated design.

Answer only these, citing the element and image:
1. Which elements in B look templated, or unlike A? Say why in one line each (colour, type, spacing, shape, ornament, layout habit).
2. Which items from the attached list appear in B?
Observations only; no redesign.
```

Triage each answer: remove the element, or point to the anchor line that requires it. Fix, re-render. One round by default; a second only if the owner asks or the first round changed the layout.

## When no subagent tool exists

Do the read yourself from the renders alone, and say in the report that the read was self-performed.

1. Finish and save your notes on the change, then set them aside: do not reread them, the code or the conversation until the read is done.
2. Write the reader sentence, then open only the render files.
3. Answer the nine reader questions in the brief above in writing before forming any opinion about fixes. Describe what is on the image, not what you meant it to be.
4. Only then triage as above. For the taste review, compare your renders with the anchor renders against `ai-tells.md` the same way, and say it was self-performed.

## Report

- Tier used and the sizes rendered, with before and after images for each change.
- Lint hits fixed or justified by the anchor; cold-read and taste-review findings fixed, kept (with reasons), or left after the last round.
- What was not verified: real device, real app that consumes an export, print at size, gestures and motion feel, slow network, assistive technology.
