'use client';

import { ThemeProvider } from 'next-themes';
import { ThemeRegistry } from 'pkg.theme';
import { LoadingSpinner } from 'pkg.spinner';
import { useMainSt } from 'store';
import { useEffect } from 'react';

export function Providers({ main, auth }) {
  const [isLogin, getUser] = useMainSt((state) => [state.isLogin, state.getUser]);

  useEffect(() => {
    console.log('isLogin in useEffect is', isLogin);
    getUser();
  }, []);

  const getRoute = () => {
    if (isLogin === null) return <LoadingSpinner />;
    if (isLogin === true) return main;
    return auth;
  };

  return (
    <ThemeRegistry mode="light">
      <ThemeProvider>{getRoute()}</ThemeProvider>
    </ThemeRegistry>
  );
}
