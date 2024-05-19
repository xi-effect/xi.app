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
  id: number | null,
  categoryId: number | null,
  kind: 'posts' | 'video' | 'tasks' | 'chats' | 'home',
  name: string | null,
  description: string | null,
  disabled?: boolean;
};

export type ChannelsCommunity = {
  channels: ChannelT[];
  categories: CategoryT[];
  updateChannels: (value: any) => void;
  updateCategories: (value: any) => void;
};

export const createChannelsCommunitySt: StateCreator<
  UserProfile & VideoConference & ChannelsCommunity,
  [],
  [],
  ChannelsCommunity
> = (set) => ({
  channels: [],
  categories: [],
  updateChannels: (value) => set(() =>
    ({ channels: [...value] })),
  updateCategories: (value) => set(() =>
    ({ categories: [...value] })),
});
