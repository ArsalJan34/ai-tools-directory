import Link from 'next/link'
import { supabase } from '../../lib/supabase'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = await getTool(slug)
  if (!tool) return { title: 'Tool Not Found' }
  return {
    title: `${tool.name} - ${tool.tagline}`,
    description: tool.description || tool.tagline,
  }
}

const pricingBadge: Record<string, string> = {
  free: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
  freemium: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
  paid: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
}

export default async function ToolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = await getTool(slug)

  if (!tool) notFound()

  const relatedTools = tool.category_id
    ? await getRelatedTools(tool.category_id, slug)
    : []

  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto">

      <Link
        href="/tools"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-white text-sm mb-8 transition-colors group"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span>
        Back to all tools
      </Link>

      {/* Tool Header */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
         {tool.logo_url ? (
  <img src={tool.logo_url} alt={tool.name} className="w-20 h-20 rounded-2xl object-contain bg-white p-2 shrink-0" />
) : (
  <img src={`https://www.google.com/s2/favicons?domain=${tool.url ? new URL(tool.url).hostname : 'example.com'}&sz=128`} alt={tool.name} className="w-20 h-20 rounded-2xl object-cover bg-white/10 shrink-0" />
)}

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl font-extrabold text-white">{tool.name}</h1>
              <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize border ${pricingBadge[tool.pricing_type] || pricingBadge.free}`}>
                {tool.pricing_type}
              </span>
              {tool.is_new && (
                <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 px-3 py-1 rounded-full">New </span>
              )}
              {tool.is_featured && (
                <span className="text-xs bg-yellow-500/15 text-yellow-400 border border-yellow-500/25 px-3 py-1 rounded-full"> Featured</span>
              )}
              {tool.is_sponsored && (
                <span className="text-xs bg-blue-500/15 text-blue-400 border border-blue-500/25 px-3 py-1 rounded-full">Sponsored</span>
              )}
            </div>

            <p className="text-gray-300 text-lg mb-4 leading-relaxed">{tool.tagline}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {tool.categories && (
                <Link
                  href={`/category/${tool.categories.slug}`}
                  className="text-sm bg-violet-500/10 text-violet-300 border border-violet-500/20 px-3 py-1.5 rounded-xl hover:bg-violet-500/20 transition-colors"
                >
                  {tool.categories.icon} {tool.categories.name}
                </Link>
              )}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tool.tags?.map((tag: string) => (
                <span key={tag} className="text-xs bg-white/5 border border-white/[0.08] text-gray-500 px-2.5 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href={`/api/click/${tool.id}`}
              target="_blank"
              className="block bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 text-center whitespace-nowrap"
            >
              Visit Site →
            </Link>
            <p className="text-gray-600 text-xs text-center mt-2">Opens in new tab</p>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">About {tool.name}</h2>
        <p className="text-gray-400 leading-relaxed text-sm">
          {tool.description || tool.tagline}
        </p>
      </div>

      {/* Details */}
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">Tool Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Pricing', value: tool.pricing_type, capitalize: true },
            { label: 'Category', value: tool.categories ? `${tool.categories.icon} ${tool.categories.name}` : 'General' },
            { label: 'Added', value: new Date(tool.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
          ].map((item) => (
            <div key={item.label} className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
              <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">{item.label}</p>
              <p className={`text-white font-semibold ${item.capitalize ? 'capitalize' : ''}`}>{item.value}</p>
            </div>
          ))}
          <div className="bg-white/[0.03] rounded-2xl p-4 border border-white/5">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Website</p>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 hover:text-violet-300 transition-colors text-sm font-semibold truncate block"
            >
              {tool.url}
            </a>
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
                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-violet-500/40 rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] block"
              >
                <div className="flex items-center gap-3 mb-3">
                 {related.logo_url ? (
  <img src={related.logo_url} alt={related.name} className="w-10 h-10 rounded-xl object-contain bg-white p-1" />
) : (
  <img src={`https://www.google.com/s2/favicons?domain=${related.url ? new URL(related.url).hostname : 'example.com'}&sz=64`} alt={related.name} className="w-10 h-10 rounded-xl object-cover bg-white/10" />
)}
                  <div>
                    <p className="text-white font-bold text-sm">{related.name}</p>
                    <p className="text-gray-500 text-xs capitalize">{related.pricing_type}</p>
                  </div>
                </div>
                <p className="text-gray-400 text-xs line-clamp-2">{related.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-900/60 to-blue-900/60 border border-violet-500/20 p-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-blue-600/10 pointer-events-none" />
        <h3 className="text-xl font-bold text-white mb-3 relative">Know a better tool?</h3>
        <p className="text-gray-400 mb-6 relative">Submit it and reach thousands of users daily.</p>
        <Link
          href="/submit"
          className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 inline-block relative"
        >
          Submit a Tool →
        </Link>
      </div>

    </main>
  )
}
