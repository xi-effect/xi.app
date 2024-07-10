import React from 'react';
import { useEditor } from 'tldraw';
import './custom-ui.css';

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
    { action: 'select', title: 'Cursor' },
    { action: 'draw', title: 'Draw' },
    { action: 'eraser', title: 'Eraser' },
  ];

  return (
    <div className="custom-layout">
      <div className="custom-toolbar">
        {navBarElements.map((item) => {
          return (
            <button
              className="custom-button"
              data-isactive={activeBtn == item.action}
              onClick={() => {
                editor.setCurrentTool(item.action);
                setActiveBtn(item.action);
              }}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}

{
  /* <div className="z-300 pointer-events-none absolute inset-0">
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-center gap-2 p-2">
        {navBarElements.map((item) => (
          <button
            key={item.action}
            className="pointer-events-auto rounded-full border border-gray-100 bg-white px-3 py-1"
            data-isactive={editor.getCurrentToolId() === item.action}
            onClick={() => editor.setCurrentTool(item.action)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div> */
}
