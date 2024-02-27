'use client';

import { ThemeProvider } from 'next-themes';
import { redirect, usePathname } from 'next/navigation';
import { SkeletonMainLayout } from 'pkg.navigation.skeleton';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { useMainSt } from 'store';

import dynamic from 'next/dynamic';
 
const Navigation = dynamic(() =>
  import('pkg.navigation').then((mod) => mod.Navigation)
)

const mapsOfPathsWithoutNav = [
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
  '/welcome/final',
  '/welcome/user-info',
  '/signup',
];

const mapsOfPathsWithoutRedirect = ['/', '/signup', '/reset-password'];

function Auth(props) {
  const { children } = props;

  const pathname = usePathname();
  console.log('pathname', pathname);

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
  if (
    !isLogin &&
    !(mapsOfPathsWithoutRedirect.includes(pathname) || pathname.includes('/reset-password/'))
  )
    return redirect('/');

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
