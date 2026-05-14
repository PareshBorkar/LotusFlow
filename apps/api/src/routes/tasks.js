import { tasks } from "../data/mockData.js";

export default async function taskRoutes(app) {
  app.get("/api/tasks", async (req, reply) => {
    const { projectId, status, priority } = req.query;

    const items = tasks.filter((task) => {
      const matchesProject = projectId ? task.projectId === projectId : true;
      const matchesStatus = status ? task.status === status : true;
      const matchesPriority = priority ? task.priority === priority : true;

      return matchesProject && matchesStatus && matchesPriority;
    });

    reply.send({
      items,
      total: items.length,
    });
  });

  app.post("/api/tasks", async (req, reply) => {
    const { projectId, title, description, priority, assignee, status } = req.body;

    if (!projectId || !title) {
      return reply.code(400).send({
        message: "Project ID and task title are required.",
      });
    }

    const task = {
      id: `task_${Date.now()}`,
      projectId,
      title,
      description: description || "",
      status: status || "todo",
      priority: priority || "medium",
      assignee: assignee || "Unassigned",
      comments: 0,
    };

    tasks.push(task);
    reply.code(201).send(task);
  });

  app.get("/api/tasks/:taskId", async (req, reply) => {
    const task = tasks.find((t) => t.id === req.params.taskId);

    if (!task) {
      return reply.code(404).send({ message: "Task not found." });
    }

    reply.send(task);
  });

  app.patch("/api/tasks/:taskId", async (req, reply) => {
    const task = tasks.find((t) => t.id === req.params.taskId);

    if (!task) {
      return reply.code(404).send({ message: "Task not found." });
    }

    if (req.body.status) {
      task.status = req.body.status;
    }
    if (req.body.priority) {
      task.priority = req.body.priority;
    }
    if (req.body.assignee) {
      task.assignee = req.body.assignee;
    }
    if (req.body.title) {
      task.title = req.body.title;
    }
    if (req.body.description !== undefined) {
      task.description = req.body.description;
    }

    reply.send(task);
  });

  app.delete("/api/tasks/:taskId", async (req, reply) => {
    const index = tasks.findIndex((t) => t.id === req.params.taskId);

    if (index === -1) {
      return reply.code(404).send({ message: "Task not found." });
    }

    const [deleted] = tasks.splice(index, 1);
    reply.send(deleted);
  });
}
