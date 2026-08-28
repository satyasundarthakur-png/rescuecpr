import { useState } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown, ShieldAlert, PhoneCall, HeartPulse, Zap, Wind, ClipboardList, Stethoscope, Baby, Activity, GraduationCap } from 'lucide-react'
import EcgTrace, { type EcgPattern } from './EcgTrace'

export type FlowchartTheme = 'blue' | 'red' | 'amber' | 'violet' | 'teal' | 'gray' | 'green' | 'orange'

const THEME: Record<FlowchartTheme, { bg: string; border: string; text: string; iconBg: string }> = {
  blue: { bg: '#E0F2FE', border: '#0284C7', text: '#0369A1', iconBg: '#0284C7' },
  red: { bg: '#FEE2E2', border: '#DC2626', text: '#B91C1C', iconBg: '#DC2626' },
  amber: { bg: '#FEF3C7', border: '#D97706', text: '#B45309', iconBg: '#D97706' },
  violet: { bg: '#F3E8FF', border: '#7C3AED', text: '#6D28D9', iconBg: '#7C3AED' },
  teal: { bg: '#CCFBF1', border: '#0D9488', text: '#0F766E', iconBg: '#0D9488' },
  gray: { bg: '#F8FAFC', border: '#CBD5E1', text: '#64748B', iconBg: '#64748B' },
  green: { bg: '#DCFCE7', border: '#16A34A', text: '#15803D', iconBg: '#16A34A' },
  orange: { bg: '#FFEDD5', border: '#EA580C', text: '#C2410C', iconBg: '#EA580C' },
}

const ICONS = {
  shield: ShieldAlert,
  phone: PhoneCall,
  heart: HeartPulse,
  zap: Zap,
  wind: Wind,
  clipboard: ClipboardList,
  stethoscope: Stethoscope,
  baby: Baby,
  activity: Activity,
} as const

export type FlowchartIcon = keyof typeof ICONS

export interface FlowchartBranch {
  theme: FlowchartTheme
  label: string
  bullets: string[]
  ecg?: EcgPattern
}

export interface FlowchartSection {
  theme: FlowchartTheme
  icon: FlowchartIcon
  eyebrow: string
  title: string
  bullets: string[]
  badge?: string
  branches?: FlowchartBranch[]
  teachingNote?: string
}

export interface FlowchartData {
  disclaimer: string
  sections: FlowchartSection[]
}

function Arrow() {
  return (
    <div className="flex justify-center py-1.5">
      <ChevronDown size={20} className="text-slate-300" />
    </div>
  )
}

function SectionCard({ section }: { section: FlowchartSection }) {
  const [showTeaching, setShowTeaching] = useState(false)
  const t = THEME[section.theme]
  const Icon = ICONS[section.icon]
  return (
    <div className="rounded-2xl border-2 p-5" style={{ backgroundColor: t.bg, borderColor: t.border }}>
      <div className="flex items-center gap-2 mb-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg text-white shrink-0" style={{ backgroundColor: t.iconBg }}>
          <Icon size={15} />
        </span>
        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: t.text }}>{section.eyebrow}</span>
      </div>
      <div className="font-semibold text-slate-900 mb-2">{section.title}</div>
      <div className="text-sm text-slate-700 space-y-1.5">
        {section.bullets.map((b, i) => <p key={i}>{b}</p>)}
      </div>
      {section.badge && (
        <p className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-full bg-white/70 text-xs font-semibold" style={{ color: t.text }}>
          <Zap size={12} /> {section.badge}
        </p>
      )}
      {section.branches && section.branches.length > 0 && (
        <div className={`grid gap-3 mt-3 ${section.branches.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {section.branches.map((br, i) => {
            const bt = THEME[br.theme]
            return (
              <div key={i} className="rounded-xl border-2 p-3.5" style={{ backgroundColor: bt.bg, borderColor: bt.border }}>
                <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: bt.text }}>{br.label}</div>
                {br.ecg && <EcgTrace pattern={br.ecg} color={bt.border} className="w-full h-8 my-1.5" />}
                <div className="text-sm text-slate-700 space-y-1">
                  {br.bullets.map((b, j) => <p key={j}>{b}</p>)}
                </div>
              </div>
            )
          })}
        </div>
      )}
      {section.teachingNote && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setShowTeaching((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline"
            style={{ color: t.text }}
          >
            <GraduationCap size={13} /> {showTeaching ? 'Hide teaching note' : 'Why this matters'}
          </button>
          {showTeaching && (
            <div className="mt-2 text-xs text-slate-600 bg-white/60 rounded-lg p-3 leading-relaxed">
              {section.teachingNote}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function AlgorithmFlowchart({ data, extra }: { data: FlowchartData; extra?: ReactNode }) {
  return (
    <div className="space-y-0">
      <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-5">
        {data.disclaimer}
      </div>
      {data.sections.map((section, i) => (
        <div key={i}>
          <SectionCard section={section} />
          {i < data.sections.length - 1 && <Arrow />}
        </div>
      ))}
      {extra}
    </div>
  )
}
