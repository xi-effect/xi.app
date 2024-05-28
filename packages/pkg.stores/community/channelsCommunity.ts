import { StateCreator } from 'zustand';
import { arrayMove } from '@dnd-kit/sortable';
import { UserProfile } from '../user/profile';
import { VideoConference } from './videoConference';

type CategoryT = {
  uid: string;
  id: number | null | 'empty',
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

type MoveCategoryDataT = {
  categoryId: number;
  afterId: number | null;
  beforeId: number | null;
};

export type ChannelsCommunity = {
  channels: ChannelT[] | null;
  categories: CategoryT[] | null;
  updateChannels: (value: any) => void;
  updateCategories: (value: any) => void;
  addChannel: (value: ChannelT) => void;
  addCategory: (value: CategoryT) => void;
  moveCategory: (moveData: MoveCategoryDataT) => void;
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
  addChannel: (value: ChannelT) => set(({ channels }) =>
    ({ channels: [...(channels || []), value] })),
  addCategory: (value: CategoryT) => set(({ categories }) =>
    ({ categories: [...(categories || []), value] })),
  // @ts-ignore
  moveCategory: ({ categoryId, afterId, beforeId }: MoveCategoryDataT) => set(({ categories }) => {
    if (categories === null) return null;

    const categoryIndex = (categories || []).findIndex((category) => category.id === categoryId);

    if (afterId === null) {
      return { categories: arrayMove(categories, categoryIndex, 0) };
    }

    if (beforeId === null) {
      return { categories: arrayMove(categories, categoryIndex, categories.length - 1) };
    }

    const afterIndex = (categories || []).findIndex((category) => category.id === afterId);

    return { categories: arrayMove(categories, categoryIndex, afterIndex + 1) };
  }),
});
