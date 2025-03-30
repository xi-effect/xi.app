import { memo, useEffect } from 'react';
import { Layer, Transformer } from 'react-konva';
import { useBoardStore } from './store';
import { LineShape } from './components/Shapes';
import { useStage } from './providers';
import { useElementHandlers, useIsStageScaling } from './hooks';

export const CanvasLayer = memo(() => {
  const { boardElements, selectedElementId, selectedTool, setSelectToolbarPosition } =
    useBoardStore();

  const { layerRef, transformerRef } = useStage();
  const { onChangeTransformerPosition } = useElementHandlers();
  const { isScaling } = useIsStageScaling();

  useEffect(() => {
    if (transformerRef.current && selectedElementId) {
      const selectedNode = layerRef.current?.findOne(`#${selectedElementId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer()?.batchDraw();
        const box = transformerRef.current.getClientRect();
        setSelectToolbarPosition({
          x: box.x,
          y: box.y,
        });
      } else {
        transformerRef.current.nodes([]);
      }
    } else {
      transformerRef.current?.nodes([]);
    }
  }, [layerRef, selectedElementId, setSelectToolbarPosition, transformerRef]);

  useEffect(() => {
    if (!isScaling && selectedElementId) {
      onChangeTransformerPosition();
    }
  }, [isScaling, selectedElementId, onChangeTransformerPosition]);

  return (
    <Layer ref={layerRef}>
      {boardElements.map((element) =>
        element.type === 'line' ? <LineShape key={element.id} element={element} /> : null,
      )}
      {selectedElementId && selectedTool === 'select' && (
        <Transformer
          ref={transformerRef}
          rotateEnabled={false}
          anchorCornerRadius={8}
          anchorStroke="#070707"
          borderStroke="#070707"
          borderDash={[5, 5]}
          padding={8}
          enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
          onTransform={onChangeTransformerPosition}
          onDragMove={onChangeTransformerPosition}
        />
      )}
    </Layer>
  );
});

CanvasLayer.displayName = 'CanvasLayer';
