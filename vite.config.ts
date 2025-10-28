import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  root: 'tiketing',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'tiketing/src')
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true
  },
  server: {
    port: 5173,
    open: false
  }
});
