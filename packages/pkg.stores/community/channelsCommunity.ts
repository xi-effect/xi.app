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
  categoryId: number | null;
  afterId: number | null;
  beforeId: number | null;
};

type MoveChannelDataT = {
  channelId: number;
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
  deleteChannel: (value: number) => void;
  deleteCategory: (value: number | null | 'empty') => void;
  moveCategory: (moveData: MoveCategoryDataT) => void;
  moveChannel: (moveData: MoveChannelDataT) => void;
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
  deleteCategory: (value: number | null | 'empty') => set(({ categories }) =>
    categories ? { categories: categories.filter((category : CategoryT) => category.id !== value) } : { categories }),
  deleteChannel: (value: number) => set(({ channels }) =>
    channels ? { channels: channels.filter((channel : ChannelT) => channel.id !== value) } : { channels }),
  // TODO: разобраться с ts
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
  moveChannel: ({ channelId, categoryId, afterId, beforeId }: MoveChannelDataT) =>
    // TODO: разобраться с ts
    // @ts-ignore
    set(({ channels }) => {
      if (channels === null) return null;

      const channelIndex = (channels || []).findIndex((channel) => channel.id === channelId);

      const updatedChannels = channels.map((channel, index) => {
        if (index === channelIndex) {
          return { ...channel, categoryId: categoryId === null ? 'empty' : categoryId };
        }

        return channel;
      });

      // Перетаскивание в пустую категорию
      if (afterId === null && beforeId === null) {
        return { channels: updatedChannels };
      }

      // Для перетаскивания в самое начало
      if (afterId === null && categoryId === null) {
        return { channels: arrayMove(updatedChannels, channelIndex, 0) };
      }

      // Для перетаскивания в конец категории без названия
      if (beforeId === null && categoryId === null) {
        const beforeChannelIndex = (updatedChannels || []).findIndex((channel) =>
          channel.id === beforeId);

        return { channels: arrayMove(updatedChannels, channelIndex, beforeChannelIndex - 1) };
      }

      if (afterId === null) {
        const beforeIndex = (updatedChannels || []).findIndex((channel) => channel.id === beforeId);

        return { channels: arrayMove(updatedChannels, channelIndex, beforeIndex - 1) };
      }

      console.log('Проблема тут');

      const afterIndex = (updatedChannels || []).findIndex((channel) => channel.id === afterId);

      console.log('channelIndex', channelIndex);
      console.log('afterIndex', afterIndex);

      return { channels: arrayMove(updatedChannels, channelIndex, afterIndex + 1) };
    }),
});
