# AI Agent Specification: Smart Team Workload Management (PS2)

## 1. Project Overview & Context
This document serves as a comprehensive architecture and prompt guide for an AI coding agent to build a frontend prototype for **Problem Statement 2 (PS 2): Smart Team Workload Management**, as part of the JMIT Internal Hackathon 2k26.

**Goal:** Develop a purely frontend (UI/UX) prototype using dummy data. No backend is required. 
**Focus:** Dashboards, usability, interactive reassignments, and visual alerts.

---

## 2. Tech Stack Recommendations
*   **Framework:** React (Vite) or Next.js (App Router preferred for scalability)
*   **Styling:** Tailwind CSS + Shadcn UI (for rapid, clean component generation)
*   **State Management:** Zustand or React Context (for managing dummy data state and reassignments globally)
*   **Charting/Analytics:** Recharts or Chart.js
*   **Routing:** React Router (if using Vite)
*   **Icons:** Lucide React

---

## 3. Application Directory Structure
This modular structure allows for optimal separation of concerns and easy addition of new features.

```text
/src
 ├── /assets               # Images, icons, logos
 ├── /components
 │   ├── /ui               # Reusable base components (Buttons, Modals, Badges, Cards)
 │   ├── /layout           # Sidebar, Topbar, MainLayout
 │   ├── /dashboard        # Dashboard-specific widgets (AlertBox, WorkloadChart)
 │   ├── /team             # MemberCard, SkillBadge, OverloadIndicator
 │   └── /tasks            # TaskCard, KanbanBoard, AssigneeSuggestorModal
 ├── /data                 # 📁 DUMMY DATA LIVES HERE (mockDB.js)
 ├── /hooks                # Custom hooks (e.g., useTaskManager, useWorkloadAnalytics)
 ├── /pages
 │   ├── LandingPage.jsx   # Public landing page presenting the product
 │   ├── Dashboard.jsx     # Main manager overview
 │   ├── TeamView.jsx      # Detailed team availability and skill matrix
 │   ├── TaskBoard.jsx     # Drag-and-drop or interactive task reassignment
 │   └── Analytics.jsx     # Deep dive into workload metrics
 ├── /utils                # Helper functions (date formatting, workload calculation)
 ├── App.jsx               # Main application routing
 └── index.css             # Global Tailwind imports
```

---

## 4. Mock Data Structures (`src/data/mockDB.js`)
Provide this initial state to the state manager so the agent can render analytics and interactive elements immediately.

```javascript
export const mockData = {
  team: [
    { id: 'u1', name: 'Alice Sharma', role: 'Frontend Dev', skills: ['React', 'UI/UX', 'Tailwind'], workloadPercent: 95, status: 'Overloaded', availability: 'Unavailable' },
    { id: 'u2', name: 'Bob Singh', role: 'Backend Dev', skills: ['Node.js', 'Python', 'Databases'], workloadPercent: 40, status: 'Available', availability: 'High' },
    { id: 'u3', name: 'Charlie Gupta', role: 'Fullstack Dev', skills: ['React', 'Node.js', 'AWS'], workloadPercent: 75, status: 'Optimal', availability: 'Medium' },
    { id: 'u4', name: 'Diana Verma', role: 'UI/UX Designer', skills: ['Figma', 'Prototyping'], workloadPercent: 20, status: 'Available', availability: 'High' }
  ],
  tasks: [
    { id: 't1', title: 'Fix Login Page UI', assigneeId: 'u1', priority: 'High', deadline: '2026-08-20', estimatedHours: 8, status: 'In Progress' },
    { id: 't2', title: 'Database Migration', assigneeId: 'u2', priority: 'Critical', deadline: '2026-08-21', estimatedHours: 12, status: 'Pending' },
    { id: 't3', title: 'API Integration for Dashboard', assigneeId: 'u3', priority: 'Medium', deadline: '2026-08-25', estimatedHours: 16, status: 'In Progress' },
    { id: 't4', title: 'Design Landing Page V2', assigneeId: 'u4', priority: 'Low', deadline: '2026-08-28', estimatedHours: 5, status: 'Pending' }
  ],
  alerts: [
    { id: 'a1', type: 'OverloadRisk', message: 'Alice Sharma is at 95% workload capacity.', relatedUserId: 'u1' },
    { id: 'a2', type: 'DeadlineRisk', message: 'Task "Fix Login Page UI" is due tomorrow and assignee is overloaded.', relatedTaskId: 't1' }
  ]
};
```

