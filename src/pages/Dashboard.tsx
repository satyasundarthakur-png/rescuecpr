import { Link } from '@tanstack/react-router'
import { CheckCircle2, Target, BookOpenCheck, FlaskConical, Clock3, Flame, RotateCcw, CalendarCheck } from 'lucide-react'
import { modules, learningObjectives, demoMasteryByObjective } from '../data/seed'
import { computeCompetency } from '../engines/competencyEngine'
import { useAuth } from '../hooks/useAuth'
import RadialProgress from '../components/RadialProgress'
import Sparkline from '../components/Sparkline'

// Demo metrics — in production these come from progress/mastery tables, not hardcoded.
const demoInputs = {
  knowledge: 82, recognition: 74, decisionMaking: 76, technicalSequence: 70,
  teamCommunication: 68, timeCriticalResponse: 71, algorithmMastery: 91, simulationPerformance: 73,
}

const completionTrend = [38, 42, 45, 48, 51, 53, 54]
const CONTINUE_PROGRESS = 68

// Streak — demo: last 7 days of activity (true = practiced that day).
const streakDays = [true, true, false, true, true, true, true]
const CURRENT_STREAK = 4
const DAILY_GOAL = 3
const DAILY_DONE = 2

// Spaced-repetition demo state — mastery + days since last practiced per objective.
// Review interval scales with mastery: higher mastery = longer interval before it's "due".
const demoDaysSincePractice: Record<string, number> = { 'lo-CPR': 12, 'lo-BLS': 3, 'lo-ACLS': 9, 'lo-PALS': 2, 'lo-NALS': 15, 'lo-ATLS': 6 }
function reviewIntervalDays(mastery: number) {
  if (mastery >= 90) return 14
  if (mastery >= 80) return 7
  if (mastery >= 70) return 5
  return 3
}

