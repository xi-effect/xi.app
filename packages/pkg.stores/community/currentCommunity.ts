/* eslint-disable @typescript-eslint/no-explicit-any */

import { StateCreator } from 'zustand';
import { UserProfile } from '../user/profile';
import { VideoConference } from './videoConference';

type CommunityMeta = {
  id: number | null;
  isOwner: boolean | null;
  name: string | null;
  description: string | null;
};

export type CurrentCommunity = {
  communityMeta: CommunityMeta;
  updateCommunityMeta: (value: any) => void;
};

export const createCurrentCommunitySt: StateCreator<
  UserProfile & VideoConference & CurrentCommunity,
  [],
  [],
  CurrentCommunity
> = (set) => ({
  communityMeta: {
    id: null,
    isOwner: null,
    name: null,
    description: null,
  },
  updateCommunityMeta: (value) =>
    set((state) => ({ communityMeta: { ...state.communityMeta, ...value } })),
});
