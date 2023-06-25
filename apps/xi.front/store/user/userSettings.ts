import { StateCreator } from 'zustand';
import { UserProfile } from './userProfile';

export type UserSettings = {
  id: number | null; // ID пользователя, уникален
  username: string; // Имя пользователя, может быть неуникальным
  handle: string; // Уникальное имя пользователя, отображается в интерфейсе как основное
  updateUsername: (newUsername: string) => void;
};

export const createUserSettingsSt: StateCreator<
  UserSettings & UserProfile,
  [],
  [],
  UserSettings
> = (set) => ({
  id: 0,
  username: 'un',
  handle: 'aa',
  updateUsername: (newUsername: string) => set(() => ({ username: newUsername })),
});
