/* eslint-disable no-lone-blocks */

'use client';

import { StateCreator } from 'zustand';
import { post, put } from 'pkg.utils';
import { io } from 'socket.io-client';
import { UseFormSetError } from 'react-hook-form';
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
  }: Data & {
    setError: UseFormSetError<{ email: string; password: string; }>;
  }) => Promise<200 | 400>;
  onSignUp: ({
    email,
    password,
    username,
  }: Data & {
    setError: UseFormSetError<{ email: string; password: string; username: string; }>;
    username: string;
  }) => void;
  onEmailChange: ({
    email,
    password,
  }: Data & {
    setError: UseFormSetError<{ email: string; password: string; }>;
  }) => void;
  onSignOut: () => void;
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
  initSocket: () => {
    if (!useMainSt.getState().socket) {
      const socketInstance = io('https://api.xieffect.ru/', {
        withCredentials: true,
        transports: ['websocket'],
        reconnectionAttempts: 100,
        reconnectionDelay: 2000,
        reconnectionDelayMax: 50000,
      });

      set({ socket: socketInstance });
    }
  },
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
      useMainSt.getState().socket.disconnect();
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
