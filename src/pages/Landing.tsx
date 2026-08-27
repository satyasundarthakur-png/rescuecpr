import { Link } from '@tanstack/react-router'
import { courses } from '../data/seed'

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-clinical-50 to-white">
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="font-semibold text-clinical-700 text-lg">ResusPro Academy</div>
        <Link to="/login" className="text-sm font-medium text-clinical-600 hover:text-clinical-700">Sign in</Link>
      </header>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Master Resuscitation. Practice Decisions. Build Confidence.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Interactive training for CPR, BLS, ACLS, PALS, NALS and ATLS.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/login" className="px-5 py-2.5 rounded-lg bg-clinical-600 text-white font-medium hover:bg-clinical-700">
            Start Training
          </Link>
          <a href="#courses" className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 font-medium hover:bg-slate-50">
            Explore Courses
          </a>
        </div>
      </section>

      <section id="courses" className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <div key={c.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold tracking-wide text-clinical-600">{c.key}</div>
            <div className="mt-1 font-semibold text-slate-900">{c.subtitle}</div>
            <p className="mt-2 text-sm text-slate-500 line-clamp-3">{c.description}</p>
          </div>
        ))}
      </section>

      <footer className="max-w-6xl mx-auto px-6 pb-10 text-xs text-slate-400 border-t border-slate-100 pt-6">
        This educational application is for training and simulation purposes. It does not replace official
        certification courses, institutional protocols, clinical supervision, or current professional guidelines.
      </footer>
    </div>
  )
}
