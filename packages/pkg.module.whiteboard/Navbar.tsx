import React from 'react';
import { useEditor } from 'tldraw';
// import './custom-ui.css';

export function Navbar() {
  const editor = useEditor();
  const [activeBtn, setActiveBtn] = React.useState('select');
  React.useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Delete':
        case 'Backspace': {
          editor.deleteShapes(editor.getSelectedShapeIds());
          break;
        }
        case 'v': {
          editor.setCurrentTool('select');
          break;
        }
        case 'e': {
          editor.setCurrentTool('eraser');
          break;
        }
        case 'x':
        case 'p':
        case 'b':
        case 'd': {
          editor.setCurrentTool('draw');
          break;
        }
      }
    };

    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [editor]);

  const navBarElements = [
    { action: 'select', title: 'Select' },
    { action: 'hand', title: 'Hand' },
    { action: 'draw', title: 'Draw' },
    { action: 'sticker', title: 'Sticker' },
    { action: 'text', title: 'Text' },
    { action: 'shapes', title: 'Shapes' },
    { action: 'arrow', title: 'Arrow' },
    { action: 'image', title: 'Image' },
    { action: 'eraser', title: 'Eraser' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute bottom-3 left-0 right-0 flex w-full items-center justify-center">
        <div className="z-[300] flex gap-10 bg-white">
          <div className="border-gray-10 z-[300] flex gap-2 rounded-[12px] border p-1">
            {navBarElements.map((item) => (
              <button
                key={item.action}
                className={`pointer-events-auto h-[32px] w-[32px] items-center rounded-[8px] ${activeBtn == item.action ? 'bg-brand-0' : 'bg-white'}`}
                data-isactive={editor.getCurrentToolId() === item.action}
                onClick={() => {
                  setActiveBtn(item.action);
                  editor.setCurrentTool(item.action);
                }}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
