'use client';

import { Toaster } from 'sonner';
import { ThemeProvider } from 'next-themes';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useMainSt } from 'store';
import { Navigation } from 'pkg.navigation';
import Image from 'next/image';
// import { SkeletonMainLayout } from 'pkg.navigation.skeleton';

function Auth(props) {
  const { children } = props;

  // const isLogin = useMainSt((state) => state.isLogin);
  // const getUser = useMainSt((state) => state.getUser);

  // const router = useRouter();
  // const pathname = usePathname();

  // const redirectFn = (url: string) => {
  //   if (
  //     pathname.includes('/reset-password') ||
  //     pathname.includes('/confirm-email') ||
  //     pathname.includes('/signup')
  //   )
  //     return null;
  //   router.push(url);
  // };

  // useEffect(() => {
  //   getUser(redirectFn);
  // }, []);

  // console.log('isLogin', isLogin);

  // if (isLogin)
  //   return (
  //     <>
  //       <Navigation
  //         logo={
  //           <Image
  //             src="./assets/brand/navigationlogo.svg"
  //             alt="xieffect logo"
  //             width={134}
  //             height={16}
  //           />
  //         }
  //       >
  //         {children}
  //       </Navigation>
  //     </>
  //   );

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
