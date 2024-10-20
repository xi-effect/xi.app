import { Button } from '@xipkg/button';
import { Clip, Emotions, File, Image, MenuDots, Movie, Send } from '@xipkg/icons';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

export const SmartInput = () => {
  console.log('smart input');

  return (
    <div className="bg-gray-0 relative bottom-0 flex h-[80px] w-full p-4">
      <div className="flex w-full items-center space-x-4 rounded-lg border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button variant="ghost" size="m" type="button" className="h-auto p-2">
              <Clip size="m" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[150px]">
            <DropdownMenuItem>
              <Image className="mr-2 h-5 w-5" />
              <span className="text-[14px]">Изображение</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Movie className="mr-2 h-5 w-5" />
              <span className="text-[14px]">Видео</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <File className="mr-2 h-5 w-5" />
              <span className="text-[14px]">Файл</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <input type="text" placeholder="Напишите что-нибудь..." className="broder-0 w-full grow" />

        <Emotions size="m" className="cursor-pointer" onClick={() => console.log('emotions')} />
      </div>
      <Button
        type="button"
        className="flex h-12 w-12 items-center rounded-lg bg-[#445AFF] p-4 text-white"
      >
        <Send size="m" color="white" className="!important fill-white" />
      </Button>
      <div className="absolute flex">
        <MenuDots className="mr-2 h-5 w-5" />
        <span className="text-[14px]">печатает ...</span>
      </div>
    </div>
  );
};
