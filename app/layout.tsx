import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ATLAS Invest — Inteligência de investimentos',
  description: 'Painel privado para análise de carteira, oportunidades e risco.',
  generator: 'ATLAS Invest',
}

export const viewport: Viewport = {
  colorScheme: 'dark light',
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#101312' }, { media: '(prefers-color-scheme: light)', color: '#f4f6f3' }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" className="bg-background"><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
