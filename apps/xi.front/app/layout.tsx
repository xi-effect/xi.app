'use client';

import './globals.css';

import { ReactNode, useEffect } from 'react';
import { ThemeRegistry } from 'pkg.theme';
import { useMainSt } from 'store';

export default function RootLayout({ auth, main }: { auth: ReactNode; main: ReactNode }) {
  const [isLogin, getUser] = useMainSt((state) => [state.isLogin, state.getUser]); //

  useEffect(() => {
    console.log('isLogin in useEffect is', isLogin);
    getUser();
  }, []);

  const getRoute = () => {
    if (isLogin === null) return <h1> Loading </h1>;
    if (isLogin === true) return main;
    return auth;
  };

  return (
    <html lang="en">
      <body>
        <ThemeRegistry mode="light">
          <div className="w-screen h-screen">{getRoute()}</div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
