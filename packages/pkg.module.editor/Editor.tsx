/* eslint-disable import/no-extraneous-dependencies */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { createEditor, Transforms } from 'slate';
import { Slate, withReact, Editable, ReactEditor, DefaultElement } from 'slate-react';
import { withHistory } from 'slate-history';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

import { makeNodeId, withNodeId } from './plugins/withNodeId';
import { toPx } from './utils/toPx';

const initialValue = [
  {
    id: makeNodeId(),
    children: [
      {
        text: 'In music theory, an interval is a difference in pitch between two sounds. An interval may be described as horizontal, linear, or melodic if it refers to successively sounding tones, such as two adjacent pitches in a melody, and vertical or harmonic if it pertains to simultaneously sounding tones, such as in a chord.',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '0. Perfect unison',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: 'Major sixth',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '6. Tritone',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '3. Minor third',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '2. Major second',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '1. Minor second',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '10. Minor seventh',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '4. Major third',
      },
    ],
  },
  {
    id: makeNodeId(),
    children: [
      {
        text: '7. Perfect fifth',
      },
    ],
  },
];

const useEditor = () => useMemo(() => withNodeId(withHistory(withReact(createEditor()))), []);

export const Editor = () => {
  const editor = useEditor();

  const [value, setValue] = useState(initialValue);
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

  const renderElement = useCallback((props: any) => {
    const isTopLevel = ReactEditor.findPath(editor, props.element).length === 1;

    return isTopLevel ? (
      <SortableElement {...props} renderElement={renderElementContent} />
    ) : (
      renderElementContent(props)
    );
  }, []);

  const items = useMemo(() => editor.children.map((element: any) => element.id), [editor.children]);

  return (
    // @ts-ignore
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
        <button
          type="button"
          className="flex h-5 w-5 cursor-grab items-center justify-center bg-none pt-2"
          contentEditable={false}
          {...sortable.listeners}
        >
          ⠿
        </button>
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
    <div className="flex py-2">
      <button className="flex h-5 w-5 items-center justify-center bg-none" type="button">
        ⠿
      </button>
      <Slate editor={editor} initialValue={value}>
        <Editable readOnly renderElement={renderElementContent} />
      </Slate>
    </div>
  );
};
