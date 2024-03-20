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
  const isMobile = useMedia('(max-width: 719px)', false);
  const { theme, setTheme } = useTheme();

  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Персонализация</span>}
      <div className="border-gray-80 flex w-full flex-col rounded-2xl border p-1 sm:mt-4">
        <div className="flex w-full flex-col p-3">
          <span className="text-xl font-semibold">Внешний вид</span>
        </div>
        <div className="mt-2 flex justify-center items-start w-full flex-col gap-4 p-3 sm:flex-row sm:items-center">
          <div className="flex flex-row gap-4">
            <Palette className="fill-brand-80" />
            <span className="text-base font-semibold leading-[24px]">Тема оформления</span>
          </div>
          <Select value={theme} onValueChange={(value) => setTheme(value)}>
            <SelectTrigger className="ml-0 sm:ml-auto w-[250px]">
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
