// store/useBoardStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BoardElement, ToolType } from '../types';

interface BoardState {
  boardElements: BoardElement[];
  addElement: (element: BoardElement) => void;
  updateElement: (id: string, updates: Partial<BoardElement>) => void;
  removeElement: (id: string) => void;
  clearBoard: () => void;
  selectedTool: ToolType;
  setSelectedTool: (tool: ToolType) => void;
  selectedElementId: string | null;
  selectElement: (id: string | null) => void;
  isElementTransforming: boolean;
  setIsElementTransforming: (value: boolean) => void;
  selectToolbarPosition: { x: number; y: number };
  setSelectToolbarPosition: (position: { x: number; y: number }) => void;
}

export const useBoardStore = create<BoardState>()(
  persist(
    (set) => ({
      boardElements: [],
      addElement: (element: BoardElement) => {
        set((state) => ({ boardElements: [...state.boardElements, element] }));
      },
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
      selectedTool: 'select',
      setSelectedTool: (tool: ToolType) => set(() => ({ selectedTool: tool })),
      selectedElementId: null,
      selectElement: (id: string | null) => set(() => ({ selectedElementId: id })),
      isElementTransforming: false,
      setIsElementTransforming: (value) => {
        set(() => ({ isElementTransforming: value }));
      },
      selectToolbarPosition: { x: 0, y: 0 },
      setSelectToolbarPosition: (position: { x: number; y: number }) => {
        set(() => ({ selectToolbarPosition: position }));
      },
    }),
    { name: 'board-storage' },
  ),
);
