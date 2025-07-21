# **App Name**: Overlap: Weekly Availability Visualizer

## Core Features:

- User Roster: Persistent user roster (max 10) with display name and timezone.
- Board Access: Short alphanumeric access code to join boards. (e.g., “A7QK3”).
- Calendar Grid: Calendar grid display spanning Sunday to Saturday, with 30-minute increments. Each cell lists every person who is available at that time on that day.
- Availability Toggle: Click/tap a 30-minute cell to toggle personal availability.
- Color Logic: Color gradient based on availability overlap. Red for 0%, bright green for 100%.
- Data Persistence: Persistence is handled by Firebase.
- Timezone Display: Display timezone abbreviation (e.g. PDT, CET) for each user above the calendar. Timezones will be automatically calculated using a tool that factors in daylight savings time.

## Style Guidelines:

- Primary color: Vivid blue (#29ABE2) to evoke collaboration and clarity.
- Background color: Light blue (#E5F5FF), almost white to not distract from the grid. Provides enough contrast for legibility in a light scheme.
- Accent color: Purple (#A229E2) to highlight important interactive elements.
- Font pairing: 'Inter' (sans-serif) for both headlines and body text, with 'Source Code Pro' for displaying the board access code.
- Full-width grid layout on desktop; responsive single-column scroll on mobile.
- Subtle animations on availability toggle to indicate selection.