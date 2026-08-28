import { useMemo, useState } from 'react'
import {
  UserPlus, FilePlus2, ChevronDown, Download, Mail, BookPlus,
  Check, X, Pencil, ChevronRight, TrendingUp, TrendingDown,
} from 'lucide-react'
import { courses, questions } from '../../data/seed'

const demoLearners = [
  { name: 'A. Rao', course: 'BLS', completion: 92, avgScore: 88, atRisk: false },
  { name: 'S. Iyer', course: 'ACLS', completion: 41, avgScore: 54, atRisk: true },
  { name: 'K. Menon', course: 'PALS', completion: 76, avgScore: 79, atRisk: false },
  { name: 'R. Verma', course: 'BLS', completion: 38, avgScore: 49, atRisk: true },
]

const kpis: { label: string; value: string; trend: number[] }[] = [
  { label: 'Total learners', value: '128', trend: [98, 104, 109, 112, 118, 123, 128] },
  { label: 'Active this week', value: '54', trend: [61, 58, 60, 57, 55, 56, 54] },
  { label: 'Avg completion', value: '68%', trend: [59, 61, 63, 64, 66, 67, 68] },
  { label: 'Avg score', value: '77%', trend: [74, 75, 73, 76, 75, 78, 77] },
]

function Sparkline({ data }: { data: number[] }) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const points = data.map((v, i) => `${(i / (data.length - 1)) * 100},${28 - ((v - min) / range) * 24}`).join(' ')
  const up = data[data.length - 1]! >= data[0]!
  const color = up ? '#16A34A' : '#DC2626'
  return (
    <div className="flex items-center gap-1.5">
      <svg viewBox="0 0 100 28" className="w-16 h-7" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="flex items-center gap-0.5 text-[11px] font-semibold" style={{ color }}>
        {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
      </span>
    </div>
  )
}

