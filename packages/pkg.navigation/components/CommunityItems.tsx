/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useMemo, useState } from 'react';
import {ColumnContainer} from './ColumnContainer'
import { IColumn , IChannel } from './types'
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';

import { arrayMove } from "@dnd-kit/sortable";

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

let defaultCols: IColumn[] = [
  {
    title : '',
    subtitle : '',
    id : 'empty',
  },
  {
    title: 'B1.2',
    subtitle: 'Intermediate',
    id: "B1.2",
  },
  {
    title: 'B2.0',
    subtitle: 'Intermediate',
    id: "B2.0",
  },
];

let defaultChannels: IChannel[] = [
  {
    elId: "1",
    columnId: "B1.2",
    icon: 'announce',
    type: 'announce',
    label: 'Объявления',
    link: '/community/1/announce/1',
  },
  {
    elId: '2',
    icon: 'task',
    type: 'task',
    columnId : 'B1.2',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    elId: '3',
    icon: 'chat',
    type: 'chat',
    columnId : 'B1.2',
    label: 'Чат',
    link: '/community/1/chat/1',
  },
  {
    elId: '4',
    icon: 'camera',
    type: 'videoconference',
    columnId : 'B1.2',
    label: 'Видеоконференция',
    link: '/community/1/videoconference/1',
  },
  {
    elId: '5',
    icon: 'announce',
    columnId : 'B2.0',
    type: 'announce',
    label: 'Объявления',
    link: '/community/1/announce/1',
  },
  {
    elId: '6',
    icon: 'task',
    type: 'task',
    columnId : 'B2.0',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    elId: '7',
    icon: 'chat',
    type: 'chat',
    columnId : 'B2.0',
    label: 'Чат',
    link: '/community/1/chat/1',
  },
  {
    elId: '8',
    icon: 'camera',
    columnId : 'B2.0',
    type: 'videoconference',
    label: 'Видеоконференция',
    link: '/community/1/videoconference/1',
  },
  {
    elId: '9',
    icon: 'home',
    columnId : 'empty',
    type: 'home',
    label: 'Главная',
    link: '/community/1/home',
  },
  {
    elId: '10',
    icon: 'announce',
    columnId : 'empty',
    type: 'announce',
    label: 'Объявления',
    link: '',
  },
  {
    elId: '11',
    icon: 'calendar',
    columnId : 'empty',
    type: 'calendar',
    label: 'Календарь',
    link: '',
  },

];

type ItemPropsT = {
  setSlideIndex: (value: number) => void;
  className?: string;
};

export const CommunityItems = ({ className, setSlideIndex }: ItemPropsT) => {
  const [columns, setColumns] = useState<IColumn[]>(defaultCols);
  const [channels, setChannels] = useState<IChannel[]>(defaultChannels);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const [activeChannel, setActiveChannel] = useState<IChannel | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
      <ul
        className={`mt-3 flex h-[calc(100dvh-128px)] flex-col gap-1 overflow-y-auto px-5 sm:mb-[60px] sm:px-1 ${
          className ?? ''
        }`}
      >
        <SortableContext strategy={verticalListSortingStrategy} items={columnsId}>
              {columns.map((col) => (
                <div className='my-2'>
                  <ColumnContainer  setSlideIndex={setSlideIndex}
                  key={col.id}
                  column={col}
                  channels={channels.filter((channel) => channel.columnId === col.id)}
                  />
                </div>
              ))}
            </SortableContext>
      </ul>
    </DndContext>
  );

  
  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  
    if (event.active.data.current?.type === "Channel") {
      setActiveChannel(event.active.data.current.task);
      return;
    }
  }
  
  function onDragEnd(event: DragEndEvent) {
    setActiveColumn(null);
    setActiveChannel(null);
  
    const { active, over } = event;
    if (!over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    if (activeId === overId) return;
  
    const isActiveAColumn = active.data.current?.type === "Column";
    if (!isActiveAColumn) return;

  
    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeId);
  
      const overColumnIndex = columns.findIndex((col) => col.id === overId);
  
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
  
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    if (activeId === overId) return;
  
    const isActiveAChannel = active.data.current?.type === "Channel";
    const isOverAChannel = over.data.current?.type === "Channel";
  
    if (!isActiveAChannel) return;
  
    if (isActiveAChannel && isOverAChannel) {
      setChannels((channels) => {
        const activeIndex = channels.findIndex((t) => t.elId === activeId);
        const overIndex = channels.findIndex((t) => t.elId === overId);
  
        if (channels[activeIndex].columnId != channels[overIndex].columnId) {
          channels[activeIndex].columnId = channels[overIndex].columnId;
          return arrayMove(channels, activeIndex, overIndex - 1);
        }
  
        return arrayMove(channels, activeIndex, overIndex);
      });
    }
  }
}

