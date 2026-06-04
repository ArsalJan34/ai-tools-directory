import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-56 shrink-0 bg-white/5 border-r border-white/10 p-6 flex flex-col gap-2 sticky top-0 h-screen">
        <p className="text-white font-bold text-lg mb-6">
          🛠️ Admin Panel
        </p>
        <Link href="/admin" className="text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm">
          📊 Dashboard
        </Link>
        <Link href="/admin/tools" className="text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm">
          🤖 Manage Tools
        </Link>
        <Link href="/admin/submissions" className="text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm">
          📥 Submissions
        </Link>

        <div className="mt-auto flex flex-col gap-3">
          <Link href="/" className="text-white-500 bg-blue-600 px-5 py-2 hover:text-white text-sm transition rounded-md">
            ← Back to Site
          </Link>
    <form action="/api/admin-logout" method="POST">
  <button
    type="submit"
    className="text-white-500 px-5 py-2 bg-blue-600 hover:bg-red-600 hover:text-white text-sm font-medium transition-all duration-200 rounded-md"
  >
    Logout
  </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  )
}