export default function InstructorDashboard() {
  const [courseFilter, setCourseFilter] = useState<string>('all')
  const [atRiskOnly, setAtRiskOnly] = useState(false)
  const [sortByScore, setSortByScore] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [decisions, setDecisions] = useState<Record<string, 'approved' | 'rejected'>>({})
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [quickActionOpen, setQuickActionOpen] = useState(false)

  const filteredLearners = useMemo(() => {
    let list = demoLearners.filter((l) => (courseFilter === 'all' ? true : l.course === courseFilter))
    if (atRiskOnly) list = list.filter((l) => l.atRisk)
    if (sortByScore) list = [...list].sort((a, b) => a.avgScore - b.avgScore)
    return list
  }, [courseFilter, atRiskOnly, sortByScore])

  const pendingQuestions = questions.filter((q) => q.status !== 'published').slice(0, 5)

  function toggleSelected(name: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(name)) next.delete(name); else next.add(name)
      return next
    })
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === filteredLearners.length ? new Set() : new Set(filteredLearners.map((l) => l.name))))
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="sticky top-0 z-10 bg-slate-50/90 backdrop-blur-sm border-b border-slate-200 px-8 py-4 flex items-center justify-between gap-3 no-print">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Instructor Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">Learner performance and content status across {courses.length} courses.</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setQuickActionOpen((v) => !v)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-clinical-600 text-white text-sm font-semibold shadow-sm hover:bg-clinical-700 transition-colors"
          >
            <UserPlus size={15} className={quickActionOpen ? 'hidden' : ''} />
            {quickActionOpen ? 'Close' : 'Quick Add'} <ChevronDown size={14} className={`transition-transform ${quickActionOpen ? 'rotate-180' : ''}`} />
          </button>
          {quickActionOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
              <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-clinical-50 hover:text-clinical-700 text-left">
                <UserPlus size={15} /> Add Learner
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-clinical-50 hover:text-clinical-700 text-left border-t border-slate-100">
                <FilePlus2 size={15} /> Create Quiz Question
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-white border border-slate-200 rounded-xl p-4">
              <div className="text-xs text-slate-500">{k.label}</div>
              <div className="flex items-end justify-between mt-1">
                <div className="text-2xl font-semibold text-slate-900">{k.value}</div>
                <Sparkline data={k.trend} />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="text-sm font-medium text-slate-500">Learners at risk</div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="relative">
              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="appearance-none pl-3 pr-7 py-1.5 rounded-full border border-slate-300 text-xs font-medium text-slate-600 bg-white hover:border-clinical-400 focus:outline-none"
              >
                <option value="all">All courses</option>
                {courses.map((c) => <option key={c.id} value={c.key}>{c.key}</option>)}
              </select>
              <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
            <button
              onClick={() => setAtRiskOnly((v) => !v)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${atRiskOnly ? 'bg-alert-500 text-white border-alert-500' : 'border-slate-300 text-slate-600 hover:border-alert-500 hover:text-alert-500'}`}
            >
              Show At-Risk Only
            </button>
            <button
              onClick={() => setSortByScore((v) => !v)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${sortByScore ? 'bg-clinical-600 text-white border-clinical-600' : 'border-slate-300 text-slate-600 hover:border-clinical-400 hover:text-clinical-700'}`}
            >
              Sort by Score {sortByScore && '↑'}
            </button>
          </div>

          {selected.size > 0 && (
            <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-clinical-50 border border-clinical-100">
              <span className="text-xs font-medium text-clinical-700 mr-1">{selected.size} selected</span>
              <button className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-clinical-700 px-2 py-1 rounded-md hover:bg-white">
                <Mail size={12} /> Send Reminder Email
              </button>
              <button className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-clinical-700 px-2 py-1 rounded-md hover:bg-white">
                <Download size={12} /> Export Report
              </button>
              <button className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-clinical-700 px-2 py-1 rounded-md hover:bg-white">
                <BookPlus size={12} /> Assign Supplemental Module
              </button>
            </div>
          )}

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="pb-2 w-8">
                  <input type="checkbox" checked={selected.size > 0 && selected.size === filteredLearners.length} onChange={toggleAll} className="rounded border-slate-300" />
                </th>
                <th className="pb-2">Name</th><th className="pb-2">Course</th><th className="pb-2">Completion</th><th className="pb-2">Avg score</th>
              </tr>
            </thead>
            <tbody>
              {filteredLearners.map((l) => (
                <tr
                  key={l.name}
                  className={`border-b border-slate-50 last:border-0 ${l.atRisk ? 'bg-gradient-to-r from-red-50 via-red-50/60 to-transparent' : ''}`}
                >
                  <td className="py-2.5 pl-0">
                    <input type="checkbox" checked={selected.has(l.name)} onChange={() => toggleSelected(l.name)} className="rounded border-slate-300" />
                  </td>
                  <td className="py-2.5 font-medium text-slate-800">
                    {l.name}{l.atRisk && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-alert-500 text-white font-semibold">At risk</span>}
                  </td>
                  <td className="py-2.5 text-slate-600">{l.course}</td>
                  <td className="py-2.5 text-slate-600">{l.completion}%</td>
                  <td className="py-2.5 text-slate-600">{l.avgScore}%</td>
                </tr>
              ))}
              {filteredLearners.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-sm text-slate-400">No learners match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-sm font-medium text-slate-500 mb-3">Content pending clinical review</div>
          <div className="space-y-2">
            {pendingQuestions.map((q) => {
              const decision = decisions[q.id]
              const expanded = expandedId === q.id
              return (
                <div key={q.id} className={`rounded-lg border ${decision === 'approved' ? 'border-green-200 bg-green-50/40' : decision === 'rejected' ? 'border-red-200 bg-red-50/40' : 'border-slate-200'}`}>
                  <button
                    onClick={() => setExpandedId(expanded ? null : q.id)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 text-left"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <ChevronRight size={14} className={`text-slate-400 shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`} />
                      <span className="text-sm text-slate-700 truncate">{q.text}</span>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 capitalize shrink-0">
                      {decision ?? q.status}
                    </span>
                  </button>
                  {expanded && (
                    <div className="px-3 pb-3">
                      <div className="text-xs text-slate-500 mb-3 pl-6">{q.explanation}</div>
                      <div className="flex items-center gap-2 pl-6">
                        <button
                          onClick={() => setDecisions((d) => ({ ...d, [q.id]: 'approved' }))}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700"
                        >
                          <Check size={12} /> Approve
                        </button>
                        <button className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md border border-slate-300 text-slate-600 hover:border-clinical-400 hover:text-clinical-700">
                          <Pencil size={12} /> Edit
                        </button>
                        <button
                          onClick={() => setDecisions((d) => ({ ...d, [q.id]: 'rejected' }))}
                          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-md border border-red-300 text-alert-500 hover:bg-red-50"
                        >
                          <X size={12} /> Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
            {pendingQuestions.length === 0 && (
              <div className="text-sm text-slate-400 py-4 text-center">Nothing pending review.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
