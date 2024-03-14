import React, { ChangeEvent, useRef } from 'react';
import { Camera, Edit, Trash } from '@xipkg/icons';
import { AvatarEditor } from 'pkg.avatar.editor';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import Image from 'next/image';
import { del } from 'pkg.utils/fetch';
import { toast } from 'sonner';
import { useMainSt } from 'pkg.stores';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';

const readFile = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

type UserPreviewPropsT = {
  className?: string;
};

export const UserPreview = ({ className = '' }: UserPreviewPropsT) => {
  const user = useMainSt((state) => state.user);

  const [isAvatarOpen, setIsAvatarOpen] = React.useState(false);
  const [file, setFile] = React.useState<any>();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleMenuEditClick = () => {
    inputRef.current?.click();
  };

  const handleDeleteAvatar = async () => {
    const { data, status } = await del({
      service: 'auth',
      path: '/api/users/current/avatar/',
      config: {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    });

    if (status === 204) {
      toast('Аватарка удалена. Скоро она исчезнет с сайта');
    }
  };

  const handleInput = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    let imageDataUrl = await readFile(event.target.files[0]);

    setFile(imageDataUrl);
    setIsAvatarOpen(true);
  };

  return (
    <div className={`border-gray-80 flex h-[120px] w-full rounded-2xl border p-6 ${className}`}>
      <AvatarEditor file={file} open={isAvatarOpen} onOpenChange={setIsAvatarOpen} />
      <input className="hidden" ref={inputRef} onChange={handleInput} type="file" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar size="xl">
            <AvatarImage
              src={`https://auth.xieffect.ru/api/users/${user.id}/avatar.webp`}
              imageProps={{
                src: `https://auth.xieffect.ru/api/users/${user.id}/avatar.webp`,
                alt: 'user avatar',
              }}
              alt="user avatar"
            />
            <AvatarFallback className='"bg-gray-5 rounded-[36px]" flex h-[64px] w-[64px] cursor-pointer place-items-center justify-center'>
              <Camera size="l" className="fill-gray-60" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[220px]">
          <DropdownMenuItem onClick={handleMenuEditClick}>
            <Edit className="mr-2 h-5 w-5" />
            <span>Обновить фотографию</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteAvatar}>
            <Trash className="mr-2 h-5 w-5" />
            <span>Удалить</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="ml-4 flex flex-col justify-center gap-0.5">
        <span className="text-2xl font-semibold leading-[32px]">{user.displayName}</span>
        <span className="text-gray-80 text-[16px] leading-[22px]">{user.username}</span>
      </div>
    </div>
  );
};
