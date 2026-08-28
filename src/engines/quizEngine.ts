import type { Question } from '../types/domain'

export type Confidence = 'low' | 'medium' | 'high'

export interface QuizAnswerRecord {
  questionId: string
  selectedOptionIds: string[]
  correct: boolean
  responseTimeMs: number
  confidence?: Confidence | undefined
}

export function gradeAnswer(question: Question, selectedOptionIds: string[]): boolean {
  const correctIds = question.options.filter((o) => o.isCorrect).map((o) => o.id).sort()
  const selected = [...selectedOptionIds].sort()
  return correctIds.length === selected.length && correctIds.every((id, i) => id === selected[i])
}

export function summarize(answers: QuizAnswerRecord[]) {
  const total = answers.length
  const correct = answers.filter((a) => a.correct).length
  const scorePercent = total === 0 ? 0 : Math.round((correct / total) * 100)
  const avgResponseTimeMs = total === 0 ? 0 : Math.round(answers.reduce((s, a) => s + a.responseTimeMs, 0) / total)
  // Miscalibrated: answered "high" confidence but got it wrong — these are the highest-priority
  // items to review, since the learner doesn't yet know what they don't know.
  const miscalibrated = answers.filter((a) => !a.correct && a.confidence === 'high')
  return { total, correct, scorePercent, avgResponseTimeMs, miscalibrated }
}
