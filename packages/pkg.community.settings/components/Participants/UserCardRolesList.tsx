import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@xipkg/dropdown';
import { Button } from '@xipkg/button';
import { Plus } from '@xipkg/icons';
import { UserBadge } from './UserBadge';

const UserCardRolesList = () => {
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
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {rolesTemplate.map((role) => (
        <UserBadge
          role={role}
          key={role.name}
          name={role.name}
          bgColorMain={role.bgColorMain}
          bgColorSecondary={role.bgColorSecondary}
          handleRoleDelete={() => console.log(role)}
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
            {rolesTemplate.map((role) => (
              <DropdownMenuItem
                key={role.name}
                className="hover:bg-gray-10 rounded-lg"
                onClick={() => console.log(role)}
              >
                <span className={`bg mr-2 size-3 rounded-full ${role.bgColorMain}`} />
                <p>{role.name}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </li>
    </ul>
  );
};

export default UserCardRolesList;
