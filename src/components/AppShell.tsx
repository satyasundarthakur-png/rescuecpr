import { useState } from 'react'
import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { LayoutDashboard, BookOpen, LineChart, GraduationCap, LogOut, Award, PanelLeftClose, PanelLeftOpen } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/progress', label: 'Progress', icon: LineChart },
  { to: '/certificates', label: 'Certificates', icon: Award },
]

function NavItem({ to, label, icon: Icon, collapsed }: { to: string; label: string; icon: typeof LayoutDashboard; collapsed: boolean }) {
  return (
    <Link
      to={to}
      className={`group flex items-center gap-3 rounded-lg text-sm font-medium text-slate-600 transition-all hover:bg-clinical-50 hover:text-clinical-700 ${collapsed ? 'justify-center px-2 py-2.5' : 'px-3 py-2'}`}
      activeProps={{ className: 'text-clinical-700 [&_.nav-icon]:bg-clinical-600 [&_.nav-icon]:text-white [&_.nav-icon]:shadow-[0_2px_10px_-3px_oklch(0.54_0.21_27_/_60%)]' }}
      activeOptions={{ exact: to === '/dashboard' }}
      title={collapsed ? label : undefined}
    >
      <span className="nav-icon flex items-center justify-center h-7 w-7 rounded-md text-slate-500 transition-all group-hover:bg-clinical-100 group-hover:text-clinical-700">
        <Icon size={16} />
      </span>
      {!collapsed && label}
    </Link>
  )
}

export default function AppShell() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen flex">
      <aside className={`shrink-0 bg-white border-r border-slate-200 flex flex-col transition-all duration-200 ${collapsed ? 'w-[76px]' : 'w-60'}`}>
        <div className="px-5 py-5 border-b border-slate-100 bg-gradient-to-r from-clinical-600 to-clinical-500">
          <div className={`flex items-center gap-2 ${collapsed ? 'justify-center' : ''}`}>
            <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-white/20 text-white font-bold text-xs">R+</span>
            {!collapsed && <div className="font-semibold text-white truncate">ResusPro Academy</div>}
          </div>
          {!collapsed && <div className="text-xs text-clinical-50/80 mt-0.5">Simulation & Training</div>}
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1 bg-slate-50/60">
          {navItems.map(({ to, label, icon }) => (
            <NavItem key={to} to={to} label={label} icon={icon} collapsed={collapsed} />
          ))}
          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <NavItem to="/instructor" label="Instructor" icon={GraduationCap} collapsed={collapsed} />
          )}
        </nav>
        <div className="px-3 py-3 border-t border-slate-100">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className={`flex items-center gap-2 text-xs text-slate-400 hover:text-clinical-600 rounded-md px-2 py-1.5 transition-colors ${collapsed ? 'justify-center w-full' : ''}`}
          >
            {collapsed ? <PanelLeftOpen size={15} /> : <><PanelLeftClose size={15} /> Collapse</>}
          </button>
        </div>
        <div className={`px-3 py-4 border-t border-slate-100 ${collapsed ? 'flex flex-col items-center' : ''}`}>
          {!collapsed && <div className="text-xs text-slate-500 mb-2 truncate">{user?.fullName} · {user?.role}</div>}
          <button
            onClick={async () => { await signOut(); navigate({ to: '/' }) }}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-alert-500 transition-colors"
            title={collapsed ? 'Sign out' : undefined}
          >
            <LogOut size={16} /> {!collapsed && 'Sign out'}
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="h-1 shrink-0 bg-gradient-to-r from-clinical-500 via-gold-500 to-brand-blue-600" />
        <div className="flex-1 min-w-0 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
