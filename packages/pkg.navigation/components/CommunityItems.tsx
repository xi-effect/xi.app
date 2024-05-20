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
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'; // arrayMove
import { createPortal } from 'react-dom';
import { useMainSt } from 'pkg.stores';
import { nanoid } from 'nanoid';
import { CategoryContainer } from './CategoryContainer';
import { ChannelT, CategoryT } from './types';
import { Channel } from './Channel';
import { CommunityItemsSkeleton } from './CommunityItemsSkeleton';

// const defaultCategories: CategoryT[] = [
//   {
//     name: '',
//     description: '',
//     id: 'empty',
//   },
//   {
//     name: 'B1.2',
//     description: 'Intermediate',
//     id: 'B1.2',
//   },
//   {
//     name: 'B2.0',
//     description: 'Intermediate',
//     id: 'B2.0',
//   },
// ];

// const defaultChannels: ChannelT[] = [
//   {
//     id: 1,
//     categoryId: 10,
//     kind: 'announce',
//     name: 'Объявления',
//   },
//   {
//     id: 2,
//     kind: 'task',
//     categoryId: 10,
//     name: 'Задания',
//   },
//   {
//     id: 3,
//     kind: 'chat',
//     categoryId: 10,
//     name: 'Чат',
//   },
//   {
//     id: 4,
//     kind: 'videoconference',
//     categoryId: 10,
//     name: 'Видеоконференция',
//   },
//   {
//     id: 5,
//     categoryId: 9,
//     kind: 'announce',
//     name: 'Объявления',
//   },
//   {
//     id: 51,
//     kind: 'whiteboard',
//     categoryId: 9,
//     name: 'Доска',
//   },
//   {
//     id: 6,
//     kind: 'task',
//     categoryId: 9,
//     name: 'Задания',
//   },
//   {
//     id: 7,
//     kind: 'chat',
//     categoryId: 2,
//     name: 'Чат',
//   },
//   {
//     id: 8,
//     categoryId: 2,
//     kind: 'videoconference',
//     name: 'Видеоконференция',
//   },
//   {
//     id: 9,
//     categoryId: 3,
//     kind: 'home',
//     name: 'Главная',
//   },
//   {
//     id: '10',
//     icon: 'announce',
//     categoryId: 'empty',
//     kind: 'announce',
//     name: 'Объявления',
//   },
//   {
//     id: '11',
//     icon: 'calendar',
//     categoryId: 'empty',
//     kind: 'calendar',
//     name: 'Календарь',
//     // disabled: true, // — вариант реализации выключенного канала
//   },
// ];

type CommunityItemsPropsT = {
  setSlideIndex: (value: number) => void;
  className?: string;
};

