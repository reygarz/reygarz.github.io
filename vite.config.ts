import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Для Netlify (и большинства других хостингов) путь должен быть корневым '/'
  base: '/',
  build: {
    outDir: 'dist',
  }
});