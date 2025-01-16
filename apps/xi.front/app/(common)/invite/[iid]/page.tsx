/* eslint-disable react/prop-types */

import React from 'react';
import { Metadata } from 'next';
import InvitePage from './invitePage';

type PageParamsT = {
  params: Promise<{
    iid: string;
  }>;
};

export async function generateMetadata({ params }: PageParamsT): Promise<Metadata> {
  const { iid } = await params;
  // если использю get из pkg.utils то появляется ошибка:
  // импорт компонентов без пометки 'use client'
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL_BACKEND}/api/public/community-service/invitations/by-code/${iid}/community/`,
  ).then((res) => res.json());

  return {
    title: `Приглашение в сообщество ${data.community.name}`,
    description: `Вы были приглашены в сообщество «${data.community.name}». 
        Перейдите по этой ссылке-приглашению, чтобы принять приглашение`,
    openGraph: {
      title: `Приглашение в сообщество ${data.community.name}`,
      description: `Вы были приглашены в сообщество «${data.community.name}». 
        Перейдите по этой ссылке-приглашению, чтобы принять приглашение`,
      images: [`https://api.xieffect.ru/files/communities/${data.community.id}/avatar.webp`],
    },
  };
}

const Invite = ({ params }: PageParamsT) => <InvitePage params={params} />;

export default Invite;
