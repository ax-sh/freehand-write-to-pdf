import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/freehand-write-to-pdf/',
  optimizeDeps: {
    include: ['pdfjs-dist'], // optionally specify dependency name
    esbuildOptions: {
      supported: {
        'top-level-await': true
      }
    }
  },
  esbuild: {
    supported: {
      'top-level-await': true
    }
  },
  plugins: [react(), UnoCSS()]
});
