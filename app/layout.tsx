import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Bebas_Neue } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-playfair',
  display: 'swap',
})

// Used exclusively for the hero mega-headline — condensed, all-caps, maximum impact
const bebas = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Get 80+ Qualified Projects in 12 Weeks — Prime Ambition Marketing',
  description:
    "AI-powered marketing system for concrete & hardscapers. Guaranteed results or you don't pay.",
  robots: 'noindex, nofollow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: '#0A1120',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${bebas.variable}`}>
      <body>{children}</body>
    </html>
  )
}
