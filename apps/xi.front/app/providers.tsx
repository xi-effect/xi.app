'use client';

import { ThemeProvider } from 'next-themes';
import React, { useEffect } from 'react';
import { useMainSt } from 'store';
import { Navigation } from 'pkg.navigation';
import { SkeletonMainLayout } from 'pkg.navigation.skeleton';
import { Toaster } from 'sonner';

function Auth(props) {
  const { children } = props;

  const isLogin = useMainSt((state) => state.isLogin);
  const getUser = useMainSt((state) => state.getUser);

  useEffect(() => {
    getUser();
  }, []);

  console.log('isLogin', isLogin);

  if (isLogin === null) return <SkeletonMainLayout />;

  if (isLogin)
    return (
      <>
        <Navigation>{children}</Navigation>
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
