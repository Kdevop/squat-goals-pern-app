import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './setupTests.js', 
    globals: true,
    clearMocks: true, 
    restoreMocks: true, 
    resetModules: true,
  },
});