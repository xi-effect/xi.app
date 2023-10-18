'use client';

import { StateCreator } from 'zustand';
import { fetchData } from 'pkg.utils';
import { Common } from '../main';

type Data = { email: string };

export type PasswordRecovery = {
  isEmailSent: boolean;
  setIsEmailSent: (value: boolean) => void;
  onEmailSent: ({
    email,
  }: Data & {
    setError: (name: string, error: { type: string; message: string }) => void;
  }) => void;
};

export const createPasswordRecoverySt: StateCreator<Common, [], [], PasswordRecovery> = (set) => ({
  isEmailSent: false,
  setIsEmailSent: (value: boolean) => set(() => ({ isEmailSent: value })),
  onEmailSent: async ({ email, setError }) => {
    const data = await fetchData('/password-recovery/', 'POST', {
      email: email.toLowerCase(),
    });
    if (data && data.a === 'Success') {
      set(() => ({ isEmailSent: true }));
    } else if (data.a === "User doesn't exist") {
      setError('email', { type: 'user', message: 'Не удалось найти аккаунт' });
    }
  },
});
