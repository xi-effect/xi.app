import { DefaultZoomMenu, DefaultZoomMenuContent, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';
import { Plus, Minus } from '@xipkg/icons';
import { Button } from '@xipkg/button';

export function ZoomMenu() {
  const editor = useEditor();

  const handleZoomIn = () =>
    editor.zoomIn(editor.getViewportScreenCenter(), { animation: { duration: 200 } });

  const handleZoomOut = () =>
    editor.zoomOut(editor.getViewportScreenCenter(), { animation: { duration: 120 } });

  return (
    <div className="absolute bottom-3 right-3 z-[300]">
      <div className="bg-gray-0 rounded-[16px]">
        <div className="flex items-center px-3">
          <Button
            size="s"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleZoomOut()}
          >
            <Minus className="cursor-pointer" />
          </Button>
          <div>
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
            <Plus />
          </Button>
        </div>
      </div>
    </div>
  );
}
