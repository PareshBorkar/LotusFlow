import { workspaces, projects, tasks } from "../data/mockData.js";

export default async function dashboardRoutes(app) {
  app.get("/dashboard", async (req, reply) => {
    const summary = {
      totalWorkspaces: workspaces.length,
      totalProjects: projects.length,
      totalTasks: tasks.length,
      completedTasks: tasks.filter((task) => task.status === "done").length,
    };

    reply.send({
      summary,
      workspaces,
      featuredProjects: projects.slice(0, 3),
      recentTasks: tasks.slice(0, 5),
    });
  });
}
