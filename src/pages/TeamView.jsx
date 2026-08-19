import { useAppStore } from '@/hooks/useAppStore'

function TeamView() {
  const team = useAppStore((state) => state.team)

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">Team members loaded from the simulated API layer.</p>
      <div className="grid gap-4 md:grid-cols-2">
        {team.map((member) => (
          <article key={member.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="font-semibold text-slate-900">{member.name}</h2>
            <p className="text-sm text-slate-500">{member.role}</p>
            <p className="mt-2 text-sm text-slate-700">Workload: {member.workloadPercent}%</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default TeamView
