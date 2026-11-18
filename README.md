# Deepalaya

**A festival of lights, in the browser.**
 Deepalaya is an interactive Tihar website: a decorated Nepali house, a rangoli maker you can draw with, and a walk through the five days of the festival.

> Built for the KUCC Tihar & Chhath Web UI Design Contest 2026 (Advanced category).

**Live site:** ....
**Festival theme:** Tihar

## Concept

In a quiet season, the sweet scent of sayapatri garlands drifts by the doorway, colourful rangoli welcomes every step, and diyas flicker, bringing warmth to the house. Deepalaya turns that picture into a small web experience: a folk-art landing page, a drawing tool built around a puja thali of colours, and a day-by-day story of Tihar.

## Features

- **Landing page:** a plum text panel with a wavy edge beside a hand-drawn Nepali house, under a header with a diya held in two hands.
- **Rangoli maker:** a canvas with pen, eraser, rectangle, circle, line, petal and bucket-fill tools, undo and redo, adjustable stroke size, optional shape fill, a custom colour picker, and a seven-bowl puja thali palette. Export your rangoli as a PNG or share it.
- **Five days of Tihar:** Kaag Tihar, Kukur Tihar, Gai Tihar & Laxmi Puja, Govardhan & Mha Puja and Bhai Tika, as alternating cards with a silhouette for each day.
- **Responsive:** mobile menu, touch and stylus drawing, and layouts that reflow from desktop to phone.
- **Keyboard shortcuts** in the rangoli maker: `V` select, `P` pen, `E` eraser, `R` rectangle, `O` circle, `L` line, `T` petal, `B` bucket, `F` toggle fill, `Ctrl/Cmd + Z` undo, `Ctrl/Cmd + Shift + Z` redo, `Ctrl/Cmd + S` save.

## Tech stack

- React (Vite)
- Plain CSS with a shared design-token file (`src/index.css`)
- [lucide-react](https://lucide.dev) for icons
- HTML canvas for the drawing tool
- Screen switching with React state, no router

## Getting started

```bash
git clone https://github.com/Aashutosh-kc/YOUR-REPO.git
cd YOUR-REPO
npm install
npm run dev
```

Then open the local address Vite prints (usually `http://localhost:5173`).

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src
├── assets                 SVG and image assets
├── components
│   ├── FiveDays
│   │   ├── DayCard.jsx    one day of Tihar
│   │   └── FiveDays.jsx   the five-day screen
│   ├── FiveDaysCard.jsx   landing card linking to the five days
│   ├── Header.jsx         nav, mobile menu and divider
│   ├── Hero.jsx           first landing card
│   ├── RangoliCard.jsx    landing card linking to the maker
│   ├── ShapeDivider.jsx   wavy pendant under the header
│   └── Whiteboard.jsx     rangoli maker
├── App.jsx                screen state (home, maker, fivedays)
└── index.css              palette, fonts and global styles
```

## Credits and asset sources

TODO: fill in every line before submitting.

- **Fonts:** Baloo 2 and DM Sans via Google Fonts.
- **Icons:** lucide-react, plus the GitHub icon from skillicons.dev.
- **Nepali house illustration:** TODO: tool or author, and licence.
- **Hand holding diya:** TODO: tool or author, and licence.
- **Day silhouettes (crow, dog, cow, diya, thali):** TODO: tool or author, and licence.
- **Puja thali palette:** TODO: tool or author, and licence.
- **Cracker illustration:** TODO: source, and licence. The SVG was vectorised with Trazor.
- **Rangoli illustration:** TODO: source, and licence.

## Author

**Aashutosh K.C.**, Computer Engineering, Kathmandu University
GitHub: [Aashutosh-kc](https://github.com/Aashutosh-kc)

## Status

Built for the contest. TODO: list anything unfinished (for example the countdown section).