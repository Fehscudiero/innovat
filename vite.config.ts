import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

/**
 * Plugin: non-blocking CSS
 * Converte <link rel="stylesheet" href="...css"> injetado pelo Vite em:
 *   <link rel="preload" as="style" onload="this.onload=null;this.rel='stylesheet'">
 * Isso remove o CSS do caminho crítico de renderização (render-blocking).
 * O CSS crítico above-the-fold já está inline no index.html.
 * PageSpeed Audit: "Solicitações que bloquearam a renderização" → resolvido.
 */
function nonBlockingCssPlugin(): Plugin {
  return {
    name: 'non-blocking-css',
    enforce: 'post',
    transformIndexHtml(html) {
      // Substitui apenas links CSS de assets gerados pelo build (não fontes externas)
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        (_, href) =>
          `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" href="${href}"></noscript>`
      )
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    nonBlockingCssPlugin(),
  ],
  build: {
    // Target moderno — elimina polyfills desnecessários e reduz bundle size
    target: 'es2020',
    // CSS minificado pelo esbuild
    cssMinify: true,
    // Separa CSS em chunks para carregamento paralelo e não bloqueante
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Code splitting manual — carrega apenas o necessário
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/gsap')) {
            return 'vendor-gsap'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons'
          }
        },
      },
    },
  },
})

