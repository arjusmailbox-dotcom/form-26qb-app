import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/form-26qb-app/', // CHANGE THIS if your repository name is different
  server: {
    port: 5173,
    open: true
  }
})
