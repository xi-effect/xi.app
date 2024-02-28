'use client';

import { ThemeProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';
import { SkeletonMainLayout } from 'pkg.navigation.skeleton';
import { ReactNode, useEffect } from 'react';
import { Toaster } from 'sonner';
import { useMainSt } from 'store';

import dynamic from 'next/dynamic';

const Navigation = dynamic(() => import('pkg.navigation').then((mod) => mod.Navigation));

const mapsOfPathsWithoutNav = [
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
  '/welcome/final',
  '/welcome/user-info',
  '/signup',
];

const mapsOfPathsWithoutRedirect = ['/', '/signup', '/reset-password'];

const welcomePagesPathsDict = {
  created: '/welcome/user-info',
  'community-choice': '/welcome/community',
  'community-create': '/welcome/community-create',
  'community-invite': '/welcome/community-invite',
};

const welcomePagesPaths = [
  '/welcome/user-info',
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
];

type AuthProviderT = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderT) => {
  const pathname = usePathname();
  console.log('pathname', pathname);

  const isLogin = useMainSt((state) => state.isLogin);
  const onboardingStage = useMainSt((state) => state.user.onboardingStage);

  console.log('isLogin', isLogin);
  console.log('onboardingStage', onboardingStage);
  console.log('pathname', pathname);

  // Показываем скелетон, пока запрос на проверку сессии не пришёл
//   if (isLogin === null) return <SkeletonMainLayout />;

//   // Если пользователь не залогинен, то редиректим на форму входа, исключая страницы входа, регистрации и восстановления пароля
//   if (
//     !isLogin &&
//     !(mapsOfPathsWithoutRedirect.includes(pathname) || pathname.includes('/reset-password/'))
//   )
//     return redirect('/');

//   if (
//     isLogin &&
//     !!onboardingStage &&
//     onboardingStage === 'completed' &&
//     welcomePagesPaths.includes(pathname)
//   )
//     redirect('/');

//   if (
//     isLogin &&
//     !!onboardingStage &&
//     onboardingStage !== 'completed' &&
//     !welcomePagesPaths.includes(pathname)
//   )
//     redirect(welcomePagesPathsDict[onboardingStage]);

//   // Если пользователь залогинен, но нам не нужно главное меню
//   if (isLogin && mapsOfPathsWithoutNav.includes(pathname)) return children;

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
    <>
      <ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="data-theme">
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </>
  );
};
