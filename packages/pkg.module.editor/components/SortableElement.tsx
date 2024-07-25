/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { useSlate } from 'slate-react';
import { toPx } from '../utils/toPx';
import { CellControls } from './CellControls';
// import { useInterfaceStore } from '../interfaceStore';

export const SortableElement = ({ attributes, element, children, renderElement }: any) => {
  // const isAddNewNode = useInterfaceStore((state) => state.isAddNewNode);

  const editor = useSlate();

  console.log('attributes', editor);

  const sortable = useSortable({
    id: element.id,
    transition: {
      duration: 350,
      easing: 'ease',
    },
  });

  const srtElId = `edtr-sortable-element-${element ? element.id : ''}`;

  return (
    <div {...attributes}>
      <div
        className="group/node z-0 flex w-full relative"
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
        <div className={`absolute ${''} hidden items-end transition *:size-5 *:flex *:items-center *:justify-center *:bg-transparent gap-2 h-[25px] w-[48px] group-hover/node:flex`}>
          <CellControls moveProps={sortable.listeners} element={element} />
        </div>
        <div id={srtElId} className="ml-14 w-full">{renderElement({ element, children })}</div>
      </div>
    </div>
  );
};
