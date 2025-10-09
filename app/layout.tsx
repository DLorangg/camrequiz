import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Camrequiz',
  description: 'Diseñado por Damián Lorang',
  icons: {
    icon: '../public/images/camrevoc-logo.png', 
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
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
