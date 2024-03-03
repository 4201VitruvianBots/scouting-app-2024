import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg', ],
            workbox: {
                globPatterns: ['**/*.{js,css,html,png,woff2,svg,wasm,data}'],
                maximumFileSizeToCacheInBytes: 10485760,
            },
            manifest: {
                name: 'Vitruvian Scouting',
                short_name: 'VitruvianScouting',
                description: 'Vitruvian Bots Scouting Application',
                theme_color: '#48ca5d',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ]
            }
        }),
    ],
});
