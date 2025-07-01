import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';


export default defineConfig({
  base: '/async-race/',
  build: {
    outDir: 'dist',
    assetsDir: './assets'
  },
  plugins: [react(),svgr()],
  server: {
    open: true,
  },
})
