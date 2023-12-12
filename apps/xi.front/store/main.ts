'use client';

import { create } from 'zustand';
import { UserProfile, createUserProfileSt } from './user/userProfile';
import { UserSettings, createUserSettingsSt } from './user/userSettings';
import { SignIn, createSignInSt } from './auth/signin';
import { VideoConference, createVideoConferenceSt } from './community/videoConference';

export type Common = UserProfile & UserSettings & SignIn & VideoConference;

export const useMainSt = create<Common>()((...a) => ({
  ...createVideoConferenceSt(...a),
  ...createUserProfileSt(...a),
  ...createUserSettingsSt(...a),
  ...createSignInSt(...a)
}));
