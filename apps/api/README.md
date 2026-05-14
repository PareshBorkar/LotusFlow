# TaskFlow API

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

### Health Check
- `GET /health` - API health status

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User signup

### Workspaces
- `GET /api/workspaces` - List all workspaces
- `POST /api/workspaces` - Create new workspace
- `GET /api/workspaces/:workspaceId` - Get workspace details

### Projects
- `GET /api/projects?workspaceId=&search=&status=` - List projects (with filters)
- `POST /api/projects` - Create new project
- `GET /api/projects/:projectId` - Get project details with tasks
- `GET /api/projects/:projectId/tasks` - Get all tasks in project

### Tasks
- `GET /api/tasks?projectId=&status=&priority=` - List tasks (with filters)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:taskId` - Get task details
- `PATCH /api/tasks/:taskId` - Update task
- `DELETE /api/tasks/:taskId` - Delete task

### Dashboard
- `GET /api/dashboard` - Get dashboard summary with stats

## Project Structure

```
src/
├── server.js           # Fastify app setup
├── routes/             # API route handlers
│   ├── auth.js
│   ├── workspaces.js
│   ├── projects.js
│   ├── tasks.js
│   └── dashboard.js
├── __tests__/          # Test files
│   ├── auth.test.js
│   ├── workspaces.test.js
│   ├── projects.test.js
│   ├── tasks.test.js
│   ├── dashboard.test.js
│   └── general.test.js
├── data/
│   └── mockData.js     # Mock data for development
└── utils/
    └── http.js         # Legacy utilities
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


