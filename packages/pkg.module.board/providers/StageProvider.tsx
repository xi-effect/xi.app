import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  type RefObject,
  useMemo,
} from 'react';
import type Konva from 'konva';

type StageContextTypeT = {
  stageRef: RefObject<Konva.Stage | null>;
  transformerRef: RefObject<Konva.Transformer | null>;
  tooltipTransformerRef: RefObject<Konva.Transformer | null>;
  layerRef: RefObject<Konva.Layer | null>;
  getRelativePointerPosition: () => { x: number; y: number } | null;
};

const StageContext = createContext<StageContextTypeT | null>(null);

export const StageProvider = ({ children }: { children: React.ReactNode }) => {
  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const tooltipTransformerRef = useRef<Konva.Transformer>(null);
  const layerRef = useRef<Konva.Layer>(null);

  const getRelativePointerPosition = useCallback(() => {
    if (!stageRef.current) return null;
    return stageRef.current.getRelativePointerPosition();
  }, []);

  const value = useMemo(
    () => ({
      stageRef,
      transformerRef,
      tooltipTransformerRef,
      layerRef,
      getRelativePointerPosition,
    }),
    [getRelativePointerPosition],
  );

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>;
};

export const useStage = () => {
  const context = useContext(StageContext);
  if (!context) {
    throw new Error('useStage must be used within a StageProvider');
  }
  return context;
};
