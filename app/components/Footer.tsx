import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black/60 border-t border-white/10 py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🗄️</span>
              <span className="font-bold text-xl text-white">AI Shelve</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discovering the best AI tools, curated for you.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/tools" className="hover:text-white transition">All Tools</Link>
              <Link href="/categories" className="hover:text-white transition">Categories</Link>
              <Link href="/blog" className="hover:text-white transition">Blog</Link>
              <Link href="/submit" className="hover:text-white transition">Submit Tool</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/about" className="hover:text-white transition">About Us</Link>
              <Link href="/advertise" className="hover:text-white transition">Advertise</Link>
              <Link href="/contact" className="hover:text-white transition">Contact</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} AI Shelve. All Rights Reserved.
          <span className="mx-2">•</span>
          Made for AI enthusiasts
        </div>
      </div>
    </footer>
  )
}
