'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="border-b border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-white">
          🤖 <span className="text-purple-400">AI</span>Tools
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/tools" className="text-gray-400 hover:text-white transition">
            All Tools
          </Link>
          <Link href="/categories" className="text-gray-400 hover:text-white transition">
            Categories
          </Link>
          <Link href="/blog" className="text-gray-400 hover:text-white transition">
            Blog
          </Link>
          <Link href="/submit" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
            Submit a Tool
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-400"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link href="/tools" className="text-gray-400 hover:text-white">All Tools</Link>
          <Link href="/categories" className="text-gray-400 hover:text-white">Categories</Link>
          <Link href="/blog" className="text-gray-400 hover:text-white">Blog</Link>
          <Link href="/submit" className="text-purple-400 hover:text-white">Submit a Tool</Link>
        </div>
      )}
    </nav>
  )
}
