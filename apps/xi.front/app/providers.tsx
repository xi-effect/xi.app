'use client';

import { ThemeProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';
import { useMainSt } from 'pkg.stores';
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
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
