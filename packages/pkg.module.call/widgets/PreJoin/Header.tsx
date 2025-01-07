import React from 'react';
import {
  BreadcrumbsRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@xipkg/breadcrumbs';
import { useMainSt } from 'pkg.stores';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export const Header = () => {
  const params = useParams<{ 'community-id': string; 'channel-id': string }>();

  const communityMeta = useMainSt((state) => state.communityMeta);
  const channels = useMainSt((state) => state.channels);

  const currentCall = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (currentCall === undefined || currentCall.length === 0) return null;

  return (
    <div className="flex flex-col gap-4 pb-4 md:pb-8">
      <div>
        <BreadcrumbsRoot size="s">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/communities/${params['community-id']}/home`}>
                  {communityMeta.name ?? 'Моё пространство'}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentCall[0]?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbsRoot>
      </div>
      <div className="flex h-[40px] items-center">
        <h1 className="text-xl-base sm:text-h6 lg:text-h5 mr-auto font-semibold sm:inline-block">
          Присоединиться к конференции
        </h1>
      </div>
    </div>
  );
};
