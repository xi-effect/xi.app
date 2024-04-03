/* eslint-disable import/no-extraneous-dependencies */

import {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { createEditor, Transforms } from 'slate';
import { Move, Plus } from '@xipkg/icons';
import {
  Slate,
  withReact,
  Editable,
  ReactEditor,
  DefaultElement,
  RenderElementProps,
} from 'slate-react';
import { withHistory } from 'slate-history';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { withNodeId } from './plugins/withNodeId';
import { toPx } from './utils/toPx';
import { mockInitialValue } from './const';

const useEditor = () => useMemo(() => withNodeId(withHistory(withReact(createEditor()))), []);

export const EditorRoot = () => {
  const editor = useEditor();

  const [value, setValue] = useState(mockInitialValue);
  const [activeId, setActiveId] = useState(null);
  const activeElement = editor.children.find((x: any) => x.id === activeId);

  const handleDragStart = (event: any) => {
    if (event.active) {
      clearSelection();
      setActiveId(event.active.id);
    }
  };

  const handleDragEnd = (event: any) => {
    const overId = event.over?.id;
    const overIndex = editor.children.findIndex((x: any) => x.id === overId);

    if (overId !== activeId && overIndex !== -1) {
      Transforms.moveNodes(editor, {
        at: [],
        // @ts-ignore
        match: (node) => node.id === activeId,
        to: [overIndex],
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const clearSelection = () => {
    ReactEditor.blur(editor);
    Transforms.deselect(editor);
    window.getSelection()?.empty();
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;

    if (props.element.type === 'code') {
      return (
        <pre {...props.attributes}>
          <code>{props.children}</code>
        </pre>
      );
    }
    return isTopLevel ? (
      <SortableElement {...props} renderElement={renderElementContent} />
    ) : (
      renderElementContent(props)
    );
  }, []);

  const items = useMemo(() => editor.children.map((element: any) => element.id), [editor.children]);

  return (
    <DropdownMenu>
      {/* @ts-ignore */}
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <DndContext
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Editable className="flex flex-col gap-2 p-2" renderElement={renderElement} />
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeElement && <DragOverlayContent element={activeElement} />}
            </DragOverlay>,
            document.body,
          )}
        </DndContext>
      </Slate>
      <DropdownMenuPortal>
        <DropdownMenuContent side="right">
          <DropdownMenuItem>Текст</DropdownMenuItem>
          <DropdownMenuItem>Заголовок 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

const renderElementContent = (props: any) => <DefaultElement {...props} />;

const SortableElement = ({ attributes, element, children, renderElement }: any) => {
  const sortable = useSortable({
    id: element.id,
    transition: {
      duration: 350,
      easing: 'ease',
    },
  });

  return (
    <div {...attributes}>
      <Sortable sortable={sortable}>
        <CellControls moveProps={sortable.listeners} />
        <div>{renderElement({ element, children })}</div>
      </Sortable>
    </div>
  );
};

const Sortable = ({ sortable, children }: any) => (
  <div
    className="z-0 flex w-full"
    {...sortable.attributes}
    ref={sortable.setNodeRef}
    style={{
      transition: sortable.transition,
      '--translate-y': toPx(sortable.transform?.y),
      transform: 'translate3d(0, var(--translate-y, 0), 0)',
      pointerEvents: sortable.isSorting ? 'none' : undefined,
      opacity: sortable.isDragging ? 0 : 1,
    }}
  >
    {children}
  </div>
);

const DragOverlayContent = ({ element }: any) => {
  const editor = useEditor();
  const [value] = useState([JSON.parse(JSON.stringify(element))]); // clone

  useEffect(() => {
    document.body.classList.add('dragging');

    return () => document.body.classList.remove('dragging');
  }, []);

  return (
    <div className="flex">
      <CellControls moveProps={{}} />
      <Slate editor={editor} initialValue={value}>
        <Editable readOnly renderElement={renderElementContent} />
      </Slate>
    </div>
  );
};

const CellControls = ({ moveProps }: Partial<Record<'moveProps', ComponentProps<'button'>>>) => (
  <div className="flex *:grid *:size-5 *:place-content-center *:bg-transparent">
    <DropdownMenuTrigger asChild>
      <button aria-label="add cell above" type="button">
        <Plus />
      </button>
    </DropdownMenuTrigger>
    <button {...moveProps} aria-label="move" type="button">
      <Move />
    </button>
  </div>
);
