import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      // '/api':'https://nattyworld-server.onrender.com'
      '/api': {
        target: 'https://nattyworld-server.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      }
    },
  },
  plugins: [react()],
})
