/* eslint-disable no-param-reassign */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type useChatStoreT = {
  chatId: string | null;
  setChatId: (newValue: string | null) => void;
};

export const useChatStore = create<useChatStoreT>()(
  immer((set) => ({
    chatId: null,
    setChatId: (newValue) =>
      set((state) => {
        state.chatId = newValue;
      }),
  })),
);
