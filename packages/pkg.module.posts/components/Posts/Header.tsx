'use client';

import { useGetUrlWithParams } from 'pkg.utils.client';
import { Button } from '@xipkg/button';
import { Plus } from '@xipkg/icons';
import {
  BreadcrumbsRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@xipkg/breadcrumbs';
import { useParams, useRouter } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import Link from 'next/link';

export const Header = () => {
  const params = useParams<{ 'community-id': string; 'channel-id': string }>();
  const getUrlWithParams = useGetUrlWithParams();
  const router = useRouter();
  const communityMeta = useMainSt((state) => state.communityMeta);
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);
  const channels = useMainSt((state) => state.channels);

  const currentPosts = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (!currentPosts || currentPosts.length === 0) return null;

  const handleRouteChange = () =>
    router.push(
      getUrlWithParams(
        `/communities/${params['community-id']}/channels/${params['channel-id']}/posts/add-post`,
      ),
    );

  return (
    <div className="flex flex-col gap-4 pb-4 md:pb-8">
      <BreadcrumbsRoot size="s">
        <BreadcrumbList>
          <BreadcrumbItem className="overflow-hidden">
            <BreadcrumbLink asChild>
              <Link
                href={`/communities/${params['community-id']}/home`}
                className="overflow-hidden"
              >
                {communityMeta.name ?? 'Моё пространство'}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPosts[0]?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbsRoot>
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center md:items-center">
        <h1 className="w-full truncate text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
          {currentPosts[0]?.name}
        </h1>
        <div className="flex w-full justify-end gap-6 sm:w-auto md:w-auto">
          {isOwner && (
            <Button size="s" className="w-[100px] pl-2" onClick={handleRouteChange}>
              <Plus size="s" className="fill-gray-0 mr-[6px]" />
              Создать
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
