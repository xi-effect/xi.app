import { StateCreator } from 'zustand';
// import { post } from 'pkg.utils';
import { UserSettings } from '../user/settings';
import { UserProfile } from '../user/profile';
import { VideoConference } from './videoConference';

type CommunityMeta = {
  id: number | null,
  isOwner: boolean | null,
  name: string | null,
  description: string | null,
};

export type CurrentCommunity = {
  communityMeta: CommunityMeta;
  updateCommunityMeta: (value: any) => void;
};

// type RequestBody = {
//   room_name: string;
// };

// type ResponseBody = {
//   token: string;
// };

export const createCurrentCommunitySt: StateCreator<
  UserProfile & UserSettings & VideoConference & CurrentCommunity,
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
  updateCommunityMeta: (value) => set((state) =>
    ({ communityMeta: { ...state.communityMeta, ...value } })),
});
