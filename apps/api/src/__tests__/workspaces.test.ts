import { createApp } from "../server.js";

describe("Workspace Routes", () => {
  let app;

  beforeEach(async () => {
    app = await createApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("GET /api/workspaces", () => {
    test("should return list of workspaces", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/workspaces",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("items");
      expect(Array.isArray(body.items)).toBe(true);
      expect(body.items.length).toBeGreaterThan(0);
    });

    test("should return workspace with required fields", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/workspaces",
      });

      const body = JSON.parse(response.body);
      const workspace = body.items[0];
      expect(workspace).toHaveProperty("id");
      expect(workspace).toHaveProperty("name");
      expect(workspace).toHaveProperty("plan");
      expect(workspace).toHaveProperty("role");
      expect(workspace).toHaveProperty("membersCount");
    });
  });

  describe("POST /api/workspaces", () => {
    test("should create a new workspace", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/workspaces",
        payload: {
          name: "New Workspace",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.name).toBe("New Workspace");
      expect(body.plan).toBe("Free");
      expect(body.role).toBe("Owner");
      expect(body.membersCount).toBe(1);
      expect(body).toHaveProperty("id");
    });

    test("should reject workspace creation without name", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/workspaces",
        payload: {},
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Workspace name is required.");
    });

    test("should reject workspace creation with non-string name", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/workspaces",
        payload: {
          name: 123,
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Workspace name is required.");
    });

    test("should trim whitespace from workspace name", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/workspaces",
        payload: {
          name: "  Trimmed Workspace  ",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body.name).toBe("Trimmed Workspace");
    });
  });

  describe("GET /api/workspaces/:workspaceId", () => {
    test("should return workspace by ID", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/workspaces/ws_1",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.id).toBe("ws_1");
      expect(body).toHaveProperty("name");
    });

    test("should return 404 for non-existent workspace", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/workspaces/invalid_id",
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Workspace not found.");
    });
  });
});
