import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const router = Router();

router.get("/", TaskController.getAllTasks);
router.post("/", TaskController.createTask);

export default router;
