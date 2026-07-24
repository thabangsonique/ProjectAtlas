import { Router } from "express";
import { getTasks } from "../controllers/taskController.js";
import { createTask } from "../controllers/taskController.js";
import { updateTaskStatus } from "../controllers/taskController.js";
const router = Router();
router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:taskId/status", updateTaskStatus);
export default router;
//# sourceMappingURL=taskRoutes.js.map