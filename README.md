# Overlap: Weekly Availability Visualizer

Overlap is a Next.js application for scheduling across time zones. Each board lets a small team share when they are free during the week and instantly see where their hours overlap.

## Features

- **Create or join boards** using short 5‑character access codes.
- **Roster up to ten users** per board with their display names and detected time zones.
- **Interactive calendar grid** with 30‑minute slots spanning Sunday through Saturday.
- **Toggle availability** by clicking any time slot. Cell colors range from red (no one available) to green (everyone available).
- **Real-time overlap view** showing which teammates are free in each slot.
- **Cookies remember your user ID** so you remain on the board when you return.

Data persistence is handled by **Supabase** via the helper functions in
`src/lib/db.ts`. To run the project you will need credentials for your own
Supabase instance.

Create a `.env.local` file with the following variables:

```
SUPABASE_URL=<your project url>
SUPABASE_ANON_KEY=<public anon or service role key>
```

## Development

1. Install dependencies with `npm install`.
2. Start the dev server with `npm run dev` (defaults to port `9002`).
3. Optional: run `npm run genkit:dev` to start Genkit AI flows used by the app.

The main entry point is `src/app/page.tsx`, and board logic lives under `src/app/board`.
