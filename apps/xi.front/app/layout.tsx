import '@xipkg/tailwind/index.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { ReactNode } from 'react';
import Script from 'next/script';
import { Providers } from './providers';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'xi.effect',
  description:
    'Приложение для репетиторов и малого бизнеса, всё необходимое для учёбы в одном месте',
  manifest: '/manifest.webmanifest',
  keywords: [
    'xi.effect',
    'кси эффект',
    'эффект',
    'стартап',
    'образование',
    'репетитору',
    'инструмент',
    'бизнес',
    'онлайн',
    'приложение',
    'app',
  ],
  icons: {
    icon: [
      { url: './favicon-for-light.svg' },
      { url: './favicon-for-dark.svg', media: '(prefers-color-scheme: dark)' },
    ],
    apple: ['./assets/icons/apple-touch-icon.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="overflow-hidden xs:overflow-x-hidden bg-gray-0">
        <Script
          async
          defer
          data-website-id="484fa2fe-898c-4ffa-8bbb-e0a2afe4e018"
          src="https://analytics.xieffect.ru/umami.js"
        />
        <Providers>
          <div className="flex flex-row w-full min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
