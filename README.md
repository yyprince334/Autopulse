# 🚀 AutoPulse

AutoPulse is a full-stack uptime monitoring and alerting platform inspired by tools like UptimeRobot and StatusCake.

## 🔧 Tech Stack
- **Frontend**: Next.js, Tailwind CSS, shadcn/ui
- **Backend**: NestJS, Drizzle ORM
- **Database**: PostgreSQL
- **Cache & Workers**: Redis
- **Agent**: Python heartbeat agent
- **Infra**: Docker, Docker Compose, AWS EC2

## ✨ Features
- System uptime monitoring
- Heartbeat-based health checks
- Severity-based alerts
- Alert history & acknowledgment
- Email notifications
- Dockerized production setup

## 🐳 Local Development
```bash
docker compose up --build
