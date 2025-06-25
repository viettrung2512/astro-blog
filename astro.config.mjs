import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import compress from 'astro-compress';

export default defineConfig({
  integrations: [
    react(),
    compress({
      css: true,
      html: true,
      js: true,
      img: true,
      svg: true
    })
  ],
  vite: {
    build: {
      minify: 'terser',
      cssMinify: true,
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            icons: ['react-icons']
          }
        }
      }
    }
  }
});