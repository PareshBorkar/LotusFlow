import { createApp } from "../server.js";

describe("General Routes", () => {
  let app;

  beforeEach(async () => {
    app = await createApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("GET /health", () => {
    test("should return health status", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/health",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("status");
      expect(body.status).toBe("ok");
      expect(body).toHaveProperty("service");
      expect(body.service).toBe("taskflow-api");
      expect(body).toHaveProperty("version");
      expect(body.version).toBe("v1");
      expect(body).toHaveProperty("timestamp");
    });

    test("should return ISO timestamp", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/health",
      });

      const body = JSON.parse(response.body);
      const timestamp = new Date(body.timestamp);
      expect(timestamp.toString()).not.toBe("Invalid Date");
    });
  });

  describe("API Versioning", () => {
    test("should expose the current API version metadata", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.currentVersion).toBe("v1");
      expect(body.basePath).toBe("/api/v1");
    });

    test("should serve endpoints from the v1 prefix", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/v1/projects",
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("items");
      expect(body).toHaveProperty("total");
    });

    test("should keep legacy /api endpoints available", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/projects",
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe("404 Handler", () => {
    test("should return 404 for unknown routes", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/unknown",
      });

      expect(response.statusCode).toBe(404);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("message");
      expect(body.message).toBe("Route not found.");
    });

    test("should return path in 404 response", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/api/unknown",
      });

      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("path");
      expect(body.path).toBe("/api/unknown");
    });

    test("should return method in 404 response", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/unknown",
      });

      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("method");
      expect(body.method).toBe("POST");
    });
  });

  describe("CORS Headers", () => {
    test("should handle OPTIONS requests", async () => {
      const response = await app.inject({
        method: "OPTIONS",
        url: "/api/projects",
        headers: {
          origin: "http://localhost:3000",
        },
      });

      expect(response.statusCode).toBe(200);
    });
  });

  describe("JSON Content-Type", () => {
    test("should return JSON content type", async () => {
      const response = await app.inject({
        method: "GET",
        url: "/health",
      });

      expect(response.headers["content-type"]).toMatch(/application\/json/);
    });

    test("should parse JSON request body", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: { email: "test@example.com", password: "password123" },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("token");
    });
  });
});
