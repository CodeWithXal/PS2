import { ArrowRight, BellRing, ChartColumnIncreasing, Shuffle } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: ChartColumnIncreasing,
    title: 'Capacity Intelligence',
    description: 'Track team load in real time and identify burnout risk before it blocks delivery.',
  },
  {
    icon: Shuffle,
    title: 'Smart Reassignments',
    description: 'Recommend ideal owners using skill matching and current workload capacity.',
  },
  {
    icon: BellRing,
    title: 'Proactive Alerts',
    description: 'Surface priority deadlines and overloaded contributors through focused signals.',
  },
]

function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent px-6 py-8 text-slate-100 md:px-10">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-slate-950/45 p-6 shadow-2xl backdrop-blur-xl md:p-10">
        <header className="mb-12 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Smart Workload Suite</p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:border-sky-300/60 hover:bg-sky-400/15"
          >
            Open Dashboard
            <ArrowRight className="h-4 w-4" />
          </Link>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-violet-200">
              Manager-first orchestration
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              Redesign how your team balances work and ships faster.
            </h1>
            <p className="max-w-xl text-lg text-slate-300">
              A modern control center to monitor workload distribution, prevent deadline risk, and reassign tasks with confidence.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 to-violet-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
              >
                Go to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                Fully frontend · async mocked flows
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/65 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Why teams use this</p>
            <div className="mt-4 space-y-4">
              {features.map(({ icon: Icon, title, description }) => (
                <article key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2 text-sky-200">
                    <Icon className="h-4 w-4" />
                    <h2 className="text-sm font-semibold text-white">{title}</h2>
                  </div>
                  <p className="text-sm text-slate-300">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default LandingPage
