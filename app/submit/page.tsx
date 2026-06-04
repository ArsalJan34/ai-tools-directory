'use client'
import { useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function SubmitPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    email: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit() {
    setError('')
    if (!form.name || !form.url) {
      setError('Tool name and URL are required.')
      return
    }
    setLoading(true)
    const { error: supabaseError } = await supabase
      .from('submissions')
      .insert([{ name: form.name, url: form.url, description: form.description, email: form.email, status: 'pending' }])
    setLoading(false)
    if (supabaseError) {
      setError('Something went wrong. Please try again.')
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-14 text-center max-w-lg w-full">
          <div className="text-7xl mb-6 inline-block" style={{ animation: 'float 4s ease-in-out infinite' }}>🎉</div>
          <h1 className="text-3xl font-extrabold text-white mb-4">Tool Submitted!</h1>
          <p className="text-gray-400 mb-8 leading-relaxed">
            Thank you! We will review your tool and add it to the directory within 24–48 hours.
          </p>
          <Link href="/" className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 inline-block">
            Back to Home
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-12 max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3">Free Submission</p>
        <h1 className="text-4xl font-extrabold text-white mb-4">Submit an AI Tool</h1>
        <p className="text-gray-400 text-lg">
          Know a great AI tool? Submit it and get discovered by thousands of users for free.
        </p>
      </div>

      <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8">
        <div className="mb-6">
          <label className="block text-white font-semibold mb-2 text-sm">
            Tool Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. ChatGPT"
            className="w-full bg-white/5 border border-white/10 focus:border-violet-500 text-white placeholder-gray-600 px-4 py-3 rounded-2xl focus:outline-none transition-all text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2 text-sm">
            Tool URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://yourtool.com"
            className="w-full bg-white/5 border border-white/10 focus:border-violet-500 text-white placeholder-gray-600 px-4 py-3 rounded-2xl focus:outline-none transition-all text-sm"
          />
        </div>

        <div className="mb-6">
          <label className="block text-white font-semibold mb-2 text-sm">
            Short Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What does this tool do? Who is it for?"
            rows={4}
            className="w-full bg-white/5 border border-white/10 focus:border-violet-500 text-white placeholder-gray-600 px-4 py-3 rounded-2xl focus:outline-none transition-all resize-none text-sm"
          />
        </div>

        <div className="mb-8">
          <label className="block text-white font-semibold mb-2 text-sm">
            Your Email <span className="text-gray-600 font-normal">(optional)</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-white/5 border border-white/10 focus:border-violet-500 text-white placeholder-gray-600 px-4 py-3 rounded-2xl focus:outline-none transition-all text-sm"
          />
        </div>

        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] shadow-lg shadow-violet-500/25"
        >
          {loading ? 'Submitting...' : 'Submit Tool →'}
        </button>

        <p className="text-gray-600 text-xs text-center mt-4">
          Free submissions are reviewed within 48 hours.
        </p>
      </div>
    </main>
  )
}
