'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, LockKeyhole, ShieldCheck } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await createClient().auth.signInWithPassword({ email, password })
    if (error) setError(error.status === 429 ? 'Muitas tentativas. Aguarde um momento.' : 'Email ou senha inválidos.')
    else router.push('/')
    setLoading(false)
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setError('')
    const { error } = await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
      },
    })
    if (error) {
      setError('Não foi possível iniciar o login com Google.')
      setLoading(false)
    }
  }

  return <main className="flex min-h-screen items-center justify-center bg-background p-5"><div className="grid w-full max-w-4xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl lg:grid-cols-2"><section className="hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-primary-foreground/15"><BarChart3 className="size-5" /></div><span className="font-mono text-sm font-bold tracking-[0.2em]">ATLAS</span></div><div><p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] opacity-70">Private investment intelligence</p><h1 className="max-w-sm text-4xl font-semibold leading-tight tracking-[-0.04em]">Decisões mais claras começam com uma visão mais completa.</h1><p className="mt-5 max-w-sm text-sm leading-6 opacity-75">Seu espaço privado para acompanhar patrimônio, risco, fundamentos e oportunidades.</p></div><p className="text-xs opacity-60">Dados para reflexão. Decisões sempre suas.</p></section><section className="p-7 sm:p-10"><div className="mb-10 lg:hidden"><div className="flex items-center gap-3"><div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BarChart3 className="size-5" /></div><span className="font-mono text-sm font-bold tracking-[0.2em]">ATLAS</span></div></div><div className="mb-8"><p className="text-sm text-muted-foreground">Ambiente privado</p><h2 className="mt-2 text-3xl font-semibold tracking-tight">Bem-vindo de volta.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Acesse seu painel pessoal de investimentos.</p></div><form onSubmit={handleSubmit} className="flex flex-col gap-5"><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Email</span><input type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none transition focus:ring-2 focus:ring-ring" placeholder="voce@exemplo.com" /></label><label className="flex flex-col gap-2 text-sm"><span className="font-medium">Senha</span><input type="password" required autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none transition focus:ring-2 focus:ring-ring" placeholder="Sua senha" /></label>{error && <p className="text-sm text-destructive">{error}</p>}<button disabled={loading} className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-60"><LockKeyhole className="size-4" />{loading ? 'Validando acesso...' : 'Entrar no ATLAS'}</button></form><div className="relative my-6"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div><div className="relative flex justify-center text-xs"><span className="bg-card px-3 text-muted-foreground">ou continue com</span></div></div><button type="button" onClick={handleGoogleLogin} disabled={loading} className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-input bg-background text-sm font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"><svg aria-hidden="true" className="size-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.35 12.23c0-.72-.06-1.42-.18-2.09H12v3.96h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.26Z"/><path fill="#34A853" d="M12 21.67c2.63 0 4.84-.87 6.46-2.36l-3.14-2.45c-.87.58-1.98.92-3.32.92-2.55 0-4.71-1.72-5.49-4.04H3.27v2.53A9.75 9.75 0 0 0 12 21.67Z"/><path fill="#FBBC05" d="M6.51 13.74a5.86 5.86 0 0 1 0-3.48V7.73H3.27a9.77 9.77 0 0 0 0 8.54l3.24-2.53Z"/><path fill="#EA4335" d="M12 6.22c1.43 0 2.72.49 3.74 1.46l2.8-2.8C16.84 3.2 14.63 2.33 12 2.33a9.75 9.75 0 0 0-8.73 5.4l3.24 2.53C7.29 7.94 9.45 6.22 12 6.22Z"/></svg>Continuar com Google</button><div className="mt-8 flex items-start gap-3 rounded-xl bg-accent p-4"><ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" /><p className="text-xs leading-5 text-muted-foreground">Acesso restrito. O ATLAS não executa compras, vendas ou transferências financeiras.</p></div></section></div></main>
}
