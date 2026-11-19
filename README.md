# Weather Studio

A responsive Jakarta weather dashboard built with Next.js 16, React 19, TypeScript, Tailwind CSS, and responsive SVG charts.

## Run locally

Requires Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open http://localhost:3000. For production, run `npm run build` then `npm start`.

## Pages

- `/`: current weather, feels-like temperature, humidity, wind, precipitation, a seven-day overview, and tomorrow’s forecast.
- `/forecast`: all seven daily highs and lows, rain probabilities, and temperature trends.
- `/stats`: daily rain probability, maximum wind, maximum cloud cover, and weekly aggregates.

## Data

The server fetches Open-Meteo forecasts for Jakarta and caches them for one hour. Cloud-cover maxima are calculated from hourly cloud cover; apparent temperature comes from the API. Dates and timestamps use Jakarta time. Incomplete or unavailable responses show an error with a retry action. No invented air-quality or visibility data is displayed.

## Design

See `DESIGN.md` for the visual system and responsive layout. Desktop uses paired columns and header navigation; phones use a single column and labeled bottom navigation. Keyboard focus, safe-area insets, loading/error states, and reduced-motion preferences are supported.

## Skills

Installed locally in `.agents/skills` from their upstream repositories:

- `Leonxlnx/taste-skill`: taste-skill
- `miqdadbadjuber/anti-slop` (antislop-ai): antislop, antislop-ui, antislop-layoutmobile, antislop-copywriting, antislop-code, antislop-human

These are development instructions, not application dependencies. Skills are available automatically on the next turn.

## Validation

```sh
npm run lint
npx tsc --noEmit
npm run build
```

See `DESIGN-REVIEW.md` for browser verification results and limitations.
