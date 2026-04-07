# Bookshelf

Bookshelf is a local-first reading tracker built with React 18 + Vite. It stores all user data in `localStorage`, works offline after first load, and is ready to deploy to Vercel.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npm run dev
   ```

3. Build for production:

   ```bash
   npm run build
   ```

## Deploy To Vercel

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Keep the default build command as `npm run build`.
4. Keep the output directory as `dist`.
5. Deploy.

`vercel.json` is already included so client-side routes rewrite to `index.html`.

## Add To iPhone Home Screen

1. Open the deployed site in Safari on iPhone.
2. Tap the Share button in Safari.
3. Scroll down and tap `Add to Home Screen`.
4. Confirm the title `Bookshelf`.
5. Launch it from the home screen for the standalone app experience.

## Onboarding And Personalisation

When the app first opens, it shows a short onboarding flow so you can:

1. Set a display name.
2. Pick a yearly reading goal.
3. Choose a reading vibe.

You can edit those later from the Profile tab.

## Notes

- Open Library powers search and cover images, with Google Books used as a fallback cover source when Open Library does not have one.
- Search is debounced by 400ms and gracefully falls back to manual entry if unavailable.
- The app uses a generated service worker through `vite-plugin-pwa` so it remains usable offline after the first successful load.
- All app data is stored under device-local keys such as `bookshelf_books` and `bookshelf_profile`.
