import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  metadataBase: new URL('https://aishelve.com'),

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },

  title: {
    default: 'AI Tools Directory - Find The Best AI Tools',
    template: '%s | AI Shelve',
  },

  description:
    'Browse hundreds of AI tools for writing, image generation, coding, video, audio and more. Find the perfect AI tool for your needs. Updated daily.',

  keywords: [
    'AI tools',
    'artificial intelligence',
    'AI directory',
    'best AI tools',
    'AI for writing',
    'AI image generation',
    'AI coding tools',
    'ChatGPT alternatives',
    'AI productivity tools',
    'AI software directory',
    'free AI tools',
    'Midjourney alternatives',
  ],

  authors: [{ name: 'AI Shelve' }],
  creator: 'AI Shelve',
  publisher: 'AI Shelve',

  verification: {
    google: '28PxnAniJ5rJ041ay4W_KUihvrHsjOhHbnVqMVv55mA',
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aishelve.com',
    siteName: 'AI Shelve',
    title: 'AI Shelve - Best AI Tools Directory',
    description:
      'Discover and compare the best AI tools for writing, coding, image generation, productivity and more. Curated daily.',
    images: [
      {
        url: '/og/home.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Shelve - Best AI Tools Directory',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'AI Shelve - Best AI Tools Directory',
    description:
      'Browse hundreds of AI tools for writing, image generation, coding, video, audio and more.',
    images: ['/og/home.jpg'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://aishelve.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#080810] text-white antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
