'use client';

import { StateCreator } from 'zustand';
import { fetchData } from 'pkg.utils';
import { useMainSt } from 'store/main';
import { UserSettings } from './userSettings';

export type UserProfile = {
  name: string;
  updateName: (newName: string) => void;
  getUser: () => void;
};

export const createUserProfileSt: StateCreator<UserProfile & UserSettings, [], [], UserProfile> = (
  set,
) => ({
  name: 'John',
  updateName: (newName: string) => set(() => ({ name: newName })),
  getUser: async () => {
    const data = await fetchData('/users/me/profile/', 'GET');
    console.log('fetchData', data);
    if (data === null) {
      useMainSt.getState().setIsLogin(false);
      console.log('useMainSt.getState().isLogin', useMainSt.getState().isLogin);
    } else {
      useMainSt.getState().setIsLogin(true);
    }
    console.log('getUser', 'getUser');
  },
});
