import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about AI Shelve — the directory for discovering the best AI tools.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto">

      <div className="mb-12">
        <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-3">Who We Are</p>
        <h1 className="text-4xl font-extrabold text-white mb-6">About AI Shelve</h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          AI Shelve is a curated directory of the best AI tools available today. Our mission is simple — help people find the right AI tool for their needs without spending hours searching the internet.
        </p>
      </div>

      <div className="flex flex-col gap-10 text-gray-400 leading-relaxed">

        <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7">
          <h2 className="text-white font-bold text-xl mb-3">🎯 Our Mission</h2>
          <p>The AI space moves fast. New tools launch every day and it's hard to keep up. AI Shelve exists to cut through the noise and surface the tools that actually work — organized by category, updated daily, and completely free to browse.</p>
        </section>

        <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7">
          <h2 className="text-white font-bold text-xl mb-3">🛠️ What We Cover</h2>
          <p>From writing and coding to image generation, video, audio, and productivity — we cover every category of AI tools. Whether you're a student, freelancer, developer, or business owner, you'll find something useful here.</p>
        </section>

        <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-7">
          <h2 className="text-white font-bold text-xl mb-3">💡 How It Works</h2>
          <p>Anyone can submit a tool for free. Our team reviews every submission before it goes live to make sure it meets our quality standards. Sponsored and featured listings are available for tools that want more visibility.</p>
        </section>

      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-500 mb-6">Have a tool to add or a question?</p>
        <div className="flex gap-4 justify-center">
          <Link href="/submit" className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-90 transition-all">
            Submit a Tool
          </Link>
          <Link href="/contact" className="bg-white/5 border border-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-white/10 transition-all">
            Contact Us
          </Link>
        </div>
      </div>

    </main>
  )
}
