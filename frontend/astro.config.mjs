// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    vite: {
      server: {
          watch: {
              usePolling: true,  // Enable polling if file changes are not detected
              interval: 100,     // Set polling interval (ms)
          },
      },

      plugins: [tailwindcss()],
    },
});