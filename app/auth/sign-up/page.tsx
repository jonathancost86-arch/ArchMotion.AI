'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BarChart3 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
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
    const { error: signUpError } = await createClient().auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ?? `${window.location.origin}/auth/callback`,
        data: { cpf: normalizedCpf },
      },
    })

    if (signUpError) {
      const message = signUpError.message.toLowerCase()
      const friendlyMessage = signUpError.status === 429
        ? 'Muitas tentativas. Aguarde um momento.'
        : message.includes('email_not_authorized') || message.includes('not authorized')
          ? 'Este projeto ainda não está autorizado a enviar email para esse endereço. Use um email permitido pelo projeto ou configure o SMTP.'
          : message.includes('already registered') || message.includes('already exists')
            ? 'Este email já possui uma conta. Entre ou use outro email.'
            : message.includes('invalid')
              ? 'Confira o formato do email e os dados informados.'
              : 'Não foi possível conectar ao serviço de contas. Tente novamente em instantes.'
      setError(friendlyMessage)
      setLoading(false)
      return
    }

    router.push('/auth/login?created=1')
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
          <label className="flex flex-col gap-2 text-sm"><span className="font-medium">Email</span><input type="email" required autoComplete="email" placeholder="voce@email.com" value={email} onChange={(event) => setEmail(event.target.value)} className="h-11 rounded-xl border border-input bg-background px-3 outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring" /></label>
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
