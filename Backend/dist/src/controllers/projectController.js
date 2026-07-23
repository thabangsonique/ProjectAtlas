import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany();
        res.json(projects);
    }
    catch (error) {
        res.json({ message: "Error retrieving projects" });
    }
};
//# sourceMappingURL=projectController.js.map