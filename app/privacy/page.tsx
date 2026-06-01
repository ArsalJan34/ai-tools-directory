import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AI Shelve',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-extrabold text-white mb-4">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-10">Last updated: June 1, 2026</p>

      <div className="flex flex-col gap-8 text-gray-400 leading-relaxed">

        <section>
          <h2 className="text-white font-bold text-xl mb-3">1. Information We Collect</h2>
          <p>We collect information you voluntarily provide when submitting a tool or contacting us, such as your name and email address. We also collect anonymous usage data through analytics tools to understand how visitors use our site.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">2. How We Use Your Information</h2>
          <p>We use the information we collect to operate and improve AI Shelve, respond to your inquiries, and send occasional updates if you have opted in. We do not sell your personal information to third parties.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">3. Cookies</h2>
          <p>We use cookies and similar tracking technologies to analyze site traffic and improve your experience. By using our site, you consent to the use of cookies. You can disable cookies in your browser settings at any time.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">4. Third Party Services</h2>
          <p>We use third party services including Google AdSense for advertising and Google Analytics for analytics. These services may collect data about your visit in accordance with their own privacy policies. We recommend reviewing Google's privacy policy at policies.google.com.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">5. Affiliate Links</h2>
          <p>Some links on AI Shelve are affiliate links. This means we may earn a small commission if you click through and make a purchase, at no extra cost to you. We only recommend tools we genuinely believe are useful.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">6. Data Security</h2>
          <p>We take reasonable measures to protect your information. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-white font-bold text-xl mb-3">7. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:arsaljaan699@gmail.com" className="text-violet-400 hover:text-violet-300">arsaljaan699@gmail.com</a></p>
        </section>

      </div>
    </main>
  )
}
