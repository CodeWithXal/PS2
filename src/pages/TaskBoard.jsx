import { useAppStore } from '@/hooks/useAppStore'

function TaskBoard() {
  const tasks = useAppStore((state) => state.tasks)
  const team = useAppStore((state) => state.team)

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Task list is routed and ready for reassignment interactions in Step 4.</p>
      <div className="space-y-3">
        {tasks.map((task) => {
          const assignee = team.find((member) => member.id === task.assigneeId)

          return (
            <article key={task.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <h2 className="font-semibold text-slate-900">{task.title}</h2>
              <p className="text-sm text-slate-500">
                Assignee: {assignee?.name ?? 'Unassigned'} • Status: {task.status}
              </p>
            </article>
          )
        })}
      </div>
    </div>
  )
}

export default TaskBoard
