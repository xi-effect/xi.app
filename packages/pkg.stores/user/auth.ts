/* eslint-disable no-lone-blocks */

'use client';

import { StateCreator } from 'zustand';
import { post } from 'pkg.utils';
import { Common } from '../main';
import { ResponseBodyUserT } from './profile';

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
} & ResponseBodyUserT;

type RequestBodySignUp = {
  username: string;
  email: string;
  password: string;
};

type ResponseBodySignUp = {
  detail: string;
} & ResponseBodyUserT;

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
          'Content-Type': 'application/json',
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    console.log('onSignIn', data, status);
    if (status === 200) {
      {
        set((state) => ({
          isLogin: true,
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
        return 200;
      }
    } else if (data?.detail === 'User not found') {
      setError('email', { type: 'manual', message: 'Не удалось найти аккаунт' });
    } else if (data?.detail === 'Wrong password') {
      setError('password', { type: 'manual', message: 'Неправильный пароль' });
    }

    return 400;
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
          'Content-Type': 'application/json',
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });

    console.log('onSignUp', data, status);
    if (status === 200) {
      {
        set((state) => ({
          isLogin: true,
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
        return 200;
      }
    } else if (data?.detail === 'Username already in use') {
      setError('nickname', { type: 'manual', message: 'Такое имя пользователя уже занято' });
    } else if (data?.detail === 'Email already in use') {
      setError('email', { type: 'manual', message: 'Аккаунт с такой почтой уже зарегистрирован' });
    }

    return 400;
  },
  onSignOut: async () => {
    const { data, status } = await post({
      service: 'auth',
      path: '/api/signout/',
      body: {},
      config: {
        headers: {
          'Content-Type': 'application/json',
          'X-Testing': process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            ? process.env.NEXT_PUBLIC_ENABLE_X_TESTING
            : 'false',
        },
      },
    });
    console.log('status', data, status);
    if (status === 204) {
      set(() => ({ isLogin: false }));
    }
  },
});
