import { Link } from '@tanstack/react-router'
import { courses } from '../data/seed'

const courseAccents = [
  'from-clinical-500 to-clinical-600',
  'from-brand-blue-500 to-brand-blue-700',
  'from-gold-500 to-gold-600',
]

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

      <section className="relative overflow-hidden bg-gradient-to-br from-clinical-600 via-clinical-500 to-brand-blue-700">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="relative max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold tracking-wide uppercase mb-5">
            Simulation-based resuscitation training
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Master Resuscitation. Practice Decisions. Build Confidence.
          </h1>
          <p className="mt-4 text-lg text-clinical-50/90">
            Interactive training for CPR, BLS, ACLS, PALS, NALS and ATLS.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/login" className="glow-white px-5 py-2.5 rounded-lg bg-white text-clinical-700 font-semibold shadow-sm hover:bg-clinical-50">
              Start Training
            </Link>
            <a href="#courses" className="px-5 py-2.5 rounded-lg border border-white/40 text-white font-medium transition-colors hover:bg-white/10 hover:border-white/70">
              Explore Courses
            </a>
          </div>
        </div>
      </section>

      <section id="courses" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold text-slate-900 mb-6">Courses</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {courses.map((c, i) => (
            <div key={c.id} className="glow-card group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <div className={`h-1.5 bg-gradient-to-r ${courseAccents[i % courseAccents.length]}`} />
              <div className="p-5">
                <div className="text-xs font-semibold tracking-wide text-clinical-600">{c.key}</div>
                <div className="mt-1 font-semibold text-slate-900 group-hover:text-clinical-700 transition-colors">{c.subtitle}</div>
                <p className="mt-2 text-sm text-slate-500 line-clamp-3">{c.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-10 text-xs text-slate-400 border-t border-slate-100 pt-6">
        This educational application is for training and simulation purposes. It does not replace official
        certification courses, institutional protocols, clinical supervision, or current professional guidelines.
      </footer>
    </div>
  )
}
