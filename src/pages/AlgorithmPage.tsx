import { useMemo, useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { LayoutList, Workflow } from 'lucide-react'
import { algorithms } from '../data/seed'
import { advance, choose, currentNode, score, startAlgorithm, type AlgorithmMode, type AlgorithmRunState } from '../engines/algorithmEngine'
import BLSFlowchart from '../components/BLSFlowchart'

export default function AlgorithmPage() {
  const { algorithmId } = useParams({ strict: false })
  const algorithm = algorithms.find((a) => a.id === algorithmId)
  const [mode, setMode] = useState<AlgorithmMode>('learn')
  const [view, setView] = useState<'practice' | 'flowchart'>(algorithm?.courseKey === 'BLS' ? 'flowchart' : 'practice')
  const [state, setState] = useState<AlgorithmRunState | null>(algorithm ? startAlgorithm(algorithm) : null)
  const [feedback, setFeedback] = useState<string | null>(null)

  const node = useMemo(() => (algorithm && state ? currentNode(algorithm, state) : null), [algorithm, state])

  if (!algorithm || !state) return <div className="p-8">Algorithm not found.</div>

  const finished = state.finishedAt !== null
  const result = finished ? score(state) : null

  function restart() {
    setState(startAlgorithm(algorithm!))
    setFeedback(null)
  }

  function handleChoice(choiceId: string) {
    const chosen = node!.choices.find((c) => c.id === choiceId)!
    setFeedback(mode !== 'test' ? chosen.feedback : null)
    setState(choose(algorithm!, state!, choiceId))
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-slate-900">{algorithm.title}</h1>
        <div className="flex items-center gap-3">
          {algorithm.courseKey === 'BLS' && (
            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5">
              <button
                onClick={() => setView('flowchart')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${view === 'flowchart' ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
              >
                <Workflow size={13} /> Flowchart
              </button>
              <button
                onClick={() => setView('practice')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${view === 'practice' ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
              >
                <LayoutList size={13} /> Interactive Practice
              </button>
            </div>
          )}
          {view === 'practice' && (
            <div className="flex gap-2">
              {(['learn', 'practice', 'test'] as AlgorithmMode[]).map((m) => (
                <button key={m} onClick={() => { setMode(m); restart() }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${mode === m ? 'bg-clinical-600 text-white' : 'border border-slate-300 text-slate-600'}`}>
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {algorithm.reference.isDemoOnly && (
        <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 mt-3">
          DEMO / NOT FOR CLINICAL USE — placeholder decision logic, pending clinical reviewer approval.
        </div>
      )}

      {view === 'flowchart' && algorithm.courseKey === 'BLS' ? (
        <BLSFlowchart />
      ) : (
      <div className="grid md:grid-cols-[1fr_1.4fr] gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs font-medium text-slate-500 mb-3">Algorithm Map</div>
          <ol className="space-y-1 text-sm">
            {Object.values(algorithm.nodes).map((n) => (
              <li key={n.id} className={`px-2 py-1 rounded ${state.visitedNodeIds.includes(n.id) ? 'bg-clinical-50 text-clinical-700' : 'text-slate-400'} ${n.id === state.currentNodeId ? 'font-semibold' : ''}`}>
                {n.type} — {n.title}
              </li>
            ))}
          </ol>
          <button onClick={restart} className="mt-4 text-xs text-slate-500 hover:text-alert-500">Restart Algorithm</button>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6">
          {!finished ? (
            <>
              <div className="text-xs uppercase tracking-wide text-clinical-600 font-semibold">{node!.type}</div>
              <h2 className="text-lg font-semibold text-slate-900 mt-1">{node!.title}</h2>
              <p className="text-sm text-slate-600 mt-2">{node!.description}</p>

              {mode === 'learn' && node!.instructorNote && (
                <p className="text-xs text-slate-500 mt-3 italic">{node!.instructorNote}</p>
              )}

              {node!.choices.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {node!.choices.map((c) => (
                    <button key={c.id} onClick={() => handleChoice(c.id)}
                      className="w-full text-left px-4 py-3 border border-slate-300 rounded-lg text-sm hover:border-clinical-400 hover:bg-clinical-50">
                      {c.label}
                    </button>
                  ))}
                </div>
              ) : (
                <button onClick={() => setState(advance(algorithm!, state!))}
                  className="mt-5 px-4 py-2 bg-clinical-600 text-white rounded-lg text-sm font-medium hover:bg-clinical-700">
                  Continue
                </button>
              )}

              {feedback && (
                <div className="mt-4 text-sm bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="font-medium text-slate-700 mb-1">Review this decision</div>
                  {feedback}
                </div>
              )}
            </>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Algorithm complete</h2>
              <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                <div><div className="text-slate-500 text-xs">Accuracy</div><div className="font-semibold">{result!.accuracy}%</div></div>
                <div><div className="text-slate-500 text-xs">Errors</div><div className="font-semibold">{result!.errorCount}</div></div>
                <div><div className="text-slate-500 text-xs">Time</div><div className="font-semibold">{Math.round(result!.timeMs / 1000)}s</div></div>
              </div>
              <button onClick={restart} className="mt-5 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  )
}
