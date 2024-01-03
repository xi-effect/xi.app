import { Button } from '@xipkg/button';
import { Camera } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';
import React from 'react';
import { useMedia } from 'pkg.utils';

export const PersonalData = () => {
  const isMobile = useMedia('(max-width: 719px)');

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Личные данные</span>}
      <div className="h-[120px] w-full p-6 border border-gray-80 rounded-2xl flex sm:mt-4">
        <button className="h-[72px] w-[72px] rounded-[36px] bg-gray-5 flex justify-center place-items-center">
          <Camera size="l" className="fill-gray-60" />
        </button>
        <div className="flex flex-col justify-center gap-0.5 ml-4">
          <span className="text-2xl font-semibold leading-[32px]">Анна Иванова</span>
          <span className="text-[16px] leading-[22px] text-gray-80">ivanova.a</span>
        </div>
      </div>
      <div className="w-full mt-8 p-6 border border-gray-80 rounded-2xl flex flex-col">
        <div className="w-full flex gap-8">
          <div className="w-full">
            <Label className="">Отображаемое имя</Label>
            <Input className="w-full mt-2" />
          </div>
          <div className="w-full">
            <Label>Никнейм</Label>
            <Input className="w-full mt-2" />
          </div>
        </div>
        <div className="mt-8">
          <Button size="l"> Сохранить </Button>
        </div>
      </div>
    </>
  );
};
