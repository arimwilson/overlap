# Overlap – KURT Product Requirements (v0.1)

**Product Vision**
Overlap helps small, ad‑hoc groups (≤10 people) across time zones quickly discover mutually available meeting times **without** requiring shared Google Calendars. Users open a shared “board,” mark their recurring weekly availability, and visually spot high‑overlap slots. MVP success = groups reduce coordination from multi‑day email threads to <5 minutes.

---

## K — Key Users & Use Cases

**Primary User:** Non‑technical coordinator (mission leader, volunteer, consultant) assembling a small global team that lacks shared calendars. Uses desktop *and* mobile.

**Secondary Users:** Participants invited to a board; may join once, set availability, and revisit when scheduling.

**Core Jobs-to-be-Done**

1. *Create/Join Board:* Start a board, share code/link, participants self‑identify.
2. *Set Availability:* Mark weekly recurring slots (30‑min granularity) in own local timezone.
3. *Compare Across Timezones:* Instantly see which future weekly slots have the highest overlap and the local times for each participant.
4. *Select Meeting Slot:* Choose a slot and communicate externally (WhatsApp/email) including board link.

Out‑of‑Scope (for now): Meeting invitations, attendee lists per slot, rolling 7‑day calendars, automatic cleanup of past bookings, full scheduling/booking workflow.

---

## U — User Feedback Synthesis

| Need / Pain                                            | Evidence                                               | Priority |
| ------------------------------------------------------ | ------------------------------------------------------ | -------- |
| Easy re‑entry to board without duplicate user creation | User re‑entered name → duplicate roster entry          | High     |
| Edit own availability after adding another’s schedule  | Admin couldn’t edit after entering Javier’s schedule   | High     |
| Visual clarity: frozen headers/left column, grid lines | “Column headers need to be frozen…cell lines in black” | High     |
| Display all participant timezones simultaneously       | “Show all the time zones…see real time…avoid 2:00am”   | High     |
| Mobile usability                                       | “Primary use case on a cell phone”                     | High     |
| Show own timezone + allow change                       | Already present; positive                              | Keep     |
| Clear copy/share of board code                         | Working; minor enhancement (toast)                     | Medium   |
| Prevent board overfill (>10)                           | Already enforced                                       | Keep     |
| Indicate availability overlap intuitively              | Heatmap works (“functionality of spotting openings”)   | Keep     |
| Ability to mark a *booked* slot (avoid double booking) | Suggested drag‑and‑drop shape; deemed scope creep      | Later    |
| Rolling 7‑day logic & auto‑expire bookings             | Explored; user declined for MVP                        | Later    |

---

## R — Requirements (MVP Enhancements)

### Functional

1. **Roster De‑duplication:** When a user rejoins with an existing name on same board, do not create a new entry; instead restore session cookie (lookup by `board_id,name`). If cookie lost, allow selecting existing name (list of names as buttons) or entering a *distinct* new name.
2. **Edit Own Availability Anytime:** Ensure admin/any user can toggle availability after editing another participant’s entries. (Bug: likely due to session switching when manually adding others.) Provide explicit “Switch User” flow if editing others is required or limit editing to self only.
3. **Frozen Headers & First Columns:** Implement CSS/sticky positioning so: timezone columns + time labels + day headers remain visible while scrolling. Add subtle black (or accessible contrast) grid lines to improve precision.
4. **All Participant Timezones Column:** Add one column per unique timezone (already partly implemented) but also surface participant names under each timezone abbreviation (hover tooltip or stacked avatars) for clarity.
5. **Mobile Responsive Layout:** Vertical stacking: roster collapsible drawer; grid horizontal scroll with persistent headers. Optimize tap targets (≥44px). Provide “Tap to mark available” hint.
6. **Rejoin Flow / Board Access:** Add explicit “Return to board” link on homepage when cookie still valid. Display persistent share link & copy toast.
7. **Timezone Awareness:** For each cell hover, show tooltip translating slot into *each participant* local time (to reinforce 2am visibility). Already partly via multi‑timezone columns.

### Non‑Functional

* **Performance:** Board <=10 users, 7 days \* 48 slots = 336 cells; with multi‑tz labels acceptable. Target <200ms interaction latency for toggles.
* **Security/Privacy:** No authentication; names stored publicly via code. Display disclaimer.
* **Accessibility:** Ensure color contrast for heatmap; add text alternative (e.g., tooltip lists). Keyboard navigation for cells.

### Analytics (Later)

* Track time from board creation to first slot selection.
* Count unique boards/week.

---

## T — Timeline & Phasing

**Phase 0 (Bug Fixes – Week 1)**

* Roster de‑duplication
* Edit own availability bug fix

**Phase 1 (Usability – Weeks 2–3)**

* Frozen headers & grid lines
* Improved rejoin flow + copy toast
* Mobile responsive adjustments

**Phase 2 (Timezone Clarity – Weeks 4–5)**

* Enhanced timezone columns with participant context
* Tooltip showing per‑user local times

**Backlog / Future (Post‑MVP)**

* Booked slot indicator & lifecycle
* Rolling 7‑day view / auto‑expire bookings
* Meeting invitations & attendee management
* Authentication & persistent user accounts

---

## Open Questions

1. Should editing other users’ availability be supported or restricted? (Current UI implies possible.)
2. How to reconcile name collisions (two “John”)? Approach: append suffix or prompt user to disambiguate.
3. What minimal analytics are needed before public launch?

---

## Acceptance Criteria (Samples)

* Rejoining with identical name does **not** create a second entry; participant count unchanged.
* Scrolling the grid on desktop keeps day headers and timezone columns visible.
* On iPhone 13 viewport, user can toggle availability; headers readable; no horizontal scrollbar offscreen.
* Hovering a slot shows list of available user names and count; colors meet WCAG AA for text.

---

**Next Step:** Implement Phase 0 & 1; upon completion, user will share with Uganda ministry group for real‑world validation.
