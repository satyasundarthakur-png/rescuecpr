import { NavLink, Outlet, useNavigate } from '@tanstack/react-router'
import { LayoutDashboard, BookOpen, LineChart, GraduationCap, LogOut, Award } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/certificates', label: 'Certificates', icon: Award },
]

export default function AppShell() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 shrink-0 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-100">
          <div className="font-semibold text-clinical-700">ResusPro Academy</div>
          <div className="text-xs text-slate-500">Simulation & Training</div>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-clinical-50 text-clinical-700' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <NavLink
              to="/instructor"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-clinical-50 text-clinical-700' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <GraduationCap size={17} />
              Instructor
            </NavLink>
          )}
        </nav>
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 mb-2 truncate">{user?.fullName} · {user?.role}</div>
          <button
            onClick={async () => { await signOut(); navigate('/') }}
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
