'use client';

import { getInitColorSchemeScript } from '@mui/material/styles';
import { ThemeProvider } from 'next-themes';
import { ThemeRegistry } from '@xipkg/mui';
import { useMainSt } from 'store';
import { useEffect } from 'react';
import React from 'react';

export function Providers({ children }) {
  const [isLogin, getUser] = useMainSt((state) => [state.isLogin, state.getUser]);

  useEffect(() => {
    console.log('isLogin in useEffect is', isLogin);
    getUser();
  }, []);

  // const getRoute = () => {
  //   if (isLogin === null) return <LoadingSpinner />;
  //   if (isLogin === true) return main;
  //   return auth;
  // };

  return (
    <>
      {getInitColorSchemeScript()}
      <ThemeProvider attribute="data-mui-color-scheme">
        <ThemeRegistry options={{ key: 'mui' }}>{children}</ThemeRegistry>
      </ThemeProvider>
    </>
  );
}
