import { createClient } from '@supabase/supabase-js'

const url = import.meta.env['VITE_SUPABASE_URL']
const anonKey = import.meta.env['VITE_SUPABASE_ANON_KEY']

// Demo mode: if env vars aren't configured, the app falls back to local seed data
// and an in-memory auth stub (see hooks/useAuth.ts) rather than crashing.
export const isSupabaseConfigured = Boolean(url && anonKey)

export const supabase = isSupabaseConfigured ? createClient(url, anonKey) : null
