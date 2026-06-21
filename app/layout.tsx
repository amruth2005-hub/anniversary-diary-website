import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Caveat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
})

const caveat = Caveat({
  variable: '--font-hand',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Two Years — Our Diary',
  description:
    'A handmade diary of two years of memories, travels, and little things together.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#3a2a1c',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${caveat.variable} bg-background`}
    >
      <body className="font-serif antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
