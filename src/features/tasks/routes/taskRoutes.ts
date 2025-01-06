import { Router } from "express";
import { TaskController } from "../controllers/taskController";

const router = Router();

router.post("/create-task", TaskController.createTask);

export default router;
