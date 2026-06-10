import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// The service worker precaches the app SHELL only (HTML/JS/CSS, icons, the tryout
// agenda PDF) so the tool opens and runs in a gym with no Wi-Fi. It never caches
// tryout data, that lives in localStorage and is intentionally device-bound, so
// clearing browser history still wipes data + cache together (EdTech compliance).
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'favicon-32.png',
        'apple-touch-icon.png',
        'logo-192.png',
        'logo-512.png',
        'basketball.svg',
        'tryout-agenda.pdf',
      ],
      manifest: {
        name: 'Provably Fair Basketball',
        short_name: 'Fair Basketball',
        description: 'Fair, bias-free tryout evaluation and a full coaching handbook for youth basketball',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F5F7',
        theme_color: '#F5F5F7',
        icons: [
          { src: '/logo-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/logo-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
