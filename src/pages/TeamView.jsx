import { useAppStore } from '@/hooks/useAppStore'

const statusClasses = {
  Overloaded: 'border-rose-300/30 bg-rose-500/10 text-rose-200',
  Available: 'border-emerald-300/30 bg-emerald-500/10 text-emerald-200',
  Optimal: 'border-sky-300/30 bg-sky-500/10 text-sky-200',
}

function TeamView() {
  const team = useAppStore((state) => state.team)

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">Team members loaded from the simulated API layer.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {team.map((member) => (
          <article key={member.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-semibold text-slate-100">{member.name}</h2>
              <span
                className={`rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses[member.status] ?? 'border-white/10 bg-white/5 text-slate-200'}`}
              >
                {member.status}
              </span>
            </div>
            <p className="text-sm text-slate-400">{member.role}</p>

            <div className="mt-3">
              <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
                <span>Workload</span>
                <span>{member.workloadPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${member.workloadPercent > 85 ? 'bg-rose-400' : 'bg-sky-400'}`}
                  style={{ width: `${member.workloadPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {member.skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default TeamView
