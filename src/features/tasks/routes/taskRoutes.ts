import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const router = Router();

  router.get("/", TaskController.getAllTasks);
router.get("/:id", TaskController.getTaskById);
router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);
router.patch("/:id/status", TaskController.updateTaskStatus);

export default router;
