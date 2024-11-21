import { StateCreator } from 'zustand';
import { UserT } from 'pkg.models';
import { getUser } from 'pkg.api';
import { convertSnakeToCamelCase } from '@xipkg/utils';
import { useMainSt } from '../index';

type ReturnT = {
  theme: string | null;
};

export type UserProfile = {
  user: UserT;
  updateUser: (value: { [key: string]: unknown }) => void;
  getUser: () => Promise<{ redir?: string; isLogin?: boolean } & ReturnT>;
};

export const createUserProfileSt: StateCreator<UserProfile, [], [], UserProfile> = (set) => ({
  user: {
    id: null, // ID пользователя, уникален
    email: '',
    username: '', // Имя пользователя, может быть неуникальным
    displayName: '', // Уникальное имя пользователя, отображается в интерфейсе как основное
    onboardingStage: null,
    theme: '',
    emailConfirmed: false,
    allowedConfirmationResend: '', // Таймер после которого можно повторно отправить почту
    lastPasswordChange: '',
  },
  updateUser: (value) => set((state) => ({ user: { ...state.user, ...value } })),
  getUser: async () => {
    const { data, status } = await getUser();

    if (status === 200 && data) {
      useMainSt.getState().initSocket();

      set((state) => ({
        user: {
          ...state.user,
          ...convertSnakeToCamelCase(data),
        },
      }));

      useMainSt.getState().setIsLogin(true);
      return { isLogin: true, theme: data.theme };
    }

    if (status === 401) {
      useMainSt.getState().setIsLogin(false);
      return { isLogin: false, theme: null };
    }

    return { isLogin: false, theme: null };
  },
});
