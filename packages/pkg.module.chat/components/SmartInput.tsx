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
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer" asChild>
          <Button
            variant="ghost"
            size="m"
            type="button"
            className="absolute left-[22px] top-[22px] h-auto p-2"
          >
            <Clip size="m" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[150px]">
          <DropdownMenuItem>
            <Image className="mr-2 h-5 w-5" />
            <span className="text-sm">Изображение</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Movie className="mr-2 h-5 w-5" />
            <span className="text-sm">Видео</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <File className="mr-2 h-5 w-5" />
            <span className="text-sm">Файл</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        type="text"
        placeholder="Напишите что-нибудь..."
        className="mr-2 w-full rounded-lg border p-2 pl-12"
      />

      <Button
        variant="ghost"
        size="m"
        type="button"
        className="absolute right-20 top-5 h-auto p-2"
        onClick={() => console.log('emotions')}
      >
        <Emotions size="m" />
      </Button>

      <Button variant="default" size="m" type="button" className="bg-[#445AFF] pb-0">
        <Send size="m" className="fill-white" />
      </Button>

      <div className="invisible absolute flex">
        <MenuDots className="mr-2 h-5 w-5" />
        <span className="text-[14px]">печатает ...</span>
      </div>
    </div>
  );
};
