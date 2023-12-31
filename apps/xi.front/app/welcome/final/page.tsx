'use client';

import { Button } from '@xipkg/button';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMedia } from 'pkg.utils';

export default function WelcomeFinal() {
  const isMobile = useMedia('(max-width: 960px)');

  const router = useRouter();

  const handleNext = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-row justify-center content-center w-screen h-screen">
      <div className="h-full w-full p-8 flex justify-center content-center">
        <div className="flex flex-col h-full xs:p-8 w-full max-w-[536px]">
          <div className="h-22">
            <Image
              height={24}
              width={202}
              alt="xieffect logo"
              src="/assets/brand/navigationlogo.svg"
            />
          </div>
          <div className="mt-16 flex flex-row justify-between w-full items-start gap-4">
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
            <div className="bg-brand-80 w-1/4 h-1.5 rounded" />
          </div>
          <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
            Добро пожаловать!
          </div>
          <Link
            href="/?show-tour=true"
            className="mt-8 border-solid border-gray-20 flex flex-col justify-center p-4 gap-1 w-full items-start border rounded-2xl cursor-pointer"
          >
            <div className="text-xl font-medium leading-[28px] text-gray-80">
              Посмотреть тур по продукту
            </div>
            <div className="leading-[22px] text-gray-80">
              Ознакомьтесь с основными функциями продукта
            </div>
          </Link>
          <a
            target="_blank"
            href="https://xieffect.ru/"
            className="mt-4 border-solid border-gray-20 flex flex-col justify-center p-4 gap-1 w-full items-start border rounded-2xl cursor-pointer"
          >
            <div className="text-xl font-medium leading-[28px] text-gray-80">Почитать справку</div>
            <div className="leading-[22px] text-gray-80">
              Рассказываем о сервисе понятным языком
            </div>
          </a>
          <div className="pt-4 mt-auto">
            <Button onClick={handleNext} className="w-full">
              Начать работать
            </Button>
          </div>
        </div>
      </div>
      {!isMobile && <div className="w-full m-w-[856px] bg-gray-5">1</div>}
    </div>
  );
}
