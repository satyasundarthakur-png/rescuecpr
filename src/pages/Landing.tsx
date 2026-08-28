import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import {
  HeartPulse, Baby, ShieldAlert, Stethoscope, Zap,
  ShieldCheck, ArrowRight, Clock3, GraduationCap, BookOpen,
} from 'lucide-react'
import { courses, modules } from '../data/seed'

const courseAccents = [
  'from-clinical-500 to-clinical-600',
  'from-brand-blue-500 to-brand-blue-700',
  'from-gold-500 to-gold-600',
]

const courseIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  CPR: HeartPulse, BLS: HeartPulse, ACLS: Zap, PALS: Baby, NALS: Baby, ATLS: ShieldAlert,
}

function DecisionPreview() {
  const [choice, setChoice] = useState<'yes' | 'no' | null>(null)
  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-5 shadow-2xl">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-white/60">Live Preview · ACLS</span>
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/80 text-white"><Zap size={11} /></span>
      </div>
      <div className="text-sm font-medium text-white mb-3">Rhythm check — is it shockable?</div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setChoice('yes')}
          className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${choice === 'yes' ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-white/25 text-white/80 hover:bg-white/10'}`}
        >
          VF / pulseless VT
        </button>
        <button
          onClick={() => setChoice('no')}
          className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${choice === 'no' ? 'bg-orange-500 border-orange-500 text-white' : 'border-white/25 text-white/80 hover:bg-white/10'}`}
        >
          PEA / Asystole
        </button>
      </div>
      {choice && (
        <div className="mt-3 text-xs text-white/75 bg-black/20 rounded-lg p-2.5" style={{ animation: 'fade-in 0.25s ease' }}>
          {choice === 'yes'
            ? 'Correct branch — resume CPR while charging, then deliver 1 shock immediately.'
            : 'Correct branch — resume CPR immediately and search for a reversible cause.'}
        </div>
      )}
      <div className="mt-3 text-[11px] text-white/40">Sign in to try the full interactive algorithm →</div>
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-clinical-600 text-white font-bold text-sm">R+</span>
          <span className="font-semibold text-slate-900 text-lg">ResusPro Academy</span>
        </div>
        <Link to="/login" className="text-sm font-medium text-clinical-600 hover:text-clinical-700">Sign in</Link>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-clinical-700 to-brand-blue-700">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wide uppercase mb-5">
              Simulation-based resuscitation training
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Master Resuscitation. Practice Decisions. Build Confidence.
            </h1>
            <p className="mt-4 text-lg text-clinical-50/90">
              Interactive training for CPR, BLS, ACLS, PALS, NALS and ATLS.
            </p>
            <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
              <Link to="/login" className="glow-white px-5 py-2.5 rounded-lg bg-white text-clinical-700 font-semibold shadow-sm hover:bg-clinical-50">
                Start Training
              </Link>
              <a
                href="#courses"
                className="px-5 py-2.5 rounded-lg bg-sky-500/90 backdrop-blur-sm border border-sky-300/40 text-white font-semibold shadow-sm hover:bg-sky-400 transition-colors"
              >
                Explore Courses
              </a>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <DecisionPreview />
          </div>
        </div>

        {/* trust banner */}
        <div className="relative border-t border-white/10 bg-black/15">
          <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-white/70">
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Guideline-informed training content</span>
            <span className="flex items-center gap-1.5"><BookOpen size={13} /> {courses.length} structured courses</span>
            <span className="flex items-center gap-1.5"><GraduationCap size={13} /> Free & open access</span>
          </div>
        </div>
      </section>

      <section id="courses" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Courses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {courses.map((c, i) => {
            const Icon = courseIcons[c.key] ?? Stethoscope
            const firstModule = modules.find((m) => m.courseId === c.id)
            return (
              <div key={c.id} className="glow-card group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col">
                <div className={`relative h-20 bg-gradient-to-br ${courseAccents[i % courseAccents.length]} flex items-center justify-between px-4`}>
                  <Icon size={30} className="text-white/90" />
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white/80">{c.key}</span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="font-semibold text-slate-900 group-hover:text-clinical-700 transition-colors">{c.subtitle}</div>
                  <p className="mt-2 text-sm text-slate-500 line-clamp-3 flex-1">{c.description}</p>

                  {firstModule && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 capitalize">
                        {firstModule.difficulty}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        <Clock3 size={10} /> {firstModule.estimatedMinutes} mins
                      </span>
                    </div>
                  )}

                  <Link
                    to="/login"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clinical-600 hover:text-clinical-700"
                  >
                    Launch Module <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-10">
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 flex items-start gap-3">
          <ShieldCheck size={18} className="text-slate-400 shrink-0 mt-0.5" />
          <p className="text-xs text-slate-500 leading-relaxed">
            This educational application is for training and simulation purposes. It does not replace official
            certification courses, institutional protocols, clinical supervision, or current professional guidelines.
          </p>
        </div>
      </footer>
    </div>
  )
}
