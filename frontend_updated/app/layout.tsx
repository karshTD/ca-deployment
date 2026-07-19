import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Tillana } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

// Desi display face for the "namaste" hero word.
// Easy to swap: try 'Yatra_One', 'Rozha_One', or 'Kalam' from next/font/google.
const desi = Tillana({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-desi-src',
})

export const metadata: Metadata = {
  title: 'Contract Analyzer — Protect yourself from hidden loan risks',
  description:
    'Upload an Indian loan contract, enter your financial details, and get a personalized, plain-English risk report.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#08070a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geist.variable} ${desi.variable}`}>
      <body className="font-sans antialiased min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
