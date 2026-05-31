import type { Metadata } from 'next'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'AI Tools Directory - Find The Best AI Tools',
    template: '%s | AI Tools Directory',
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
  ],
  authors: [{ name: 'AI Tools Directory' }],
  creator: 'AI Tools Directory',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-site.vercel.app',
    siteName: 'AI Tools Directory',
    title: 'AI Tools Directory - Find The Best AI Tools',
    description:
      'Browse hundreds of AI tools for writing, image generation, coding, video, audio and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory - Find The Best AI Tools',
    description:
      'Browse hundreds of AI tools for writing, image generation, coding, video, audio and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
