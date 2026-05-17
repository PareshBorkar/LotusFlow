import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import authRoutes from "./routes/auth.js";
import workspaceRoutes from "./routes/workspaces.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";
import dashboardRoutes from "./routes/dashboard.js";

export async function createApp() {
  const app = Fastify({ logger: false });

  await app.register(fastifyCors);

  // Health check
  app.get("/health", async (req, reply) => {
    reply.send({
      status: "ok",
      service: "taskflow-api",
      timestamp: new Date().toISOString(),
    });
  });

  // Register routes
  await authRoutes(app);
  await workspaceRoutes(app);
  await projectRoutes(app);
  await taskRoutes(app);
  await dashboardRoutes(app);

  // 404 handler
  app.setNotFoundHandler((req, reply) => {
    reply.code(404).send({
      message: "Route not found.",
      path: req.url,
      method: req.method,
    });
  });

  // Error handler
  app.setErrorHandler((err, req, reply) => {
    reply.code(err.status || err.statusCode || 500).send({
      message: err.message || "Internal server error.",
    });
  });

  return app;
}

const PORT = Number(process.env.PORT || 4000);

const app = await createApp();
await app.listen({ port: PORT, host: "0.0.0.0" });
console.log(`LotusFlow API listening on http://localhost:${PORT}`);
