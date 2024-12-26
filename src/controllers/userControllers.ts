import type { Request, Response } from "express";
import { sendResponse } from "@utils/sendResponse";
import { userService} from "@services/userService";

const getAllUsers = async (req: Request, res: Response)=> {
  try {
    const allUsers = await userService.getAllUsers(); 
    
    if (!allUsers || allUsers.length === 0) {
      return sendResponse(res, 404, "No users found", null, true);
    }
    
    return sendResponse(res, 200, "Users found", allUsers);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while retrieving users", null, true)
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, "Please provide a valid id", null, true);
    }

    const userFound = await userService.getUserById(Number(userId));

    if (!userFound) {
      return sendResponse(res, 404, "User not found", null, true);
    }

    return sendResponse(res, 200, "User found", userFound);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while retrieving the user", null, true);
  }
}


export const userController = { getAllUsers, getUserById };