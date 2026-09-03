export type Horizon = 'curto' | 'medio' | 'longo'
export type AgentResult = { agent: string; available: boolean; score: number; confidence: number; positive: string[]; negative: string[]; risks: string[]; conclusion: string; error?: string }
export interface AIProvider { analyzeFundamentals(input: unknown, horizon: Horizon): Promise<AgentResult>; analyzeMacro(input: unknown, horizon: Horizon): Promise<AgentResult>; analyzeValuation(input: unknown, horizon: Horizon): Promise<AgentResult>; analyzeRisk(input: unknown, horizon: Horizon): Promise<AgentResult>; generateConsensus(input: unknown, agents: AgentResult[]): Promise<AgentResult> }

const unavailable = (agent: string, error = 'Provedor não configurado'): AgentResult => ({ agent, available: false, score: 0, confidence: 0, positive: [], negative: [], risks: ['Análise indisponível neste momento.'], conclusion: 'Sem conclusão automática.', error })

export function createAIProvider(): AIProvider {
  async function run(agent: string): Promise<AgentResult> {
    if (!process.env.AI_GATEWAY_API_KEY) return unavailable(agent)
    return unavailable(agent, 'Integração de modelo pendente')
  }
  return {
    analyzeFundamentals: () => run('fundamentalista'),
    analyzeMacro: () => run('macroeconomia'),
    analyzeValuation: () => run('valuation'),
    analyzeRisk: () => run('risco'),
    async generateConsensus(_input, agents) {
      const available = agents.filter((agent) => agent.available)
      if (!available.length) return unavailable('estrategista', 'Nenhum agente disponível')
      const score = Math.round(available.reduce((sum, agent) => sum + agent.score, 0) / available.length)
      return { agent: 'estrategista', available: true, score, confidence: Math.round(available.reduce((sum, agent) => sum + agent.confidence, 0) / available.length), positive: available.flatMap((agent) => agent.positive).slice(0, 5), negative: available.flatMap((agent) => agent.negative).slice(0, 5), risks: available.flatMap((agent) => agent.risks).slice(0, 5), conclusion: 'Consenso calculado apenas com os agentes disponíveis.' }
    },
  }
}
