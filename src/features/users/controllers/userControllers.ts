import type { Request, Response } from "express";
import { sendResponse } from "@common/utils/sendResponse";
import { userService} from "features/users/services/userService";

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

const getMe = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 404, "User not found", null, true);
    }

    const userProfile = await userService.getMe(user_id);

    return sendResponse(res, 200, "User found", userProfile);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while retrieving the user", null, true);
  }
};


const getMeFull = async (req: Request, res: Response) => {
  try {
    const user_id = req.user?.id;

    if (!user_id) {
      return sendResponse(res, 404, "User not found", null, true);
    }

    const userProfile = await userService.getMeFull(user_id);

    return sendResponse(res, 200, "User found", userProfile);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while retrieving the user", null, true);
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    if (!user) {
      return sendResponse(res, 400, "Invalid user provided", null, true);
    }

    const createUser = await userService.createUser(user);

    if (!createUser) {
      return sendResponse(res, 404, "There was an unexpected error", null, true);
    }

    return sendResponse(res, 201, "User created succesfully!", createUser)
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while retrieving the user", null, true);
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;
    const user = req.body;

    if (!userId || !user) {
      return sendResponse(res, 400, "Please provide a valid id and user", null, true);
    }

    const userUpdated = await userService.updateUser(Number(userId), user);

    if (!userUpdated) {
      return sendResponse(res, 404, "User not found", null, true);
    }

    return sendResponse(res, 200, "User updated succesfully", userUpdated);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while updating the user", null, true);
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, "Please provide a valid id", null, true);
    }

    const userDeleted = await userService.deleteUser(Number(userId));

    if (!userDeleted) {
      return sendResponse(res, 404, "User not found", null, true);
    }

    return sendResponse(res, 200, "User deleted succesfully", userDeleted);
  } catch (error) {
    return sendResponse(res, 500, "An error occurred while deleting the user", null, true);
  }
}


export const userController = { getAllUsers, getUserById, getMe, getMeFull, createUser, updateUser, deleteUser };