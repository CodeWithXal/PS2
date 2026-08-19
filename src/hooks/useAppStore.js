import { create } from 'zustand'
import { getAlerts, getTasks, getTeam, resetMockState, updateTaskAssignee } from '@/services'

export const useAppStore = create((set, get) => ({
  currentUser: {
    id: 'm1',
    name: 'Manager',
    role: 'Manager',
  },
  team: [],
  tasks: [],
  alerts: [],
  loading: false,
  initialized: false,
  error: null,
  isUpdatingTask: false,

  bootstrap: async () => {
    set({ loading: true, error: null })

    try {
      const [team, tasks, alerts] = await Promise.all([getTeam(), getTasks(), getAlerts()])
      set({ team, tasks, alerts, loading: false, initialized: true })
    } catch (error) {
      set({
        loading: false,
        initialized: false,
        error: error instanceof Error ? error.message : 'Failed to load application data.',
      })
    }
  },

  reassignTask: async (taskId, assigneeId) => {
    set({ isUpdatingTask: true, error: null })

    try {
      await updateTaskAssignee(taskId, assigneeId)
      const [team, tasks, alerts] = await Promise.all([getTeam(), getTasks(), getAlerts()])
      set({ team, tasks, alerts, isUpdatingTask: false })
    } catch (error) {
      set({
        isUpdatingTask: false,
        error: error instanceof Error ? error.message : 'Failed to reassign task.',
      })
      throw error
    }
  },

  resetState: async () => {
    set({ loading: true, error: null })

    try {
      await resetMockState()
      await get().bootstrap()
    } catch (error) {
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to reset state.',
      })
    }
  },
}))
