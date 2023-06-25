import { StateCreator } from 'zustand';
import { UserSettings } from './userSettings';

export type UserProfile = {
  name: string;
  updateName: (newName: string) => void;
};

export const createUserProfileSt: StateCreator<UserProfile & UserSettings, [], [], UserProfile> = (
  set,
) => ({
  name: 'John',
  updateName: (newName: string) => set(() => ({ name: newName })),
});
