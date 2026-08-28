import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { List, GitBranch } from 'lucide-react'
import { courses } from '../data/seed'
import SkillTree, { type PathNode } from '../components/SkillTree'

// Demo progress/unlock state — production reads from the learner_progress table.
const demoProgress: Record<string, number> = { CPR: 100, BLS: 81, ACLS: 34, PALS: 12, NALS: 0, ATLS: 0 }
const FOUNDATION_KEYS = ['CPR', 'BLS']

export default function Courses() {
  const [view, setView] = useState<'list' | 'path'>('list')

  const foundationComplete = (demoProgress['BLS'] ?? 0) >= 70

  const tiers = [
    {
      label: 'Foundation',
      nodes: courses.filter((c) => FOUNDATION_KEYS.includes(c.key)).map((c): PathNode => ({
        course: c, unlocked: true, completed: (demoProgress[c.key] ?? 0) >= 100, progress: demoProgress[c.key] ?? 0,
      })),
    },
    {
      label: 'Advanced Protocols',
      nodes: courses.filter((c) => !FOUNDATION_KEYS.includes(c.key)).map((c): PathNode => ({
        course: c, unlocked: foundationComplete, completed: (demoProgress[c.key] ?? 0) >= 100, progress: demoProgress[c.key] ?? 0,
      })),
    },
  ]

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 mb-1">Course Library</h1>
          <p className="text-slate-500 text-sm">Six guideline-aligned training frameworks.</p>
        </div>
        <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5">
          <button
            onClick={() => setView('list')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${view === 'list' ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
          >
            <List size={13} /> List View
          </button>
          <button
            onClick={() => setView('path')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${view === 'path' ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
          >
            <GitBranch size={13} /> Path View
          </button>
        </div>
      </div>

      {view === 'list' ? (
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
      ) : (
        <SkillTree tiers={tiers} />
      )}
    </div>
  )
}
