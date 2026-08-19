import { useMemo, useState } from 'react'
import { useAppStore } from '@/hooks/useAppStore'

function TaskBoard() {
  const tasks = useAppStore((state) => state.tasks)
  const team = useAppStore((state) => state.team)
  const reassignTask = useAppStore((state) => state.reassignTask)
  const isUpdatingTask = useAppStore((state) => state.isUpdatingTask)
  const [activeTaskId, setActiveTaskId] = useState(null)
  const [selectedAssigneeId, setSelectedAssigneeId] = useState('')

  const groupedTasks = useMemo(
    () =>
      tasks.reduce((accumulator, task) => {
        const key = task.status
        accumulator[key] = [...(accumulator[key] ?? []), task]
        return accumulator
      }, {}),
    [tasks],
  )

  const activeTask = tasks.find((task) => task.id === activeTaskId) ?? null
  const suggestedAssignees = useMemo(() => {
    if (!activeTask) {
      return []
    }

    const requiredSkills = activeTask.requiredSkills ?? []

    return team.filter((member) => {
      const hasSkills =
        requiredSkills.length === 0 || requiredSkills.every((skill) => member.skills.includes(skill))
      return hasSkills && member.workloadPercent < 80
    })
  }, [activeTask, team])

  const openTaskModal = (taskId, assigneeId) => {
    setActiveTaskId(taskId)
    setSelectedAssigneeId(assigneeId)
  }

  const closeTaskModal = () => {
    if (!isUpdatingTask) {
      setActiveTaskId(null)
      setSelectedAssigneeId('')
    }
  }

  const handleReassign = async () => {
    if (!activeTask || !selectedAssigneeId) {
      return
    }

    const reassigned = await reassignTask(activeTask.id, selectedAssigneeId)
      .then(() => true)
      .catch(() => false)

    if (reassigned) {
      closeTaskModal()
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">Grouped task board with smart reassignment suggestions.</p>
      <div className="grid gap-4 lg:grid-cols-2">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => (
          <section key={status} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-400">{status}</h2>
            <div className="space-y-3">
              {statusTasks.map((task) => {
                const assignee = team.find((member) => member.id === task.assigneeId)

                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => openTaskModal(task.id, task.assigneeId)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:border-sky-300/60 hover:bg-sky-400/10"
                  >
                    <h3 className="font-semibold text-slate-100">{task.title}</h3>
                    <p className="text-sm text-slate-400">
                      Assignee: {assignee?.name ?? 'Unassigned'} • Priority: {task.priority}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {(task.requiredSkills ?? []).map((skill) => (
                        <span key={skill} className="rounded-full border border-white/10 bg-slate-800/70 px-2 py-0.5 text-xs text-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        ))}
      </div>

      {activeTask ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-950/75 p-4 backdrop-blur-sm md:items-center">
          <section className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">Reassign Task</p>
                <h2 className="text-xl font-semibold text-white">{activeTask.title}</h2>
                <p className="text-sm text-slate-400">Pick a low-workload teammate with matching skills.</p>
              </div>
              <button
                type="button"
                onClick={closeTaskModal}
                className="rounded-md border border-white/20 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/5"
              >
                Close
              </button>
            </div>

            <div className="space-y-3">
              {suggestedAssignees.length === 0 ? (
                <p className="rounded-lg border border-amber-300/25 bg-amber-500/10 p-3 text-sm text-amber-100">
                  No suggested members found for the selected task.
                </p>
              ) : (
                suggestedAssignees.map((member) => (
                  <label
                    key={member.id}
                    className="flex cursor-pointer items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3"
                  >
                    <div>
                      <p className="font-medium text-slate-100">{member.name}</p>
                      <p className="text-sm text-slate-400">
                        Workload: {member.workloadPercent}% • {member.availability}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="assignee"
                      value={member.id}
                      checked={selectedAssigneeId === member.id}
                      onChange={(event) => setSelectedAssigneeId(event.target.value)}
                      className="h-4 w-4"
                    />
                  </label>
                ))
              )}
            </div>

            <div className="mt-4 flex flex-wrap justify-end gap-2">
              <button
                type="button"
                onClick={handleReassign}
                disabled={!selectedAssigneeId || isUpdatingTask}
                className="rounded-md bg-gradient-to-r from-sky-400 to-violet-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isUpdatingTask ? 'Reassigning...' : 'Confirm Reassignment'}
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default TaskBoard
