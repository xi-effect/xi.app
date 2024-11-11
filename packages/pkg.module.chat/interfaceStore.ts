import { create } from 'zustand';

type CurrentSidebarT = 'media' | 'pinned' | 'users' | null;

type useInterfaceStoreT = {
  currentSidebar: CurrentSidebarT;
  setCurrentSidebar: (newValue: CurrentSidebarT) => void;
};

export const useInterfaceStore = create<useInterfaceStoreT>()((set) => ({
  currentSidebar: null,
  setCurrentSidebar: (newValue) => set({ currentSidebar: newValue }),
}));
