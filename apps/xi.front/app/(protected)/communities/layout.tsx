'use client';

import dynamic from 'next/dynamic';
import { ReactNode, useEffect, useState } from 'react';
import { useMainSt } from 'pkg.stores';
import { useParams, useRouter } from 'next/navigation';
import { ErrorPage } from 'pkg.error-page';
import { Link } from '@xipkg/link';

const Navigation = dynamic(() => import('pkg.navigation').then((mod) => mod.Navigation));

export default function CommunityLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const socket = useMainSt((state) => state.socket);

  const [isUserInCommunity, setIsUserInCommunity] = useState(true);

  const params = useParams<{ 'community-id': string }>();
  const communityId = +params['community-id'];

  useEffect(() => {
    socket?.emit(
      'list-communities',
      (
        status: number,
        communities: { name: string; avatar: string; id: number; isOwner: boolean }[],
      ) => {
        if (communities.some((obj) => obj.id === communityId) || status === 403) {
          setIsUserInCommunity(true);
        } else {
          setIsUserInCommunity(false);
        }
      },
    );
  }, [socket, params]);

  return isUserInCommunity ? (
    <Navigation>{children}</Navigation>
  ) : (
    <ErrorPage
      title="Доступ запрещён"
      errorCode={403}
      text="У вас нет прав на просмотр данной страницы"
    >
      <p className="text-gray-80 text-m-base">
        Вернитесь&nbsp;
        <button
          type="button"
          className="decoration-brand-20 hover:decoration-brand-100 text-brand-80 hover:text-brand-100 underline underline-offset-4 bg-transparent"
          onClick={() => router.back()}
        >
          назад&nbsp;
        </button>
        или&nbsp;
        <Link theme="brand" size="l" href="/" target="_blank">
          на главную
        </Link>
      </p>
    </ErrorPage>
  );
}
