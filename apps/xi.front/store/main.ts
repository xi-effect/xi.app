'use client';

import { create } from 'zustand';
import { UserProfile, createUserProfileSt } from './user/profile';
import { UserSettings, createUserSettingsSt } from './user/settings';
import { SignIn, createAuthSt } from './user/auth';
import { VideoConference, createVideoConferenceSt } from './community/videoConference';

export type Common = UserProfile & UserSettings & SignIn & VideoConference;

export const useMainSt = create<Common>()((...a) => ({
  ...createVideoConferenceSt(...a),
  ...createUserProfileSt(...a),
  ...createUserSettingsSt(...a),
  ...createAuthSt(...a)
}));
