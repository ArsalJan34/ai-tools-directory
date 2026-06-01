import Link from 'next/link'
import { supabase } from './lib/supabase'

async function getFeaturedTools() {
  const { data } = await supabase
    .from('tools')
    .select('*, categories(name, slug, icon)')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })
    .limit(6)
  return data || []
}

async function getNewTools() {
  const { data } = await supabase
    .from('tools')
    .select('*, categories(name, slug, icon)')
    .eq('is_new', true)
    .order('created_at', { ascending: false })
    .limit(6)
  return data || []
}

async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .limit(8)
  return data || []
}

async function getTotalToolCount() {
  const { count } = await supabase
    .from('tools')
    .select('id', { count: 'exact' })
  return count || 0
}

const pricingColor: Record<string, string> = {
  free: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  freemium: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  paid: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
}

export default async function Home() {
  const featuredTools = await getFeaturedTools()
  const newTools = await getNewTools()
  const categories = await getCategories()
  const totalCount = await getTotalToolCount()

  return (
    <main className="min-h-screen">

      {/* Hero */}
      <section className="hero-bg grid-bg relative overflow-hidden">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {totalCount}+ AI Tools — Updated Daily
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Find The Perfect
            <span className="block gradient-text">AI Tool For You</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse our curated directory of AI tools for writing, coding, image generation, video, audio and more.
          </p>

          {/* Search */}
          <div className="flex gap-3 max-w-2xl mx-auto mb-12">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
              <input
                type="text"
                placeholder="Search 500+ AI tools..."
                className="w-full bg-white/5 border border-white/10 hover:border-white/20 focus:border-violet-500 text-white placeholder-gray-500 pl-11 pr-4 py-4 rounded-2xl focus:outline-none transition-all text-sm backdrop-blur-sm"
              />
            </div>
            <Link
              href="/tools"
              className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 whitespace-nowrap text-sm"
            >
              Browse All →
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { value: `${totalCount}+`, label: 'AI Tools' },
              { value: '8', label: 'Categories' },
              { value: '100%', label: 'Free to Browse' },
              { value: 'Daily', label: 'New Tools Added' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl font-bold text-white">By Category</h2>
          </div>
          <Link href="/categories" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
            View all <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat: any, i: number) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="glass-card glow-card rounded-2xl p-5 transition-all duration-300 group hover:scale-105 hover:-translate-y-1"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <p className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">
                {cat.name}
              </p>
              <p className="text-gray-500 text-xs mt-1 line-clamp-1">
                {cat.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">Handpicked</p>
            <h2 className="text-3xl font-bold text-white">⭐ Featured Tools</h2>
          </div>
          <Link href="/tools" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
            View all <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredTools.map((tool: any) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* New Tools */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-2">Recently Added</p>
            <h2 className="text-3xl font-bold text-white">🆕 New Tools</h2>
          </div>
          <Link href="/tools" className="text-gray-400 hover:text-white text-sm transition-colors flex items-center gap-1">
            View all <span>→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {newTools.map((tool: any) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-900/60 via-purple-900/40 to-blue-900/60 border border-violet-500/20 p-12 text-center">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Know a great AI tool?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Submit it to our directory and get discovered by thousands of AI enthusiasts every day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/submit"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl"
              >
                Submit a Tool →
              </Link>
              <Link
                href="/advertise"
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-2xl font-semibold transition-all hover:scale-105"
              >
                Advertise Here
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}

function ToolCard({ tool }: { tool: any }) {
  const pricingBadge: Record<string, string> = {
    free: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    freemium: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
    paid: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
  }

  return (
    <div className="glass-card glow-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 flex flex-col group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/30 to-blue-600/30 border border-white/10 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
            🤖
          </div>
          <div>
            <h3 className="text-white font-bold text-base">{tool.name}</h3>
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
            <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-2 py-0.5 rounded-full">
              New ✨
            </span>
          )}
          {tool.is_featured && (
            <span className="text-xs bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 px-2 py-0.5 rounded-full">
              ⭐ Featured
            </span>
          )}
          {tool.is_sponsored && (
            <span className="text-xs bg-blue-500/15 text-blue-400 border border-blue-500/25 px-2 py-0.5 rounded-full">
              Sponsored
            </span>
          )}
        </div>
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
        {tool.tagline}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.tags?.slice(0, 3).map((tag: string) => (
          <span
            key={tag}
            className="text-xs bg-white/5 border border-white/8 text-gray-500 px-2.5 py-1 rounded-lg"
          >
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
  )
}
