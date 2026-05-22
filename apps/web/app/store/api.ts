import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  workspaces: Array<{
    id: string;
    name: string;
  }>;
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
  description: string;
  priority: string;
  status: string;
  assignee?: string;
};

export type Workspace = {
  id: string;
  name: string;
  plan: string;
  role: string;
  membersCount: number;
};

export type DashboardData = {
  featuredProjects: Project[];
  recentTasks: Task[];
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Auth', 'Projects', 'Tasks', 'Workspaces', 'Dashboard'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'Projects', 'Tasks', 'Workspaces', 'Dashboard'],
    }),

    signup: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // Projects endpoints
    getProjects: builder.query<
      { items: Project[]; total: number },
      { workspaceId?: string; search?: string; status?: string }
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.workspaceId) params.append('workspaceId', filters.workspaceId);
        if (filters.search) params.append('search', filters.search);
        if (filters.status) params.append('status', filters.status);
        return {
          url: `/projects?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Projects'],
    }),

    getProject: builder.query<Project, string>({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: 'GET',
      }),
      providesTags: ['Projects'],
    }),

    createProject: builder.mutation<Project, Omit<Project, 'id' | 'membersCount' | 'tasksCount'>>({
      query: (project) => ({
        url: '/projects',
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),

    updateProject: builder.mutation<Project, { id: string; data: Partial<Project> }>({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Projects'],
    }),

    deleteProject: builder.mutation<void, string>({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),

    // Tasks endpoints
    getTasks: builder.query<
      { items: Task[]; total: number },
      { projectId?: string; status?: string; priority?: string }
    >({
      query: (filters) => {
        const params = new URLSearchParams();
        if (filters.projectId) params.append('projectId', filters.projectId);
        if (filters.status) params.append('status', filters.status);
        if (filters.priority) params.append('priority', filters.priority);
        return {
          url: `/tasks?${params.toString()}`,
          method: 'GET',
        };
      },
      providesTags: ['Tasks'],
    }),

    getTask: builder.query<Task, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'GET',
      }),
      providesTags: ['Tasks'],
    }),

    createTask: builder.mutation<Task, Omit<Task, 'id'>>({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),

    updateTask: builder.mutation<Task, { id: string; data: Partial<Task> }>({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Tasks'],
    }),

    deleteTask: builder.mutation<void, string>({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),

    // Workspaces endpoints
    getWorkspaces: builder.query<{ items: Workspace[] }, void>({
      query: () => ({
        url: '/workspaces',
        method: 'GET',
      }),
      providesTags: ['Workspaces'],
    }),

    getWorkspace: builder.query<Workspace, string>({
      query: (workspaceId) => ({
        url: `/workspaces/${workspaceId}`,
        method: 'GET',
      }),
      providesTags: ['Workspaces'],
    }),

    createWorkspace: builder.mutation<Workspace, Omit<Workspace, 'id' | 'membersCount'>>({
      query: (workspace) => ({
        url: '/workspaces',
        method: 'POST',
        body: workspace,
      }),
      invalidatesTags: ['Workspaces'],
    }),

    // Dashboard endpoint
    getDashboard: builder.query<DashboardData, void>({
      query: () => ({
        url: '/dashboard',
        method: 'GET',
      }),
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetTasksQuery,
  useGetTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetWorkspacesQuery,
  useGetWorkspaceQuery,
  useCreateWorkspaceMutation,
  useGetDashboardQuery,
} = api;
