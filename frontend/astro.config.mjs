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
      },
  },

  integrations: [svelte()],
});