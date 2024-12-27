import { Router } from "express";
import { userController } from "features/users/controllers/userControllers";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.delete("/:id", userController.deleteUser);

export default router;