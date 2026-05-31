import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `Best ${category.name} AI Tools`,
    description: `Browse the best ${category.name} AI tools. ${category.description}. Find free and paid options.`,
  }
}

async function getCategory(slug: string) {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

async function getToolsByCategory(categoryId: string) {
  const { data } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', categoryId)
    .order('created_at', { ascending: false })
  return data || []
}

async function getAllCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  return data || []
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string }
}) {
  const category = await getCategory(params.slug)

  if (!category) {
    notFound()
  }

  const tools = await getToolsByCategory(category.id)
  const allCategories = await getAllCategories()

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto">

      {/* Back Button */}
      <Link
        href="/tools"
        className="text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition"
      >
        ← Back to all tools
      </Link>

      {/* Category Header */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-4 mb-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-purple-600/30 rounded-2xl flex items-center justify-center text-4xl">
            {category.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {category.name} AI Tools
            </h1>
            <p className="text-gray-400">{category.description}</p>
            <p className="text-purple-400 text-sm mt-2">
              {tools.length} tools available
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5 sticky top-24">
            <p className="text-white font-semibold mb-4">All Categories</p>
            <div className="flex flex-col gap-2">
              <Link
                href="/tools"
                className="text-sm text-gray-400 hover:text-white transition py-1"
              >
                All Tools
              </Link>
              {allCategories.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`text-sm transition py-1 flex items-center gap-2 ${
                    cat.slug === params.slug
                      ? 'text-purple-400 font-medium'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Tools Grid */}
        <div className="flex-1">
          {tools.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🔍</p>
              <p className="text-gray-400 text-lg">
                No tools in this category yet.
              </p>
              <Link
                href="/submit"
                className="mt-6 inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Submit the first one →
              </Link>
            </div>
          ) : (
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
          )}
        </div>

      </div>
    </main>
  )
}
