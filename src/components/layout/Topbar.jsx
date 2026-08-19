import { useLocation } from 'react-router-dom'
import { useAppStore } from '@/hooks/useAppStore'

const routeTitleMap = {
  '/dashboard': 'Manager Dashboard',
  '/team': 'Team View',
  '/tasks': 'Task Board',
  '/analytics': 'Analytics',
}

function Topbar() {
  const location = useLocation()
  const currentUser = useAppStore((state) => state.currentUser)

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Smart Team Workload</p>
        <h1 className="text-xl font-semibold text-slate-900">
          {routeTitleMap[location.pathname] ?? 'Workload Management'}
        </h1>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-slate-800">{currentUser.name}</p>
        <p className="text-xs text-slate-500">Role: {currentUser.role}</p>
      </div>
    </header>
  )
}

export default Topbar
