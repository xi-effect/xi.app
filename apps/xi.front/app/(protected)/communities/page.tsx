'use client';

import { redirect, useRouter } from 'next/navigation';
import { Logo } from 'pkg.logo';
import { useMainSt } from 'pkg.stores';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CommunitiesLoading() {
  const isLogin = useMainSt((state) => state.isLogin);
  const initSocket = useMainSt((state) => state.initSocket);
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const communityMeta = useMainSt((state) => state.communityMeta);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  const router = useRouter();

  // Тоже костыль
  useEffect(() => {
    const toastTimerId = setTimeout(() => {
      toast('Упс, проблемы с загрузкой');
      initSocket();
    }, 10000);

    const redirectTimerId = setTimeout(() => {
      redirect('/communities');
    }, 11000);

    return () => {
      clearTimeout(toastTimerId);
      clearTimeout(redirectTimerId);
    };
  }, []);

  // Если вдруг что-то пошло не так, ещё раз иницируем соединение сокета
  // В initSocket есть предотвращение инициализации нескольких соединений
  useEffect(() => {
    console.log('initSocket');
    initSocket();
  }, []);

  useEffect(() => {
    if (isLogin === false) {
      redirect('/signin');
    }
  }, [isLogin]);

  useEffect(() => {
    console.log('onconnect', socket);
    if (onboardingStage === 'completed') {
      socket?.on('connect', () => {
        socket.emit(
          'retrieve-any-community',
          (stats: number, { community, participant }: { community: any; participant: any }) => {
            if (stats === 200) {
              updateCommunityMeta({
                id: community.id,
                isOwner: participant.is_owner,
                name: community.name,
                description: community.description,
              });
            }

            if (community.id) router.push(`/communities/${community.id}/home`);
          },
        );
      });
    }

    if (socket?.connected === true && communityMeta.id === null) {
      socket.emit(
        'retrieve-any-community',
        (stats: number, { community, participant }: { community: any; participant: any }) => {
          if (stats === 200) {
            updateCommunityMeta({
              id: community.id,
              isOwner: participant.is_owner,
              name: community.name,
              description: community.description,
            });
          }

          if (community.id) router.push(`/communities/${community.id}/home`);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (isLogin && socket?.connected === true) {
      socket.emit('retrieve-any-community',
        (stats: number, { community, participant }: { community: any; participant: any }) => {
          if (stats === 200) {
            updateCommunityMeta({
              id: community.id,
              isOwner: participant.is_owner,
              name: community.name,
              description: community.description,
            });
          }

          if (community.id) router.push(`/communities/${community.id}/home`);
        },
      );
    }
  }, [isLogin, socket?.connected]);

  return (
    <div className="flex">
      <div className="flex-col min-w-[350px] p-6">
        <div className="p-2">
          <Logo height={16} width={134} logoVariant="navigation" logoSize="default" />
        </div>
        <div className="flex h-12 px-2.5 py-2 md:w-[302px] mt-0 sm:mt-8 gap-2 items-center rounded-xl">
          <div className="bg-gray-10 h-[32px] w-[32px] animate-pulse rounded-full shrink-0" />
          <div className="bg-gray-10 h-[24px] w-full animate-pulse rounded-[4px]" />
        </div>
        <div className="w-full h-[calc(100dvh-124px)] p-2">
          <ul className="mt-3 flex flex-col gap-4 overflow-hidden sm:mb-[60px]">
            {[...new Array(7)].map((item, index) => (
              <li
                key={index.toString()}
                className="bg-gray-10 h-[28px] w-full animate-pulse rounded-[4px]"
              />
            ))}
          </ul>
        </div>
        <div className="fixed bottom-0 flex flex-col pb-6 sm:w-[302px]">
          <div className="flex gap-2 items-center p-2">
            <div className="bg-gray-10 h-[32px] w-[32px] animate-pulse rounded-full shrink-0" />
            <div className="bg-gray-10 h-[24px] w-full animate-pulse rounded-[4px]" />
          </div>
          <div className="mt-1 p-2">
            <div className="bg-gray-10 h-[32px] w-full animate-pulse rounded-[4px]" />
          </div>
        </div>
      </div>
      <div className="p-8 w-[calc(100vw-350px)] overflow-auto h-full">
        <div className="pb-8 max-w-[1570px]">
          <div className="flex gap-4 sm:flex-col xl:flex-row">
            <div className="bg-gray-10 h-[48px] w-full animate-pulse rounded-[4px]" />
            <div className="flex gap-2 w-full">
              <div className="bg-gray-10 h-[48px] w-[48px] animate-pulse rounded-full shrink-0" />
              <div className="bg-gray-10 h-[48px] w-full animate-pulse rounded-[4px]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="bg-gray-10 h-[32px] w-[400px] animate-pulse rounded-[4px]" />
          </div>
        </div>
        <div className="grid py-8 max-xs:py-4 gap-12 max-w-[1570px] xl:grid-cols-3">
          <div className="flex flex-col gap-2">
            <div className="bg-gray-10 h-[240px]  w-full animate-pulse rounded-2xl" />
            <div className="bg-gray-10 h-[32px]  w-full animate-pulse rounded-[4px]" />
            <div className="bg-gray-10 h-[72px]  w-full animate-pulse rounded-[4px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-gray-10 h-[240px]  w-full animate-pulse rounded-2xl" />
            <div className="bg-gray-10 h-[32px]  w-full animate-pulse rounded-[4px]" />
            <div className="bg-gray-10 h-[72px]  w-full animate-pulse rounded-[4px]" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-gray-10 h-[240px]  w-full animate-pulse rounded-2xl" />
            <div className="bg-gray-10 h-[32px]  w-full animate-pulse rounded-[4px]" />
            <div className="bg-gray-10 h-[72px]  w-full animate-pulse rounded-[4px]" />
          </div>
        </div>
        <div className="py-8 max-xs:py-4 w-full max-w-[1570px]">
          <div className="bg-gray-10 h-[248px] w-full animate-pulse rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
