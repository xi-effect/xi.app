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
    <div className="border-gray-10 absolute bottom-3 right-3 z-30">
      <div className="bg-gray-0 border-gray-10 flex items-center justify-center rounded-xl border p-1">
        <Button
          className="hover:bg-brand-0 pointer-events-auto flex h-6 w-6 items-center justify-center rounded-lg p-0 lg:h-8 lg:w-8"
          variant="ghost"
          onClick={() => handleZoomOut()}
        >
          <Minus className="h-4 w-4 fill-gray-100 lg:h-6 lg:w-6" />
        </Button>
        <div className="flex h-8 items-center justify-center">
          <DefaultZoomMenu>
            <DefaultZoomMenuContent />
          </DefaultZoomMenu>
        </div>
        <Button
          className="hover:bg-brand-0 pointer-events-auto flex h-6 w-6 items-center justify-center rounded-lg p-0 lg:h-8 lg:w-8"
          variant="ghost"
          onClick={() => handleZoomIn()}
        >
          <Plus className="h-4 w-4 lg:h-6 lg:w-6" />
        </Button>
      </div>
    </div>
  );
};
