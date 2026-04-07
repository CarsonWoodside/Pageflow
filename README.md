# Bookshelf

Bookshelf is a local-first reading tracker for Carson, Jessica, and Ash. It is built with React 18 + Vite, stores all user data in `localStorage`, works offline after first load, and is ready to deploy to Vercel.

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

## Switching Users

1. Open the app.
2. Tap `Switch User` in the header or use the Profile tab.
3. Pick Carson, Jessica, or Ash.

Each user has their own device-local `localStorage` namespace:

- `bookshelf_carson_books`
- `bookshelf_jessica_books`
- `bookshelf_ash_books`

## Book Sharing

Every book card and book detail view includes a share button.

1. Tap `Share`.
2. The app copies a message snippet with title, author, rating, and review when available.
3. Paste that snippet into iMessage or WhatsApp.
4. On the Friends tab, paste a snippet received from a friend and save it to your local `Recently Shared` area.

## Notes

- Open Library powers search and cover images.
- Search is debounced by 400ms and gracefully falls back to manual entry if unavailable.
- The app uses a generated service worker through `vite-plugin-pwa` so it remains usable offline after the first successful load.
