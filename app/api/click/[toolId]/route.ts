import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '../../../lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { toolId: string } }
) {
  const { toolId } = params

  // Get the tool from database
  const { data: tool, error } = await supabase
    .from('tools')
    .select('url, affiliate_url')
    .eq('id', toolId)
    .single()

  if (error || !tool) {
    return NextResponse.json(
      { error: 'Tool not found' },
      { status: 404 }
    )
  }

  // Record the click
  await supabase.from('clicks').insert([
    {
      tool_id: toolId,
    },
  ])

  // Redirect to affiliate url or regular url
  const destination = tool.affiliate_url || tool.url

  return NextResponse.redirect(destination)
}
