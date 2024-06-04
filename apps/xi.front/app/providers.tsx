'use client';

import { ThemeProvider } from 'next-themes';
import { redirect, useParams, usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, Suspense } from 'react';
import { toast, Toaster } from 'sonner';
import { useMainSt } from 'pkg.stores';
import Load from './load';

const mapsOfPathsWithoutRedirect = ['/signin', '/signup', '/reset-password'];

const welcomePagesPaths = [
  '/',
  '/signin',
  '/welcome/user-info',
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
];

const welcomePagesPathsDict = {
  created: '/welcome/user-info',
  'community-choice': '/welcome/community',
  'community-create': '/welcome/community-create',
  'community-invite': '/welcome/community-invite',
};

type AuthProviderT = {
  children: ReactNode;
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useMainSt((state) => state.socket);
  console.log('socket', socket);

  socket?.on('connect', () => {
    console.info('SIO connect', socket?.id);
  });

  socket?.on('disconnect', (reason) => {
    // the reason of the disconnection, for example "transport error"
    console.log('disconnect', reason);
  });

  socket?.on('connect_error', (err) => {
    // the reason of the error, for example "xhr poll error"
    console.log('connect_error', err.message);

    // some additional description, for example the status code of the initial HTTP response
    console.log(err.description);

    // some additional context, for example the XMLHttpRequest object
    console.log(err.context);
  });

  socket?.on('error', () => {
    toast('Ошибка вебсокета');
  });

  // socket.on('create-channel', (data: any) => {
  //   console.log('handleNewChannel', data);
  // });

  // useEffect(() => {
  //   // const handleNewChannel = (status: number, data: any) => {
  //   //   console.log('handleNewChannel', status, data);
  //   // };

  //   socket.on('create-channel', (data: any) => {
  //     console.log('handleNewChannel socket', data);
  //   });

  //   // return () => {
  //   //   socket.off('create-channel', handleNewChannel);
  //   // };
  // }, [socket]);

  return children;
};

const AuthProvider = ({ children }: AuthProviderT) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { 'community-id': comIdParams } = useParams<{ 'community-id': string }>();

  const isLogin = useMainSt((state) => state.isLogin);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);
  const communityId = useMainSt((state) => state.communityMeta.id);
  const getUser = useMainSt((state) => state.getUser);
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);
  const setIsLogin = useMainSt((state) => state.setIsLogin);

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (socket !== null) {
      socket.on('connect', () => {
        if (comIdParams) {
          socket.emit(
            'retrieve-community',
            {
              community_id: comIdParams,
            },
            (stats: number, { community, participant }: { community: any; participant: any }) => {
              console.log('stats', stats, community, participant);

              if (stats === 200) {
                updateCommunityMeta({
                  id: community.id,
                  isOwner: participant.is_owner,
                  name: community.name,
                  description: community.description,
                });
              }

              if (community?.id !== null) {
                setIsLogin(true);
              }
            },
          );
        } else {
          socket.emit(
            'retrieve-any-community',
            (stats: number, { community, participant }: { community: any; participant: any }) => {
              console.log('stats', stats, community, participant);

              if (stats === 200) {
                updateCommunityMeta({
                  id: community.id,
                  isOwner: participant.is_owner,
                  name: community.name,
                  description: community.description,
                });
              }

              if (community?.id !== null) {
                setIsLogin(true);
              }
            },
          );
        }
      });
    }
  }, [socket?.connected]);

  // console.log('isLogin', isLogin);
  // console.log('onboardingStage', onboardingStage);
  // console.log('pathname', pathname);
  // console.log('communityId', communityId);
  // console.log('comIdParams', Number(comIdParams));
  // console.log('Number(comIdParams) !== communityId', Number(comIdParams) !== communityId);

  // Показываем скелетон, пока запрос на проверку сессии не пришёл
  if (isLogin === null) return <Load />;

  // Сохраняем уникальные параметры при редиректе
  const getUrlWithParams = (url: string) => {
    console.log('searchParams', searchParams);
    const params = new URLSearchParams(Object.fromEntries(searchParams)).toString();

    return params ? `${url}?${params}` : url;
  };

  // Если пользователь не залогинен,
  // то редиректим на форму входа, исключая страницы входа, регистрации и восстановления пароля
  console.log(
    "pathname.includes('/invite/')",
    !(
      mapsOfPathsWithoutRedirect.includes(pathname) ||
      pathname.includes('/reset-password/') ||
      pathname.includes('/invite/')
    ),
  );

  if (
    !isLogin &&
    !(
      mapsOfPathsWithoutRedirect.includes(pathname) ||
      pathname.includes('/reset-password/') ||
      pathname.includes('/invite/')
    )
  ) {
    console.log("getUrlWithParams('/signin')", getUrlWithParams('/signin'));
    redirect(getUrlWithParams('/signin'));
    // toast('Требуется авторизация');
  }

  if (
    isLogin &&
    !!communityId &&
    Number(comIdParams) !== communityId &&
    !!onboardingStage &&
    onboardingStage === 'completed' &&
    welcomePagesPaths.includes(pathname)
  ) {
    redirect(getUrlWithParams(`/communities/${communityId}/home`));
  }

  if (
    isLogin &&
    !!onboardingStage &&
    onboardingStage !== 'completed' &&
    onboardingStage !== 'final' &&
    !welcomePagesPaths.includes(pathname)
  ) {
    redirect(getUrlWithParams(welcomePagesPathsDict[onboardingStage]));
  }

  return children;
};

type ProvidersT = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersT) => (
  <ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="data-theme">
    <Toaster visibleToasts={1} />
    <Suspense fallback={<Load />}>
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </Suspense>
  </ThemeProvider>
);
