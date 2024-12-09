import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000'
    },
  },
  build: {
    outDir: 'view/build',
  },
});


//code before change
// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
