'use client'
import { useState } from 'react'
import { supabase } from '../lib/supabase'

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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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
      .insert([
        {
          name: form.name,
          url: form.url,
          description: form.description,
          email: form.email,
          status: 'pending',
        },
      ])

    setLoading(false)

    if (supabaseError) {
      setError('Something went wrong. Please try again.')
      return
    }

    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="min-h-screen px-4 py-20 max-w-2xl mx-auto text-center">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12">
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Tool Submitted!
          </h1>
          <p className="text-gray-400 mb-8">
            Thank you for submitting. We will review your tool and add it to the
            directory within 24–48 hours.
          </p>
          <a
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition inline-block"
          >
            Back to Home
          </a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-4 py-12 max-w-2xl mx-auto">

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">
          Submit an AI Tool
        </h1>
        <p className="text-gray-400 text-lg">
          Know a great AI tool? Submit it and get discovered by thousands of
          users for free.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

        {/* Tool Name */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Tool Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. ChatGPT"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Tool URL */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Tool URL <span className="text-red-400">*</span>
          </label>
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="e.g. https://yourtool.com"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-white font-medium mb-2">
            Short Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What does this tool do? Who is it for?"
            rows={4}
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition resize-none"
          />
        </div>

        {/* Email */}
        <div className="mb-8">
          <label className="block text-white font-medium mb-2">
            Your Email{' '}
            <span className="text-gray-500 font-normal text-sm">
              (optional, for updates)
            </span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white py-3 rounded-xl font-medium transition"
        >
          {loading ? 'Submitting...' : 'Submit Tool →'}
        </button>

        <p className="text-gray-500 text-sm text-center mt-4">
          Free submissions are reviewed within 48 hours.
        </p>
      </div>

    </main>
  )
}
