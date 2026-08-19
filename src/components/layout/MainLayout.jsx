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
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar />
        <main className="flex-1 p-6">
          {loading && !initialized ? (
            <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-600">Loading workspace...</div>
          ) : null}

          {error && !loading ? (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => void bootstrap()}
                className="mt-3 rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white"
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
