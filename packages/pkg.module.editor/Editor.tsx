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
import isImageUrl from './utils/isImageUrl';
import { createDefaultNode } from './utils/createDefaultNode';
import rootElements, { type EditorRootElementOptions } from './const/rootElements';
import { withNodeId } from './plugins/withNodeId';
import { toPx } from './utils/toPx';
import mockValues from './const/mockValues';
import normalizeQuoteNode from './plugins/normalizeQuoteNode';
import { type CommonCustomElementType } from './slate';
import renderElementContent from './utils/renderElement';
import createNode from './utils/createNode';

const useEditor = () =>
  useMemo(() => {
    const editor = withNodeId(withHistory(withReact(createEditor())));

    const { normalizeNode, isVoid } = editor;

    editor.isVoid = (el) => el.type === 'divider' || isVoid(el);

    editor.normalizeNode = (node, opt) => {
      normalizeQuoteNode(editor, node, opt);
      normalizeNode(node, opt);
    };
    return editor;
  }, []);

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

  const handleDropdownSelect = (type: CommonCustomElementType) => {
    Transforms.insertNodes(editor, createDefaultNode(type), {
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
              onKeyDown={(event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
                  event.preventDefault();

                  navigator.clipboard
                    .readText()
                    .then((text) => {
                      if (isImageUrl(text)) {
                        Transforms.insertNodes(editor, createNode({ type: 'image', url: text }), {
                          at: [editor.children.length],
                        });
                      }
                    })
                    .catch((err) => {
                      console.error('Failed to paste image:', err);
                    });
                }
              }}
              className="flex flex-col gap-2 p-2 text-gray-100 focus-visible:outline-none focus-visible:[&_*]:outline-none"
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
            Object.entries(rootElements) as Array<
              [CommonCustomElementType, EditorRootElementOptions]
            >
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
      <div
        className="group/node z-0 flex w-full"
        {...sortable.attributes}
        ref={sortable.setNodeRef}
        style={{
          transition: sortable.transition,
          // @ts-ignore
          '--translate-y': toPx(sortable.transform?.y),
          transform: 'translate3d(0, var(--translate-y, 0), 0)',
          pointerEvents: sortable.isSorting ? 'none' : undefined,
          opacity: sortable.isDragging ? 0 : 1,
        }}
      >
        <CellControls moveProps={sortable.listeners} />
        <div className="ml-2 w-full">{renderElement({ element, children })}</div>
      </div>
    </div>
  );
};

const DragOverlayContent = ({ element }: any) => {
  const editor = useEditor();
  const [value] = useState([JSON.parse(JSON.stringify(element))]); // clone

  useEffect(() => {
    document.body.classList.add('dragging');

    return () => document.body.classList.remove('dragging');
  }, []);

  return (
    <div className="group/node flex">
      <CellControls moveProps={{}} />
      <Slate editor={editor} initialValue={value}>
        <Editable className="ml-2 w-full" readOnly renderElement={renderElementContent} />
      </Slate>
    </div>
  );
};

const CellControls = ({ moveProps }: Partial<Record<'moveProps', ComponentProps<'button'>>>) => (
  <div className="flex items-center opacity-0 transition *:grid *:size-5 *:place-content-center *:bg-transparent group-hover/node:opacity-100">
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
