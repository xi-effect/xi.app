'use client';

import { StateCreator } from 'zustand';
import { post } from 'pkg.utils';
import { Common } from '../main';

type Data = { email: string; password: string };

export type Auth = {
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
  onSignUp: ({
    email,
    password,
    nickname,
    redirectFn,
  }: Data & {
    redirectFn: (value: string) => void;
    setError: (name: string, error: { type: string; message: string }) => void;
    nickname: string;
  }) => void;
  onSignOut: (redirectFn?: (value: string) => void) => void;
};

type RequestBodySignIn = {
  email: string;
  password: string;
};

type ResponseBodySignIn = {
  detail: string;
};

type RequestBodySignUp = {
  username: string;
  email: string;
  password: string;
};

type ResponseBodySignUp = {
  detail: string;
};

export const createAuthSt: StateCreator<Common, [], [], Auth> = (set) => ({
  isLogin: null,
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
  onSignIn: async ({ email, password, setError }) => {
    const { data, status } = await post<RequestBodySignIn, ResponseBodySignIn>({
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
      return 200;
    } else if (data?.detail === 'User not found') {
      setError('email', { type: 'manual', message: 'Не удалось найти аккаунт' });
    } else if (data?.detail === 'Wrong password') {
      setError('password', { type: 'manual', message: 'Неправильный пароль' });
    }
  },
  onSignUp: async ({ nickname, email, password, setError }) => {
    const { data, status } = await post<RequestBodySignUp, ResponseBodySignUp>({
      service: 'auth',
      path: '/api/signup/',
      body: {
        email: email.toLowerCase(),
        password: password.trim().toString(),
        username: nickname,
      },
      config: {
        headers: {
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    console.log('onSignUp', data, status);
    if (status === 200) {
      set(() => ({ isLogin: true }));
      return 200;
    } else if (data?.detail === 'Username already in use') {
      setError('nickname', { type: 'manual', message: 'Такой никнейм уже занят' });
    } else if (data?.detail === 'Email already in use') {
      setError('email', { type: 'manual', message: 'Аккаунт с такой почтой уже зарегистрирован' });
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
    console.log('status', status);
    if (status === 204) {
      set(() => ({ isLogin: false }));
    }
  },
});
