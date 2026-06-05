import { supabaseAdmin } from '@/lib/supabaseAdmin'
import Link from 'next/link'

async function getStats() {
  const [tools, categories, submissions, clicks] = await Promise.all([
    supabaseAdmin.from('tools').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('categories').select('id', { count: 'exact', head: true }),
    supabaseAdmin.from('submissions').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    supabaseAdmin.from('clicks').select('id', { count: 'exact', head: true }),
  ])
  return {
    tools: tools.count || 0,
    categories: categories.count || 0,
    pendingSubmissions: submissions.count || 0,
    clicks: clicks.count || 0,
  }
}

async function getRecentSubmissions() {
  const { data } = await supabaseAdmin
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {[
          { label: 'Total Tools', value: stats.tools, color: 'text-white' },
          { label: 'Categories', value: stats.categories, color: 'text-white' },
          { label: 'Pending Submissions', value: stats.pendingSubmissions, color: 'text-yellow-400' },
          { label: 'Total Clicks', value: stats.clicks, color: 'text-purple-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">{label}</p>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Pending Submissions</h2>
          <Link href="/admin/submissions" className="text-purple-400 hover:text-purple-300 text-sm transition">
            View all →
          </Link>
        </div>
        {recentSubmissions.length === 0 ? (
          <p className="text-gray-500 text-sm">No pending submissions.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {recentSubmissions.map((sub: any) => (
              <div key={sub.id} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4">
                <div>
                  <p className="text-white font-medium">{sub.name}</p>
                  <p className="text-gray-500 text-sm">{sub.url}</p>
                  {sub.email && <p className="text-gray-600 text-xs mt-1">{sub.email}</p>}
                </div>
                <Link href="/admin/submissions" className="text-sm bg-purple-600/20 hover:bg-purple-600 border border-purple-500/30 text-purple-300 hover:text-white px-4 py-2 rounded-lg transition">
                  Review
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
