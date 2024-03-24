import { useState } from 'react';

import { useMedia } from 'pkg.utils';

import { Badge } from '@xipkg/badge';
import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { Avatar, AvatarImage, AvatarFallback } from '@xipkg/avatar';
import { Close, CrossCircle, Plus, Search, Crown } from '@xipkg/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';

// JSON со временным списком пользователей
import usersTemplate from '../UsersTemplate/usersTemplate.json';

// Временные типы для Роли пользователя и для пропсов Бейджа пользователя
type UserRoleT = {
  name: string;
  colorMain: string;
  colorSecondary: string;
};

type UserBadgePropsT = UserRoleT & {
  role: UserRoleT;
  handleRoleDelete: (roleToDelete: UserRoleT) => void;
};

const UserBadge = ({
  name,
  role,
  colorMain,
  colorSecondary,
  handleRoleDelete,
}: UserBadgePropsT) => {
  return (
    <li>
      <Badge className="text-xs" style={{ backgroundColor: `var(${colorSecondary})` }}>
        <span
          className="mr-2 size-3 rounded-full"
          style={{ backgroundColor: `var(${colorMain})` }}
        />
        {name.slice(0, 1).toUpperCase() + name.slice(1)}
        <Button
          className="focus:bg-red-80 hover:bg-red-80 group ml-3 h-min rounded-full bg-transparent p-0"
          onClick={() => handleRoleDelete(role)}
        >
          <CrossCircle className="group-hover:fill-gray-0 group-focus:fill-gray-0 !size-3" />
        </Button>
      </Badge>
    </li>
  );
};

// Временные типы для Пользователя и для пропсов Карточки пользователя
type UserT = {
  name: string;
  nickname: string;
  roles: UserRoleT[];
  isOwner: boolean;
};

type UserCardPropsT = UserT & {
  user: UserT;
  handleUserDelete: (userToDelete: UserT) => void;
  handleRoleAdd: (userToUpdate: UserT, roleToAdd: UserRoleT) => void;
  handleRoleDelete: (userToUpdate: UserT, roleToDelete: UserRoleT) => void;
};

const UserCard = ({
  user,
  name,
  roles,
  isOwner,
  nickname,
  handleRoleAdd,
  handleUserDelete,
  handleRoleDelete,
}: UserCardPropsT) => {
  // Временный список ролей
  const rolesTemplate = [
    { name: 'Администратор', colorMain: '--xi-violet-100', colorSecondary: '--xi-violet-20' },
    { name: 'Преподаватель', colorMain: '--xi-brand-100', colorSecondary: '--xi-brand-0' },
    { name: 'Студент', colorMain: '--xi-green-100', colorSecondary: '--xi-green-0' },
    { name: 'Гость', colorMain: '--xi-red-100', colorSecondary: '--xi-red-0' },
    { name: '1', colorMain: '--xi-gray-80', colorSecondary: '--xi-gray-5' },
    { name: '2', colorMain: '--xi-gray-80', colorSecondary: '--xi-gray-5' },
  ];

  return (
    <li className="border-gray-30 flex rounded-lg border p-4 md:items-center">
      <div className="flex flex-col gap-2 md:flex-row md:gap-8">
        <div className="flex items-center self-start">
          <Avatar size="s">
            <AvatarImage
              src={`https://auth.xieffect.ru/api/users/3/avatar.webp`}
              imageProps={{
                src: `https://auth.xieffect.ru/api/users/3/avatar.webp`,
                alt: '@shadcn',
              }}
              alt="@shadcn"
            />
            <AvatarFallback size="s">CN</AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-nowrap text-base font-medium text-gray-100">{name}</p>
            <p className="text-gray-60 text-nowrap text-xs font-normal">{nickname}</p>
          </div>
          {isOwner && <Crown className="!size-3 self-start" />}
        </div>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {roles.map((role, index) => (
            <UserBadge
              name={role.name}
              colorMain={role.colorMain}
              colorSecondary={role.colorSecondary}
              key={index}
              role={role}
              handleRoleDelete={() => handleRoleDelete(user, role)}
            />
          ))}
          <li className="size-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="hover:bg-brand-80 group !size-6 bg-transparent p-1">
                  <Plus className="group-hover:fill-gray-0 group-focus:fill-gray-0 size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-3">
                {rolesTemplate.map((roleTemplate, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="hover:bg-gray-10 rounded-lg"
                    onClick={() => handleRoleAdd(user, roleTemplate)}
                  >
                    <span
                      className="mr-2 size-3 rounded-full"
                      style={{ backgroundColor: `var(${roleTemplate.colorMain})` }}
                    />
                    <p>{roleTemplate.name}</p>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </div>
      <Button
        className="focus:bg-red-80 hover:bg-red-80 group ml-auto h-6 w-6 bg-transparent p-1"
        onClick={() => handleUserDelete(user)}
      >
        <Close className="group-hover:fill-gray-0 group-focus:fill-gray-0 size-4" />
      </Button>
    </li>
  );
};

export const Users = () => {
  const isMobile = useMedia('(max-width: 719px)');

  // Временное решение для рендера, удаления, изменения ролей пользователей
  const [users, setUsers] = useState(usersTemplate);

  const handleUserDelete = (userToDelete: UserT) => {
    const updatedUsers = users.filter((user) => user !== userToDelete);
    setUsers(updatedUsers);
  };

  const handleRoleDelete = (userToUpdate: UserT, roleToDelete: UserRoleT) => {
    const updatedUsers = users.map((user) => {
      if (user === userToUpdate) {
        const updatedRoles = user.roles.filter((role) => role !== roleToDelete);
        return { ...user, roles: updatedRoles };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleRoleAdd = (userToUpdate: UserT, roleToAdd: UserRoleT) => {
    const updatedUsers = users.map((user) => {
      if (user === userToUpdate) {
        const updatedRoles = [...user.roles, roleToAdd];
        return { ...user, roles: updatedRoles };
      }
      return user;
    });
    setUsers(updatedUsers);
  };
  return (
    <>
      {!isMobile && <span className="text-3xl font-semibold">Участники</span>}
      <div className="mt-4">
        <form className="relative">
          <Input
            className="border-gray-30 size-full border-2 px-11 py-3 placeholder:text-base"
            placeholder="Поиск по участникам"
          />
          <Button
            type="submit"
            className="absolute left-3 top-0 !size-min translate-y-[50%] bg-transparent p-0 hover:bg-transparent focus:bg-transparent"
          >
            <Search className="fill-gray-60 size-6" />
          </Button>
        </form>

        <ul className="mt-4 grid gap-4">
          {users.map((user, index) => (
            <UserCard
              name={user.name}
              nickname={user.nickname}
              roles={user.roles}
              isOwner={user.isOwner}
              key={index}
              user={user}
              handleUserDelete={handleUserDelete}
              handleRoleDelete={handleRoleDelete}
              handleRoleAdd={handleRoleAdd}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
