import { StateCreator } from 'zustand';
import { UserT } from 'pkg.models';
import { getUser } from 'pkg.api';
import { useMainSt } from '../index';

export type UserProfile = {
  user: UserT;
  updateUser: (value: { [key: string]: unknown }) => void;
  getUser: () => { redir?: string; isLogin?: boolean };
};

export const createUserProfileSt: StateCreator<UserProfile, [], [], UserProfile> = (set) => ({
  user: {
    id: null, // ID пользователя, уникален
    email: '',
    username: '', // Имя пользователя, может быть неуникальным
    displayName: '', // Уникальное имя пользователя, отображается в интерфейсе как основное
    onboardingStage: null,
    theme: '',
  },
  updateUser: (value) => set((state) => ({ user: { ...state.user, ...value } })),
  getUser: async () => {
    const { data, status } = await getUser();

    if (status === 200 && data) {
      useMainSt.getState().initSocket();

      set((state) => ({
        user: {
          ...state.user,
          onboardingStage: data.onboarding_stage,
          username: data.username,
          id: data.id,
          displayName: data.display_name,
          theme: data.theme,
          email: data.email,
        },
      }));

      useMainSt.getState().setIsLogin(true);
    }

    if (status === 401) {
      useMainSt.getState().setIsLogin(false);
    }
  },
});
