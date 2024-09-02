'use client';

import React, { ReactNode, useEffect } from 'react';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';
import { useMainSt } from 'pkg.stores';
import Load from '../load';

type ProtectedProviderPropsT = {
  children: ReactNode;
};

const ProtectedProvider = ({ children }: ProtectedProviderPropsT) => {
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

    if (socket?.connected === false && typeof params['community-id'] !== 'string') {
      // Если мы не знаем id текущего сообщества, мы получаем любое и редиректим туда пользователя
      socket?.on('connect', () => {
        socket.emit(
          'retrieve-any-community',
          (stats: number, { community, participant }: { community: any; participant: any }) => {
            console.log('11', community, participant);
            if (stats === 200) {
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
        (stats: number, { community, participant }: { community: any; participant: any }) => {
          if (stats === 200) {
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
          (stats: number, { community, participant }: { community: any; participant: any }) => {
            if (stats === 200) {
              updateCommunityMeta({
                id: community.id,
                isOwner: participant.is_owner,
                name: community.name,
                description: community.description,
              });
            }
          },
        );
      });

      return;
    }

    // Если мы знаем id текущего сообщества из url, но соединение сокета уже установлено
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

  return children;
};

export default ProtectedProvider;
