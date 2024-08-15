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
  const params = useParams<{ 'community-id': string, 'channel-id': string }>();
  const getUrlWithParams = useGetUrlWithParams();
  const router = useRouter();
  const communityMeta = useMainSt((state) => state.communityMeta);
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);
  const channels = useMainSt((state) => state.channels);

  const currentPosts = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (!currentPosts) return null;

  const handleRouteChange = () => router.push(getUrlWithParams(`/communities/${params['community-id']}/channels/${params['channel-id']}/posts/add-post`));

  return (
    <div className="flex flex-col gap-4 pb-4 md:pb-8">
      <BreadcrumbsRoot size="s">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild><Link href={`/communities/${params['community-id']}/home`}>{communityMeta.name ?? 'Моё пространство'}</Link></BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPosts[0]?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </BreadcrumbsRoot>
      <div className="flex items-start md:items-center justify-between flex-col sm:flex-row gap-4">
        <h1 className="text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
          {currentPosts[0]?.name}
        </h1>
        <div className="flex gap-6 w-full justify-end">
          { isOwner &&
            <Button size="s" className="pl-2 w-[100px]" onClick={handleRouteChange}>
              <Plus size="s" className="fill-gray-0 mr-[6px]" />
              Создать
            </Button>
          }
        </div>
      </div>
    </div>
  );
};
