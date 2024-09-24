'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';

import Error404 from 'app/not-found';
import Forbidden403 from 'app/forbidden';
import Load from '../load';

type ProtectedProviderPropsT = {
  children: ReactNode;
};

const ProtectedProvider = ({ children }: ProtectedProviderPropsT) => {
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const params = useParams<{ 'community-id': string }>();

  const socket = useMainSt((state) => state.socket);
  const getUser = useMainSt((state) => state.getUser);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const communityMeta = useMainSt((state) => state.communityMeta);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  const isLogin = useMainSt((state) => state.isLogin);

  const pathname = usePathname();
  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();

  useEffect(() => {
    if (onboardingStage !== 'completed') return;

    // Если 403 ошибка, не перенапрвляем сразу на страницу доступного сообщества
    if (errorCode !== null) return;

    if (communityMeta.id === null && !pathname.includes('/empty')) {
      toast('Вы не состоите ни в одном сообществе');
      router.replace(getUrlWithParams('/empty'));
    }

    if (socket?.connected === false && typeof params['community-id'] !== 'string') {
      // Если мы не знаем id текущего сообщества, мы получаем любое и редиректим туда пользователя
      socket?.on('connect', () => {
        socket.emit(
          'retrieve-any-community',
          (status: number, { community, participant }: { community: any; participant: any }) => {
            console.log('11', community, participant);
            if (status === 200) {
              updateCommunityMeta({
                id: community.id,
                isOwner: participant.is_owner,
                name: community.name,
                description: community.description,
              });
            }

            const pathnameArr = pathname.split('/');
            if (pathnameArr.includes('channels') && community.id) {
              const betweenChannels = pathname.split('channels');

              return router.push(
                getUrlWithParams(`/communities/${community.id}/channels${betweenChannels[1]}`),
              );
            }

            if (community && community.id) {
              router.push(getUrlWithParams(`/communities/${community.id}/home`));
            }

            return null;
          },
        );
      });

      return;
    }

    // Если мы не знаем id текущего сообщества, но соединение сокета уже установлено
    if (socket?.connected === true && communityMeta.id === null) {
      socket.emit(
        'retrieve-any-community',
        (status: number, { community, participant }: { community: any; participant: any }) => {
          if (status === 200) {
            updateCommunityMeta({
              id: community.id,
              isOwner: participant.is_owner,
              name: community.name,
              description: community.description,
            });
          }

          if (community && community.id) {
            router.push(getUrlWithParams(`/communities/${community.id}/home`));
          }

          return null;
        },
      );

      return;
    }

    // Если мы уже знаем из url id сообщества, то нам нужно запросить данные по нему
    if (socket?.connected === false && typeof params['community-id'] === 'string') {
      socket?.on('connect', () => {
        socket.emit(
          'retrieve-community',
          {
            community_id: params['community-id'],
          },
          (status: number, { community, participant }: { community: any; participant: any }) => {
            console.log('14', community);
            if (status === 403) {
              return setErrorCode(403);
            }
            if (status === 404) {
              return setErrorCode(404);
            }
            if (status === 200) {
              updateCommunityMeta({
                id: community.id,
                isOwner: participant.is_owner,
                name: community.name,
                description: community.description,
              });
            }
            return null;
          },
        );
      });

      return;
    }

    // Если мы знаем id текущего сообщества из url, но соединение сокета уже установлено
    if (socket?.connected === true && communityMeta.id === null) {
      socket.emit(
        'retrieve-any-community',
        (status: number, { community, participant }: { community: any; participant: any }) => {
          if (status === 200) {
            updateCommunityMeta({
              id: community.id,
              isOwner: participant.is_owner,
              name: community.name,
              description: community.description,
            });
          }
        },
      );
    }
  }, [socket?.connected, onboardingStage]);

  useEffect(() => {
    if (socket?.connected === false) {
      socket?.connect();
    }
  }, [socket?.connected]);

  useEffect(() => {
    if (socket?.connected) {
      socket.on('delete-community', (deletedCommunity) => {
        if (deletedCommunity.community_id === communityMeta.id) {
          updateCommunityMeta({
            id: null,
            isOwner: false,
            name: '',
            description: '',
          });
          toast('Сообщество удалено');
          router.replace(getUrlWithParams('/communities'));
          router.refresh();
        }
      });
    }

    if (socket?.connected) {
      socket.on('kicked-from-community', (kickedCommunity) => {
        if (kickedCommunity.community_id === communityMeta.id) {
          toast(`Вы исключены из сообщества ${communityMeta.name}`);
          router.replace(getUrlWithParams('/communities'));
          router.refresh();
        }
      });
    }
  }, [socket?.connected, communityMeta.id]);

  useEffect(() => {
    if (pathname !== '/communities' || (pathname === '/communities' && isLogin === null)) {
      if (isLogin === false) {
        redirect('/signin');
      } else {
        getUser();
      }
    }
  }, [isLogin]);

  useEffect(() => {
    if (
      onboardingStage &&
      onboardingStage !== null &&
      onboardingStage !== 'completed' &&
      !pathname.includes('/welcome/')
    ) {
      redirect('/welcome/user-info');
    }
  }, [isLogin]);

  if (isLogin === null) return <Load />;

  if (errorCode === 403) {
    return <Forbidden403 />;
  }

  if (errorCode === 404) {
    return <Error404 />;
  }

  return children;
};

export default ProtectedProvider;
