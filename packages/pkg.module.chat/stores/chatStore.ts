import { create } from 'zustand';
import { MessageT } from '../models/Message';

type useChatStoreT = {
  chatId: string | null;
  setChatId: (newValue: string | null) => void;
  messages: MessageT[] | null;
  setMessages: (newValue: MessageT[] | null) => void;
  removeMessageById: (id: string) => void;
  hasNextPage: boolean;
  setHasNextPage: (hasNextPage: boolean) => void;
};

export const useChatStore = create<useChatStoreT>()((set) => ({
  chatId: null,
  setChatId: (newValue: string | null) =>
    set({
      chatId: newValue,
    }),
  messages: null,
  setMessages: (newValue: MessageT[] | null) =>
    set({
      messages: newValue,
    }),
  removeMessageById: (id: string) =>
    set((state) => ({
      messages: state.messages ? state.messages.filter((message) => message.id !== id) : null,
    })),
  hasNextPage: false,
  setHasNextPage: (hasNextPage: boolean) => set({ hasNextPage }),
}));
