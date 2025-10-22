# CalmSpace


CalmEase is a simple, user-friendly React app to help manage anxiety with:

- Relaxation voice notes (guided breathing + affirmations)
- Looping background sounds (ocean, rain, forest)
- Interactive 5-4-3-2-1 grounding exercise
- “Calm Now” button to instantly play a pre-set calming combo
- Personalization: favorites and light/dark mode

## Requirements
- Node.js 18+ (Node 24 detected)

## Getting started

```bash
npm start
```

Open http://localhost:3000 in your browser.

## TailwindCSS
- Tailwind v4 via `@import "tailwindcss"` in `src/index.css`
- Dark mode via adding/removing the `dark` class on `<html>` (handled by ThemeToggle)

## Project structure
- public/
  - sounds/voice-guided.mp3 (placeholder)
  - sounds/ocean.wav (placeholder)
  - sounds/rain.mp3 (placeholder)
  - sounds/forest.mp3 (placeholder)
- src/
  - context/SoundContext.jsx (global audio state, mixing voice+background)
  - hooks/useAudioPlayer.js (bind to HTMLAudioElement refs)
  - components/ (Navbar, Footer, ThemeToggle, CalmNowButton, RelaxationPlayer, BackgroundSound, GroundingExercise)
  - pages/ (Home, Relax, Grounding, About)

## Add your media
Replace placeholders in `public/sounds/` with your real audio files using the same filenames. If you rename files, update paths in:
- src/components/RelaxationPlayer.jsx
- src/context/SoundContext.jsx

## Accessibility
- Large buttons, readable fonts, keyboard-friendly
- ARIA labels and polite live regions

## Personalization
- Favorites persist in localStorage: `calmease:favorites`
- Theme persists in localStorage: `calmease:theme`

## Notes
- Calm Now plays voice-guided.mp3 + ocean.wav together (volumes balanced)
- Background loops; voice does not
