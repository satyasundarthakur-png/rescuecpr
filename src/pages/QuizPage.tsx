import { useMemo, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { AlertTriangle } from 'lucide-react'
import { questions as allQuestions } from '../data/seed'
import { gradeAnswer, summarize, type Confidence, type QuizAnswerRecord } from '../engines/quizEngine'

const CONFIDENCE_OPTIONS: { value: Confidence; label: string }[] = [
  { value: 'low', label: 'Not sure' },
  { value: 'medium', label: 'Fairly sure' },
  { value: 'high', label: 'Very confident' },
]

export default function QuizPage() {
  const { quizId } = useParams({ strict: false })
  // quizId maps 1:1 to a module in this demo data model.
  const moduleId = quizId?.replace('quiz-', 'mod-')
  const items = useMemo(() => allQuestions.filter((q) => q.moduleId === moduleId), [moduleId])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [confidence, setConfidence] = useState<Confidence | null>(null)
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([])
  const [startedAt, setStartedAt] = useState(Date.now())
  const [showFeedback, setShowFeedback] = useState(false)

  if (items.length === 0) return <div className="p-8">No questions available for this quiz.</div>

  const question = items[index]!
  const finished = index >= items.length

  function submit() {
    const correct = gradeAnswer(question, selected)
    setAnswers((a) => [...a, { questionId: question.id, selectedOptionIds: selected, correct, responseTimeMs: Date.now() - startedAt, confidence: confidence ?? undefined }])
    setShowFeedback(true)
  }

  function next() {
    setShowFeedback(false)
    setSelected([])
    setConfidence(null)
    setStartedAt(Date.now())
    setIndex((i) => i + 1)
  }

  if (finished) {
    const summary = summarize(answers)
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-xl p-6 text-center">
          <h1 className="text-xl font-semibold text-slate-900">Quiz complete</h1>
          <div className="text-4xl font-bold text-clinical-600 mt-3">{summary.scorePercent}%</div>
          <div className="text-sm text-slate-500 mt-1">{summary.correct} of {summary.total} correct</div>
        </div>

        {summary.miscalibrated.length > 0 && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-center gap-2 text-amber-800 font-semibold text-sm">
              <AlertTriangle size={15} /> Priority review — confident but incorrect
            </div>
            <p className="text-xs text-amber-700 mt-1.5">
              You marked {summary.miscalibrated.length} answer{summary.miscalibrated.length > 1 ? 's' : ''} "very confident" but got
              {summary.miscalibrated.length > 1 ? ' them' : ' it'} wrong — these are worth reviewing first, since they're the gaps you don't
              yet know you have.
            </p>
            <ul className="mt-3 space-y-1.5">
              {summary.miscalibrated.map((a) => {
                const q = items.find((it) => it.id === a.questionId)
                return q ? <li key={a.questionId} className="text-sm text-slate-700 pl-1">• {q.text}</li> : null
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="text-xs text-slate-400 mb-2">Question {index + 1} of {items.length}</div>
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <div className="font-medium text-slate-900">{question.text}</div>
        <div className="mt-4 space-y-2">
          {question.options.map((opt) => (
            <label key={opt.id} className={`flex items-center gap-3 px-4 py-3 border rounded-lg text-sm cursor-pointer ${selected.includes(opt.id) ? 'border-clinical-400 bg-clinical-50' : 'border-slate-300'}`}>
              <input
                type="radio"
                name="option"
                checked={selected.includes(opt.id)}
                disabled={showFeedback}
                onChange={() => setSelected([opt.id])}
              />
              {opt.text}
            </label>
          ))}
        </div>

        {selected.length > 0 && !showFeedback && (
          <div className="mt-4">
            <div className="text-xs font-medium text-slate-500 mb-1.5">How confident are you?</div>
            <div className="flex gap-2">
              {CONFIDENCE_OPTIONS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setConfidence(c.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${confidence === c.value ? 'bg-clinical-600 text-white border-clinical-600' : 'border-slate-300 text-slate-600 hover:border-clinical-400'}`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {!showFeedback ? (
          <button onClick={submit} disabled={selected.length === 0 || !confidence}
            className="mt-5 px-4 py-2 bg-clinical-600 text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-clinical-700">
            Submit
          </button>
        ) : (
          <div className="mt-5">
            <div className={`text-sm font-medium ${answers.at(-1)!.correct ? 'text-success-500' : 'text-alert-500'}`}>
              {answers.at(-1)!.correct ? 'Correct' : 'Not quite'}
              {answers.at(-1)!.confidence === 'high' && !answers.at(-1)!.correct && (
                <span className="ml-2 text-xs font-normal text-amber-600">— flagged for priority review</span>
              )}
            </div>
            <p className="text-sm text-slate-600 mt-1">{question.explanation}</p>
            <button onClick={next} className="mt-4 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
              {index + 1 === items.length ? 'See results' : 'Next question'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
