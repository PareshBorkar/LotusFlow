import { workspaces } from "../data/mockData.js";

export default async function authRoutes(app) {
  app.post("/api/auth/login", async (req, reply) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.code(400).send({
        message: "Email and password are required.",
      });
    }

    if (password.length < 8) {
      return reply.code(400).send({
        message: "Password must be at least 8 characters.",
      });
    }

    reply.send({
      token: `demo-token-${Date.now()}`,
      user: {
        id: "user_1",
        name: email.split("@")[0] || "Demo User",
        email,
      },
      workspaces,
    });
  });

  app.post("/api/auth/signup", async (req, reply) => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return reply.code(400).send({
        message: "Email, password, and name are required.",
      });
    }

    if (password.length < 8) {
      return reply.code(400).send({
        message: "Password must be at least 8 characters.",
      });
    }

    reply.code(201).send({
      token: `demo-token-${Date.now()}`,
      user: {
        id: `user_${Date.now()}`,
        name,
        email,
      },
      workspaces: [],
    });
  });
}
