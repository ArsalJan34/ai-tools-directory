import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { notFound } from 'next/navigation'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: category } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!category) {
    notFound()
  }

  const { data: tools } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', category.id)
    .order('created_at', { ascending: false })

  const { data: allCategories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  const toolsList = tools || []
  const allCategoriesList = allCategories || []

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto">

      <Link
        href="/tools"
        className="text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition"
      >
        ← Back to all tools
      </Link>

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
              {toolsList.length} tools available
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">

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
              {allCategoriesList.map((cat: any) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  className={`text-sm transition py-1 flex items-center gap-2 ${
                    cat.slug === slug
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

        <div className="flex-1">
          {toolsList.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">Search</p>
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
              {toolsList.map((tool: any) => (
                <div
                  key={tool.id}
                  className="bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-xl p-5 transition hover:bg-white/8 flex flex-col"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {tool.logo_url ? (
  <img src={tool.logo_url} alt={tool.name} className="w-10 h-10 rounded-lg object-contain bg-white p-1" />
) : (
  <img src={`https://www.google.com/s2/favicons?domain=${tool.url ? new URL(tool.url).hostname : 'example.com'}&sz=64`} alt={tool.name} className="w-10 h-10 rounded-lg object-cover bg-white/10" />
)}
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

                  <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">
                    {tool.tagline}
                  </p>

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
