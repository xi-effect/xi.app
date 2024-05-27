import React, { useState, useEffect } from 'react';

import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';

import { InviteCommunityModal } from 'pkg.modal.invite-community';
import { Badge } from '@xipkg/badge';
import { Button } from '@xipkg/button';
import { Avatar, AvatarImage, AvatarFallback } from '@xipkg/avatar';
import { Copy, Trash, Plus } from '@xipkg/icons';
import { Header } from '../Header';

// Временные типы для Роли пользователя и для пропсов Бейджа пользователя
type UserRoleT = {
  name: string;
  bgColorMain: string;
  bgColorSecondary: string;
};

const UserBadge = ({ name, bgColorMain, bgColorSecondary }: UserRoleT) => (
  <li>
    <Badge className={`text-xs ${bgColorSecondary}`}>
      <span className={`mr-2 size-3 rounded-full ${bgColorMain}`} />
      {name.slice(0, 1).toUpperCase() + name.slice(1)}
    </Badge>
  </li>
);

// Временные типы для Пользователя и для пропсов Карточки пользователя
type UserT = {
  name: string;
  nickname: string;
  roles: UserRoleT[];
};

type UserCardPropsT = UserT & {
  // user: UserT;
  id: string;
  inviteCode: string;
  usageCount: number;
  usageLimit: number | null;
  expires: string | null;
  handleInviteDelete: (inviteCode: string) => void;
};

type InvitationT = {
  id: string;
  token: string;
  usageCount: number;
  usageLimit: number | null;
  expiry: string | null;
};

