import Link from 'next/link'
import { supabase } from './lib/supabase'

async function getTools() {
  const { data } = await supabase
    .from('tools')
    .select('*')
    .eq('is_featured', true)
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

export default async function Home() {
  const tools = await getTools()
  const categories = await getCategories()

  return (
    <main className="min-h-screen">

      {/* Hero Section */}
      <section className="px-4 pt-20 pb-16 text-center max-w-4xl mx-auto">
        <div className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-300 text-sm px-4 py-1 rounded-full mb-6">
          🚀 500+ AI Tools and growing
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Find The Best
          <span className="text-purple-400"> AI Tools </span>
          For Anything
        </h1>
        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Browse our curated directory of AI tools for writing, coding, image generation, video, and more. Updated daily.
        </p>

        {/* Search Bar */}
        <div className="flex gap-3 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search AI tools..."
            className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-5 py-3 rounded-xl focus:outline-none focus:border-purple-500 transition"
          />
          <Link
            href="/tools"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Search
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-white mb-8">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl p-5 transition group"
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <p className="text-white font-medium group-hover:text-purple-300 transition">
                {cat.name}
              </p>
              <p className="text-gray-500 text-sm mt-1">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">⭐ Featured Tools</h2>
          <Link href="/tools" className="text-purple-400 hover:text-purple-300 text-sm transition">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool: any) => (
            <div
              key={tool.id}
              className="bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-xl p-5 transition hover:bg-white/8 group"
            >
              {/* Tool Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center text-lg">
                    🤖
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">{tool.name}</h3>
                    <span className="text-xs text-gray-500 capitalize">{tool.pricing_type}</span>
                  </div>
                </div>
                {tool.is_new && (
                  <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>

              {/* Tagline */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {tool.tagline}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tool.tags?.slice(0, 3).map((tag: string) => (
                  <span key={tag} className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

             {/* Visit Button */}
<Link
  href={`/api/click/${tool.id}`}
  target="_blank"
  className="block w-full text-center bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white py-2 rounded-lg text-sm font-medium transition"
>
  Visit Tool →
</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Know a great AI tool?
          </h2>
          <p className="text-gray-400 mb-8">
            Submit it to our directory and get discovered by thousands of users.
          </p>
          <Link
            href="/submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition inline-block"
          >
            Submit a Tool →
          </Link>
        </div>
      </section>

    </main>
  )
}
