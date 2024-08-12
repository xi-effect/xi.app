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
import { announcements } from '../Posts/mockData';

export const Header = () => {
  const params = useParams<{ 'community-id': string, 'channel-id': string, 'post-id': string }>();

  const communityMeta = useMainSt((state) => state.communityMeta);
  const channels = useMainSt((state) => state.channels);

  const currentTasks = channels?.filter((item) => Number(params['channel-id']) === item.id);
  if (currentTasks === undefined) return null;

  const currentPost = announcements?.filter((item) => Number(params['post-id']) === item.id)[0];

  return (
    <div className="flex flex-col gap-3 pb-4 md:pb-8">
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
              <BreadcrumbPage>{params['post-id']}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbsRoot>
      </div>
      <div className="flex flex-col-reverse sm:flex-row items-center gap-2">
        <h1 className="text-xl-base font-semibold sm:inline-block sm:text-h6 lg:text-h5">
          {currentPost.title}
        </h1>
        {currentPost.isDraft &&
        <div className="w-full sm:w-auto flex justify-end sm:justify-start h-full pt-2 sm:pt-3 lg:pt-4">
          <p className="text-gray-60 text-m-base ml-1 font-normal">Черновик</p>
        </div>
        }
      </div>
      <div className="flex items-center h-[16px] gap-1">
        <span className="text-s-base">
          {currentPost.date}
        </span>
        <svg className="fill-gray-100" width="3" height="4" viewBox="0 0 3 4" fill="none">
          <circle cx="1.5" cy="2" r="1.5" />
        </svg>
        <span className="text-s-base">
          {currentPost.author}
        </span>
      </div>
    </div>
  );
};
