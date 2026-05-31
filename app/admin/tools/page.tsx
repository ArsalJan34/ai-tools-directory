'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminToolsPage() {
  const [tools, setTools] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    name: '',
    slug: '',
    tagline: '',
    description: '',
    url: '',
    affiliate_url: '',
    category_id: '',
    pricing_type: 'free',
    is_featured: false,
    is_sponsored: false,
    is_new: true,
    tags: '',
  })

  useEffect(() => {
    fetchTools()
    fetchCategories()
  }, [])

  async function fetchTools() {
    const { data } = await supabase
      .from('tools')
      .select('*, categories(name)')
      .order('created_at', { ascending: false })
    setTools(data || [])
    setLoading(false)
  }

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    setCategories(data || [])
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const target = e.target as HTMLInputElement
    const value =
      target.type === 'checkbox' ? target.checked : target.value
    setForm({ ...form, [target.name]: value })
  }

  function generateSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.value
    setForm({ ...form, name, slug: generateSlug(name) })
  }

  async function handleSave() {
    if (!form.name || !form.url) {
      setMessage('Name and URL are required.')
      return
    }

    setSaving(true)
    setMessage('')

    const tagsArray = form.tags
      ? form.tags.split(',').map((t) => t.trim()).filter(Boolean)
      : []

    const { error } = await supabase.from('tools').insert([
      {
        name: form.name,
        slug: form.slug,
        tagline: form.tagline,
        description: form.description,
        url: form.url,
        affiliate_url: form.affiliate_url || form.url,
        category_id: form.category_id || null,
        pricing_type: form.pricing_type,
        is_featured: form.is_featured,
        is_sponsored: form.is_sponsored,
        is_new: form.is_new,
        tags: tagsArray,
      },
    ])

    setSaving(false)

    if (error) {
      setMessage('Error saving tool: ' + error.message)
      return
    }

    setMessage('Tool added successfully!')
    setShowForm(false)
    setForm({
      name: '',
      slug: '',
      tagline: '',
      description: '',
      url: '',
      affiliate_url: '',
      category_id: '',
      pricing_type: 'free',
      is_featured: false,
      is_sponsored: false,
      is_new: true,
      tags: '',
    })
    fetchTools()
  }

  async function deleteTool(id: string) {
    if (!confirm('Are you sure you want to delete this tool?')) return
    await supabase.from('tools').delete().eq('id', id)
    fetchTools()
  }

  async function toggleFeatured(id: string, current: boolean) {
    await supabase
      .from('tools')
      .update({ is_featured: !current })
      .eq('id', id)
    fetchTools()
  }

  async function toggleSponsored(id: string, current: boolean) {
    await supabase
      .from('tools')
      .update({ is_sponsored: !current })
      .eq('id', id)
    fetchTools()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Tools</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl font-medium transition"
        >
          {showForm ? 'Cancel' : '+ Add New Tool'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-6 px-4 py-3 rounded-xl text-sm border ${
            message.includes('Error')
              ? 'bg-red-500/20 border-red-500/30 text-red-400'
              : 'bg-green-500/20 border-green-500/30 text-green-400'
          }`}
        >
          {message}
        </div>
      )}

      {/* Add Tool Form */}
      {showForm && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-10">
          <h2 className="text-xl font-bold text-white mb-6">Add New Tool</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Tool Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleNameChange}
                placeholder="e.g. ChatGPT"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Slug (auto-generated)
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="e.g. chatgpt"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Website URL *
              </label>
              <input
                type="url"
                name="url"
                value={form.url}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Affiliate URL (leave empty to use Website URL)
              </label>
              <input
                type="url"
                name="affiliate_url"
                value={form.affiliate_url}
                onChange={handleChange}
                placeholder="https://example.com/?ref=yoursite"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                value={form.tagline}
                onChange={handleChange}
                placeholder="Short one-line description"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-2">
                Full Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Detailed description of the tool"
                rows={3}
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition resize-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Category
              </label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              >
                <option value="">Select category</option>
                {categories.map((cat: any) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Pricing Type
              </label>
              <select
                name="pricing_type"
                value={form.pricing_type}
                onChange={handleChange}
                className="w-full bg-white/10 border border-white/20 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              >
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-400 text-sm mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="writing, ai, content, marketing"
                className="w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={form.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-gray-400 text-sm">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_sponsored"
                  checked={form.is_sponsored}
                  onChange={handleChange}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-gray-400 text-sm">Sponsored</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_new"
                  checked={form.is_new}
                  onChange={handleChange}
                  className="w-4 h-4 accent-purple-500"
                />
                <span className="text-gray-400 text-sm">Mark as New</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-8 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition"
          >
            {saving ? 'Saving...' : 'Save Tool →'}
          </button>
        </div>
      )}

      {/* Tools Table */}
      {loading ? (
        <p className="text-gray-500">Loading tools...</p>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Tool
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Category
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Pricing
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Status
                </th>
                <th className="text-left text-gray-400 text-sm font-medium px-6 py-4">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tools.map((tool: any) => (
                <tr
                  key={tool.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{tool.name}</p>
                    <p className="text-gray-500 text-xs truncate max-w-xs">
                      {tool.tagline}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {tool.categories?.name || '—'}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-md capitalize">
                      {tool.pricing_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {tool.is_featured && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded-full">
                          Featured
                        </span>
                      )}
                      {tool.is_sponsored && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full">
                          Sponsored
                        </span>
                      )}
                      {tool.is_new && (
                        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          toggleFeatured(tool.id, tool.is_featured)
                        }
                        className="text-xs bg-yellow-500/20 hover:bg-yellow-500/40 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-lg transition"
                      >
                        {tool.is_featured ? 'Unfeature' : 'Feature'}
                      </button>
                      <button
                        onClick={() =>
                          toggleSponsored(tool.id, tool.is_sponsored)
                        }
                        className="text-xs bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 border border-blue-500/30 px-2 py-1 rounded-lg transition"
                      >
                        {tool.is_sponsored ? 'Unsponsored' : 'Sponsor'}
                      </button>
                      <button
                        onClick={() => deleteTool(tool.id)}
                        className="text-xs bg-red-500/20 hover:bg-red-500/40 text-red-400 border border-red-500/30 px-2 py-1 rounded-lg transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
