import { useMemo, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Search, List, Radar as RadarIcon, ChevronDown, Zap, BookOpen } from 'lucide-react'
import { learningObjectives, modules, demoMasteryByObjective } from '../data/seed'
import RadarChart from '../components/RadarChart'

const GROUPS: { title: string; courses: string[] }[] = [
  { title: 'Basic Resuscitation', courses: ['CPR', 'BLS'] },
  { title: 'Advanced Protocols', courses: ['ACLS', 'PALS', 'NALS', 'ATLS'] },
]

function masteryColor(value: number) {
  if (value >= 80) return '#16A34A'
  if (value >= 70) return '#D97706'
  return '#EF6152'
}

function BenchmarkTrack({ value }: { value: number }) {
  const color = masteryColor(value)
  return (
    <div className="relative h-2.5 bg-slate-100 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${value}%`, backgroundColor: color }} />
      {/* benchmark grid lines */}
      <div className="absolute inset-y-0 border-l border-dashed border-slate-400/50" style={{ left: '70%' }} />
      <div className="absolute inset-y-0 border-l border-dashed border-slate-400/50" style={{ left: '90%' }} />
    </div>
  )
}

export default function Progress() {
  const [view, setView] = useState<'bars' | 'radar'>('bars')
  const [filter, setFilter] = useState<'all' | 'review' | 'mastered'>('all')
  const [query, setQuery] = useState('')
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(GROUPS.map((g) => g.title)))

  const enriched = useMemo(() => learningObjectives.map((lo) => ({
    ...lo,
    value: demoMasteryByObjective[lo.id] ?? 0,
    module: modules.find((m) => m.courseId === `course-${lo.courseKey.toLowerCase()}`),
  })), [])

  const filtered = enriched.filter((lo) => {
    if (filter === 'review' && lo.value >= 70) return false
    if (filter === 'mastered' && lo.value < 90) return false
    if (query && !lo.label.toLowerCase().includes(query.toLowerCase()) && !lo.courseKey.toLowerCase().includes(query.toLowerCase())) return false
    return true
  })

  function toggleGroup(title: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(title)) next.delete(title); else next.add(title)
      return next
    })
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Your Progress</h1>
          <p className="text-slate-500 text-sm mt-1">Mastery by learning objective.</p>
        </div>
        <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 p-0.5">
          <button
            onClick={() => setView('bars')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${view === 'bars' ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
          >
            <List size={13} /> Bar List
          </button>
          <button
            onClick={() => setView('radar')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${view === 'radar' ? 'bg-clinical-600 text-white shadow-sm' : 'text-slate-500 hover:text-clinical-700'}`}
          >
            <RadarIcon size={13} /> Radar Chart
          </button>
        </div>
      </div>

      {/* filter pills + search */}
      <div className="flex flex-wrap items-center gap-2">
        {([
          ['all', 'All Objectives'],
          ['review', 'Needs Review'],
          ['mastered', 'Mastered'],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${filter === key ? 'bg-clinical-600 text-white border-clinical-600' : 'border-slate-300 text-slate-600 hover:border-clinical-400 hover:text-clinical-700'}`}
          >
            {label}
          </button>
        ))}
        <div className="relative ml-auto">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search competencies…"
            className="pl-7 pr-3 py-1.5 rounded-full border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-clinical-300 w-48"
          />
        </div>
      </div>

      {view === 'radar' ? (
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center">
          <RadarChart
            axes={filtered.map((lo) => ({ label: lo.courseKey, value: lo.value }))}
            color="#DC2626"
          />
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {filtered.map((lo) => (
              <span key={lo.id} className="text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${masteryColor(lo.value)}18`, color: masteryColor(lo.value) }}>
                {lo.courseKey} {lo.value}%
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {GROUPS.map((group) => {
            const groupObjectives = filtered.filter((lo) => group.courses.includes(lo.courseKey))
            if (groupObjectives.length === 0) return null
            const isOpen = openGroups.has(group.title)
            return (
              <div key={group.title} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-5 py-3.5 border-b border-slate-100"
                >
                  <span className="text-sm font-semibold text-slate-800">{group.title}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="p-5 space-y-5">
                    {groupObjectives.map((lo) => (
                      <div key={lo.id}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-slate-700">{lo.label}</span>
                          <span className="font-semibold" style={{ color: masteryColor(lo.value) }}>{lo.value}%</span>
                        </div>
                        <BenchmarkTrack value={lo.value} />
                        {lo.value < 70 && lo.module && (
                          <div className="flex items-center gap-2 mt-2">
                            <Link
                              to="/module/$moduleId" params={{ moduleId: lo.module.id }}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:border-clinical-400 hover:text-clinical-700"
                            >
                              <BookOpen size={12} /> Review Module
                            </Link>
                            {lo.module.scenarioId && (
                              <Link
                                to="/simulation/$scenarioId" params={{ scenarioId: lo.module.scenarioId }}
                                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-clinical-600 text-white hover:bg-clinical-700"
                              >
                                <Zap size={12} /> Launch Drill
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div className="text-center text-sm text-slate-400 py-8">No competencies match these filters.</div>
          )}
        </div>
      )}
    </div>
  )
}
