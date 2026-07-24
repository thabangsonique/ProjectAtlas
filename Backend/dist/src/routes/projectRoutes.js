import { Router } from "express";
import { getProjects, createProject, } from "../controllers/projectController.js";
const router = Router();
router.get("/", getProjects);
router.post("/", createProject);
export default router;
//# sourceMappingURL=projectRoutes.js.map