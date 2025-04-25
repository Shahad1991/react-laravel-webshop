// filepath: /Users/shahadnazar/Documents/GitHub/-Lemonade-Stand/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Eller '.'
});