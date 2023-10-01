import '@xipkg/tailwind/index.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import React, { ReactNode } from 'react';

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'xi.effect',
  description: 'Гибкий образовательный инструмент для репетиторов и малого бизнеса',
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
    'app'
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
      <body>
        <Providers>
          <div className="flex flex-row w-full min-h-screen h-full">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
