import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Для деплою на Vercel base має бути '/' або взагалі відсутнім
  base: '/', 
});