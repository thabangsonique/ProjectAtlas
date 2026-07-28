import {
  buildCreateApi,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

//types for projects data
export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export const Status = {
  ToDo: "To Do",
  WorkInProgress: "Work In Progress",
  UnderReview: "Under Review",
  Completed: "Completed",
} as const;

export type Status = (typeof Status)[keyof typeof Status];

export const Priority = {
  Urgent: "Urgenty",
  High: "High",
  Medium: "Medium",
  Low: "Low",
  Backlog: "Backlog",
} as const;

export type Priority = (typeof Priority)[keyof typeof Priority];
//types for the tasks
export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: Status; //enums
  priority?: Priority; //enums
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: number;
  projectId: number;
  authorUserId?: number;
  assignedUserId?: number;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["Projects", "Tasks"] as const,
  endpoints: (build) => ({
    //get all projects.
    getProjects: build.query<Project[], void>({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    createProject: build.mutation<Project, Partial<Project>>({
      query: (project) => ({
        url: "project",
        method: "POST",
        body: { project },
      }),
      invalidatesTags: ["Projects"],
    }),

    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks?projectId=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
          : [{ type: "Tasks" as const }],
    }),

    //creating as task
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),

      invalidatesTags: ["Tasks"],
    }),

    //updating task status.
    updateTasks: build.mutation<Task, { taskId: number; status: string }>({
      query: ({ taskId, status }) => ({
        url: `tasks/${taskId}/status`,
        method: "PATCH",
        body: { status },
      }),

      invalidatesTags: (result, error, taskId) => [{ type: "Tasks", taskId }],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetTasksQuery,
  useCreateProjectMutation,
  useCreateTaskMutation,
} = api;
