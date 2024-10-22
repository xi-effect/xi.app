import { create } from 'zustand';

type CommunityStateT = {
  modal: string | null;
  setModal: (modalType: string | null) => void;
};

export const useCommunityStore = create<CommunityStateT>((set) => ({
  modal: null,
  setModal: (modalType: string | null) => set({ modal: modalType }),
}));
