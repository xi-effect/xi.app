import { ComponentProps, useCallback, useEffect, ReactNode, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@xipkg/dropdown';
import { Transforms, Node } from 'slate';
import { Move, Plus, Brush, ArrowUp, ArrowBottom, Copy, Trash } from '@xipkg/icons';
import { ReactEditor, useSlate } from 'slate-react';

import { assignIdRecursively } from './plugins/withNodeId';
import { CustomElement } from './slate';

type PortalProps = {
  children: ReactNode;
};

export const Portal = ({ children }: PortalProps) =>
  typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;

export const CellControls = ({
  moveProps,
  element,
}: Partial<Record<'moveProps', ComponentProps<'button'>> & { element?: CustomElement }>) => {
  // различаем клик и перетаскивание через DnD
  const delta = 6;
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const isDragging = useRef(false);
  const [autoOpen, setAutoOpen] = useState(false);
  const [menuKey, setMenuKey] = useState(0); // форсирование ререндеринга
  const editor = useSlate();
  const [path, setPath] = useState<number[]>([]);
  const [isCustomisable, setIsCustomisable] = useState(false);
  const [isCustomisableText, setIsCustomisableText] = useState(false);
  const [isCustomisableBg, setIsCustomisableBg] = useState(false);

  useEffect(() => {
    if (!element) {
      return;
    }

    if (!Node.isNode(element)) {
      return;
    }

    try {
      const foundPath = ReactEditor.findPath(editor, element);
      setPath(foundPath);
      setIsCustomisable(
        [
          'paragraph',
          'heading1',
          'heading2',
          'heading3',
          'bulleted-list',
          'numbered-list',
          'quote',
          'tip',
        ].includes(element.type),
      );
      setIsCustomisableText(
        [
          'paragraph',
          'heading1',
          'heading2',
          'heading3',
          'bulleted-list',
          'numbered-list',
          'quote',
        ].includes(element.type),
      );
      setIsCustomisableBg(['tip'].includes(element.type));
    } catch (error) {
      console.error('Error finding path:', error);
    }
  }, [editor, element]);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    startX.current = e.pageX;
    startY.current = e.pageY;
    isDragging.current = false;
    console.log(`Mouse down at: (${startX.current}, ${startY.current})`);
    setAutoOpen(false);

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const diffX = Math.abs(moveEvent.pageX - startX.current!);
      const diffY = Math.abs(moveEvent.pageY - startY.current!);
      if (diffX > delta || diffY > delta) {
        // Dragging
        isDragging.current = true;
        setAutoOpen(false);
      }
    };

    const handleMouseUp = (upEvent: MouseEvent) => {
      const diffX = Math.abs(upEvent.pageX - startX.current!);
      const diffY = Math.abs(upEvent.pageY - startY.current!);

      if (!isDragging.current && diffX < delta && diffY < delta) {
        // Button clicked
        setAutoOpen(true);
      } else {
        // Drag finished
        setAutoOpen(false);
      }

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    if (autoOpen) {
      // обновляем ключ для ререндеринга
      setMenuKey((prevKey) => prevKey + 1);
    }
  }, [autoOpen]);

  const combinedProps = {
    ...moveProps,
    onMouseDown: (event: any) => {
      handleMouseDown(event);
      if (moveProps?.onMouseDown) moveProps.onMouseDown(event);
    },
  };

  const handleCloneSelect = () => {
    if (path.length > 0) {
      const newElement = JSON.parse(JSON.stringify(element));
      assignIdRecursively(newElement);
      Transforms.insertNodes(editor, newElement, {
        at: path,
      });
    }
  };

  const updateColor = (color: string) => {
    if (path.length > 0) {
      Transforms.setNodes(editor, { color }, { at: path });
    }
  };

  const updateBackground = (bg: string) => {
    if (path.length > 0) {
      Transforms.setNodes(editor, { bg }, { at: path });
    }
  };

  return (
    <div className="flex items-center opacity-0 transition *:grid *:size-5 *:place-content-center *:bg-transparent group-hover/node:opacity-100">
      <DropdownMenuTrigger asChild>
        <button aria-label="add cell above" type="button">
          <Plus />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenu defaultOpen={autoOpen} key={menuKey + 1}>
        <button
          aria-label="move"
          type="button"
          {...combinedProps}
          onClick={() => console.log('hi')}
        >
          <Move />
        </button>

        <DropdownMenuTrigger />
        <DropdownMenuPortal>
          <DropdownMenuContent>
            {isCustomisable && (
              <>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Brush className="mr-2 h-4 w-4" />
                    <span className="text-sm">Цвет</span>
                  </DropdownMenuSubTrigger>

                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {isCustomisableText && (
                        <>
                          <DropdownMenuItem disabled>
                            <p className="text-gray-60 text-[10px]">Цвет</p>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Стандартный</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('gray')}>
                            Серый
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('red')}>
                            Красный
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('orange')}>
                            Оранжевый
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('green')}>
                            Зелёный
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('darkBlue')}>
                            Синий
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('yellow')}>
                            Желтый
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('purple')}>
                            Фиолетовый
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('oink')}>
                            Розовый
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateColor('blue')}>
                            Лазурный
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      {isCustomisableBg && (
                        <>
                          <DropdownMenuItem disabled>
                            <p className="text-gray-60 text-[10px]">Фон</p>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Стандартный фон</DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightGray')}>
                            Серый фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightRed')}>
                            Красный фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightOrange')}>
                            Оранжевый фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightGreen')}>
                            Зелёный фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightBlue')}>
                            Синий фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightYellow')}>
                            Желтый фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightPurple')}>
                            Фиолетовый фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightPink')}>
                            Розовый фон
                          </DropdownMenuItem>
                          <DropdownMenuItem onSelect={() => updateBackground('lightCyan')}>
                            Лазурный фон
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onSelect={() => {
                if (path.length > 0 && path[0] > 0) {
                  Transforms.moveNodes(editor, {
                    at: path,
                    to: [path[0] - 1, ...path.slice(1)],
                  });
                }
              }}
            >
              <ArrowUp className="mr-2 h-4 w-4" />
              <span className="text-sm">Выше</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                if (path.length > 0 && path[0] > 0) {
                  Transforms.moveNodes(editor, {
                    at: path,
                    to: [path[0] + 1, ...path.slice(1)],
                  });
                }
              }}
            >
              <ArrowBottom className="mr-2 h-4 w-4" />
              <span className="text-sm">Ниже</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={handleCloneSelect}>
              <Copy className="mr-2 h-4 w-4" />
              <span className="text-sm">Дублировать</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                if (path.length > 0 && path[0] > 0) {
                  Transforms.delete(editor, {
                    at: path,
                  });
                }
              }}
            >
              <Trash className="mr-2 h-4 w-4" />
              <span className=" text-sm">Удалить</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
};
