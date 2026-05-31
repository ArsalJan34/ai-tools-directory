import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Advertise Your AI Tool',
  description:
    'Get your AI tool in front of thousands of users. Sponsored listings, featured placements and more.',
}

export default function AdvertisePage() {
  return (
    <main className="min-h-screen px-4 py-12 max-w-4xl mx-auto">

      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-white mb-4">
          Advertise Your AI Tool
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Get your AI tool discovered by thousands of users actively looking
          for tools like yours. Simple pricing, real results.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

        {/* Basic */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col">
          <h2 className="text-white font-bold text-xl mb-2">Basic Listing</h2>
          <p className="text-gray-400 text-sm mb-6">
            Get listed in our directory and start getting discovered.
          </p>
          <div className="text-4xl font-bold text-white mb-1">
            Free
          </div>
          <p className="text-gray-500 text-sm mb-8">forever</p>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Listed in directory
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Category page listing
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Tool detail page
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-red-400">✗</span> Featured badge
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-red-400">✗</span> Homepage placement
            </li>
          </ul>
          <Link
            href="/submit"
            className="w-full text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition"
          >
            Submit Free →
          </Link>
        </div>

        {/* Featured */}
        <div className="bg-purple-600/20 border border-purple-500/50 rounded-2xl p-7 flex flex-col relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-xs px-4 py-1 rounded-full font-medium">
            Most Popular
          </div>
          <h2 className="text-white font-bold text-xl mb-2">Featured</h2>
          <p className="text-gray-400 text-sm mb-6">
            Stand out with a featured badge and priority placement.
          </p>
          <div className="text-4xl font-bold text-white mb-1">
            $99
          </div>
          <p className="text-gray-500 text-sm mb-8">per month</p>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Everything in Basic
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Featured badge
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Top of category page
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Homepage section
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-red-400">✗</span> Newsletter mention
            </li>
          </ul>
          <Link
            href="mailto:your@email.com?subject=Featured Listing Inquiry"
            className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-medium transition"
          >
            Get Featured →
          </Link>
        </div>

        {/* Sponsored */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col">
          <h2 className="text-white font-bold text-xl mb-2">Sponsored</h2>
          <p className="text-gray-400 text-sm mb-6">
            Maximum visibility across the entire directory.
          </p>
          <div className="text-4xl font-bold text-white mb-1">
            $299
          </div>
          <p className="text-gray-500 text-sm mb-8">per month</p>
          <ul className="flex flex-col gap-3 mb-8 flex-1">
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Everything in Featured
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Sponsored badge
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Top of all pages
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Newsletter mention
            </li>
            <li className="flex items-center gap-2 text-gray-400 text-sm">
              <span className="text-green-400">✓</span> Social media post
            </li>
          </ul>
          <Link
            href="mailto:your@email.com?subject=Sponsored Listing Inquiry"
            className="w-full text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition"
          >
            Get Sponsored →
          </Link>
        </div>

      </div>

      {/* FAQ */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white font-semibold mb-2">
              How do I get started?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Send us an email using the button above and we will get back to
              you within 24 hours to set up your listing.
            </p>
          </div>
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-white font-semibold mb-2">
              How long does it take to go live?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Once payment is confirmed your tool will be live within 24 hours.
            </p>
          </div>
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-white font-semibold mb-2">
              Can I cancel anytime?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Yes. All plans are monthly and you can cancel anytime with no
              questions asked.
            </p>
          </div>
          <div className="border-t border-white/10 pt-6">
            <h3 className="text-white font-semibold mb-2">
              Do you offer a free trial?
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We offer a free basic listing to all tools. Upgrade to featured
              or sponsored when you are ready.
            </p>
          </div>
        </div>
      </div>

    </main>
  )
}
