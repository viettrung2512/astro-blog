import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

export default defineConfig({
  adapter: netlify(),
  integrations: [react(),tailwind()],
});