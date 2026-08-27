import type { Question } from '../types/domain'

export interface QuizAnswerRecord {
  questionId: string
  selectedOptionIds: string[]
  correct: boolean
  responseTimeMs: number
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
  return { total, correct, scorePercent, avgResponseTimeMs }
}
