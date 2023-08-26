import '@xipkg/tailwind/index.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode, useMemo } from 'react';
import { Providers } from './providers';
import React from 'react';
import { useTheme } from 'next-themes';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: './favicon-for-light.svg' },
      { url: './favicon-for-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
