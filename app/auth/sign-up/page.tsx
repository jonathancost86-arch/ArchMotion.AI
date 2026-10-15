'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BarChart3 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const normalizedCpf = cpf.replace(/\D/g, '')

    if (normalizedCpf.length !== 11) {
      setError('Informe um CPF válido com 11 dígitos.')
      return
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    setLoading(true)
    const response = await fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ cpf: normalizedCpf, password }),
    })
    const result = await response.json()

    if (!response.ok) {
      setError(result.error ?? 'Não foi possível criar a conta agora.')
      setLoading(false)
      return
    }

    const { error: signInError } = await createClient().auth.signInWithPassword({
      email: `${normalizedCpf}@cpf.atlas.local`,
      password,
    })

    if (signInError) {
      setError('A conta foi criada, mas não foi possível iniciar a sessão. Entre novamente com seu CPF e senha.')
      setLoading(false)
      return
    }

    router.replace('/')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-5">
      <section className="w-full max-w-lg rounded-3xl border border-border bg-card p-7 shadow-2xl sm:p-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><BarChart3 className="size-5" /></div>
          <span className="font-mono text-sm font-bold tracking-[0.2em]">ATLAS</span>
        </div>
        <p className="text-sm text-muted-foreground">Ambiente privado</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Crie sua conta.</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Seus dados ficam separados e protegidos na sua própria conta.</p>
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm"><span className="font-medium">CPF</span><input type="text" required inputMode="numeric" autoComplete="off" placeholder="000.000.000-00" value={cpf} onChange={(event) => setCpf(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring" /></label>
          <label className="flex flex-col gap-2 text-sm"><span className="font-medium">Senha</span><input type="password" required minLength={8} autoComplete="new-password" placeholder="Mínimo de 8 caracteres" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring" /></label>
          <label className="flex flex-col gap-2 text-sm"><span className="font-medium">Confirme a senha</span><input type="password" required minLength={8} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring" /></label>
          {error && <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          <button type="submit" disabled={loading} className="h-11 rounded-xl bg-primary text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Criando conta...' : 'Criar conta'}</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">Já tem uma conta? <Link href="/auth/login" className="font-medium text-foreground underline underline-offset-4">Entrar</Link></p>
      </section>
    </main>
  )
}
