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

// type HeaderPropsT = {};

export const Header = () => {
  const params = useParams<{ 'community-id': string, 'channel-id': string }>();

  const communityMeta = useMainSt((state) => state.communityMeta);
  const channels = useMainSt((state) => state.channels);

  const currentTasks = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (currentTasks === undefined) return null;

  console.log('channels', channels, currentTasks);

  return (
    <div className="flex flex-col gap-4 pb-4 md:pb-8">
      <div>
        <BreadcrumbsRoot size="s">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link href={`/communities/${params['community-id']}/home`}>{communityMeta.name ?? 'Моё пространство'}</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link href={`/communities/${params['community-id']}/channels/${params['channel-id']}/posts`}>{currentTasks[0]?.name}</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentTasks[0]?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbsRoot>
      </div>
      <div className="flex items-center h-[40px]">
        <h1 className="text-xl-base font-semibold sm:inline-block sm:text-h6 lg:text-h5">
          Quizzes
        </h1>
      </div>
      <div className="flex items-center h-[16px] gap-1">
        <span className="text-xs-base">
          4 мая 2024
        </span>
        <svg className="fill-gray-100" width="3" height="4" viewBox="0 0 3 4" fill="none">
          <circle cx="1.5" cy="2" r="1.5" />
        </svg>
        <span className="text-xs-base">
          Иванова А.Г.
        </span>
      </div>
    </div>
  );
};
