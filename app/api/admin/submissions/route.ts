import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { isAuthenticated } from '@/lib/auth'

export async function GET(request: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') || 'pending'

  const { data, error } = await supabaseAdmin
    .from('submissions')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest) {
  if (!isAuthenticated()) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id, status } = await request.json()

  const { error } = await supabaseAdmin.from('submissions').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  if (status === 'approved') {
    const { data: sub } = await supabaseAdmin.from('submissions').select('*').eq('id', id).single()
    if (sub) {
      await supabaseAdmin.from('tools').insert([{
        name: sub.name,
        slug: sub.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        url: sub.url,
        affiliate_url: sub.url,
        tagline: sub.description || '',
        description: sub.description || '',
        pricing_type: 'free',
        is_featured: false,
        is_sponsored: false,
        is_new: true,
      }])
    }
  }

  return NextResponse.json({ success: true })
}
