import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AI Tools Blog',
  description:
    'Read our latest articles about AI tools, tips, comparisons and guides to help you get the most out of artificial intelligence.',
}

const posts = [
  {
    slug: 'best-ai-writing-tools-2025',
    title: 'Best AI Writing Tools in 2025',
    description:
      'A complete guide to the best AI writing tools available right now. We compare features, pricing, and use cases.',
    category: 'Writing',
    date: 'May 2025',
    readTime: '5 min read',
  },
  {
    slug: 'chatgpt-vs-claude',
    title: 'ChatGPT vs Claude: Which AI is Better?',
    description:
      'An honest side by side comparison of ChatGPT and Claude. We tested both on writing, coding, analysis and more.',
    category: 'Comparison',
    date: 'May 2025',
    readTime: '7 min read',
  },
  {
    slug: 'free-ai-tools-2025',
    title: '10 Best Free AI Tools You Need to Try',
    description:
      'You do not need to spend money to use powerful AI tools. Here are the 10 best completely free AI tools right now.',
    category: 'Lists',
    date: 'April 2025',
    readTime: '4 min read',
  },
  {
    slug: 'ai-tools-for-students',
    title: 'Best AI Tools for Students in 2025',
    description:
      'Students can save hours every week using the right AI tools. Here are the best ones for research, writing and studying.',
    category: 'Education',
    date: 'April 2025',
    readTime: '6 min read',
  },
  {
    slug: 'midjourney-beginners-guide',
    title: 'Midjourney Beginners Guide: Create AI Images',
    description:
      'A step by step guide for complete beginners on how to use Midjourney to create stunning AI generated images.',
    category: 'Image',
    date: 'March 2025',
    readTime: '8 min read',
  },
  {
    slug: 'ai-tools-for-business',
    title: 'Top AI Tools for Small Business Owners',
    description:
      'Save time and money running your business with these powerful AI tools for marketing, customer service, and operations.',
    category: 'Business',
    date: 'March 2025',
    readTime: '6 min read',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen px-4 py-12 max-w-5xl mx-auto">

      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          AI Tools Blog
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Guides, comparisons, and tips to help you find and use the best AI
          tools for your needs.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="bg-white/5 border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition hover:bg-white/8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-xs">{post.readTime}</span>
            </div>
            <h2 className="text-white font-semibold text-lg mb-3 leading-snug">
              {post.title}
            </h2>
            <p className="text-gray-400 text-sm flex-1 leading-relaxed">
              {post.description}
            </p>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
              <span className="text-gray-600 text-xs">{post.date}</span>
              <span className="text-purple-400 text-sm hover:text-purple-300 transition">
                Read more →
              </span>
            </div>
          </Link>
        ))}
      </div>

    </main>
  )
}
