import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-950/10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm font-bold">
                AI
              </div>
              <span className="text-white font-bold text-lg">
                ai<span className="text-violet-400">shelve</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The most curated directory of AI tools on the internet. Find the perfect tool for writing, coding, design, video and more.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm"
              >
                𝕏
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm"
              >
                📸
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Explore</p>
            <div className="flex flex-col gap-3">
              <Link href="/tools" className="text-gray-500 hover:text-white text-sm transition-colors">All Tools</Link>
              <Link href="/categories" className="text-gray-500 hover:text-white text-sm transition-colors">Categories</Link>
              <Link href="/blog" className="text-gray-500 hover:text-white text-sm transition-colors">Blog</Link>
              <Link href="/category/writing" className="text-gray-500 hover:text-white text-sm transition-colors">Writing Tools</Link>
              <Link href="/category/coding" className="text-gray-500 hover:text-white text-sm transition-colors">Coding Tools</Link>
              <Link href="/category/image" className="text-gray-500 hover:text-white text-sm transition-colors">Image Tools</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white font-semibold text-sm mb-4">Company</p>
            <div className="flex flex-col gap-3">
              <Link href="/submit" className="text-gray-500 hover:text-white text-sm transition-colors">Submit a Tool</Link>
              <Link href="/advertise" className="text-gray-500 hover:text-white text-sm transition-colors">Advertise</Link>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-sm">
            © 2025 aishelve. All rights reserved.
          </p>
          <p className="text-gray-600 text-sm">
            Built for AI enthusiasts 🤖
          </p>
        </div>
      </div>
    </footer>
  )
}
