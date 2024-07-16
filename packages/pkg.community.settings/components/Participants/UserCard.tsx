import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import { Close, Crown } from '@xipkg/icons';
import { Button } from '@xipkg/button';
import { UserCardPropsT } from './types';

export const UserCard = ({ user, handleUserDelete, isOwner }: UserCardPropsT) => (
  <li className="border-gray-30 flex rounded-lg border p-4 md:items-center">
    <div className="flex flex-col gap-2 md:flex-row md:gap-8">
      <div className="flex items-center self-start">
        <Avatar size="s">
          <AvatarImage
            src="https://auth.xieffect.ru/api/users/3/avatar.webp"
            imageProps={{ src: 'https://auth.xieffect.ru/api/users/3/avatar.webp', alt: '@shadcn' }}
            alt="@shadcn"
          />
          <AvatarFallback size="s">CN</AvatarFallback>
        </Avatar>
        <div className="ml-2">
          <p className="text-nowrap text-base font-medium text-gray-100">{user.display_name}</p>
          <p className="text-gray-60 text-nowrap text-xs font-normal">{user.username}</p>
        </div>
        {isOwner && <Crown className="!size-3 self-start" />}
      </div>
    </div>
    {!isOwner && (
      <Button
        className="focus:bg-red-80 hover:bg-red-80 group ml-auto h-6 w-6 bg-transparent p-1"
        onClick={() => handleUserDelete(user)}
      >
        <Close className="group-hover:fill-gray-0 group-focus:fill-gray-0 size-4" />
      </Button>
    )}
  </li>
);
