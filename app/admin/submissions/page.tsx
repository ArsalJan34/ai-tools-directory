'use client'
import { useEffect, useState } from 'react'

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('pending')

  useEffect(() => { fetchSubmissions() }, [filter])

  async function fetchSubmissions() {
    setLoading(true)
    const res = await fetch(`/api/admin/submissions?status=${filter}`)
    const data = await res.json()
    setSubmissions(data || [])
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    await fetch('/api/admin/submissions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    fetchSubmissions()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Submissions</h1>
      <div className="flex gap-3 mb-8">
        {['pending', 'approved', 'rejected'].map(tab => (
          <button key={tab} onClick={() => setFilter(tab)} className={`px-5 py-2 rounded-xl text-sm font-medium capitalize transition ${filter === tab ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
            {tab}
          </button>
        ))}
      </div>

      {loading ? <p className="text-gray-500">Loading...</p> : submissions.length === 0 ? (
        <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-500">No {filter} submissions.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions.map((sub: any) => (
            <div key={sub.id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">{sub.name}</h3>
                  <p className="text-purple-400 text-sm mb-2">{sub.url}</p>
                  {sub.description && <p className="text-gray-400 text-sm mb-2">{sub.description}</p>}
                  {sub.email && <p className="text-gray-500 text-xs">Submitted by: {sub.email}</p>}
                  <p className="text-gray-600 text-xs mt-1">{new Date(sub.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                {filter === 'pending' && (
                  <div className="flex gap-3 shrink-0">
                    <button onClick={() => updateStatus(sub.id, 'approved')} className="bg-green-500/20 hover:bg-green-500/40 border border-green-500/30 text-green-400 hover:text-white px-5 py-2 rounded-xl text-sm font-medium transition">✓ Approve</button>
                    <button onClick={() => updateStatus(sub.id, 'rejected')} className="bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-400 hover:text-white px-5 py-2 rounded-xl text-sm font-medium transition">✕ Reject</button>
                  </div>
                )}
                {filter === 'approved' && <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full h-fit">Approved</span>}
                {filter === 'rejected' && <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-full h-fit">Rejected</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
