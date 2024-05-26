/* eslint-disable consistent-return */

'use client';

import React, { ReactNode, useEffect } from 'react';
import { useSessionStorage } from 'pkg.utils';
import { useMainSt } from 'pkg.stores';
import { nanoid } from 'nanoid';
import { BottomBar, Menu } from './components';

type NavigationProp = {
  children: ReactNode;
  onExit: () => void;
};

type NewChannelT = {
  community_id: number;
  category_id: number | null;
  channel: {
    id: number;
    kind: string;
    name: string;
    description: string | null;
  };
};

type NewCategoryT = {
  community_id: number;
  category: {
    id: number;
    name: string;
    description: string | null;
  };
};

export const Navigation = ({ children, onExit }: NavigationProp) => {
  const [slideIndex, setSlideIndex] = useSessionStorage('slide-index-menu', 1);
  const socket = useMainSt((state) => state.socket);

  const channels = useMainSt((state) => state.channels);
  const updateChannels = useMainSt((state) => state.updateChannels);

  const categories = useMainSt((state) => state.categories);
  const updateCategories = useMainSt((state) => state.updateCategories);

  console.log('categories', categories);

  useEffect(() => {
    // Инициализация сокета только один раз
    if (socket) {
      const handleNewChannel = (newChannel: NewChannelT) => {
        console.log('handleNewChannel useEffect', newChannel);

        updateChannels([
          ...(channels || []),
          {
            uid: nanoid(),
            id: newChannel.channel.id,
            categoryId: newChannel.category_id ? newChannel.category_id : 'empty',
            kind: newChannel.channel.kind,
            name: newChannel.channel.name,
            description: newChannel.channel.description,
          },
        ]);
      };

      socket.on('create-channel', handleNewChannel);

      // Очистка обработчиков при размонтировании компонента
      return () => {
        socket.off('create-channel', handleNewChannel);
      };
    }
  }, []);

  useEffect(() => {
    // Инициализация сокета только один раз
    if (socket) {
      const handleNewCategory = (newCategory: NewCategoryT) => {
        console.log('handleNewCategory useEffect', newCategory);
        updateCategories([
          ...(categories || []),
          {
            uid: nanoid(),
            id: newCategory.category.id,
            name: newCategory.category.name,
            description: newCategory.category.description,
          },
        ]);
      };

      socket.on('create-category', handleNewCategory);

      // Очистка обработчиков при размонтировании компонента
      return () => {
        socket.off('create-category', handleNewCategory);
      };
    }
  }, []);

  return (
    <>
      <div className="relative hidden flex-row md:flex">
        <div className="fixed flex h-screen min-h-screen min-w-[350px] flex-col p-6">
          <Menu onExit={onExit} setSlideIndex={setSlideIndex} />
        </div>
        <div className="ml-[350px] w-[calc(100vw-350px)] overflow-auto">{children}</div>
      </div>
      <BottomBar slideIndex={slideIndex} setSlideIndex={setSlideIndex} onExit={onExit}>
        {children}
      </BottomBar>
    </>
  );
};
