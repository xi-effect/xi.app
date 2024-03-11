'use client';

import { ThemeProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';
import { useMainSt } from 'pkg.stores';
import Load from './load';

const mapsOfPathsWithoutNav = [
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
  '/welcome/final',
  '/welcome/user-info',
  '/signup',
];

const mapsOfPathsWithoutRedirect = ['/', '/signin', '/signup', '/reset-password'];

const welcomePagesPaths = [
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

const AuthProvider = ({ children }: AuthProviderT) => {
  const pathname = usePathname();

  const isLogin = useMainSt((state) => state.isLogin);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  console.log('isLogin', isLogin);
  console.log('onboardingStage', onboardingStage);

  // Показываем скелетон, пока запрос на проверку сессии не пришёл
  if (isLogin === null) return <Load />;

  // Если пользователь не залогинен, то редиректим на форму входа, исключая страницы входа, регистрации и восстановления пароля
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
    !pathname.includes('/community/')
  )
    redirect('/community/1/home');

  if (
    isLogin &&
    !!onboardingStage &&
    onboardingStage !== 'completed' &&
    !welcomePagesPaths.includes(pathname)
  )
    redirect(welcomePagesPathsDict[onboardingStage]);

  return children;
};

type ProvidersT = {
  children: ReactNode;
};

export const Providers = ({ children }: ProvidersT) => {
  const getUser = useMainSt((state) => state.getUser);
  const setIsLogin = useMainSt((state) => state.setIsLogin);

  useEffect(() => {
    const { redir, isLogin } = getUser();

    if (!!redir) redirect(redir);
    if (isLogin === true) setIsLogin(true);
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="data-theme">
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </>
  );
};
