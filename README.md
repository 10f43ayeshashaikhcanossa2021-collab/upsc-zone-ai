# UPSC ZONE AI – React (Vite)

React version of the landing page. Same design, responsive for phones, tablets and laptops.

## Run
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Where things are
- `src/styles.css` – original CSS (all breakpoints preserved)
- `src/config.js` – Login / Get Started links (`app.html#/...`) – change to your real app URLs
- `src/i18n/` – English/Hindi switch (`hi.js` dictionary, `useT()` hook)
- `src/data/` – ticker alerts, comparison rows, mentors, map states/stories, chat answers
- `src/components/` – one component per section; `Globe.jsx` and `TourMap.jsx` use Three.js
