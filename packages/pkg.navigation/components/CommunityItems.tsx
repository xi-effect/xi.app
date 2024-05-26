/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */

'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import { ScrollArea } from '@xipkg/scrollarea';
import { Calendar, Home, Plus } from '@xipkg/icons';
import { DropdownMenuSeparator } from '@xipkg/dropdown';
import { CategoryCreate } from 'pkg.modal.category-create';
import { CategoryContainer } from './CategoryContainer';
import { ChannelT, CategoryT } from './types';
import { Channel } from './Channel';
import { CommunityItemsSkeleton } from './CommunityItemsSkeleton';

type CommunityItemsPropsT = {
  setSlideIndex: (value: number) => void;
  className?: string;
};

export const CommunityItems = ({ className, setSlideIndex }: CommunityItemsPropsT) => {
  const router = useRouter();

  // const [categories, setCategories] = useState<CategoryT[]>(defaultCategories);
  const categories = useMainSt((state) => state.categories);
  const channels = useMainSt((state) => state.channels);

  const categoryIds = useMemo(
    () => (categories || []).map((category) => category.uid ?? 0),
    [categories],
  );
  const channelsIds = useMemo(
    () => (categories || []).map((channel) => channel.uid ?? 0),
    [channels],
  );
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
    setCurrentChannel(checkIsChannelOpened(pathname, channels ?? []));
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

    const categoryOverId = over.data.current?.category?.id;

    console.log('overData', categoryOverId);

    console.log('isActiveAChannel', isActiveAChannel, isOverAChannel);

    if (!isActiveAChannel) return;

    if (isActiveAChannel && isOverAChannel) {
      // console.log('isActiveAChannel && isOverAChannel');

      const activeIndex = (channels || []).findIndex(
        (channel: ChannelT) => channel.uid === activeId,
      ) as number;
      const overIndex = (channels || []).findIndex(
        (channel: ChannelT) => channel.uid === overId,
      ) as number;

      // console.log('activeIndex', activeIndex);
      // console.log('overIndex', overIndex);

      // console.log('channels[activeIndex].categoryId', channels[activeIndex].categoryId);
      // console.log('channels[overIndex].categoryId', channels[overIndex].categoryId);

      if (channels && channels[activeIndex].categoryId !== channels[overIndex].categoryId) {
        const newChannels = channels.map((chnItem, index) => {
          if (index === activeIndex) {
            return { ...chnItem, categoryId: channels[overIndex].categoryId };
          }

          return chnItem;
        });

        // console.log('channels[activeIndex].categoryId !== channels[overIndex].categoryId');

        updateChannels(arrayMove(newChannels, activeIndex, overIndex));
      } else if (channels) {
        updateChannels(arrayMove(channels, activeIndex, overIndex));
      }
    }

    // Если мы находимся над категорией
    if (isActiveAChannel && !isOverAChannel) {
      const activeIndex = (channels || []).findIndex(
        (channel: ChannelT) => channel.uid === activeId,
      );

      console.log('activeIndex', activeIndex, channels, overId);
      const newChannels = (channels || []).map((chnItem, index) => {
        if (index === activeIndex) {
          return { ...chnItem, categoryId: categoryOverId };
        }

        return chnItem;
      });

      console.log('isActiveAChannel && !isOverAChannel', newChannels);

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

    if (!categories) return;

    const activeCategoryIndex = (categories || []).findIndex(
      (category) => category.uid === activeId,
    );
    const overCategoryIndex = (categories || []).findIndex((category) => category.uid === overId);

    const newCategories = arrayMove(categories, activeCategoryIndex, overCategoryIndex);

    updateCategories(newCategories);
  };

  const [isCategoryCreateOpen, setIsCategoryCreateOpen] = React.useState(false);

  if ((categories && categories.length === 0) || (channels && channels.length === 0)) {
    return (
      <>
        <CategoryCreate
          open={isCategoryCreateOpen}
          onOpenChange={() => setIsCategoryCreateOpen((prev) => !prev)}
        />
        <div
          onClick={() => setIsCategoryCreateOpen(true)}
          className="hover:bg-gray-5 group mt-8 flex h-[40px] w-full flex-row items-center justify-between rounded-lg border border-dashed p-2 transition-colors ease-in hover:cursor-pointer"
        >
          <div className="flex items-center">
            <Plus className="fill-gray-90 hover:bg-gray-5" />
            <span className="pl-2 text-[14px] font-normal">Добавить категорию</span>
          </div>
        </div>
      </>
    );
  }

  if (categories === null || channels === null) return <CommunityItemsSkeleton />;

  // console.log('categoryIds', categoryIds);
  // console.log('channelsIds', channelsIds);

  return (
    <DndContext
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
      collisionDetection={closestCorners}
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <ul
        className={`mt-3 flex h-[calc(100dvh-282px)] flex-col gap-1 overflow-y-auto px-5 sm:mb-[60px] sm:pl-1 sm:pr-0 ${
          className ?? ''
        }`}
      >
        <div
          onClick={() => router.push(`/communities/${currentCommunityId}/home`)}
          className={`${pathname.includes('/home') ? 'text-brand-80 bg-brand-0 hover:text-brand-100' : 'text-gray-90 hover:bg-gray-5'} group flex h-[40px] w-full flex-row items-center justify-between rounded-lg p-2 transition-colors ease-in hover:cursor-pointer`}
        >
          <div className="flex items-center">
            <Home
              className={`${pathname.includes('/home') ? 'fill-brand-80 group-hover:fill-brand-100' : 'fill-gray-90 hover:bg-gray-5'}`}
            />
            <span className="pl-2 text-[14px] font-normal">Главная</span>
          </div>
        </div>
        <div className="text-gray-30 hover:bg-gray-5 group flex h-[40px] w-full cursor-not-allowed flex-row items-center justify-between rounded-lg p-2 transition-colors ease-in hover:text-gray-50">
          <div className="flex cursor-not-allowed items-center">
            <Calendar className="fill-gray-30 group-hover:fill-gray-50" />
            <span className="pl-2 text-[14px] font-normal">Расписание</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <ScrollArea>
          <SortableContext strategy={verticalListSortingStrategy} items={categoryIds}>
            {categories.length !== 0 &&
              categories.map((category) => (
                <div key={category.id} className="my-2 mr-2">
                  <CategoryContainer
                    setSlideIndex={setSlideIndex}
                    category={category}
                    channels={channels.filter((channel) => channel.categoryId === category.id)}
                  />
                </div>
              ))}
          </SortableContext>
        </ScrollArea>
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
