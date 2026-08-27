import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import type { Role } from '../types/domain'

export default function Login() {
  const { signInDemo, demoMode } = useAuth()
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
    else navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        <div className="font-semibold text-clinical-700 text-lg mb-1">ResusPro Academy</div>
        <p className="text-sm text-slate-500 mb-6">Sign in to continue training.</p>

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
          <div className="space-y-2">
            <div className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-2">
              Demo mode — Supabase not configured. Choose a role to explore.
            </div>
            {(['learner', 'instructor', 'admin'] as Role[]).map((role) => (
              <button
                key={role}
                onClick={() => { signInDemo(role); navigate(role === 'instructor' || role === 'admin' ? '/instructor' : '/dashboard') }}
                className="w-full border border-slate-300 rounded-lg py-2 text-sm font-medium capitalize hover:bg-slate-50"
              >
                Continue as {role}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
