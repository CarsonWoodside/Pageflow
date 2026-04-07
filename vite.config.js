import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/openlibrary\.org\/search\.json/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'openlibrary-search'
            }
          },
          {
            urlPattern: /^https:\/\/covers\.openlibrary\.org\/b\/id\//i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'openlibrary-covers'
            }
          }
        ]
      }
    })
  ]
});
