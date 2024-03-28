import { useState } from 'react';

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
import { useDebouncedFunction } from 'pkg.utils';

// Временные типы для Роли пользователя и для пропсов Бейджа пользователя
type UserRoleT = {
  name: string;
  bgColorMain: string;
  bgColorSecondary: string;
};

type UserBadgePropsT = UserRoleT & {
  role: UserRoleT;
  handleRoleDelete: (roleToDelete: UserRoleT) => void;
};

const UserBadge = ({
  name,
  role,
  bgColorMain,
  bgColorSecondary,
  handleRoleDelete,
}: UserBadgePropsT) => {
  return (
    <li>
      <Badge className={`text-xs ${bgColorSecondary}`}>
        <span className={`mr-2 size-3 rounded-full ${bgColorMain}`} />
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
    { name: 'Администратор', bgColorMain: 'bg-violet-100', bgColorSecondary: 'bg-violet-20' },
    { name: 'Преподаватель', bgColorMain: 'bg-brand-100', bgColorSecondary: 'bg-brand-0' },
    { name: 'Студент', bgColorMain: 'bg-green-100', bgColorSecondary: 'bg-green-0' },
    { name: 'Гость', bgColorMain: 'bg-red-100', bgColorSecondary: 'bg-red-0' },
    { name: '1', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
    { name: '2', bgColorMain: 'bg-gray-80', bgColorSecondary: 'bg-gray-5' },
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
              role={role}
              key={index}
              name={role.name}
              bgColorMain={role.bgColorMain}
              bgColorSecondary={role.bgColorSecondary}
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
                    <span className={`bg mr-2 size-3 rounded-full ${roleTemplate.bgColorMain}`} />
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

  const setFilteredUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.trim().toLowerCase();

    setUsers(
      usersTemplate.filter(
        (user) =>
          user.name.toLowerCase().startsWith(searchValue) ||
          user.nickname.toLowerCase().startsWith(searchValue) ||
          user.name.toLowerCase().split(' ').pop()?.startsWith(searchValue),
      ),
    );
  };

  const debauncedUsersSearch = useDebouncedFunction(setFilteredUsers, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debauncedUsersSearch(event);
  };

  return (
    <>
      <span className="hidden text-3xl font-semibold sm:inline-block">Участники</span>
      <div className="mt-4">
        <div className="relative">
          <Input
            className="border-gray-30 size-full border-2 px-11 py-3 placeholder:text-base"
            placeholder="Поиск по участникам"
            onChange={(event) => {
              handleSearch(event);
            }}
          />
          <Button
            type="submit"
            className="absolute left-3 top-0 !size-min translate-y-[50%] bg-transparent p-0 hover:bg-transparent focus:bg-transparent"
          >
            <Search className="fill-gray-60 size-6" />
          </Button>
        </div>

        <ul className="mt-4 grid gap-4">
          {users.map((user, index) => (
            <UserCard
              user={user}
              key={index}
              name={user.name}
              roles={user.roles}
              isOwner={user.isOwner}
              nickname={user.nickname}
              handleRoleAdd={handleRoleAdd}
              handleRoleDelete={handleRoleDelete}
              handleUserDelete={handleUserDelete}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
