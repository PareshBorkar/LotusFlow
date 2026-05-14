import { projects, tasks } from "../data/mockData.js";

export default async function projectRoutes(app) {
  app.get("/api/projects", async (req, reply) => {
    const { workspaceId, search, status } = req.query;

    const items = projects.filter((project) => {
      const matchesWorkspace = workspaceId
        ? project.workspaceId === workspaceId
        : true;
      const matchesSearch = search
        ? project.name.toLowerCase().includes(search.toLowerCase()) ||
          project.description.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesStatus = status ? project.status === status : true;

      return matchesWorkspace && matchesSearch && matchesStatus;
    });

    reply.send({
      items,
      total: items.length,
    });
  });

  app.post("/api/projects", async (req, reply) => {
    const { name, description, workspaceId, status } = req.body;

    if (!name || !workspaceId) {
      return reply.code(400).send({
        message: "Project name and workspaceId are required.",
      });
    }

    const project = {
      id: `proj_${Date.now()}`,
      workspaceId,
      name,
      description: description || "",
      status: status || "active",
      membersCount: 1,
      tasksCount: 0,
    };

    projects.push(project);
    reply.code(201).send(project);
  });

  app.get("/api/projects/:projectId", async (req, reply) => {
    const project = projects.find((p) => p.id === req.params.projectId);

    if (!project) {
      return reply.code(404).send({ message: "Project not found." });
    }

    const projectTasks = tasks.filter((t) => t.projectId === req.params.projectId);

    reply.send({
      ...project,
      tasks: projectTasks,
    });
  });

  app.get("/api/projects/:projectId/tasks", async (req, reply) => {
    const project = projects.find((p) => p.id === req.params.projectId);

    if (!project) {
      return reply.code(404).send({ message: "Project not found." });
    }

    const projectTasks = tasks.filter((t) => t.projectId === req.params.projectId);

    reply.send({
      items: projectTasks,
    });
  });
}
