'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { UserProfile, createUserProfileSt } from './user/profile';
import { UserSettings, createUserSettingsSt } from './user/settings';
import { Auth, createAuthSt } from './user/auth';
import { VideoConference, createVideoConferenceSt } from './community/videoConference';
import { CurrentCommunity, createCurrentCommunitySt } from './community/currentCommunity';

export type Common = UserProfile & UserSettings & Auth & VideoConference & CurrentCommunity;

export const useMainSt = create<Common>()(
  immer((...a) => ({
    ...createVideoConferenceSt(...a),
    ...createUserProfileSt(...a),
    ...createUserSettingsSt(...a),
    ...createAuthSt(...a),
    ...createCurrentCommunitySt(...a),
  })),
);
