import React from 'react';
import { Metadata } from 'next';
// import { get } from 'pkg.utils';
import InvitePage from './invitePage';

type ResponseBodyT = {
  community: {
    id: number;
    name: string;
    description: string;
  };
  is_authorized: boolean;
  has_already_joined: boolean;
};

type PageParamsT = {
  params: {
    iid: string
  }
};

export async function generateMetadata(
    { params }: PageParamsT,
): Promise<Metadata> {
  // const { status, datas } = await get<ResponseBodyT>({
  //   service: 'backend',
  //   path: `/api/public/community-service/invitations/by-code/${params.iid}/community/`,
  //   config: {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   },
  // });

  // если использю get из pkg.utils то появляется ошибка:
  // импорт компонентов без пометки 'use client'
  const data = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL_BACKEND}/api/public/community-service/invitations/by-code/${params.iid}/community/`)
      .then((res) => res.json());
  return {
    title: `Приглашение в сообщество ${data.community.name}`,
    description: data.community.description || 'Добро пожаловать в лучшее сообщество',
    openGraph: {
      title: `Приглашение в сообщество ${data.community.name}`,
      description: data.community.description || 'Добро пожаловать в лучшее сообщество',
      images: ['./assets/brand/navigationlogo-default-light.svg'],
    },
  };
}

const Invite = ({ params }: PageParamsT) => (
  <InvitePage params={params} />
  );

export default Invite;
