import { useCallback, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'
import type { Role, UserProfile } from '../types/domain'

const DEMO_USERS: Record<Role, UserProfile> = {
  learner: { id: 'demo-learner', fullName: 'Demo Learner', email: 'learner@demo.local', role: 'learner', createdAt: new Date().toISOString() },
  instructor: { id: 'demo-instructor', fullName: 'Demo Instructor', email: 'instructor@demo.local', role: 'instructor', createdAt: new Date().toISOString() },
  admin: { id: 'demo-admin', fullName: 'Demo Admin', email: 'admin@demo.local', role: 'admin', createdAt: new Date().toISOString() },
}

const STORAGE_KEY = 'resuspro.demoUser'

export function useAuth() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSupabaseConfigured) {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setUser(JSON.parse(stored))
      setLoading(false)
      return
    }
    supabase!.auth.getSession().then(async ({ data }) => {
      if (data.session?.user) {
        const { data: profile } = await supabase!
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()
        setUser(profile as UserProfile | null)
      }
      setLoading(false)
    })
  }, [])

  const signInDemo = useCallback((role: Role) => {
    const demoUser = DEMO_USERS[role]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser))
    setUser(demoUser)
  }, [])

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) await supabase!.auth.signOut()
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
  }, [])

  return { user, loading, signInDemo, signOut, demoMode: !isSupabaseConfigured }
}
