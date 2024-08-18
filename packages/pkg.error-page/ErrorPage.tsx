'use client';

import React from 'react';
import { Link } from '@xipkg/link';
import { TelegramFilled, MailRounded } from '@xipkg/icons';
import Image from 'next/image';

export type ErrorPagePropsT = {
  title: string;
  errorCode: number;
  text: string;
  children?: React.ReactNode;
};

export const ErrorPage = ({ title, errorCode, text, children }: ErrorPagePropsT) => (
  <main className="3xl:px-[360px] flex h-[100dvh] w-full flex-col justify-between gap-8 overflow-y-scroll px-8 md:px-[60px] lg:px-[120px]">
    <div className="flex h-[88px] min-h-[44px] items-end xl:h-[132px] xl:min-h-[52px]">
      <Image
        width={201}
        height={24}
        className="block xl:h-[32px] xl:w-[269px] dark:hidden"
        src="/assets/brand/navigationlogo-default-light.svg"
        alt="logo"
      />
      <Image
        width={201}
        height={24}
        className="hidden xl:h-[32px] xl:w-[269px] dark:block"
        src="/assets/brand/navigationlogo-default-dark.svg"
        alt="logo"
      />
    </div>
    <div className="flex flex-col justify-center">
      <span className="flex flex-col-reverse sm:flex-row sm:gap-1">
        <h1 className="text-gray-90 text-h3 sm:text-h2 mb-4 font-bold xl:text-[64px] xl:leading-[78px]">
          {title}
        </h1>
        <span className="text-gray-30 text-h6 xl:text-h3 font-bold">{errorCode}</span>
      </span>
      <p className="text-gray-90 text-l-base sm:text-xl-base mb-16 font-normal xl:text-[30px]">
        {text}
      </p>
      <p className="text-gray-80 text-m-base">
        Если ошибка повторяется — напишите <span className="hidden sm:inline">нам об этом</span>
        <span className="flex flex-col sm:flex-row">
          <span className="flex items-center">
            в&nbsp;
            <TelegramFilled size="s" className="fill-brand-80 mr-1" />
            <Link theme="brand" size="l" href="https://t.me/xieffect_support_bot" target="_blank">
              чат Telegram
            </Link>
          </span>
          <span className="flex items-center">
            &nbsp;или&nbsp;
            <MailRounded size="s" className="fill-brand-80 mr-1" />
            <Link theme="brand" size="l" href="mailto:hello@xieffect.ru">
              на электронную почту
            </Link>
          </span>
        </span>
      </p>
      <div className="text-gray-80 mt-[64px] text-[16px]">{children}</div>
    </div>
    <div className="h-[88px] min-h-[44px] xl:h-[132px] xl:min-h-[52px]" />
  </main>
);
