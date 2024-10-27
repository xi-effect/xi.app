'use client';

import * as React from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@xipkg/sheet';
import { Close } from '@xipkg/icons';

type SettingsPropsT = {
  children: React.ReactNode;
};

export const Settings = ({ children }: SettingsPropsT) => {
  console.log('');

  return (
    <Sheet>
      <SheetTrigger className="ml-2 bg-transparent">{children}</SheetTrigger>
      <SheetContent className="bg-gray-100">
        <SheetHeader className="flex flex-row justify-between">
          <SheetTitle className="text-gray-0">Настройки</SheetTitle>
          <SheetClose className="bg-transparent">
            <Close className="fill-gray-0" />
          </SheetClose>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
