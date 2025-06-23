import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

import react from '@astrojs/react';

export default defineConfig({
  adapter: netlify(),
  output: 'server',
  integrations: [react(),tailwind()],
});