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
  const [redirecting, setRedirecting] = useState<boolean>(false);

  const params = useParams<{ 'community-id': string }>();

  const socket = useMainSt((state) => state.socket);
  const getUser = useMainSt((state) => state.getUser);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const communityMeta = useMainSt((state) => state.communityMeta);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);
  const communities = useMainSt((state) => state.communities);
  // const channels = useMainSt((state) => state.channels);

  const isLogin = useMainSt((state) => state.isLogin);

  const pathname = usePathname();
  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();

  // Пока закомментировал, так как из-за VPN инфа о сообществе не сразу подтгивается и
  // 403 вылетает не по делу
  // useEffect(() => {
  //   if (channels === null) return;

  //   const channelIds = channels?.map(({ id }) => id);
  //   console.log('channelIds', channelIds);
  //   if (params['channel-id'] && !channelIds?.includes(Number(params['channel-id']))) {
  //     console.log('403');
  //     setErrorCode(403);
  //   }
  // }, [params, channels]);

  useEffect(() => {
    if (onboardingStage !== 'completed') return;
    // Если соединение с сокетом не установлено
    if (!socket?.connected) return;

    // Если ошибка, не перенаправляем сразу на страницу доступного сообщества.
    if (errorCode !== null) return;

    if (communities?.length === 0 && communityMeta.id === null && !pathname.includes('/empty')) {
      toast('Вы не состоите ни в одном сообществе');
      setRedirecting(true);
      router.replace(getUrlWithParams('/empty'));
      return;
    }

    console.log('params[community-id]', params['community-id']);

    // Если мы не знаем id текущего сообщества, мы получаем любое и редиректим туда пользователя
    if (typeof params['community-id'] !== 'string') {
      socket.emit(
        'retrieve-any-community',
        (status: number, { community, participant }: { community: any; participant: any }) => {
          console.log('retrieve-any-community', community);
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

      return;
    }

    // Если мы уже знаем из url id сообщества, то нам нужно запросить данные по нему
    if (typeof params['community-id'] === 'string') {
      socket.emit(
        'retrieve-community',
        {
          community_id: params['community-id'],
        },
        (status: number, { community, participant }: { community: any; participant: any }) => {
          console.log('retrieve-community', community);
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
    }
  }, [socket?.connected, onboardingStage]);

  useEffect(() => {
    if (socket?.connected === false) {
      socket?.connect();
    }
  }, [socket?.connected]);

  useEffect(() => {
    if (!socket?.connected) return;

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
        window.location.reload();
      }
    });

    socket.on('kicked-from-community', (kickedCommunity) => {
      if (kickedCommunity.community_id === communityMeta.id) {
        toast(`Вы исключены из сообщества ${communityMeta.name}`);
        router.replace(getUrlWithParams('/communities'));
        window.location.reload();
      }
    });
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

  if (!redirecting && errorCode === 403) {
    return <Forbidden403 />;
  }

  if (!redirecting && errorCode === 404) {
    return <Error404 />;
  }

  return children;
};

export default ProtectedProvider;
