import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { GraduationCap, ShieldCheck, Lightbulb, LogIn, UserRound, Lock, Mail } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import EcgTrace from '../components/EcgTrace'
import type { Role } from '../types/domain'

const roleCards: { role: Role; icon: typeof UserRound; blurb: string }[] = [
  { role: 'learner', icon: UserRound, blurb: 'Access modules, quizzes & track certificates' },
  { role: 'instructor', icon: GraduationCap, blurb: 'Manage rosters, assign drills & view analytics' },
  { role: 'admin', icon: ShieldCheck, blurb: 'Configure courses, manage users & system settings' },
]

export default function Login() {
  const { signInDemo } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleEmailLogin(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!supabase) return
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else navigate({ to: '/dashboard' })
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0F172A] to-[#1E293B] px-4 overflow-hidden">
      {/* subtle pulse-line background graphic */}
      <div className="absolute inset-x-0 top-1/4 opacity-[0.08] pointer-events-none">
        <EcgTrace pattern="sinus" color="#ffffff" className="w-full h-24" />
      </div>
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_25%_25%,white_1px,transparent_1px)] [background-size:26px_26px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-5">
          <svg viewBox="0 0 100 100" className="w-12 h-12 mb-2" fill="none">
            <rect width="100" height="100" rx="24" fill="url(#loginLogoGrad)" />
            <path d="M50 74 C 34 62, 20 50, 20 34 C 20 24, 28 17, 37 17 C 43 17, 48 21, 50 27 C 52 21, 57 17, 63 17 C 72 17, 80 24, 80 34 C 80 50, 66 62, 50 74 Z" fill="#fff" />
            <polyline points="28,40 38,40 43,30 50,52 56,36 61,40 74,40" fill="none" stroke="#C21F3E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="loginLogoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#26407A" />
              </linearGradient>
            </defs>
          </svg>
          <div className="font-semibold text-white text-lg">ResusPro Academy</div>
          <p className="text-sm text-white/50 mt-0.5">Sign in to continue training.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
          {isSupabaseConfigured ? (
            <form onSubmit={handleEmailLogin} className="space-y-3">
              <input className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Email"
                value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
              <input className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
              {error && <div className="text-xs text-alert-500">{error}</div>}
              <button className="w-full bg-clinical-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-clinical-700">
                Sign in
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-2.5 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                <Lightbulb size={15} className="text-amber-500 shrink-0 mt-0.5" />
                <span>Demo mode — Supabase isn't connected yet. Choose a role below to explore the app.</span>
              </div>

              <div className="space-y-2.5">
                {roleCards.map(({ role, icon: Icon, blurb }) => {
                  const isPrimary = role === 'learner'
                  return (
                    <button
                      key={role}
                      onClick={() => { signInDemo(role); navigate({ to: role === 'instructor' || role === 'admin' ? '/instructor' : '/dashboard' }) }}
                      className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                        isPrimary
                          ? 'bg-gradient-to-r from-clinical-600 to-brand-blue-600 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5'
                          : 'border border-slate-200 text-slate-700 hover:border-clinical-300 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                    >
                      <span className={`flex h-9 w-9 items-center justify-center rounded-lg shrink-0 ${isPrimary ? 'bg-white/15 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <Icon size={18} />
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className={`block text-sm font-semibold capitalize ${isPrimary ? 'text-white' : 'text-slate-800'}`}>
                          Continue as {role}
                        </span>
                        <span className={`block text-xs mt-0.5 leading-snug ${isPrimary ? 'text-white/75' : 'text-slate-500'}`}>
                          {blurb}
                        </span>
                      </span>
                    </button>
                  )
                })}
              </div>

              <div className="border-t border-slate-100 pt-4">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <LogIn size={11} /> Real sign-in preview
                </div>
                <div className="space-y-2 opacity-60 pointer-events-none select-none" aria-hidden="true">
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <div className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-400 bg-slate-50">you@institution.org</div>
                  </div>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <div className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-400 bg-slate-50">••••••••</div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-lg py-2 text-center text-sm font-medium text-slate-400">Sign in</div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">This is what email/password sign-in will look like once Supabase is connected.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
