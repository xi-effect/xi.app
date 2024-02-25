import React from 'react';
import { Button } from '@xipkg/button';
import { Camera, ChevronRight, Key, Mail } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';
import { useMedia } from 'pkg.utils';

export const Secure = () => {
  const isMobile = useMedia('(max-width: 719px)');

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Безопасность</span>}
      <div className="border-gray-80 flex w-full flex-col rounded-2xl border p-1 sm:mt-4">
        <div className="flex w-full flex-col p-3">
          <span className="text-xl font-semibold">Данные аккаунта</span>
          <span className="text-sm font-normal">Видны только вам</span>
        </div>
        <button className="flex-r ow hover:bg-gray-5 mt-   flex h-[66px] items-center gap-4 rounded-xl bg-transparent p-3">
          <Key size="l" className="fill-brand-80" />
          <div className="items-star flex flex-col">
            <span className="w-fit font-semibold">Пароль</span>
            <span className="text-xs font-normal">Обновлён год назад</span>
          </div>
          <ChevronRight className="fill-gray-80 ml-auto" />
        </button>
        <button className="hover:bg-gray-5 flex h-[66px] flex-row items-center gap-4 rounded-xl bg-transparent p-3">
          <Mail size="l" className="fill-brand-80" />
          <div className="items-star flex flex-col">
            <span className="w-fit font-semibold">Почта</span>
            <span className="text-xs font-normal">ivanova.a@ikovylyaev.com</span>
          </div>
          <ChevronRight className="fill-gray-80 ml-auto" />
        </button>
      </div>
    </>
  );
};
