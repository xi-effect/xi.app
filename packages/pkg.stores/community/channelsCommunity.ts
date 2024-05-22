import { StateCreator } from 'zustand';
import { UserProfile } from '../user/profile';
import { VideoConference } from './videoConference';

type CategoryT = {
  uid: string;
  id: number | null,
  name: string | null,
  description: string | null,
};

type ChannelT = {
  uid: string;
  id: number,
  categoryId: number | 'empty',
  kind: string,
  name: string,
  disabled?: boolean;
};

export type ChannelsCommunity = {
  channels: ChannelT[] | null;
  categories: CategoryT[] | null;
  updateChannels: (value: any) => void;
  updateCategories: (value: any) => void;
};

export const createChannelsCommunitySt: StateCreator<
  UserProfile & VideoConference & ChannelsCommunity,
  [],
  [],
  ChannelsCommunity
> = (set) => ({
  channels: null,
  categories: null,
  updateChannels: (value) => set(() =>
    ({ channels: [...value] })),
  updateCategories: (value) => set(() =>
    ({ categories: [...value] })),
});
