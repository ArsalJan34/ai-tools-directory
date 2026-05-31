import { NextResponse } from 'next/server'
import { supabase } from '../../lib/supabase'

export async function GET() {
  const { data: writing, error: writingError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', 'writing')
    .single()

  const { data: allCats, error: allCatsError } = await supabase
    .from('categories')
    .select('*')

  return NextResponse.json({
    writing,
    writingError,
    allCats,
    allCatsError,
  })
}
