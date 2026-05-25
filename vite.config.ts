import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],
  build: {
    // Target moderno — elimina polyfills desnecessários
    target: 'es2015',
    // CSS minificado pelo esbuild
    cssMinify: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Code splitting manual — carrega apenas o necessário
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-gsap':  ['gsap'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
