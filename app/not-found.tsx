import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🤖</div>
        <h1 className="text-4xl font-bold text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
          Looks like this page doesn't exist. Maybe the AI ate it.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Go Home
          </Link>
          <Link
            href="/tools"
            className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Browse Tools
          </Link>
        </div>
      </div>
    </main>
  )
}
