import React, { useCallback } from 'react';
import { Input } from '@xipkg/input';
import { Search } from '@xipkg/icons';
import debounce from 'lodash/debounce';
import {
  BreadcrumbsRoot,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@xipkg/breadcrumbs';
import { useParams } from 'next/navigation';
import { useMainSt } from 'pkg.stores';
import Link from 'next/link';

type HeaderProps = {
  onSearch: (searchValue: string) => void;
};

export const Header = ({ onSearch }: HeaderProps) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.trim().toLowerCase();
    debouncedSearch(value);
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 700),
    [],
  );

  const params = useParams<{ 'community-id': string, 'channel-id': string }>();

  const communityMeta = useMainSt((state) => state.communityMeta);
  const channels = useMainSt((state) => state.channels);

  const currentPosts = channels?.filter((item) => Number(params['channel-id']) === item.id);

  if (currentPosts === undefined) return null;

  console.log('channels', channels, currentPosts);

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
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-semibold max-[520px]:text-2xl sm:inline-block sm:text-4xl">
          {currentPosts[0]?.name}
        </h1>
        <div className="hidden w-[250px] p-4 md:block">
          <Input
            className="placeholder:text-base"
            variant="s"
            placeholder="Поиск"
            before={<Search size="s" className="fill-gray-60" />}
            onChange={(event) => {
              handleSearch(event);
            }}
          />
        </div>
      </div>
    </div>
  );
};
