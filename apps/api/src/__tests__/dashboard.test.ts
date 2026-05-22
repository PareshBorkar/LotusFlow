import { createApp } from "../server.js";

describe("Dashboard Routes", () => {
  let app;

  beforeEach(async () => {
    app = await createApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("GET /api/dashboard", () => {
    test("should return dashboard data", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/dashboard",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("summary");
      expect(body).toHaveProperty("workspaces");
      expect(body).toHaveProperty("featuredProjects");
      expect(body).toHaveProperty("recentTasks");
    });

    test("should return summary with correct structure", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/dashboard",
      });

      const body = JSON.parse(response.body);
      const { summary } = body;
      expect(summary).toHaveProperty("totalWorkspaces");
      expect(summary).toHaveProperty("totalProjects");
      expect(summary).toHaveProperty("totalTasks");
      expect(summary).toHaveProperty("completedTasks");

      expect(typeof summary.totalWorkspaces).toBe("number");
      expect(typeof summary.totalProjects).toBe("number");
      expect(typeof summary.totalTasks).toBe("number");
      expect(typeof summary.completedTasks).toBe("number");
    });

    test("should return workspaces array", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/dashboard",
      });

      const body = JSON.parse(response.body);
      expect(Array.isArray(body.workspaces)).toBe(true);
      expect(body.workspaces.length).toBeGreaterThan(0);
    });

    test("should return featured projects", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/dashboard",
      });

      const body = JSON.parse(response.body);
      expect(Array.isArray(body.featuredProjects)).toBe(true);
      expect(body.featuredProjects.length).toBeLessThanOrEqual(3);
    });

    test("should return recent tasks", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/dashboard",
      });

      const body = JSON.parse(response.body);
      expect(Array.isArray(body.recentTasks)).toBe(true);
      expect(body.recentTasks.length).toBeLessThanOrEqual(5);
    });

    test("summary should track completed tasks correctly", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/dashboard",
      });

      const body = JSON.parse(response.body);
      const { summary, recentTasks } = body;
      const completedInRecent = recentTasks.filter(
        (task) => task.status === "done"
      ).length;

      expect(summary.completedTasks).toBeGreaterThanOrEqual(0);
      expect(summary.completedTasks).toBeLessThanOrEqual(summary.totalTasks);
    });
  });
});
