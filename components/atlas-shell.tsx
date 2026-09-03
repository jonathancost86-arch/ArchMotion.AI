'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  CircleDollarSign,
  Compass,
  LayoutDashboard,
  Menu,
  Moon,
  PanelLeftClose,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  WalletCards,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Visão geral', href: '/', icon: LayoutDashboard },
  { label: 'Minha carteira', href: '/portfolio', icon: BriefcaseBusiness },
  { label: 'Radar', href: '/radar', icon: Compass },
  { label: 'Próximo aporte', href: '/next-investment', icon: CircleDollarSign },
  { label: 'Alertas', href: '/alerts', icon: Bell, count: 3 },
]

const assets = [
  { ticker: 'ITUB4', name: 'Itaú Unibanco', className: 'Ações', value: 38420, return: 18.4, allocation: 24.2, color: 'bg-primary' },
  { ticker: 'KNCR11', name: 'Kinea Rendimentos', className: 'FIIs', value: 24180, return: 11.7, allocation: 15.2, color: 'bg-chart-2' },
  { ticker: 'IVVB11', name: 'iShares S&P 500', className: 'Exterior', value: 22640, return: 23.1, allocation: 14.3, color: 'bg-chart-3' },
  { ticker: 'Tesouro IPCA+', name: '2040', className: 'Renda fixa', value: 18600, return: 9.2, allocation: 11.7, color: 'bg-chart-4' },
]

const opportunities = [
  { ticker: 'TAEE11', name: 'Taesa', className: 'Ações', score: 91, risk: 'Baixo', valuation: 'Desconto', potential: '+18,6%', detail: 'Dividendos resilientes e previsibilidade de caixa.' },
  { ticker: 'HGLG11', name: 'CSHG Logística', className: 'FIIs', score: 84, risk: 'Médio', valuation: 'Desconto', potential: '+14,2%', detail: 'Portfólio logístico premium negociado abaixo do valor patrimonial.' },
  { ticker: 'BOVA11', name: 'iShares Ibovespa', className: 'ETFs', score: 78, risk: 'Médio', valuation: 'Justo', potential: '+11,0%', detail: 'Exposição diversificada ao mercado doméstico.' },
]

function formatBRL(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 })
}

function scoreLabel(score: number) {
  if (score >= 85) return 'Muito interessante'
  if (score >= 75) return 'Interessante'
  return 'Neutro'
}

