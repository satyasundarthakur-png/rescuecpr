import { useState } from 'react'
import { useParams } from '@tanstack/react-router'
import { scenarios } from '../data/seed'
import type { ScenarioAttemptStep } from '../types/domain'

export default function SimulationPage() {
  const { scenarioId } = useParams({ strict: false })
  const scenario = scenarios.find((s) => s.id === scenarioId)
  const [nodeId, setNodeId] = useState(scenario?.startNodeId ?? null)
  const [steps, setSteps] = useState<ScenarioAttemptStep[]>([])
  const [startedAt] = useState(Date.now())

  if (!scenario) return <div className="p-8">Scenario not found.</div>

  const node = nodeId ? scenario.nodes[nodeId] : null

  function choose(choiceId: string) {
    const choice = node!.choices.find((c) => c.id === choiceId)!
    setSteps((s) => [...s, { nodeId: node!.id, choiceId, correct: choice.isCorrect, timestamp: new Date().toISOString(), responseTimeMs: Date.now() - startedAt }])
    setNodeId(choice.nextNodeId)
  }

  const finished = !node
  const correctCount = steps.filter((s) => s.correct).length

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{scenario.title}</h1>
        <p className="text-sm text-slate-500 mt-1">{scenario.initialCondition}</p>
      </div>
      {scenario.reference.isDemoOnly && (
        <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          DEMO / NOT FOR CLINICAL USE — placeholder scenario logic.
        </div>
      )}

      {!finished ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <div className="font-medium text-slate-900">{node!.prompt}</div>
          <div className="mt-4 space-y-2">
            {node!.choices.map((c) => (
              <button key={c.id} onClick={() => choose(c.id)}
                className="w-full text-left px-4 py-3 border border-slate-300 rounded-lg text-sm hover:border-clinical-400 hover:bg-clinical-50">
                {c.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-6">
          <h2 className="font-semibold text-slate-900">Debrief</h2>
          <div className="text-sm text-slate-500 mt-1">{correctCount} of {steps.length} decisions aligned with the training pathway.</div>
          <div className="mt-4 space-y-3 text-sm">
            {scenario.debriefPrompts.map((p) => (
              <div key={p}>
                <div className="font-medium text-slate-700">{p}</div>
                <div className="text-slate-500">Reviewed collaboratively — no single decision here should feel like a verdict.</div>
              </div>
            ))}
          </div>
          <button onClick={() => { setNodeId(scenario.startNodeId); setSteps([]) }}
            className="mt-5 px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50">
            Try again
          </button>
        </div>
      )}
    </div>
  )
}
