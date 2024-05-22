'use client';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { UserProfile, createUserProfileSt } from './user/profile';
import { Auth, createAuthSt } from './user/auth';
import { VideoConference, createVideoConferenceSt } from './community/videoConference';
import { CurrentCommunity, createCurrentCommunitySt } from './community/currentCommunity';
import { ChannelsCommunity, createChannelsCommunitySt } from './community/channelsCommunity';

export type Common = UserProfile & Auth & VideoConference & CurrentCommunity & ChannelsCommunity;

export const useMainSt = create<Common>()(
  immer((...a) => ({
    ...createVideoConferenceSt(...a),
    ...createUserProfileSt(...a),
    ...createAuthSt(...a),
    ...createCurrentCommunitySt(...a),
    ...createChannelsCommunitySt(...a),
  })),
);
