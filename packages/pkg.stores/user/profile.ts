import { StateCreator } from 'zustand';
import { get } from 'pkg.utils';
import { UserT } from 'pkg.models';
import { useMainSt } from '../index';

export type UserProfile = {
  user: UserT;
  updateUser: (value: { [key: string]: unknown }) => void;
  getUser: () => { redir?: string; isLogin?: boolean };
};

export type ResponseBodyUserT = {
  id: UserT['id'];
  username: UserT['username'];
  display_name: UserT['displayName'];
  onboarding_stage: UserT['onboardingStage'];
  theme: UserT['theme'];
  email: UserT['email'];
};

export const createUserProfileSt: StateCreator<UserProfile, [], [], UserProfile> = (
  set,
) => ({
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
    const { data, status } = await get<ResponseBodyUserT>({
      service: 'auth',
      path: '/api/users/current/home/',
      config: {
        headers: {
          'Content-Type': 'application/json',
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });

    console.log('getUser', data, status);

    if (status === 200) {
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
    }

    if (status === 401) {
      useMainSt.getState().setIsLogin(false);
    }
  },
});
