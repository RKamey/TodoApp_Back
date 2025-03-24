import { Router } from "express";
import { ProfileController } from "../controllers/profileController";

const router = Router();

router.get("/:id", ProfileController.getProfileByUserId);
router.post("/", ProfileController.createProfile);
router.patch("/", ProfileController.updateProfile);
router.delete("/", ProfileController.deleteProfile);

export default router;
