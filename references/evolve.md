# Evolve

The skill improves at two layers: notes kept in each project, and lessons that change the skill itself. Corrections from the owner feed both.

## Project layer: DESIGN-NOTES.md

Keep one `DESIGN-NOTES.md` at the root of the project being designed. Read it at the start of every task. Update it at the end of every task that changed a decision, a token, or a reference. Include its relevant part in every delegation brief.

Minimal template:

```markdown
# Design notes

## Job
<one line: who, in what moment, on what medium, to do what>

## Owner's constraints
- Who sees it: <private / team / public>; public channels: <stricter rules, if any>
- Must be usable on site: <IDs, codes, contacts, offline needs>
- Assets and licences: <what the owner allows>

## References the owner gave
- <link or file> - <what to take from it, what not to copy>

## Anchor
- Source: <project design system | Figma file | brand guide | public system the owner named | design-muli default tokens> - <link or path>

## Tokens
- <values, or path to the token file>: colours with roles, type sizes and line heights, weights, fonts, spacing, radii, shadows, control heights, durations and easing
- Formats: time <...>, date <...>, separators <...>

## Never
- <prohibition> - <reason>   (e.g. "no shadow on in-flow cards - grouping is by space")

## Model
- Objects / Tasks / States / Navigation as in `flows.md`, or: <path to FLOWS.md>

## Assets
- Brand colour: <value or none> / Fonts: <files or none> / Logo: <path or none> / Photos or artwork: <path or none>

## Decisions
- <date> <decision> - <why, one line>

## Rejected approaches
- <date> <what was tried> - <why the owner rejected it>

## Open items
- <missing information to collect, removed when filled>
```

Write a decision when the owner approves or rejects something, not for every edit. When a newer decision replaces an older one, edit the older entry instead of adding a contradicting one below it.

## Skill layer: lessons

When the owner rejects or corrects a design, classify the correction:

- **Project-specific**: it depends on this product's audience, brand, content or constraints ("this app's users are clinicians, keep the clinical terms"). Record it in `DESIGN-NOTES.md` under Decisions or Rejected approaches.
- **General**: it would apply to other products, and no existing principle already covers it, or an existing principle produced the wrong result. Propose a lesson.

A lesson has a title and four fields, and no project-identifying detail (no product names, people, places, dates, domains or IDs):

```markdown
## <short title>
- Symptom: <what the reader saw or felt, in generic terms>
- Rule: <the one-line rule that prevents it>
- Check: <how to see it on a render or artifact>
- Date: <YYYY-MM-DD>
```

Show the proposed lesson to the owner. Append it to `LESSONS.md` in the skill folder only after they agree.

## Consolidation

Consolidate `LESSONS.md` into `references/principles.md` when it reaches about 20 entries, or as soon as two lessons contradict an existing principle.

1. For each lesson, decide: sharpen an existing principle, replace part of one, or add a new principle (rare; prefer merging).
2. A lesson that contradicts an existing rule replaces that rule. Delete the old wording; do not leave both.
3. Update the one-line principle list in `SKILL.md` if any rule line changed.
4. Remove the consolidated lessons from `LESSONS.md`.
5. Bump `VERSION` (semver: patch for wording, minor for a changed or added rule, major for a changed workflow), and add one line per change to `CHANGELOG.md`.
6. Update the Chinese mirror under `zh/` so it matches. The mirror uses the same file names under `zh/`, except `SKILL.md` ↔ `zh/SKILL.zh.md`.
7. Check the size limits: `SKILL.md` at most about 130 lines, each reference at most about 250.

Committing and pushing the skill repository are the owner's call; prepare the change and say it is ready.
