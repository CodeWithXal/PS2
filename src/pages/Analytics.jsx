import { useAppStore } from '@/hooks/useAppStore'

function Analytics() {
  const tasks = useAppStore((state) => state.tasks)

  const byStatus = tasks.reduce((accumulator, task) => {
    accumulator[task.status] = (accumulator[task.status] ?? 0) + 1
    return accumulator
  }, {})

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Analytics route is connected and ready for chart widgets in Step 4.</p>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        {Object.entries(byStatus).map(([status, count]) => (
          <p key={status} className="text-sm text-slate-700">
            {status}: <span className="font-semibold">{count}</span>
          </p>
        ))}
      </div>
    </div>
  )
}

export default Analytics
