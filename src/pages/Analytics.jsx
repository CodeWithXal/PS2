import { useAppStore } from '@/hooks/useAppStore'

function Analytics() {
  const tasks = useAppStore((state) => state.tasks)

  const byStatus = tasks.reduce((accumulator, task) => {
    accumulator[task.status] = (accumulator[task.status] ?? 0) + 1
    return accumulator
  }, {})

  const total = tasks.length || 1

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">Analytics route is connected and ready for chart widgets in Step 4.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.entries(byStatus).map(([status, count]) => (
          <article key={status} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
            <p className="text-sm font-semibold text-slate-100">{status}</p>
            <p className="mt-1 text-3xl font-semibold text-white">{count}</p>
            <div className="mt-3 h-2 rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-400 to-violet-500"
                style={{ width: `${Math.round((count / total) * 100)}%` }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Analytics
