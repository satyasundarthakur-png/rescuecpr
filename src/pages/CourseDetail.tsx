import { Link, useParams } from '@tanstack/react-router'
import { courses, modules } from '../data/seed'

export default function CourseDetail() {
  const { courseId } = useParams({ strict: false })
  const course = courses.find((c) => c.id === courseId)
  const courseModules = modules.filter((m) => m.courseId === courseId)

  if (!course) return <div className="p-8">Course not found.</div>

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div>
        <div className="text-xs font-semibold tracking-wide text-clinical-600">{course.key}</div>
        <h1 className="text-2xl font-semibold text-slate-900">{course.subtitle}</h1>
        <p className="text-slate-600 mt-2">{course.description}</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="text-sm font-medium text-slate-500 mb-2">Objectives</div>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          {course.objectives.map((o) => <li key={o}>{o}</li>)}
        </ul>
      </div>

      <div className="space-y-3">
        <div className="text-sm font-medium text-slate-500">Modules</div>
        {courseModules.map((m) => (
          <Link key={m.id} to={`/module/${m.id}`}
            className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-clinical-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">{m.title}</div>
                <div className="text-xs text-slate-500 mt-1">{m.description}</div>
              </div>
              <div className="text-xs text-slate-400 capitalize">{m.difficulty} · {m.estimatedMinutes}m</div>
            </div>
            <div className="mt-2 flex gap-2 text-[11px] text-slate-500">
              {m.videoId && <span className="px-2 py-0.5 bg-slate-100 rounded">Video</span>}
              {m.algorithmId && <span className="px-2 py-0.5 bg-slate-100 rounded">Algorithm</span>}
              {m.scenarioId && <span className="px-2 py-0.5 bg-slate-100 rounded">Simulation</span>}
              {m.quizId && <span className="px-2 py-0.5 bg-slate-100 rounded">Quiz</span>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
