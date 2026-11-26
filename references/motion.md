# Motion

Read for anything that animates, and when the owner says the product feels stiff, dead or janky. Use only the motion tokens in the anchor (or `assets/tokens.css`).

## 1. Should it move at all?

Animate only when the motion does one of three jobs:
- explains where something came from or went (a sheet rising from the bottom, a deleted row closing its gap);
- confirms an input (a press, a toggle, a tick);
- shows continuity between two states (a row growing into its detail, an indicator sliding to the new tab).

Frequent actions get less motion than rare ones. What the reader does hundreds of times a day gets a state change and nothing more. No motion delays input.

## 2. Easing by role

| Role | Easing | Token | Default |
|---|---|---|---|
| Enter (appear, open) | ease-out | `--ease-out` | `cubic-bezier(.2, .8, .2, 1)` |
| Exit (leave, close) | ease-in, shorter than the entrance | `--ease-in` | `cubic-bezier(.4, 0, 1, 1)` |
| Move or resize on screen | ease-in-out | `--ease-in-out` | `cubic-bezier(.45, 0, .25, 1)` |
| Press and hover feedback | ease-out, near-instant | `--ease-out` | `cubic-bezier(.2, .8, .2, 1)` |
| Small confirmation (tick, switch knob, badge) | slight overshoot | `--ease-spring-small` | `cubic-bezier(.3, 1.4, .5, 1)` |
| Running indicators (spinner, progress) | linear | | |

Overshoot and springs only on small elements, up to about 64px, and not on actions repeated all day. Never on dialogs, drawers or sheets. Do not leave the browser default `ease`; set a role easing.

## 3. Duration by size and distance

| What moves | Phone | Desktop |
|---|---|---|
| Hover and press | about 100–150ms (`--dur-1`, `--dur-2`) | same |
| Small (tooltip, menu, toast, check) | about 150–250ms in (`--dur-3`), 120–200ms out (`--dur-2`) | slightly shorter |
| Medium (dialog, popover with content, drawer) | about 250–350ms (`--dur-3m`) | about 200–250ms (`--dur-3`) |
| Large (sheet, page transition, full-screen growth) | about 350–500ms (`--dur-4`) | about two thirds (`--dur-3m`) |

Exits are shorter than entrances. A spring's duration is its tier's duration × about 1.5, computed in place (e.g. `calc(var(--dur-2) * 1.5)`); there is no separate spring token. Use the duration tokens (`--dur-1` to `--dur-4`, and `--dur-3m`); one duration for everything is a smell.

## 4. Choreography

- One lead element moves; others follow with about 20–50ms stagger. Cap the whole sequence at about the large-tier duration.
- Exits reverse the path of entry.
- Shared elements grow from what was touched: a popover grows from the point nearest its trigger and follows the side it actually opens on; a context menu grows from the pointer; a card grows into its detail and shrinks back into the same card.
- Entrances travel a short distance (about 8–24px) and fade in slightly ahead of the movement.

## 5. Interruptibility

- The state change commits immediately; the animation follows it.
- Any animation can be reversed mid-way from where it is; a new input takes over.
- Nothing blocks input while it animates.
- While a finger or pointer drags, follow it 1:1; on release, settle with the release velocity toward the nearer end.

## 6. Properties

- Animate transform and opacity only; filter sparingly. Never width, height, top, left or margin on things that reflow.
- No `transition: all`; name the properties.
- No layout reads and writes interleaved in animation frames.

## 7. Reduced motion

- Under `prefers-reduced-motion: reduce`: keep opacity and colour changes under about 150ms; drop movement, scale, parallax, springs and staggers.
- The state change still happens; only the movement is removed.

## 8. Checks

- Read computed values: every `transition` and `animation` names its properties, uses a role token and a tier duration.
- Frame bursts: `scripts/shot.mjs --steps` with a `burst` step captures start, middle and end of a transition; check the start frame grows from the trigger, the middle frame has no layout jump, the end frame equals the static state.
- Run the same steps with `--emulate-reduced-motion`: no movement, the end state still arrives.
- Press feedback: the pressed state appears within about 100ms of input.

Motion smells:
- everything fades or slides in on page load;
- bounce or overshoot on large surfaces;
- the same duration on everything;
- linear easing on things that move;
- scale-up on hover for cards and rows;
- content that animates in as it scrolls into view;
- a menu or popover that grows from its own centre instead of from its trigger;
- an exit as slow as, or slower than, the entrance.
