'use client';

import { ThemeProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';
import { useMainSt } from 'pkg.stores';
// import { useSocketIO } from 'pkg.utils';
import Load from './load';

const mapsOfPathsWithoutRedirect = ['/', '/signin', '/signup', '/reset-password'];

const welcomePagesPaths = [
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

// const SocketProvider = ({ children }: { children: ReactNode }) => {
//   const socket = useSocketIO();
//   const isLogin = useMainSt((state) => state.isLogin);

//   useEffect(() => {
//     if (!socket.connected && isLogin) {
//       socket.connect();
//     }

//     socket?.on('connect', () => {
//       console.info('SIO connect', socket?.id);
//     });

//     socket?.on('disconnect', () => {
//       console.info('SIO disconnect', socket?.id);
//     });

//     socket?.on('error', () => {
//       toast('Ошибка вебсокета');
//     });

//     socket?.on('connect_error', (error) => {
//       if (socket.active) {
//         toast('Ошибка вебсокета, автоматическое переподключение');
//         // temporary failure, the socket will automatically try to reconnect
//       } else {
//         toast('Ошибка вебсокета, переподключение');
//         socket.connect();
//         // the connection was denied by the server
//         // in that case, `socket.connect()` must be manually called in order to reconnect
//         console.log(error.message);
//       }
//     });

//     return () => {
//       socket?.off();
//       socket?.disconnect();
//     };
//   }, []);

//   return children;
// };

const AuthProvider = ({ children }: AuthProviderT) => {
  const pathname = usePathname();

  const isLogin = useMainSt((state) => state.isLogin);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  console.log('isLogin', isLogin);
  console.log('onboardingStage', onboardingStage);
  console.log('pathname', pathname);

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
        {/* <SocketProvider>{children}</SocketProvider> */}
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
};
