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
      <div className="flex flex-col w-full p-1 border border-gray-80 rounded-2xl sm:mt-4">
        <div className="flex flex-col w-full p-3">
          <span className="text-xl font-semibold">Данные аккаунта</span>
          <span className="text-sm font-normal">Видны только вам</span>
        </div>
        <button className="flex h-[66px] gap-4 flex-r   ow items-center p-3 bg-transparent hover:bg-gray-5 rounded-xl mt-">
          <Key size="l" className="fill-brand-80" />
          <div className="flex flex-col items-star">
            <span className="font-semibold w-fit">Пароль</span>
            <span className="text-xs font-normal">Обновлён год назад</span>
          </div>
          <ChevronRight className="ml-auto fill-gray-80" />
        </button>
        <button className="flex h-[66px] gap-4 flex-row items-center p-3 bg-transparent hover:bg-gray-5 rounded-xl">
          <Mail size="l" className="fill-brand-80" />
          <div className="flex flex-col items-star">
            <span className="font-semibold w-fit">Почта</span>
            <span className="text-xs font-normal">ivanova.a@ikovylyaev.com</span>
          </div>
          <ChevronRight className="ml-auto fill-gray-80" />
        </button>
      </div>
    </>
  );
};
