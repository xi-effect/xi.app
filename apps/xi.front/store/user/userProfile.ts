import { StateCreator } from 'zustand';
import { get } from 'pkg.utils';
import { useMainSt } from 'store/main';
import { UserSettings } from './userSettings';
import { UserT } from 'store/models/user';
import { redirect } from 'next/navigation';
import { setTimeout } from 'timers';

type DataUserMethodAnswer = {
  [key: string]: unknown;
};

export type UserProfile = {
  user: UserT;
  updateUser: (value) => void;
  getUser: () => void;
};

export const createUserProfileSt: StateCreator<UserProfile & UserSettings, [], [], UserProfile> = (
  set,
) => ({
  user: {
    id: null, // ID пользователя, уникален
    username: '', // Имя пользователя, может быть неуникальным
    handle: '', // Уникальное имя пользователя, отображается в интерфейсе как основное
    avatar: null, // Аватарка пользователя
    communities: [], // Массив Сообществ
  },
  updateUser: (value: { [key in keyof UserT]: unknown }) =>
    set((state) => ({ user: { ...state.user, value } })),
  getUser: async () => {
    const { data, status } = await get({
      service: 'auth',
      path: '/api/users/current/home/',
      config: {
        headers: {
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    if (status === 401) {
      setTimeout(() => useMainSt.getState().setIsLogin(false), 500);
      console.log('useMainSt.getState().isLogin', useMainSt.getState().isLogin);
    } else {
      setTimeout(() => useMainSt.getState().setIsLogin(true), 500);
    }
  },
});
