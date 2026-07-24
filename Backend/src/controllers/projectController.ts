import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving projects: ${error.message} ` });
  }
};

//create projects.
export const createProject = async (req: Request, res: Response) => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name: name,
        description: description,
        startDate: startDate,
        endDate: endDate,
      },
    });
    res.status(201).json(newProject);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error creating project: ${error.message}` });
  }
};
