import { Button } from '@xipkg/button';
import { Palette } from '@xipkg/icons';
import { Input } from '@xipkg/input';
import { Label } from '@xipkg/label';
import React from 'react';
import { useMedia } from 'pkg.utils';

export const Customization = () => {
  const isMobile = useMedia('(max-width: 719px)');

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Персонализация</span>}
      <div className="flex flex-col w-full p-1 border border-gray-80 rounded-2xl sm:mt-4">
        <div className="flex flex-col w-full p-3">
          <span className="text-xl font-semibold">Внешний вид</span>
        </div>
        <div className="flex flex-row w-full p-3 gap-4 mt-2">
          <Palette className='fill-brand-80' />
          <span className="text-base leading-[24px] font-semibold">Тема оформления</span>
        </div>
      </div>
    </>
  );
};
