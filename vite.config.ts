import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ВАЖНО: Замените 'jk-technolibrary' на название вашего репозитория на GitHub!
  base: '/jk-technolibrary/',
  build: {
    outDir: 'dist',
  }
});