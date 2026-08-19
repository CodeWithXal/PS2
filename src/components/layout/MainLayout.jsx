import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useAppStore } from '@/hooks/useAppStore'

function MainLayout() {
  const bootstrap = useAppStore((state) => state.bootstrap)
  const initialized = useAppStore((state) => state.initialized)
  const loading = useAppStore((state) => state.loading)
  const error = useAppStore((state) => state.error)

  useEffect(() => {
    if (!initialized) {
      void bootstrap()
    }
  }, [bootstrap, initialized])

  return (
    <div className="min-h-screen bg-transparent text-slate-100 md:flex">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-4 md:p-6">
          {loading && !initialized ? (
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 text-slate-300 backdrop-blur">
              Loading workspace...
            </div>
          ) : null}

          {error && !loading ? (
            <div className="mb-4 rounded-2xl border border-rose-300/30 bg-rose-500/10 p-4 text-sm text-rose-100 backdrop-blur">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => void bootstrap()}
                className="mt-3 rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-400"
              >
                Retry
              </button>
            </div>
          ) : null}

          {!loading || initialized ? <Outlet /> : null}
        </main>
      </div>
    </div>
  )
}

export default MainLayout
