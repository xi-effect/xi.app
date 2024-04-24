/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

'use client';

import { useMemo, useState } from 'react';
import { CategoryContainer } from './CategoryContainer'
import { IChannel, ICategory } from './types'
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverlay,
  DragOverEvent,
  DragStartEvent,
  DragEndEvent,
  MeasuringStrategy,
  closestCorners,
} from '@dnd-kit/core';
import { arrayMove } from "@dnd-kit/sortable";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Channel } from './Channel';
import { createPortal } from 'react-dom';

let defaultCategories: ICategory[] = [
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
    categoryId: "B1.2",
    icon: 'announce',
    type: 'announce',
    label: 'Объявления',
    link: '/community/1/announce/1',
  },
  {
    elId: '2',
    icon: 'task',
    type: 'task',
    categoryId : 'B1.2',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    elId: '3',
    icon: 'chat',
    type: 'chat',
    categoryId : 'B1.2',
    label: 'Чат',
    link: '/community/1/chat/1',
  },
  {
    elId: '4',
    icon: 'camera',
    type: 'videoconference',
    categoryId : 'B1.2',
    label: 'Видеоконференция',
    link: '/community/1/videoconference/1',
  },
  {
    elId: '5',
    icon: 'announce',
    categoryId : 'B2.0',
    type: 'announce',
    label: 'Объявления',
    link: '/community/1/announce/1',
  },
  {
    elId: '6',
    icon: 'task',
    type: 'task',
    categoryId : 'B2.0',
    label: 'Задания',
    link: '/community/1/task/1',
  },
  {
    elId: '7',
    icon: 'chat',
    type: 'chat',
    categoryId : 'B2.0',
    label: 'Чат',
    link: '/community/1/chat/1',
  },
  {
    elId: '8',
    icon: 'camera',
    categoryId : 'B2.0',
    type: 'videoconference',
    label: 'Видеоконференция',
    link: '/community/1/videoconference/1',
  },
  {
    elId: '9',
    icon: 'home',
    categoryId : 'empty',
    type: 'home',
    label: 'Главная',
    link: '/community/1/home',
  },
  {
    elId: '10',
    icon: 'announce',
    categoryId : 'empty',
    type: 'announce',
    label: 'Объявления',
    link: '',
  },
  {
    elId: '11',
    icon: 'calendar',
    categoryId : 'empty',
    type: 'calendar',
    label: 'Календарь',
    link: '',
  },

];

interface ICommunityItems {
  setSlideIndex: (value: number) => void;
  className?: string;
};

export const CommunityItems = ({ className, setSlideIndex }: ICommunityItems) => {
  const [categories, setCategories] = useState<ICategory[]>(defaultCategories);
  const [channels, setChannels] = useState<IChannel[]>(defaultChannels);
  const categoryIds = useMemo(() => categories.map((cat) => cat.id), [categories]);
  const channelsIds = useMemo(() => channels.map((channel) => channel.elId) , [channels])
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const [activeChannel, setActiveChannel] = useState<IChannel | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  return (
    <DndContext measuring={{
      droppable: {
        strategy: MeasuringStrategy.Always,
      },
    }}
        autoScroll={false}
        collisionDetection={closestCorners} 
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
        <SortableContext strategy={verticalListSortingStrategy} items={categoryIds}>
              {categories.map((cat) => (
                <div className='my-2'>
                  <CategoryContainer setSlideIndex={setSlideIndex}
                  key={cat.id}
                  category={cat}
                  channels={channels.filter((channel) => channel.categoryId === cat.id)}
                  />
                </div>
              ))}
        </SortableContext>
      </ul>
      {createPortal(
          <DragOverlay>
            {activeCategory && (
                <CategoryContainer
                category={activeCategory}
                channels={channels.filter(
                  (channel) => channel.categoryId === activeCategory.id
                )}
              />
            )}
            {activeChannel && (
              <SortableContext strategy={verticalListSortingStrategy} items={channelsIds}>
              <Channel
                channel={activeChannel}
              />
              </SortableContext>
            )}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Category") {
      setActiveCategory(event.active.data.current.category);
      return;
    }
    
    if (event.active.data.current?.type === "Channel") {
      setActiveChannel(event.active.data.current.channel);
      return;
    }
  }
  
  
  function onDragEnd(event: DragEndEvent) {
    setActiveCategory(null);
    setActiveChannel(null);
  
    const { active, over } = event;
    if (!over) return;
  
    const activeId = active.id;
    const overId = over.id;
  
    if (activeId === overId) return;
  
    const isActiveACategory = active.data.current?.type === "Category";
    if (!isActiveACategory) return;

  
    setCategories((category) => {
      const activeCategoryIndex = categories.findIndex((cat) => cat.id === activeId);
  
      const overCategoryIndex = categories.findIndex((cat) => cat.id === overId);
  
      return arrayMove(category, activeCategoryIndex, overCategoryIndex);
    });
  }
  
  
  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;
  
    const activeId = active?.id;
    const overId = over?.id;
  
    if (activeId === overId) return;
  
    const isActiveAChannel = active.data.current?.type === "Channel";
    const isOverAChannel = over.data.current?.type === "Channel";

    if (!isActiveAChannel) return;

    if (isActiveAChannel && isOverAChannel) {
      setChannels((channels) => {
        const activeIndex = channels.findIndex((channel) => channel.elId === activeId);
        const overIndex = channels.findIndex((channel) => channel.elId === overId);
  
        if (channels[activeIndex].categoryId != channels[overIndex].categoryId) {
          channels[activeIndex].categoryId = channels[overIndex].categoryId;
          return arrayMove(channels, activeIndex, 0);
          // overIndex - 1
        }
  
        return arrayMove(channels, activeIndex, overIndex);
      });
    } else if (isActiveAChannel && !isOverAChannel) {
      setChannels((channels) => {
        const activeIndex = channels.findIndex((channel) => channel.elId === activeId);
        channels[activeIndex].categoryId = String(overId);
        return arrayMove(channels, activeIndex, 0);
      });
    }
  }
}

