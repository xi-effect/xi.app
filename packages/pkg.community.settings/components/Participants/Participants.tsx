import React, { useEffect, useState } from 'react';
import { Input } from '@xipkg/input';
import { Button } from '@xipkg/button';
import { useDebouncedFunction } from '@xipkg/utils';
import { Search } from '@xipkg/icons';

import { useMainSt } from 'pkg.stores';
import { get } from 'pkg.utils';
import { toast } from 'sonner';
import { ParticipantsList, UserRoleT, UserT } from './types';
import { UserCard } from './UserCard';
import DeleteParticipantModal from './DeleteParticipantModal';

export const Participants = () => {
  const [participantsList, setParticipantsList] = useState<UserT[]>([]);
  const [isDeleteModalOpened, setIsDeleteModalOpened] = useState(false);
  const [deleteCandidate, setDeleteCandidate] = useState<number>();

  const socket = useMainSt((state) => state.socket);
  const communityId = useMainSt((state) => state.communityMeta.id);

  const handleUserDelete = (userToDelete: UserT) => {
    setIsDeleteModalOpened(!isDeleteModalOpened);
    setDeleteCandidate(userToDelete.id);
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteCandidate) {
        socket.emit('kick-participant', {
          community_id: communityId,
          user_id: deleteCandidate,
          target_user_id: deleteCandidate,
        }, (status: number, data: any) => {
          const updatedUsers = participantsList.filter((user) => user.id !== deleteCandidate);
          setParticipantsList(updatedUsers);
          console.log(status, data);
        });
      }
      setIsDeleteModalOpened(false);
    } catch (e) {
      setIsDeleteModalOpened(false);
      toast('Не удалось исключить участника');
      throw e;
    }
  };

  const handleRoleDelete = (userToUpdate: UserT, roleToDelete: UserRoleT) => {
    console.log(userToUpdate, roleToDelete);
    // const updatedUsers = users.map((user) => {
    //   if (user === userToUpdate) {
    //     const updatedRoles = user.roles.filter((role) => role !== roleToDelete);
    //     return { ...user, roles: updatedRoles };
    //   }
    //   return user;
    // });
    // setUsers(updatedUsers);
  };

  const handleRoleAdd = (userToUpdate: UserT, roleToAdd: UserRoleT) => {
    console.log(userToUpdate, roleToAdd);
    // const updatedUsers = users.map((user) => {
    //   if (user === userToUpdate) {
    //     const updatedRoles = [...user.roles, roleToAdd];
    //     return { ...user, roles: updatedRoles };
    //   }
    //   return user;
    // });
    // setUsers(updatedUsers);
  };

  const setFilteredUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event);
    // const searchValue = event.target.value.trim().toLowerCase();
    //
    // setUsers(
    //   usersTemplate.filter(
    //     (user) =>
    //       user.name.toLowerCase().startsWith(searchValue) ||
    //       user.nickname.toLowerCase().startsWith(searchValue) ||
    //       user.name.toLowerCase().split(' ').pop()?.startsWith(searchValue),
    //   ),
    // );
  };

  const debauncedUsersSearch = useDebouncedFunction(setFilteredUsers, 300);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    debauncedUsersSearch(event);
  };

  const getUserProfile = async (id: number) => {
    try {
      const { status, data } = await get<UserT>({
        service: 'auth',
        path: `/api/users/by-id/${id}/profile/`,
        config: {
          headers: {
            'Content-Type': 'application/json',
          },
        } });
      console.log(status);
        return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  useEffect(() => {
    socket.emit('list-participants', { community_id: communityId }, async (status: number, data: ParticipantsList) => {
      if (status === 200) {
        const userProfiles = await Promise.all(data.map((user) => getUserProfile(user.user_id)));
        setParticipantsList(userProfiles);
      }
    });
  }, [communityId]);

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
          {participantsList.map((user, index) => (
            <UserCard
              user={user}
              display_name={user.display_name}
              id={user.id}
              username={user.username}
              key={index}
              handleRoleAdd={handleRoleAdd}
              handleRoleDelete={handleRoleDelete}
              handleUserDelete={handleUserDelete}
            />
          ))}
        </ul>
      </div>
      <DeleteParticipantModal
        open={isDeleteModalOpened}
        onOpenChange={setIsDeleteModalOpened}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};