export function AtlasShell() {
  const [active, setActive] = useState('Visão geral')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [selectedHorizon, setSelectedHorizon] = useState('Médio prazo')
  const total = useMemo(() => assets.reduce((sum, asset) => sum + asset.value, 0) + 52780, [])

  return (
    <div className={dark ? 'dark min-h-screen bg-background text-foreground' : 'min-h-screen bg-background text-foreground'}>
      <div className="flex min-h-screen bg-background">
        <aside className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-sidebar p-5 transition-transform lg:static lg:translate-x-0`}>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" onClick={() => setActive('Visão geral')}>
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BarChart3 className="size-5" /></div>
              <div><p className="font-mono text-sm font-bold tracking-[0.2em] text-foreground">ATLAS</p><p className="text-xs text-muted-foreground">Inteligência de investimentos</p></div>
            </Link>
            <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X className="size-5" /></button>
          </div>
          <div className="mt-10 flex flex-1 flex-col gap-1">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Workspace</p>
            {navItems.map((item) => { const Icon = item.icon; return <Link key={item.label} href={item.href} onClick={() => { setActive(item.label); setMobileOpen(false) }} className={`flex items-center justify-between rounded-xl px-3 py-3 text-sm transition-colors ${active === item.label ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><span className="flex items-center gap-3"><Icon className="size-4" />{item.label}</span>{item.count && <span className={`flex size-5 items-center justify-center rounded-full text-[10px] font-semibold ${active === item.label ? 'bg-primary-foreground/15' : 'bg-accent text-accent-foreground'}`}>{item.count}</span>}</Link> })}
            <div className="my-5 h-px bg-border" />
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">Sistema</p>
            <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"><Settings className="size-4" />Preferências</Link>
            <button onClick={() => setDark(!dark)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground">{dark ? <Sun className="size-4" /> : <Moon className="size-4" />}{dark ? 'Modo claro' : 'Modo escuro'}</button>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4"><div className="mb-3 flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /><span className="text-xs font-medium">Ambiente privado</span></div><p className="text-xs leading-5 text-muted-foreground">Seus dados são isolados e usados apenas para apoiar suas decisões.</p></div>
          <div className="mt-5 flex items-center gap-3 border-t border-border pt-5"><div className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">MC</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">Minha conta</p><p className="truncate text-xs text-muted-foreground">Perfil moderado</p></div><ChevronRight className="size-4 text-muted-foreground" /></div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="flex h-20 items-center justify-between border-b border-border px-5 sm:px-8 lg:px-10"><div className="flex items-center gap-3"><button className="rounded-lg p-2 text-muted-foreground hover:bg-muted lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu className="size-5" /></button><div><p className="text-xs text-muted-foreground">Quarta-feira, 03 de setembro de 2026</p><h1 className="mt-1 text-xl font-semibold tracking-tight">Visão geral</h1></div></div><div className="flex items-center gap-2"><button className="hidden rounded-lg p-2 text-muted-foreground hover:bg-muted sm:block" aria-label="Buscar"><Search className="size-4" /></button><Link href="/alerts" className="relative rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Alertas"><Bell className="size-4" /><span className="absolute right-1 top-1 size-1.5 rounded-full bg-primary" /></Link><button onClick={() => setShowAdd(true)} className="hidden items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 sm:flex"><Plus className="size-4" />Adicionar ativo</button></div></header>
          <div className="mx-auto max-w-[1500px] p-5 sm:p-8 lg:p-10">
            <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" />Dados atualizados há 12 min</div><h2 className="max-w-xl text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Clareza para investir<br /><span className="text-muted-foreground">com mais convicção.</span></h2></div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Activity className="size-4 text-primary" />Mercado aberto · B3</div></section>
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Patrimônio total" value={formatBRL(total)} detail="+ R$ 12.840 este mês" trend="up" icon={WalletCards} /><Metric label="Rentabilidade total" value="+16,8%" detail="vs. CDI +10,9%" trend="up" icon={TrendingUp} /><Metric label="Dinheiro disponível" value="R$ 8.240" detail="Próximo aporte recomendado" trend="neutral" icon={CircleDollarSign} /><Metric label="Score da carteira" value="82/100" detail="Carteira interessante" trend="up" icon={Target} /></section>
            <section className="mt-4 grid gap-4 xl:grid-cols-[1.5fr_1fr]"><div className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="mb-6 flex items-start justify-between"><div><p className="text-sm font-medium">Evolução patrimonial</p><p className="mt-1 text-xs text-muted-foreground">Últimos 12 meses · em milhares de R$</p></div><select className="rounded-lg border border-border bg-background px-2 py-1.5 text-xs text-muted-foreground" aria-label="Período"><option>12 meses</option><option>6 meses</option></select></div><div className="relative h-56"><div className="absolute inset-0 flex flex-col justify-between text-[10px] text-muted-foreground"><span>R$ 190k</span><span>R$ 150k</span><span>R$ 110k</span><span>R$ 70k</span></div><div className="ml-12 flex h-full items-end gap-2 border-b border-border pb-0 sm:gap-4">{[44,48,51,54,53,61,65,70,69,76,83,92].map((height, i) => <div key={i} className="group flex h-full flex-1 flex-col justify-end"><div className="relative w-full rounded-t-md bg-primary/80 transition-all group-hover:bg-primary" style={{ height: `${height}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[10px] text-muted-foreground group-hover:block">{Math.round(80 + height * 1.1)}k</span></div></div>)}</div><div className="ml-12 flex justify-between pt-3 text-[10px] text-muted-foreground"><span>Set/25</span><span>Dez/25</span><span>Mar/26</span><span>Jun/26</span><span>Set/26</span></div></div></div><div className="rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="mb-5 flex items-start justify-between"><div><p className="text-sm font-medium">Distribuição da carteira</p><p className="mt-1 text-xs text-muted-foreground">Por classe de ativo</p></div><Link href="/portfolio" className="text-xs text-primary hover:underline">Ver carteira</Link></div><div className="flex items-center gap-5"><div className="relative flex size-36 shrink-0 items-center justify-center rounded-full" style={{ background: 'conic-gradient(var(--primary) 0 42%, var(--chart-2) 42% 63%, var(--chart-3) 63% 81%, var(--chart-4) 81% 94%, var(--muted) 94% 100%)' }}><div className="flex size-24 flex-col items-center justify-center rounded-full bg-card"><span className="text-2xl font-semibold">100%</span><span className="text-[10px] text-muted-foreground">alocado</span></div></div><div className="flex flex-col gap-3">{[['Renda variável','42%','bg-primary'],['FIIs','21%','bg-chart-2'],['Exterior','18%','bg-chart-3'],['Renda fixa','13%','bg-chart-4']].map(([label, value, color]) => <div key={label} className="flex items-center gap-2 text-xs"><span className={`size-2 rounded-full ${color}`} /><span className="text-muted-foreground">{label}</span><span className="ml-auto font-medium">{value}</span></div>)}</div></div><div className="mt-6 flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs text-accent-foreground"><AlertTriangle className="size-3.5" />Concentração em ITUB4 acima do ideal</div></div></section>
            <section className="mt-8 grid gap-4 xl:grid-cols-[1.15fr_1fr]"><div><div className="mb-4 flex items-center justify-between"><div><h3 className="text-lg font-semibold">Radar de oportunidades</h3><p className="mt-1 text-xs text-muted-foreground">Oportunidades com maior atratividade relativa</p></div><Link href="/radar" className="flex items-center gap-1 text-xs text-primary hover:underline">Ver radar <ChevronRight className="size-3" /></Link></div><div className="flex flex-col gap-3">{opportunities.map((item) => <Opportunity key={item.ticker} item={item} />)}</div></div><div><div className="mb-4"><h3 className="text-lg font-semibold">Pontos de atenção</h3><p className="mt-1 text-xs text-muted-foreground">O que merece sua atenção agora</p></div><div className="flex flex-col gap-3"><Insight icon={AlertTriangle} title="Concentração elevada" text="ITUB4 representa 24,2% da carteira. Avalie reduzir gradualmente essa exposição." type="warning" /><Insight icon={Sparkles} title="Oportunidade detectada" text="TAEE11 combina score alto, valuation descontado e risco baixo." type="positive" /><Insight icon={ArrowDownRight} title="Dados desatualizados" text="A análise macroeconômica será atualizada na próxima execução diária." type="neutral" /></div></div></section>
            <section className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"><div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h3 className="text-lg font-semibold">Composição por ativo</h3><p className="mt-1 text-xs text-muted-foreground">Visão rápida da sua carteira atual</p></div><Link href="/portfolio" className="text-xs text-primary hover:underline">Gerenciar carteira</Link></div><div className="overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="border-b border-border text-xs text-muted-foreground"><tr><th className="pb-3 font-medium">Ativo</th><th className="pb-3 font-medium">Classe</th><th className="pb-3 font-medium">Valor atual</th><th className="pb-3 font-medium">Rentabilidade</th><th className="pb-3 font-medium">Carteira</th></tr></thead><tbody>{assets.map((asset) => <tr key={asset.ticker} className="border-b border-border last:border-0"><td className="py-4"><div className="flex items-center gap-3"><span className={`size-2 rounded-full ${asset.color}`} /><div><p className="font-medium">{asset.ticker}</p><p className="text-xs text-muted-foreground">{asset.name}</p></div></div></td><td className="py-4 text-muted-foreground">{asset.className}</td><td className="py-4 font-medium">{formatBRL(asset.value)}</td><td className="py-4"><span className="inline-flex items-center gap-1 text-primary"><ArrowUpRight className="size-3" />{asset.return}%</span></td><td className="py-4 text-muted-foreground">{asset.allocation}%</td></tr>)}</tbody></table></div></section>
          </div>
        </main>
      </div>
      {mobileOpen && <button className="fixed inset-0 z-30 bg-background/70 lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Fechar menu" />}
      {showAdd && <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"><div className="flex items-start justify-between"><div><p className="text-lg font-semibold">Adicionar ativo</p><p className="mt-1 text-sm text-muted-foreground">Registre uma posição manualmente.</p></div><button onClick={() => setShowAdd(false)} className="rounded-lg p-2 text-muted-foreground hover:bg-muted" aria-label="Fechar"><X className="size-4" /></button></div><div className="mt-6 flex flex-col gap-4"><label className="flex flex-col gap-2 text-sm"><span className="text-muted-foreground">Ticker ou nome</span><input className="rounded-lg border border-input bg-background px-3 py-2.5 outline-none focus:ring-2 focus:ring-ring" placeholder="Ex.: WEGE3" /></label><label className="flex flex-col gap-2 text-sm"><span className="text-muted-foreground">Classe</span><select className="rounded-lg border border-input bg-background px-3 py-2.5"><option>Ações</option><option>FIIs</option><option>ETFs</option><option>Renda fixa</option><option>Criptoativos</option><option>Caixa</option></select></label><div className="grid grid-cols-2 gap-3"><label className="flex flex-col gap-2 text-sm"><span className="text-muted-foreground">Quantidade</span><input type="number" className="rounded-lg border border-input bg-background px-3 py-2.5" placeholder="0" /></label><label className="flex flex-col gap-2 text-sm"><span className="text-muted-foreground">Preço médio</span><input type="number" className="rounded-lg border border-input bg-background px-3 py-2.5" placeholder="R$ 0,00" /></label></div><button onClick={() => setShowAdd(false)} className="mt-2 flex h-11 items-center justify-center rounded-lg bg-primary text-sm font-medium text-primary-foreground hover:opacity-90">Salvar ativo</button></div></div></div>}
    </div>
  )
}

function Metric({ label, value, detail, trend, icon: Icon }: { label: string; value: string; detail: string; trend: string; icon: typeof Activity }) { return <div className="rounded-2xl border border-border bg-card p-5"><div className="flex items-start justify-between"><p className="text-xs text-muted-foreground">{label}</p><Icon className="size-4 text-muted-foreground" /></div><p className="mt-4 text-2xl font-semibold tracking-tight">{value}</p><p className={`mt-2 flex items-center gap-1 text-xs ${trend === 'up' ? 'text-primary' : 'text-muted-foreground'}`}>{trend === 'up' && <ArrowUpRight className="size-3" />}{detail}</p></div> }
function Opportunity({ item }: { item: typeof opportunities[number] }) { return <Link href={`/assets/${item.ticker}`} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-primary/50"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent font-mono text-xs font-semibold text-accent-foreground">{item.ticker.slice(0, 2)}</div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="font-medium">{item.ticker}</p><span className="text-xs text-muted-foreground">{item.className}</span></div><p className="mt-1 truncate text-xs text-muted-foreground">{item.detail}</p></div><div className="hidden text-right sm:block"><p className="font-semibold text-primary">{item.score}</p><p className="text-[10px] text-muted-foreground">{scoreLabel(item.score)}</p></div><ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" /></Link> }
function Insight({ icon: Icon, title, text, type }: { icon: typeof AlertTriangle; title: string; text: string; type: string }) { return <div className="flex gap-3 rounded-2xl border border-border bg-card p-4"><div className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${type === 'positive' ? 'bg-primary/10 text-primary' : 'bg-accent text-accent-foreground'}`}><Icon className="size-4" /></div><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p></div></div> }
