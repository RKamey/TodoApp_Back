import { getAttributeFromToken } from "@common/utils/jwtHelper";
import { sendResponse } from "@common/utils/sendResponse";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { profileService } from "../services/profileService";

const getProfileByUserId = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(7);
    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
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
    const token = req.headers.authorization?.slice(7);
    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
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
    const token = req.headers.authorization?.slice(7);
    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
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

const deleteProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.slice(7);
    const user_id = Number(getAttributeFromToken(token as string, "id"));

    if (isNaN(user_id)) {
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
  deleteProfile,
}
