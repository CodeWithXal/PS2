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
    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-200',
  ].join(' ')

function Sidebar() {
  return (
    <aside className="w-full border-b border-slate-200 bg-white p-4 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <NavLink to="/" className="mb-6 flex items-center gap-2 text-base font-semibold text-slate-900">
        <Home className="h-5 w-5" />
        Smart Workload
      </NavLink>

      <nav className="space-y-1">
        {navigationItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={getNavClassName}>
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
