import type { CompetencyBreakdown } from '../types/domain'

export interface CompetencyInputs {
  knowledge: number // 0-100, e.g. from quiz accuracy
  recognition: number
  decisionMaking: number // e.g. from algorithm/scenario accuracy
  technicalSequence: number
  teamCommunication: number
  timeCriticalResponse: number
  algorithmMastery: number
  simulationPerformance: number
}

// Configurable weights (Section 17) — sum to 1.
export const DEFAULT_WEIGHTS: Record<keyof CompetencyInputs, number> = {
  knowledge: 0.15,
  recognition: 0.15,
  decisionMaking: 0.15,
  technicalSequence: 0.1,
  teamCommunication: 0.1,
  timeCriticalResponse: 0.1,
  algorithmMastery: 0.15,
  simulationPerformance: 0.1,
}

export function computeCompetency(
  inputs: CompetencyInputs,
  weights: Record<keyof CompetencyInputs, number> = DEFAULT_WEIGHTS,
): CompetencyBreakdown {
  const overall = Object.entries(inputs).reduce((sum, [key, value]) => {
    return sum + value * (weights[key as keyof CompetencyInputs] ?? 0)
  }, 0)
  return { ...inputs, overall: Math.round(overall) }
}

/** Simple mastery update: exponential moving average toward the latest attempt score. */
export function updateMastery(previousMastery: number, latestScorePercent: number, alpha = 0.4): number {
  return Math.round(previousMastery * (1 - alpha) + latestScorePercent * alpha)
}
