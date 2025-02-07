// store/useBoardStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BoardElement } from '../types';

interface BoardState {
  boardElements: BoardElement[];
  addElement: (element: BoardElement) => void;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  removeElement: (id: string) => void;
  clearBoard: () => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boardElements: [],
      addElement: (element: BoardElement) =>
        set((state) => ({ boardElements: [...state.boardElements, element] })),
      updateElement: (id: string, updates: Partial<BoardElement>) =>
        set((state) => ({
          boardElements: state.boardElements.map((el) =>
            el.id === id ? { ...el, ...updates } : el,
          ),
        })),
      removeElement: (id: string) =>
        set((state) => ({
          boardElements: state.boardElements.filter((el) => el.id !== id),
        })),
      clearBoard: () => set(() => ({ boardElements: [] })),
    }),
    { name: 'board-storage' },
  ),
);
