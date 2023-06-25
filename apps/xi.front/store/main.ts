import { create } from 'zustand';
import { UserProfile, createUserProfileSt } from './user/userProfile';
import { UserSettings, createUserSettingsSt } from './user/userSettings';
import { SignIn, createSignInSt } from './auth/signin';

export type Common = UserProfile & UserSettings & SignIn;

export const useMainSt = create<Common>()((...a) => ({
  ...createUserProfileSt(...a),
  ...createUserSettingsSt(...a),
  ...createSignInSt(...a),
}));
