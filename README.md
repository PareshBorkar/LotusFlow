# LotusFlow

LotusFlow is a modern project management and workflow platform inspired by tools like Jira, built for fast-moving teams and scalable engineering workflows.

The platform focuses on:
- task management
- workflow tracking
- billing management
- team productivity
- lightweight operational workflows

---

## Features

### Task Management
- Create and manage tasks
- Assign tasks to team members
- Task prioritization
- Labels and tagging
- Due dates and status tracking

### Workflow Management
- Custom workflow stages
- Drag-and-drop task movement
- Kanban-style boards
- Progress tracking

### Billing & Operations
- Billing dashboard
- Project cost tracking
- Operational visibility
- Team workload monitoring

### Developer Experience
- Monorepo architecture
- CI/CD ready
- Scalable frontend/backend separation
- API-first design
- Modular system architecture

---

## Tech Stack

### Frontend
- React
- React Router v7
- TypeScript
- Vite

### Backend
- Fastify
- REST APIs
- PostgreSQL

### Infrastructure
- AWS S3
- CloudFront CDN
- GitHub Actions
- Turborepo

---

## Architecture

```text
apps/
├── web/
├── api/

packages/
├── ui/
├── types/
├── configs/

infra/
```

---

## Philosophy

LotusFlow follows a lightweight SaaS architecture approach:

- Marketing pages served using SSG
- Main application powered by CSR
- CDN-first frontend delivery
- Independent API scaling
- Cost-efficient infrastructure design

---

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Servers

```bash
npm run dev
```

### Build

```bash
npm run build
```

---

## Monorepo Setup

This project uses:
- Turborepo for orchestration
- Shared packages
- Incremental builds
- Task caching
- Parallel execution

---

## CI/CD

Planned CI/CD workflow:
- Pull request validation
- Linting and testing
- Selective builds
- Automated deployment
- CloudFront cache invalidation

---

## Future Roadmap

- Real-time collaboration
- Role-based access control
- Notifications
- AI-assisted workflows
- Time tracking
- Team analytics
- Multi-tenant architecture
- WebSocket updates

---

## License

MIT
