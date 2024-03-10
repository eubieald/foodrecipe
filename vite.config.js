import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`, // Example importing additional file
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // Alias @ to src/ for imports
    },
  },
  optimizeDeps: {
    include: ['@babel/preset-env', 'react', 'react-dom'],
  },
  assets: {
    // Specify directories containing images and videos
    // Vite will handle files in these directories
    include: ['src/assets/**'],
  },
});
