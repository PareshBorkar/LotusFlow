import { createApp } from "../server.js";

describe("Task Routes", () => {
  let app;

  beforeEach(async () => {
    app = await createApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("GET /api/tasks", () => {
    test("should return list of tasks", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/tasks",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("items");
      expect(body).toHaveProperty("total");
      expect(Array.isArray(body.items)).toBe(true);
    });

    test("should filter tasks by projectId", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/tasks?projectId=proj_1",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      body.items.forEach((task) => {
        expect(task.projectId).toBe("proj_1");
      });
    });

    test("should filter tasks by status", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/tasks?status=todo",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      body.items.forEach((task) => {
        expect(task.status).toBe("todo");
      });
    });

    test("should filter tasks by priority", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/tasks?priority=high",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      body.items.forEach((task) => {
        expect(task.priority).toBe("high");
      });
    });
  });

  describe("POST /api/tasks", () => {
    test("should create a new task", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/tasks",
        payload: {
          projectId: "proj_1",
          title: "New Task",
          description: "A new task",
          priority: "high",
          assignee: "John Doe",
          status: "todo",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.title).toBe("New Task");
      expect(body.description).toBe("A new task");
      expect(body.projectId).toBe("proj_1");
      expect(body.priority).toBe("high");
      expect(body.assignee).toBe("John Doe");
      expect(body).toHaveProperty("id");
    });

    test("should set default values for optional fields", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/tasks",
        payload: {
          projectId: "proj_1",
          title: "New Task",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.status).toBe("todo");
      expect(body.priority).toBe("medium");
      expect(body.assignee).toBe("Unassigned");
      expect(body.comments).toBe(0);
    });

    test("should reject task creation without projectId", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/tasks",
        payload: {
          title: "New Task",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Project ID and task title are required.");
    });

    test("should reject task creation without title", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/tasks",
        payload: {
          projectId: "proj_1",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Project ID and task title are required.");
    });
  });

  describe("GET /api/tasks/:taskId", () => {
    test("should return task by ID", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/tasks/task_1",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.id).toBe("task_1");
      expect(body).toHaveProperty("title");
    });

    test("should return 404 for non-existent task", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/tasks/invalid_id",
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Task not found.");
    });
  });

  describe("PATCH /api/tasks/:taskId", () => {
    test("should update task status", async () => {
      const response = await app.inject({
        method: "PATCH",
        url: "/api/tasks/task_1",
        payload: {
          status: "in_progress",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.status).toBe("in_progress");
    });

    test("should update task priority", async () => {
      const response = await app.inject({
        method: "PATCH",
        url: "/api/tasks/task_1",
        payload: {
          priority: "low",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.priority).toBe("low");
    });

    test("should update task assignee", async () => {
      const response = await app.inject({
        method: "PATCH",
        url: "/api/tasks/task_1",
        payload: {
          assignee: "Jane Smith",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.assignee).toBe("Jane Smith");
    });

    test("should update task title", async () => {
      const response = await app.inject({
        method: "PATCH",
        url: "/api/tasks/task_1",
        payload: {
          title: "Updated Title",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.title).toBe("Updated Title");
    });

    test("should update task description", async () => {
      const response = await app.inject({
        method: "PATCH",
        url: "/api/tasks/task_1",
        payload: {
          description: "Updated description",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.description).toBe("Updated description");
    });

    test("should update multiple fields at once", async () => {
      const response = await app.inject({
        method: "PATCH",
        url: "/api/tasks/task_1",
        payload: {
          status: "done",
          priority: "high",
          assignee: "Alex",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.status).toBe("done");
      expect(body.priority).toBe("high");
      expect(body.assignee).toBe("Alex");
    });

    test("should return 404 for non-existent task", async () => {
      const response = await app.inject({
        method: "PATCH",
        url: "/api/tasks/invalid_id",
        payload: {
          status: "done",
        },
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Task not found.");
    });
  });

  describe("DELETE /api/tasks/:taskId", () => {
    test("should delete a task", async () => {
      const createRes = await app.inject({
        method: "POST",
        url: "/api/tasks",
        payload: {
          projectId: "proj_1",
          title: "Task to Delete",
        },
      });

      const createBody = JSON.parse(createRes.body);
      const taskId = createBody.id;

      const deleteRes = await app.inject({
        method: "DELETE",
        url: `/api/tasks/${taskId}`,
      });

      expect(deleteRes.statusCode).toBe(200);
      const deleteBody = JSON.parse(deleteRes.body);
      expect(deleteBody.id).toBe(taskId);

      const getRes = await app.inject({
        method: "GET",
        url: `/api/tasks/${taskId}`,
      });
      expect(getRes.statusCode).toBe(404);
    });

    test("should return 404 for non-existent task", async () => {
      const response = await app.inject({
        method: "DELETE",
        url: "/api/tasks/invalid_id",
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Task not found.");
    });
  });
});
