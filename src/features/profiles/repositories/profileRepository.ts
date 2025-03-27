import prisma from "prismaClient";
import type { CreateProfile } from "../types/Profile";
import type { Profile } from "../types/Profile";

const getProfileByUserId = async (userId: number) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        user_id: userId
      }
    });
    return profile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const createProfile = async (userId: number, profile: CreateProfile) => {
  try {
    const newProfile = await prisma.profile.create({
      data: {
        user_id: userId,
        ...profile,       
      }
    });

    return newProfile;
  } catch ( error ) {
    console.log(error);
    throw error;
  }
}

const updateProfile = async (userId: number, profile: CreateProfile) => {
  try {
    const updatedProfile = await prisma.profile.update({
      where: {
        user_id: userId
      },
      data: {
        ...profile
      }
    });

    return updatedProfile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const deleteProfile = async (userId: number) => {
  try {
    const deletedProfile = await prisma.profile.delete({
      where: {
        user_id: userId
      }
    });

    return deletedProfile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export const profileRepository = {
  getProfileByUserId,
  createProfile,
  updateProfile,
  deleteProfile
}