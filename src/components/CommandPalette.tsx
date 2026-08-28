import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import {
  Search, LayoutDashboard, BookOpen, LineChart, Award, GraduationCap,
  Workflow, Stethoscope, ClipboardCheck, CornerDownLeft,
} from 'lucide-react'
import { courses, modules, algorithms, scenarios, questions } from '../data/seed'

interface PaletteItem {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  to: string
  params?: Record<string, string>
  keywords: string
}

function buildIndex(): PaletteItem[] {
  const pages: PaletteItem[] = [
    { id: 'page-dashboard', title: 'Dashboard', subtitle: 'Your training overview', icon: <LayoutDashboard size={15} />, to: '/dashboard', keywords: 'dashboard home overview' },
    { id: 'page-courses', title: 'Courses', subtitle: 'Course library', icon: <BookOpen size={15} />, to: '/courses', keywords: 'courses library path skill tree' },
    { id: 'page-progress', title: 'Progress', subtitle: 'Mastery by objective', icon: <LineChart size={15} />, to: '/progress', keywords: 'progress mastery competency radar' },
    { id: 'page-certificates', title: 'Certificates', subtitle: 'Training completion records', icon: <Award size={15} />, to: '/certificates', keywords: 'certificates certification' },
    { id: 'page-instructor', title: 'Instructor Dashboard', subtitle: 'Learner performance & review', icon: <GraduationCap size={15} />, to: '/instructor', keywords: 'instructor teach review learners' },
  ]

  const courseItems: PaletteItem[] = courses.map((c) => ({
    id: `course-${c.id}`, title: c.subtitle, subtitle: `${c.key} course`, icon: <BookOpen size={15} />,
    to: '/courses/$courseId', params: { courseId: c.id }, keywords: `${c.key} ${c.subtitle} ${c.description}`,
  }))

  const moduleItems: PaletteItem[] = modules.map((m) => ({
    id: `module-${m.id}`, title: m.title, subtitle: 'Module', icon: <BookOpen size={15} />,
    to: '/module/$moduleId', params: { moduleId: m.id }, keywords: `${m.title} ${m.description} module`,
  }))

  const algorithmItems: PaletteItem[] = algorithms.map((a) => ({
    id: `algo-${a.id}`, title: a.title, subtitle: `${a.courseKey} algorithm`, icon: <Workflow size={15} />,
    to: '/algorithm/$algorithmId', params: { algorithmId: a.id }, keywords: `${a.title} ${a.courseKey} algorithm flowchart`,
  }))

  const scenarioItems: PaletteItem[] = scenarios.map((s) => ({
    id: `scn-${s.id}`, title: s.title, subtitle: `${s.courseKey} simulation`, icon: <Stethoscope size={15} />,
    to: '/simulation/$scenarioId', params: { scenarioId: s.id }, keywords: `${s.title} ${s.courseKey} simulation scenario drill`,
  }))

  const quizModuleIds = new Set(questions.map((q) => q.moduleId).filter(Boolean))
  const quizItems: PaletteItem[] = modules
    .filter((m) => quizModuleIds.has(m.id))
    .map((m) => ({
      id: `quiz-${m.id}`, title: `${m.title} — Quiz`, subtitle: 'Quiz', icon: <ClipboardCheck size={15} />,
      to: '/quiz/$quizId', params: { quizId: m.quizId ?? `quiz-${m.id.replace('mod-', '')}` }, keywords: `${m.title} quiz test`,
    }))

  return [...pages, ...courseItems, ...moduleItems, ...algorithmItems, ...scenarioItems, ...quizItems]
}

export default function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState('')
  const [highlighted, setHighlighted] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const index = useMemo(buildIndex, [])

  const results = useMemo(() => {
    if (!query.trim()) return index.slice(0, 8)
    const q = query.toLowerCase()
    return index.filter((item) => item.keywords.toLowerCase().includes(q)).slice(0, 8)
  }, [query, index])

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onOpenChange(!open)
      }
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  useEffect(() => {
    if (open) {
      setQuery('')
      setHighlighted(0)
      setTimeout(() => inputRef.current?.focus(), 10)
    }
  }, [open])

  useEffect(() => setHighlighted(0), [query])

  function go(item: PaletteItem) {
    navigate({ to: item.to, params: item.params } as never)
    onOpenChange(false)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted((h) => Math.min(results.length - 1, h + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted((h) => Math.max(0, h - 1)) }
    if (e.key === 'Enter' && results[highlighted]) { e.preventDefault(); go(results[highlighted]) }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => onOpenChange(false)}>
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2.5 px-4 py-3 border-b border-slate-100">
          <Search size={16} className="text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Jump to a course, module, simulation…"
            className="flex-1 text-sm outline-none placeholder:text-slate-400"
          />
          <kbd className="hidden sm:inline text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">esc</kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-1.5">
          {results.length === 0 && (
            <div className="px-4 py-6 text-center text-sm text-slate-400">No matches.</div>
          )}
          {results.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item)}
              onMouseEnter={() => setHighlighted(i)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${i === highlighted ? 'bg-clinical-50' : ''}`}
            >
              <span className={`flex h-7 w-7 items-center justify-center rounded-md shrink-0 ${i === highlighted ? 'bg-clinical-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                {item.icon}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-slate-800 truncate">{item.title}</div>
                <div className="text-xs text-slate-400 truncate">{item.subtitle}</div>
              </div>
              {i === highlighted && <CornerDownLeft size={13} className="text-clinical-500 shrink-0" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
