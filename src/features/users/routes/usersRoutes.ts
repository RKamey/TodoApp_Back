import { Router } from "express";
import { userController } from "features/users/controllers/userControllers";

const router = Router();

router.get("/", userController.getAllUsers);
router.get("/me", userController.getMe);
router.get("/me/full", userController.getMeFull);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.patch("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;