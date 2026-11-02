import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// WhatsApp y Facebook necesitan la URL completa de la imagen de vista previa.
// Usa VITE_SITE_URL si existe; en Vercel toma el dominio de producción solo.
function urlDelSitio() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return ''
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'url-del-sitio',
      transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', urlDelSitio()),
    },
  ],
})
