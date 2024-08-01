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
  <main className="3xl:px-[360px] px-8 flex h-[100dvh] w-full md:px-[60px] lg:px-[120px] flex flex-col justify-between overflow-y-scroll gap-8">
    <div className="min-h-[44px] h-[88px] xl:h-[132px] xl:min-h-[52px] flex items-end">
      <Image
        width={201}
        height={24}
        className="xl:h-[32px] xl:w-[269px] block dark:hidden"
        src="/assets/brand/navigationlogo-default-light.svg"
        alt="logo"
      />
      <Image
        width={201}
        height={24}
        className="xl:h-[32px] xl:w-[269px] hidden dark:block"
        src="/assets/brand/navigationlogo-default-dark.svg"
        alt="logo"
      />
    </div>
    <div className="flex flex-col justify-center">
      <span className="flex flex-col-reverse sm:flex-row sm:gap-1">
        <h1 className="text-gray-90 mb-4 text-h3 font-bold sm:text-h2 xl:text-[64px] xl:leading-[78px]">
          {title}
        </h1>
        <span className="text-gray-30 text-h6 font-bold xl:text-h3">{errorCode}</span>
      </span>
      <p className="text-gray-90 mb-16 text-l-base font-normal sm:text-xl-base xl:text-[30px]">
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
    <div className="min-h-[44px] h-[88px] xl:h-[132px] xl:min-h-[52px]" />
  </main>
);
