import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Us | AI Shelve',
  description: 'Get in touch with the AI Shelve team for questions, partnerships, or tool submissions.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-2xl mx-auto">
      <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm inline-flex items-center gap-2 mb-8">
        ← Back to Home
      </Link>

      <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
      <p className="text-gray-400 mb-10 text-lg">
        Have a question, suggestion, or want to list your AI tool? We would love to hear from you.
      </p>

      <div className="flex flex-col gap-4">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">General Inquiries</p>
          <a href="mailto:contact@aishelve.com" className="text-purple-400 hover:underline text-lg">
            contact@aishelve.com
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Instagram</p>
          <p className="text-gray-400 text-sm mb-3">Follow us for the latest AI tools and updates.</p>
          <a
            href="https://instagram.com/aishelve"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600/20 to-purple-600/20 hover:from-pink-600/40 hover:to-purple-600/40 border border-pink-500/30 text-pink-400 hover:text-white px-5 py-2 rounded-xl text-sm font-medium transition"
          >
            @aishelve on Instagram →
          </a>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Submit a Tool</p>
          <p className="text-gray-400 text-sm mb-3">Want your AI tool listed on AI Shelve? Use our submission form.</p>
          <Link href="/submit" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl text-sm font-medium transition inline-block">
            Submit a Tool →
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Advertising & Partnerships</p>
          <p className="text-gray-400 text-sm mb-3">Interested in sponsoring or featuring your tool?</p>
          <Link href="/advertise" className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-xl text-sm font-medium transition inline-block">
            View Advertising Options →
          </Link>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-1">Response Time</p>
          <p className="text-gray-400">We typically respond within 24 to 48 hours on business days.</p>
        </div>
      </div>
    </main>
  )
}
