# Test Suite Documentation

## Overview
Comprehensive test suite for LotusFlow API with 50+ test cases covering all endpoints and edge cases.

## Test Structure

### 1. Authentication Tests (`auth.test.ts`)
**Coverage:** Login and signup endpoints

| Test | Purpose |
|------|---------|
| Login with valid credentials | Happy path - successful authentication |
| Login without email | Validation - email required |
| Login without password | Validation - password required |
| Login with short password | Validation - password length check |
| Email to name extraction | Business logic - auto-generate name |
| Signup with valid data | Happy path - new user registration |
| Signup without email | Validation - email required |
| Signup with short password | Validation - password minimum length |

**Key Validations:**
- Minimum 8-character password requirement
- Required fields validation
- Auto-generated names from email

---

### 2. Workspace Tests (`workspaces.test.ts`)
**Coverage:** Workspace CRUD operations

| Test | Purpose |
|------|---------|
| Get list of workspaces | Happy path - list retrieval |
| Verify workspace fields | Schema validation |
| Create new workspace | Happy path - workspace creation |
| Create without name | Validation - name required |
| Create with non-string name | Validation - type checking |
| Whitespace trimming | Data cleanup - trim names |
| Get workspace by ID | Happy path - single lookup |
| Invalid workspace ID | Error handling - 404 response |

**Key Validations:**
- Name field is required and must be string
- Default values (plan: "Free", role: "Owner")
- Whitespace trimming on names

---

### 3. Project Tests (`projects.test.ts`)
**Coverage:** Project listing, creation, and filtering

| Test | Purpose |
|------|---------|
| Get list of projects | Happy path - list retrieval |
| Filter by workspace ID | Query filtering |
| Filter by search term | Text search functionality |
| Filter by status | Status filtering |
| Apply multiple filters | Combined filters |
| Create new project | Happy path - project creation |
| Default status value | Default field setup |
| Create without name | Validation - name required |
| Create without workspace ID | Validation - workspace required |
| Get project with tasks | Relationship fetching |
| Get project tasks endpoint | Dedicated task listing |
| Invalid project ID | Error handling - 404 response |

**Key Validations:**
- Name and workspaceId are required
- Default status = "active"
- Supports multi-field filtering
- Includes related tasks

---

### 4. Task Tests (`tasks.test.ts`)
**Coverage:** Task CRUD operations with comprehensive filtering

| Test | Purpose |
|------|---------|
| Get list of tasks | Happy path - list retrieval |
| Filter by project ID | Project filtering |
| Filter by status | Status filtering (todo, in_progress, done) |
| Filter by priority | Priority filtering (high, medium, low) |
| Create new task | Happy path - task creation |
| Default field values | Auto-fill optional fields |
| Create without project ID | Validation - projectId required |
| Create without title | Validation - title required |
| Get task by ID | Happy path - single lookup |
| Update task status | Partial update - status change |
| Update task priority | Partial update - priority change |
| Update task assignee | Partial update - assignee change |
| Update task title | Partial update - title change |
| Update task description | Partial update - description change |
| Update multiple fields | Partial update - multiple fields |
| Delete task | Soft delete + verification |
| Invalid task ID | Error handling - 404 response |

**Key Validations:**
- projectId and title are required
- Default values: status="todo", priority="medium", assignee="Unassigned"
- Supports partial updates (PATCH)
- Full CRUD operations
- Delete verification (GET after DELETE returns 404)

---

### 5. Dashboard Tests (`dashboard.test.ts`)
**Coverage:** Dashboard aggregation endpoints

| Test | Purpose |
|------|---------|
| Return dashboard data | Happy path - complete dashboard |
| Summary structure | Schema validation |
| Workspace array | Data type verification |
| Featured projects | Limited list (max 3) |
| Recent tasks | Limited list (max 5) |
| Completed tasks tracking | Logic verification |
| Summary counters | Data aggregation |

**Key Validations:**
- Summary includes: totalWorkspaces, totalProjects, totalTasks, completedTasks
- Featured projects limited to 3
- Recent tasks limited to 5

---

### 6. General Tests (`general.test.ts`)
**Coverage:** Health checks, error handling, and middleware

| Test | Purpose |
|------|---------|
| Health check endpoint | Service availability |
| Timestamp validation | ISO format verification |
| 404 handler | Unknown route handling |
| 404 includes path | Error response details |
| 404 includes method | Request method in error |
| CORS headers | Cross-origin support |
| Preflight requests | OPTIONS method handling |
| JSON content-type | Response format |
| JSON parsing | Request body parsing |

**Key Validations:**
- Health endpoint returns status and timestamp
- Proper 404 responses with details
- CORS headers present
- JSON content-type correct

---

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode
```bash
npm run test:watch
```

### Specific Test File
```bash
npm test auth.test.ts
```

### With Coverage
```bash
npm test -- --coverage
```

## Test Isolation

Each test uses a fresh Express app instance created via `createApp()` to ensure:
- ✅ No state pollution between tests
- ✅ Consistent test data
- ✅ Mock data reset for each test
- ✅ Independent test execution

## What's NOT Tested (Out of Scope)

- Database integration (using mock data)
- JWT token validation
- Real authentication logic
- Rate limiting
- Advanced security headers
- WebSocket connections
- File uploads
- Real-time updates

## Future Test Additions

- [ ] Integration tests with MongoDB
- [ ] Performance/load tests
- [ ] Security vulnerability tests
- [ ] API contract tests
- [ ] End-to-end tests
