import { useState, type ReactNode } from 'react'
import { ChevronDown, ChevronRight, GraduationCap } from 'lucide-react'
import EcgTrace, { type EcgPattern } from './EcgTrace'

export function Arrow() {
  return (
    <div className="flex justify-center py-1.5">
      <ChevronDown size={20} className="text-slate-300" />
    </div>
  )
}

export function FlowCard({
  icon, eyebrow, title, bg, border, text, iconBg, children, teachingNote,
}: {
  icon: ReactNode
  eyebrow: string
  title: string
  bg: string
  border: string
  text: string
  iconBg: string
  children: ReactNode
  teachingNote?: string
}) {
  const [showTeaching, setShowTeaching] = useState(false)
  return (
    <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: bg, borderColor: border }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: iconBg }}>
          {icon}
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: text }}>{eyebrow}</span>
      </div>
      <div className="font-semibold text-slate-900 mb-2">{title}</div>
      <div className="text-sm text-slate-700 space-y-1.5">{children}</div>
      {teachingNote && (
        <div className="mt-3">
          <button type="button" onClick={() => setShowTeaching((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline" style={{ color: text }}>
            <GraduationCap size={13} /> {showTeaching ? 'Hide teaching note' : 'Why this matters'}
          </button>
          {showTeaching && <div className="mt-2 text-xs text-slate-600 bg-white/60 rounded-lg p-3 leading-relaxed">{teachingNote}</div>}
        </div>
      )}
    </div>
  )
}

export function RhythmCard({
  theme, label, pattern, criteria, action,
}: { theme: 'green' | 'orange'; label: string; pattern: EcgPattern; criteria: string; action: string }) {
  const [expanded, setExpanded] = useState(false)
  const colors = theme === 'green'
    ? { bg: '#DCFCE7', border: '#16A34A', text: '#15803D' }
    : { bg: '#FFEDD5', border: '#EA580C', text: '#C2410C' }
  return (
    <div className="rounded-xl border-2 p-3.5" style={{ backgroundColor: colors.bg, borderColor: colors.border }}>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs font-bold uppercase tracking-wide" style={{ color: colors.text }}>{label}</div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[10px] font-semibold inline-flex items-center gap-0.5 hover:underline"
          style={{ color: colors.text }}
        >
          {expanded ? 'Hide criteria' : 'Rhythm criteria'} <ChevronRight size={11} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
      </div>
      <EcgTrace pattern={pattern} color={colors.border} className="w-full h-8 my-1.5" />
      <p className="text-sm text-slate-700">{action}</p>
      {expanded && (
        <div className="mt-2 text-xs text-slate-600 bg-white/70 rounded-lg p-2.5 leading-relaxed">{criteria}</div>
      )}
    </div>
  )
}
