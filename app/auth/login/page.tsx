'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, LockKeyhole, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const normalizedCpf = identifier.replace(/\D/g, '')
    const { error } = await createClient().auth.signInWithPassword({ email: `${normalizedCpf}@cpf.atlas.local`, password })
    if (error) setError(error.status === 429 ? 'Muitas tentativas. Aguarde um momento.' : 'Email ou senha inválidos.')
    else router.push('/')
    setLoading(false)
  }

  return <main className="flex min-h-screen items-center justify-center bg-background p-5"><div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-2"><section className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15"><BarChart3 className="size-5" /></div><span className="font-mono text-sm font-bold tracking-[0.2em]">ATLAS</span></div><div><p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] opacity-70">Private investment intelligence</p><h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-[-0.04em]">Decisões mais claras começam com uma visão mais completa.</h1><p className="mt-5 max-w-sm text-sm leading-6 opacity-75">Seu espaço privado para acompanhar patrimônio, risco, fundamentos e oportunidades.</p></div><p className="text-xs opacity-60">Dados para reflexão. Decisões sempre suas.</p></section><section className="p-7 sm:p-10"><div className="mb-10 lg:hidden"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BarChart3 className="size-5" /></div><span className="font-mono text-sm font-bold tracking-[0.2em]">ATLAS</span></div></div><div className="mb-8"><p className="text-sm text-muted-foreground">Ambiente privado</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Bem-vindo de volta.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Acesse seu painel pessoal de investimentos.</p></div><form onSubmit={handleSubmit} className="flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm"><span className="font-medium">CPF</span><input type="text" required autoComplete="username" inputMode="numeric" placeholder="000.000.000-00" value={identifier} onChange={(event) => setIdentifier(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none transition focus:ring-2 focus:ring-ring" placeholder="voce@exemplo.com" /></label><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Senha</span><input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none transition focus:ring-2 focus:ring-ring" placeholder="Sua senha" /></label>{error && <p className="text-sm text-destructive">{error}</p>}<button disabled={loading} className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"><LockKeyhole className="size-4" />{loading ? 'Validando acesso...' : 'Entrar no ATLAS'}</button></form><p className="mt-6 text-center text-sm text-muted-foreground">Ainda não tem uma conta? <a href="/auth/sign-up" className="font-medium text-foreground underline underline-offset-4">Criar conta</a></p><div className="mt-8 flex items-start gap-3 rounded-xl bg-accent p-4"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-xs leading-5 text-muted-foreground">Acesso restrito. O ATLAS não executa compras, vendas ou transferências financeiras.</p></div></section></div></main>
}
