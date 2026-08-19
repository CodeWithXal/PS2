import { AlertTriangle, CalendarClock, ClipboardList, Users } from 'lucide-react'
import { useMemo } from 'react'
import { useAppStore } from '@/hooks/useAppStore'

const MS_PER_DAY = 1000 * 60 * 60 * 24

function Dashboard() {
  const tasks = useAppStore((state) => state.tasks)
  const team = useAppStore((state) => state.team)
  const alerts = useAppStore((state) => state.alerts)

  const overloadedMembers = useMemo(
    () => team.filter((member) => member.workloadPercent > 85),
    [team],
  )

  const upcomingDeadlines = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return [...tasks]
      .map((task) => {
        const deadline = new Date(`${task.deadline}T00:00:00`)
        const daysUntil = Math.ceil((deadline.getTime() - today.getTime()) / MS_PER_DAY)

        return { ...task, daysUntil }
      })
      .filter((task) => task.daysUntil >= 0 && task.daysUntil <= 3)
      .sort((a, b) => a.daysUntil - b.daysUntil)
  }, [tasks])

  const averageWorkload =
    team.length === 0
      ? 0
      : Math.round(team.reduce((sum, member) => sum + member.workloadPercent, 0) / team.length)

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
            <ClipboardList className="h-4 w-4 text-sky-300" />
            Total Tasks
          </p>
          <p className="text-3xl font-semibold text-white">{tasks.length}</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
            <AlertTriangle className="h-4 w-4 text-rose-300" />
            Overloaded Members
          </p>
          <p className="text-3xl font-semibold text-rose-200">{overloadedMembers.length}</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
            <CalendarClock className="h-4 w-4 text-amber-300" />
            Upcoming Deadlines
          </p>
          <p className="text-3xl font-semibold text-amber-200">{upcomingDeadlines.length}</p>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
          <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-slate-400">
            <Users className="h-4 w-4 text-emerald-300" />
            Avg Workload
          </p>
          <p className="text-3xl font-semibold text-emerald-200">{averageWorkload}%</p>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg font-semibold text-white">Workload Overview</h2>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              Red zone: &gt;85%
            </span>
          </div>
          <div className="space-y-4">
            {team.map((member) => {
              const isOverloaded = member.workloadPercent > 85

              return (
                <div key={member.id}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <p className="font-medium text-slate-100">{member.name}</p>
                    <p className={isOverloaded ? 'text-rose-200' : 'text-slate-300'}>{member.workloadPercent}%</p>
                  </div>
                  <div className="h-2 rounded-full bg-slate-800">
                    <div
                      className={`h-full rounded-full ${isOverloaded ? 'bg-rose-400' : 'bg-sky-400'}`}
                      style={{ width: `${member.workloadPercent}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl">
          <h2 className="mb-4 text-lg font-semibold text-white">Critical Alerts</h2>
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <p className="rounded-xl border border-emerald-300/20 bg-emerald-400/10 p-3 text-sm text-emerald-200">
                No active alerts right now.
              </p>
            ) : (
              alerts.map((alert) => (
                <article key={alert.id} className="rounded-xl border border-amber-300/25 bg-amber-500/10 p-3">
                  <p className="text-sm font-medium text-amber-100">{alert.type}</p>
                  <p className="mt-1 text-sm text-amber-50/90">{alert.message}</p>
                </article>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-white">Upcoming Deadlines</h2>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Next 3 days</p>
        </div>

        {upcomingDeadlines.length === 0 ? (
          <p className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-300">
            No deadlines in the next 3 days.
          </p>
        ) : (
          <div className="space-y-2">
            {upcomingDeadlines.map((task) => (
              <article
                key={task.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 p-3"
              >
                <div>
                  <p className="font-medium text-slate-100">{task.title}</p>
                  <p className="text-sm text-slate-400">Priority: {task.priority}</p>
                </div>
                <p className="rounded-full border border-amber-300/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-200">
                  {task.daysUntil === 0 ? 'Due today' : `Due in ${task.daysUntil} day${task.daysUntil > 1 ? 's' : ''}`}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Dashboard
