/* eslint-disable no-param-reassign */

'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { CategoryContainer } from './CategoryContainer';
import { ChannelT, CategoryT } from './types';
import { Channel } from './Channel';

const defaultCategories: CategoryT[] = [
  {
    name: '',
    description: '',
    id: 'empty',
  },
  {
    name: 'B1.2',
    description: 'Intermediate',
    id: 'B1.2',
  },
  {
    name: 'B2.0',
    description: 'Intermediate',
    id: 'B2.0',
  },
];

const defaultChannels: ChannelT[] = [
  {
    id: '1',
    categoryId: 'B1.2',
    kind: 'announce',
    name: 'Объявления',
  },
  {
    id: '2',
    kind: 'task',
    categoryId: 'B1.2',
    name: 'Задания',
  },
  {
    id: '3',
    kind: 'chat',
    categoryId: 'B1.2',
    name: 'Чат',
  },
  {
    id: '4',
    kind: 'videoconference',
    categoryId: 'B1.2',
    name: 'Видеоконференция',
  },
  {
    id: '5',
    categoryId: 'B2.0',
    kind: 'announce',
    name: 'Объявления',
  },
  {
    id: '51',
    kind: 'whiteboard',
    categoryId: 'B1.2',
    name: 'Доска',
  },
  {
    id: '6',
    kind: 'task',
    categoryId: 'B2.0',
    name: 'Задания',
  },
  {
    id: '7',
    kind: 'chat',
    categoryId: 'B2.0',
    name: 'Чат',
  },
  {
    id: '8',
    categoryId: 'B2.0',
    kind: 'videoconference',
    name: 'Видеоконференция',
  },
  {
    id: '9',
    categoryId: 'empty',
    kind: 'home',
    name: 'Главная',
  },
  // {
  //   id: '10',
  //   icon: 'announce',
  //   categoryId: 'empty',
  //   kind: 'announce',
  //   name: 'Объявления',
  // },
  // {
  //   id: '11',
  //   icon: 'calendar',
  //   categoryId: 'empty',
  //   kind: 'calendar',
  //   name: 'Календарь',
  //   // disabled: true, // — вариант реализации выключенного канала
  // },
];

interface ICommunityItems {
  setSlideIndex: (value: number) => void;
  className?: string;
}

export const CommunityItems = ({ className, setSlideIndex }: ICommunityItems) => {
  const [categories, setCategories] = useState<CategoryT[]>(defaultCategories);
  const [channels, setChannels] = useState<ChannelT[]>(defaultChannels);
  const categoryIds = useMemo(() => categories.map((cat) => cat.id), [categories]);
  const channelsIds = useMemo(() => channels.map((channel) => channel.id), [channels]);
  const [activeCategory, setActiveCategory] = useState<CategoryT | null>(null);
  const [activeChannel, setActiveChannel] = useState<ChannelT | null>(null);
  const [currentChannel, setCurrentChannel] = useState<ChannelT | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const pathname = usePathname();

  useEffect(() => {
    setCurrentChannel(checkIsChannelOpened(pathname, channels));
  }, [pathname, channels]);

  const checkIsChannelOpened = (url: string, channels: ChannelT[]) => {
    const match = url.match(/\/communities\/\d+(?:\/channels\/(\d+)\/(\w+)|\/(\w+))/);
    if (!match) return null;

    const [, channid, channelType, pageType] = match;

    return (
      channels.find(
        (channel) =>
          (channel.id === channid && channel.kind === channelType) || channel.kind === pageType,
      ) || null
    );
  };

  const onDragStart = (event: DragStartEvent) => {
    const currentType = event.active.data.current?.type;
    if (currentType === 'Category') {
      setActiveCategory(event.active.data.current?.category);
    } else if (currentType === 'Channel') {
      setActiveChannel(event.active.data.current?.channel);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active?.id as string;
    const overId = over?.id as string;

    if (activeId === overId) return;

    const isActiveAChannel = active.data.current?.type === ('Channel' as string);
    const isOverAChannel = over.data.current?.type === ('Channel' as string);

    if (!isActiveAChannel) return;

    if (isActiveAChannel && isOverAChannel) {
      setChannels((channels: ChannelT[]) => {
        const activeIndex = channels.findIndex(
          (channel: ChannelT) => channel.id === activeId,
        ) as number;
        const overIndex = channels.findIndex(
          (channel: ChannelT) => channel.id === overId,
        ) as number;

        if (channels[activeIndex].categoryId !== channels[overIndex].categoryId) {
          channels[activeIndex].categoryId = channels[overIndex].categoryId;
          return arrayMove(channels, activeIndex, overIndex);
        }
        return arrayMove(channels, activeIndex, overIndex);
      });
    } else if (isActiveAChannel && !isOverAChannel) {
      setChannels((channels: ChannelT[]) => {
        const activeIndex = channels.findIndex((channel: ChannelT) => channel.id === activeId);
        channels[activeIndex].categoryId = overId;
        return arrayMove(channels, activeIndex, 0);
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveCategory(null);
    setActiveChannel(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACategory = active.data.current?.type === 'Category';
    if (!isActiveACategory) return;

    setCategories((categories) => {
      const activeCategoryIndex = categories.findIndex((cat) => cat.id === activeId);
      const overCategoryIndex = categories.findIndex((cat) => cat.id === overId);
      return arrayMove(categories, activeCategoryIndex, overCategoryIndex);
    });
  };

  return (
    <DndContext
      measuring={{
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
            <div key={cat.id} className="my-2">
              <CategoryContainer
                setSlideIndex={setSlideIndex}
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
              channels={channels.filter((channel) => channel.categoryId === activeCategory.id)}
            />
          )}
          {activeChannel && (
            <SortableContext strategy={verticalListSortingStrategy} items={channelsIds}>
              <Channel
                channel={activeChannel}
                // стили нужны для отображения при захвате через DnD
                className={`rounded-lg border-[1px] drop-shadow-lg ${
                  currentChannel?.id === activeChannel.id
                    ? 'border-brand-100'
                    : 'border-gray-30'
                }`}
              />
            </SortableContext>
          )}
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};
