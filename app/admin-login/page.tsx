'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin() {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin')
      router.refresh()
    } else {
      setError('Wrong password. Try again.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#080810] flex items-center justify-center px-4">
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-10 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-white/40 text-sm mt-1">AIShelve admin panel</p>
        </div>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          className="w-full bg-white/5 border border-white/10 focus:border-violet-500 text-white placeholder-white/20 px-4 py-3 rounded-xl focus:outline-none transition-all text-sm mb-4"
        />
        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login →'}
        </button>
      </div>
    </main>
  )
}
