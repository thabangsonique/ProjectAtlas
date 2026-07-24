import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tasks: ${error.message}` });
  }
};

//creating a task
export const createTask = async (req: Request, res: Response) => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId, //user that created the task
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId, //user that created the task
        assignedUserId,
      },
    });
    res.json(newTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating task: ${error.message}` });
  }
};

//update status of task, drag and drop style.
export const updateTaskStatus = async (req: Request, res: Response) => {
  const { status } = req.body;
  const { taskId } = req.params;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      },
    });
    res.json(updatedTask);
  } catch (error: any) {
    res.status(500).json({ message: `Error creating task: ${error.message}` });
  }
};
