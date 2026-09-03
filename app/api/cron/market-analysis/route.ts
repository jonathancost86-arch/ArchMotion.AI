import { NextRequest, NextResponse } from 'next/server'
import { createAIProvider } from '@/lib/ai/provider'

export async function GET(request: NextRequest) {
  const secret = request.headers.get('authorization')?.replace('Bearer ', '')
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  const provider = createAIProvider()
  const horizon = 'medio' as const
  const agents = await Promise.all([provider.analyzeFundamentals({}, horizon), provider.analyzeMacro({}, horizon), provider.analyzeValuation({}, horizon), provider.analyzeRisk({}, horizon)])
  const consensus = await provider.generateConsensus({}, agents)
  return NextResponse.json({ ok: true, updatedAt: new Date().toISOString(), agents, consensus, note: 'Persistência das análises deve ser ligada ao job de dados de mercado.' })
}
