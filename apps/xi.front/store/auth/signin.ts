'use client';

import { StateCreator } from 'zustand';
import { fetchData } from 'pkg.utils';
import { Common } from '../main';
import { redirect } from 'next/navigation';

const Crypto = require('crypto-js');

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
    const data = await fetchData('/signin/', 'POST', {
      email: email.toLowerCase(),
      password: Crypto.SHA384(password.trim()).toString(),
    });
    if (data && data.a === 'Success') {
      set(() => ({ isLogin: true }));
      redirectFn('/');
    } else if (data.a === "User doesn't exist") {
      setError('email', { type: 'user', message: 'Не удалось найти аккаунт' });
    } else if (data.a === 'Wrong password') {
      setError('password', { type: 'wrong', message: 'Неправильный пароль' });
    }
  },
  onSignOut: async (redirectFn) => {
    const data = await fetchData('/signout/', 'POST', { lol: 'kek' });
    if (data && data?.a) {
      set(() => ({ isLogin: false }));
      redirectFn('/');
    }
  },
});
