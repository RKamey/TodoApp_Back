import { Router } from "express";
import { ProfileController } from "../controllers/profileController";

const router = Router();

router.get("/:id", ProfileController.getProfileByUserId);
router.post("/", ProfileController.createProfile);
router.patch("/:id", ProfileController.updateProfile);
router.delete("/:id", ProfileController.deleteProfile);

export default router;
