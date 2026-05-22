import type { FastifyInstance } from "fastify";
import { workspaces } from "../data/mockData.js";

type CreateWorkspaceBody = {
  name?: string;
};

type WorkspaceParams = {
  workspaceId: string;
};

export default async function workspaceRoutes(app: FastifyInstance) {
  app.get("/workspaces", async (req, reply) => {
    reply.send({
      items: workspaces,
    });
  });

  app.post<{ Body: CreateWorkspaceBody }>("/workspaces", async (req, reply) => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return reply.code(400).send({
        message: "Workspace name is required.",
      });
    }

    const workspace = {
      id: `ws_${Date.now()}`,
      name: name.trim(),
      plan: "Free",
      role: "Owner",
      membersCount: 1,
    };

    workspaces.unshift(workspace);
    reply.code(201).send(workspace);
  });

  app.get<{ Params: WorkspaceParams }>("/workspaces/:workspaceId", async (req, reply) => {
    const workspace = workspaces.find((ws) => ws.id === req.params.workspaceId);

    if (!workspace) {
      return reply.code(404).send({ message: "Workspace not found." });
    }

    reply.send(workspace);
  });
}
