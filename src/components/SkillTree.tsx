import { Link } from '@tanstack/react-router'
import { Lock, Check, ChevronRight } from 'lucide-react'
import type { Course } from '../types/domain'

export interface PathNode {
  course: Course
  unlocked: boolean
  completed: boolean
  progress: number
}

export default function SkillTree({ tiers }: { tiers: { label: string; nodes: PathNode[] }[] }) {
  return (
    <div className="space-y-8">
      {tiers.map((tier, tierIndex) => (
        <div key={tier.label}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{tier.label}</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {tier.nodes.map((node) => {
              const content = (
                <div
                  className={`relative rounded-2xl border-2 p-4 h-full transition-all ${
                    node.unlocked
                      ? node.completed
                        ? 'border-emerald-300 bg-emerald-50/50 hover:shadow-sm'
                        : 'border-clinical-200 bg-white hover:border-clinical-400 hover:shadow-sm'
                      : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold tracking-wide ${node.unlocked ? 'text-clinical-600' : 'text-slate-400'}`}>
                      {node.course.key}
                    </span>
                    {node.completed ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white"><Check size={11} /></span>
                    ) : !node.unlocked ? (
                      <Lock size={14} className="text-slate-400" />
                    ) : null}
                  </div>
                  <div className={`font-semibold text-sm ${node.unlocked ? 'text-slate-900' : 'text-slate-500'}`}>{node.course.subtitle}</div>
                  {node.unlocked && (
                    <div className="mt-2.5">
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full rounded-full bg-clinical-500" style={{ width: `${node.progress}%` }} />
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{node.progress}% complete</div>
                    </div>
                  )}
                  {!node.unlocked && (
                    <div className="text-[11px] text-slate-400 mt-2">Complete earlier courses to unlock</div>
                  )}
                </div>
              )
              return node.unlocked ? (
                <Link key={node.course.id} to="/courses/$courseId" params={{ courseId: node.course.id }}>{content}</Link>
              ) : (
                <div key={node.course.id} className="cursor-not-allowed">{content}</div>
              )
            })}
          </div>
          {tierIndex < tiers.length - 1 && (
            <div className="flex justify-center py-2">
              <ChevronRight size={18} className="text-slate-300 rotate-90" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
