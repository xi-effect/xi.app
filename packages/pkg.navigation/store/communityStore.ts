import { create } from 'zustand';

type CommunityStateT = {
  isOpenCommunitySettings: boolean;
  isInviteCommunityModalOpen: boolean;
  isCategoryCreateOpen: boolean;
  isCommunityChannelCreateOpen: boolean;

  setIsOpenCommunitySettings: (isOpen: boolean) => void;
  setIsInviteCommunityModalOpen: (isOpen: boolean) => void;
  setIsCategoryCreateOpen: (isOpen: boolean) => void;
  setIsCommunityChannelCreateOpen: (isOpen: boolean) => void;
};

export const useCommunityStore = create<CommunityStateT>((set) => ({
  isOpenCommunitySettings: false,
  isInviteCommunityModalOpen: false,
  isCategoryCreateOpen: false,
  isCommunityChannelCreateOpen: false,

  setIsOpenCommunitySettings: (isOpen: boolean) => set({ isOpenCommunitySettings: isOpen }),
  setIsInviteCommunityModalOpen: (isOpen: boolean) => set({ isInviteCommunityModalOpen: isOpen }),
  setIsCategoryCreateOpen: (isOpen: boolean) => set({ isCategoryCreateOpen: isOpen }),
  setIsCommunityChannelCreateOpen: (isOpen: boolean) =>
    set({ isCommunityChannelCreateOpen: isOpen }),
}));
