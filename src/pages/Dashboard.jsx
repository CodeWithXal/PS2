import { useAppStore } from '@/hooks/useAppStore'

function Dashboard() {
  const tasks = useAppStore((state) => state.tasks)
  const team = useAppStore((state) => state.team)
  const alerts = useAppStore((state) => state.alerts)

  const overloadedCount = team.filter((member) => member.workloadPercent > 85).length

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Step 3 baseline dashboard is connected to global async mock state.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Total Tasks</p>
          <p className="text-2xl font-semibold">{tasks.length}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Overloaded Members</p>
          <p className="text-2xl font-semibold text-red-600">{overloadedCount}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Active Alerts</p>
          <p className="text-2xl font-semibold text-amber-600">{alerts.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
