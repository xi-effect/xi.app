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
  signIn: { errorPassword: string; errorEmail: string };
  onSignIn: ({
    email,
    password,
    redirectFn,
  }: Data & { redirectFn: (value: string) => void }) => void;
  onSignOut: (redirectFn: (value: string) => void) => void;
};

export const createSignInSt: StateCreator<Common, [], [], SignIn> = (set) => ({
  isLogin: null,
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
  signIn: { errorPassword: '', errorEmail: '' },
  onSignIn: async ({ email, password, redirectFn }) => {
    const data = await fetchData('/signin/', 'POST', {
      email: email.toLowerCase(),
      password: Crypto.SHA384(password.trim()).toString(),
    });
    if (data && data.a === 'Success') {
      set(() => ({ isLogin: true }));
      redirectFn('/');
    } else {
      redirectFn('/signin');
    }
    console.log('onSignIn', data);
  },
  onSignOut: async (redirectFn) => {
    const data = await fetchData('/signout/', 'POST', { lol: 'kek' });
    console.log('onSignIn', data);
    if (data && data?.a) {
      set(() => ({ isLogin: false }));
      redirectFn('/signin');
    }
  },
});
