// store/uiStore.ts
import { create } from 'zustand';

interface UIState {
  scale: number;
  pan: { x: number; y: number };
  setScale: (newScale: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  setPan: (pan: { x: number; y: number }) => void;
  viewport: { width: number; height: number };
  setViewport: (viewport: { width: number; height: number }) => void;
  stagePosition: { x: number; y: number };
  setStagePosition: (stagePosition: { x: number; y: number }) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  scale: 1,
  pan: { x: 0, y: 0 },
  setScale: (newScale: number) => set({ scale: newScale }),
  zoomIn: () => {
    const scaleBy = 1.05;
    const newScale = Math.min(get().scale * scaleBy, 3);
    set({ scale: newScale });
  },
  zoomOut: () => {
    const scaleBy = 1.05;
    const newScale = Math.max(get().scale / scaleBy, 0.5);
    set({ scale: newScale });
  },
  setPan: (pan) => set({ pan }),
  viewport: { width: 0, height: 0 },
  setViewport: (viewport) => set({ viewport }),
  stagePosition: { x: 0, y: 0 },
  setStagePosition: (stagePosition) => set({ stagePosition }),
}));
