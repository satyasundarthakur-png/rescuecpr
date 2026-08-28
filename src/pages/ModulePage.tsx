import { useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import { Workflow, Stethoscope, ClipboardCheck, Info } from 'lucide-react'
import { modules, videos } from '../data/seed'
import VideoPlayer from '../components/VideoPlayer'

export default function ModulePage() {
  const { moduleId } = useParams({ strict: false })
  const module = modules.find((m) => m.id === moduleId)
  const video = videos.find((v) => v.id === module?.videoId)
  const [showPreview, setShowPreview] = useState(false)

  if (!module) return <div className="p-8">Module not found.</div>

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{module.title}</h1>
        <p className="text-slate-600 mt-1">{module.description}</p>
      </div>

      {video && <VideoPlayer video={video} />}

      <div className="flex flex-wrap gap-3">
        {module.algorithmId && (
          <div
            className="relative"
            onMouseEnter={() => setShowPreview(true)}
            onMouseLeave={() => setShowPreview(false)}
          >
            <Link
              to="/algorithm/$algorithmId"
              params={{ algorithmId: module.algorithmId }}
              className="glow-clinical inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-clinical-600 to-clinical-500 text-white text-sm font-semibold shadow-sm hover:brightness-105"
            >
              <Workflow size={16} />
              Open Interactive Algorithm
              <Info size={13} className="opacity-70" />
            </Link>
            {showPreview && (
              <div className="absolute z-10 top-full mt-2 left-0 w-72 rounded-xl border border-slate-200 bg-white shadow-lg p-4 text-left">
                <div className="text-xs font-semibold text-clinical-700 mb-1">What's inside</div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A branching, step-by-step decision algorithm you click through — each choice reveals the
                  next clinical step, so you can practice the exact decision sequence, not just watch it.
                </p>
              </div>
            )}
          </div>
        )}
        {module.scenarioId && (
          <Link
            to="/simulation/$scenarioId"
            params={{ scenarioId: module.scenarioId }}
            className="glow-card inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:border-clinical-300 hover:text-clinical-700"
          >
            <Stethoscope size={16} />
            Enter Scenario
          </Link>
        )}
        {module.quizId && (
          <Link
            to="/quiz/$quizId"
            params={{ quizId: module.quizId }}
            className="glow-card inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:border-gold-500/60 hover:text-clinical-700"
          >
            <ClipboardCheck size={16} />
            Take Quiz
          </Link>
        )}
      </div>
    </div>
  )
}
