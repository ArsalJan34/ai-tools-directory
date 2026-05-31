import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

const posts: Record<string, any> = {
  'best-ai-writing-tools-2025': {
    title: 'Best AI Writing Tools in 2025',
    description:
      'A complete guide to the best AI writing tools available right now.',
    category: 'Writing',
    date: 'May 2025',
    readTime: '5 min read',
    content: `
      AI writing tools have changed how we create content forever. Whether you are a blogger,
      marketer, student, or business owner, there is an AI writing tool that can save you hours
      every single week.

      In this guide we cover the best AI writing tools available right now, what they are good
      for, and which one you should use based on your needs.

      ## 1. ChatGPT

      ChatGPT by OpenAI is the most popular AI tool in the world. It can write blog posts,
      emails, social media captions, product descriptions and much more. The free version is
      powerful enough for most people.

      Best for: General writing, brainstorming, drafting emails.
      Pricing: Free with a paid Pro plan.

      ## 2. Claude

      Claude by Anthropic is known for being very good at long form writing and following
      instructions carefully. Many writers prefer Claude over ChatGPT for detailed articles
      and essays.

      Best for: Long form content, essays, detailed articles.
      Pricing: Free with a paid Pro plan.

      ## 3. Jasper

      Jasper is built specifically for marketing teams. It has templates for ads, blog posts,
      product descriptions and social media. It connects with your brand voice and style.

      Best for: Marketing copy, ads, brand content.
      Pricing: Paid plans starting at around $49 per month.

      ## 4. Copy.ai

      Copy.ai is great for quick marketing copy. It has dozens of templates and can generate
      content in seconds. Good option for social media managers and small business owners.

      Best for: Short form marketing copy, social media posts.
      Pricing: Free tier available, paid plans from $36 per month.

      ## Final Thoughts

      The best AI writing tool depends on what you need. For most people, starting with the
      free version of ChatGPT or Claude is the right move. Once you know what you need, you
      can upgrade to a paid tool.

      Browse our full directory to find and compare all AI writing tools in one place.
    `,
  },
  'chatgpt-vs-claude': {
    title: 'ChatGPT vs Claude: Which AI is Better?',
    description:
      'An honest side by side comparison of ChatGPT and Claude.',
    category: 'Comparison',
    date: 'May 2025',
    readTime: '7 min read',
    content: `
      ChatGPT and Claude are the two most popular AI assistants right now. Both are incredibly
      powerful but they have different strengths. In this comparison we tested both on real
      tasks so you can decide which one is right for you.

      ## Writing Quality

      Both tools write very well. Claude tends to produce more natural sounding text that
      feels less robotic. ChatGPT is more versatile and can match different tones and styles
      more easily.

      Winner: Tie, depends on your use case.

      ## Coding

      ChatGPT with the GPT-4 model is slightly better at coding tasks, especially for complex
      problems. Both tools can write, debug, and explain code very well.

      Winner: ChatGPT slightly.

      ## Following Instructions

      Claude is noticeably better at following long detailed instructions without forgetting
      parts of the prompt. If you give it a complex task with many rules, Claude sticks to
      them more reliably.

      Winner: Claude.

      ## Pricing

      Both have free tiers. ChatGPT Plus costs $20 per month. Claude Pro also costs $20 per
      month. The free versions of both are powerful enough for most everyday tasks.

      Winner: Tie.

      ## Which Should You Use?

      Use ChatGPT if you need a versatile tool for coding, research, and general tasks.
      Use Claude if you need a tool for long form writing, detailed instructions, and documents.

      Honestly you can use both for free and see which one you prefer. Most power users end
      up using both depending on the task.
    `,
  },
  'free-ai-tools-2025': {
    title: '10 Best Free AI Tools You Need to Try',
    description:
      'You do not need to spend money to use powerful AI tools.',
    category: 'Lists',
    date: 'April 2025',
    readTime: '4 min read',
    content: `
      You do not need to spend a single dollar to access powerful AI tools. Here are the 10
      best completely free AI tools available right now.

      ## 1. ChatGPT Free
      The free version of ChatGPT is still one of the most powerful AI tools available.
      Great for writing, research, coding, and general questions.

      ## 2. Claude Free
      Anthropic's Claude has a generous free tier that is great for writing and analysis.

      ## 3. Perplexity AI
      A free AI powered search engine that gives you answers with sources. Much better than
      regular Google for research questions.

      ## 4. Canva AI
      Canva has built in AI tools for generating images, writing copy, and designing graphics.
      The free tier is very generous.

      ## 5. Google Gemini
      Google's AI assistant is completely free and integrates with Google Docs, Gmail, and
      other Google products.

      ## 6. Microsoft Copilot
      Free access to GPT-4 through Microsoft's Copilot. Available in the browser and in
      Windows.

      ## 7. Bing Image Creator
      Free AI image generation powered by DALL-E. No subscription needed.

      ## 8. ElevenLabs Free Tier
      Generate realistic AI voices for free. Great for content creators and podcasters.

      ## 9. Runway Free Tier
      AI video generation and editing with a free tier. Perfect for trying out AI video tools.

      ## 10. GitHub Copilot Free
      GitHub now offers a free tier of Copilot for developers with 2000 code completions
      per month.

      Browse our directory to find even more free AI tools across every category.
    `,
  },
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = posts[params.slug]
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.title,
    description: post.description,
  }
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = posts[params.slug]

  if (!post) {
    notFound()
  }

  const paragraphs = post.content
    .split('\n')
    .map((line: string) => line.trim())
    .filter((line: string) => line.length > 0)

  return (
    <main className="min-h-screen px-4 py-12 max-w-3xl mx-auto">

      {/* Back */}
      <Link
        href="/blog"
        className="text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-2 transition"
      >
        ← Back to Blog
      </Link>

      {/* Header */}
      <div className="mt-4 mb-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs bg-purple-600/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-gray-500 text-xs">{post.readTime}</span>
          <span className="text-gray-500 text-xs">{post.date}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
          {post.title}
        </h1>
        <p className="text-gray-400 text-lg">{post.description}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10 mb-10" />

      {/* Content */}
      <div className="flex flex-col gap-5">
        {paragraphs.map((para: string, i: number) => {
          if (para.startsWith('## ')) {
            return (
              <h2 key={i} className="text-xl font-bold text-white mt-4">
                {para.replace('## ', '')}
              </h2>
            )
          }
          return (
            <p key={i} className="text-gray-400 leading-relaxed">
              {para}
            </p>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-500/20 rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-3">
          Find More AI Tools
        </h3>
        <p className="text-gray-400 mb-6">
          Browse our full directory of hundreds of AI tools across every
          category.
        </p>
        <Link
          href="/tools"
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition inline-block"
        >
          Browse All Tools →
        </Link>
      </div>

    </main>
  )
}
