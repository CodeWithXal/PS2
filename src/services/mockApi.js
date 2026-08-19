import { mockData } from '../data/mockDB'

const DEFAULT_LATENCY_MS = 500
const WORKLOAD_HOURS_MULTIPLIER = 2

const cloneData = (value) =>
  typeof structuredClone === 'function'
    ? structuredClone(value)
    : JSON.parse(JSON.stringify(value))

const wait = (latency = DEFAULT_LATENCY_MS) =>
  new Promise((resolve) => setTimeout(resolve, latency))

const deriveCapacityMeta = (workloadPercent) => {
  if (workloadPercent >= 85) {
    return { status: 'Overloaded', availability: 'Unavailable' }
  }

  if (workloadPercent >= 60) {
    return { status: 'Optimal', availability: 'Medium' }
  }

  return { status: 'Available', availability: 'High' }
}

const applyWorkloadDelta = (member, delta) => {
  const nextWorkload = Math.max(0, Math.min(100, member.workloadPercent + delta))

  return {
    ...member,
    workloadPercent: nextWorkload,
    ...deriveCapacityMeta(nextWorkload),
  }
}

const createInitialState = () => cloneData(mockData)

let mockState = createInitialState()

const withLatency = async (data, latency) => {
  await wait(latency)
  return cloneData(data)
}

export async function getTeam(options = {}) {
  return withLatency(mockState.team, options.latency)
}

export async function getTasks(options = {}) {
  return withLatency(mockState.tasks, options.latency)
}

export async function getAlerts(options = {}) {
  return withLatency(mockState.alerts, options.latency)
}

export async function getDashboardData(options = {}) {
  return withLatency(mockState, options.latency)
}

export async function updateTaskAssignee(taskId, nextAssigneeId, options = {}) {
  const currentTask = mockState.tasks.find((task) => task.id === taskId)

  if (!currentTask) {
    throw new Error(`Task not found: ${taskId}`)
  }

  if (currentTask.assigneeId === nextAssigneeId) {
    return withLatency(currentTask, options.latency)
  }

  const currentAssignee = mockState.team.find((member) => member.id === currentTask.assigneeId)
  const nextAssignee = mockState.team.find((member) => member.id === nextAssigneeId)

  if (!nextAssignee) {
    throw new Error(`Assignee not found: ${nextAssigneeId}`)
  }

  const workloadDelta = currentTask.estimatedHours * WORKLOAD_HOURS_MULTIPLIER

  mockState = {
    ...mockState,
    tasks: mockState.tasks.map((task) =>
      task.id === taskId ? { ...task, assigneeId: nextAssigneeId } : task,
    ),
    team: mockState.team.map((member) => {
      if (currentAssignee && member.id === currentAssignee.id) {
        return applyWorkloadDelta(member, -workloadDelta)
      }

      if (member.id === nextAssignee.id) {
        return applyWorkloadDelta(member, workloadDelta)
      }

      return member
    }),
  }

  const updatedTask = mockState.tasks.find((task) => task.id === taskId)
  return withLatency(updatedTask, options.latency)
}

export async function resetMockState(options = {}) {
  mockState = createInitialState()
  return withLatency(mockState, options.latency)
}
