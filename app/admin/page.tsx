import { supabase } from '../lib/supabase'
import Link from 'next/link'

async function getStats() {
  const [tools, categories, submissions, clicks] = await Promise.all([
    supabase.from('tools').select('id', { count: 'exact' }),
    supabase.from('categories').select('id', { count: 'exact' }),
    supabase.from('submissions').select('id', { count: 'exact' }).eq('status', 'pending'),
    supabase.from('clicks').select('id', { count: 'exact' }),
  ])
  return {
    tools: tools.count || 0,
    categories: categories.count || 0,
    pendingSubmissions: submissions.count || 0,
    clicks: clicks.count || 0,
  }
}

async function getRecentSubmissions() {
  const { data } = await supabase
    .from('submissions')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(5)
  return data || []
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const recentSubmissions = await getRecentSubmissions()

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Tools</p>
          <p className="text-3xl font-bold text-white">{stats.tools}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Categories</p>
          <p className="text-3xl font-bold text-white">{stats.categories}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Pending Submissions</p>
          <p className="text-3xl font-bold text-yellow-400">
            {stats.pendingSubmissions}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-1">Total Clicks</p>
          <p className="text-3xl font-bold text-purple-400">{stats.clicks}</p>
        </div>
      </div>

      {/* Pending Submissions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Pending Submissions</h2>
          <Link
            href="/admin/submissions"
            className="text-purple-400 hover:text-purple-300 text-sm transition"
          >
            View all →
          </Link>
        </div>

        {recentSubmissions.length === 0 ? (
          <p className="text-gray-500 text-sm">No pending submissions.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentSubmissions.map((sub: any) => (
              <div
                key={sub.id}
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4"
              >
                <div>
                  <p className="text-white font-medium">{sub.name}</p>
                  <p className="text-gray-500 text-sm">{sub.url}</p>
                  {sub.email && (
                    <p className="text-gray-600 text-xs mt-1">{sub.email}</p>
                  )}
                </div>
                <Link
                  href="/admin/submissions"
                  className="text-sm bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 text-purple-300 hover:text-white px-4 py-2 rounded-lg transition"
                >
                  Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Top Clicked Tools */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mt-8">
        <h2 className="text-xl font-bold text-white mb-6">
          How Clicks Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-3xl mb-3">🔗</div>
            <p className="text-white font-medium mb-2">Affiliate Links</p>
            <p className="text-gray-400 text-sm">
              Every Visit button goes through your tracking route first then
              redirects to the affiliate URL you set for that tool.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-3xl mb-3">📊</div>
            <p className="text-white font-medium mb-2">Click Tracking</p>
            <p className="text-gray-400 text-sm">
              Every click is saved in your clicks table in Supabase. You can
              view all clicks in the Supabase dashboard under Table Editor.
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-5">
            <div className="text-3xl mb-3">💰</div>
            <p className="text-white font-medium mb-2">Earning Money</p>
            <p className="text-gray-400 text-sm">
              Sign up for affiliate programs of each tool. Replace the
              affiliate URL in the tool with your unique affiliate link.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
