import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

const assetSchema = z.object({
  ticker: z.string().trim().min(1).max(20),
  asset_name: z.string().trim().min(1).max(120),
  asset_class: z.string().trim().min(1).max(40),
  quantity: z.number().nonnegative(),
  average_price: z.number().nonnegative(),
  current_price: z.number().nonnegative().default(0),
  sector: z.string().trim().max(80).optional(),
  acquisition_date: z.string().date(),
})

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const { data, error } = await supabase.from('portfolio_assets').select('id,ticker,asset_name,asset_class,quantity,average_price,current_price,sector,acquisition_date,updated_at').eq('user_id', user.id).order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'Não foi possível carregar a carteira.' }, { status: 500 })
  return NextResponse.json({ assets: data ?? [] })
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const parsed = assetSchema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Dados do ativo inválidos.' }, { status: 400 })
  const { data, error } = await supabase.from('portfolio_assets').insert({ ...parsed.data, user_id: user.id }).select('id,ticker,asset_name,asset_class,quantity,average_price,current_price,sector,acquisition_date').single()
  if (error) return NextResponse.json({ error: 'Não foi possível salvar o ativo.' }, { status: 500 })
  return NextResponse.json({ asset: data }, { status: 201 })
}
