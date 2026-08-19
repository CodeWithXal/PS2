import { BarChart3, Home, LayoutDashboard, ListTodo, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navigationItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/team', label: 'Team', icon: Users },
  { to: '/tasks', label: 'Tasks', icon: ListTodo },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
]

const getNavClassName = ({ isActive }) =>
  [
    'flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition',
    isActive
      ? 'border-sky-400/60 bg-sky-400/20 text-sky-100 shadow-[0_0_0_1px_rgba(56,189,248,0.25)]'
      : 'border-white/5 text-slate-300 hover:border-white/15 hover:bg-white/5 hover:text-white',
  ].join(' ')

function Sidebar() {
  return (
    <aside className="w-full border-b border-white/10 bg-slate-950/40 p-4 backdrop-blur-xl md:h-screen md:w-72 md:border-b-0 md:border-r md:p-5">
      <NavLink to="/" className="mb-6 flex items-center gap-2.5 text-base font-semibold text-white">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-violet-500 text-slate-950">
          <Home className="h-4 w-4" />
        </span>
        Smart Workload
      </NavLink>

      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-3 shadow-2xl">
        <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Navigation</p>
        <nav className="space-y-1.5">
          {navigationItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} className={getNavClassName}>
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
