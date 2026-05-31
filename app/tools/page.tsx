import Link from 'next/link'
import { supabase } from '../lib/supabase'

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

export default async function ToolsPage() {
  const tools = await getTools()
  const categories = await getCategories()

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">All AI Tools</h1>
        <p className="text-gray-400 text-lg">
          Browse {tools.length} AI tools across all categories
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar Filters */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 sticky top-24">
            <p className="text-white font-semibold mb-4">Categories</p>
            <div className="flex flex-col gap-2">
              <Link
                href="/tools"
                className="text-sm text-purple-400 hover:text-white transition py-1"
              >
                All Tools ({tools.length})
              </Link>
              {categories.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className="text-sm text-gray-400 hover:text-white transition py-1 flex items-center gap-2"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="text-white font-semibold mb-4">Pricing</p>
              <div className="flex flex-col gap-2">
                {['free', 'freemium', 'paid'].map((type) => (
                  <Link
                    key={type}
                    href={`/tools?pricing=${type}`}
                    className="text-sm text-gray-400 hover:text-white transition py-1 capitalize"
                  >
                    {type}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Tools Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool: any) => (
              <div
                key={tool.id}
                className="bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-xl p-5 transition hover:bg-white/8 flex flex-col"
              >
                {/* Tool Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center text-lg shrink-0">
                      🤖
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{tool.name}</h3>
                      <span className="text-xs text-gray-500 capitalize">
                        {tool.pricing_type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {tool.is_new && (
                      <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
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
                  </div>
                </div>

                {/* Category */}
                {tool.categories && (
                  <Link
                    href={`/category/${tool.categories.slug}`}
                    className="text-xs text-purple-400 hover:text-purple-300 mb-2 inline-block"
                  >
                    {tool.categories.icon} {tool.categories.name}
                  </Link>
                )}

                {/* Tagline */}
                <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                  {tool.tagline}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.tags?.slice(0, 3).map((tag: string) => (
                    <span
                      key={tag}
                      className="text-xs bg-white/10 text-gray-400 px-2 py-0.5 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
<div className="flex gap-2 mt-auto">
  <Link
    href={`/api/click/${tool.id}`}
    target="_blank"
    className="flex-1 text-center bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 hover:border-purple-500 text-purple-300 hover:text-white py-2 rounded-lg text-sm font-medium transition"
  >
    Visit →
  </Link>
  <Link
    href={`/tools/${tool.slug}`}
    className="flex-1 text-center bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white py-2 rounded-lg text-sm font-medium transition"
  >
    Details
  </Link>
</div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {tools.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No tools found.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  )
}