const UserCard = ({
  // user,
  name,
  roles,
  nickname,
  inviteCode,
  usageCount,
  usageLimit,
  expires,
  id,
  handleInviteDelete,
}: UserCardPropsT) => {
  const [diffDays, setDiffDays] = React.useState(0);
  const [diffHours, setDiffHours] = React.useState(0);
  const [diffMinutes, setDiffMinutes] = React.useState(0);

  React.useEffect(() => {
    if (expires) {
      const expiresDate = new Date(expires);
      const actualDate = new Date();

      const diffMs = expiresDate.getTime() - actualDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      setDiffDays(diffDays);
      setDiffHours(diffHours);
      setDiffMinutes(diffMinutes);
    }
  }, [expires]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteCode);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <li className="border-gray-30 md:items-cente flex rounded-lg border p-4">
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <div className="flex min-w-40 flex-col">
          <div className="flex">
            <p className="mb-2 text-xs font-medium text-gray-100">Создано:</p>
            <button
              type="button"
              aria-label="Удалить"
              onClick={() => handleInviteDelete(id)}
              className="ml-auto bg-transparent p-2 min-[960px]:hidden"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center self-start">
            <Avatar size="m">
              <AvatarImage
                src="https://auth.xieffect.ru/api/users/4/avatar.webp"
                imageProps={{
                  src: 'https://auth.xieffect.ru/api/users/4/avatar.webp',
                  alt: '@shadcn',
                }}
                alt="@shadcn"
              />
              <AvatarFallback size="m">CN</AvatarFallback>
            </Avatar>
            <div className="ml-2">
              <p className="text-sm font-medium text-gray-100 max-[700px]:text-base">{name}</p>
              <p className="text-gray-60 text-xs font-normal">@{nickname}</p>
            </div>
          </div>
        </div>

        <div className="flex min-w-40 flex-col">
          <p className="mb-2 text-xs font-medium text-gray-100">Код:</p>
          <div className="flex items-center self-start">
            <p className="max-w-20 truncate text-base font-medium text-gray-100">{inviteCode}</p>
            <button
              type="button"
              className="bg-gray-10 hover:bg-brand-0 group mb-auto ml-5 rounded p-1 transition-all"
              onClick={copyToClipboard}
              aria-label="Скопировать код"
            >
              <Copy className="h-[10px] w-[10px] transition-all group-active:scale-105" />
            </button>
          </div>
        </div>

        <div className="flex min-w-40 flex-col">
          <p className="mb-2 text-xs font-medium text-gray-100">Использований:</p>
          <div className="flex items-center self-start">
            <span className=" text-base font-medium text-gray-100">{usageCount}</span>
            {usageLimit && (
              <span className="text-gray-40 align-self-start mb-0.5 text-xs font-medium before:mx-[0.5px] before:content-['/']">
                {usageLimit}
              </span>
            )}
          </div>
        </div>

        <div className="flex min-w-40 flex-col">
          <p className="mb-2 text-xs font-medium text-gray-100">Роли:</p>
          <ul className=" gap-x-4 gap-y-2 ">
            {roles.map((role, index) => (
              <UserBadge
                key={index}
                name={role.name}
                bgColorMain={role.bgColorMain}
                bgColorSecondary={role.bgColorSecondary}
              />
            ))}
          </ul>
        </div>

        {expires && (
          <div className="flex min-w-40 flex-col">
            <p className="mb-2 text-xs font-medium text-gray-100">Истекает через:</p>
            <div className="flex gap-2 self-start">
              <div className="flex flex-col">
                <p>{diffDays}</p>
                <p className="text-gray-80 -mt-1 text-[10px]">дней</p>
              </div>
              <div className="flex flex-col">
                <p>{diffHours}</p>
                <p className="text-gray-80 -mt-1 text-[10px]">часов</p>
              </div>

              <div className="flex flex-col">
                <p>{diffMinutes}</p>
                <p className="text-gray-80 -mt-1 text-[10px]">минут</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="button"
          aria-label="Удалить"
          onClick={() => handleInviteDelete(id)}
          className="ml-auto bg-transparent p-2 max-[960px]:hidden"
        >
          <Trash className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
};

export const Invites = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [invitations, setInvitations] = useState<InvitationT[]>([]);
  const communityId = useMainSt((state) => state.communityMeta.id);
  const socket = useMainSt((state) => state.socket);

  useEffect(() => {
    socket.emit('list-invitations', { community_id: communityId }, (status: number, data: any) => {
      if (status === 200 && data) {
        setInvitations(data);
      } else {
        toast('Ошибка получения приглашений');
      }
    });
  }, [communityId]);

  const handleInviteDelete = (inviteCode: string) => {
    socket.emit(
      'delete-invitation',
      {
        community_id: communityId,
        invitation_id: inviteCode,
      },
      (status: number) => {
        if (status === 204) {
          setInvitations((prevInvites) => prevInvites.filter((invite) => invite.id !== inviteCode));
        } else {
          toast('Не удалось удалить приглашение');
        }
      },
    );
  };

  const handleInviteCreate = (requestData: {
    community_id: number | null;
    data: { expiry: string | null; usage_limit: string | null };
  }) => {
    const { community_id: communityId, data } = requestData;

    socket.emit(
      'create-invitation',
      {
        community_id: communityId,
        data,
      },
      (status: number, data: any) => {
        if (status === 200) {
          setInvitations((prevInvites) => [...prevInvites, data]);
          setModalOpen(false);
        } else {
          toast('Не удалось создать приглашение');
        }
      },
    );
  };

  const handleModalToggle = () => {
    setModalOpen((prevModalOpen) => !prevModalOpen);
  };

  return (
    <>
      <Header />
      <div className="flex justify-between">
        <span className="hidden text-3xl font-semibold sm:inline-block">Приглашения</span>
        <Button
          variant="default"
          type="submit"
          size="s"
          className="px-4"
          onClick={handleModalToggle}
        >
          Создать приглашение
        </Button>
        <InviteCommunityModal
          open={isModalOpen}
          onOpenChange={setModalOpen}
          handleInviteCreate={handleInviteCreate}
        />
      </div>
      <div className="h-3/5 overflow-y-auto">
        {invitations?.length > 0 ? (
          <ul className="grid gap-4 max-[400px]:gap-8">
            {invitations.map((invite) => (
              <UserCard
                key={invite.id}
                id={invite.id}
                inviteCode={invite.token}
                usageCount={invite.usageCount}
                usageLimit={invite.usageLimit}
                expires={invite.expiry}
                roles={[
                  {
                    name: 'Студент',
                    bgColorMain: 'bg-green-100',
                    bgColorSecondary: 'bg-green-0',
                  },
                ]}
                // user={{} as UserT}
                name="Пользователь"
                nickname="nickname"
                handleInviteDelete={handleInviteDelete}
              />
            ))}
          </ul>
        ) : (
          <div className="flex h-1/2 flex-col items-center justify-center">
            <button
              className="flex cursor-pointer flex-col items-center bg-white"
              type="button"
              aria-label="Создать приглашение"
              onClick={handleModalToggle}
            >
              <div className="bg-brand-0 h-16 w-16 rounded-full p-2">
                <Plus className="fill-brand-80 h-12 w-12" />
              </div>
              <p className="text-brand-80 mt-2 text-base font-medium">Создать приглашение</p>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
