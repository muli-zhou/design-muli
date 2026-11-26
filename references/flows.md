# Flows: information system and interaction logic

Read before designing any screen in New; in Improve and Revise when the change touches navigation, a multi-step task, a form, an async action or a destructive action. Screens are views of a system, so model the system first and derive the screens from it.

## Part A: the model

Write the four parts into `DESIGN-NOTES.md` (or a `FLOWS.md` beside it). Each has a completion criterion.

**1. Objects.** List the things the product holds, their key attributes and relations. Each object has one home screen and one name used everywhere (labels, buttons, URLs, notifications). Done when every noun on every planned screen is one of these objects or an attribute of one, and no object has two names.

**2. Tasks.** For each trigger in the job sentence, write the shortest path as numbered steps. Count steps and decisions. Remove or default every step the system can do itself: do not make the reader configure what you can decide, or type what you already know. Done when each trigger has a path, and every remaining step is either a real decision or real input.

**3. States.** For each object and each async action, a small table of states and transitions: empty, loading, partial, error, offline, cancelled, expired, permission denied, success, undone, and any domain states (draft, confirmed, past). For each: what the reader sees, and the next action available. Done when no state lacks a visible next action (even if it is "nothing to do; here is when this changes").

**4. Navigation.** Where each object lives, how the reader reaches it from each trigger, how they get back, what the URL and the back button do, and what persists across leaving and returning (filters, scroll position, drafts, the open tab). Done when every screen has a defined way back and every shareable view has a URL.

### Worked example: clinic appointment booking

Objects

| Object | Key attributes | Relations | Home |
|---|---|---|---|
| Appointment | time, clinician, type, status | belongs to patient; uses a slot | Appointments |
| Slot | start, length, clinician | free or held by one appointment | inside Book |
| Clinician | name, specialty | has slots | clinician detail |

Task: "book a check-up next week" = 1 choose type (defaulted to the last one) → 2 pick a slot (week view, nearest free first) → 3 confirm. 3 steps, 1 decision. Patient details are not asked; they are known.

States of Appointment

| State | Reader sees | Next action |
|---|---|---|
| Holding slot (async) | the slot marked as held, button shows progress | Cancel |
| Slot taken meanwhile | inline message on the slot, nearest alternatives | Pick another |
| Confirmed | time, place, what to bring | Add to calendar, Reschedule, Cancel |
| Cancelled | struck row for 5s with Undo | Undo, Book again |
| Past | moved to History | Book follow-up |
| Offline | last known list, a line saying it may be out of date | Retry |

Navigation: Appointments is home; Book opens as a page with its own URL; back from Book returns to Appointments with scroll kept; an unfinished booking keeps its chosen type for 24 hours.

## Part B: rules with checks

**Input and validation**
- Validate on blur or on submit, not on the first keystroke; once a field has shown an error, re-check it as the reader types so the error clears promptly.
- The message sits next to the field and says what to do ("Use 5–20 characters"), not just what is wrong.
- Never clear the form on error. Keep drafts across leaving and returning.
- The right input type and keyboard (email, tel, numeric, date); autocomplete attributes set; sensible defaults from what is known.
- Check: submit an invalid form; every error is beside its field, focus moves to the first, nothing typed is lost.

**Destructive and irreversible actions**
- Reversible: act at once and offer Undo. Irreversible: confirm first, and the confirmation names the consequence ("Delete 3 invoices. This cannot be undone.") with the verb on the button ("Delete invoices").
- Check: every delete either has Undo or a confirmation that names what is lost.

**Choice controls**
- Switch: takes effect immediately, in lists that save on their own. Checkbox in a form: applies on save. One on/off thing is never two radios.
- One of 2–5 short options: segmented control. Options that each need a line of explanation: radios, stacked. 6 or more, or labels that change or grow: select. Hundreds: searchable select that says when nothing matches.
- A select holds a value and shows it; a menu holds actions and keeps its own label.
- Check: list each control with its option count and when it takes effect.

**Overlays**
- Choose the kind by principle 7's logic. One layer deep: an overlay does not open another overlay of the same kind.
- Dismissing returns focus to what opened it. Closing with unsaved input asks first.
- Check: open, dismiss with Escape, with the close button and by clicking outside; focus lands back on the trigger.

**Feedback channel** (most specific first)
- Inline next to the cause → status in place of the control ("Saving…" → "Saved") → toast for confirmations that need no action → notification for things the reader needs later.
- Anything that requires action never lives only in a toast. Status toasts stay about 3–5s; toasts with Undo at least about 5s; both pause on hover and focus. One toast at a time.
- Progress turns into its result in the same place.
- Check: every async action has a visible in-place status within about 100ms of input.

**Time-based behaviour**
- Tooltips: about 500ms delay for the first, immediate for neighbours in the same group; text only.
- Hover cards: slower than tooltips, with a grace period so the pointer can move into them.
- Nested menus: a short open delay (about 200ms), a longer close delay (about 300–400ms) and a safe corridor so a diagonal move toward the submenu does not switch it.
- Touch acts immediately; nothing depends on hover.

**Loading and optimistic updates**
- Nothing for waits under about 300ms; once a loader shows, it stays at least about 500ms.
- Skeletons only for content whose shape is known, at real sizes. After about 10s, say it is taking longer and let the reader leave or keep it running.
- Optimistic updates only for reversible, nearly-always-successful actions; never for payments, sending to others or permanent deletion. On failure, revert visibly and offer Retry.

**Keyboard and gestures**
- Every action reachable by keyboard, with visible focus. Escape closes the top layer; Enter submits a single-field form.
- Every gesture has a visible alternative (a swipe-to-delete also has a menu item). Drag cancels on Escape or drop outside.

**Rapid and repeated input**
- Guard double submit: the control shows its in-flight state and ignores repeats. Cancel mid-way works and leaves a consistent state.
- Check: click the submit control three times quickly; one request goes out.
