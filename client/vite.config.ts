import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';

const nonHashFiles = [
    'woff',
    'woff2',
]

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({ registerType: 'autoUpdate', injectRegister: 'auto' }),
    ],
    build: {
        rollupOptions: {
            output: {
                assetFileNames: assetInfo => {
                    if (nonHashFiles.some(ext => assetInfo.name.endsWith(`.${ext}`)))
                        return 'assets/[name].[ext]'
                    return 'assets/[name]-[hash].[ext]'
                }
            }
        }
    }
});
