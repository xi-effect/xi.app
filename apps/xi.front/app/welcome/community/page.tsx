'use client';

import { Button } from '@xipkg/button';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useMedia } from 'pkg.utils';
import { Plus, Mail } from '@xipkg/icons';

export default function WelcomeCommunity() {
  const isMobile = useMedia('(max-width: 960px)');

  const router = useRouter();

  const [tab, setTab] = React.useState(0);

  const handleNext = () => {
    if (tab === 0) router.push('/welcome/community-create');
    if (tab === 1) router.push('/welcome/community-invite');
  };

  const handleBack = () => {
    router.push('/welcome/user-info');
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
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
            <div className="bg-gray-10 w-1/4 h-1.5 rounded" />
          </div>
          <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
            Сообщество
          </div>
          <div className="leading-[22px] text-gray-100 mt-8">
            Сообщества — основная часть нашего приложения. Вся ваша работа будет связана с ними.
            В дальнейшем вы сможете создать ещё неограниченное число сообществ, а пока выберите,
            что хотите сделать
          </div>
          <div className="relative mt-6 border border-gray-30 bg-gray-0 flex flex-col w-full items-start rounded-2xl">
            <div
              className={`h-[86px] absolute ${
                tab === 1 ? 'top-[86px]' : 'top-0'
              } border-solid border-brand-100 bg-brand-0 flex flex-row justify-start ml-0 p-4 gap-2 w-full items-start border rounded-2xl transition-all ease-in duration-300`}
            ></div>
            <button
              onClick={() => setTab(0)}
              className="bg-transparent flex flex-row justify-start ml-0 p-4 gap-2 w-full items-start"
            >
              <Plus className={`z-10 mt-0.5 ${tab === 0 ? 'fill-brand-100' : 'fill-gray-80'}`} />
              <div className="flex flex-col gap-1 items-start">
                <span
                  className={`z-10 text-xl font-medium leading-[28px] ${
                    tab === 0 ? 'text-brand-100' : 'text-gray-80'
                  }`}
                >
                  Создать
                </span>
                <span
                  className={`z-10 leading-[22px] ${tab === 0 ? 'text-brand-100' : 'text-gray-80'}`}
                >
                  Новое сообщество под ваши задачи
                </span>
              </div>
            </button>
            <button
              onClick={() => setTab(1)}
              className="bg-transparent flex flex-row justify-start ml-0 p-4 gap-2 w-full items-start"
            >
              <Mail className={`z-10 mt-0.5 ${tab === 1 ? 'fill-brand-100' : 'fill-gray-80'}`} />
              <div className="flex flex-col gap-1 items-start">
                <span
                  className={`z-10 text-xl font-medium leading-[28px] ${
                    tab === 1 ? 'text-brand-100' : 'text-gray-80'
                  }`}
                >
                  Присоединиться
                </span>
                <span
                  className={`z-10 leading-[22px] ${tab === 1 ? 'text-brand-100' : 'text-gray-80'}`}
                >
                  Если есть ссылка-приглашение
                </span>
              </div>
            </button>
          </div>
          <div className="pt-4 mt-auto flex flex-row gap-6">
            <Button onClick={handleBack} variant="ghost" className="w-[98px]">
              Назад
            </Button>
            <Button onClick={handleNext} className="w-full">
              Продолжить
            </Button>
          </div>
        </div>
      </div>
      {!isMobile && <div className="w-full m-w-[856px] bg-gray-5">1</div>}
    </div>
  );
}
