import { Palette } from '@xipkg/icons';
import React from 'react';
import { useMedia } from 'pkg.utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@xipkg/select';
import { useTheme } from 'next-themes';

export const Customization = () => {
  const isMobile = useMedia('(max-width: 719px)');
  const { theme, setTheme } = useTheme();

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Персонализация</span>}
      <div className="flex flex-col w-full p-1 border border-gray-80 rounded-2xl sm:mt-4">
        <div className="flex flex-col w-full p-3">
          <span className="text-xl font-semibold">Внешний вид</span>
        </div>
        <div className="flex flex-row w-full p-3 gap-4 mt-2">
          <Palette className="fill-brand-80" />
          <span className="text-base leading-[24px] font-semibold">Тема оформления</span>
          <Select value={theme} onValueChange={(value) => setTheme(value)}>
            <SelectTrigger className="w-[250px] ml-auto">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">Светлая</SelectItem>
                <SelectItem value="dark">Тёмная</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
