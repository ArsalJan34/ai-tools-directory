'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
export const dynamic = 'force-dynamic'
export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/tools?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-3 max-w-2xl mx-auto mb-14">
      <div className="flex-1 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search AI tools..."
          className="w-full bg-white/5 border border-white/10 hover:border-violet-500/50 focus:border-violet-500 text-white placeholder-gray-600 pl-11 pr-4 py-4 rounded-2xl focus:outline-none transition-all text-sm"
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 whitespace-nowrap text-sm"
      >
        Search →
      </button>
    </form>
  )
}
