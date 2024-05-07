'use client';

import { ThemeProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { toast, Toaster } from 'sonner';
import { useMainSt } from 'pkg.stores';
// import { useSocketIO } from 'pkg.utils';
// import { io } from 'socket.io-client';
import Load from './load';

const mapsOfPathsWithoutRedirect = ['/signin', '/signup', '/reset-password'];

const welcomePagesPaths = [
  '/',
  '/signin',
  '/welcome/user-info',
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
  // '/welcome/final',
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
  // const isLogin = useMainSt((state) => state.isLogin);
  const socket = useMainSt((state) => state.socket);
  console.log('socket', socket);

  socket?.on('connect', () => {
    console.info('SIO connect', socket?.id);
  });

  socket?.on('disconnect', (reason, details) => {
    // the reason of the disconnection, for example "transport error"
    console.log('disconnect', reason);

    // the low-level reason of the disconnection, for example "xhr post error"
    console.log(details.message);

    // some additional description, for example the status code of the HTTP response
    console.log(details.description);

    // some additional context, for example the XMLHttpRequest object
    console.log(details.context);
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

  // socket?.on('connect_error', (error) => {
  //   if (socket.active) {
  //     if (process.env.NODE_ENV === 'development') {
  //       toast('Ошибка вебсокета, автоматическое переподключение');
  //     }
  //     // temporary failure, the socket will automatically try to reconnect
  //   } else {
  // if (process.env.NODE_ENV === 'development') toast('Ошибка вебсокета, переподключение');
  //     socket.connect();
  //     // the connection was denied by the server
  //     // in that case, `socket.connect()` must be manually called in order to reconnect
  //     console.log(error.message);
  //   }
  // });

  useEffect(
    () => () => {
      socket?.off();
      socket?.disconnect();
    },
    [],
  );

  return children;
};

const AuthProvider = ({ children }: AuthProviderT) => {
  const pathname = usePathname();

  const isLogin = useMainSt((state) => state.isLogin);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  // console.log('isLogin', isLogin);
  // console.log('onboardingStage', onboardingStage);
  // console.log('pathname', pathname);

  // Показываем скелетон, пока запрос на проверку сессии не пришёл
  if (isLogin === null) return <Load />;

  // Если пользователь не залогинен,
  // то редиректим на форму входа, исключая страницы входа, регистрации и восстановления пароля
  if (
    !isLogin &&
    !(mapsOfPathsWithoutRedirect.includes(pathname) || pathname.includes('/reset-password/'))
  ) {
    redirect('/signin');
    // toast('Требуется авторизация');
  }

  if (
    isLogin &&
    !!onboardingStage &&
    onboardingStage === 'completed' &&
    welcomePagesPaths.includes(pathname)
  ) {
    redirect('/communities/1/home');
  }

  if (
    isLogin &&
    !!onboardingStage &&
    onboardingStage !== 'completed' &&
    onboardingStage !== 'final' &&
    !welcomePagesPaths.includes(pathname)
  ) {
    redirect(welcomePagesPathsDict[onboardingStage]);
  }

  return children;
};

type ProvidersT = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersT) => {
  const getUser = useMainSt((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="data-theme">
      <Toaster />
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
        {/* {children} */}
      </AuthProvider>
    </ThemeProvider>
  );
};
