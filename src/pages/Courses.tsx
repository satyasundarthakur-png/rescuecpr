import { Link } from '@tanstack/react-router'
import { courses } from '../data/seed'

export default function Courses() {
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold text-slate-900 mb-1">Course Library</h1>
      <p className="text-slate-500 text-sm mb-6">Six guideline-aligned training frameworks.</p>
      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <Link key={c.id} to="/courses/$courseId" params={{ courseId: c.id }}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-clinical-300 hover:shadow-sm transition">
            <div className="text-xs font-semibold tracking-wide text-clinical-600">{c.key}</div>
            <div className="mt-1 font-semibold text-slate-900">{c.subtitle}</div>
            <p className="mt-2 text-sm text-slate-500 line-clamp-2">{c.description}</p>
            <div className="mt-3 text-xs text-slate-400">{c.estimatedHours}h · {c.moduleIds.length} module(s)</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
