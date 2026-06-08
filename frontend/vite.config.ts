import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev proxy: frontend -> backend (so API calls can use /api/v1)
// You can override the backend target with VITE_PROXY_TARGET in .env
const target = process.env.VITE_PROXY_TARGET || 'http://localhost:8080'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target,
        changeOrigin: true
      }
    }
  }
})