export const CommunityItems = ({ className, setSlideIndex }: CommunityItemsPropsT) => {
  // const [categories, setCategories] = useState<CategoryT[]>(defaultCategories);
  const categories = useMainSt((state) => state.categories);
  const channels = useMainSt((state) => state.channels);

  const categoryIds = useMemo(() => categories.map((category) => category.uid ?? 0), [categories]);
  const channelsIds = useMemo(() => channels.map((channel) => channel.uid ?? 0), [channels]);
  const [activeCategory, setActiveCategory] = useState<CategoryT | null>(null);
  const [activeChannel, setActiveChannel] = useState<ChannelT | null>(null);
  const [currentChannel, setCurrentChannel] = useState<ChannelT | null>(null);

  const socket = useMainSt((state) => state.socket);
  const currentCommunityId = useMainSt((state) => state.communityMeta.id);
  const updateCategories = useMainSt((state) => state.updateCategories);
  const updateChannels = useMainSt((state) => state.updateChannels);

  useEffect(() => {
    socket.emit(
      'list-categories',
      {
        community_id: currentCommunityId,
      },
      (status: number, answer: CategoryT[]) => {
        console.log('answer', answer);
        if (status === 200) {
          const withUid = answer.map((item) => ({ ...item, uid: nanoid() }));

          updateCategories([{ id: 'empty', name: '', description: '', uid: nanoid() }, ...withUid]);
        }
      },
    );
  }, []);

  useEffect(() => {
    socket.emit(
      'list-channels',
      {
        community_id: currentCommunityId,
      },
      (status: number, answer: { category: CategoryT; channels: ChannelT[] }[]) => {
        console.log('answer', answer);
        if (status === 200) {
          const newChannels: ChannelT[] = [];

          answer.forEach((item) => {
            const withCategoryId: ChannelT[] = item.channels.map((channel) => ({
              ...channel,
              categoryId: item.category?.id ?? 'empty',
              uid: nanoid(),
            }));

            newChannels.push(...withCategoryId);
          });

          updateChannels(newChannels);
        }
      },
    );
  }, []);

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

    const [, channelid, channelType, pageType] = match;

    return (
      channels.find(
        (channel) =>
          (channel.id.toString() === channelid && channel.kind === channelType) ||
          channel.kind === pageType,
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
    console.log('onDragOver', event);
    const { active, over } = event;
    if (!over) return;

    const activeId = active?.id as string;
    const overId = over?.id as string;

    if (activeId === overId) return;

    const isActiveAChannel = active.data.current?.type === ('Channel' as string);
    const isOverAChannel = over.data.current?.type === ('Channel' as string);

    console.log('isActiveAChannel', isActiveAChannel, isOverAChannel);

    if (!isActiveAChannel) return;

    if (isActiveAChannel && isOverAChannel) {
      const activeIndex = channels.findIndex(
        (channel: ChannelT) => channel.uid === activeId,
      ) as number;
      const overIndex = channels.findIndex((channel: ChannelT) => channel.uid === overId) as number;

      console.log('activeIndex', activeIndex);
      console.log('overIndex', overIndex);

      console.log('channels[activeIndex].categoryId', channels[activeIndex].categoryId);
      console.log('channels[overIndex].categoryId', channels[overIndex].categoryId);

      if (channels[activeIndex].categoryId !== channels[overIndex].categoryId) {
        const newChannels = channels.map((chnItem, index) => {
          if (index === activeIndex) {
            return { ...chnItem, categoryId: channels[overIndex].categoryId };
          }

          return chnItem;
        });

        updateChannels(arrayMove(newChannels, activeIndex, overIndex));
      } else {
        updateChannels(arrayMove(channels, activeIndex, overIndex));
      }
    }

    if (isActiveAChannel && !isOverAChannel) {
      const activeIndex = channels.findIndex((channel: ChannelT) => channel.uid === activeId);

      console.log('channels[activeIndex].categoryId', channels[activeIndex].categoryId);
      const newChannels = channels.map((chnItem, index) => {
        if (index === activeIndex) {
          return { ...chnItem, categoryId: Number(overId) };
        }

        return chnItem;
      });

      updateChannels(arrayMove(newChannels, activeIndex, 0));
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log('onDragEnd', event);
    setActiveCategory(null);
    setActiveChannel(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveACategory = active.data.current?.type === 'Category';
    if (!isActiveACategory) return;

    const activeCategoryIndex = categories.findIndex((category) => category.uid === activeId);
    const overCategoryIndex = categories.findIndex((category) => category.uid === overId);

    updateCategories(arrayMove(categories, activeCategoryIndex, overCategoryIndex));
  };

  if (categories.length === 0 && channels.length === 0) return <CommunityItemsSkeleton />;

  // console.log('categoryIds', categoryIds);
  // console.log('channelsIds', channelsIds);

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
          {categories.length !== 0 &&
            categories.map((category) => (
              <div key={category.id} className="my-2">
                <CategoryContainer
                  setSlideIndex={setSlideIndex}
                  category={category}
                  channels={channels.filter((channel) => channel.categoryId === category.id)}
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
                  currentChannel?.uid === activeChannel.uid ? 'border-brand-100' : 'border-gray-30'
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
