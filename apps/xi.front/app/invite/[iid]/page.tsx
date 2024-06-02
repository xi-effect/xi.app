'use client';

import React, { RefObject, useRef } from 'react';
import { redirect } from 'next/navigation';

import { useMainSt } from 'pkg.stores';

import { Logo } from 'pkg.logo';
// import { Badge } from '@xipkg/badge';
import { Button } from '@xipkg/button';
import { Avatar, AvatarFallback, AvatarImage } from '@xipkg/avatar';
import Load from 'app/load';
import { get } from 'pkg.utils';

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
// const isInviteValid = true; // если false, отображаем страницу ошибки
// const errorMessage = 'Приглашение не действительно';
// const errorDescription = 'Срок действия этого приглашения истёк.';
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
};

const InviteCard = ({ invite }: InviteCardT) => {
  const date = useRef(new Date());

  const onSubmit = () => {
    redirect(`/communities/${invite.community.id}/home`);
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
          <Button className="ml-0 mt-8 w-full text-xl" onClick={onSubmit}>
            Принять приглашение
          </Button>
        </div>
      </div>
    </div>
  );
};

const AvatarPreview = ({ date, communityId }: AvatarPreviewProps) => (
  <Avatar size="xxl" className="absolute -top-16">
    <AvatarImage
      // временная заглушка для изображения, вместо директории users будет community
      src={`https://auth.xieffect.ru/api/users/${communityId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`}
      imageProps={{
        src: `https://auth.xieffect.ru/api/users/${communityId}/avatar.webp?=${date.current instanceof Date ? date.current.getTime() : ''}`,
        alt: 'community avatar',
      }}
      alt="community avatar"
    />
    <AvatarFallback size="xxl" />
  </Avatar>
);

export default function InvitePage({ params }: { params: { iid: string } }) {
  const isLogin = useMainSt((state) => state.isLogin);
  const [invite, setInvite] = React.useState<ResponseBodyT | null>(null);

  React.useEffect(() => {
    if (isLogin) {
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
    }
  }, []);

  if (isLogin === null || invite === null) return <Load />;
  if (!isLogin || !invite.is_authorized) redirect(`/signin?iid=${params.iid}`);

  return <InviteCard invite={invite} />;
}
