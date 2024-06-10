import React, {useState} from 'react';
import {Input} from '@xipkg/input';
import {Button} from '@xipkg/button';
import {useDebouncedFunction} from '@xipkg/utils';
import {Search} from '@xipkg/icons';

// JSON со временным списком пользователей
import usersTemplate from './usersTemplate.json';
import {UserRoleT, UserT} from "./types";
import {UserCard} from "./UserCard";

export const Participants = () => {
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
