# 🚀 AutoPulse — System Monitoring & Alerting Platform

AutoPulse is a full-stack system monitoring platform inspired by tools like UptimeRobot and PagerDuty.
It tracks system heartbeats, detects downtime, raises alerts, and provides a real-time dashboard for visibility.

Built as a **production-grade portfolio project** with Docker, Next.js, NestJS, PostgreSQL, and Redis.

---

## ✨ Features

### ✅ System Monitoring
- Register systems with heartbeat intervals
- Python agent sends periodic heartbeats
- Automatic DOWN / RECOVERED detection

### 🚨 Alerts & Incidents
- Incident-based alert lifecycle
- Severity calculation based on downtime
- Alert history per system
- Global alerts page

### 📊 Dashboard
- Systems overview
- Status indicators (UP / DOWN)
- Incident timelines
- Health snapshots

### 🔐 Authentication
- Secure login using JWT
- Role-ready backend (Admin/User)

### ⚙️ System Settings
- Alert cooldowns
- Warning / critical thresholds
- Email alert toggles

---

## 🧱 Architecture

┌──────────────┐
│ Python Agent │───► /systems/heartbeat
└──────────────┘
│
▼
┌──────────────────┐
│ NestJS API       │
│ - Auth           │
│ - Alerts         │
│ - Scheduler      │
└──────────────────┘
│
┌──────┴──────┐
▼             ▼
PostgreSQL     Redis
(State)        (Workers / queues)

┌──────────────────┐
│ Next.js Dashboard│
│ Tailwind + shadcn│
└──────────────────┘

---

## 🐳 Tech Stack

**Frontend**
- Next.js 16
- Tailwind CSS
- shadcn/ui

**Backend**
- NestJS
- Drizzle ORM
- PostgreSQL
- Redis

**Infra**
- Docker & Docker Compose
- AWS EC2 (deployment)
- Python heartbeat agent

---

🧠 Design Decisions
	•	Docker-first architecture for consistency
	•	Incident-based alerts (not flat logs)
	•	Redis-backed workers for scalability
	•	Clear separation between agent & platform

⸻

📌 Roadmap
	•	Role-based access control
	•	Slack / PagerDuty integrations
	•	Metrics & charts
	•	Multi-region monitoring

⸻

 3️⃣ Commit README

```bash
git add README.md
git commit -m "Finalize README with architecture and deployment details"
git push
```
---

## 🚀 Run Locally (Docker)

```bash
git clone https://github.com/yyprince334/Autopulse.git
cd Autopulse

cp .env.example .env
docker compose up -d

## 🐳 Local Development
```bash
docker compose up --build

```
⸻

## 🧑‍💻 Author

Prince Yadav
Software Engineer | FullStack Developer
