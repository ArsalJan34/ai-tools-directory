import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | AI Shelve',
  description: 'Terms and conditions for using AI Shelve directory.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      <div className="mb-12">
        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300 text-sm inline-flex items-center gap-2 mb-8"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-3">Terms of Service</h1>
        <p className="text-gray-500">Last updated: June 02, 2026</p>
      </div>

      <div className="space-y-10 text-gray-400 leading-relaxed">
        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using AI Shelve, you agree to be bound by these Terms of Service.
            If you do not agree, please do not use our website.
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">2. Use of the Directory</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You may browse and search AI tools for personal and professional use.</li>
            <li>You may submit tools for review, but we reserve the right to approve or reject any submission.</li>
            <li>Do not misuse our affiliate links or attempt to manipulate click tracking.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">3. Intellectual Property</h2>
          <p>
            All content on AI Shelve (including tool descriptions, logos, and design) is owned by us or our licensors.
            You may not copy, modify, or distribute our content without permission.
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">4. Affiliate Links &amp; Disclosures</h2>
          <p>
            Some links on this site are affiliate links. We may earn a commission if you purchase through them,
            at no extra cost to you. We only recommend tools we believe are valuable.
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <p>
            AI Shelve is provided "as is". We are not responsible for any damages resulting from your use of the site
            or third-party AI tools listed here.
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">6. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-white text-2xl font-semibold mb-4">7. Contact Us</h2>
          <p>
            For any questions regarding these Terms, please contact us at:{' '}
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