export default function Dashboard() {
  const { user } = useAuth()
  const competency = computeCompetency(demoInputs)
  const continueModule = modules[1]!
  const minutesLeft = Math.max(1, Math.round(continueModule.estimatedMinutes * (1 - CONTINUE_PROGRESS / 100)))

  const performance = Object.entries(competency)
    .filter(([k]) => k !== 'overall')
    .map(([k, v]) => ({ key: k, label: k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()), value: v as number }))
    .sort((a, b) => b.value - a.value)

  const lowest = [...performance].sort((a, b) => a.value - b.value).slice(0, 2)

  const dueForReview = learningObjectives
    .map((lo) => ({ ...lo, mastery: demoMasteryByObjective[lo.id] ?? 0, daysSince: demoDaysSincePractice[lo.id] ?? 0 }))
    .filter((lo) => lo.daysSince >= reviewIntervalDays(lo.mastery))
    .sort((a, b) => (b.daysSince - reviewIntervalDays(b.mastery)) - (a.daysSince - reviewIntervalDays(a.mastery)))

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Hero banner — greeting + Continue Learning merged */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-clinical-700 via-clinical-600 to-brand-blue-700 p-7">
        <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="text-white/70 text-sm font-medium">Welcome back{user ? `, ${user.fullName}` : ''}</div>
            <h1 className="text-2xl font-semibold text-white mt-0.5">Here's where your training stands</h1>
            <div className="mt-4 inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-xl px-4 py-3 backdrop-blur-sm">
              <div className="flex-1">
                <div className="text-[11px] uppercase tracking-wide text-white/60 font-semibold">Continue Learning</div>
                <div className="font-semibold text-white">{continueModule.title}</div>
                <span className="inline-flex items-center gap-1 mt-1 text-[11px] font-medium text-gold-300">
                  <Clock3 size={11} /> ~{minutesLeft} mins left
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <RadialProgress value={CONTINUE_PROGRESS} size={64} color="#ffffff" trackColor="rgba(255,255,255,0.2)" />
            <Link
              to="/module/$moduleId" params={{ moduleId: continueModule.id }}
              className="glow-white px-5 py-2.5 rounded-lg bg-white text-clinical-700 text-sm font-semibold shadow-sm hover:bg-clinical-50"
            >
              Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Streak + daily goal */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 text-orange-500 shrink-0">
            <Flame size={20} fill="currentColor" />
          </span>
          <div className="flex-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-900">{CURRENT_STREAK}</span>
              <span className="text-xs text-slate-500">day streak</span>
            </div>
            <div className="flex items-center gap-1 mt-1.5">
              {streakDays.map((active, i) => (
                <span key={i} className={`h-1.5 w-4 rounded-full ${active ? 'bg-orange-400' : 'bg-slate-100'}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-4">
          <RadialProgress value={(DAILY_DONE / DAILY_GOAL) * 100} size={44} strokeWidth={4} color="#0284C7" trackColor="#E0F2FE" label={`${DAILY_DONE}/${DAILY_GOAL}`} />
          <div>
            <div className="text-sm font-semibold text-slate-900">Daily goal</div>
            <div className="text-xs text-slate-500">{DAILY_GOAL - DAILY_DONE > 0 ? `${DAILY_GOAL - DAILY_DONE} more drill${DAILY_GOAL - DAILY_DONE > 1 ? 's' : ''} to hit today's goal` : "Today's goal complete"}</div>
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-xl border border-clinical-100 bg-clinical-50/60 p-4 flex items-center gap-3">
          <RadialProgress value={54} size={48} strokeWidth={4.5} color="#DC2626" trackColor="#FEE2E2" />
          <div>
            <div className="text-xs text-slate-500">Overall completion</div>
            <div className="text-lg font-semibold text-slate-900">54%</div>
          </div>
        </div>
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 flex items-center gap-3">
          <RadialProgress value={competency.overall} size={48} strokeWidth={4.5} color="#16A34A" trackColor="#DCFCE7" />
          <div>
            <div className="text-xs text-slate-500">Competency score</div>
            <div className="text-lg font-semibold text-slate-900">{competency.overall}%</div>
          </div>
        </div>
        <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-blue-500 text-white shrink-0">
            <BookOpenCheck size={18} />
          </span>
          <div>
            <div className="text-xs text-slate-500">Modules completed</div>
            <div className="text-lg font-semibold text-slate-900">3 / 6</div>
          </div>
        </div>
        <div className="rounded-xl border border-gold-100 bg-gold-100/40 p-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-500 text-white shrink-0">
              <FlaskConical size={18} />
            </span>
            <div>
              <div className="text-xs text-slate-500">Simulations completed</div>
              <div className="text-lg font-semibold text-slate-900">2</div>
            </div>
          </div>
          <Sparkline data={completionTrend} showTrendIcon={false} />
        </div>
      </div>

      {/* Spaced-repetition review queue */}
      {dueForReview.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="text-sm font-medium text-slate-500 mb-3 flex items-center gap-1.5">
            <RotateCcw size={14} /> Due for review
          </div>
          <div className="flex flex-wrap gap-2.5">
            {dueForReview.map((lo) => (
              <div key={lo.id} className="flex items-center gap-2.5 border border-slate-200 rounded-lg pl-3 pr-2 py-2">
                <div>
                  <div className="text-sm font-medium text-slate-800">{lo.courseKey}</div>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <CalendarCheck size={11} /> {lo.daysSince} days since last practice
                  </div>
                </div>
                <span className="text-xs font-semibold text-clinical-600 hover:text-clinical-700 cursor-pointer px-2 py-1 rounded-md hover:bg-clinical-50">
                  Review
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Side-by-side equal-height cards */}
      <div className="grid md:grid-cols-2 gap-6 items-stretch">
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col">
          <div className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-1.5">
            <Target size={14} /> Your Performance
          </div>
          <div className="space-y-3 flex-1">
            {performance.map((p) => {
              const color = p.value >= 80 ? '#16A34A' : p.value >= 65 ? '#D97706' : '#DC2626'
              return (
                <div key={p.key}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-600">{p.label}</span>
                    <span className="font-semibold" style={{ color }}>{p.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full rounded-full transition-[width] duration-500" style={{ width: `${p.value}%`, backgroundColor: color }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-white border-2 border-amber-300 rounded-xl p-5 flex flex-col relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
          <div className="text-sm font-medium text-amber-700 mb-2 flex items-center gap-1.5 pl-1">
            <Flame size={14} /> Recommended Practice — Focus Area
          </div>
          <p className="text-sm text-slate-600 pl-1">
            <strong className="text-slate-800">{lowest.map((l) => l.label).join(' and ')}</strong> are your lowest-scoring
            dimensions. Revisit the ACLS shockable-rhythm scenario to reinforce decision speed.
          </p>
          <div className="flex-1" />
          <Link
            to="/simulation/$scenarioId" params={{ scenarioId: 'scn-acls-1' }}
            className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-amber-700 hover:text-amber-800 pl-1"
          >
            <CheckCircle2 size={15} /> Practice now →
          </Link>
        </div>
      </div>
    </div>
  )
}
