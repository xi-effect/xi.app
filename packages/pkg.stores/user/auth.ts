/* eslint-disable no-lone-blocks */

'use client';

import { StateCreator } from 'zustand';
import { post, put } from 'pkg.utils';
import { io } from 'socket.io-client';
import { Common, useMainSt } from '../main';
import { ResponseBodyUserT } from './profile';

type Data = { email: string; password: string };

export type Auth = {
  socket: any;
  isLogin: boolean | null;
  initSocket: () => void;
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
    username,
    redirectFn,
  }: Data & {
    redirectFn: (value: string) => void;
    setError: (name: string, error: { type: string; message: string }) => void;
    username: string;
  }) => void;
  onEmailChange: ({
    email,
    password,
  }: Data & {
    setError: (name: string, error: { type: string; message: string }) => void;
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

type RequestBodyChangeEmail = {
  detail: string;
} & ResponseBodyUserT;

type ResponseBodyChangeEmail = {
  new_email: string;
  password: string;
};

export const createAuthSt: StateCreator<Common, [], [], Auth> = (set) => ({
  socket: null,
  isLogin: null,
  initSocket: () => set(() => ({
    socket: io('https://api.xieffect.ru/', {
      withCredentials: true,
      transports: ['websocket'],
    }),
  })),
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
      useMainSt.getState().initSocket();
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
  onSignUp: async ({ username, email, password, setError }) => {
    const { data, status } = await post<RequestBodySignUp, ResponseBodySignUp>({
      service: 'auth',
      path: '/api/signup/',
      body: {
        email: email.toLowerCase(),
        password: password.trim().toString(),
        username,
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
      useMainSt.getState().initSocket();
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
      setError('username', { type: 'manual', message: 'Такое имя пользователя уже занято' });
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
  onEmailChange: async ({ email, password, setError }) => {
    const { data, status } = await put<ResponseBodyChangeEmail, RequestBodyChangeEmail>({
      service: 'auth',
      path: '/api/users/current/email/',
      body: {
        new_email: email.toLowerCase(),
        password: password.trim().toString(),
      },
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });
    if (status === 200) {
      set((state) => ({
        user: {
          ...state.user,
          email: data.email,
        },
      }));
      return 200;
    }
    if (data?.detail === 'Wrong password') {
      setError('password', { type: 'manual', message: 'Неправильный пароль' });
    }

    return 400;
  },
});
