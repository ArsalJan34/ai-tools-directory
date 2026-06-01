import Link from 'next/link'
import { supabase } from './lib/supabase'
import SearchBar from './components/SearchBar'

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

export default async function Home() {
  const featuredTools = await getFeaturedTools()
  const newTools = await getNewTools()
  const categories = await getCategories()
  const totalCount = await getTotalToolCount()

  return (
    <main className="min-h-screen bg-[#080810]">

      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 text-center">
        {/* Background glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm px-5 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {totalCount}+ AI Tools — Updated Daily
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
            Find The Perfect
            <span className="block bg-gradient-to-r from-violet-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
              AI Tool For You
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Browse our curated directory of AI tools for writing, coding, image generation, video, audio and more.
          </p>

          {/* Search */}
          <SearchBar />

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-10">
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
            <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-2">Browse</p>
            <h2 className="text-3xl font-extrabold text-white">By Category</h2>
          </div>
          <Link href="/categories" className="text-gray-500 hover:text-white text-sm transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.08] hover:border-violet-500/40 rounded-2xl p-5 transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <p className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">
                {cat.name}
              </p>
              <p className="text-gray-600 text-xs mt-1 line-clamp-1">
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
            <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-2">Handpicked</p>
            <h2 className="text-3xl font-extrabold text-white">⭐ Featured Tools</h2>
          </div>
          <Link href="/tools" className="text-gray-500 hover:text-white text-sm transition-colors">
            View all →
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
            <p className="text-violet-400 text-xs font-bold uppercase tracking-widest mb-2">Recently Added</p>
            <h2 className="text-3xl font-extrabold text-white">🆕 New Tools</h2>
          </div>
          <Link href="/tools" className="text-gray-500 hover:text-white text-sm transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {newTools.map((tool: any) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 p-12 text-center bg-gradient-to-br from-violet-950/80 via-[#080810] to-blue-950/80">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Know a great AI tool?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              Submit it to our directory and get discovered by thousands of AI enthusiasts every day.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/submit"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl text-sm"
              >
                Submit a Tool →
              </Link>
              <Link
                href="/advertise"
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white px-8 py-3 rounded-2xl font-semibold transition-all text-sm"
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
    free: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    freemium: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    paid: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
  }

  return (
    <div className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-violet-500/40 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-500/10 flex flex-col group">

      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {tool.logo_url ? (
            <img src={tool.logo_url} alt={tool.name} className="w-11 h-11 rounded-xl object-contain bg-white p-1" />
          ) : (
            <img src={`https://www.google.com/s2/favicons?domain=${tool.url ? new URL(tool.url).hostname : 'example.com'}&sz=64`} alt={tool.name} className="w-11 h-11 rounded-xl object-cover bg-white/10" />
          )}
          <div>
            <h3 className="text-white font-bold text-sm leading-tight">{tool.name}</h3>
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
        <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${pricingBadge[tool.pricing_type] || pricingBadge.free}`}>
            {tool.pricing_type}
          </span>
          {tool.is_new && (
            <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              New ✨
            </span>
          )}
          {tool.is_featured && (
            <span className="text-xs bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-2 py-0.5 rounded-full">
              ⭐ Featured
            </span>
          )}
          {tool.is_sponsored && (
            <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
              Sponsored
            </span>
          )}
        </div>
      </div>

      {/* Tagline */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
        {tool.tagline}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tool.tags?.slice(0, 3).map((tag: string) => (
          <span
            key={tag}
            className="text-xs bg-white/5 border border-white/5 text-gray-500 px-2.5 py-1 rounded-lg"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex gap-2 mt-auto pt-3 border-t border-white/5">
        <Link
          href={`/api/click/${tool.id}`}
          target="_blank"
          className="flex-1 text-center bg-violet-600/10 hover:bg-gradient-to-r hover:from-violet-600 hover:to-blue-600 border border-violet-500/20 hover:border-transparent text-violet-400 hover:text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
        >
          Visit Site →
        </Link>
        <Link
          href={`/tools/${tool.slug}`}
          className="px-4 bg-white/5 hover:bg-white/10 border border-white/5 text-gray-500 hover:text-white py-2.5 rounded-xl text-sm font-medium transition-all"
        >
          Info
        </Link>
      </div>
    </div>
  )
}
