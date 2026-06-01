import Link from 'next/link'
import { supabase } from '../lib/supabase'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All AI Tools',
  description: 'Browse our complete directory of AI tools. Filter by category, pricing, and more.',
}

async function getTools() {
  const { data } = await supabase
    .from('tools')
    .select('*, categories(name, slug, icon)')
    .order('created_at', { ascending: false })
  return data || []
}

async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  return data || []
}

const pricingBadge: Record<string, string> = {
  free: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  freemium: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  paid: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
}

export default async function ToolsPage() {
  const tools = await getTools()
  const categories = await getCategories()

  return (
    <main className="min-h-screen px-4 py-12 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">Directory</p>
        <h1 className="text-4xl font-extrabold text-white mb-3">All AI Tools</h1>
        <p className="text-gray-400 text-lg">
          Browsing <span className="text-white font-semibold">{tools.length} tools</span> across all categories
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="glass-card rounded-2xl p-5 sticky top-24">
            <p className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Categories</p>
            <div className="flex flex-col gap-1">
              <Link
                href="/tools"
                className="text-sm text-violet-400 font-semibold hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/5 flex items-center justify-between"
              >
                <span>All Tools</span>
                <span className="text-xs bg-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">{tools.length}</span>
              </Link>
              {categories.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/5 flex items-center gap-2"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Pricing</p>
              <div className="flex flex-col gap-1">
                {['free', 'freemium', 'paid'].map((type) => (
                  <Link
                    key={type}
                    href={`/tools?pricing=${type}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors py-2 px-3 rounded-xl hover:bg-white/5 capitalize flex items-center gap-2"
                  >
                    <span className={`w-2 h-2 rounded-full ${
                      type === 'free' ? 'bg-emerald-400' :
                      type === 'freemium' ? 'bg-blue-400' : 'bg-orange-400'
                    }`} />
                    {type}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {tools.map((tool: any) => (
              <div
                key={tool.id}
                className="glass-card glow-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/30 to-blue-600/30 border border-white/10 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                      🤖
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{tool.name}</h3>
                      {tool.categories && (
                        <Link
                          href={`/category/${tool.categories.slug}`}
                          className="text-xs text-violet-400 hover:text-violet-300 transition-colors"
                        >
                          {tool.categories.icon} {tool.categories.name}
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${pricingBadge[tool.pricing_type] || pricingBadge.free}`}>
                      {tool.pricing_type}
                    </span>
                    {tool.is_new && (
                      <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full">New ✨</span>
                    )}
                    {tool.is_featured && (
                      <span className="text-xs bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 px-2 py-0.5 rounded-full">⭐ Featured</span>
                    )}
                    {tool.is_sponsored && (
                      <span className="text-xs bg-blue-500/15 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded-full">Sponsored</span>
                    )}
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                  {tool.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tool.tags?.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="text-xs bg-white/5 border border-white/8 text-gray-500 px-2.5 py-1 rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-auto pt-2 border-t border-white/5">
                  <Link
                    href={`/api/click/${tool.id}`}
                    target="_blank"
                    className="flex-1 text-center bg-gradient-to-r from-violet-600/20 to-blue-600/20 hover:from-violet-600 hover:to-blue-600 border border-violet-500/30 hover:border-transparent text-violet-300 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                  >
                    Visit Site →
                  </Link>
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="px-4 bg-white/5 hover:bg-white/10 border border-white/8 text-gray-400 hover:text-white py-2.5 rounded-xl text-sm font-medium transition-all"
                  >
                    Info
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {tools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-gray-500 text-lg">No tools found.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
