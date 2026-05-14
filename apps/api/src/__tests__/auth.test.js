import { createApp } from "../server.js";

describe("Auth Routes", () => {
  let app;

  beforeEach(async () => {
    app = await createApp();
  });

  afterEach(async () => {
    await app.close();
  });

  describe("POST /api/auth/login", () => {
    test("should login with valid credentials", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          email: "user@example.com",
          password: "password123",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("token");
      expect(body).toHaveProperty("user");
      expect(body.user.email).toBe("user@example.com");
      expect(body).toHaveProperty("workspaces");
    });

    test("should reject login without email", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          password: "password123",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Email and password are required.");
    });

    test("should reject login without password", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          email: "user@example.com",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Email and password are required.");
    });

    test("should reject login with short password", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          email: "user@example.com",
          password: "short",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Password must be at least 8 characters.");
    });

    test("should extract name from email", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/login",
        payload: {
          email: "john.doe@example.com",
          password: "password123",
        },
      });

      expect(response.statusCode).toBe(200);
      const body = JSON.parse(response.body);
      expect(body.user.name).toBe("john.doe");
    });
  });

  describe("POST /api/auth/signup", () => {
    test("should signup with valid data", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: {
          email: "newuser@example.com",
          password: "password123",
          name: "New User",
        },
      });

      expect(response.statusCode).toBe(201);
      const body = JSON.parse(response.body);
      expect(body).toHaveProperty("token");
      expect(body.user.name).toBe("New User");
      expect(body.user.email).toBe("newuser@example.com");
      expect(body.workspaces).toEqual([]);
    });

    test("should reject signup without email", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: {
          password: "password123",
          name: "New User",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Email, password, and name are required.");
    });

    test("should reject signup with short password", async () => {
      const response = await app.inject({
        method: "POST",
        url: "/api/auth/signup",
        payload: {
          email: "newuser@example.com",
          password: "short",
          name: "New User",
        },
      });

      expect(response.statusCode).toBe(400);
      const body = JSON.parse(response.body);
      expect(body.message).toBe("Password must be at least 8 characters.");
    });
  });
});
