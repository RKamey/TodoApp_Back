import { Router } from "express";
import { userController } from "@controllers/userControllers";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

export default router;