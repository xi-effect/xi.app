/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */

import React, { useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

import { createEditor, Transforms, Editor, Descendant } from 'slate';
import { Slate, withReact, ReactEditor, RenderElementProps } from 'slate-react';

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import * as Y from 'yjs';
import { withCursors, withYHistory, withYjs, YjsEditor } from '@slate-yjs/core';
import { useProvider } from './utils/useProvider';
import { isImageUrl } from './utils/isUrl';
import { withNodeId } from './plugins/withNodeId';
import { withNormalize } from './plugins/withNormalize';
import { type MediaElement } from './slate';

import { RenderElement } from './elements/RenderElement';
import createNode from './utils/createNode';
import { SortableElement, EditableElement, InlineToolbar } from './components';

import { useDecorateCode } from './hooks/useDecorateCode';
import { codeEditorInsertText } from './utils/codeEditorInsertText';

import { randomCursorData } from './utils/randomCursorData';

import DragOverlayContent from './components/DragOverlayContent';

type EditorPropsT = {
  initialValue?: Descendant[];
  onChange?: (value: Descendant[]) => void;
  readOnly?: boolean;
};

export const EditorRoot = ({ initialValue, onChange, readOnly = false }: EditorPropsT) => {
  const provider = useProvider();
  const decorateCode = useDecorateCode();

  const editor = useMemo(() => {
    const sharedType = provider.document.get('content', Y.XmlText) as Y.XmlText;

    const e = withNormalize(
      withNodeId(
        withReact(
          withCursors(
            withYHistory(withYjs(createEditor(), sharedType, { autoConnect: false })),
            // @ts-ignore
            provider.awareness,
            {
              data: randomCursorData(),
            },
          ),
        ),
      ),
    );

    return e;
  }, [provider.awareness, provider.document]);

  React.useEffect(() => {
    provider.connect();
    return () => provider.disconnect();
  }, [provider]);

  React.useEffect(() => {
    YjsEditor.connect(editor as unknown as YjsEditor);
    return () => YjsEditor.disconnect(editor as unknown as YjsEditor);
  }, [editor]);

  const [draggingElementId, setDraggingElementId] = useState<string>('');

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

  const sensors = useSensors(pointSensor);

  const handleChange = (value: Descendant[]) => {
    if (onChange) {
      onChange(value);
    }
  };

  const handleCodePaste = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      event.preventDefault();

      navigator.clipboard
        .readText()
        .then((text) => {
          if (text) {
            const { selection } = editor;

            if (selection) {
              const [parentNode] = Editor.parent(editor, selection);

              if (parentNode && parentNode?.type === 'code') {
                Transforms.insertText(editor, text);
              }
            }
          }
        })
        .catch((err) => {
          console.error('Failed to paste code:', err);
        });
    },
    [editor],
  );

  const handleOnDragEnd = (event: DragEndEvent) => {
    const overId = event.over?.id;
    const edChildren = editor.children;
    const overIndex = edChildren.findIndex((x) => x.id === overId);

    if (overId !== draggingElementId && overIndex !== -1) {
      Transforms.moveNodes(editor, {
        at: [],
        match: (node) => node.id === draggingElementId,
        to: [overIndex],
      });
    }

    setDraggingElementId('');
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'v') {
      handleCodePaste(event);
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

    if (event.key === 'Enter') {
      codeEditorInsertText(editor, event, '\n');
    }

    if (event.key === 'Tab') {
      codeEditorInsertText(editor, event, '  ');
    }
  };

  // RETURN
  if (provider.authorizedScope === 'readonly' || readOnly) {
    return (
      <Slate editor={editor} initialValue={initialValue ?? []}>
        <EditableElement
          readOnly
          renderElement={renderElement}
          // @ts-ignore
          decorate={decorateCode}
        />
      </Slate>
    );
  }

  return (
    <Slate editor={editor} initialValue={initialValue ?? []} onChange={handleChange}>
      <DndContext
        onDragStart={(event) => {
          if (event.active) {
            clearSelection();
            setDraggingElementId(`${event.active.id}`);
          }
        }}
        onDragEnd={handleOnDragEnd}
        onDragCancel={() => {
          setDraggingElementId('');
        }}
        modifiers={[restrictToVerticalAxis]}
        sensors={sensors}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <InlineToolbar />
          <EditableElement
            onKeyDown={handleOnKeyDown}
            renderElement={renderElement}
            // @ts-ignore
            decorate={decorateCode}
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
  );
};
