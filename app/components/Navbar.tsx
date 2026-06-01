'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#080810]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm font-bold shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all">
            AI
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            ai<span className="text-violet-400">shelve</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/tools" className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">
            All Tools
          </Link>
          <Link href="/categories" className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">
            Categories
          </Link>
          <Link href="/blog" className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">
            Blog
          </Link>
          <Link href="/advertise" className="text-gray-400 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">
            Advertise
          </Link>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/submit"
            className="relative group bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-5 py-2 rounded-xl transition-all text-sm font-semibold shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105"
          >
            + Submit Tool
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-2 bg-[#080810]/95 backdrop-blur-xl border-t border-white/5">
          <Link href="/tools" className="text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-all text-sm">All Tools</Link>
          <Link href="/categories" className="text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-all text-sm">Categories</Link>
          <Link href="/blog" className="text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-all text-sm">Blog</Link>
          <Link href="/advertise" className="text-gray-400 hover:text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-all text-sm">Advertise</Link>
          <Link href="/submit" className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 py-3 rounded-lg text-sm font-semibold text-center mt-2">+ Submit Tool</Link>
        </div>
      )}
    </nav>
  )
}
