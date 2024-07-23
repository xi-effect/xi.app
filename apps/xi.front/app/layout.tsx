import '@xipkg/tailwind/index.css';

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React, { ReactNode, Suspense } from 'react';
import Script from 'next/script';
import localFont from 'next/font/local';
import { Providers } from './providers';
import YandexMetrika from './metrika';

const markerHand = localFont({
  src: '../public/fonts/MarkerHand-Regular.woff2',
  display: 'swap',
  variable: '--font-marker-hand',
});

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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${markerHand.variable} text-[16px]`}>
      <body className="overflow-hidden bg-gray-0">
        {process.env.NODE_ENV === 'production' &&
          <>
            <Script id="metrika-counter" strategy="afterInteractive">
              {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
 
              ym("97825173", "init", {
                    defer: true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true,
                    webvisor:true
              });`}
            </Script>
            <Suspense>
              <YandexMetrika />
            </Suspense>
            <Script
              async
              defer
              data-website-id="484fa2fe-898c-4ffa-8bbb-e0a2afe4e018"
              src="https://analytics.xieffect.ru/umami.js"
            />
          </>
        }
        <Providers>
          <div className="flex flex-row w-full min-h-screen">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