---

## 5. Page-by-Page Specifications

### A. Landing Page (`/`)
*   **Purpose:** A modern, clean marketing page demonstrating the tool's value proposition.
*   **Components:** 
    *   **Hero Section:** Catchy headline ("Intelligent Workload Distribution"), subheadline, and a "Go to Dashboard" CTA.
    *   **Features Grid:** Highlights (Skill-based matching, real-time workload alerts, easy task reassignment).
    *   **Footer.**

### B. Manager Dashboard (`/dashboard`)
*   **Purpose:** The central nervous system for the manager.
*   **Components:**
    *   **Top Metrics Cards:** Total active tasks, Overloaded Members count, Approaching Deadlines count.
    *   **Alerts Panel (Critical):** Renders the `alerts` array prominently. Suggests actions (e.g., "Reassign Task").
    *   **Workload Overview Chart:** A Recharts bar chart showing `workloadPercent` for each team member. Bars over 85% should render in red.
    *   **Upcoming Deadlines Table:** Filtered list of tasks due in the next 3 days.

### C. Team & Skills Matrix (`/team`)
*   **Purpose:** Detailed view of who can do what.
*   **Components:**
    *   **Search/Filter Bar:** Filter by skill (e.g., "React") or status ("Available").
    *   **Member Cards:** Displays avatar, name, skills as badges, and a visual progress bar for their current workload.

### D. Task Adjustment & Kanban (`/tasks`)
*   **Purpose:** The interactive heart of the application for reassignment.
*   **Components:**
    *   **Kanban Board / Task List:** Grouped by Status or Assignee.
    *   **Interactive Reassignment Modal:** When a manager clicks a task (e.g., to relieve an overloaded member), a modal pops up.
    *   **Smart Suggestion Engine (UI):** Inside the modal, the system filters the `team` data to show users who:
        1. Have the required skills for the task.
        2. Have a `workloadPercent` < 80%.

### E. Analytics (`/analytics`)
*   **Purpose:** Visual reporting on team efficiency.
*   **Components:**
    *   **Skill Distribution Pie Chart:** How many tasks require which skills.
    *   **Velocity/Completion Line Graph:** (Mocked historical data).

---

## 6. Guidelines for the AI Agent
1.  **State Immutability:** When implementing the "Reassign Task" feature, ensure the global mock state updates immutably so components re-render correctly (e.g., updating user workload percentages dynamically when a task is shifted).
2.  **Visual Cues:** Liberally use color-coding. Red for overdue/overloaded, Orange for risks, Green for available/completed.
3.  **Responsiveness:** Use Tailwind's `md:` and `lg:` prefixes to ensure dashboards stack into a single column on mobile.
4.  **No Real Backend:** Do not write `fetch` calls. Use a mock delay function if you want to simulate loading states:
    ```javascript
    const fetchMockData = () => new Promise(res => setTimeout(() => res(mockData), 500));
    ```

---

## 7. Scalability & Future-Proofing
To ensure this application can grow beyond the hackathon:
*   **Abstracted Data Layer:** Keep all dummy data interactions in custom hooks (e.g., `useTasks()`). When a real backend is added, only the hooks need to change to use React Query or Axios, while UI components remain untouched.
*   **Role-Based Access (Preparation):** Include a dummy `currentUser = { role: 'Manager' }` state. This makes it trivial to later add a 'Team Member' view that only sees their own assigned tasks.
*   **Pluggable Widget System:** Design the Dashboard grid using CSS Grid / Flexbox so new analytics widgets can be dropped in without breaking the layout.
