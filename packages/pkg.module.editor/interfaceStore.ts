import { create } from 'zustand';

type useInterfaceStoreT = {
  activeCellControls: string | null;
  isAddNewNode: string | null;
  setActiveCellControls: (newValue: string | null) => void;
  setIsAddNewNode: (newValue: string | null) => void;
};

export const useInterfaceStore = create<useInterfaceStoreT>()((set) => ({
  activeCellControls: null,
  isAddNewNode: null,
  setActiveCellControls: (newValue) => set({ activeCellControls: newValue }),
  setIsAddNewNode: (newValue) => set({ isAddNewNode: newValue }),
}));
