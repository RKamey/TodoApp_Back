import { profileRepository } from '../repositories/profileRepository';
import type { CreateProfile } from '../types/Profile';

const getProfileByUserId = (userId: number) => {
  return profileRepository.getProfileByUserId(userId);
}

const createProfile = (userId: number, profile: CreateProfile) => {
  return profileRepository.createProfile(userId, profile);
}

const updateProfile = (userId: number, profile: CreateProfile) => {
  return profileRepository.updateProfile(userId, profile);
}

const updateProfileAvatar = (userId: number, avatar: string) => {
  return profileRepository.updateProfileAvatar(userId, avatar);
}

const deleteProfile = (userId: number) => {
  return profileRepository.deleteProfile(userId);
}

export const profileService = {
  getProfileByUserId,
  createProfile,
  updateProfile,
  updateProfileAvatar,
  deleteProfile
}