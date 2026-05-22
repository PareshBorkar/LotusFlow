import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth.js';
import workspaceRoutes from './routes/workspaces.js';
import projectRoutes from './routes/projects.js';
import taskRoutes from './routes/tasks.js';
import dashboardRoutes from './routes/dashboard.js';
import { API_BASE_PREFIX, API_VERSION, API_VERSION_PREFIX } from './config/apiVersion.js';

const apiRoutes = [
  authRoutes,
  workspaceRoutes,
  projectRoutes,
  taskRoutes,
  dashboardRoutes,
];

export async function createApp() {
  const app = Fastify({ logger: false });

  await app.register(fastifyCors, {
    optionsSuccessStatus: 200,
    strictPreflight: false,
  });

  // Health check
  app.get('/health', async (req, reply) => {
    reply.send({
      status: 'ok',
      service: 'taskflow-api',
      version: API_VERSION,
      timestamp: new Date().toISOString(),
    });
  });

  app.get(API_BASE_PREFIX, async (req, reply) => {
    reply.send({
      service: 'taskflow-api',
      currentVersion: API_VERSION,
      basePath: API_VERSION_PREFIX,
    });
  });

  // Register versioned routes. The unversioned /api prefix is kept as a
  // compatibility alias while clients migrate to /api/v1.
  for (const routes of apiRoutes) {
    await app.register(routes, { prefix: API_VERSION_PREFIX });
    await app.register(routes, { prefix: API_BASE_PREFIX });
  }

  // 404 handler
  app.setNotFoundHandler((req, reply) => {
    reply.code(404).send({
      message: 'Route not found.',
      path: req.url,
      method: req.method,
    });
  });

  // Error handler
  app.setErrorHandler((err, req, reply) => {
    reply.code(err.status || err.statusCode || 500).send({
      message: err.message || 'Internal server error.',
    });
  });

  return app;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log('Starting LotusFlow API...', process.env.PORT);
  const PORT = Number(process.env.PORT || 4000);

  const app = await createApp();
  await app.listen({ port: PORT, host: '0.0.0.0' });
  console.log(`LotusFlow API listening on http://localhost:${PORT}`);
}
