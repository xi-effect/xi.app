'use client';

import { Button } from '@xipkg/button';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from 'pkg.logo';

export default function WelcomeFinal() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/community/1/home');
  };

  return (
    <div className="flex flex-row justify-center content-center w-screen h-[100dvh] xs:h-screen">
      <div className="h-full w-full p-8 flex justify-center content-center">
        <div className="flex flex-col h-full xs:p-8 w-full max-w-[536px]">
          <div className="h-22">
            <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
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
            href="/community/1/home/?show-tour=true"
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
            rel="noreferrer"
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
      <div className="hidden md:flex w-full m-w-[856px] bg-gray-5">
        <div className="pt-16 pl-16 h-full w-full relative">
          <div className="absolute h-[calc(100vh-64px)] w-full">
            <Image
              style={{
                objectFit: 'cover',
                objectPosition: 'left',
              }}
              alt="interface example"
              src="/assets/welcome/final.png"
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
