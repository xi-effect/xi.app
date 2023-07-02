'use client';

import { StateCreator } from 'zustand';
import { fetchData } from 'pkg.utils';
import { Common } from '../main';

const Crypto = require('crypto-js');

type Data = { email: string; password: string };

export type SignIn = {
  isLogin: boolean | null;
  setIsLogin: (value: boolean) => void;
  signIn: { errorPassword: string; errorEmail: string };
  onSignIn: (data: Data) => void;
};

export const createSignInSt: StateCreator<Common, [], [], SignIn> = (set) => ({
  isLogin: null,
  setIsLogin: (value: boolean) => set(() => ({ isLogin: value })),
  signIn: { errorPassword: '', errorEmail: '' },
  onSignIn: async ({ email, password }: Data) => {
    const data = await fetchData('/signin/', 'POST', {
      email: email.toLowerCase(),
      password: Crypto.SHA384(password.trim()).toString(),
    });
    if (data.a === 'Success') {
      set(() => ({ isLogin: true }));
    }
    console.log('onSignIn', data);
  },
});
