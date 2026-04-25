import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CamreQuiz',
    short_name: 'CamreQuiz',
    description: '¡Un juego de preguntas y respuestas para coleccionar personajes!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ecfdf5', // Tono bg-emerald-50
    theme_color: '#059669', // Tono text-emerald-600
    icons: [
      {
        src: '/images/camrevoc-logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/camrevoc-logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}