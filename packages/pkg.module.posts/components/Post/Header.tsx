'use client';

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
import { Button } from '@xipkg/button';
import { DeletePostModal } from 'pkg.modal.delete-post';
import { Edit, Trash, Ul } from '@xipkg/icons';
import { announcements } from '../Posts/mockData';

type HeaderPropsT = {
  editHandler: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Header = ({ editHandler }: HeaderPropsT) => {
  const params = useParams<{ 'community-id': string; 'channel-id': string; 'post-id': string }>();

  const communityMeta = useMainSt((state) => state.communityMeta);
  const isOwner = useMainSt((state) => state.communityMeta.isOwner);
  const channels = useMainSt((state) => state.channels);

  const currentTasks = channels?.filter((item) => Number(params['channel-id']) === item.id);
  if (currentTasks === undefined) return null;

  const currentPost = announcements?.filter((item) => Number(params['post-id']) === item.id)[0];

  return (
    <div className="flex flex-col gap-3 pb-8">
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
              <BreadcrumbLink asChild>
                <Link
                  href={`/communities/${params['community-id']}/channels/${params['channel-id']}/posts`}
                >
                  {currentTasks[0]?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{currentPost.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </BreadcrumbsRoot>
      </div>
      <div className="flex flex-col-reverse items-center gap-2 sm:flex-row">
        <h1 className="text-xl-base sm:text-h6 lg:text-h5 w-full font-semibold sm:inline-block sm:w-auto">
          {currentPost.title}
        </h1>
        {currentPost.isDraft && (
          <div className="flex h-full w-full justify-end pt-2 sm:w-auto sm:justify-start sm:pt-3 lg:pt-4">
            <p className="text-gray-60 text-m-base font-normal">Черновик</p>
          </div>
        )}
      </div>
      <div className="flex h-[16px] items-center">
        <span className="text-s-base">{currentPost.date}</span>
        <Ul size="s" className="h-3 w-3" />
        <span className="text-s-base">{currentPost.author}</span>
      </div>
      {isOwner && (
        <div className="flex flex-row gap-3">
          <Button
            variant="ghost"
            className="flex h-6 gap-1 px-0 hover:bg-transparent focus:bg-transparent active:bg-transparent"
            onClick={() => editHandler(false)}
          >
            <Edit />
            <span className="border-b-gray-40 border-b">Редактировать</span>
          </Button>
          <DeletePostModal>
            <Button
              variant="ghost"
              className="flex h-6 gap-1 px-0 hover:bg-transparent focus:bg-transparent active:bg-transparent"
            >
              <Trash className="fill-red-80" />
              <span className="text-red-80 border-b-red-80 border-b">Удалить</span>
            </Button>
          </DeletePostModal>
        </div>
      )}
    </div>
  );
};
