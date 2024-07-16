'use client';

import React from 'react';
import { Link } from '@xipkg/link';
import { TelegramFilled, MailRounded } from '@xipkg/icons';
import { Logo } from 'pkg.logo';

export type ErrorPagePropsT = {
  title: string;
  errorCode: number;
  text: string;
  children?: React.ReactNode;
};

export const ErrorPage = ({ title, errorCode, text, children }: ErrorPagePropsT) => (
  <main className="3xl:mx-[360px] mx-8 flex h-[100vh] md:mx-[60px] lg:mx-[120px]">
    <div className="absolute top-[64px] xl:top-[100px]">
      <Logo
        logoVariant="navigation"
        logoSize="default"
        width={201}
        height={24}
        className="xl:h-[32px] xl:w-[269px]"
      />
    </div>
    <div className="flex flex-col justify-center">
      <span className="flex flex-col-reverse sm:flex-row sm:gap-1">
        <h1 className="text-gray-90 mb-4 text-[40px] font-bold sm:text-[48px] xl:text-[64px]">
          {title}
        </h1>
        <span className="text-gray-30 text-[28px] font-bold xl:text-[40px]">{errorCode}</span>
      </span>
      <p className="text-gray-90 mb-16 text-[20px] font-normal sm:text-[24px] xl:text-[30px]">
        {text}
      </p>
      <p className="text-gray-80 text-[16px]">
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
  </main>
);
