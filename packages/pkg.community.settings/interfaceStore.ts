import { create } from 'zustand';

type useInterfaceStoreT = {
    page: number;
    isMenu: boolean;
    isAnimate: boolean;
    isCloseActive: boolean;
    setPage: (newPage: number) => void;
    setIsMenu: (newIsMenu: boolean) => void;
    setIsAnimate: (newIsAnimate: boolean) => void;
    setIsCloseActive: (newIsCloseActive: boolean) => void;
};

export const useInterfaceStore = create<useInterfaceStoreT>()((set) => ({
    page: 0,
    isMenu: true,
    isAnimate: false,
    isCloseActive: true,
    setPage: (newPage) => set({ page: newPage }),
    setIsMenu: (newIsMenu) => set({ isMenu: newIsMenu }),
    setIsAnimate: (newIsAnimate) => set({ isAnimate: newIsAnimate }),
    setIsCloseActive: (newIsCloseActive) => set({ isCloseActive: newIsCloseActive }),
}));
