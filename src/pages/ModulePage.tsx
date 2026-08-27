import { Link, useParams } from '@tanstack/react-router'
import { modules, videos } from '../data/seed'
import VideoPlayer from '../components/VideoPlayer'

export default function ModulePage() {
  const { moduleId } = useParams({ strict: false })
  const module = modules.find((m) => m.id === moduleId)
  const video = videos.find((v) => v.id === module?.videoId)

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
          <Link to={`/algorithm/${module.algorithmId}`} className="px-4 py-2 rounded-lg bg-clinical-600 text-white text-sm font-medium hover:bg-clinical-700">
            Open Interactive Algorithm
          </Link>
        )}
        {module.scenarioId && (
          <Link to={`/simulation/${module.scenarioId}`} className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50">
            Enter Scenario
          </Link>
        )}
        {module.quizId && (
          <Link to={`/quiz/${module.quizId}`} className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium hover:bg-slate-50">
            Take Quiz
          </Link>
        )}
      </div>
    </div>
  )
}
