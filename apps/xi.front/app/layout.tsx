import '@xipkg/tailwind/index.css';

import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { ReactNode } from 'react';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({
  auth,
  main,
}: {
  auth: ReactNode;
  main: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Providers auth={auth} main={main} />
      </body>
    </html>
  );
}
