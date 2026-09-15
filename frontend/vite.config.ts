import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/AeroPath/', // required so asset URLs resolve correctly on GitHub Pages
});
