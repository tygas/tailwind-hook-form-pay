import * as path from 'path'

import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@c': path.resolve(__dirname, 'src/components'),
    },
  },
  plugins: [react()],
  server: {
    host: true,
    port: 3000,
  },
})
