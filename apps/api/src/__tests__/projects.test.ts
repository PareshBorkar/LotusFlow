import { createApp } from "../server.js";

describe("Project Routes", () => {
  let app;

  beforeEach(async () => {
    app = await createApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("GET /api/projects", () => {
    test("should return list of projects", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("items");
      expect(body).toHaveProperty("total");
      expect(Array.isArray(body.items)).toBe(true);
    });

    test("should filter projects by workspaceId", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects?workspaceId=ws_1",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      body.items.forEach((project) => {
        expect(project.workspaceId).toBe("ws_1");
      });
    });

    test("should filter projects by search term", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects?search=Alpha",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      body.items.forEach((project) => {
        const matchesSearch =
          project.name.toLowerCase().includes("alpha") ||
          project.description.toLowerCase().includes("alpha");
        expect(matchesSearch).toBe(true);
      });
    });

    test("should filter projects by status", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects?status=active",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      body.items.forEach((project) => {
        expect(project.status).toBe("active");
      });
    });

    test("should apply multiple filters", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects?workspaceId=ws_1&status=active",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      body.items.forEach((project) => {
        expect(project.workspaceId).toBe("ws_1");
        expect(project.status).toBe("active");
      });
    });
  });

  describe("POST /api/projects", () => {
    test("should create a new project", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/projects",
        payload: {
          name: "New Project",
          description: "A new project",
          workspaceId: "ws_1",
          status: "active",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.name).toBe("New Project");
      expect(body.description).toBe("A new project");
      expect(body.workspaceId).toBe("ws_1");
      expect(body.status).toBe("active");
      expect(body).toHaveProperty("id");
    });

    test("should set default status to active", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/projects",
        payload: {
          name: "New Project",
          workspaceId: "ws_1",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.status).toBe("active");
    });

    test("should reject project creation without name", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/projects",
        payload: {
          workspaceId: "ws_1",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Project name and workspaceId are required.");
    });

    test("should reject project creation without workspaceId", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/projects",
        payload: {
          name: "New Project",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Project name and workspaceId are required.");
    });
  });

  describe("GET /api/projects/:projectId", () => {
    test("should return project by ID with tasks", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects/proj_1",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.id).toBe("proj_1");
      expect(body).toHaveProperty("name");
      expect(body).toHaveProperty("tasks");
      expect(Array.isArray(body.tasks)).toBe(true);
    });

    test("should return 404 for non-existent project", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects/invalid_id",
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Project not found.");
    });
  });

  describe("GET /api/projects/:projectId/tasks", () => {
    test("should return tasks for a project", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects/proj_1/tasks",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("items");
      expect(Array.isArray(body.items)).toBe(true);
      body.items.forEach((task) => {
        expect(task.projectId).toBe("proj_1");
      });
    });

    test("should return 404 for non-existent project", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects/invalid_id/tasks",
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Project not found.");
    });
  });
});
