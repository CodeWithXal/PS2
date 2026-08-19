import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="max-w-3xl space-y-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-300">Hackathon Prototype</p>
        <h1 className="text-4xl font-bold md:text-5xl">Intelligent Workload Distribution</h1>
        <p className="text-lg text-slate-300">
          Simulate smart team allocation decisions with realistic async workflows and manager-focused insights.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-sky-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
        >
          Go to Dashboard
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  )
}

export default LandingPage
