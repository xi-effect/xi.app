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
          <div
            id="ActionsRoot"
            className="border-solid border-[#b8b8b8] bg-white flex flex-col pb-4 gap-4 w-full items-start border rounded-lg"
          >
            <div className="border-solid border-[#3546bd] bg-[#edefff] flex flex-col justify-center ml-0 pl-4 gap-1 w-full h-20 items-start border rounded-lg">
              <div className="flex flex-row gap-4 w-1/5 items-start">
                <Plus />
                <div className="text-xl font-medium leading-[28px] text-[#3546bd]">Создать</div>
              </div>
              <div className="leading-[22px] text-[#3546bd] ml-10">
                Новое сообщество под ваши задачи
              </div>
            </div>
            <div className="flex flex-row ml-4 gap-4 w-1/2 items-start">
              <div className="flex flex-col gap-1 w-5/6  items-start">
                <Mail />
                <div className="text-xl font-medium leading-[28px] text-[#404040]">
                  Присоединиться
                </div>
                <div className="leading-[22px] text-[#404040]">Если есть ссылка-приглашение</div>
              </div>
            </div>
          </div>
          <div className="pt-4 mt-auto flex flex-row gap-6">
            <Button onClick={handleNext} variant="ghost" className="w-[98px]">
              Назад
            </Button>
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
