<div align="center">
<img src="./public/logo.svg" width="96" alt="Deepalaya logo" />

# Deepalaya

**A festival of lights, in the browser.**

An interactive Tihar website: a decorated Nepali house, a rangoli maker you can draw with, and a walk through the five days of the festival.

<img src="https://skillicons.dev/icons?i=react,vite,js,html,css,git,github,vercel,vscode" alt="Tech stack icons" />

**[Live site](TODO-add-vercel-link)** · **Festival theme:** Tihar · Built for the KUCC Tihar & Chhath Web UI Design Contest 2026 (Advanced)

</div>

## Preview

| Home | Rangoli maker | Five days |
| :---: | :---: | :---: |
| ![Home page](previews\hero_card_preview.png) | ![Rangoli maker](previews\rangoli_card_preview.png) | ![Five days](previews\fiveday_card_preview.png) |

## Concept

In a quiet season, the sweet scent of sayapatri garlands drifts by the doorway, colourful rangoli welcomes every step, and diyas flicker, bringing warmth to the house. Deepalaya turns that picture into a small web experience: a folk-art landing page, a drawing tool built around a puja thali of colours, and a day-by-day story of Tihar.

## Features

- **Landing page:** a plum text panel with a wavy edge beside a Nepali house illustration, under a header with a diya held in two hands.
- **Rangoli maker:** a canvas with pen, eraser, rectangle, circle, line, petal and bucket-fill tools, undo and redo, adjustable stroke size, optional shape fill, a custom colour picker and a seven-bowl puja thali palette. Export your rangoli as a PNG or share it.
- **Five days of Tihar:** Kaag Tihar, Kukur Tihar, Gai Tihar & Laxmi Puja, Govardhan & Mha Puja and Bhai Tika, as alternating cards with a silhouette for each day.
- **Laxmi's footprints:** a trail of red footprints follows the cursor as if welcoming the goddess into the home. It has an on/off toggle, remembers your choice, and switches itself off in the rangoli maker and for people who prefer reduced motion.
- **Responsive:** mobile menu, touch and stylus drawing, and layouts that reflow from desktop to phone.
- **Keyboard shortcuts** in the rangoli maker: `V` select, `P` pen, `E` eraser, `R` rectangle, `O` circle, `L` line, `T` petal, `B` bucket, `F` toggle fill, `Ctrl/Cmd + Z` undo, `Ctrl/Cmd + Shift + Z` redo, `Ctrl/Cmd + S` save.

## Tech stack

- React with Vite
- Plain CSS with shared design tokens (`src/index.css`)
- [lucide-react](https://lucide.dev) for icons
- HTML canvas for the drawing tool
- Screen switching with React state, no router

## Getting started

```bash
git clone https://github.com/Aashutosh-kc/deepalaya.git
cd deepalaya
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
├── assets                   SVG and image assets
├── components
│   ├── FiveDays
│   │   ├── DayCard.jsx      one day of Tihar
│   │   └── FiveDays.jsx     the five-day screen
│   ├── FiveDaysCard.jsx     landing card linking to the five days
│   ├── FootprintTrail.jsx   Laxmi footprint cursor trail and toggle
│   ├── Header.jsx           nav, mobile menu and divider
│   ├── Hero.jsx             first landing card
│   ├── RangoliCard.jsx      landing card linking to the maker
│   ├── ShapeDivider.jsx     wavy pendant under the header
│   └── Whiteboard.jsx       rangoli maker
├── App.jsx                  screen state (home, maker, fivedays)
└── index.css                palette, fonts and global styles
```

## Credits and asset sources

Illustrations and icons below were adapted for this project. "Silhouette" means the source was traced into a flat single-colour shape, then recoloured and outlined to match the site's palette.

| Asset | Used for | Source | Changes |
| --- | --- | --- | --- |
| Crow | Day 1 silhouette | [Instagram post](https://www.instagram.com/p/Ci8Pqv_POig/) | Silhouette, recoloured and outlined |
| Dog | Day 2 silhouette | [Instagram post](https://www.instagram.com/p/DfTegZgCINN/) | Silhouette, recoloured and outlined |
| Cow / ox | Day 3 silhouette | Thapa, P. / Xinhua. (2016). *A Nepalese priest worships a cow during the Tihar festival in Kathmandu, Nepal, Oct. 30, 2016* [Photograph]. [Alamy Stock Photo](https://www.alamy.com/stock-photo-kathmandu-nepal-30th-oct-2016-a-nepalese-priest-worships-a-cow-during-124563904.html) | Silhouette, recoloured and outlined |
| Bhai Tika illustration | Day 5 silhouette | *Watercolor illustration of Nepalese brother and sister celebrating Bhai Tika during Tihar festival* [Digital graphic]. (n.d.). [Pngtree](https://pngtree.com) | Silhouette, recoloured and outlined |
| Goddess Lakshmi on a lotus | DayCard | *Digital illustration of Goddess Lakshmi sitting on a lotus with gold coins* [Digital graphic]. (n.d.). [Pngtree](https://pngtree.com) | Recoloured and outlined |
| Nepali house | Hero illustration | Newari artitechture | Recolored and outlined  |
| Puja thali | Colour palette in the rangoli maker | Household puja thali| Vectorized  |
| Peacock rangoli | Rangoli card | Pintrest rangoli inspiration | Reimagined , recolored and outlined |
| Cracker | Hero decoration | Dribble's design inspirations  | Vectorised with Trazor |
| Footprint | Cursor trail | Original shape drawn with AI assistance | Traced with Trazor, recoloured |
| Fonts | Headings and body | Baloo 2 and DM Sans via Google Fonts | None |
| Icons | Interface | [lucide-react](https://lucide.dev) and [skillicons.dev](https://skillicons.dev) | None |

## AI assistance

ChatGPT was used for only code review, debugging and guidance throughout the build, and to draw the footprint shape.

## Author

**Aashutosh K.C.**, Computer Engineering, Kathmandu University

GitHub: [Aashutosh-kc](https://github.com/Aashutosh-kc)

## Status

Built for the contest. 