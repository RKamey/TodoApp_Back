import { getAttributeFromToken } from "@common/utils/jwtHelper";
import { sendResponse } from "@common/utils/sendResponse";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { profileService } from "../services/profileService";

const getProfileByUserId = async (req: Request, res: Response) => {
  try {
    
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const profile = await profileService.getProfileByUserId(user_id);

    return sendResponse(res, 200, "Profile retrieved successfully", profile);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error retrieving profile", error);
    }
  }
}

const createProfile = async (req: Request, res: Response) => {
  try {
    
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const profile = await profileService.createProfile(user_id, req.body);

    return sendResponse(res, 201, "Profile created successfully", profile);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error creating profile", error);
    }
  }
}

const updateProfile = async (req: Request, res: Response) => {
  try {
    
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const profile = await profileService.updateProfile(user_id, req.body);

    return sendResponse(res, 200, "Profile updated successfully", profile);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error updating profile", error);
    }
  }
}

const updateProfileAvatar = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    const { avatar_url } = req.body;

    if (!avatar_url || typeof avatar_url !== "string") {
      return sendResponse(res, 400, "Invalid payload", "avatar_url is required and must be a string");
    }

    const updatedProfile = await profileService.updateProfileAvatar(userId, avatar_url);

    return sendResponse(res, 200, "Avatar updated", updatedProfile);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    }

    console.error("Error updating avatar:", error);
    return sendResponse(res, 500, "Server Error", "Failed to update avatar");
  }
};


const deleteProfile = async (req: Request, res: Response) => {
  try {
    
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 401, "Unauthorized", "User not found");
    }

    await profileService.deleteProfile(user_id);

    return sendResponse(res, 200, "Profile deleted successfully");
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendResponse(res, 401, "Unauthorized", "Invalid token");
    } else {
      return sendResponse(res, 500, "Error deleting profile", error);
    }
  }
}

export const ProfileController = {
  getProfileByUserId,
  createProfile,
  updateProfile,
  updateProfileAvatar,
  deleteProfile,
}
