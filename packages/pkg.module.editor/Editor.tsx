/* eslint-disable import/no-extraneous-dependencies */

import { ComponentProps, useCallback, useEffect, useMemo, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { createEditor, Transforms } from 'slate';
import { Move, Plus } from '@xipkg/icons';
import { Slate, withReact, Editable, ReactEditor, RenderElementProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { withNodeId } from './plugins/withNodeId';
import { toPx } from './utils/toPx';
import {
  EditorElementType,
  EditorRootElementOptions,
  createDefaultElement,
  renderElement,
  rootElementTypes,
} from './const/editorElements';
import mockValues from './const/mockValues';
import getElement from './const/getElement';

const useEditor = () => useMemo(() => withNodeId(withHistory(withReact(createEditor()))), []);

export const EditorRoot = () => {
  const editor = useEditor();

  const [value, setValue] = useState(mockValues);
  const [draggingElementId, setDraggingElementId] = useState<string>();
  const activeElement = editor.children.find((x) => x.id === draggingElementId);

  const clearSelection = () => {
    ReactEditor.blur(editor);
    Transforms.deselect(editor);
    window.getSelection()?.empty();
  };

  const renderElement = useCallback((props: RenderElementProps) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;

    return isTopLevel ? (
      <SortableElement {...props} renderElement={renderElementContent} />
    ) : (
      renderElementContent(props)
    );
  }, []);

  const items = useMemo(() => editor.children.map((element) => element.id), [editor.children]);

  const handleDropdownSelect = (type: EditorElementType) => {
    Transforms.insertNodes(editor, getElement[type]?.() || createDefaultElement(type), {
      at: [editor.children.length],
    });
  };

  return (
    <DropdownMenu>
      {/* @ts-ignore */}
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <DndContext
          onDragStart={(event) => {
            if (event.active) {
              clearSelection();
              setDraggingElementId(`${event.active.id}`);
            }
          }}
          onDragEnd={(event) => {
            const overId = event.over?.id;
            const overIndex = editor.children.findIndex((x) => x.id === overId);

            if (overId !== draggingElementId && overIndex !== -1) {
              Transforms.moveNodes(editor, {
                at: [],
                match: (node) => node.id === draggingElementId,
                to: [overIndex],
              });
            }

            setDraggingElementId(undefined);
          }}
          onDragCancel={() => {
            setDraggingElementId(undefined);
          }}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <Editable
              className="flex flex-col gap-2 p-2 text-gray-100"
              renderElement={renderElement}
            />
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
          {(
            Object.entries(rootElementTypes) as Array<[EditorElementType, EditorRootElementOptions]>
          ).map(([type, opt]) => (
            <DropdownMenuItem
              className="gap-2"
              key={type}
              onSelect={() => handleDropdownSelect(type)}
            >
              <opt.icon />
              <span className="text-sm">{opt.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

const renderElementContent = (props: RenderElementProps) => {
  const renderFn = renderElement[props.element.type];
  if (!renderFn) {
    console.warn('Unknown element type', props.element.type);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
  }
  return renderFn(props);
};

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
        <div className="ml-2">{renderElement({ element, children })}</div>
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
  <div className="flex items-center *:grid *:size-5 *:place-content-center *:bg-transparent">
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
