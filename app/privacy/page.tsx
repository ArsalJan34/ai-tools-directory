import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | AI Shelve',
  description: 'Our privacy policy explains how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      <div className="mb-12">
        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300 text-sm inline-flex items-center gap-2 mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-3">Privacy Policy</h1>
        <p className="text-gray-500">Last updated: June 02, 2026</p>
      </div>

      <div className="space-y-10 text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            AI Shelve ("we", "our", or "us") respects your privacy and is committed to protecting your personal data.
            This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">2. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Submission Data:</strong> Name, email, and tool details when you submit a tool.</li>
            <li><strong>Usage Data:</strong> Pages visited, clicks on "Visit" buttons, and search queries.</li>
            <li><strong>Technical Data:</strong> IP address, browser type, device information, and access times.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To operate and improve the AI tools directory</li>
            <li>To process and review tool submissions</li>
            <li>To track affiliate clicks for monetization</li>
            <li>To respond to your inquiries</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">4. Data Sharing</h2>
          <p>We do not sell your personal data. We may share information with:</p>
          <ul className="list-disc pl-6 space-y-2 mt-3">
            <li>Hosting and analytics providers (Supabase, Vercel, etc.)</li>
            <li>Affiliate networks (only anonymized click data)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">5. Cookies</h2>
          <p>We use essential cookies for functionality and Google Analytics for traffic insights. You can manage preferences via your browser.</p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">6. Your Rights</h2>
          <p>You may request access, correction, or deletion of your personal data by contacting us.</p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            For any privacy-related questions, please email us at:{' '}
            <a href="mailto:contact@aishelve.com" className="text-purple-400 hover:underline">
              contact@aishelve.com
            </a>
          </p>
        </section>
      </div>

      <div className="mt-20 text-center text-xs text-gray-600">
        © {new Date().getFullYear()} AI Shelve. All Rights Reserved.
      </div>
    </main>
  )
}
