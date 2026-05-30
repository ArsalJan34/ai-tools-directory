import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">

        <div>
          <p className="text-xl font-bold text-white">
            🤖 <span className="text-purple-400">AI</span>Tools
          </p>
          <p className="text-gray-500 text-sm mt-2">
            The best AI tools directory on the internet.
          </p>
        </div>

        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-white font-medium text-sm">Explore</p>
            <Link href="/tools" className="text-gray-500 hover:text-white text-sm">All Tools</Link>
            <Link href="/categories" className="text-gray-500 hover:text-white text-sm">Categories</Link>
            <Link href="/blog" className="text-gray-500 hover:text-white text-sm">Blog</Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white font-medium text-sm">More</p>
            <Link href="/submit" className="text-gray-500 hover:text-white text-sm">Submit Tool</Link>
            <Link href="/advertise" className="text-gray-500 hover:text-white text-sm">Advertise</Link>
          </div>
        </div>

      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10">
        <p className="text-gray-600 text-sm">© 2025 AITools Directory. All rights reserved.</p>
      </div>
    </footer>
  )
}
