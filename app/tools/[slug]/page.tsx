import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { notFound } from 'next/navigation'

async function getTool(slug: string) {
  const { data } = await supabase
    .from('tools')
    .select('*, categories(name, slug, icon)')
    .eq('slug', slug)
    .single()
  return data
}

async function getRelatedTools(categoryId: string, currentSlug: string) {
  const { data } = await supabase
    .from('tools')
    .select('*')
    .eq('category_id', categoryId)
    .neq('slug', currentSlug)
    .limit(3)
  return data || []
}

export default async function ToolDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const tool = await getTool(params.slug)

  if (!tool) {
    notFound()
  }

  const relatedTools = tool.category_id
    ? await getRelatedTools(tool.category_id, params.slug)
    : []

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto">

      {/* Back Button */}
      <Link
        href="/tools"
        className="text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition"
      >
        ← Back to all tools
      </Link>

      {/* Tool Header */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mt-4 mb-8">
        <div className="flex flex-col md:flex-row md:items-start gap-6">

          {/* Logo */}
          <div className="w-20 h-20 bg-purple-600/30 rounded-2xl flex items-center justify-center text-4xl shrink-0">
            🤖
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
              {tool.is_new && (
                <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full">
                  New
                </span>
              )}
              {tool.is_featured && (
                <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-3 py-1 rounded-full">
                  Featured
                </span>
              )}
              {tool.is_sponsored && (
                <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full">
                  Sponsored
                </span>
              )}
            </div>

            <p className="text-gray-300 text-lg mb-4">{tool.tagline}</p>

            <div className="flex flex-wrap gap-3 mb-4">
              {tool.categories && (
                <Link
                  href={`/category/${tool.categories.slug}`}
                  className="text-sm bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full hover:bg-purple-600/30 transition"
                >
                  {tool.categories.icon} {tool.categories.name}
                </Link>
              )}
              <span className="text-sm bg-white/10 text-gray-300 border border-white/10 px-3 py-1 rounded-full capitalize">
                {tool.pricing_type}
              </span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {tool.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs bg-white/10 text-gray-400 px-2 py-1 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Visit Button */}
          <div className="shrink-0">
           <a
              href={tool.affiliate_url || tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition text-center"
            >
              Visit Tool →
            </a>
            <p className="text-gray-600 text-xs text-center mt-2">
              Opens in new tab
            </p>
          </div>

        </div>
      </div>

      {/* Description */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-4">About {tool.name}</h2>
        <p className="text-gray-400 leading-relaxed">
          {tool.description || tool.tagline}
        </p>
      </div>

      {/* Tool Details */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Tool Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm">Pricing</span>
            <span className="text-white capitalize">{tool.pricing_type}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm">Category</span>
            <span className="text-white">
              {tool.categories ? `${tool.categories.icon} ${tool.categories.name}` : 'General'}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm">Website</span>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition truncate"
            >
              {tool.url}
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm">Added</span>
            <span className="text-white">
              {new Date(tool.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedTools.map((related: any) => (
              <Link
                key={related.id}
                href={`/tools/${related.slug}`}
                className="bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-xl p-5 transition hover:bg-white/8 block"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-600/30 rounded-lg flex items-center justify-center text-lg">
                    🤖
                  </div>
                  <div>
                    <p className="text-white font-medium">{related.name}</p>
                    <p className="text-gray-500 text-xs capitalize">{related.pricing_type}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2">{related.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-3">
          Know a better tool?
        </h3>
        <p className="text-gray-400 mb-6">
          Submit it to our directory and reach thousands of users.
        </p>
        <Link
          href="/submit"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition inline-block"
        >
          Submit a Tool →
        </Link>
      </div>

    </main>
  )
}
