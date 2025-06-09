import prisma from "prismaClient";
import type { CreateProfile } from "../types/Profile";

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
    const { name, ...profileData } = profile;

    const newProfile = await prisma.profile.create({
      data: {
        user_id: userId,
        ...profileData,
      },
    });

    if (name) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          isProfileComplete: true,
        },
      });
    }

    return newProfile;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const updateProfile = async (userId: number, profile: CreateProfile) => {
  try {
    const { name, ...profileData } = profile;

    const updatedProfile = await prisma.profile.update({
      where: {
        user_id: userId
      },
      data: {
        ...profileData
      }
    });

    if (name) {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: name,
          isProfileComplete: true,
        },
      });
    }

    return updatedProfile;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

const updateProfileAvatar = async (userId: number, avatarUrl: string) => {
  return await prisma.profile.update({
    where: { user_id: userId },
    data: { avatar_url: avatarUrl },
  });
};

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
  updateProfileAvatar,
  deleteProfile
}