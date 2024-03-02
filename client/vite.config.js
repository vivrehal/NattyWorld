import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api':'http://localhost:9000/'
    },
    watch:{
      usePolling:true
    },
    host: true,
    strictPort: true,
    port: 3000
  },
  plugins: [react()],
})
