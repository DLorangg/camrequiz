import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { Logo } from '../public/images/camrevoc-logo.png'
import './globals.css'

export const metadata: Metadata = {
  title: 'Camrequiz',
  description: 'Diseñado por Damián Lorang',
  icons: {
    icon: Logo, 
  },
  openGraph: {
    title: 'CamreQuiz',
    description: '¡Un juego de preguntas y respuestas para coleccionar personajes!',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>
        <footer className="w-full text-center p-4 text-sm text-gray-500 bg-gray-50 border-t">
          <p>
            Diseñado con ❤️ por <span className="font-semibold">Dami Lorang</span>
          </p>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
