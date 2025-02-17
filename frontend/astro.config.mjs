// astro.config.mjs
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
    vite: {
        css: {
            postcss: './postcss.config.js', // Ensure Vite uses your PostCSS config
        },
        server: {
            watch: {
                usePolling: true, // Optional based on your environment
                interval: 100,
            },
            proxy: {
                '/api': {
                    target: 'http://127.0.0.1:8000', // Backend server
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
    },

    integrations: [svelte()],
});