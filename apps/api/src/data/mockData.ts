export type Workspace = {
  id: string;
  name: string;
  plan: string;
  role: string;
  membersCount: number;
};

export type Project = {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  status: string;
  membersCount: number;
  tasksCount: number;
};

export type Task = {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: string;
  priority: string;
  assignee: string;
  comments: number;
};

export const workspaces: Workspace[] = [
  {
    id: "ws_1",
    name: "Acme Product Studio",
    plan: "Pro",
    role: "Admin",
    membersCount: 12,
  },
  {
    id: "ws_2",
    name: "Launch Crew",
    plan: "Free",
    role: "Member",
    membersCount: 5,
  },
  {
    id: "ws_3",
    name: "Personal Workspace",
    plan: "Free",
    role: "Owner",
    membersCount: 1,
  },
];

export const projects: Project[] = [
  {
    id: "proj_1",
    workspaceId: "ws_1",
    name: "Project Alpha",
    status: "active",
    description: "Launch a new onboarding flow for SaaS customers.",
    membersCount: 3,
    tasksCount: 12,
  },
  {
    id: "proj_2",
    workspaceId: "ws_1",
    name: "Project Beta",
    status: "active",
    description: "Ship the billing dashboard and subscription controls.",
    membersCount: 5,
    tasksCount: 8,
  },
  {
    id: "proj_3",
    workspaceId: "ws_2",
    name: "Project Gamma",
    status: "planning",
    description: "Prepare roadmap items for the next client release.",
    membersCount: 2,
    tasksCount: 20,
  },
];

export const tasks: Task[] = [
  {
    id: "task_1",
    projectId: "proj_1",
    title: "Design login validation flow",
    status: "todo",
    priority: "high",
    assignee: "John Doe",
    comments: 2,
  },
  {
    id: "task_2",
    projectId: "proj_1",
    title: "Build workspace switcher",
    status: "in_progress",
    priority: "medium",
    assignee: "Jane Smith",
    comments: 3,
  },
  {
    id: "task_3",
    projectId: "proj_2",
    title: "Add Stripe pricing page",
    status: "todo",
    priority: "high",
    assignee: "Alex",
    comments: 1,
  },
  {
    id: "task_4",
    projectId: "proj_3",
    title: "Prepare release checklist",
    status: "done",
    priority: "low",
    assignee: "Sam",
    comments: 4,
  },
];
