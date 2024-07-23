/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

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
      <div className="bg-gray-0 rounded-[16px]">
        <div className="flex items-center px-3">
          {/* TODO: Исправить на кнопки, убрав исключения eslint в начале этого файла */}
          <div className="cursor-pointer" onClick={() => handleZoomOut()}>
            <Minus className="cursor-pointer" />
          </div>
          <div>
            <DefaultZoomMenu>
              <DefaultZoomMenuContent />
            </DefaultZoomMenu>
          </div>
          {/* TODO: Исправить на кнопки */}
          <div className="cursor-pointer" onClick={() => handleZoomIn()}>
            <Plus />
          </div>
        </div>
      </div>
    </div>
  );
}
