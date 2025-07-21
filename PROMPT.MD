App Name
“Overlap” – Weekly Availability Planner

1. Goal
Build a full‑stack MVP that lets up to 10 named users record and visualize their recurring weekly availability, highlighting the best collaboration windows at a glance.

2. Core Features
Area	Spec
User Roster	Persistent list (max 10). Each user enters a display name & primary time‑zone on first visit.
Board Access	Creating a board generates a short alphanumeric access code (e.g., “A7QK3”). Entering the code re‑joins the same board. No other auth.
Time‑Zone Rules	Grid anchors to Pacific Time (PT). All other zones auto‑adjust for daylight‑saving. Above each time row, show each participant’s zone abbreviation (e.g., PDT, CET).
Calendar Grid	<ul><li>Columns: Sunday → Saturday (fixed).</li><li>Rows: 48 rows covering 24 h in 30‑min increments.</li><li>Full‑width on desktop; responsive single‑column scroll on mobile.</li></ul>
Availability Toggle	Click/tap any 30‑min cell to toggle personal availability. No drag/bulk‑select in v1.
Color Logic	Background gradient per cell:
• 0% of users → #FF3B30 (red)
• ≥25% → #FF9500 (orange)
• ≥50% → #FFCC00 (yellow)
• 100% → #34C759 (bright green)
Ensure text (time labels) meets WCAG contrast over each color.
Data Persistence	Use Firebase (Firestore or Realtime DB). Structure:
boards/{code}/members/{uid} → {name, tz}
boards/{code}/availability/{day}/{slot} → list of uids.
Week Semantics	The single grid represents an evergreen “typical week”; no date‑specific instances.
Devices	Desktop and mobile (responsive).

3. Non‑Goals (v1)
No bulk selection, best‑slot sidebar, notifications, exports, or role separation.

4. Tech & Deliverables
Front‑end: Any stack (React, Vue, Svelte, or Vanilla JS)—developer’s choice.

Back‑end: Firebase for auth‑free persistence.

Deployment: Provide runnable project + brief README outlining env vars and Firebase setup.

5. Success Criteria
Multiple users can join via the shared code, mark availability, and instantly see the updated color coding across devices.

All time‑zone abbreviations display correctly relative to PT, including during DST transitions.

Grid remains legible and touch‑friendly on mobile.
