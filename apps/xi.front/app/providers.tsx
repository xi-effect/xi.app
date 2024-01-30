'use client';

import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react';
import { useMainSt } from 'store';
import { Navigation } from 'pkg.navigation';
import { SkeletonMainLayout } from 'pkg.navigation.skeleton';
import { Toaster } from 'sonner';
import { redirect, usePathname } from 'next/navigation';

const mapsOfPathsWithoutNav = [
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
  '/welcome/final',
  '/welcome/user-info',
  '/signup',
];

const mapsOfPathsWithoutRedirect = ['/', '/signup', '/reset-password', '/reset-password/'];

function Auth(props) {
  const { children } = props;

  const pathname = usePathname();

  const isLogin = useMainSt((state) => state.isLogin);
  const getUser = useMainSt((state) => state.getUser);
  const onSignOut = useMainSt((state) => state.onSignOut);

  useEffect(() => {
    getUser();
  }, []);

  console.log('isLogin', isLogin);
  console.log('pathname', pathname);

  const onExit = () => {
    onSignOut();
  };

  // Показываем скелетон, пока запрос на проверку сессии не пришёл
  if (isLogin === null) return <SkeletonMainLayout />;

  // Если пользователь залогинен, но нам не нужно главное меню
  if (isLogin && mapsOfPathsWithoutNav.includes(pathname)) return children;

  // Если пользователь не залогинен, то редиректим на форму входа, исключая страницы входа, регистрации и восстановления пароля
  if (!isLogin && !mapsOfPathsWithoutRedirect.includes(pathname)) return redirect('/');

  // Если пользователь залогинен и нам нужно показать главное меню
  if (isLogin)
    return (
      <>
        <Navigation onExit={onExit}>{children}</Navigation>
      </>
    );

  return children;
}

export function Providers(props) {
  const { children } = props;

  return (
    <>
      <ThemeProvider defaultTheme="light" themes={['light', 'dark']} attribute="data-theme">
        <Toaster />
        <Auth>{children}</Auth>
      </ThemeProvider>
    </>
  );
}
