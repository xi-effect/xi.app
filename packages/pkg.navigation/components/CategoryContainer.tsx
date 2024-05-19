import React, { useMemo } from 'react';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChannelT, CategoryT } from './types';
import { Channel } from './Channel';

type CategoryContainerT = {
  category: CategoryT;
  channels: ChannelT[];
  setSlideIndex?: (arg: number) => void;
};

export function CategoryContainer({ category, channels, setSlideIndex }: CategoryContainerT) {
  const { name, description, id } = category;
  const channelsIds = useMemo(() => channels.map((channel: ChannelT) => channel.id), [channels]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id,
    data: {
      type: 'Category',
      category,
    },
  });

  const categoryStyle = {
    minHeight: '40px',
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
        {name && description && (
          <div className="flex flex-col items-start p-2">
            <span className="text-[16px] font-semibold">{name}</span>
            <span className="text-[14px] font-normal">{description}</span>
          </div>
        )}
      </div>
      <div className="flex flex-grow flex-col gap-2 overflow-x-hidden overflow-y-hidden">
        <SortableContext strategy={verticalListSortingStrategy} items={channelsIds}>
          {channels.map((channel: ChannelT) => (
            <Channel setSlideIndex={setSlideIndex} key={channel.id} channel={channel} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
