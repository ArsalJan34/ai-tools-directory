import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">

      {/* Sidebar */}
      <form action="/api/admin-logout" method="POST">
  <button className="text-gray-500 hover:text-red-400 text-sm transition mt-auto">
    Logout
  </button>
</form>
      <aside className="w-56 shrink-0 bg-white/5 border-r border-white/10 p-6 flex flex-col gap-2 sticky top-0 h-screen">
        <p className="text-white font-bold text-lg mb-6">
          🛠️ Admin Panel
        </p>
        <Link
          href="/admin"
          className="text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm"
        >
          📊 Dashboard
        </Link>
        <Link
          href="/admin/tools"
          className="text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm"
        >
          🤖 Manage Tools
        </Link>
        <Link
          href="/admin/submissions"
          className="text-gray-400 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition text-sm"
        >
          📥 Submissions
        </Link>
        <div className="mt-auto">
          <Link
            href="/"
            className="text-gray-500 hover:text-white text-sm transition"
          >
            ← Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>

    </div>
  )
}
