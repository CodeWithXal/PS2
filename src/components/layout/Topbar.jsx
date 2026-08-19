import { Sparkles } from 'lucide-react'
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
    <header className="border-b border-white/10 bg-slate-950/25 px-4 py-4 backdrop-blur md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/55 px-4 py-3 shadow-xl">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-300">Smart Team Workload</p>
          <h1 className="text-xl font-semibold text-white">{routeTitleMap[location.pathname] ?? 'Workload Management'}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200 md:flex">
            <Sparkles className="h-3.5 w-3.5" />
            AI Insights Active
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-100">{currentUser.name}</p>
            <p className="text-xs text-slate-400">Role: {currentUser.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
