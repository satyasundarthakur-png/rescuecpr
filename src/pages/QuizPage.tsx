import { useMemo, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { questions as allQuestions } from '../data/seed'
import { gradeAnswer, summarize, type QuizAnswerRecord } from '../engines/quizEngine'

export default function QuizPage() {
  const { quizId } = useParams({ strict: false })
  // quizId maps 1:1 to a module in this demo data model.
  const moduleId = quizId?.replace('quiz-', 'mod-')
  const items = useMemo(() => allQuestions.filter((q) => q.moduleId === moduleId), [moduleId])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([])
  const [startedAt, setStartedAt] = useState(Date.now())
  const [showFeedback, setShowFeedback] = useState(false)

  if (items.length === 0) return <div className="p-8">No questions available for this quiz.</div>

  const question = items[index]!
  const finished = index >= items.length

  function submit() {
    const correct = gradeAnswer(question, selected)
    setAnswers((a) => [...a, { questionId: question.id, selectedOptionIds: selected, correct, responseTimeMs: Date.now() - startedAt }])
    setShowFeedback(true)
  }

  function next() {
    setShowFeedback(false)
    setSelected([])
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

        {!showFeedback ? (
          <button onClick={submit} disabled={selected.length === 0}
            className="mt-5 px-4 py-2 bg-clinical-600 text-white rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-clinical-700">
            Submit
          </button>
        ) : (
          <div className="mt-5">
            <div className={`text-sm font-medium ${answers.at(-1)!.correct ? 'text-success-500' : 'text-alert-500'}`}>
              {answers.at(-1)!.correct ? 'Correct' : 'Not quite'}
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
