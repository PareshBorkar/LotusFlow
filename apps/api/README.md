# LotusFlow API

A high-performance REST API for the Team Project Management SaaS application built with Fastify.

## Getting Started

### Install Dependencies
```bash
npm install
```

### Development
```bash
npm run dev
```

The API will start on `http://localhost:4000`

### Production
```bash
npm run build
```

```bash
npm start
```

## Testing

### Run Tests
```bash
npm test
```

### Watch Mode (re-run on file changes)
```bash
npm run test:watch
```

### Test Coverage
Tests cover all major endpoints and scenarios:
- **Authentication** (login, signup validation)
- **Workspaces** (list, create, get by ID)
- **Projects** (list with filters, create, get, get tasks)
- **Tasks** (list with filters, create, get, update, delete)
- **Dashboard** (summary, stats)
- **General** (health check, CORS, error handling)

## API Endpoints

API routes are versioned under `/api/v1`. The legacy `/api` routes remain
available as compatibility aliases while clients migrate.

### Health Check
- `GET /health` - API health status

### API Metadata
- `GET /api` - Current API version and base path

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/signup` - User signup

### Workspaces
- `GET /api/v1/workspaces` - List all workspaces
- `POST /api/v1/workspaces` - Create new workspace
- `GET /api/v1/workspaces/:workspaceId` - Get workspace details

### Projects
- `GET /api/v1/projects?workspaceId=&search=&status=` - List projects (with filters)
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/:projectId` - Get project details with tasks
- `GET /api/v1/projects/:projectId/tasks` - Get all tasks in project

### Tasks
- `GET /api/v1/tasks?projectId=&status=&priority=` - List tasks (with filters)
- `POST /api/v1/tasks` - Create new task
- `GET /api/v1/tasks/:taskId` - Get task details
- `PATCH /api/v1/tasks/:taskId` - Update task
- `DELETE /api/v1/tasks/:taskId` - Delete task

### Dashboard
- `GET /api/v1/dashboard` - Get dashboard summary with stats

## Project Structure

```
src/
├── server.ts           # Fastify app setup
├── routes/             # API route handlers
│   ├── auth.ts
│   ├── workspaces.ts
│   ├── projects.ts
│   ├── tasks.ts
│   └── dashboard.ts
├── __tests__/          # Test files
│   ├── auth.test.ts
│   ├── workspaces.test.ts
│   ├── projects.test.ts
│   ├── tasks.test.ts
│   ├── dashboard.test.ts
│   └── general.test.ts
├── data/
│   └── mockData.ts     # Mock data and domain types for development
└── utils/
    └── http.ts         # Legacy utilities
```

## Features

- ✅ **High Performance** - Fastify is ~40% faster than Express
- ✅ CORS support via @fastify/cors
- ✅ JSON request/response
- ✅ Query parameter filtering
- ✅ Error handling with setErrorHandler
- ✅ RESTful conventions
- ✅ Mock data for testing
- ✅ Comprehensive test suite (60+ tests)
- ✅ Native inject() testing (no supertest needed)
- ✅ TypeScript source with strict API build

## Fastify Benefits

- 🚀 High throughput (40k req/sec vs 15k for Express)
- 🎯 Built-in schema validation support
- 📦 Smaller footprint
- 🔧 Plugin-based architecture
- ⚡ Async/await native
- 🧪 Native request injection for testing

## Next Steps

- [ ] Connect MongoDB for persistent storage
- [ ] Add authentication middleware (JWT)
- [ ] Add validation middleware (Joi/Zod)
- [ ] Add logging middleware (@fastify/logger)
- [ ] Add rate limiting (@fastify/rate-limit)
- [ ] Add WebSocket support (@fastify/websocket)
- [ ] Add database seeders
