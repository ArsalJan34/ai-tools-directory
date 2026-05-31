import type { Metadata } from 'next'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export const metadata: Metadata = {
  title: 'AI Tools by Category',
  description:
    'Browse AI tools by category. Find the best AI tools for writing, coding, image generation, video, audio, productivity and more.',
}

async function getCategories() {
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('name')
  return data || []
}

async function getToolCountPerCategory() {
  const { data } = await supabase
    .from('tools')
    .select('category_id')
  return data || []
}

export default async function CategoriesPage() {
  const categories = await getCategories()
  const allTools = await getToolCountPerCategory()

  const countMap: Record<string, number> = {}
  allTools.forEach((t: any) => {
    if (t.category_id) {
      countMap[t.category_id] = (countMap[t.category_id] || 0) + 1
    }
  })

  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Browse by Category
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Find the best AI tools for your specific needs. Browse all categories
          below.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat: any) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition hover:bg-white/8 group flex flex-col"
          >
            <div className="text-4xl mb-4">{cat.icon}</div>
            <h2 className="text-white font-bold text-xl mb-2 group-hover:text-purple-300 transition">
              {cat.name}
            </h2>
            <p className="text-gray-400 text-sm flex-1 leading-relaxed">
              {cat.description}
            </p>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
              <span className="text-gray-500 text-sm">
                {countMap[cat.id] || 0} tools
              </span>
              <span className="text-purple-400 text-sm group-hover:text-purple-300 transition">
                Browse →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-3">
          Can't find your category?
        </h3>
        <p className="text-gray-400 mb-6">
          Submit an AI tool and suggest a new category. We review every
          submission within 48 hours.
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
