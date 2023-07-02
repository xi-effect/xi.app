'use client';

import './globals.css';

import { Inter } from 'next/font/google';

import { ReactNode, useEffect } from 'react';
import { ThemeRegistry } from 'pkg.theme';
import { useMainSt } from 'store';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

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
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <ThemeRegistry mode="light">
          <div className="w-screen h-screen">{getRoute()}</div>
        </ThemeRegistry>
      </body>
    </html>
  );
}
