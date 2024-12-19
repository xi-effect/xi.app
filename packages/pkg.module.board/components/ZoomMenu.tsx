import { DefaultZoomMenu, DefaultZoomMenuContent, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';
import { Plus, Minus } from '@xipkg/icons';
import { Button } from '@xipkg/button';

export const ZoomMenu = () => {
  const editor = useEditor();

  const handleZoomIn = () =>
    editor.zoomIn(editor.getViewportScreenCenter(), { animation: { duration: 200 } });

  const handleZoomOut = () =>
    editor.zoomOut(editor.getViewportScreenCenter(), { animation: { duration: 120 } });

  return (
    <div className="absolute bottom-3 right-0.5 z-30">
      <div className="bg-gray-0 rounded-[16px]">
        <div className="flex items-center px-3">
          <Button
            size="s"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleZoomOut()}
          >
            <Minus className="h-4 w-4 lg:h-6 lg:w-6" />
          </Button>
          <div className="flex h-8 items-center justify-center lg:h-auto">
            <DefaultZoomMenu>
              <DefaultZoomMenuContent />
            </DefaultZoomMenu>
          </div>
          <Button
            size="s"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleZoomIn()}
          >
            <Plus className="h-4 w-4 lg:h-6 lg:w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
