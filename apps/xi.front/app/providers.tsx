'use client';

import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react';
import { useMainSt } from 'store';
import { Navigation } from 'pkg.navigation';
import { SkeletonMainLayout } from 'pkg.navigation.skeleton';
import { Toaster } from 'sonner';
import { redirect, usePathname, useRouter } from 'next/navigation';

const mapsOfPathsWithoutNav = [
  '/welcome/community',
  '/welcome/community-create',
  '/welcome/community-invite',
  '/welcome/final',
  '/welcome/user-info',
];

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

  if (isLogin === null) return <SkeletonMainLayout />;

  if (isLogin && mapsOfPathsWithoutNav.includes(pathname)) return children;

  if (!isLogin && pathname !== '/') return redirect('/');

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
      <ThemeProvider forcedTheme="light" attribute="data-theme">
        <Toaster />
        <Auth>{children}</Auth>
      </ThemeProvider>
    </>
  );
}
