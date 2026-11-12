import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Funcionamento offline depois da primeira visita (service worker com precache do Workbox).
    // Só existe no build de produção: o npm run dev não registra service worker.
    VitePWA({
      // Sem manifest de instalação (o site não é instalável, só funciona offline)
      manifest: false,
      // "autoUpdate": a versão nova assume sozinha (skipWaiting + clientsClaim), sem recarregar a página
      registerType: 'autoUpdate',
      injectRegister: 'script',
      workbox: {
        skipWaiting: true,
        clientsClaim: true,
        // Apaga do aparelho os arquivos de versões antigas do site
        cleanupOutdatedCaches: true,
        // HTML, JS, CSS, fontes e imagens do build
        globPatterns: ['**/*.{html,js,css,woff2,svg,png,jpg,jpeg,webp,avif,ico}'],
        // O site usa rotas por hash (#/, #/roadmap, #/sala/N): todas são a mesma página (index.html)
        navigateFallback: 'index.html',
      },
    }),
  ],
})
