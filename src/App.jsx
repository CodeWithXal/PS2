import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '@/components/layout/MainLayout'
import Analytics from '@/pages/Analytics'
import Dashboard from '@/pages/Dashboard'
import LandingPage from '@/pages/LandingPage'
import TaskBoard from '@/pages/TaskBoard'
import TeamView from '@/pages/TeamView'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<TeamView />} />
          <Route path="/tasks" element={<TaskBoard />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
