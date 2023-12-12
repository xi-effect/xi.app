'use client';

import { StateCreator } from 'zustand';
import { fetchData } from 'pkg.utils';
import { Common } from '../main';

type Data = { email: string; password: string };

export type SignIn = {
  isLogin: boolean | null;
  setIsLogin: (value: boolean) => void;
  onSignIn: ({
    email,
    password,
    redirectFn,
  }: Data & {
    redirectFn: (value: string) => void;
    setError: (name: string, error: { type: string; message: string }) => void;
  }) => void;
  onSignOut: (redirectFn: (value: string) => void) => void;
};

export const createSignInSt: StateCreator<Common, [], [], SignIn> = (set) => ({
  isLogin: null,
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
  onSignIn: async ({ email, password, redirectFn, setError }) => {
    const data = await fetchData({
      service: 'auth',
      pathname: '/api/signin/',
      method: 'POST',
      data: {
        email: email.toLowerCase(),
        password: password.trim().toString(),
      },
      headers: {
        'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
          ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
          : 'false',
      },
    });
    console.log('data', data);
    if (data && data.email && data.id) {
      set(() => ({ isLogin: true }));
      redirectFn('/');
    } else if (data?.detail === 'User not found') {
      setError('email', { type: 'user', message: 'Не удалось найти аккаунт' });
    } else if (data?.detail === 'Wrong password') {
      setError('password', { type: 'wrong', message: 'Неправильный пароль' });
    }
  },
  onSignOut: async (redirectFn) => {
    const data = await fetchData({
      service: 'auth',
      pathname: '/api/signout/',
      method: 'POST',
      headers: {
        'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
          ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
          : 'false',
      },
    });
    if (data && data?.a) {
      set(() => ({ isLogin: false }));
      redirectFn('/');
    }
  },
});
