import React, { ReactNode } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { RenderElementProps } from 'slate-react';
import { toPx } from '../utils/toPx';
import { CellControls } from './CellControls';

type SortableElementPropsT = {
  attributes: RenderElementProps['attributes'];
  element: RenderElementProps['element'];
  children: ReactNode;
  renderElement: any;
};

export const SortableElement = ({
  attributes,
  element,
  children,
  renderElement,
}: SortableElementPropsT) => {
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
        className="group/node z-0 flex w-full relative"
        {...sortable.attributes}
        role="none"
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
        <CellControls
          moveProps={sortable.listeners}
          element={element}
        />
        <div className="ml-14 w-full">{renderElement({ element, children })}</div>
      </div>
    </div>
  );
};
