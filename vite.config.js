import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sassPlugin from 'vite-plugin-sass'; // Import the sass plugin

export default defineConfig({
  plugins: [
    react(),
    sassPlugin() // Add sass plugin here
  ]
});