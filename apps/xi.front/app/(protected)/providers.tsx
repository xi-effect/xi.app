'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { redirect, useParams, usePathname, useRouter } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';
import { useMainSt } from 'pkg.stores';

import { ErrorPage } from 'pkg.error-page';
import { Link } from '@xipkg/link';
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
            console.log(stats);
            if (stats === 403) {
              setErrorCode(403);
            }
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

  if (errorCode === 403) {
    return (
      <ErrorPage
        title="Доступ запрещён"
        errorCode={403}
        text="У вас нет прав на просмотр данной страницы"
      >
        <p className="text-gray-80 text-m-base">
          Вернитесь&nbsp;
          <button
            type="button"
            className="decoration-brand-20 hover:decoration-brand-100 text-brand-80 hover:text-brand-100 underline underline-offset-4 bg-transparent"
            onClick={() => router.back()}
          >
            назад&nbsp;
          </button>
          или&nbsp;
          <Link theme="brand" size="l" href="/" target="_blank">
            на главную
          </Link>
        </p>
      </ErrorPage>
    );
  }
  return children;
};

export default ProtectedProvider;
