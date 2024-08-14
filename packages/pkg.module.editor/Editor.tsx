/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { createEditor, Transforms, Editor, Descendant } from 'slate';
import { Slate, withReact, Editable, ReactEditor, RenderElementProps } from 'slate-react';
// import { useFloating, offset, autoUpdate, inline, shift, flip } from '@floating-ui/react';
import { withHistory } from 'slate-history';

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { Move, Plus } from '@xipkg/icons';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@xipkg/tooltip';
import { isUrl, isImageUrl } from './utils/isUrl';
import { withNodeId } from './plugins/withNodeId';
import normalizeQuoteNode from './plugins/normalizeQuoteNode';
import {
  type MediaElement,
} from './slate';

import { RenderElement } from './elements/RenderElement';
import createNode from './utils/createNode';
import { SortableElement, InlineToolbar, Leaf } from './components';
import { wrapLink } from './components/InlineToolbar';

const withInlines = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => ['link'].includes(element.type) || isInline(element);

  editor.insertText = (text: string) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const useEditor = () =>
  useMemo(() => {
    const editor = withInlines(withNodeId(withHistory(withReact(createEditor()))));

    const { normalizeNode, isVoid } = editor;

    editor.isVoid = (el) => el.type === 'divider' || isVoid(el);

    editor.normalizeNode = (node, opt) => {
      normalizeQuoteNode(editor, node, opt);
      normalizeNode(node, opt);
    };
    return editor;
  }, []);

type EditorPropsT = {
  initialValue?: Descendant[];
  onChange?: (value: Descendant[]) => void;
  readOnly?: boolean;
};

export const EditorRoot = ({ initialValue, onChange, readOnly = false }: EditorPropsT) => {
  const editor = useEditor();

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
      <SortableElement {...props} renderElement={RenderElement} />
    ) : (
      <RenderElement {...props} />
    );
  }, []);

  const items = useMemo(() => editor.children.map((element) => element.id), [editor.children]);

  const pointSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const sensors = useSensors(
    pointSensor,
  );

  const handleChange = (value: Descendant[]) => {
    if (onChange) {
      onChange(value);
    }
  };

  if (readOnly) {
    return (
      <Slate editor={editor} initialValue={initialValue ?? []}>
        <Editable
          readOnly
          className="flex flex-col gap-2 p-2 text-gray-100 focus-visible:outline-none focus-visible:[&_*]:outline-none"
          renderElement={renderElement}
          renderLeaf={(props) => <Leaf {...props} />}
        />
      </Slate>
    );
  }

  return (
    <TooltipProvider>
      <Slate editor={editor} initialValue={initialValue ?? []} onChange={handleChange}>
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
          sensors={sensors}
        >
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <InlineToolbar />
            <Editable
              onKeyDown={(event) => {
                if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
                  event.preventDefault();

                  navigator.clipboard
                    .readText()
                    .then((text) => {
                      if (isImageUrl(text)) {
                        const node = createNode({ type: 'imageBlock', url: text } as MediaElement);
                        Transforms.insertNodes(editor, node, {
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
              renderLeaf={(props) => <Leaf {...props} />}
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
    </TooltipProvider>
  );
};

const DragOverlayContent = ({ element }: any) => {
  const editor = useEditor();
  const [value] = useState([JSON.parse(JSON.stringify(element))]); // clone

  useEffect(() => {
    document.body.classList.add('dragging');

    return () => document.body.classList.remove('dragging');
  }, []);

  const renderElement = useCallback((props: RenderElementProps) =>
    (<RenderElement {...props} />), []);

  return (
    <div className="group/node flex">
      <div className="flex absolute items-end transition *:size-5 *:flex *:items-center *:justify-center *:bg-transparent gap-2 h-[25px] w-[48px] group-hover/node:flex">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="hover:bg-whiteactive:bg-gray-5 rounded" aria-label="plus" type="button">
              <Plus />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Клик для добавления снизу Alt-клик для добавления сверху</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="hover:bg-gray-5 active:bg-gray-5 rounded cursor-grabbing" aria-label="move" type="button">
              <Move />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Перетащите для перемещения Клик для открытия меню</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Slate editor={editor} initialValue={value}>
        <Editable className="ml-14 w-full" readOnly renderElement={renderElement} />
      </Slate>
    </div>
  );
};
