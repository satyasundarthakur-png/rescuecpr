import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { LayoutDashboard, BookOpen, LineChart, GraduationCap, LogOut, Award } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/certificates', label: 'Certificates', icon: Award },
]

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon: typeof LayoutDashboard }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50"
      activeProps={{ className: 'bg-clinical-50 text-clinical-700 hover:bg-clinical-50' }}
      activeOptions={{ exact: to === '/dashboard' }}
    >
      <Icon size={17} />
      {label}
    </Link>
  )
}

export default function AppShell() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-100 bg-gradient-to-r from-clinical-600 to-clinical-500">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/20 text-white font-bold text-xs">R+</span>
            <div className="font-semibold text-white">ResusPro Academy</div>
          </div>
          <div className="text-xs text-clinical-50/80 mt-0.5">Simulation & Training</div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(({ to, label, icon }) => (
            <NavItem key={to} to={to} label={label} icon={icon} />
          ))}
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <NavItem to="/instructor" label="Instructor" icon={GraduationCap} />
          )}
        </nav>
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 mb-2 truncate">{user?.fullName} · {user?.role}</div>
          <button
            onClick={async () => { await signOut(); navigate({ to: '/' }) }}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-alert-500"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
