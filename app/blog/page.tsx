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
    description: 'A complete guide to the best AI writing tools available right now. We compare features, pricing, and use cases.',
    category: 'Writing',
    date: 'May 2025',
    readTime: '5 min read',
  },
  {
    slug: 'chatgpt-vs-claude',
    title: 'ChatGPT vs Claude: Which AI is Better?',
    description: 'An honest side by side comparison of ChatGPT and Claude. We tested both on writing, coding, analysis and more.',
    category: 'Comparison',
    date: 'May 2025',
    readTime: '7 min read',
  },
  {
    slug: 'free-ai-tools-2025',
    title: '10 Best Free AI Tools You Need to Try',
    description: 'You do not need to spend money to use powerful AI tools. Here are the 10 best completely free AI tools right now.',
    category: 'Lists',
    date: 'April 2025',
    readTime: '4 min read',
  },
  {
    slug: 'ai-tools-for-students',
    title: 'Best AI Tools for Students in 2025',
    description: 'Students can save hours every week using the right AI tools. Here are the best ones for research, writing and studying.',
    category: 'Education',
    date: 'April 2025',
    readTime: '6 min read',
  },
  {
    slug: 'midjourney-beginners-guide',
    title: 'Midjourney Beginners Guide: Create AI Images',
    description: 'A step by step guide for complete beginners on how to use Midjourney to create stunning AI generated images.',
    category: 'Image',
    date: 'March 2025',
    readTime: '8 min read',
  },
  {
    slug: 'ai-tools-for-business',
    title: 'Top AI Tools for Small Business Owners',
    description: 'Save time and money running your business with these powerful AI tools for marketing, customer service, and operations.',
    category: 'Business',
    date: 'March 2025',
    readTime: '6 min read',
  },

  // ====================== 15 NEW BLOG POSTS ======================
  {
    slug: 'best-ai-image-generators-2026',
    title: 'Best AI Image Generators in 2026',
    description: 'The ultimate comparison of top AI image generation tools including Flux, Midjourney, DALL-E 4 and more.',
    category: 'Image',
    date: 'June 2026',
    readTime: '6 min read',
  },
  {
    slug: 'best-ai-video-tools-2026',
    title: 'Best AI Video Tools in 2026',
    description: 'Create professional videos with the latest AI tools like Runway Gen-4, Kling AI, and Luma Dream Machine.',
    category: 'Video',
    date: 'June 2026',
    readTime: '6 min read',
  },
  {
    slug: 'best-ai-tools-for-developers-2026',
    title: 'Best AI Tools for Developers in 2026',
    description: 'Supercharge your coding with Cursor, GitHub Copilot, Claude 4, and other powerful developer tools.',
    category: 'Development',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'chatgpt-vs-gemini-vs-claude',
    title: 'ChatGPT vs Gemini vs Claude 2026',
    description: 'The ultimate head-to-head comparison of the top three AI models in 2026.',
    category: 'Comparison',
    date: 'June 2026',
    readTime: '8 min read',
  },
  {
    slug: 'best-ai-productivity-tools-2026',
    title: 'Best AI Productivity Tools in 2026',
    description: 'Get more done with Notion AI, Perplexity Pro, Mem.ai, and other productivity powerhouses.',
    category: 'Productivity',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'how-to-make-money-with-ai-2026',
    title: 'How to Make Money with AI Tools in 2026',
    description: 'Proven strategies to earn income using AI — from content creation to building tools.',
    category: 'Business',
    date: 'June 2026',
    readTime: '7 min read',
  },
  {
    slug: 'best-ai-tools-for-content-creators',
    title: 'Best AI Tools for Content Creators in 2026',
    description: 'Level up your YouTube, TikTok, and Instagram game with the best AI tools for creators.',
    category: 'Content',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'best-ai-tools-for-marketers',
    title: 'Best AI Tools for Marketers in 2026',
    description: 'Dominate digital marketing with Jasper, AdCreative.ai, Copy.ai and more.',
    category: 'Marketing',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'best-ai-tools-for-freelancers',
    title: 'Best AI Tools for Freelancers in 2026',
    description: 'Work smarter, faster, and earn more as a freelancer using AI.',
    category: 'Freelance',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'ai-trends-2026',
    title: 'AI Trends to Watch in 2026',
    description: 'The biggest AI developments and predictions shaping the future.',
    category: 'Trends',
    date: 'June 2026',
    readTime: '6 min read',
  },
  {
    slug: 'best-ai-tools-for-students-2026',
    title: 'Best AI Tools for Students in 2026',
    description: 'Study smarter with Perplexity, Notion AI, ChatGPT and other student-friendly tools.',
    category: 'Education',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'best-ai-music-generation-tools',
    title: 'Best AI Music Generation Tools in 2026',
    description: 'Create original music with Suno, Udio, AIVA and other AI music tools.',
    category: 'Music',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'best-ai-design-tools-2026',
    title: 'Best AI Design Tools in 2026',
    description: 'Design faster and better with Figma AI, Uizard, Midjourney and more.',
    category: 'Design',
    date: 'June 2026',
    readTime: '5 min read',
  },
  {
    slug: 'best-ai-tools-for-small-business',
    title: 'Best AI Tools for Small Business Owners',
    description: 'Grow your business efficiently with AI tools for accounting, marketing, and customer support.',
    category: 'Business',
    date: 'June 2026',
    readTime: '6 min read',
  },
  {
    slug: 'future-of-ai-agents-2026',
    title: 'The Future of AI Agents in 2026',
    description: 'How autonomous AI agents will transform work and daily life.',
    category: 'Future',
    date: 'June 2026',
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
