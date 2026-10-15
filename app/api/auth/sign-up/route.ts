import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function cpfEmail(cpf: string) {
  return `${cpf}@cpf.atlas.local`
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const cpf = String(body.cpf ?? '').replace(/\D/g, '')
    const password = String(body.password ?? '')

    if (cpf.length !== 11) {
      return NextResponse.json({ error: 'Informe um CPF válido com 11 dígitos.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'A senha deve ter pelo menos 8 caracteres.' }, { status: 400 })
    }

    const admin = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    )
    const email = cpfEmail(cpf)
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { cpf },
    })

    if (error) {
      const message = error.message.toLowerCase()
      if (message.includes('already') || message.includes('exists')) {
        return NextResponse.json({ error: 'Este CPF já possui uma conta.' }, { status: 409 })
      }
      return NextResponse.json({ error: 'Não foi possível criar a conta agora.' }, { status: 400 })
    }

    return NextResponse.json({ userId: data.user.id })
  } catch {
    return NextResponse.json({ error: 'Não foi possível conectar ao serviço de contas.' }, { status: 500 })
  }
}
