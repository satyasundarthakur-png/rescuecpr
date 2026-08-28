import { useState } from 'react'
import { Search, Bell, ChevronDown, LogOut, Settings } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from '../hooks/useAuth'

const demoNotifications = [
  { id: 1, text: 'S. Iyer marked at risk — ACLS completion dropped below 50%', time: '2h ago', unread: true },
  { id: 2, text: 'Your BLS certificate is ready to download', time: '1d ago', unread: true },
  { id: 3, text: '3 quiz questions pending your review', time: '2d ago', unread: false },
]

function initialsOf(name?: string) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || name[0]!.toUpperCase()
}

export default function TopBar({ onSearchClick }: { onSearchClick: () => void }) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const unreadCount = demoNotifications.filter((n) => n.unread).length

  return (
    <div className="h-14 shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-5 gap-4">
      <button
        onClick={onSearchClick}
        className="flex items-center gap-2 text-sm text-slate-400 border border-slate-200 rounded-lg px-3 py-1.5 hover:border-clinical-300 hover:text-slate-600 transition-colors w-64 max-w-[40vw]"
      >
        <Search size={14} />
        <span className="flex-1 text-left">Search…</span>
        <kbd className="text-[10px] font-mono text-slate-400 border border-slate-200 rounded px-1.5 py-0.5">⌘K</kbd>
      </button>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          All systems normal
        </div>

        <div className="relative">
          <button
            onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false) }}
            className="relative text-slate-500 hover:text-clinical-600 p-1.5 rounded-lg hover:bg-slate-50"
          >
            <Bell size={17} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-clinical-600 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-20">
              <div className="px-4 py-2.5 border-b border-slate-100 text-xs font-semibold text-slate-500">Notifications</div>
              {demoNotifications.map((n) => (
                <div key={n.id} className={`px-4 py-3 border-b border-slate-50 last:border-0 text-sm ${n.unread ? 'bg-clinical-50/40' : ''}`}>
                  <div className="flex items-start gap-2">
                    {n.unread && <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-clinical-600 shrink-0" />}
                    <div className={n.unread ? '' : 'pl-3.5'}>
                      <div className="text-slate-700 leading-snug">{n.text}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{n.time}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false) }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-slate-50"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-clinical-600 text-white text-xs font-semibold">
              {initialsOf(user?.fullName)}
            </span>
            <ChevronDown size={13} className="text-slate-400" />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden z-20">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="text-sm font-medium text-slate-800 truncate">{user?.fullName}</div>
                <div className="text-xs text-slate-400 capitalize">{user?.role}</div>
              </div>
              <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 text-left">
                <Settings size={14} /> Settings
              </button>
              <button
                onClick={async () => { await signOut(); navigate({ to: '/' }) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-alert-500 hover:bg-red-50 text-left border-t border-slate-100"
              >
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
