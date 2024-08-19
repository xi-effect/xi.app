'use client';

import React, { RefObject, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUrlWithParams } from 'pkg.utils.client';
import { Logo } from 'pkg.logo';
// import { Badge } from '@xipkg/badge';
import { Button } from '@xipkg/button';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import Load from 'app/load';
import { get } from 'pkg.utils';
import { useMainSt } from 'pkg.stores';
import { toast } from 'sonner';

type AvatarPreviewProps = {
  date: RefObject<'' | Date>;
  communityId: number | null;
};

// type UserRoleProps = {
//   name: string;
//   roleColor: string;
//   roleType: string;
// };

// Отправляем запрос, получаем следующие данные:
// const communityName = 'Иванова А. Г.';
// const communityRoles = [
//   { name: 'Cтудент', roleColor: 'bg-brand-80', roleType: 'circle' },
//   { name: 'B1.2', roleColor: 'bg-gray-80', roleType: 'diamond' },
// ];
// const commId = 4;

// const UserRole = ({ name, roleColor, roleType }: UserRoleProps) => (
//   <li>
//     <Badge className="text-xs bg-gray-5" size="s">
//       <span className={`mr-2 ${checkRole(roleType)} ${roleColor}`} />
//       {name.slice(0, 1).toUpperCase() + name.slice(1)}{' '}
//     </Badge>
//   </li>
// );

// function checkRole(role) {
//   return role === 'circle' ? 'rounded-full size-3' : 'rotate-45 size-2.5';
// }

type ResponseBodyT = {
  community: {
    id: number;
    name: string;
    description: string;
  };
  is_authorized: boolean;
  has_already_joined: boolean;
};

type InviteCardT = {
  invite: ResponseBodyT;
  iid: string;
};

const InviteCard = ({ invite, iid }: InviteCardT) => {
  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();
  const [isLoading, setIsLoading] = React.useState(false);

  const date = useRef(new Date());
  const socket = useMainSt((state) => state.socket);
  const updateCommunityMeta = useMainSt((state) => state.updateCommunityMeta);

  const onSubmit = () => {
    setIsLoading(true);

    socket.emit(
      'join-community',
      {
        code: iid,
      },
      async (status: number, { community, participant }: { community: any; participant: any }) => {
        if (status === 409) {
          toast('Вы уже являетесь участником сообщества');
          setIsLoading(false);

          // TODO: Придумать лучший пользовательский сценарий
          setTimeout(() => {
            router.push(getUrlWithParams('/'));
          }, 1000);
        }

        if (status === 200) {
          updateCommunityMeta({
            id: community.id,
            isOwner: participant.is_owner,
            name: community.name,
            description: community.description,
          });

          setIsLoading(false);
          router.push(getUrlWithParams(`/communities/${community.id}/home`));
        }
      },
    );
  };

  return (
    <div className="flex flex-col w-full items-center pt-[100px] max-[420px]:px-4 h-screen">
      <Logo height={16} width={136} logoVariant="navigation" logoSize="default" />
      <div className="flex-grow flex flex-col justify-center w-full items-center">
        <div className="border-[1px] rounded-2xl relative pt-20 p-8 max-[420px]:w-full w-[420px] flex flex-col items-center">
          <AvatarPreview date={date} communityId={invite.community.id} />
          <p className="text-base text-gray-80">Вы были приглашены в</p>
          <p className="text-2xl text-gray-100 mt-2">{invite.community.name}</p>
          {/* <ul className="flex gap-2 mt-4">
            {communityRoles.map((role) => (
              <UserRole
                key={role.name}
                name={role.name}
                roleColor={role.roleColor}
                roleType={role.roleType}
              />
            ))}
          </ul> */}
          {isLoading ? (
            <Button disabled variant="default-spinner" className="ml-0 mt-8 w-full text-xl" />
          ) : (
            <Button className="ml-0 mt-8 w-full text-xl" onClick={onSubmit}>
              Принять приглашение
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const AvatarPreview = ({ date, communityId }: AvatarPreviewProps) => (
  <Avatar size="xxl" className="absolute -top-16">
    <AvatarImage
      // временная заглушка для изображения, вместо директории users будет community
      src={`https://api.xieffect.ru/files/communities/${communityId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`}
      imageProps={{
        src: `https://api.xieffect.ru/files/communities/${communityId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`,
        alt: 'community avatar',
      }}
      alt="community avatar"
    />
    <AvatarFallback size="xxl" />
  </Avatar>
);

export default function InvitePage({ params }: { params: { iid: string } }) {
  const [invite, setInvite] = React.useState<ResponseBodyT | null>(null);
  const router = useRouter();
  const getUrlWithParams = useGetUrlWithParams();

  React.useEffect(() => {
    const getInviteData = async () => {
      const { status, data } = await get<ResponseBodyT>({
        service: 'backend',
        path: `/api/public/community-service/invitations/by-code/${params.iid}/community/`,
        config: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });

      if (status === 200) {
        setInvite(data);
      }
    };

    getInviteData();
  }, []);

  if (invite === null) return <Load />;
  if (!invite.is_authorized) {
    const newUrl = new URL(window.location.href);
    newUrl.pathname = '/signin';
    newUrl.searchParams.set('iid', params.iid);
    newUrl.searchParams.set('community', invite.community.name);

    router.push(getUrlWithParams(newUrl.toString()));
  }

  return <InviteCard iid={params.iid} invite={invite} />;
}
