/* eslint-disable consistent-return */

'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import { useGetUrlWithParams, useSessionStorage } from 'pkg.utils.client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { WelcomeModal } from 'pkg.modal.welcome';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';
import { nanoid } from 'nanoid';
import { BottomBar, Menu } from './components';

type NavigationPropT = {
  children: ReactNode;
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

type MoveCategoryT = {
  community_id: number;
  category_id: number;
  after_id: number | null;
  before_id: number | null;
};

type MoveChannelT = {
  community_id: number;
  category_id: number;
  channel_id: number;
  after_id: number | null;
  before_id: number | null;
};

type DeletedChannelT = {
  community_id: number;
  channel_id: number;
};

type DeletedCategoryT = {
  community_id: number;
  category_id: number;
};

export const Navigation = ({ children }: NavigationPropT) => {
  const pathname = usePathname();
  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();

  const [slideIndex, setSlideIndex] = useSessionStorage('slide-index-menu', 1);
  const socket = useMainSt((state) => state.socket);

  const addChannel = useMainSt((state) => state.addChannel);
  const addCategory = useMainSt((state) => state.addCategory);

  const moveCategory = useMainSt((state) => state.moveCategory);
  const moveChannel = useMainSt((state) => state.moveChannel);

  const deleteChannel = useMainSt((state) => state.deleteChannel);
  const deleteCategory = useMainSt((state) => state.deleteCategory);

  useEffect(() => {
    // Инициализация сокета только один раз
    if (socket) {
      const handleNewChannel = (newChannel: NewChannelT) => {
        addChannel({
          uid: nanoid(),
          id: newChannel.channel.id,
          categoryId: newChannel.category_id ? newChannel.category_id : 'empty',
          kind: newChannel.channel.kind,
          name: newChannel.channel.name,
        });
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
        addCategory({
          uid: nanoid(),
          id: newCategory.category.id,
          name: newCategory.category.name,
          description: newCategory.category.description,
        });
      };

      socket.on('create-category', handleNewCategory);

      // Очистка обработчиков при размонтировании компонента
      return () => {
        socket.off('create-category', handleNewCategory);
      };
    }
  }, []);

  useEffect(() => {
    // Инициализация сокета только один раз
    if (socket) {
      const handleMoveCategory = (moveCategoryData: MoveCategoryT) => {
        moveCategory({
          categoryId: moveCategoryData.category_id,
          afterId: moveCategoryData.after_id,
          beforeId: moveCategoryData.before_id,
        });
      };

      socket.on('move-category', handleMoveCategory);

      // Очистка обработчиков при размонтировании компонента
      return () => {
        socket.off('move-category', handleMoveCategory);
      };
    }
  }, []);

  useEffect(() => {
    // Инициализация сокета только один раз
    if (socket) {
      const handleMoveChannel = (moveChannelData: MoveChannelT) => {
        moveChannel({
          channelId: moveChannelData.channel_id,
          categoryId: moveChannelData.category_id,
          afterId: moveChannelData.after_id,
          beforeId: moveChannelData.before_id,
        });
      };

      socket.on('move-channel', handleMoveChannel);

      // Очистка обработчиков при размонтировании компонента
      return () => {
        socket.off('move-channel', handleMoveChannel);
      };
    }
  }, []);

  useEffect(() => {
    // Инициализация сокета только один раз
    if (socket) {
      const handleDeleteChannel = (deletedChannel: DeletedChannelT) => {
        deleteChannel(deletedChannel.channel_id);
      };

      socket.on('delete-channel', handleDeleteChannel);
      // Очистка обработчиков при размонтировании компонента
      return () => {
        socket.off('delete-channel', handleDeleteChannel);
      };
    }
  }, []);

  useEffect(() => {
    // Инициализация сокета только один раз
    if (socket) {
      const handleDeleteCategory = (deletedCategory: DeletedCategoryT) => {
        deleteCategory(deletedCategory.category_id);
      };

      socket.on('delete-category', handleDeleteCategory);
      // Очистка обработчиков при размонтировании компонента
      return () => {
        socket.off('delete-category', handleDeleteCategory);
      };
    }
  }, []);

  useEffect(() => {
    const handleDeleteCommunity = () => {
      router.push(getUrlWithParams('/communities'));
      toast('Сообщество было удалено');
    };
    socket?.on('delete-community', handleDeleteCommunity);

    return () => {
      socket?.off('delete-community', handleDeleteCommunity);
    };
  }, []);

  // Чтение параметров из url и открытие модального окна, если есть параметр welcome-modal=true
  const searchParams = useSearchParams();
  const [modalOpen, setModalOpen] = useState(searchParams.get('welcome-modal') === 'true');
  useEffect(() => {
    setModalOpen(searchParams.get('welcome-modal') === 'true');
  }, [searchParams]);

  if (pathname.includes('/empty/')) return children;

  return (
    <>
      <div className="relative hidden flex-row md:flex">
        <div className="fixed flex h-screen min-h-screen min-w-[350px] flex-col p-6">
          <Menu setSlideIndex={setSlideIndex} />
        </div>
        <div className="ml-[350px] h-full w-[calc(100vw-350px)] overflow-auto">{children}</div>
      </div>
      <BottomBar slideIndex={slideIndex} setSlideIndex={setSlideIndex}>
        {children}
      </BottomBar>
      <WelcomeModal open={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};
