'use client';

import { StateCreator } from 'zustand';
import { post } from 'pkg.utils';
import { Common } from '../main';
import { redirect } from 'next/navigation';

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
  onSignOut: (redirectFn?: (value: string) => void) => void;
};

type RequestBody = {
  email: string;
  password: string;
};

type ResponseBody = {
  detail: string;
};

export const createSignInSt: StateCreator<Common, [], [], SignIn> = (set) => ({
  isLogin: null,
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
  onSignIn: async ({ email, password, redirectFn, setError }) => {
    const { data, status } = await post<RequestBody, ResponseBody>({
      service: 'auth',
      path: '/api/signin/',
      body: {
        email: email.toLowerCase(),
        password: password.trim().toString(),
      },
      config: {
        headers: {
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    console.log('onSignIn', data, status);
    if (status === 200) {
      set(() => ({ isLogin: true }));
      redirect('/');
    } else if (data?.detail === 'User not found') {
      setError('email', { type: 'user', message: 'Не удалось найти аккаунт' });
    } else if (data?.detail === 'Wrong password') {
      setError('password', { type: 'wrong', message: 'Неправильный пароль' });
    }
  },
  onSignOut: async () => {
    const { data, status } = await post({
      service: 'auth',
      path: '/api/signout/',
      body: {},
      config: {
        headers: {
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    if (status === 200) {
      set(() => ({ isLogin: false }));
      redirect('/');
    }
  },
});
