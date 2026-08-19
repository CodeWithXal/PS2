from pathlib import Path

content = """# SmartTeam — Smart Team Workload Management

## 1. Project Overview

SmartTeam is a MERN-stack web application for managing team workload, tasks, deadlines, and team capacity.

### Core Goal

Give managers and team members a simple dashboard that answers:

- Who is overloaded?
- Who has available capacity?
- What tasks are in progress?
- Which deadlines are approaching?
- How is workload distributed across the team?
- Which tasks should be assigned to which team member?

### Target Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Charts:** Recharts
- **Authentication:** JWT
- **Hosting:** Vercel
- **Database hosting:** MongoDB Atlas
- **API:** REST API

The application should be structured so the React frontend and Express backend can be deployed through Vercel without depending on a traditional always-running server.

---

# 2. Visual Direction

Use the generated SmartTeam landing-page concept as the visual reference.

### Design language

- Glassmorphism
- Squarish / slightly rounded cards
- Dark navy background
- Blue, purple, cyan and green accent lighting
- Thin translucent borders
- Frosted glass panels
- Soft gradients
- Clean modern SaaS typography
- Minimal shadows
- Dense but organized dashboard UI
- Responsive design

Avoid excessive rounded/pill-shaped UI. Buttons and cards should generally have modest corner radii rather than fully circular designs.

---

# 3. Main Website Structure

```text
SmartTeam
│
├── Landing Page
│   ├── Navbar
│   ├── Hero Section
│   ├── Product Preview
│   ├── Feature Cards
│   ├── How It Works
│   ├── Statistics
│   ├── CTA Section
│   └── Footer
│
├── Authentication
│   ├── Login
│   ├── Register
│   └── Forgot Password
│
└── Application
    ├── Dashboard
    ├── Tasks
    ├── Team
    ├── Workload
    ├── Projects
    ├── Calendar
    ├── Notifications
    └── Settings
