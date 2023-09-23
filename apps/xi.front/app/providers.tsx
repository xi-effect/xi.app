'use client';

import { ThemeProvider } from 'next-themes';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useMainSt } from 'store';
import { Navigation } from 'pkg.navigation';
import Image from 'next/image';

const Loading = () => (
  <div>
    <h2> Loading </h2>
  </div>
);

function Auth(props) {
  const { children } = props;

  const isLogin = useMainSt((state) => state.isLogin);
  const getUser = useMainSt((state) => state.getUser);

  const router = useRouter();
  const redirectFn = (url: string) => router.push(url);

  useEffect(() => {
    getUser(redirectFn);
  }, []);

  console.log('isLogin', isLogin);

  if (isLogin === null) return <Loading />;

  if (isLogin)
    return (
      <>
        <Navigation
          logo={
            <Image
              src="./assets/brand/navigationlogo.svg"
              alt="xieffect logo"
              width={134}
              height={16}
            />
          }
        >
          {children}
        </Navigation>
      </>
    );

  return children;
}

export function Providers(props) {
  const { children } = props;

  return (
    <>
      <ThemeProvider forcedTheme="light" attribute="data-theme">
        <Auth>{children}</Auth>
      </ThemeProvider>
    </>
  );
}
