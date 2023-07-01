'use client';

import { StateCreator } from 'zustand';
import { Common } from '../main';

export type SignIn = {
  signIn: { errorPassword: string; errorEmail: string };
  onSignIn: (newName: string) => void;
};

export const createSignInSt: StateCreator<Common, [], [], SignIn> = (set) => ({
  signIn: { errorPassword: '', errorEmail: '' },
  onSignIn: (newName: string) => set(() => ({ name: newName })),
});
