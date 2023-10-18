'use client';

import { create } from 'zustand';
import { UserProfile, createUserProfileSt } from './user/userProfile';
import { UserSettings, createUserSettingsSt } from './user/userSettings';
import { SignIn, createSignInSt } from './auth/signin';
import { PasswordRecovery,createPasswordRecoverySt } from './auth/password-recovery';

export type Common = UserProfile & UserSettings & SignIn & PasswordRecovery;

export const useMainSt = create<Common>()((...a) => ({
  ...createUserProfileSt(...a),
  ...createUserSettingsSt(...a),
  ...createSignInSt(...a),
  ...createPasswordRecoverySt(...a)
}));
