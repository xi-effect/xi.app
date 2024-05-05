import React, { useMemo } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { IChannel, ICategory } from './types';
import { Channel } from './Channel';

interface ICategoryContainer {
  category: ICategory;
  channels: IChannel[];
  setSlideIndex?: (arg: number) => void;
}

export function CategoryContainer({ category, channels, setSlideIndex }: ICategoryContainer) {
  const { title, subtitle, id } = category;
  const channelsIds = useMemo(() => channels.map((channel: IChannel) => channel.elId), [channels]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'Category',
      category,
    },
  });

  const categoryStyle = {
    minHeight: '100px',
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div style={categoryStyle} ref={setNodeRef}>
        <div className="border-b-brand-80 bg-brand-80 h-[4px] rounded-[2px]" />
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={categoryStyle}>
      <div {...attributes} {...listeners}>
        {title && subtitle && (
          <div className="flex flex-col items-start p-2">
            <span className="text-[16px] font-semibold">{title}</span>
            <span className="text-[14px] font-normal">{subtitle}</span>
          </div>
        )}
      </div>
      <div className="flex flex-grow flex-col gap-2 overflow-x-hidden overflow-y-hidden">
        <SortableContext strategy={verticalListSortingStrategy} items={channelsIds}>
          {channels.map((channel: IChannel) => (
            <Channel setSlideIndex={setSlideIndex} key={channel.elId} channel={channel} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
