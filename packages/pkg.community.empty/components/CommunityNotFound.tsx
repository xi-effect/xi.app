'use client';

import React from 'react';
import { Button } from '@xipkg/button';
import { Mail, Plus } from '@xipkg/icons';
import { Logo } from 'pkg.logo';
import { StageType } from '../EmptyCommunity';

type CommunityNotFoundPropsT = {
  setStage: (stage: React.SetStateAction<StageType>) => void;
  tab: number;
  setTab: (tab: React.SetStateAction<number>) => void;
};

export default function CommunityNotFound({ setStage, tab, setTab }: CommunityNotFoundPropsT) {
  const handleNext = () => {
    if (tab === 0) {
      setStage('create');
      return;
    }
    if (tab === 1) {
      setStage('join');
    }
  };

  return (
    <div className="flex h-full w-full content-center justify-center p-8">
      <div className="xs:p-8 flex h-full w-full max-w-[536px] flex-col">
        <div className="h-22">
          <Logo height={24} width={202} logoVariant="navigation" logoSize="default" />
        </div>
        <div className="mt-16 flex w-full flex-row items-start justify-between gap-4">
          <div className="bg-brand-80 h-1.5 w-1/2 rounded" />
          <div className="bg-gray-10 h-1.5 w-1/2 rounded" />
        </div>
        <div id="title" className="mt-8 text-2xl font-semibold leading-[32px] text-gray-100">
          Сообщество
        </div>
        <div className="mt-8 leading-[22px] text-gray-100">
          Сообщества — основная часть нашего приложения. Вся ваша работа будет связана с ними.
          В дальнейшем вы сможете создать ещё неограниченное число сообществ, а пока выберите,
          что хотите сделать
        </div>
        <div className="border-gray-30 bg-gray-0 relative mt-6 flex w-full flex-col items-start rounded-2xl border">
          <div
            className={`absolute ${
              tab === 1
                ? 'top-[108px] h-[108px] [@media_(min-width:357px)]:h-[86px] [@media_(min-width:400px)]:top-[86px]'
                : 'top-0 h-[108px] [@media_(min-width:400px)]:h-[86px]'
            } border-brand-100 bg-brand-0 ml-0 flex w-full flex-row items-start justify-start gap-2 rounded-2xl border border-solid p-4 transition-all duration-300 ease-in`}
          />
          <button
            type="button"
            onClick={() => setTab(0)}
            className="ml-0 flex w-full flex-row items-start justify-start gap-2 bg-transparent p-4"
          >
            <Plus className={`z-10 mt-0.5 ${tab === 0 ? 'fill-brand-100' : 'fill-gray-80'}`} />
            <div className="flex flex-col gap-1 text-start">
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
            type="button"
            onClick={() => setTab(1)}
            className="ml-0 flex w-full flex-row items-start justify-start gap-2 bg-transparent p-4"
          >
            <Mail className={`z-10 mt-0.5 ${tab === 1 ? 'fill-brand-100' : 'fill-gray-80'}`} />
            <div className="flex flex-col gap-1 text-start">
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
        <div className="mt-auto flex flex-row gap-6 pt-6">
          <Button onClick={handleNext} className="w-full">
            Продолжить
          </Button>
        </div>
      </div>
    </div>
  );
}
