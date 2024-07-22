import { DefaultZoomMenu, DefaultZoomMenuContent, useEditor } from 'tldraw';
import 'tldraw/tldraw.css';
import { Plus, Minus } from '@xipkg/icons';
export function ZoomMenu() {
  const editor = useEditor();

  const handleZoomIn = () =>
    editor.zoomIn(editor.getViewportScreenCenter(), { animation: { duration: 200 } });

  const handleZoomOut = () =>
    editor.zoomOut(editor.getViewportScreenCenter(), { animation: { duration: 120 } });

  return (
    <div className="absolute bottom-3 right-3 z-[300]">
      <div className="rounded-[16px] bg-white">
        <div className="flex items-center px-3">
          <div className="cursor-pointer text-[32px]" onClick={() => handleZoomOut()}>
            <Minus className="cursor-pointer text-[32px]" />
          </div>
          <div>
            <DefaultZoomMenu>
              <DefaultZoomMenuContent />
            </DefaultZoomMenu>
          </div>
          <div className="cursor-pointer text-[32px]" onClick={() => handleZoomIn()}>
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
}
