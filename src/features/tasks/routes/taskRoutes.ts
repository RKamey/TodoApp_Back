import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const router = Router();

router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.createTask);
router.patch("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
